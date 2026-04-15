// Download top pages performance from Search Console (last 90 days).
// Shows which URLs get the most impressions and clicks.
// Usage: node scripts/gsc-pages.mjs

import { getSearchConsoleClient, SITE_URL } from './_gsc-client.mjs';

const sc = getSearchConsoleClient();

const endDate = new Date().toISOString().slice(0, 10);
const start = new Date();
start.setDate(start.getDate() - 90);
const startDate = start.toISOString().slice(0, 10);

console.log(`\n=== PÁGINAS (últimos 90 días) ===\nRango: ${startDate} → ${endDate}\n`);

try {
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 50,
      orderBy: [{ field: 'impressions', descending: true }],
    },
  });

  const rows = res.data.rows || [];
  if (rows.length === 0) {
    console.log('Aún no hay datos (necesita 2-7 días tras indexación inicial).');
    process.exit(0);
  }

  console.log(`Top ${rows.length} páginas:\n`);
  for (const row of rows) {
    const [page] = row.keys;
    const shortPage = page.replace('https://www.espaciolenguaje.com', '') || '/';
    console.log(`  · ${shortPage}`);
    console.log(`      Impr: ${row.impressions} | Clicks: ${row.clicks} | CTR: ${(row.ctr * 100).toFixed(1)}% | Pos: ${row.position.toFixed(1)}`);
  }
} catch (err) {
  console.error('✗ Error:', err.message);
  process.exit(1);
}
