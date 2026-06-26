// Genera pack-fichas-articulacion-v3.pdf con pictogramas Arasaac.
// Uso: node scripts/generate-fichas-v3.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "public", "downloads", "productos", "_preview", "assets", "arasaac");
const FICHAS_JSON = "/tmp/fichas-with-pictos.json";
const SOURCE_MD = path.join(ROOT, "public", "downloads", "productos", "_preview", "pack-fichas-articulacion-content.md");

const HTML_OUT = path.join(ROOT, "public", "downloads", "productos", "_preview", "pack-fichas-articulacion-v3.html");
const PDF_OUT = path.join(ROOT, "public", "downloads", "productos", "pack-fichas-articulacion.pdf");
const PDF_V3 = path.join(ROOT, "public", "downloads", "productos", "_preview", "pack-fichas-articulacion-v3.pdf");

const fichas = JSON.parse(fs.readFileSync(FICHAS_JSON, "utf8"));
const sourceMd = fs.readFileSync(SOURCE_MD, "utf8");

// Helper: imagen → base64 data URI
function pictoUri(filename) {
  if (!filename) return null;
  const p = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(p)) return null;
  const buf = fs.readFileSync(p);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

// Parse cada ficha del MD para extraer datos no incluidos en JSON
function getFichaData(num) {
  const re = new RegExp(`## Ficha ${num}[\\s\\S]*?(?=## Ficha |$)`, "m");
  const m = sourceMd.match(re);
  if (!m) return {};
  const sec = m[0];
  return {
    edad: sec.match(/Edad esperada de adquisición\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    posicion: sec.match(/Posición articulatoria\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    silabario: sec.match(/Silabario\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
    emoji: sec.match(/Emoji\*?\*?:\s*([^\n]+)/)?.[1]?.trim(),
  };
}

const fichasHTML = fichas
  .map((f) => {
    const md = getFichaData(f.num);
    const slots = ["inicio", "medio", "final"]
      .map((slot) => {
        const cell = f[slot];
        if (!cell) return `<div class="slot empty"><div class="slot-label">${slot[0].toUpperCase() + slot.slice(1)}</div><div class="slot-word">—</div></div>`;
        const uri = pictoUri(cell.filename);
        const img = uri
          ? `<img src="${uri}" alt="${cell.word}" />`
          : `<div class="no-pic">${cell.word.charAt(0)}</div>`;
        return `<div class="slot">
          <div class="slot-label">${slot[0].toUpperCase() + slot.slice(1)}</div>
          <div class="slot-image">${img}</div>
          <div class="slot-word">${cell.word}</div>
        </div>`;
      })
      .join("");

    return `<section class="ficha">
      <header class="ficha-header">
        <div class="ficha-num">Ficha ${f.num}</div>
        <div class="ficha-fonema">${f.fonema}</div>
        ${md.edad ? `<div class="ficha-meta">Edad esperada: <strong>${md.edad}</strong></div>` : ""}
      </header>
      ${md.posicion ? `<div class="posicion"><strong>Posición articulatoria:</strong> ${md.posicion}</div>` : ""}
      <div class="slots-grid">${slots}</div>
      ${md.silabario ? `<div class="silabario"><strong>Silabario:</strong> <span class="silabario-text">${md.silabario}</span></div>` : ""}
      <footer class="ficha-footer">
        <span>Pictogramas: Arasaac · Gobierno de Aragón · CC BY-NC-SA</span>
        <span>www.espaciolenguaje.com</span>
      </footer>
    </section>`;
  })
  .join("\n");

const coverHTML = `<section class="cover">
  <div class="cover-inner">
    <div class="cover-tag">RECURSO PARA FAMILIAS · v3 con pictogramas</div>
    <h1 class="cover-title">Pack de Fichas de Articulación</h1>
    <p class="cover-subtitle">30 fichas con pictogramas · Un fonema por página · Para casa</p>
    <div class="cover-claim">
      Pictogramas reales de Arasaac (Gobierno de Aragón, licencia Creative Commons).<br/>
      Revisado por logopeda colegiada · Espacio Lenguaje
    </div>
  </div>
</section>`;

const introHTML = `<section class="intro-page">
  <h2>Cómo usar estas fichas</h2>
  <p>Cada ficha presenta el fonema con tres palabras (inicial, media y final) acompañadas de su pictograma. Úsalas como cartas: enséñale el dibujo a tu peque, di la palabra exagerando el sonido objetivo, y pídele que la repita. <strong>5-10 minutos al día</strong> es lo ideal.</p>
  <h3>Seis claves antes de empezar</h3>
  <ul>
    <li><strong>Poco y diario</strong> mejor que mucho de vez en cuando.</li>
    <li><strong>Hazlo divertido</strong> — concurso, juego de cartas, esconde la ficha.</li>
    <li><strong>No corrijas con dureza</strong>: repite la palabra correctamente dentro de una frase ("sí, ¡un coche rojo!").</li>
    <li><strong>Celebra cada intento</strong>, no solo los aciertos.</li>
    <li><strong>Un fonema cada vez</strong>: empieza por el más fácil o el que casi tiene.</li>
    <li><strong>Si dura más de lo esperado por edad</strong>, consulta con logopeda colegiada.</li>
  </ul>
  <h3>Edades esperadas de adquisición (Bosch, 2004)</h3>
  <table>
    <tr><th>Edad</th><th>Fonemas esperados</th></tr>
    <tr><td><strong>3 años</strong></td><td>/p/, /b/, /t/, /d/, /k/, /g/, /m/, /n/, /ñ/, /f/, /ch/, /l/</td></tr>
    <tr><td><strong>4 años</strong></td><td>/s/, /y/, /ll/, /x/</td></tr>
    <tr><td><strong>5-6 años</strong></td><td>/z/, /r/ suave</td></tr>
    <tr><td><strong>6-7 años</strong></td><td>/rr/ y sinfones (bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, tr)</td></tr>
  </table>
  <p class="intro-warning"><strong>Importante:</strong> estos rangos son orientativos. Si tu peque persiste en errores fuera del rango esperable, consulta con logopeda colegiada para descartar causas subyacentes (frenillo, hipoacusia, dislalia fonológica).</p>
</section>`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Pack de Fichas de Articulación · v3 con pictogramas</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #2d2026; }

  .cover {
    width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #FDF8F4 0%, #F5E6D3 100%);
    page-break-after: always;
  }
  .cover-inner { text-align: center; padding: 60px; }
  .cover-tag {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #C4745A;
    font-weight: 700; margin-bottom: 30px;
  }
  .cover-title { font-size: 48px; font-weight: 800; color: #3D2C2E; margin: 0 0 16px 0; line-height: 1.1; }
  .cover-subtitle { font-size: 20px; color: #6b5a5c; margin: 0 0 50px 0; }
  .cover-claim {
    background: white; padding: 20px 28px; border-radius: 12px; display: inline-block;
    font-size: 13px; color: #6b5a5c; line-height: 1.6;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }

  .intro-page {
    width: 210mm; min-height: 297mm; padding: 40mm 25mm; page-break-after: always;
    background: white;
  }
  .intro-page h2 { font-size: 28px; color: #3D2C2E; margin-bottom: 16px; }
  .intro-page h3 { font-size: 18px; color: #C4745A; margin-top: 28px; margin-bottom: 10px; }
  .intro-page p { font-size: 14px; line-height: 1.7; color: #3D2C2E; }
  .intro-page ul { padding-left: 20px; font-size: 14px; line-height: 1.7; }
  .intro-page ul li { margin-bottom: 8px; }
  .intro-page table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  .intro-page th { background: #FDF8F4; color: #3D2C2E; text-align: left; padding: 10px 12px; border: 1px solid #F5E6D3; }
  .intro-page td { padding: 10px 12px; border: 1px solid #F5E6D3; vertical-align: top; }
  .intro-warning {
    background: #FDF8F4; border-left: 4px solid #C4745A; padding: 14px 18px; margin-top: 24px;
    font-size: 13px; color: #3D2C2E; border-radius: 4px;
  }

  .ficha {
    width: 210mm; height: 297mm; padding: 22mm 20mm;
    display: flex; flex-direction: column; page-break-after: always;
    background: white;
  }
  .ficha-header { text-align: center; border-bottom: 3px solid #C4745A; padding-bottom: 12px; margin-bottom: 22px; }
  .ficha-num {
    display: inline-block; background: #C4745A; color: white; padding: 4px 14px;
    border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 8px;
  }
  .ficha-fonema {
    font-size: 56px; font-weight: 900; color: #3D2C2E; line-height: 1;
    letter-spacing: -1px;
  }
  .ficha-meta { font-size: 13px; color: #6b5a5c; margin-top: 8px; }

  .posicion {
    background: #FDF8F4; padding: 12px 16px; border-radius: 8px; font-size: 12.5px;
    color: #3D2C2E; margin-bottom: 22px; line-height: 1.55;
  }
  .posicion strong { color: #C4745A; }

  .slots-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; flex: 1; }
  .slot {
    border: 2px solid #F5E6D3; border-radius: 12px; padding: 14px 10px;
    text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .slot.empty { background: #FDF8F4; opacity: 0.5; }
  .slot-label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #C4745A;
    font-weight: 700; margin-bottom: 10px;
  }
  .slot-image { width: 100%; height: 145px; display: flex; align-items: center; justify-content: center; }
  .slot-image img { max-width: 100%; max-height: 145px; object-fit: contain; }
  .no-pic {
    width: 90px; height: 90px; background: #8FAE8B; color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; font-weight: 900; border-radius: 50%;
  }
  .slot-word {
    font-size: 22px; font-weight: 800; color: #3D2C2E; margin-top: 12px;
    letter-spacing: 0.5px;
  }

  .silabario {
    background: #8FAE8B; color: white; padding: 14px 20px; border-radius: 8px;
    text-align: center; font-size: 13px; margin-top: 18px;
  }
  .silabario-text { font-size: 22px; font-weight: 700; letter-spacing: 4px; display: block; margin-top: 4px; }

  .ficha-footer {
    display: flex; justify-content: space-between; font-size: 9.5px; color: #9a8a8c;
    margin-top: 16px; padding-top: 10px; border-top: 1px solid #F5E6D3;
  }
</style>
</head>
<body>
${coverHTML}
${introHTML}
${fichasHTML}
</body>
</html>`;

fs.writeFileSync(HTML_OUT, html);
console.log("HTML escrito:", HTML_OUT, "(" + Math.round(html.length / 1024) + " KB)");

console.log("Iniciando Puppeteer...");
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const fileUrl = "file:///" + HTML_OUT.replace(/\\/g, "/");
await page.goto(fileUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 2000));
await page.pdf({
  path: PDF_V3,
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();

const stats = fs.statSync(PDF_V3);
console.log("PDF v3 generado:", PDF_V3, "(" + Math.round(stats.size / 1024) + " KB)");

// Copiar como nuevo production PDF
fs.copyFileSync(PDF_V3, PDF_OUT);
console.log("PDF reemplazado en producción:", PDF_OUT);
