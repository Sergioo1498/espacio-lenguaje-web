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

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Recursos": "Materiales descargables, fichas y guías para padres y profesionales: PDFs, ejercicios imprimibles y planes estructurados.",
  "Ejercicios": "Rutinas prácticas y ejercicios concretos para estimular el lenguaje, la articulación y la respiración en casa.",
  "Estimulación": "Actividades de estimulación del lenguaje organizadas por edad, basadas en evidencia clínica y rutinas naturales.",
  "Señales de alerta": "Indicadores por edad de cuándo conviene consultar con logopeda: hitos esperados, banderas rojas y criterios clínicos.",
  "Desarrollo del lenguaje": "Cómo evoluciona el lenguaje de los 0 a los 6 años: hitos, etapas y predictores del desarrollo.",
  "Dislexia": "Detección, ejercicios y adaptaciones para dislexia infantil basadas en evidencia (Snowling, Anthony & Francis).",
  "Información práctica": "Información clínica sobre temas concretos de logopedia infantil para familias.",
  "Patologías": "Información clínica sobre trastornos del lenguaje: TEL/TDL, dislalia, tartamudez, retraso simple.",
};

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getAllCategories(): Array<{ slug: string; name: string; description: string; count: number }> {
  const posts = getAllPosts();
  const map = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    if (!post.category) continue;
    const slug = categorySlug(post.category);
    const existing = map.get(slug);
    if (existing) existing.count++;
    else map.set(slug, { name: post.category, count: 1 });
  }
  return Array.from(map.entries())
    .map(([slug, { name, count }]) => ({
      slug,
      name,
      description: CATEGORY_DESCRIPTIONS[name] || `Artículos sobre ${name.toLowerCase()} en logopedia infantil.`,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategorySlug(slug: string): PostMeta[] {
  return getAllPosts().filter((post) => categorySlug(post.category) === slug);
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

export interface HowToStep {
  name: string;
  text: string;
}

/**
 * Detecta una secuencia paso-a-paso (HowTo schema).
 * Busca H3 que empiecen por "1.", "2.", ..., "Paso 1", "Ejercicio 1", etc.
 * Requiere mínimo 3 pasos consecutivos para considerarlo HowTo válido.
 */
export function extractHowTo(content: string): HowToStep[] {
  const lines = content.split(/\r?\n/);
  const steps: HowToStep[] = [];
  let currentName: string | null = null;
  let currentNum = 0;
  let buffer: string[] = [];
  const flush = () => {
    if (currentName) {
      const text = stripMarkdown(buffer.join("\n")).slice(0, 600);
      if (text.length >= 20) steps.push({ name: currentName, text });
    }
    currentName = null;
    buffer = [];
  };
  for (const line of lines) {
    const heading = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      const text = heading[2].trim();
      // Patrones: "1. Algo", "Paso 1: ...", "Ejercicio 1 -", "Actividad 1)"
      const numPrefix = /^(?:(?:paso|ejercicio|actividad|nivel)\s+)?(\d+)[.):\s-]+\s*(.+)$/i.exec(text);
      if (numPrefix) {
        const n = parseInt(numPrefix[1], 10);
        // Aceptar solo si los números son consecutivos (1, 2, 3...)
        if (n === currentNum + 1 || (currentNum === 0 && n === 1)) {
          currentName = numPrefix[2].trim();
          currentNum = n;
          continue;
        }
      }
      // Heading que no es paso → resetea la secuencia
      currentName = null;
      continue;
    }
    if (currentName) buffer.push(line);
  }
  flush();
  return steps.length >= 3 ? steps.slice(0, 12) : [];
}
