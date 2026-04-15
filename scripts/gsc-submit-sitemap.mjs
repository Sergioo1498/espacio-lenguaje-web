// Submit sitemap.xml to Google Search Console.
// Usage: node scripts/gsc-submit-sitemap.mjs

import { getSearchConsoleClient, SITE_URL, SITEMAP_URL } from './_gsc-client.mjs';

const sc = getSearchConsoleClient();

console.log(`\n=== ENVIANDO SITEMAP ===\nSitio:   ${SITE_URL}\nSitemap: ${SITEMAP_URL}\n`);

try {
  await sc.sitemaps.submit({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
  console.log('✓ Sitemap enviado correctamente\n');

  const res = await sc.sitemaps.list({ siteUrl: SITE_URL });
  console.log('Sitemaps actuales:');
  for (const s of res.data.sitemap || []) {
    console.log(`  - ${s.path} (last submitted: ${s.lastSubmitted || 'nunca'}, warnings: ${s.warnings || 0}, errors: ${s.errors || 0})`);
  }
} catch (err) {
  console.error('✗ Error:', err.message);
  if (err.errors) console.error(err.errors);
  process.exit(1);
}
