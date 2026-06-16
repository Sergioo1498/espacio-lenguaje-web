import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image?: string;
  /** Id del miembro del equipo (ver src/lib/team.ts). Fallback: defaultAuthor() */
  authorId?: string;
  /** Id del revisor. Solo relevante cuando difiere del autor. Fallback: defaultReviewer() */
  reviewerId?: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      title: data.title,
      slug,
      date: data.date,
      updatedAt: data.updatedAt,
      excerpt: data.excerpt,
      category: data.category,
      readingTime: data.readingTime || "5 min",
      image: data.image,
      authorId: data.authorId,
      reviewerId: data.reviewerId,
    } as PostMeta;
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    meta: {
      title: data.title,
      slug,
      date: data.date,
      updatedAt: data.updatedAt,
      excerpt: data.excerpt,
      category: data.category,
      readingTime: data.readingTime || "5 min",
      image: data.image,
      authorId: data.authorId,
      reviewerId: data.reviewerId,
    } as PostMeta,
    content,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 2): PostMeta[] {
  const otherPosts = getAllPosts().filter((post) => post.slug !== currentSlug);
  const sameCategory = otherPosts.filter((post) => post.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const remaining = otherPosts.filter((post) => post.category !== category);
  return [...sameCategory, ...remaining].slice(0, limit);
}

export interface FAQItem {
  question: string;
  answer: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^> ?\*\*[^*]+\*\*:?/gm, "")
    .replace(/^> ?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^#+\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFAQs(content: string): FAQItem[] {
  const lines = content.split(/\r?\n/);
  const faqs: FAQItem[] = [];
  let currentQ: string | null = null;
  let buffer: string[] = [];
  const flush = () => {
    if (currentQ) {
      const answer = stripMarkdown(buffer.join("\n")).slice(0, 1200);
      if (answer.length >= 30) faqs.push({ question: currentQ, answer });
    }
    currentQ = null;
    buffer = [];
  };
  for (const line of lines) {
    const heading = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      const text = heading[2].trim();
      const isQuestion =
        text.endsWith("?") ||
        /^¿/.test(text) ||
        /^(qué|cómo|cuándo|cuál|cuáles|por qué|donde|dónde|para qué|a qué edad)/i.test(text);
      if (isQuestion) {
        currentQ = text.replace(/^[¿]+/, "¿").replace(/\?+$/, "?");
        if (!currentQ.startsWith("¿") && !currentQ.endsWith("?")) currentQ += "?";
      }
      continue;
    }
    if (currentQ) buffer.push(line);
  }
  flush();
  return faqs.slice(0, 8);
}
