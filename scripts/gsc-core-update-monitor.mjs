// Monitor de Core Update — compara últimos 7 días vs 7-14 días previos.
// Útil durante rollouts de Google Core Update (March 2026, May 2026 en curso).
// Uso: node scripts/gsc-core-update-monitor.mjs
//
// Lee del cache si existe (.gsc-monitor-cache.json) para detectar regresiones
// respecto a la última ejecución (no solo vs. ventana móvil).

import { getSearchConsoleClient, SITE_URL } from './_gsc-client.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE = path.join(__dirname, '..', '.gsc-monitor-cache.json');

function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

function shift(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return fmtDate(d);
}

async function query(sc, startDate, endDate) {
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit: 100,
    },
  });
  const rows = res.data.rows || [];
  const totals = rows.reduce(
    (a, r) => ({
      clicks: a.clicks + (r.clicks || 0),
      impressions: a.impressions + (r.impressions || 0),
    }),
    { clicks: 0, impressions: 0 }
  );
  const byPage = new Map();
  for (const r of rows) {
    const p = (r.keys?.[0] || '').replace(SITE_URL.replace(/\/$/, ''), '') || '/';
    byPage.set(p, {
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      position: r.position || 0,
      ctr: r.ctr || 0,
    });
  }
  return { totals, byPage };
}

const sc = getSearchConsoleClient();

// Ventanas: hoy excluido por delay GSC (2-3 días). Usamos -3 como "ahora".
const now = -3;
const win = 7;
const recent = await query(sc, shift(now + win + win), shift(now + win)); // -17 a -10
const current = await query(sc, shift(now + win), shift(now)); // -10 a -3

console.log(`\n=== CORE UPDATE MONITOR — ${fmtDate(new Date())} ===\n`);
console.log(`Comparación: últimos 7 días vs 7 días previos\n`);
console.log(
  `  Periodo "actual" : ${shift(now + win)} → ${shift(now)}`
);
console.log(
  `  Periodo "previo" : ${shift(now + win + win)} → ${shift(now + win)}\n`
);

const totalDelta = current.totals.clicks - recent.totals.clicks;
const totalPct = recent.totals.clicks
  ? Math.round((totalDelta / recent.totals.clicks) * 100)
  : 0;

console.log(`Clicks: ${current.totals.clicks} vs ${recent.totals.clicks} (${totalDelta >= 0 ? '+' : ''}${totalDelta}, ${totalPct >= 0 ? '+' : ''}${totalPct}%)`);
console.log(
  `Impresiones: ${current.totals.impressions} vs ${recent.totals.impressions}\n`
);

// Per-page comparison
const allPaths = new Set([...current.byPage.keys(), ...recent.byPage.keys()]);
const deltas = [];
for (const p of allPaths) {
  const a = current.byPage.get(p) || { clicks: 0, impressions: 0, position: 0 };
  const b = recent.byPage.get(p) || { clicks: 0, impressions: 0, position: 0 };
  const dClicks = a.clicks - b.clicks;
  const dPos = a.position && b.position ? a.position - b.position : 0;
  deltas.push({ path: p, ...a, dClicks, dPos, prevClicks: b.clicks, prevPos: b.position });
}

const winners = deltas
  .filter((d) => d.dClicks > 0)
  .sort((a, b) => b.dClicks - a.dClicks)
  .slice(0, 5);
const losers = deltas
  .filter((d) => d.dClicks < 0)
  .sort((a, b) => a.dClicks - b.dClicks)
  .slice(0, 5);
const posDrops = deltas
  .filter((d) => d.dPos > 5 && d.impressions > 20)
  .sort((a, b) => b.dPos - a.dPos)
  .slice(0, 5);

console.log('🟢 GANADORES (top 5 clicks delta):');
for (const w of winners) {
  console.log(
    `  +${w.dClicks}  ${w.path.padEnd(50)} ${w.clicks} clicks · pos ${w.position.toFixed(1)} (era ${w.prevPos.toFixed(1)})`
  );
}

console.log('\n🔴 PERDEDORES (top 5 clicks delta):');
for (const l of losers) {
  console.log(
    `  ${l.dClicks}  ${l.path.padEnd(50)} ${l.clicks} clicks · pos ${l.position.toFixed(1)} (era ${l.prevPos.toFixed(1)})`
  );
}

console.log('\n⚠️  CAÍDAS DE POSICIÓN (>5 pos abajo, >20 impr):');
for (const p of posDrops) {
  console.log(
    `  ${p.path.padEnd(50)} pos ${p.position.toFixed(1)} (era ${p.prevPos.toFixed(1)}, +${p.dPos.toFixed(1)} pos)`
  );
}

// Guardar snapshot para próxima ejecución
const snapshot = {
  timestamp: new Date().toISOString(),
  current: { window: [shift(now + win), shift(now)], totals: current.totals },
  recent: { window: [shift(now + win + win), shift(now + win)], totals: recent.totals },
  topDeltas: { winners, losers, posDrops },
};
fs.writeFileSync(CACHE, JSON.stringify(snapshot, null, 2));
console.log(`\n💾 Snapshot guardado en ${path.relative(process.cwd(), CACHE)}`);
console.log('\nEjecuta este script diariamente durante el rollout del Core Update.');
