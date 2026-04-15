// Request fresh indexing of all main URLs by re-submitting the sitemap
// and inspecting key URLs (which signals Google to recrawl them).
// Usage: node scripts/gsc-request-indexing.mjs

import { getSearchConsoleClient, SITE_URL, SITEMAP_URL } from './_gsc-client.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content');

const sc = getSearchConsoleClient();

const STATIC_URLS = [
  '/',
  '/blog',
  '/recursos',
  '/recomendaciones',
  '/sobre-nosotros',
  '/contacto',
];

const blogSlugs = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => '/blog/' + f.replace(/\.mdx$/, ''));

const allPaths = [...STATIC_URLS, ...blogSlugs];

console.log(`\n=== RE-CRAWL REQUEST — ${allPaths.length} URLs ===\n`);

// 1) Resubmit sitemap (signals freshness)
try {
  await sc.sitemaps.submit({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
  console.log('✓ Sitemap reenviado\n');
} catch (err) {
  console.error('✗ Sitemap error:', err.message);
}

// 2) Inspect each URL (this triggers a fresh crawl request inside Google)
console.log('Solicitando re-crawl de cada URL...\n');
let ok = 0;
let fail = 0;
for (const p of allPaths) {
  const url = `${SITE_URL.replace(/\/$/, '')}${p}`;
  try {
    const res = await sc.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: SITE_URL },
    });
    const r = res.data.inspectionResult?.indexStatusResult;
    const verdict = r?.verdict || '—';
    const cov = r?.coverageState || '—';
    const last = r?.lastCrawlTime?.slice(0, 10) || 'never';
    const flag = verdict === 'PASS' ? '✓' : verdict === 'NEUTRAL' ? '⚠' : '✗';
    console.log(`${flag} ${p.padEnd(50)} ${verdict.padEnd(10)} ${cov.padEnd(50)} last:${last}`);
    ok++;
  } catch (err) {
    console.log(`✗ ${p.padEnd(50)} ERROR: ${err.message}`);
    fail++;
  }
  // Rate limit: 1 inspection per 0.5s to avoid 429
  await new Promise((r) => setTimeout(r, 500));
}

console.log(`\nInspeccionadas: ${ok}/${allPaths.length}, fallos: ${fail}`);
console.log('\nNota: la Indexing API real requiere otra cuenta y verificación adicional.');
console.log('Las URLs marcadas como ⚠ NEUTRAL necesitan acción manual:');
console.log('  Search Console → Inspeccionar URL → Solicitar indexación.');
