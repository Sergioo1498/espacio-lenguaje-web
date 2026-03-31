const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function imageToBase64(filePath) {
  const abs = path.join(__dirname, '..', filePath);
  const data = fs.readFileSync(abs);
  const ext = path.extname(filePath).slice(1) === 'png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${data.toString('base64')}`;
}

// ---------------------------------------------------------------------------
// Phoneme data
// ---------------------------------------------------------------------------
const phonemes = [
  { name: 'P', type: 'Oclusiva bilabial', mouth: 'Labios juntos, expulsar aire', words: ['Pato', 'Mapa', 'Stop'], syllables: 'pa - pe - pi - po - pu', emoji: '💨' },
  { name: 'B', type: 'Oclusiva bilabial', mouth: 'Labios juntos suavemente, vibran', words: ['Bota', 'Lobo', 'Club'], syllables: 'ba - be - bi - bo - bu', emoji: '👄' },
  { name: 'T', type: 'Oclusiva dental', mouth: 'Punta de la lengua toca los dientes superiores', words: ['Taza', 'Pato', 'Robot'], syllables: 'ta - te - ti - to - tu', emoji: '🦷' },
  { name: 'D', type: 'Oclusiva dental', mouth: 'Lengua entre los dientes suavemente', words: ['Dado', 'Nido', 'Pared'], syllables: 'da - de - di - do - du', emoji: '👅' },
  { name: 'K', type: 'Oclusiva velar', mouth: 'Parte trasera de la lengua toca el paladar', words: ['Casa', 'Vaca', 'Bloc'], syllables: 'ka - ke - ki - ko - ku', emoji: '🔙' },
  { name: 'G', type: 'Oclusiva velar', mouth: 'Como la K pero con vibración', words: ['Gato', 'Lago', 'Blog'], syllables: 'ga - ge - gi - go - gu', emoji: '🐱' },
  { name: 'F', type: 'Fricativa labiodental', mouth: 'Dientes superiores tocan labio inferior', words: ['Foca', 'Sofá', 'Chef'], syllables: 'fa - fe - fi - fo - fu', emoji: '🌬️' },
  { name: 'S', type: 'Fricativa alveolar', mouth: 'Lengua cerca del paladar, aire pasa por el centro', words: ['Sopa', 'Vaso', 'Bus'], syllables: 'sa - se - si - so - su', emoji: '🐍' },
  { name: 'Z', type: 'Fricativa interdental', mouth: 'Lengua entre los dientes, aire sale', words: ['Zumo', 'Lazo', 'Pez'], syllables: 'za - ze - zi - zo - zu', emoji: '🦷' },
  { name: 'CH', type: 'Africada palatal', mouth: 'Lengua toca paladar duro, suelta de golpe', words: ['Churro', 'Leche', 'Kétchup'], syllables: 'cha - che - chi - cho - chu', emoji: '🍫' },
  { name: 'L', type: 'Lateral alveolar', mouth: 'Punta de lengua en paladar, aire sale por los lados', words: ['Luna', 'Pelo', 'Sol'], syllables: 'la - le - li - lo - lu', emoji: '🌙' },
  { name: 'N', type: 'Nasal alveolar', mouth: 'Punta de lengua en paladar, aire sale por nariz', words: ['Nube', 'Mono', 'Pan'], syllables: 'na - ne - ni - no - nu', emoji: '👃' },
  { name: 'M', type: 'Nasal bilabial', mouth: 'Labios cerrados, aire sale por la nariz', words: ['Mesa', 'Cama', 'Álbum'], syllables: 'ma - me - mi - mo - mu', emoji: '👄' },
  { name: 'Ñ', type: 'Nasal palatal', mouth: 'Lengua plana contra paladar duro', words: ['Ñoño', 'Niño', 'Baño'], syllables: 'ña - ñe - ñi - ño - ñu', emoji: '🇪🇸' },
  { name: 'J', type: 'Fricativa velar', mouth: 'Parte trasera de lengua cerca del paladar', words: ['Jirafa', 'Ojo', 'Reloj'], syllables: 'ja - je - ji - jo - ju', emoji: '🦒' },
  { name: 'LL/Y', type: 'Lateral palatal', mouth: 'Lengua en paladar, aire sale por los lados', words: ['Llave', 'Pollo', 'Rey'], syllables: 'ya - ye - yi - yo - yu', emoji: '🔑' },
  { name: 'R suave', type: 'Vibrante simple', mouth: 'Punta de lengua toca paladar una vez', words: ['Pera', 'Coro', 'Ir'], syllables: 'ra suave', emoji: '🍐' },
  { name: 'RR', type: 'Vibrante múltiple', mouth: 'Punta de lengua vibra repetidamente', words: ['Perro', 'Carro', 'Correr'], syllables: 'rra - rre - rri - rro - rru', emoji: '🐕' },
  { name: 'BL', type: 'Grupo consonántico', mouth: 'B + L juntos', words: ['Blanco', 'Tabla', '—'], syllables: 'bla - ble - bli - blo - blu', emoji: '⚪' },
  { name: 'BR', type: 'Grupo consonántico', mouth: 'B + R juntos', words: ['Brazo', 'Libro', '—'], syllables: 'bra - bre - bri - bro - bru', emoji: '💪' },
  { name: 'CL', type: 'Grupo consonántico', mouth: 'K + L juntos', words: ['Clavo', 'Ancla', '—'], syllables: 'cla - cle - cli - clo - clu', emoji: '🔩' },
  { name: 'CR', type: 'Grupo consonántico', mouth: 'K + R juntos', words: ['Cruz', 'Micro', '—'], syllables: 'cra - cre - cri - cro - cru', emoji: '✝️' },
  { name: 'DR', type: 'Grupo consonántico', mouth: 'D + R juntos', words: ['Dragón', 'Madre', '—'], syllables: 'dra - dre - dri - dro - dru', emoji: '🐉' },
  { name: 'FL', type: 'Grupo consonántico', mouth: 'F + L juntos', words: ['Flor', 'Rifle', '—'], syllables: 'fla - fle - fli - flo - flu', emoji: '🌸' },
  { name: 'FR', type: 'Grupo consonántico', mouth: 'F + R juntos', words: ['Fruta', 'Cofre', '—'], syllables: 'fra - fre - fri - fro - fru', emoji: '🍎' },
  { name: 'GL', type: 'Grupo consonántico', mouth: 'G + L juntos', words: ['Globo', 'Iglú', '—'], syllables: 'gla - gle - gli - glo - glu', emoji: '🎈' },
  { name: 'GR', type: 'Grupo consonántico', mouth: 'G + R juntos', words: ['Grillo', 'Tigre', '—'], syllables: 'gra - gre - gri - gro - gru', emoji: '🦗' },
  { name: 'PL', type: 'Grupo consonántico', mouth: 'P + L juntos', words: ['Plato', 'Soplar', '—'], syllables: 'pla - ple - pli - plo - plu', emoji: '🍽️' },
  { name: 'PR', type: 'Grupo consonántico', mouth: 'P + R juntos', words: ['Primo', 'Compra', '—'], syllables: 'pra - pre - pri - pro - pru', emoji: '👦' },
  { name: 'TR', type: 'Grupo consonántico', mouth: 'T + R juntos', words: ['Tren', 'Metro', '—'], syllables: 'tra - tre - tri - tro - tru', emoji: '🚂' },
];

// ---------------------------------------------------------------------------
// HTML builder
// ---------------------------------------------------------------------------
function buildHTML(logoB64) {
  const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 0; }
    html, body { width: 794px; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #3D2C2E; background: #FDF8F4; }
    h1, h2, h3 { font-family: Georgia, 'Times New Roman', serif; }

    .page {
      width: 794px; height: 1123px;
      padding: 60px 64px;
      position: relative; overflow: hidden;
      background: #FDF8F4;
      page-break-after: always;
    }

    /* Decorative circles */
    .deco-circle {
      position: absolute; border-radius: 50%; pointer-events: none;
    }

    /* Footer */
    .page-footer {
      position: absolute; bottom: 30px; left: 64px; right: 64px;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 11px; color: #9a8a8c;
    }
    .page-footer .brand { font-weight: 600; color: #C4745A; }

    /* --- COVER --- */
    .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .cover .logo { width: 110px; height: 110px; border-radius: 50%; margin-bottom: 28px; }
    .cover h1 { font-size: 40px; color: #3D2C2E; margin-bottom: 10px; line-height: 1.15; }
    .cover .subtitle { font-size: 18px; color: #6b5a5c; max-width: 420px; line-height: 1.5; margin-bottom: 24px; }
    .cover .divider { width: 80px; height: 3px; background: #8FAE8B; border-radius: 2px; margin-bottom: 24px; }
    .cover .badge { display: inline-block; background: #C4745A; color: white; font-size: 13px; font-weight: 600; padding: 8px 20px; border-radius: 20px; }

    /* --- INSTRUCTIONS --- */
    .instructions h2 { font-size: 28px; color: #3D2C2E; margin-bottom: 24px; border-left: 4px solid #8FAE8B; padding-left: 16px; }
    .instructions .intro { font-size: 15px; color: #6b5a5c; line-height: 1.6; margin-bottom: 28px; }
    .tip-card { background: white; border-radius: 14px; padding: 18px 22px; margin-bottom: 14px; display: flex; gap: 14px; align-items: flex-start; }
    .tip-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
    .tip-card h4 { font-family: Georgia, serif; font-size: 15px; color: #3D2C2E; margin-bottom: 4px; }
    .tip-card p { font-size: 13px; color: #6b5a5c; line-height: 1.5; }

    /* --- CARD PAGE --- */
    .card-page { display: flex; flex-direction: column; }
    .card-header { text-align: center; margin-bottom: 18px; }
    .phoneme-circle {
      width: 130px; height: 130px; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      font-family: Georgia, serif; font-size: 52px; font-weight: 700; color: white;
      margin-bottom: 12px;
    }
    .phoneme-type { font-size: 14px; color: #9a8a8c; letter-spacing: 1px; text-transform: uppercase; }

    .card-body { flex: 1; }
    .card-section { background: white; border-radius: 14px; padding: 20px 24px; margin-bottom: 14px; }
    .card-section h3 { font-size: 16px; color: #3D2C2E; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
    .card-section h3 .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .card-section p, .card-section li { font-size: 14px; color: #6b5a5c; line-height: 1.6; }

    .words-grid { display: flex; gap: 12px; margin-top: 8px; }
    .word-chip { flex: 1; text-align: center; padding: 12px 8px; background: #FDF8F4; border-radius: 10px; }
    .word-chip .word { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #3D2C2E; }
    .word-chip .pos { font-size: 11px; color: #9a8a8c; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

    .exercise-box {
      background: #F5E6D3; border-radius: 14px; padding: 20px 24px; text-align: center; margin-bottom: 14px;
    }
    .exercise-box .label { font-size: 12px; color: #C4745A; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 8px; }
    .exercise-box .syllables { font-family: Georgia, serif; font-size: 26px; color: #3D2C2E; font-weight: 700; }

    .card-emoji { font-size: 32px; text-align: center; margin-top: 2px; }

    /* --- BACK COVER --- */
    .back-cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .back-cover .logo { width: 90px; height: 90px; border-radius: 50%; margin-bottom: 24px; }
    .back-cover h2 { font-size: 32px; color: #3D2C2E; margin-bottom: 8px; }
    .back-cover .tagline { font-size: 16px; color: #C4745A; font-family: Georgia, serif; margin-bottom: 28px; }
    .back-cover .info-row { display: flex; gap: 32px; margin-bottom: 28px; }
    .back-cover .info-item { font-size: 14px; color: #6b5a5c; display: flex; align-items: center; gap: 6px; }
    .back-cover .legal { font-size: 11px; color: #9a8a8c; max-width: 400px; line-height: 1.5; }
  `;

  const positions = ['Inicio', 'Medio', 'Final'];

  // ---------- Cover ----------
  const coverPage = `
    <div class="page cover">
      <div class="deco-circle" style="top:-90px;right:-90px;width:320px;height:320px;background:rgba(196,116,90,0.08);"></div>
      <div class="deco-circle" style="bottom:-70px;left:-70px;width:240px;height:240px;background:rgba(143,174,139,0.06);"></div>
      <div class="deco-circle" style="top:40%;left:-50px;width:140px;height:140px;background:rgba(245,230,211,0.5);"></div>
      <img src="${logoB64}" alt="Logo" class="logo" />
      <h1>Pack de Fichas<br/>de Articulaci&oacute;n</h1>
      <div class="divider"></div>
      <p class="subtitle">30 fichas imprimibles para trabajar la articulaci&oacute;n en casa</p>
      <span class="badge">Espacio Lenguaje</span>
      <div class="page-footer"><span class="brand">espaciolenguaje.com</span><span></span></div>
    </div>`;

  // ---------- Instructions ----------
  const tips = [
    { icon: '⏱️', bg: '#C4745A', title: 'Solo 5 minutos al d\u00eda', text: 'Es mejor practicar poco cada d\u00eda que mucho de vez en cuando. Busca un momento tranquilo del d\u00eda.' },
    { icon: '🎮', bg: '#8FAE8B', title: 'Hazlo divertido', text: 'Convierte la pr\u00e1ctica en un juego. Usa las fichas como cartas, haz competiciones o inventa historias.' },
    { icon: '💚', bg: '#8FAE8B', title: 'No corrijas con dureza', text: 'Si tu peque dice mal un sonido, rep\u00edtelo t\u00fa correctamente de forma natural. Evita decir "no, as\u00ed no".' },
    { icon: '🎉', bg: '#C4745A', title: 'Celebra cada intento', text: 'El esfuerzo importa m\u00e1s que la perfecci\u00f3n. Celebra que lo intenta, no solo que lo consiga.' },
    { icon: '📅', bg: '#8FAE8B', title: '\u00bfCu\u00e1ndo practicar?', text: 'Despu\u00e9s de merendar, antes de dormir, en el coche... cualquier momento tranquilo sirve.' },
    { icon: '🔁', bg: '#C4745A', title: 'Repite, repite, repite', text: 'La repetici\u00f3n es clave. No tengas prisa. Cada fonema necesita muchas pr\u00e1cticas antes de asentarse.' },
  ];

  const instructionsPage = `
    <div class="page instructions">
      <div class="deco-circle" style="top:-40px;right:-40px;width:160px;height:160px;background:rgba(143,174,139,0.06);"></div>
      <h2>C\u00f3mo usar estas fichas</h2>
      <p class="intro">Estas fichas est\u00e1n dise\u00f1adas para que las familias puedan practicar la articulaci\u00f3n de cada fonema en casa de forma sencilla y divertida. Aqu\u00ed tienes algunos consejos:</p>
      ${tips.map(t => `
        <div class="tip-card">
          <div class="tip-icon" style="background:${t.bg}20;color:${t.bg};">${t.icon}</div>
          <div>
            <h4>${t.title}</h4>
            <p>${t.text}</p>
          </div>
        </div>
      `).join('')}
      <div class="page-footer"><span class="brand">Espacio Lenguaje</span><span>P\u00e1gina 2</span></div>
    </div>`;

  // ---------- Card pages ----------
  const cardPages = phonemes.map((ph, i) => {
    const color = i % 2 === 0 ? '#C4745A' : '#8FAE8B';
    const pageNum = i + 3;
    return `
    <div class="page card-page">
      <div class="deco-circle" style="top:-30px;right:-30px;width:120px;height:120px;background:${color}10;"></div>
      <div class="deco-circle" style="bottom:-40px;left:-40px;width:100px;height:100px;background:${color}08;"></div>

      <div class="card-header">
        <div class="phoneme-circle" style="background:${color};">${ph.name}</div>
        <div class="phoneme-type">${ph.type}</div>
      </div>

      <div class="card-body">
        <div class="card-section">
          <h3><span class="dot" style="background:${color};"></span> Posici\u00f3n de la boca</h3>
          <p>${ph.mouth}</p>
        </div>

        <div class="card-section">
          <h3><span class="dot" style="background:${color};"></span> Palabras para practicar</h3>
          <div class="words-grid">
            ${ph.words.map((w, wi) => `
              <div class="word-chip">
                <div class="word">${w}</div>
                <div class="pos">${positions[wi]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="exercise-box">
          <div class="label">Repite con tu peque</div>
          <div class="syllables">${ph.syllables}</div>
        </div>

        <div class="card-emoji">${ph.emoji}</div>
      </div>

      <div class="page-footer"><span class="brand">Espacio Lenguaje</span><span>P\u00e1gina ${pageNum}</span></div>
    </div>`;
  });

  // ---------- Back Cover ----------
  const backCover = `
    <div class="page back-cover">
      <div class="deco-circle" style="top:-60px;left:-60px;width:200px;height:200px;background:rgba(196,116,90,0.06);"></div>
      <div class="deco-circle" style="bottom:-80px;right:-80px;width:260px;height:260px;background:rgba(143,174,139,0.06);"></div>
      <img src="${logoB64}" alt="Logo" class="logo" />
      <h2>Espacio Lenguaje</h2>
      <p class="tagline">Logopedia infantil para familias</p>
      <div class="info-row">
        <div class="info-item">🌐 espaciolenguaje.com</div>
        <div class="info-item">📷 @espaciolenguaje</div>
        <div class="info-item">✉️ hola@espaciolenguaje.com</div>
      </div>
      <p class="legal">&copy; 2026 Espacio Lenguaje. Todos los derechos reservados.<br/>Este material es para uso personal y educativo. No est\u00e1 permitida su redistribuci\u00f3n comercial.</p>
    </div>`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><style>${css}</style></head>
<body>
  ${coverPage}
  ${instructionsPage}
  ${cardPages.join('\n')}
  ${backCover}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------
async function generatePDF() {
  const logoB64 = imageToBase64('public/images/logo-chosen.png');
  const html = buildHTML(logoB64);

  const outputDir = path.join(__dirname, '..', 'public', 'downloads', 'productos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'pack-fichas-articulacion.pdf');

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`PDF generated: ${outputPath}`);
  console.log(`File size: ${sizeMB} MB (${stats.size} bytes)`);
}

generatePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
