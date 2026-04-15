// Download the top queries (keywords) from Search Console for the last 90 days.
// Shows impressions, clicks, CTR, and average position.
// Usage: node scripts/gsc-keywords.mjs

import { getSearchConsoleClient, SITE_URL } from './_gsc-client.mjs';

const sc = getSearchConsoleClient();

const endDate = new Date().toISOString().slice(0, 10);
const start = new Date();
start.setDate(start.getDate() - 90);
const startDate = start.toISOString().slice(0, 10);

console.log(`\n=== KEYWORDS (últimos 90 días) ===\nRango: ${startDate} → ${endDate}\n`);

try {
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 100,
      orderBy: [{ field: 'impressions', descending: true }],
    },
  });

  const rows = res.data.rows || [];
  if (rows.length === 0) {
    console.log('Aún no hay datos de Search Console (necesita 2-7 días tras indexación inicial).');
    process.exit(0);
  }

  console.log(`Top ${rows.length} keywords por impresiones:\n`);
  console.log('Pos  | Impr   | Clicks | CTR   | Keyword');
  console.log('-----|--------|--------|-------|--------------------------------');

  for (const row of rows) {
    const [query] = row.keys;
    const impr = String(row.impressions).padStart(6);
    const clicks = String(row.clicks).padStart(6);
    const ctr = (row.ctr * 100).toFixed(1).padStart(5) + '%';
    const pos = row.position.toFixed(1).padStart(4);
    console.log(`${pos} | ${impr} | ${clicks} | ${ctr} | ${query}`);
  }

  // Opportunities: keywords ranking on page 2 (positions 11-20)
  const opportunities = rows.filter((r) => r.position >= 11 && r.position <= 20 && r.impressions >= 10);
  if (opportunities.length > 0) {
    console.log(`\n=== OPORTUNIDADES (posición 11-20, cerca de página 1) ===\n`);
    for (const row of opportunities) {
      console.log(`  · "${row.keys[0]}" — pos ${row.position.toFixed(1)}, ${row.impressions} impr, ${row.clicks} clicks`);
    }
    console.log(`\nOptimiza estos artículos primero — son los más rentables.`);
  }
} catch (err) {
  console.error('✗ Error:', err.message);
  if (err.errors) console.error(err.errors);
  process.exit(1);
}
