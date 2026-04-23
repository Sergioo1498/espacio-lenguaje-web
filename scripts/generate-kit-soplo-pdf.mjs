#!/usr/bin/env node
/**
 * Genera el PDF del Kit de Ejercicios de Soplo (versión 2 — sin NSOME).
 *
 * Uso: node scripts/generate-kit-soplo-pdf.mjs
 *
 * Salida: public/downloads/productos/_preview/kit-ejercicios-soplo-v2.pdf
 *
 * NO sobrescribe el PDF de producción hasta que Bea y Sergio validen.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PREVIEW = path.join(ROOT, "public", "downloads", "productos", "_preview");
const ASSETS = path.join(PREVIEW, "assets");

const exercises = [
  { n: "01", slug: "velas", level: 1, title: "Apagar velas",
    materials: "Vela, mechero (o vela LED si prefieres evitar fuego)",
    duration: "2 min",
    steps: [
      "Enciende una vela y colócala a unos 20 cm del peque.",
      "Pídele que sople para apagarla de un solo soplo.",
      "Aumenta la distancia gradualmente: 30 cm, 40 cm…",
      "Practica también soplos suaves que solo muevan la llama sin apagarla.",
    ],
    works: "Control dirigido del aire espirado en un juego con feedback visual inmediato." },
  { n: "02", slug: "pompas", level: 1, title: "Pompas de jabón",
    materials: "Mezcla de jabón, aro", duration: "3 min",
    steps: [
      "Prepara la mezcla y moja el aro.",
      "El peque sopla suave y sostenido para hacer pompas grandes.",
      "Si sopla demasiado fuerte, las pompas se rompen: ese es el aprendizaje (buscar soplo suave).",
      "Reto: ¿quién hace la pompa más grande? Requiere soplo muy suave y constante.",
    ],
    works: "Regulación suave del flujo de aire. Momento clásico de juego compartido." },
  { n: "03", slug: "plumas", level: 1, title: "Carreras de plumas",
    materials: "Plumas ligeras o trocitos de papel de seda", duration: "3 min",
    steps: [
      "Pon una pluma sobre la mesa, en un extremo.",
      "El peque sopla para moverla hasta el otro extremo.",
      "Podéis hacer una carrera: cada uno con su pluma.",
      "Varía la distancia y la posición desde donde sopla.",
    ],
    works: "Direccionalidad del aire. El poco esfuerzo requerido hace que el peque vea resultados rápidos y se motive." },
  { n: "04", slug: "bolitas", level: 1, title: "Mover bolitas con pajita",
    materials: "Bolitas pequeñas de algodón o papel, pajita", duration: "3 min",
    steps: [
      "Haz bolitas pequeñas.",
      "Colócalas en línea sobre la mesa.",
      "El peque sopla por la pajita para moverlas.",
      "Reto: llevarlas todas a un recipiente soplando.",
    ],
    works: "Canalización del aire a través de un instrumento. Añade un grado de control." },
  { n: "05", slug: "silbatos", level: 1, title: "Silbatos y matasuegras",
    materials: "Un silbato, un matasuegras", duration: "2 min",
    steps: [
      "El peque sopla el silbato con un soplo corto y fuerte.",
      "Después sopla el matasuegras con un soplo sostenido y continuo.",
      "Alterna entre ambos.",
      "Convertidlo en juego: silbato = «para»; matasuegras = «camina».",
    ],
    works: "Alternancia entre patrones respiratorios cortos y sostenidos. Introduce contraste." },
  { n: "06", slug: "carreras", level: 2, title: "Carreras de bolitas con pajita",
    materials: "Pajita, bolita de papel", duration: "5 min",
    steps: [
      "Cada jugador tiene una bolita y una pajita.",
      "Marcad línea de salida y meta sobre la mesa.",
      "A soplar por la pajita para llevar la bolita hasta la meta.",
      "Mejor de 3 rondas.",
    ],
    works: "Soplo sostenido con dirección. Juego competitivo que motiva al peque a mantener la actividad." },
  { n: "07", slug: "molinillo", level: 2, title: "Molinillos",
    materials: "Molinillo de viento", duration: "3 min",
    steps: [
      "Sujeta el molinillo frente al peque.",
      "Que sople para que gire suavemente (soplo continuo).",
      "Después que sople fuerte para que gire rápido.",
      "Alternad: suave — fuerte — suave.",
    ],
    works: "Regulación de la intensidad del aire. El feedback visual inmediato (el molinillo gira más o menos) facilita el aprendizaje." },
  { n: "08", slug: "pintar", level: 2, title: "Pintar soplando",
    materials: "Pajita, pintura aguada, papel", duration: "10 min",
    steps: [
      "Pon una gota de pintura aguada en el papel.",
      "El peque sopla por la pajita para esparcir la pintura.",
      "Probad desde distintos ángulos, con distintos colores.",
      "Sale una obra de arte única.",
    ],
    works: "Soplo creativo con presión variable. Una de las actividades que más disfrutan los peques." },
  { n: "09", slug: "barquitos", level: 2, title: "Barquitos de papel",
    materials: "Barco de papel (origami), barreño con agua", duration: "5 min",
    steps: [
      "Haz un barquito y ponlo en el agua.",
      "El peque sopla suave para moverlo.",
      "Reto: llevarlo de un lado al otro sin que se hunda.",
      "Si sopla fuerte, se cae o se moja — buscar soplo constante y suave.",
    ],
    works: "Constancia del soplo sostenido. El agua ralentiza el feedback y ayuda al peque a mantener el ritmo." },
  { n: "10", slug: "pluma-aire", level: 2, title: "Mantener la pluma en el aire",
    materials: "Una pluma ligera", duration: "3 min",
    steps: [
      "Lanza la pluma al aire.",
      "El peque sopla hacia arriba para mantenerla flotando.",
      "Contad los segundos que aguanta sin caer.",
      "Reto: batir el récord cada sesión.",
    ],
    works: "Soplo vertical sostenido. Requiere anticipación y ajuste continuo." },
  { n: "11", slug: "laberinto", level: 3, title: "Laberinto de soplo",
    materials: "Pajita, bolita, cartón con laberinto dibujado (paredes de plastilina o cartulina)",
    duration: "5 min",
    steps: [
      "Construid un laberinto sencillo en cartón.",
      "Coloca una bolita en la entrada.",
      "El peque sopla por la pajita para llevarla por el recorrido.",
      "Reto: completar el laberinto sin salirse.",
    ],
    works: "Precisión direccional. Combina planificación motora con control del aire." },
  { n: "12", slug: "vela-inclinar", level: 3, title: "Inclinar la llama sin apagar",
    materials: "Vela (con supervisión adulta)", duration: "3 min",
    steps: [
      "Enciende una vela a 15 cm del peque.",
      "Tiene que soplar para que la llama se incline <strong>sin apagarse</strong>.",
      "Práctica del control fino: que la llama se mueva pero aguante encendida.",
      "Intentad inclinarla hacia distintos lados.",
    ],
    works: "Graduación fina de la fuerza del soplo. Uno de los ejercicios con mayor control requerido." },
  { n: "13", slug: "soplo-nasal", level: 3, title: "Soplo nasal",
    materials: "Espejo pequeño, pluma", duration: "3 min",
    steps: [
      "El peque cierra la boca (puede taparla suavemente con la mano).",
      "Sopla solo por la nariz para mover una pluma.",
      "También podéis poner un espejito bajo la nariz y ver cómo se empaña.",
      "Alternad: narina derecha, izquierda.",
    ],
    works: "Respiración nasal consciente. Útil especialmente si el peque tiende a respirar por la boca en reposo (consultar logopeda/ORL si es persistente)." },
  { n: "14", slug: "labios-sellados", level: 3, title: "Soplar con los labios sellados",
    materials: "Espejo", duration: "3 min",
    steps: [
      "Poneos frente al espejo.",
      "El peque sopla fuerte mirando su reflejo: <strong>las mejillas no deben inflarse</strong>.",
      "Si se inflan, parad y probad de nuevo.",
      "El objetivo es que el aire salga sin que las mejillas se hinchen.",
    ],
    works: "Sellado labial durante la espiración. Si tu peque tiene gran dificultad y además voz nasal, problemas de alimentación o respiración, <strong>consultad con logopeda u ORL</strong> — puede ser señal de exploración mayor." },
  { n: "15", slug: "cronometrado", level: 3, title: "Soplo sostenido cronometrado",
    materials: "Cronómetro, pajita, vaso con agua y un poco de jabón", duration: "3 min",
    steps: [
      "Mete la pajita en el agua con jabón.",
      "El peque sopla para hacer burbujas.",
      "Cronometra cuánto dura el soplo continuo.",
      "Apuntad el tiempo y probad a superarlo.",
    ],
    works: "Capacidad respiratoria funcional. Mide progreso de forma objetiva." },
];

function imgPath(n, slug) {
  // Embebido como base64 data URI — evita problemas con rutas/emoji en Windows
  const p = path.join(ASSETS, `kit-soplo-${n}-${slug}.jpg`);
  const buf = fs.readFileSync(p);
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

function exercisePage(ex) {
  const lvlClass = `level-${ex.level}`;
  const lvlLabel = ex.level === 1 ? "Nivel 1 · Fácil" : ex.level === 2 ? "Nivel 2 · Intermedio" : "Nivel 3 · Avanzado";
  return `
<section class="page exercise">
  <div class="exercise-header">
    <div class="exercise-number">${ex.n}</div>
    <div class="exercise-title-wrap">
      <h3 class="exercise-title">${ex.title}</h3>
      <span class="exercise-level ${lvlClass}">${lvlLabel}</span>
    </div>
  </div>
  <img class="exercise-img" src="${imgPath(ex.n, ex.slug)}" alt="Ilustración: ${ex.title}" />
  <div class="exercise-meta">
    <span class="meta-pill"><strong>Materiales:</strong> ${ex.materials}</span>
    <span class="meta-pill"><strong>Duración:</strong> ${ex.duration}</span>
  </div>
  <div class="instructions">
    <div class="instructions-title">Cómo hacerlo</div>
    <ol>
      ${ex.steps.map((s) => `<li>${s}</li>`).join("")}
    </ol>
  </div>
  <div class="what-works">
    <div class="what-works-label">Qué trabaja</div>
    <div class="what-works-text">${ex.works}</div>
  </div>
  <div class="page-footer">
    <span>Ejercicio ${ex.n} · ${ex.title}</span>
    <span class="brand-mark">Espacio Lenguaje</span>
  </div>
</section>`;
}

function levelDivider(level, title, desc) {
  return `
<section class="page level-divider">
  <div class="big-num">${String(level).padStart(2, "0")}</div>
  <h2>${title}</h2>
  <p>${desc}</p>
</section>`;
}

const trackerRows = exercises.map((ex) =>
  `<tr><td>${ex.n} · ${ex.title}</td>${"<td></td>".repeat(7)}</tr>`
).join("");

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Kit de Ejercicios de Soplo — Espacio Lenguaje</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--terracota:#C4745A;--terracota-dark:#A35B45;--salvia:#8FAE8B;--salvia-dark:#6B8A67;--arena:#FDF8F4;--arena-dark:#F5E6D3;--cacao:#3D2C2E;--texto:#3D2C2E;--texto-sec:#5E4B4D;--muted:#8C7A7C;}
*{box-sizing:border-box;margin:0;padding:0;}
@page{size:A4;margin:0;}
html,body{font-family:'DM Sans',system-ui,sans-serif;color:var(--texto);background:var(--arena);font-size:11pt;line-height:1.55;}
.page{width:210mm;min-height:297mm;padding:20mm 18mm;page-break-after:always;position:relative;display:flex;flex-direction:column;background:var(--arena);}
.page:last-child{page-break-after:auto;}
h1,h2,h3,h4{font-family:'DM Serif Display',serif;color:var(--cacao);font-weight:400;line-height:1.15;}
h1{font-size:36pt;}h2{font-size:24pt;margin-bottom:10mm;}h3{font-size:18pt;}h4{font-size:14pt;}
p{margin-bottom:3mm;}strong{color:var(--cacao);font-weight:600;}a{color:var(--terracota-dark);}

.cover{background:linear-gradient(160deg,var(--arena) 0%,var(--arena-dark) 100%);text-align:center;justify-content:center;align-items:center;padding:30mm 18mm;}
.cover-logo{width:70px;height:70px;border-radius:50%;background:var(--terracota);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'DM Serif Display',serif;font-size:32pt;margin:0 auto 12mm;}
.cover h1{font-size:42pt;color:var(--cacao);margin-bottom:6mm;max-width:150mm;margin-left:auto;margin-right:auto;}
.cover-sub{font-size:14pt;color:var(--texto-sec);margin-bottom:20mm;max-width:130mm;margin-left:auto;margin-right:auto;}
.cover-badge{display:inline-flex;align-items:center;gap:4mm;padding:4mm 10mm;background:#fff;border-radius:40px;box-shadow:0 2mm 8mm rgba(61,44,46,.08);font-size:10pt;color:var(--cacao);}
.cover-badge-dot{width:10px;height:10px;background:var(--salvia);border-radius:50%;}
.cover-tag{display:inline-block;margin-bottom:8mm;padding:2mm 6mm;background:rgba(196,116,90,.1);color:var(--terracota-dark);border-radius:20px;font-size:9pt;font-weight:600;letter-spacing:.5pt;text-transform:uppercase;}
.cover-footer{position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-size:9pt;color:var(--muted);}

.section-tag{display:inline-block;padding:2mm 6mm;background:rgba(143,174,139,.15);color:var(--salvia-dark);border-radius:20px;font-size:9pt;font-weight:600;letter-spacing:.5pt;text-transform:uppercase;margin-bottom:4mm;}
.section-tag.terracota{background:rgba(196,116,90,.12);color:var(--terracota-dark);}

.callout{background:#fff;border-left:4px solid var(--salvia);padding:6mm 8mm;border-radius:0 6px 6px 0;margin:5mm 0;box-shadow:0 1mm 4mm rgba(61,44,46,.04);}
.callout.terracota{border-left-color:var(--terracota);}
.callout p{margin-bottom:2mm;}.callout p:last-child{margin-bottom:0;}
.callout-title{font-family:'DM Serif Display',serif;color:var(--cacao);font-size:13pt;margin-bottom:2mm;}

.exercise{padding:14mm 14mm 14mm 14mm;}
.exercise-header{display:flex;align-items:flex-start;gap:6mm;margin-bottom:4mm;}
.exercise-number{flex-shrink:0;width:16mm;height:16mm;background:var(--terracota);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',serif;font-size:18pt;}
.exercise-title-wrap{flex:1;padding-top:1mm;}
.exercise-title{font-family:'DM Serif Display',serif;font-size:22pt;color:var(--cacao);line-height:1.1;margin-bottom:2mm;}
.exercise-level{display:inline-block;padding:1mm 4mm;font-size:8.5pt;font-weight:600;letter-spacing:.3pt;text-transform:uppercase;border-radius:14px;}
.level-1{background:rgba(143,174,139,.2);color:var(--salvia-dark);}
.level-2{background:rgba(196,116,90,.15);color:var(--terracota-dark);}
.level-3{background:var(--cacao);color:#fff;}
.exercise-img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6mm;margin:4mm 0 5mm 0;box-shadow:0 2mm 8mm rgba(61,44,46,.08);}
.exercise-meta{display:flex;gap:4mm;margin-bottom:4mm;flex-wrap:wrap;}
.meta-pill{display:inline-flex;align-items:center;gap:2mm;padding:1.5mm 4mm;background:#fff;border:1px solid rgba(61,44,46,.08);border-radius:20px;font-size:9pt;color:var(--texto-sec);}
.meta-pill strong{color:var(--cacao);font-weight:600;margin-right:1mm;}
.instructions{background:#fff;border-radius:4mm;padding:6mm 7mm;margin-bottom:4mm;box-shadow:0 1mm 3mm rgba(61,44,46,.04);}
.instructions-title{font-family:'DM Serif Display',serif;font-size:12pt;color:var(--cacao);margin-bottom:3mm;}
.instructions ol{padding-left:6mm;}
.instructions li{margin-bottom:2mm;font-size:10.5pt;}
.what-works{background:rgba(143,174,139,.08);border-radius:4mm;padding:5mm 7mm;}
.what-works-label{font-size:8.5pt;font-weight:700;letter-spacing:.5pt;text-transform:uppercase;color:var(--salvia-dark);margin-bottom:1mm;}
.what-works-text{font-size:10.5pt;color:var(--texto);}

.intro-hero{background:#fff;border-radius:8mm;padding:10mm 12mm;box-shadow:0 2mm 10mm rgba(61,44,46,.06);}
.intro-hero h2{font-size:22pt;margin-bottom:5mm;}.intro-hero p{font-size:11pt;margin-bottom:4mm;}
.list-check{list-style:none;padding:0;margin:4mm 0;}
.list-check li{padding-left:9mm;margin-bottom:3mm;position:relative;}
.list-check li::before{content:"✓";position:absolute;left:0;top:0;width:6mm;height:6mm;background:var(--salvia);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:700;}

.level-divider{justify-content:center;align-items:center;text-align:center;background:linear-gradient(135deg,var(--arena) 0%,var(--arena-dark) 100%);}
.level-divider .big-num{font-family:'DM Serif Display',serif;font-size:120pt;color:var(--terracota);opacity:.2;line-height:1;margin-bottom:-10mm;}
.level-divider h2{font-size:36pt;}.level-divider p{font-size:13pt;color:var(--texto-sec);max-width:120mm;margin:6mm auto 0;}

.tracker{width:100%;border-collapse:collapse;margin-top:4mm;}
.tracker th{background:var(--cacao);color:#fff;font-weight:600;text-align:left;padding:3mm 2mm;font-size:9pt;border:1px solid var(--cacao);}
.tracker td{padding:2.5mm 2mm;border:1px solid rgba(61,44,46,.1);background:#fff;font-size:8.5pt;}
.tracker td:first-child{font-weight:500;color:var(--cacao);}

.refs{font-size:9pt;color:var(--texto-sec);padding:0;}
.refs li{margin-bottom:2.5mm;padding-left:5mm;text-indent:-5mm;list-style:none;line-height:1.45;}

.page-footer{margin-top:auto;padding-top:6mm;border-top:1px solid rgba(61,44,46,.08);font-size:8pt;color:var(--muted);display:flex;justify-content:space-between;align-items:center;}
.brand-mark{color:var(--terracota-dark);font-weight:600;}

.disclaimer{background:rgba(196,116,90,.07);border-radius:4mm;padding:5mm 7mm;font-size:9.5pt;color:var(--texto-sec);margin-top:4mm;}
.disclaimer strong{color:var(--terracota-dark);}
</style>
</head>
<body>

<!-- COVER -->
<section class="page cover">
  <div class="cover-logo">E</div>
  <div class="cover-tag">Recurso profesional · para familias</div>
  <h1>Kit de Ejercicios de Soplo</h1>
  <p class="cover-sub">15 ejercicios progresivos con materiales caseros para trabajar respiración funcional y juego compartido</p>
  <div class="cover-badge"><span class="cover-badge-dot"></span> Revisado por logopeda colegiada</div>
  <div class="cover-footer">Espacio Lenguaje · Logopedia infantil basada en evidencia<br><span class="brand-mark">www.espaciolenguaje.com</span></div>
</section>

<!-- INTRO -->
<section class="page">
  <span class="section-tag terracota">Antes de empezar</span>
  <h2>Qué trabajan (y qué no) estos ejercicios</h2>
  <div class="intro-hero">
    <p>Los ejercicios de soplo son una herramienta útil en logopedia para trabajar:</p>
    <ul class="list-check">
      <li><strong>Respiración funcional</strong> y coordinación fono-respiratoria básica.</li>
      <li><strong>Deglución atípica</strong> y <strong>respiración bucal persistente</strong>, siempre dentro de un plan clínico valorado por un profesional.</li>
      <li><strong>Consciencia oral</strong> y <strong>juego compartido</strong> entre peque y adulto de referencia.</li>
    </ul>
  </div>
  <div class="callout terracota" style="margin-top:6mm;">
    <div class="callout-title">Lo que la evidencia actual no respalda</div>
    <p>Durante años se asumió que los ejercicios orales no-verbales —incluidos los de soplo— «entrenaban» la articulación de fonemas específicos (/s/, /f/, /ch/, /r/). La revisión sistemática del campo (<strong>ASHA, 2013; Lof &amp; Watson, 2008; Bowen, 2005; McCauley et al., 2009</strong>) concluye que <strong>no hay evidencia sólida de que el soplo mejore directamente la articulación</strong> en niños con dislalia funcional.</p>
    <p>El control motor del habla es tarea-específico: fortalecer labios con soplo no transfiere automáticamente a /s/ o /r/.</p>
  </div>
  <h4 style="margin-top:6mm;">¿Por qué entonces este kit?</h4>
  <p style="margin-top:2mm;">Porque los ejercicios de soplo:</p>
  <ol style="padding-left:6mm;margin-top:2mm;">
    <li style="margin-bottom:2mm;">Son un recurso eficaz en casos específicos (respiración bucal, deglución atípica) cuando un profesional lo indica.</li>
    <li style="margin-bottom:2mm;">Ofrecen momentos de juego compartido de alto valor para el vínculo.</li>
    <li style="margin-bottom:2mm;">Permiten trabajar respiración funcional de forma divertida.</li>
  </ol>
  <div class="disclaimer">
    <strong>Si tu peque tiene dificultades claras de pronunciación</strong>, la vía eficaz es consultar con una logopeda colegiada que trabaje el fonema directamente en contexto fonético. Este kit no sustituye esa valoración.
  </div>
  <div class="page-footer"><span>Kit de Ejercicios de Soplo · Introducción</span><span class="brand-mark">Espacio Lenguaje</span></div>
</section>

<!-- RECOMENDACIONES -->
<section class="page">
  <span class="section-tag">Cómo usar este kit</span>
  <h2>Recomendaciones de uso</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:4mm;">
    <div class="callout" style="margin:0;"><div class="callout-title">Tiempos cortos</div><p>2-3 ejercicios por sesión, <strong>máximo 10 minutos</strong>. La atención infantil en actividades orales se agota pronto.</p></div>
    <div class="callout" style="margin:0;"><div class="callout-title">Progresivo</div><p>Empieza por el <strong>Nivel 1</strong> y avanza al ritmo de tu peque. No hay prisa.</p></div>
    <div class="callout terracota" style="margin:0;"><div class="callout-title">Es un juego</div><p>Convierte cada ejercicio en un <strong>juego divertido</strong>. Si tu peque no lo disfruta, cambia de actividad.</p></div>
    <div class="callout terracota" style="margin:0;"><div class="callout-title">Constancia, no perfección</div><p>Usa la tabla de seguimiento si quieres, pero <strong>sin convertirlo en obligación</strong>.</p></div>
  </div>
  <div class="disclaimer" style="margin-top:8mm;"><strong>Parad si notas fatiga, mareo o incomodidad.</strong> El objetivo es disfrutar, no forzar.</div>
  <div style="margin-top:10mm;padding:8mm;background:var(--arena-dark);border-radius:6mm;text-align:center;">
    <h4 style="color:var(--cacao);margin-bottom:3mm;">Estructura del kit</h4>
    <p style="color:var(--texto-sec);font-size:10.5pt;margin-bottom:4mm;">15 ejercicios organizados en 3 niveles progresivos</p>
    <div style="display:flex;justify-content:center;gap:6mm;flex-wrap:wrap;">
      <span class="exercise-level level-1">Nivel 1 · 5 ejercicios</span>
      <span class="exercise-level level-2">Nivel 2 · 5 ejercicios</span>
      <span class="exercise-level level-3">Nivel 3 · 5 ejercicios</span>
    </div>
  </div>
  <div class="page-footer"><span>Kit de Ejercicios de Soplo · Cómo usar</span><span class="brand-mark">Espacio Lenguaje</span></div>
</section>

${levelDivider(1, "Nivel 1 — Empezamos", "Cinco ejercicios sencillos para introducir el juego. Materiales que casi todas las casas tienen. Objetivo: disfrutar y crear rutina.")}
${exercises.filter(e => e.level === 1).map(exercisePage).join("")}

${levelDivider(2, "Nivel 2 — Afinamos", "Cinco ejercicios que añaden control y precisión. Ya hay un poquito de reto. El peque empieza a regular intensidad y dirección.")}
${exercises.filter(e => e.level === 2).map(exercisePage).join("")}

${levelDivider(3, "Nivel 3 — Retos finos", "Cinco ejercicios de control fino. Trabajan matices: graduación, sostenimiento, sellado. Para peques que ya dominan los niveles anteriores.")}
${exercises.filter(e => e.level === 3).map(exercisePage).join("")}

<!-- CUÁNDO CONSULTAR -->
<section class="page">
  <span class="section-tag terracota">Saber cuándo pedir ayuda</span>
  <h2>Cuándo consultar con una profesional</h2>
  <p>Este kit es un <strong>material de apoyo divertido</strong> para trabajar respiración funcional y disfrutar en casa. No sustituye la valoración clínica. Considera consultar con una logopeda colegiada si:</p>
  <ul class="list-check" style="margin-top:6mm;">
    <li>Tu peque respira habitualmente por la boca, incluso en reposo o al dormir.</li>
    <li>Babea más de lo esperado para su edad.</li>
    <li>Tiene dificultad para masticar, tragar o sellar los labios al comer.</li>
    <li>Su voz es habitualmente nasal («resfriada» permanente) o débil.</li>
    <li>Presenta <strong>dificultades de pronunciación</strong> de fonemas específicos a edad no esperable.</li>
  </ul>
  <div class="callout" style="margin-top:8mm;">
    <p>En los tres primeros casos, el soplo puede formar parte de un <strong>plan más amplio de terapia miofuncional orofacial</strong>. En el último, el trabajo eficaz es logopédico directo sobre el fonema, no ejercicios de soplo aislados.</p>
  </div>
  <div class="page-footer"><span>Kit de Ejercicios de Soplo · Cuándo consultar</span><span class="brand-mark">Espacio Lenguaje</span></div>
</section>

<!-- TABLA SEGUIMIENTO -->
<section class="page">
  <span class="section-tag">Opcional</span>
  <h2>Tabla de seguimiento semanal</h2>
  <p style="margin-bottom:6mm;">Marca con ✓ los ejercicios realizados cada día. <strong>No pasa nada si hay huecos:</strong> lo que cuenta es la regularidad en semanas, no la perfección diaria.</p>
  <table class="tracker">
    <thead><tr><th>Ejercicio</th><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr></thead>
    <tbody>${trackerRows}</tbody>
  </table>
  <div class="page-footer"><span>Kit de Ejercicios de Soplo · Seguimiento</span><span class="brand-mark">Espacio Lenguaje</span></div>
</section>

<!-- REFERENCIAS -->
<section class="page">
  <span class="section-tag">Rigor profesional</span>
  <h2>Referencias</h2>
  <p style="margin-bottom:6mm;">Este kit se basa en el consenso actual de la literatura profesional en logopedia. Los claims y matices sobre la eficacia del soplo en articulación están respaldados por las siguientes fuentes:</p>
  <ul class="refs">
    <li>American Speech-Language-Hearing Association (ASHA). (2013). <em>Evidence-Based Practice — Non-Speech Oral Motor Exercises</em>. https://www.asha.org/</li>
    <li>Lof, G. L., &amp; Watson, M. M. (2008). A nationwide survey of nonspeech oral motor exercise use: Implications for evidence-based practice. <em>Language, Speech, and Hearing Services in Schools</em>, 39(3), 392-407.</li>
    <li>Bowen, C. (2005). What is the evidence for oral motor therapy? <em>Acquiring Knowledge in Speech, Language and Hearing</em>, 7(3), 144-147.</li>
    <li>McCauley, R. J., Strand, E., Lof, G. L., Schooling, T., &amp; Frymark, T. (2009). Evidence-based systematic review: Effects of nonspeech oral motor exercises on speech production in children. <em>American Journal of Speech-Language Pathology</em>, 18(4), 343-360.</li>
    <li>Forrest, K. (2002). Are oral-motor exercises useful in the treatment of phonological/articulatory disorders? <em>Seminars in Speech and Language</em>, 23(1), 15-25.</li>
  </ul>
  <div class="callout terracota" style="margin-top:10mm;">
    <div class="callout-title">Nuestra postura editorial</div>
    <p>En Espacio Lenguaje solo publicamos material basado en la mejor evidencia disponible. Si la evidencia cambia, actualizamos los materiales. Si detectas alguna afirmación que no te cuadre, escríbenos a <strong>hola@espaciolenguaje.com</strong> — las correcciones son bienvenidas.</p>
  </div>
  <div class="page-footer"><span>Kit de Ejercicios de Soplo · Referencias</span><span class="brand-mark">Espacio Lenguaje</span></div>
</section>

<!-- CONTRAPORTADA -->
<section class="page cover" style="background:linear-gradient(160deg,var(--cacao) 0%,#2A1F21 100%);color:#fff;">
  <div style="color:#fff;">
    <div class="cover-logo" style="background:#fff;color:var(--cacao);">E</div>
    <h1 style="color:#fff;font-size:32pt;max-width:140mm;">Más recursos en espaciolenguaje.com</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:13pt;max-width:130mm;margin-top:6mm;">Blog clínico con más de 20 artículos · Guías descargables · Pack Completo con todos los recursos del equipo.</p>
  </div>
  <div class="cover-footer" style="color:rgba(255,255,255,0.6);">
    © Espacio Lenguaje · Uso personal. No redistribuir.<br>
    <span style="color:#fff;">www.espaciolenguaje.com</span>
  </div>
</section>

</body>
</html>`;

// Write HTML for inspection
const htmlPath = path.join(PREVIEW, "kit-soplo.html");
fs.writeFileSync(htmlPath, html, "utf8");
console.log(`✓ HTML written: ${htmlPath}`);

// Render PDF — goto al HTML file es más fiable que setContent con HTML grande
const pdfPath = path.join(PREVIEW, "kit-ejercicios-soplo-v2.pdf");
const htmlUrl = "file:///" + htmlPath.replace(/\\/g, "/");
const browser = await puppeteer.launch({ headless: true });
const pageCtx = await browser.newPage();
await pageCtx.goto(htmlUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
// Esperar a que fuentes web y todas las imágenes embebidas se rendericen
await pageCtx.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 3000));
await pageCtx.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();
const sizeKB = (fs.statSync(pdfPath).size / 1024).toFixed(1);
console.log(`✓ PDF rendered: ${pdfPath} (${sizeKB} KB)`);
