#!/usr/bin/env node
/**
 * Genera public/llms.txt y public/llms-full.txt siguiendo la propuesta
 * Answer.AI (Jeremy Howard, sep 2024): https://llmstxt.org/
 *
 * - llms.txt: directorio navegable (H1 + blurb + secciones de enlaces)
 * - llms-full.txt: contenido concatenado para LLMs que quieran leerlo todo
 *
 * Reejecutar al publicar un post o producto:
 *   node scripts/generate-llms-txt.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://www.espaciolenguaje.com";

const CONTENT_DIR = path.join(ROOT, "content");
const PRODUCTS_FILE = path.join(ROOT, "src", "lib", "products.ts");
const PRODUCTS_CONTENT_FILE = path.join(ROOT, "src", "lib", "products-content.ts");
const PUBLIC = path.join(ROOT, "public");

// ── Posts ──────────────────────────────────────────────────────────────
const postFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
const posts = postFiles.map((filename) => {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    url: `${BASE}/blog/${slug}`,
    title: data.title,
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    date: data.date ?? "",
    updatedAt: data.updatedAt ?? data.date ?? "",
    content: content.trim(),
  };
});

// Agrupar posts por categoría para llms.txt
const postsByCategory = posts.reduce((acc, p) => {
  (acc[p.category] ||= []).push(p);
  return acc;
}, {});

// ── Productos ──────────────────────────────────────────────────────────
const productsSource = fs.readFileSync(PRODUCTS_FILE, "utf8");
const productIds = [...productsSource.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

// Extraer nombre y description con un regex simple
const products = productIds.map((id) => {
  const blockRegex = new RegExp(
    `id:\\s*'${id}'[\\s\\S]*?name:\\s*'([^']+)'[\\s\\S]*?description:\\s*\\n?\\s*'([^']+)'`
  );
  const m = productsSource.match(blockRegex);
  return {
    id,
    url: `${BASE}/recursos/${id}`,
    name: m?.[1] ?? id,
    description: m?.[2] ?? "",
  };
});

// ── llms.txt — directorio navegable ────────────────────────────────────
const llmsTxt = [
  `# Espacio Lenguaje`,
  ``,
  `> Proyecto de divulgación clínica sobre logopedia infantil basado en evidencia. Contenido para familias con niños de 0 a 8 años (con o sin dificultades del lenguaje), supervisado por logopeda colegiada en la Comunitat Valenciana con formación especializada en Atención Temprana.`,
  ``,
  `Este sitio sigue un proceso editorial con referencias a guías oficiales (GAT, AEP, DSM-5, ASHA, Plena Inclusión). Cada artículo indica fecha de publicación, fecha de revisión y credenciales institucionales del equipo editorial. Ver metodología y fuentes en [/sobre-nosotros](${BASE}/sobre-nosotros).`,
  ``,
  `## Páginas clave`,
  ``,
  `- [Sobre nosotros — Equipo editorial y metodología](${BASE}/sobre-nosotros): credenciales, proceso de revisión, guías clínicas de referencia.`,
  `- [Blog](${BASE}/blog): artículos de divulgación clínica por categorías.`,
  `- [Recursos descargables](${BASE}/recursos): cuadernos y guías creados por logopedas para trabajar en casa.`,
  `- [Guía gratuita de hitos del lenguaje](${BASE}/lp/guia-gratis): PDF descargable con los hitos de 0 a 6 años y señales de alerta.`,
];

// Secciones por categoría de blog
for (const [category, list] of Object.entries(postsByCategory).sort()) {
  llmsTxt.push(``, `## Blog — ${category}`, ``);
  for (const p of list.sort((a, b) => a.title.localeCompare(b.title))) {
    llmsTxt.push(`- [${p.title}](${p.url}): ${p.excerpt}`);
  }
}

// Sección productos
llmsTxt.push(``, `## Recursos descargables`, ``);
for (const p of products) {
  llmsTxt.push(`- [${p.name}](${p.url}): ${p.description}`);
}

llmsTxt.push(``);

fs.writeFileSync(path.join(PUBLIC, "llms.txt"), llmsTxt.join("\n"), "utf8");
console.log(`✓ public/llms.txt — ${postFiles.length} posts, ${products.length} productos`);

// ── llms-full.txt — contenido concatenado para LLMs ────────────────────
const llmsFull = [
  `# Espacio Lenguaje — Contenido completo`,
  ``,
  `> Versión extendida para LLMs: contiene el texto completo de los artículos de blog publicados, agrupados por categoría. Cada artículo mantiene sus fechas de publicación y última revisión.`,
  ``,
  `Todo el contenido está supervisado por logopeda colegiada en la Comunitat Valenciana. Metodología y referencias: ${BASE}/sobre-nosotros`,
  ``,
  `---`,
  ``,
];

for (const [category, list] of Object.entries(postsByCategory).sort()) {
  llmsFull.push(`# ${category}`, ``);
  for (const p of list.sort((a, b) => new Date(b.date) - new Date(a.date))) {
    llmsFull.push(`## ${p.title}`);
    llmsFull.push(`URL: ${p.url}`);
    llmsFull.push(`Publicado: ${p.date}${p.updatedAt && p.updatedAt !== p.date ? ` · Actualizado: ${p.updatedAt}` : ""}`);
    llmsFull.push(``);
    llmsFull.push(p.content);
    llmsFull.push(``, `---`, ``);
  }
}

fs.writeFileSync(path.join(PUBLIC, "llms-full.txt"), llmsFull.join("\n"), "utf8");
const sizeKB = (fs.statSync(path.join(PUBLIC, "llms-full.txt")).size / 1024).toFixed(1);
console.log(`✓ public/llms-full.txt — ${sizeKB} KB`);
