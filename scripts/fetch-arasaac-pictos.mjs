// Descarga pictogramas de Arasaac para cada palabra-diana de las 30 fichas.
// API: https://api.arasaac.org/api/pictograms/es/search/{word}
// Pictogramas estáticos: https://static.arasaac.org/pictograms/{id}/{id}_300.png
// Licencia: Creative Commons BY-NC-SA (Arasaac · Gobierno de Aragón)
// Uso: node scripts/fetch-arasaac-pictos.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FICHAS_JSON = "/tmp/fichas-parsed.json";
const OUT_DIR = path.join(ROOT, "public", "downloads", "productos", "_preview", "assets", "arasaac");

fs.mkdirSync(OUT_DIR, { recursive: true });

const fichas = JSON.parse(fs.readFileSync(FICHAS_JSON, "utf8"));

async function searchArasaac(word) {
  const url = `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(word.toLowerCase())}`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const arr = await r.json();
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[0]._id;
}

async function downloadPicto(id, outPath) {
  if (fs.existsSync(outPath)) return true;
  const url = `https://static.arasaac.org/pictograms/${id}/${id}_300.png`;
  const r = await fetch(url);
  if (!r.ok) return false;
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return true;
}

const results = [];
const missing = [];

for (const f of fichas) {
  const fichaImgs = { num: f.num, fonema: f.fonema, inicio: null, medio: null, final: null };
  for (const slot of ["inicio", "medio", "final"]) {
    const word = f[slot];
    if (!word) continue;
    try {
      const id = await searchArasaac(word);
      if (!id) {
        missing.push({ ficha: f.num, slot, word });
        continue;
      }
      const filename = `${id}.png`;
      const outPath = path.join(OUT_DIR, filename);
      const ok = await downloadPicto(id, outPath);
      if (ok) {
        fichaImgs[slot] = { id, word, filename };
      } else {
        missing.push({ ficha: f.num, slot, word, reason: "download-failed" });
      }
    } catch (e) {
      missing.push({ ficha: f.num, slot, word, reason: e.message });
    }
    await new Promise((r) => setTimeout(r, 100)); // gentle rate-limit
  }
  results.push(fichaImgs);
  process.stdout.write(`  Ficha ${f.num} (${f.fonema})  `);
}

console.log("\n\n=== RESULTADO ===");
const totalSlots = results.length * 3;
const okSlots = results.reduce((a, r) => a + ["inicio", "medio", "final"].filter((s) => r[s]).length, 0);
console.log(`Pictogramas obtenidos: ${okSlots}/${totalSlots}`);
console.log(`Faltantes: ${missing.length}`);
for (const m of missing) console.log(`  · Ficha ${m.ficha}/${m.slot}: "${m.word}" (${m.reason || "no-results"})`);

fs.writeFileSync("/tmp/fichas-with-pictos.json", JSON.stringify(results, null, 2));
console.log("\nGuardado /tmp/fichas-with-pictos.json");
