// Submit URLs to Google's Indexing API for instant crawl/indexing.
// Usage: node scripts/gsc-index-now.mjs
// Requires: token with scope https://www.googleapis.com/auth/indexing

import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENT_FILE = path.join(ROOT, 'google-oauth-client.json');
const TOKEN_FILE = path.join(ROOT, 'google-oauth-token.json');
const CONTENT_DIR = path.join(ROOT, 'content');
const BASE = 'https://www.espaciolenguaje.com';

const credentials = JSON.parse(fs.readFileSync(CLIENT_FILE, 'utf8'));
const tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
const { client_id, client_secret } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  'http://localhost:53682'
);
oAuth2Client.setCredentials(tokens);

// All URLs that need indexing
const STATIC = ['/', '/blog', '/recursos', '/recomendaciones', '/sobre-nosotros', '/contacto'];
const slugs = fs.readdirSync(CONTENT_DIR)
  .filter(f => f.endsWith('.mdx'))
  .map(f => '/blog/' + f.replace(/\.mdx$/, ''));

const urls = [...STATIC, ...slugs].map(p => BASE + (p === '/' ? '' : p));

console.log(`\n=== INDEXING API — ${urls.length} URLs ===\n`);

const indexing = google.indexing({ version: 'v3', auth: oAuth2Client });

let ok = 0;
let fail = 0;
for (const url of urls) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    });
    const ts = res.data.urlNotificationMetadata?.latestUpdate?.notifyTime?.slice(0, 19) || '—';
    console.log(`✓ ${url.replace(BASE, '').padEnd(50)} notified at ${ts}`);
    ok++;
  } catch (err) {
    const code = err.code || err.response?.status;
    const msg = err.message?.split('\n')[0] || String(err);
    console.log(`✗ ${url.replace(BASE, '').padEnd(50)} [${code}] ${msg}`);
    fail++;
  }
  // Rate limit: max 200 req/day, 1 req/s
  await new Promise(r => setTimeout(r, 1100));
}

console.log(`\nNotificadas: ${ok}/${urls.length}, fallos: ${fail}`);
console.log('Google rastreará estas URLs en las próximas horas (no días).\n');
