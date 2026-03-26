import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image?: string;
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
      excerpt: data.excerpt,
      category: data.category,
      readingTime: data.readingTime || "5 min",
      image: data.image,
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
      excerpt: data.excerpt,
      category: data.category,
      readingTime: data.readingTime || "5 min",
      image: data.image,
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
