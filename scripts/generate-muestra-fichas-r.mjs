// Genera la muestra gratuita: 6 fichas del fonema R extraídas del Pack v3.
// Mismo pipeline, mismos estilos y mismos pictogramas que generate-fichas-v3.mjs.
// Uso: node scripts/generate-muestra-fichas-r.mjs

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import {
  ROOT,
  PREVIEW,
  FICHAS_JSON,
  loadFichas,
  loadSourceMd,
  pictoUri,
  getFichaData as parseFicha,
} from "./_fichas-source.mjs";

const LOGO = path.join(ROOT, "public", "images", "logo-chosen.png");

const HTML_OUT = path.join(PREVIEW, "muestra-fichas-articulacion-r.html");
// Nombre no adivinable: el PDF se sirve directo y no queremos que se enlace solo.
const PDF_OUT = path.join(ROOT, "public", "downloads", "muestra-fichas-articulacion-r-ba5e7821166e.pdf");

// 6 fichas del fonema R en dificultad progresiva: vibrante simple → múltiple → sinfones.
const SELECCION = ["17", "18", "20", "23", "27", "30"];
const CHECKOUT_URL =
  "https://www.espaciolenguaje.com/recursos/fichas-articulacion?utm_campaign=tripwire-fichas-pdf";

const fichas = loadFichas();
const sourceMd = loadSourceMd();
const getFichaData = (num) => parseFicha(sourceMd, num);

function dataUri(p, mime) {
  return `data:${mime};base64,${fs.readFileSync(p).toString("base64")}`;
}

const seleccionadas = SELECCION.map((n) => {
  const f = fichas.find((x) => x.num === n);
  if (!f) throw new Error(`Ficha ${n} no encontrada en ${FICHAS_JSON}`);
  return f;
});

const fichasHTML = seleccionadas
  .map((f) => {
    const md = getFichaData(f.num);
    const slots = ["inicio", "medio", "final"]
      .map((slot) => {
        const cell = f[slot];
        const label = slot[0].toUpperCase() + slot.slice(1);
        if (!cell)
          return `<div class="slot empty"><div class="slot-label">${label}</div><div class="slot-word">—</div></div>`;
        const uri = pictoUri(cell.filename);
        const img = uri
          ? `<img src="${uri}" alt="${cell.word}" />`
          : `<div class="no-pic">${cell.word.charAt(0)}</div>`;
        return `<div class="slot">
          <div class="slot-label">${label}</div>
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
    <img class="cover-logo" src="${dataUri(LOGO, "image/png")}" alt="Espacio Lenguaje" />
    <div class="cover-tag">Recurso profesional · Para familias</div>
    <h1 class="cover-title">Muestra gratuita<br/>6 fichas de articulación</h1>
    <p class="cover-subtitle">Fonema R · con pictogramas · Para casa</p>
    <div class="cover-claim">
      Pictogramas reales de Arasaac (Gobierno de Aragón, licencia Creative Commons).<br/>
      Revisado por logopeda colegiada · Espacio Lenguaje
    </div>
  </div>
</section>`;

const tripwireHTML = `<section class="tripwire">
  <div class="tripwire-inner">
    <img class="cover-logo" src="${dataUri(LOGO, "image/png")}" alt="Espacio Lenguaje" />
    <h2 class="tripwire-title">¿Quieres las 30 fichas de todos los fonemas?</h2>
    <div class="tripwire-card">
      <p class="tripwire-product">Pack de Fichas de Articulación</p>
      <p class="tripwire-price">4,90 €</p>
      <p class="tripwire-guarantee">Garantía 14 días</p>
      <a class="tripwire-cta" href="${CHECKOUT_URL}">Ver el pack completo →</a>
      <p class="tripwire-url">${CHECKOUT_URL.replace(/^https:\/\//, "")}</p>
    </div>
  </div>
</section>`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>Muestra gratuita · 6 fichas de articulación del fonema R</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  html, body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #2d2026; }

  .cover, .tripwire {
    width: 210mm; height: 297mm; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #FDF8F4 0%, #F5E6D3 100%);
    page-break-after: always;
  }
  .tripwire { page-break-after: auto; }
  .cover-inner, .tripwire-inner { text-align: center; padding: 60px; }
  .cover-logo { width: 84px; height: 84px; border-radius: 50%; margin-bottom: 26px; }
  .cover-tag {
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #C4745A;
    font-weight: 700; margin-bottom: 30px;
  }
  .cover-title { font-size: 44px; font-weight: 800; color: #3D2C2E; margin: 0 0 16px 0; line-height: 1.12; }
  .cover-subtitle { font-size: 20px; color: #6b5a5c; margin: 0 0 50px 0; }
  .cover-claim {
    background: white; padding: 20px 28px; border-radius: 12px; display: inline-block;
    font-size: 13px; color: #6b5a5c; line-height: 1.6;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }

  .tripwire-title { font-size: 32px; font-weight: 800; color: #3D2C2E; margin: 0 0 32px 0; line-height: 1.2; }
  .tripwire-card {
    background: white; padding: 38px 44px; border-radius: 16px; display: inline-block;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }
  .tripwire-product { font-size: 22px; font-weight: 700; color: #3D2C2E; margin: 0 0 10px 0; }
  .tripwire-price { font-size: 46px; font-weight: 900; color: #C4745A; margin: 0 0 6px 0; }
  .tripwire-guarantee { font-size: 14px; color: #6b5a5c; margin: 0 0 28px 0; }
  .tripwire-cta {
    display: inline-block; background: #8FAE8B; color: white; padding: 15px 38px;
    border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 17px;
  }
  .tripwire-url { font-size: 10.5px; color: #9a8a8c; margin: 18px 0 0 0; word-break: break-all; }

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
  .ficha-fonema { font-size: 56px; font-weight: 900; color: #3D2C2E; line-height: 1; letter-spacing: -1px; }
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
  .slot-word { font-size: 22px; font-weight: 800; color: #3D2C2E; margin-top: 12px; letter-spacing: 0.5px; }

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
${fichasHTML}
${tripwireHTML}
</body>
</html>`;

fs.writeFileSync(HTML_OUT, html);
console.log("HTML escrito:", HTML_OUT, "(" + Math.round(html.length / 1024) + " KB)");

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("file:///" + HTML_OUT.replace(/\\/g, "/"), {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 2000));
await page.pdf({
  path: PDF_OUT,
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();

const stats = fs.statSync(PDF_OUT);
console.log("PDF generado:", PDF_OUT, "(" + Math.round(stats.size / 1024) + " KB)");
console.log("Fichas incluidas:", seleccionadas.map((f) => `${f.num}·${f.fonema}`).join(", "));
