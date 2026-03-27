const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function imageToBase64(filePath) {
  const abs = path.join(__dirname, '..', filePath);
  const data = fs.readFileSync(abs);
  const ext = path.extname(filePath).slice(1) === 'png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${data.toString('base64')}`;
}

async function generatePDF() {
  const logoB64 = imageToBase64('public/images/logo-chosen.png');
  const coverImgB64 = imageToBase64('public/images/guia-cover-interior.png');

  const pages = [
    // PAGE 1 — COVER
    `<div class="page cover">
      <div class="deco-circle" style="top:-80px;right:-80px;width:300px;height:300px;background:rgba(196,116,90,0.08);"></div>
      <div class="deco-circle" style="bottom:-60px;left:-60px;width:200px;height:200px;background:rgba(143,174,139,0.06);"></div>
      <div style="text-align:center;padding-top:60px;">
        <img src="${logoB64}" alt="Logo" style="width:120px;height:120px;border-radius:50%;" />
      </div>
      <h1 style="text-align:center;font-size:42px;color:#3D2C2E;margin:30px 0 8px;">Hitos del Lenguaje</h1>
      <p style="text-align:center;font-size:32px;color:#C4745A;margin:0 0 20px;font-family:Georgia,serif;">de 0 a 6 años</p>
      <div style="width:80px;height:3px;background:#8FAE8B;margin:0 auto 24px;border-radius:2px;"></div>
      <div style="text-align:center;margin:0 auto;max-width:80%;">
        <img src="${coverImgB64}" alt="Materiales" style="width:60%;border-radius:12px;margin-bottom:24px;" />
      </div>
      <p style="text-align:center;color:#6b5a5c;font-size:15px;max-width:400px;margin:0 auto 20px;line-height:1.5;">Qué debería decir tu peque a cada edad, señales de alerta y ejercicios para casa</p>
      <p style="text-align:center;color:#8FAE8B;font-size:13px;font-weight:600;">Una guía creada por logopedas para familias</p>
    </div>`,

    // PAGE 2 — INTRO
    `<div class="page">
      <div class="deco-circle" style="top:-40px;right:-40px;width:150px;height:150px;background:rgba(143,174,139,0.06);"></div>
      <h2 class="section-title" style="border-left:4px solid #C4745A;padding-left:16px;">Antes de empezar...</h2>
      <p>Cada niño tiene su propio ritmo. No todos empiezan a hablar al mismo tiempo, ni lo hacen de la misma manera. Y eso está bien.</p>
      <p>Esta guía no pretende alarmarte. Al contrario: queremos darte información clara y basada en evidencia para que puedas acompañar el desarrollo del lenguaje de tu hijo con tranquilidad y confianza.</p>
      <p style="margin-top:20px;font-weight:600;color:#3D2C2E;">Dentro encontrarás:</p>
      <ul>
        <li>Los hitos del lenguaje organizados por edad (de 0 a 6 años)</li>
        <li>Señales de alerta que indican cuándo consultar a un profesional</li>
        <li>Un ejercicio práctico para cada etapa que puedes hacer en casa hoy mismo</li>
      </ul>
      <div class="highlight-box" style="background:#F5E6D3;margin-top:30px;">
        <p style="margin:0;font-size:14px;">Si después de leerla tienes dudas, escríbenos a <strong style="color:#C4745A;">hola@espaciolenguaje.com</strong></p>
      </div>
      <div style="text-align:center;margin-top:40px;font-size:40px;">💚</div>
    </div>`,

    // PAGES 3-8: Milestones
    ...generateMilestonePages(),

    // PAGE 9 — WHEN TO CONSULT
    `<div class="page">
      <h2 class="section-title" style="border-left:4px solid #C4745A;padding-left:16px;">¿Cuándo consultar a un logopeda?</h2>
      <div class="quote-box" style="background:#C4745A;color:white;padding:20px 24px;border-radius:12px;margin:20px 0;text-align:center;">
        <p style="margin:0;font-size:16px;font-style:italic;font-family:Georgia,serif;">"Consultar no significa que haya un problema.<br/>Significa que te importa."</p>
      </div>
      <p style="font-weight:600;margin-bottom:12px;">Consulta si observas alguna de estas señales:</p>
      <div class="checklist">
        ${['No balbucea hacia los 9-10 meses','No dice palabras hacia los 18 meses','No combina palabras hacia los 24 meses','No le entienden a los 3 años','Ha dejado de decir palabras que antes decía','Se frustra mucho al intentar comunicarse','No muestra interés por comunicarse','Tartamudea de forma persistente','Dificultades con lectoescritura a los 5-6 años'].map(s => `<div class="check-item"><span class="check-icon">✓</span>${s}</div>`).join('')}
      </div>
      <div class="highlight-box" style="background:#F5E6D3;margin-top:24px;">
        <p style="margin:0;font-style:italic;color:#3D2C2E;font-size:14px;"><strong>La intervención temprana es la más eficaz.</strong> Cuanto antes se detecta una dificultad, mejores son los resultados.</p>
      </div>
    </div>`,

    // PAGE 10 — ABOUT + CTA
    `<div class="page">
      <div class="deco-circle" style="bottom:-60px;right:-60px;width:200px;height:200px;background:rgba(196,116,90,0.06);"></div>
      <h2 class="section-title" style="border-left:4px solid #8FAE8B;padding-left:16px;">¿Quieres seguir aprendiendo?</h2>
      <p><strong>Espacio Lenguaje</strong> es un proyecto de logopedia infantil que ofrece recursos, artículos y guías para familias que quieren acompañar el desarrollo del lenguaje de sus hijos.</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin:24px 0;">
        <div class="resource-item"><span style="color:#C4745A;font-size:18px;">📝</span> <strong>Blog</strong> con artículos basados en evidencia</div>
        <div class="resource-item"><span style="color:#8FAE8B;font-size:18px;">📥</span> <strong>Recursos descargables</strong> listos para imprimir</div>
        <div class="resource-item"><span style="color:#C4745A;font-size:18px;">📖</span> <strong>Guías</strong> paso a paso para familias</div>
      </div>
      <div style="margin:30px 0;padding:20px;background:white;border-radius:12px;text-align:center;">
        <p style="margin:0 0 8px;font-size:13px;color:#6b5a5c;">Síguenos:</p>
        <p style="margin:0 0 4px;font-weight:600;color:#C4745A;">Instagram: @espaciolenguaje</p>
        <p style="margin:0 0 4px;font-weight:600;color:#C4745A;">TikTok: @espaciolenguaje</p>
        <p style="margin:0 0 4px;color:#6b5a5c;">hola@espaciolenguaje.com</p>
        <p style="margin:0;color:#6b5a5c;">espaciolenguaje.com</p>
      </div>
      <div style="text-align:center;margin-top:20px;">
        <img src="${logoB64}" alt="Logo" style="width:80px;height:80px;border-radius:50%;" />
      </div>
      <p style="text-align:center;font-family:Georgia,serif;font-size:18px;color:#3D2C2E;margin-top:16px;font-style:italic;">Cada peque merece encontrar su voz.</p>
    </div>`
  ];

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    color: #3D2C2E;
    font-size: 14px;
    line-height: 1.65;
    background: #FDF8F4;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 50px 60px 70px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    background: #FDF8F4;
  }

  .page:last-child { page-break-after: auto; }

  .cover { display: flex; flex-direction: column; justify-content: center; align-items: center; }

  h1, h2, h3 { font-family: Georgia, 'DM Serif Display', serif; }

  .section-title {
    font-size: 26px;
    color: #3D2C2E;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  p { margin-bottom: 12px; color: #6b5a5c; font-size: 14px; }

  ul { padding-left: 20px; margin: 12px 0; }
  ul li {
    margin-bottom: 8px;
    color: #6b5a5c;
    position: relative;
    padding-left: 8px;
  }
  ul li::marker { color: #C4745A; }

  .deco-circle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .age-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    color: white;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 12px;
  }

  .milestone-title {
    font-size: 22px;
    color: #3D2C2E;
    margin-bottom: 16px;
    font-family: Georgia, serif;
  }

  .hitos-box {
    background: white;
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 14px;
  }
  .hitos-box h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 700; }
  .hitos-box ul { margin: 0; padding-left: 18px; }
  .hitos-box li { font-size: 13px; margin-bottom: 4px; }

  .alert-box {
    background: #FFF0ED;
    border-left: 3px solid #C4745A;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 14px;
  }
  .alert-box h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #C4745A; margin-bottom: 6px; font-weight: 700; }
  .alert-box li { font-size: 12px; color: #6b5a5c; margin-bottom: 3px; }

  .exercise-box {
    background: #F5E6D3;
    border-radius: 12px;
    padding: 16px 20px;
  }
  .exercise-box h4 { font-size: 13px; font-weight: 700; color: #3D2C2E; margin-bottom: 6px; }
  .exercise-box p { font-size: 13px; margin: 0; }

  .highlight-box {
    border-radius: 12px;
    padding: 16px 20px;
  }

  .checklist { display: flex; flex-direction: column; gap: 8px; }
  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #3D2C2E;
  }
  .check-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #8FAE8B;
    color: white;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .resource-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #6b5a5c;
  }

  .page-footer {
    position: absolute;
    bottom: 24px;
    left: 60px;
    right: 60px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #9a8a8c;
  }
</style>
</head>
<body>
${pages.map((p, i) => p + `<div class="page-footer"><span>Espacio Lenguaje · espaciolenguaje.com</span><span>${i + 1}</span></div>`).join('\n')}
</body>
</html>`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  const outputPath = path.join(__dirname, '..', 'public', 'downloads', 'guia-hitos-lenguaje-espacio-lenguaje.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });

  await browser.close();
  console.log('PDF generated at:', outputPath);
}

function generateMilestonePages() {
  const milestones = [
    {
      age: '0-6m', color: '#C4745A', title: '0-6 meses: los primeros sonidos',
      hitos: ['Reacciona a sonidos girando la cabeza', 'Sonrisa social hacia los 2 meses', 'Gorjeo y vocalizaciones ("aaaa", "oooo")', 'Reconoce la voz de mamá y papá'],
      alerts: ['No reacciona a sonidos fuertes', 'No emite gorjeos hacia los 4 meses', 'No muestra sonrisa social'],
      exercise: { name: 'El espejo de las caras', desc: 'Ponte frente a tu bebé y exagera expresiones faciales: abre la boca, saca la lengua, haz sonidos. Espera a que intente imitarte. 2-3 minutos al día.' }
    },
    {
      age: '6-12m', color: '#8FAE8B', title: '6-12 meses: balbuceo y primeros gestos',
      hitos: ['Balbucea sílabas repetidas ("mamama", "bababa")', 'Responde a su nombre', 'Señala objetos que quiere', 'Entiende "no" y "adiós"', 'Imita gestos como aplaudir'],
      alerts: ['No balbucea hacia los 9 meses', 'No responde a su nombre', 'No señala ni usa gestos hacia los 12 meses'],
      exercise: { name: 'Narrar el día a día', desc: 'Mientras bañas, vistes o das de comer, narra: "Ahora te pongo el calcetín azul". Tu bebé está absorbiendo ritmo, entonación y vocabulario.' }
    },
    {
      age: '12-18m', color: '#C4745A', title: '12-18 meses: las primeras palabras',
      hitos: ['Primeras palabras con significado ("mamá", "agua", "más")', 'Vocabulario de 10-50 palabras', 'Señala para pedir o mostrar', 'Entiende instrucciones sencillas', 'Empieza a negar con la cabeza'],
      alerts: ['No dice ninguna palabra hacia los 18 meses', 'No señala para pedir', 'No comprende instrucciones simples', 'Ha dejado de decir palabras que antes decía'],
      exercise: { name: 'Ampliar lo que dice', desc: 'Si dice "agua", responde: "Sí, quieres agua. Aquí tienes tu vaso de agua." No corrijas, modela la versión ampliada.' }
    },
    {
      age: '18-24m', color: '#8FAE8B', title: '18-24 meses: la explosión del vocabulario',
      hitos: ['Explosión de vocabulario: 50-200+ palabras', 'Combina dos palabras ("mamá agua", "más galleta")', 'Hace preguntas con entonación: "¿eso?"', 'Sigue instrucciones de dos pasos', 'Le gusta que le lean cuentos'],
      alerts: ['No combina dos palabras hacia los 24 meses', 'Menos de 50 palabras a los 2 años', 'Los adultos no le entienden la mayor parte del tiempo'],
      exercise: { name: 'El juego de las opciones', desc: 'Ofrece dos opciones visibles: "¿Quieres manzana o plátano?" Esto le obliga a usar una palabra para elegir, sin presión.' }
    },
    {
      age: '2-4a', color: '#C4745A', title: '2-4 años: el lenguaje despega',
      hitos: ['Frases de 3-4 palabras cada vez más complejas', 'Usa pronombres ("yo", "tú", "mío")', 'Pregunta "¿qué es?" y "¿por qué?" constantemente', 'Cuenta experiencias de su día', 'Se le entiende el 75%+'],
      alerts: ['No hace frases de 3 palabras hacia los 3 años', 'Personas fuera de la familia no le entienden', 'No hace preguntas', 'Se frustra mucho al comunicarse'],
      exercise: { name: 'Cuentacuentos compartido', desc: 'Lee un cuento pero para en cada página: "¿Qué ves?", "¿Qué va a pasar?", "¿Cómo se siente?" 10 minutos al día hacen una diferencia enorme.' }
    },
    {
      age: '4-6a', color: '#8FAE8B', title: '4-6 años: consolidación y lectoescritura',
      hitos: ['Cuenta historias con inicio, medio y final', 'Frases complejas con "porque", "pero", "cuando"', 'Pronuncia bien R, S y grupos consonánticos', 'Reconoce letras y escribe su nombre', 'Entiende humor y bromas sencillas'],
      alerts: ['No pronuncia bien R/S hacia los 5-6 años', 'Le cuesta contar qué hizo en el colegio', 'Dificultad con letras y rimas', 'Tartamudea más de 6 meses', 'Evita hablar en situaciones sociales'],
      exercise: { name: 'El juego de las rimas', desc: '"¿Qué rima con gato? ¡Pato! ¿Y con luna? ¡Cuna!" Desarrolla la conciencia fonológica, base de la lectoescritura. Juégalo en el coche, en la bañera, paseando.' }
    },
  ];

  return milestones.map(m => `<div class="page">
    <div class="deco-circle" style="top:-30px;right:-30px;width:120px;height:120px;background:${m.color}10;"></div>
    <div class="age-badge" style="background:${m.color};">${m.age}</div>
    <h3 class="milestone-title">${m.title}</h3>
    <div class="hitos-box">
      <h4 style="color:${m.color};">Lo que suele hacer a esta edad</h4>
      <ul>${m.hitos.map(h => `<li>${h}</li>`).join('')}</ul>
    </div>
    <div class="alert-box">
      <h4>⚠️ Señales de alerta</h4>
      <ul>${m.alerts.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>
    <div class="exercise-box">
      <h4>🏠 Ejercicio para casa: ${m.exercise.name}</h4>
      <p>${m.exercise.desc}</p>
    </div>
  </div>`);
}

generatePDF().catch(console.error);
