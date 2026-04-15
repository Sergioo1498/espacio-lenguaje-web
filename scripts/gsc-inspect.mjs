// Inspect a specific URL to check if Google has indexed it.
// Usage: node scripts/gsc-inspect.mjs <url-path>
// Example: node scripts/gsc-inspect.mjs /blog/mi-hijo-no-habla-cuando-preocuparse

import { getSearchConsoleClient, SITE_URL } from './_gsc-client.mjs';

const sc = getSearchConsoleClient();

// Git Bash en Windows convierte paths que empiezan con "/" en rutas absolutas.
// Para evitarlo, pasa el path sin "/" inicial o usa prefijo ":": node script.mjs blog/...
let arg = process.argv[2] || '';
// Strip Windows drive/Git prefix if present
arg = arg.replace(/^[A-Za-z]:[\\/]Program Files[\\/]Git[\\/]?/, '/');
if (!arg) arg = '/';
if (!arg.startsWith('/') && !arg.startsWith('http')) arg = '/' + arg;
const inspectionUrl = arg.startsWith('http') ? arg : `${SITE_URL.replace(/\/$/, '')}${arg}`;

console.log(`\nInspecting: ${inspectionUrl}\n`);

try {
  const res = await sc.urlInspection.index.inspect({
    requestBody: { inspectionUrl, siteUrl: SITE_URL },
  });

  const r = res.data.inspectionResult;
  const idx = r?.indexStatusResult;
  console.log('Index status:');
  console.log(`  Verdict:           ${idx?.verdict || '—'}`);
  console.log(`  Coverage state:    ${idx?.coverageState || '—'}`);
  console.log(`  Crawled as:        ${idx?.crawledAs || '—'}`);
  console.log(`  Last crawl:        ${idx?.lastCrawlTime || 'no crawleada'}`);
  console.log(`  Google canonical:  ${idx?.googleCanonical || '—'}`);
  console.log(`  User canonical:    ${idx?.userCanonical || '—'}`);
  console.log(`  Robots.txt:        ${idx?.robotsTxtState || '—'}`);
  console.log(`  Indexing state:    ${idx?.indexingState || '—'}`);
  if (idx?.referringUrls?.length) {
    console.log(`  Referring URLs:    ${idx.referringUrls.length}`);
  }
  console.log(`\nVer en Search Console:\n  ${r?.inspectionResultLink}\n`);
} catch (err) {
  console.error('✗ Error:', err.message);
  process.exit(1);
}
