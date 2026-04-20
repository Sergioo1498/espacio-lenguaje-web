// Bulk URL inspection: inspect every URL in our sitemap and report the
// coverage state so we can diagnose indexing problems in one run.
// Usage: node scripts/gsc-bulk-inspect.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSearchConsoleClient, SITE_URL } from './_gsc-client.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const PRODUCTS_FILE = path.join(__dirname, '..', 'src', 'lib', 'products.ts');
const BASE = SITE_URL.replace(/\/$/, '');

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

// Parse product IDs from products.ts (avoids importing a TS file from Node)
const productsSource = fs.readFileSync(PRODUCTS_FILE, 'utf8');
const productIds = [...productsSource.matchAll(/^\s*id:\s*'([^']+)'/gm)].map(
  (m) => '/recursos/' + m[1]
);

const all = [...STATIC_URLS, ...blogSlugs, ...productIds];

const sc = getSearchConsoleClient();

function pad(str, len) {
  str = String(str || '');
  if (str.length >= len) return str.slice(0, len);
  return str + ' '.repeat(len - str.length);
}

console.log(`Inspecting ${all.length} URLs...\n`);
console.log(
  pad('URL', 55) +
    pad('Verdict', 10) +
    pad('Coverage', 40) +
    pad('Last crawl', 12) +
    'Canonical mismatch'
);
console.log('-'.repeat(130));

const results = [];

for (const urlPath of all) {
  const inspectionUrl = BASE + urlPath;
  try {
    const res = await sc.urlInspection.index.inspect({
      requestBody: { inspectionUrl, siteUrl: SITE_URL },
    });
    const r = res.data.inspectionResult?.indexStatusResult || {};
    const crawl = r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : 'never';
    const canonicalMismatch =
      r.googleCanonical && r.userCanonical && r.googleCanonical !== r.userCanonical
        ? `${r.userCanonical} → ${r.googleCanonical}`
        : '';
    results.push({
      url: urlPath,
      verdict: r.verdict,
      coverageState: r.coverageState,
      lastCrawlTime: r.lastCrawlTime,
      crawledAs: r.crawledAs,
      googleCanonical: r.googleCanonical,
      userCanonical: r.userCanonical,
      robotsTxtState: r.robotsTxtState,
      indexingState: r.indexingState,
    });
    console.log(
      pad(urlPath, 55) +
        pad(r.verdict, 10) +
        pad(r.coverageState, 40) +
        pad(crawl, 12) +
        canonicalMismatch
    );
  } catch (err) {
    console.log(pad(urlPath, 55) + 'ERROR    ' + err.message);
    results.push({ url: urlPath, error: err.message });
  }
}

console.log('\n=== SUMMARY ===');
const byState = {};
for (const r of results) {
  const key = r.error ? `ERROR: ${r.error}` : r.coverageState || '(no coverage)';
  byState[key] = (byState[key] || 0) + 1;
}
for (const [k, v] of Object.entries(byState).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${v.toString().padStart(3)}  ${k}`);
}

const neverCrawled = results.filter((r) => !r.lastCrawlTime && !r.error);
if (neverCrawled.length) {
  console.log(`\n${neverCrawled.length} URLs never crawled:`);
  for (const r of neverCrawled) console.log(`  ${r.url}`);
}

const canonicalMismatches = results.filter(
  (r) => r.googleCanonical && r.userCanonical && r.googleCanonical !== r.userCanonical
);
if (canonicalMismatches.length) {
  console.log(`\n${canonicalMismatches.length} canonical mismatches:`);
  for (const r of canonicalMismatches) {
    console.log(`  ${r.url}\n    user:  ${r.userCanonical}\n    Google: ${r.googleCanonical}`);
  }
}

const notIndexed = results.filter(
  (r) => r.verdict && r.verdict !== 'PASS' && !r.error
);
if (notIndexed.length) {
  console.log(`\n${notIndexed.length} URLs NOT indexed (verdict != PASS):`);
  for (const r of notIndexed) {
    console.log(`  [${r.verdict}] ${r.coverageState}  →  ${r.url}`);
  }
}

fs.writeFileSync(
  path.join(__dirname, '..', '.gsc-bulk-inspect.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nFull JSON saved to: .gsc-bulk-inspect.json');
