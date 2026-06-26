// Validación automática de cada producto antes de publicar/revivir.
// Detecta mismatches entre la promesa (web) y el contenido real (PDF).
//
// Uso: node scripts/validate-products.mjs
//
// Salida: tabla con verdict por producto. Exit 1 si hay errores BLOQUEANTES.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const require_ = createRequire(import.meta.url);

// Cargar productos via tsx en lugar de import (TS sin compilar)
const productsTs = fs.readFileSync(path.join(ROOT, "src/lib/products.ts"), "utf8");
const contentTs = fs.readFileSync(path.join(ROOT, "src/lib/products-content.ts"), "utf8");

// Extract product objects con regex (sin TS compiler)
const productMatches = [...productsTs.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?\},?\n\s{2}\{|\{\s*id:\s*'([^']+)'[\s\S]*?\n\s{2}\},/g)];
// Sencillo: parsear cada producto que tenga "id:"
const productRegex = /id:\s*'([^']+)'[\s\S]*?file:\s*'([^']+)'/g;
const products = [];
let m;
while ((m = productRegex.exec(productsTs)) !== null) {
  const id = m[1];
  const file = m[2];
  const slice = productsTs.slice(m.index, m.index + 800);
  const name = slice.match(/name:\s*'([^']+)'/)?.[1];
  const disabled = /disabled:\s*true/.test(slice);
  products.push({ id, file, name, disabled });
}

// pdf-parse opcional
let PDFParse;
try {
  ({ PDFParse } = require_("pdf-parse"));
} catch {
  console.error("⚠ pdf-parse no instalado; ejecuta: npm install pdf-parse --no-save");
  process.exit(2);
}

const results = [];
const MIN_PAGES = 8;
const MIN_CHARS = 1500;

for (const p of products) {
  const result = { id: p.id, name: p.name, disabled: p.disabled, issues: [], verdict: "OK" };

  // 1) Página de venta tiene importantNotice si producto es ambiguo? — solo info
  const contentBlock = contentTs.split(`'${p.id}':`)[1]?.split("'\n  },")?.[0] || "";
  result.hasWhatIncludes = contentBlock.includes("whatIncludes:");
  result.hasWhatDoesNot = contentBlock.includes("whatDoesNotInclude:");
  result.hasNotForYou = contentBlock.includes("notForYouIf:");
  result.hasNotice = contentBlock.includes("importantNotice:");
  if (!result.hasWhatIncludes) result.issues.push("[warn] Falta whatIncludes (transparencia)");
  if (!result.hasWhatDoesNot) result.issues.push("[warn] Falta whatDoesNotInclude (transparencia)");

  // 2) PDF: archivo presente
  if (p.file === "multiple") {
    result.issues.push("[info] file=multiple (pack); no se valida tamaño individual");
  } else {
    const pdfPath = path.join(ROOT, "public", p.file);
    if (!fs.existsSync(pdfPath)) {
      result.issues.push("[BLOQUEANTE] PDF no existe: " + p.file);
      result.verdict = "BLOQUEANTE";
      results.push(result);
      continue;
    }
    const stat = fs.statSync(pdfPath);
    result.sizeKB = Math.round(stat.size / 1024);
    if (stat.size < 50_000) {
      result.issues.push("[BLOQUEANTE] PDF demasiado pequeño (<50KB): " + result.sizeKB + "KB");
      result.verdict = "BLOQUEANTE";
    }

    // 3) Parse PDF
    try {
      const buf = fs.readFileSync(pdfPath);
      const data = await new PDFParse({ data: buf }).getText();
      result.chars = data.text.length;
      if (data.text.length < MIN_CHARS) {
        result.issues.push("[BLOQUEANTE] PDF tiene <" + MIN_CHARS + " chars de texto (" + data.text.length + ")");
        result.verdict = "BLOQUEANTE";
      }
    } catch (e) {
      result.issues.push("[warn] No se pudo parsear el PDF: " + e.message);
    }
  }

  if (result.verdict === "OK" && result.issues.length > 0) result.verdict = "WARN";
  results.push(result);
}

console.log("\n=== VALIDACIÓN DE PRODUCTOS ===\n");
console.log("Id".padEnd(25) + "Verdict".padEnd(15) + "Disabled  Size       Chars    Transparencia");
console.log("─".repeat(95));
for (const r of results) {
  const tr = (r.hasWhatIncludes ? "✓" : "✗") + (r.hasWhatDoesNot ? "✓" : "✗") + (r.hasNotForYou ? "✓" : "·") + (r.hasNotice ? "✓" : "·");
  console.log(
    r.id.padEnd(25) +
      r.verdict.padEnd(15) +
      (r.disabled ? "🚫 SÍ     " : "          ") +
      ((r.sizeKB ? r.sizeKB + "KB" : "—").padEnd(11)) +
      ((r.chars ? r.chars.toString() : "—").padEnd(9)) +
      tr
  );
  for (const iss of r.issues) console.log("    " + iss);
}

const blocking = results.filter((r) => r.verdict === "BLOQUEANTE").length;
const warnings = results.filter((r) => r.verdict === "WARN").length;
console.log("\nResumen:", results.length, "productos ·", blocking, "BLOQUEANTES ·", warnings, "WARNINGS");
console.log("\nLeyenda transparencia: [whatIncludes][whatDoesNotInclude][notForYouIf][importantNotice]");
console.log("    ✓ presente · ✗ falta (warn) · · opcional");

if (blocking > 0) {
  console.log("\n❌ Validación FALLIDA — no publicar hasta resolver bloqueantes.");
  process.exit(1);
} else if (warnings > 0) {
  console.log("\n⚠ Validación con warnings — revisar antes de re-activar productos pausados.");
  process.exit(0);
} else {
  console.log("\n✅ Todos los productos validados sin errores.");
  process.exit(0);
}
