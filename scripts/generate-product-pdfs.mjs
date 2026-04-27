#!/usr/bin/env node
/**
 * Genera los PDFs de los 5 productos restantes a partir de markdowns
 * reescritos + imágenes generadas. Mantiene identidad visual del kit-soplo.
 *
 * Uso: node scripts/generate-product-pdfs.mjs [slug]
 * Sin argumento: renderiza los 5.
 * Con slug: renderiza solo ese producto.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PREVIEW = path.join(ROOT, "public", "downloads", "productos", "_preview");
const ASSETS = path.join(PREVIEW, "assets");

const products = [
  {
    slug: "guia-dislexia",
    outputName: "guia-dislexia",
    title: "Guía de Dislexia",
    subtitle: "En edad escolar · Detección, acompañamiento y adaptaciones",
    tag: "Recurso profesional · para familias y educadores",
    coverImg: "dislexia-cover",
    markdownFile: "guia-dislexia-content.md",
    // Insertar imagen antes del heading que coincida con el regex
    imageHeadings: [
      { match: /señales|manifiesta|detectar/i, img: "dislexia-senales" },
      { match: /qué hacer|acompañ|ayudar|casa/i, img: "dislexia-ayudar" },
    ],
  },
  {
    slug: "guia-tartamudez",
    outputName: "guia-tartamudez",
    title: "Guía de Tartamudez Infantil",
    subtitle: "Cómo acompañar a tu peque sin alarmismo · Basado en evidencia",
    tag: "Recurso profesional · para familias y educadores",
    coverImg: "tartamudez-cover",
    markdownFile: "guia-tartamudez-content.md",
    imageHeadings: [
      { match: /qué hacer|escuchar|pautas/i, img: "tartamudez-escuchar" },
      { match: /ejercicio|actividad|canto|ritmo|fluidez/i, img: "tartamudez-cantar" },
    ],
  },
  {
    slug: "cuaderno-estimulacion-0-3",
    outputName: "cuaderno-estimulacion-0-3",
    title: "Cuaderno de Estimulación 0-3 años",
    subtitle: "20 actividades por edad · Estimulación natural del lenguaje",
    tag: "Recurso profesional · para familias",
    coverImg: "cuaderno-0-3-cover",
    markdownFile: "cuaderno-0-3-content.md",
    imageHeadings: [
      { match: /0-6 meses|bloque 1/i, img: "cuaderno-0-3-bloque1" },
      { match: /12-18|12 a 18|bloque 3/i, img: "cuaderno-0-3-bloque3" },
      { match: /2-3 años|bloque 5/i, img: "cuaderno-0-3-bloque5" },
    ],
  },
  {
    slug: "cuaderno-estimulacion-3-6",
    outputName: "cuaderno-estimulacion-3-6",
    title: "Cuaderno de Estimulación 3-6 años",
    subtitle: "20 actividades por áreas · Prepara el lenguaje para la escuela",
    tag: "Recurso profesional · para familias",
    coverImg: "cuaderno-3-6-cover",
    markdownFile: "cuaderno-3-6-content.md",
    imageHeadings: [
      { match: /conciencia fonológica|bloque 1/i, img: "cuaderno-3-6-fonologica" },
      { match: /vocabulario|bloque 2/i, img: "cuaderno-3-6-vocabulario" },
      { match: /narrativa|bloque 3/i, img: "cuaderno-3-6-narrativa" },
    ],
  },
  {
    slug: "pack-fichas-articulacion",
    outputName: "pack-fichas-articulacion",
    title: "Pack de Fichas de Articulación",
    subtitle: "30 fichas imprimibles · Un fonema por página",
    tag: "Recurso profesional · para familias",
    coverImg: "fichas-articulacion-cover",
    markdownFile: "pack-fichas-articulacion-content.md",
    imageHeadings: [], // solo portada, emojis hacen el resto
  },
  // ── Lead magnets gratuitos (van a public/downloads/, no productos/) ──
  {
    slug: "guia-hitos-lenguaje",
    outputName: "guia-hitos-lenguaje-espacio-lenguaje",
    outputDir: "downloads",
    title: "Hitos del Lenguaje 0-6 años",
    subtitle: "Qué debería decir tu peque a cada edad · Señales de alerta · Ejercicios para casa",
    tag: "Guía gratuita · para familias",
    coverImg: "hitos-lenguaje-cover",
    markdownFile: "guia-hitos-lenguaje-content.md",
    imageHeadings: [
      { match: /0-6 meses/i, img: "cuaderno-0-3-bloque1" },
      { match: /18-24 meses/i, img: "cuaderno-0-3-bloque3" },
      { match: /4-6 años/i, img: "cuaderno-3-6-fonologica" },
    ],
  },
  {
    slug: "5-juegos-estimular-habla",
    outputName: "5-juegos-estimular-habla",
    outputDir: "downloads",
    title: "5 Juegos para Estimular el Habla",
    subtitle: "Actividades sencillas, sin material especial · 18 meses a 5+ años",
    tag: "Guía gratuita · para familias",
    coverImg: "5-juegos-cover",
    markdownFile: "5-juegos-content.md",
    imageHeadings: [],
  },
  {
    slug: "checklist-senales-alerta",
    outputName: "checklist-senales-alerta",
    outputDir: "downloads",
    title: "Checklist · Señales de Alerta del Lenguaje",
    subtitle: "Guía rápida para identificar señales por edad",
    tag: "Recurso gratuito · para familias",
    coverImg: null, // 1 página, sin portada separada
    markdownFile: "checklist-senales-content.md",
    imageHeadings: [],
  },
];

function imgDataUri(name) {
  if (!name) return "";
  const p = path.join(ASSETS, `${name}.jpg`);
  if (!fs.existsSync(p)) {
    console.warn(`⚠ missing image: ${p}`);
    return "";
  }
  const buf = fs.readFileSync(p);
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

function injectImagesInHtml(htmlBody, imageHeadings) {
  if (!imageHeadings.length) return htmlBody;
  // Para cada H2 del HTML, ver si matchea y si es así, insertar imagen antes
  return htmlBody.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (match, attrs, text) => {
    const plain = text.replace(/<[^>]+>/g, "");
    const hit = imageHeadings.find((h) => h.match.test(plain));
    if (!hit) return match;
    const dataUri = imgDataUri(hit.img);
    if (!dataUri) return match;
    // consumir la entrada para no repetir
    hit.match = /__CONSUMED__/;
    return `<figure class="chapter-image"><img src="${dataUri}" alt=""/></figure><h2${attrs}>${text}</h2>`;
  });
}

const css = `
:root{--terracota:#C4745A;--terracota-dark:#A35B45;--salvia:#8FAE8B;--salvia-dark:#6B8A67;--arena:#FDF8F4;--arena-dark:#F5E6D3;--cacao:#3D2C2E;--texto:#3D2C2E;--texto-sec:#5E4B4D;--muted:#8C7A7C;}
*{box-sizing:border-box;margin:0;padding:0;}
@page{size:A4;margin:0;}
html,body{font-family:'DM Sans',system-ui,sans-serif;color:var(--texto);background:var(--arena);font-size:11pt;line-height:1.6;}
h1,h2,h3,h4{font-family:'DM Serif Display',serif;color:var(--cacao);font-weight:400;line-height:1.2;}
.cover{width:210mm;min-height:297mm;padding:30mm 18mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:linear-gradient(160deg,var(--arena) 0%,var(--arena-dark) 100%);page-break-after:always;position:relative;}
.cover-logo{width:70px;height:70px;border-radius:50%;background:var(--terracota);color:#fff;font-family:'DM Serif Display',serif;font-size:32pt;display:flex;align-items:center;justify-content:center;margin-bottom:10mm;}
.cover-tag{display:inline-block;margin-bottom:8mm;padding:2mm 6mm;background:rgba(196,116,90,.1);color:var(--terracota-dark);border-radius:20px;font-size:9pt;font-weight:600;letter-spacing:.5pt;text-transform:uppercase;}
.cover h1{font-size:38pt;margin-bottom:6mm;max-width:165mm;line-height:1.1;}
.cover-sub{font-size:14pt;color:var(--texto-sec);margin-bottom:14mm;max-width:150mm;line-height:1.4;}
.cover-img{width:150mm;aspect-ratio:4/3;object-fit:cover;border-radius:8mm;margin:6mm auto 12mm;box-shadow:0 4mm 16mm rgba(61,44,46,.12);}
.cover-badge{display:inline-flex;align-items:center;gap:4mm;padding:4mm 10mm;background:#fff;border-radius:40px;box-shadow:0 2mm 8mm rgba(61,44,46,.08);font-size:10pt;color:var(--cacao);}
.cover-badge-dot{width:10px;height:10px;background:var(--salvia);border-radius:50%;}
.cover-footer{position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-size:9pt;color:var(--muted);}
.cover-footer .brand-mark{color:var(--terracota-dark);font-weight:600;}

/* Cuerpo del contenido */
.content{width:210mm;padding:20mm 22mm;background:var(--arena);}
.content h1{font-size:28pt;margin:10mm 0 6mm;color:var(--cacao);}
.content h2{font-size:22pt;margin:12mm 0 5mm;color:var(--cacao);border-top:1px solid rgba(61,44,46,.1);padding-top:8mm;}
.content h2:first-of-type{border-top:none;padding-top:0;}
.content h3{font-size:16pt;margin:8mm 0 3mm;color:var(--cacao);}
.content h4{font-size:13pt;margin:6mm 0 2mm;color:var(--cacao);font-family:'DM Sans',sans-serif;font-weight:600;}
.content p{margin:0 0 3.5mm;line-height:1.65;color:var(--texto);}
.content strong{color:var(--cacao);font-weight:600;}
.content em{color:var(--texto-sec);}
.content ul,.content ol{margin:3mm 0 5mm 8mm;}
.content li{margin-bottom:2mm;line-height:1.55;}
.content blockquote{background:#fff;border-left:4px solid var(--terracota);padding:5mm 7mm;margin:5mm 0;border-radius:0 4mm 4mm 0;box-shadow:0 1mm 4mm rgba(61,44,46,.04);}
.content blockquote p:last-child{margin-bottom:0;}
.content table{width:100%;border-collapse:collapse;margin:5mm 0;background:#fff;border-radius:4mm;overflow:hidden;box-shadow:0 1mm 4mm rgba(61,44,46,.04);}
.content th{background:var(--cacao);color:#fff;text-align:left;padding:3mm 4mm;font-size:10pt;font-weight:600;}
.content td{padding:3mm 4mm;border-top:1px solid rgba(61,44,46,.08);font-size:10pt;}
.content hr{border:none;border-top:1px solid rgba(61,44,46,.15);margin:10mm 0;}
.content a{color:var(--terracota-dark);}
.content code{background:rgba(143,174,139,.15);padding:1mm 2mm;border-radius:2mm;font-size:9.5pt;}

/* Imagen de capítulo */
.chapter-image{margin:8mm 0 4mm;}
.chapter-image img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6mm;box-shadow:0 2mm 8mm rgba(61,44,46,.08);}

/* Back cover */
.back-cover{width:210mm;min-height:297mm;padding:30mm 18mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:linear-gradient(160deg,var(--cacao) 0%,#2A1F21 100%);color:#fff;page-break-before:always;position:relative;}
.back-cover h1{color:#fff;font-size:32pt;max-width:150mm;margin-bottom:6mm;}
.back-cover p{color:rgba(255,255,255,.8);font-size:13pt;max-width:140mm;}
.back-cover-logo{width:70px;height:70px;border-radius:50%;background:#fff;color:var(--cacao);font-family:'DM Serif Display',serif;font-size:32pt;display:flex;align-items:center;justify-content:center;margin-bottom:12mm;}
.back-cover-footer{position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-size:9pt;color:rgba(255,255,255,.6);}
.back-cover-footer .web{color:#fff;}
`;

async function renderProduct(prod) {
  console.log(`\n=== ${prod.slug} ===`);
  const mdPath = path.join(PREVIEW, prod.markdownFile);
  if (!fs.existsSync(mdPath)) {
    console.warn(`  ✗ markdown no encontrado: ${mdPath}`);
    return;
  }
  const md = fs.readFileSync(mdPath, "utf8");

  // Parsear markdown -> HTML
  let htmlBody = marked.parse(md);

  // Inyectar imágenes de capítulos (clonar imageHeadings para evitar state entre productos)
  const imageHeadings = prod.imageHeadings.map((h) => ({ ...h }));
  htmlBody = injectImagesInHtml(htmlBody, imageHeadings);

  const coverUri = imgDataUri(prod.coverImg);

  // El checklist (sin coverImg) salta portada+contraportada — es 1 página directa
  const showCovers = prod.coverImg !== null;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${prod.title} — Espacio Lenguaje</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

${showCovers ? `<section class="cover">
  <div class="cover-logo">E</div>
  <div class="cover-tag">${prod.tag}</div>
  <h1>${prod.title}</h1>
  <p class="cover-sub">${prod.subtitle}</p>
  ${coverUri ? `<img class="cover-img" src="${coverUri}" alt=""/>` : ""}
  <div class="cover-badge"><span class="cover-badge-dot"></span> Revisado por logopeda colegiada</div>
  <div class="cover-footer">Espacio Lenguaje · Logopedia infantil basada en evidencia<br><span class="brand-mark">www.espaciolenguaje.com</span></div>
</section>` : ""}

<section class="content">
  ${htmlBody}
</section>

${showCovers ? `<section class="back-cover">
  <div class="back-cover-logo">E</div>
  <h1>Más recursos en espaciolenguaje.com</h1>
  <p>Blog clínico · Guías descargables · Pack Completo con todos los recursos del equipo.</p>
  <div class="back-cover-footer">© Espacio Lenguaje · Uso personal. No redistribuir.<br><span class="web">www.espaciolenguaje.com</span></div>
</section>` : ""}

</body>
</html>`;

  const htmlPath = path.join(PREVIEW, `${prod.outputName}.html`);
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log(`  ✓ HTML: ${prod.outputName}.html`);

  const pdfPath = path.join(PREVIEW, `${prod.outputName}-v2.pdf`);
  const htmlUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  const browser = await puppeteer.launch({ headless: true });
  const pageCtx = await browser.newPage();
  await pageCtx.goto(htmlUrl, { waitUntil: "domcontentloaded", timeout: 180000 });
  await pageCtx.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2500));
  await pageCtx.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  const sizeKB = (fs.statSync(pdfPath).size / 1024).toFixed(1);
  console.log(`  ✓ PDF: ${prod.outputName}-v2.pdf (${sizeKB} KB)`);
}

// Main
const target = process.argv[2];
const queue = target ? products.filter((p) => p.slug === target) : products;
if (!queue.length) {
  console.error("No products to render");
  process.exit(1);
}

for (const prod of queue) {
  try {
    await renderProduct(prod);
  } catch (err) {
    console.error(`✗ ${prod.slug} FAILED:`, err.message);
  }
}

console.log("\n✓ Done.");
