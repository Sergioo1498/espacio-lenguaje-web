// List all blog URLs from the sitemap (helper for batch operations).
// Usage: node scripts/gsc-list-urls.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const BASE = 'https://www.espaciolenguaje.com';

const STATIC_URLS = [
  '/',
  '/blog',
  '/recursos',
  '/recomendaciones',
  '/sobre-nosotros',
  '/contacto',
  '/lp/guia-gratis',
];

const blogSlugs = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => '/blog/' + f.replace(/\.mdx$/, ''));

const all = [...STATIC_URLS, ...blogSlugs];
console.log(`Total URLs: ${all.length}\n`);
for (const url of all) console.log(BASE + url);
