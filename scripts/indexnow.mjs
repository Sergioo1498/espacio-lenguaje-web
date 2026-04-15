// IndexNow — instant indexing notification for Bing, Yandex, Seznam, Naver.
// Uses a random API key that we also expose at /<key>.txt for verification.
// Usage: node scripts/indexnow.mjs

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const CONTENT_DIR = path.join(ROOT, 'content');
const BASE = 'https://www.espaciolenguaje.com';
const HOST = 'www.espaciolenguaje.com';

// Stable API key (saved on disk, never changes)
const KEY_FILE = path.join(ROOT, '.indexnow-key');
let KEY;
if (fs.existsSync(KEY_FILE)) {
  KEY = fs.readFileSync(KEY_FILE, 'utf8').trim();
} else {
  KEY = crypto.randomBytes(16).toString('hex');
  fs.writeFileSync(KEY_FILE, KEY);
}

// Write verification file in /public so search engines can validate ownership
const verificationFile = path.join(PUBLIC, `${KEY}.txt`);
fs.writeFileSync(verificationFile, KEY);
console.log(`✓ Verification file: public/${KEY}.txt`);

// Build URL list
const STATIC = ['/', '/blog', '/recursos', '/recomendaciones', '/sobre-nosotros', '/contacto'];
const slugs = fs.readdirSync(CONTENT_DIR)
  .filter(f => f.endsWith('.mdx'))
  .map(f => '/blog/' + f.replace(/\.mdx$/, ''));
const urlList = [...STATIC, ...slugs].map(p => BASE + (p === '/' ? '' : p));

console.log(`\n=== IndexNow — notificando ${urlList.length} URLs ===\n`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${BASE}/${KEY}.txt`,
  urlList,
};

const endpoints = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/IndexNow',
];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    const flag = res.ok ? '✓' : '✗';
    console.log(`${flag} ${endpoint}  [${res.status}] ${text.slice(0, 100) || 'OK'}`);
  } catch (err) {
    console.log(`✗ ${endpoint}  ERROR: ${err.message}`);
  }
}

console.log(`\nKey (guárdala para referencia): ${KEY}`);
console.log('Bing y Yandex indexarán estas URLs en las próximas horas.');
console.log('Nota: IndexNow NO notifica a Google (Google no lo soporta).');
