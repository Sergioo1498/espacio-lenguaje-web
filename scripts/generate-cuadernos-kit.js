const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function imageToBase64(filePath) {
  const abs = path.join(__dirname, '..', filePath);
  const data = fs.readFileSync(abs);
  const ext = path.extname(filePath).slice(1) === 'png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${data.toString('base64')}`;
}

const logo = imageToBase64('public/images/logo-chosen.png');

// Brand colors
const CREMA = '#FDF8F4';
const TERRACOTA = '#C4745A';
const VERDE = '#8FAE8B';
const CACAO = '#3D2C2E';
const ARENA = '#F5E6D3';

// ---------------------------------------------------------------------------
// Shared CSS
// ---------------------------------------------------------------------------
const sharedCSS = `
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 794px; font-family: system-ui, -apple-system, sans-serif; color: ${CACAO}; background: ${CREMA}; }
  h1, h2, h3, h4 { font-family: Georgia, 'Times New Roman', serif; }
  .page { width: 794px; min-height: 1123px; height: 1123px; position: relative; overflow: hidden; page-break-after: always; padding: 60px; display: flex; flex-direction: column; }
  .page:last-child { page-break-after: avoid; }
  .cover { justify-content: center; align-items: center; text-align: center; background: ${CREMA}; }
  .cover img.logo { width: 180px; margin-bottom: 30px; }
  .cover h1 { font-size: 36px; color: ${CACAO}; margin-bottom: 10px; line-height: 1.2; }
  .cover h2 { font-size: 28px; color: ${TERRACOTA}; margin-bottom: 20px; font-weight: normal; }
  .cover p { font-size: 18px; color: ${CACAO}; opacity: 0.7; }
  .cover .deco-line { width: 120px; height: 4px; background: ${TERRACOTA}; margin: 20px auto; border-radius: 2px; }
  .back-cover { justify-content: center; align-items: center; text-align: center; background: ${ARENA}; }
  .back-cover img.logo { width: 140px; margin-bottom: 20px; }
  .back-cover h3 { font-size: 22px; color: ${CACAO}; margin-bottom: 10px; }
  .back-cover p { font-size: 14px; color: ${CACAO}; opacity: 0.7; max-width: 500px; line-height: 1.6; }
  .index-page { background: ${CREMA}; }
  .index-page h2 { font-size: 28px; color: ${CACAO}; margin-bottom: 30px; text-align: center; }
  .index-page .index-section { margin-bottom: 18px; }
  .index-page .index-section h3 { font-size: 16px; color: ${TERRACOTA}; margin-bottom: 6px; border-bottom: 2px solid ${ARENA}; padding-bottom: 4px; }
  .index-page .index-section ul { list-style: none; padding-left: 10px; }
  .index-page .index-section li { font-size: 13px; padding: 3px 0; color: ${CACAO}; }
  .index-page .index-section li::before { content: "\\2022"; color: ${VERDE}; font-weight: bold; margin-right: 8px; }
  .section-divider { justify-content: center; align-items: center; text-align: center; background: ${ARENA}; }
  .section-divider .age-badge { font-size: 64px; font-family: Georgia, serif; color: ${TERRACOTA}; margin-bottom: 20px; font-weight: bold; }
  .section-divider .section-title { font-size: 24px; color: ${CACAO}; }
  .section-divider .accent-bar { width: 80px; height: 5px; background: ${VERDE}; margin: 20px auto; border-radius: 3px; }
  .activity-page { background: ${CREMA}; padding: 40px 50px; }
  .activity-page .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .activity-page .header h2 { font-size: 22px; color: ${CACAO}; flex: 1; }
  .activity-page .header .badge { font-size: 12px; padding: 5px 14px; border-radius: 20px; color: white; font-weight: bold; white-space: nowrap; }
  .activity-page .emoji-deco { font-size: 40px; text-align: right; position: absolute; top: 40px; right: 50px; }
  .activity-page .materials { background: ${ARENA}; border-radius: 10px; padding: 14px 18px; margin-bottom: 16px; }
  .activity-page .materials strong { color: ${TERRACOTA}; font-size: 13px; }
  .activity-page .materials span { font-size: 13px; }
  .activity-page .steps { margin-bottom: 16px; }
  .activity-page .steps h3 { font-size: 15px; color: ${TERRACOTA}; margin-bottom: 10px; }
  .activity-page .steps ol { padding-left: 20px; }
  .activity-page .steps li { font-size: 13px; line-height: 1.7; margin-bottom: 4px; }
  .activity-page .develops { background: ${VERDE}22; border-left: 4px solid ${VERDE}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 14px; }
  .activity-page .develops strong { color: ${VERDE}; font-size: 13px; }
  .activity-page .develops span { font-size: 13px; }
  .activity-page .variations { background: ${TERRACOTA}11; border-left: 4px solid ${TERRACOTA}; padding: 12px 16px; border-radius: 0 8px 8px 0; }
  .activity-page .variations strong { color: ${TERRACOTA}; font-size: 13px; }
  .activity-page .variations span { font-size: 13px; }
  .exercise-card { background: ${CREMA}; padding: 40px 50px; }
  .exercise-card .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .exercise-card .card-number { font-size: 48px; font-family: Georgia, serif; color: ${ARENA}; font-weight: bold; line-height: 1; }
  .exercise-card .card-title { font-size: 24px; color: ${CACAO}; font-family: Georgia, serif; flex: 1; margin-left: 20px; padding-top: 8px; }
  .exercise-card .level-badge { font-size: 12px; padding: 5px 14px; border-radius: 20px; color: white; font-weight: bold; white-space: nowrap; }
  .exercise-card .meta-row { display: flex; gap: 20px; margin-bottom: 16px; }
  .exercise-card .meta-item { background: ${ARENA}; border-radius: 10px; padding: 12px 16px; flex: 1; }
  .exercise-card .meta-item strong { display: block; font-size: 11px; color: ${TERRACOTA}; text-transform: uppercase; margin-bottom: 4px; }
  .exercise-card .meta-item span { font-size: 13px; }
  .exercise-card .instructions { margin-bottom: 16px; }
  .exercise-card .instructions h3 { font-size: 15px; color: ${TERRACOTA}; margin-bottom: 10px; }
  .exercise-card .instructions ol { padding-left: 20px; }
  .exercise-card .instructions li { font-size: 13px; line-height: 1.7; margin-bottom: 4px; }
  .exercise-card .works { background: ${VERDE}22; border-left: 4px solid ${VERDE}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 14px; }
  .exercise-card .works strong { color: ${VERDE}; font-size: 13px; }
  .exercise-card .works span { font-size: 13px; }
  .exercise-card .focus-box { background: ${TERRACOTA}11; border-left: 4px solid ${TERRACOTA}; padding: 12px 16px; border-radius: 0 8px 8px 0; }
  .exercise-card .focus-box strong { color: ${TERRACOTA}; font-size: 13px; }
  .exercise-card .focus-box span { font-size: 13px; }
  .tracking-page { background: ${CREMA}; padding: 30px 40px; }
  .tracking-page h2 { font-size: 22px; color: ${CACAO}; text-align: center; margin-bottom: 20px; }
  .tracking-page table { width: 100%; border-collapse: collapse; font-size: 11px; }
  .tracking-page th { background: ${TERRACOTA}; color: white; padding: 8px 4px; text-align: center; font-size: 10px; }
  .tracking-page td { border: 1px solid ${ARENA}; padding: 6px 4px; text-align: center; font-size: 10px; }
  .tracking-page td:first-child { text-align: left; padding-left: 8px; font-size: 9px; width: 200px; }
  .tracking-page tr:nth-child(even) td { background: ${ARENA}44; }
  .intro-page { background: ${CREMA}; padding: 50px 60px; }
  .intro-page h2 { font-size: 26px; color: ${CACAO}; margin-bottom: 20px; text-align: center; }
  .intro-page p { font-size: 14px; line-height: 1.8; margin-bottom: 14px; color: ${CACAO}; }
  .intro-page ul { padding-left: 20px; margin-bottom: 14px; }
  .intro-page li { font-size: 14px; line-height: 1.8; margin-bottom: 4px; }
`;

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------
function coverPage(title, subtitle, tagline) {
  return `<div class="page cover">
    <img class="logo" src="${logo}" alt="Logo" />
    <h1>${title}</h1>
    <div class="deco-line"></div>
    <h2>${subtitle}</h2>
    <p>${tagline}</p>
  </div>`;
}

function backCover() {
  return `<div class="page back-cover">
    <img class="logo" src="${logo}" alt="Logo" />
    <h3>Espacio Lenguaje</h3>
    <p>Logopedia infantil especializada.<br>Recursos profesionales para familias y terapeutas.<br><br>www.espaciolenguaje.com</p>
  </div>`;
}

function sectionDivider(ageRange, subtitle) {
  return `<div class="page section-divider">
    <div class="age-badge">${ageRange}</div>
    <div class="accent-bar"></div>
    <div class="section-title">${subtitle || ''}</div>
  </div>`;
}

function activityPage(name, ageBadge, badgeColor, materials, steps, develops, variation, emoji) {
  const stepsHTML = steps.map(s => `<li>${s}</li>`).join('');
  return `<div class="page activity-page">
    <div class="emoji-deco">${emoji}</div>
    <div class="header">
      <h2>${name}</h2>
      <span class="badge" style="background:${badgeColor}">${ageBadge}</span>
    </div>
    <div class="materials"><strong>Materiales: </strong><span>${materials}</span></div>
    <div class="steps">
      <h3>Instrucciones paso a paso</h3>
      <ol>${stepsHTML}</ol>
    </div>
    <div class="develops"><strong>Qué desarrolla: </strong><span>${develops}</span></div>
    <div class="variations"><strong>Variaciones: </strong><span>${variation}</span></div>
  </div>`;
}

function exerciseCard(num, name, level, levelColor, materials, steps, works, duration, focus) {
  const stepsHTML = steps.map(s => `<li>${s}</li>`).join('');
  return `<div class="page exercise-card">
    <div class="card-header">
      <div class="card-number">${String(num).padStart(2, '0')}</div>
      <div class="card-title">${name}</div>
      <span class="level-badge" style="background:${levelColor}">${level}</span>
    </div>
    <div class="meta-row">
      <div class="meta-item"><strong>Materiales</strong><span>${materials}</span></div>
      <div class="meta-item"><strong>Duración</strong><span>${duration}</span></div>
    </div>
    <div class="instructions">
      <h3>Instrucciones</h3>
      <ol>${stepsHTML}</ol>
    </div>
    <div class="works"><strong>Qué trabaja: </strong><span>${works}</span></div>
    <div class="focus-box"><strong>Foco de dificultad: </strong><span>${focus}</span></div>
  </div>`;
}

// ---------------------------------------------------------------------------
// PDF 1: Cuaderno Estimulación 0-3 años
// ---------------------------------------------------------------------------
const cuaderno03Sections = [
  {
    age: '0-6 meses', badge: '0-6m', color: VERDE,
    activities: [
      { name: 'El espejo de las caras', materials: 'Espejo pequeño', steps: ['Pon el espejo frente a tu bebé a unos 20-30 cm de su cara.', 'Haz muecas exageradas: saca la lengua, abre mucho la boca.', 'Haz pedorretas y sonidos divertidos.', 'Espera unos segundos a que intente imitarte.', 'Celebra cualquier intento de imitación.'], develops: 'Imitación, motricidad orofacial', variation: 'Más fácil: solo sonríe. Más difícil: alterna gestos rápido.', emoji: '🪞' },
      { name: 'Canciones con gestos', materials: 'Ninguno', steps: ['Elige canciones como "Cinco lobitos" o "Palmas palmitas".', 'Canta con gestos exagerados y expresivos.', 'Repite siempre las mismas canciones para que las reconozca.', 'Observa si anticipa los gestos conocidos.'], develops: 'Atención auditiva, ritmo', variation: 'Más fácil: solo melodía. Más difícil: pausa para que anticipe.', emoji: '🎵' },
      { name: 'Masaje orofacial', materials: 'Dedos limpios', steps: ['Asegúrate de que tu bebé esté tranquilo y relajado.', 'Pasa suavemente tu dedo alrededor de sus labios, en círculos.', 'Masajea las mejillas suavemente con movimientos circulares.', 'Haz pequeños toques en el labio superior e inferior.', 'Nunca fuerces; solo durante la calma.'], develops: 'Sensibilidad oral, tono muscular', variation: 'Solo durante la calma, nunca forzar.', emoji: '👶' },
      { name: 'Juego del cucú', materials: 'Tela o manos', steps: ['Tapa tu cara con las manos o una tela ligera.', 'Di con voz suave: "¿Dónde está mamá/papá?"', 'Descúbrete con entusiasmo: "¡Cucú!"', 'Repite varias veces observando su reacción.', 'Varía el tiempo de espera para generar anticipación.'], develops: 'Permanencia del objeto, anticipación', variation: 'Más difícil: tapa un juguete en vez de tu cara.', emoji: '🙈' },
    ]
  },
  {
    age: '6-12 meses', badge: '6-12m', color: TERRACOTA,
    activities: [
      { name: 'Narrar el día a día', materials: 'Ninguno', steps: ['Describe en voz alta todo lo que haces durante las rutinas.', '"Ahora vamos a ponerte el pañal. Levanto las piernas."', 'Usa frases cortas y repite las palabras clave.', '"¡Qué limpio estás! Vamos a vestirnos."', 'Mantén un tono alegre y expresivo.'], develops: 'Vocabulario receptivo, prosodia', variation: 'Usa frases cortas y repite las palabras clave.', emoji: '🗣️' },
      { name: 'Señalar y nombrar', materials: 'Objetos cotidianos', steps: ['Cuando tu bebé señale algo, nómbralo inmediatamente.', '"¡Sí, es un perro! Guau guau."', 'Espera 3 segundos antes de nombrar para darle tiempo.', 'Repite el nombre del objeto 2-3 veces.', 'Añade una palabra más: "Perro grande."'], develops: 'Vocabulario, intención comunicativa', variation: 'Añade una palabra más cada vez: "Perro grande bonito."', emoji: '👆' },
      { name: 'Juego de turnos con sonidos', materials: 'Ninguno', steps: ['Cuando tu bebé haga un sonido ("ba-ba"), repítelo exactamente.', 'Espera en silencio mirándole a los ojos.', 'Si hace otro sonido, repítelo de nuevo.', 'Es una "conversación" de sonidos: respeta los turnos.', 'Añade variaciones suaves: "ba-ba... ¿ma-ma?"'], develops: 'Turnos comunicativos, balbuceo', variation: 'Añade variaciones: "ba-ba... ¿ma-ma?"', emoji: '🔄' },
      { name: 'Libros con texturas', materials: 'Libro sensorial', steps: ['Deja que tu bebé toque las texturas libremente.', 'Mientras toca, nombra cada textura: "Suave, áspero, peludo."', 'Señala las imágenes y nómbralas con entusiasmo.', 'Haz el sonido del animal al señalarlo.', 'Deja que pase las páginas a su ritmo.'], develops: 'Vocabulario, asociación palabra-objeto', variation: 'Haz el sonido del animal al señalarlo.', emoji: '📚' },
    ]
  },
  {
    age: '12-18 meses', badge: '12-18m', color: VERDE,
    activities: [
      { name: 'Ampliar lo que dice', materials: 'Ninguno', steps: ['Escucha atentamente lo que tu peque dice o intenta decir.', 'Si dice "agua", tú dices "Sí, quieres agua fría."', 'Añade siempre 1-2 palabras más a lo que dice.', 'No le pidas que repita la frase completa.', 'Sonríe y valida su comunicación.'], develops: 'Expansión lingüística, modelado', variation: 'No le pidas que repita; solo modela la frase correcta.', emoji: '💬' },
      { name: 'Juego de las opciones', materials: '2 objetos', steps: ['Muestra dos opciones claramente diferentes.', '"¿Quieres manzana o plátano?" Enseña ambos.', 'Espera a que señale o intente decir algo.', 'Nombra su elección: "¡Manzana! Buena elección."', 'Empieza con opciones muy diferentes entre sí.'], develops: 'Vocabulario, toma de decisiones', variation: 'Empieza con opciones muy diferentes.', emoji: '🍎' },
      { name: 'Meter y sacar nombrando', materials: 'Caja, objetos pequeños', steps: ['Pon objetos uno a uno en la caja nombrándolos.', '"Dentro la pelota. Dentro el coche."', 'Sácalos uno a uno: "Fuera la pelota."', 'Pide que te dé uno específico: "¿Me das el coche?"', 'Celebra cuando lo haga correctamente.'], develops: 'Vocabulario, conceptos dentro/fuera', variation: 'Pide que te dé uno específico.', emoji: '📦' },
      { name: 'Canciones con pausas', materials: 'Ninguno', steps: ['Canta una canción muy conocida y repetida.', 'Para antes de la última palabra de cada verso.', '"Estrellita dónde... (pausa)"', 'Espera a que complete la palabra.', 'Celebra cualquier intento de completar.'], develops: 'Memoria, producción verbal', variation: 'Empieza con canciones muy repetidas.', emoji: '🎶' },
    ]
  },
  {
    age: '18-24 meses', badge: '18-24m', color: TERRACOTA,
    activities: [
      { name: 'Juego simbólico narrado', materials: 'Muñeco, tazas, cucharas', steps: ['Juega a dar de comer al muñeco con tu peque.', '"El bebé tiene hambre. Vamos a darle sopa."', '"Mmm, qué rica. ¿Quiere más el bebé?"', 'Narra cada acción mientras jugáis juntos.', 'Deja que tu peque dirija el juego.'], develops: 'Lenguaje simbólico, secuencias', variation: 'Deja que tu peque dirija el juego.', emoji: '🧸' },
      { name: 'Describir láminas', materials: 'Libro con ilustraciones', steps: ['Abre un libro con ilustraciones grandes y claras.', 'Señala elementos: "¿Qué ves? Un gato."', '"¿Qué hace el gato? Duerme."', 'Haz preguntas simples señalando.', 'Empieza con "¿qué es?" antes de "¿qué hace?"'], develops: 'Vocabulario, descripción', variation: 'Empieza con "¿qué es?" antes de "¿qué hace?"', emoji: '🖼️' },
      { name: 'Clasificar objetos por categoría', materials: 'Objetos de casa', steps: ['Reúne objetos de 2 categorías diferentes.', 'Agrupa: "Los animales aquí, la comida aquí."', 'Nombra cada categoría claramente.', 'Pide que ponga uno en su sitio: "¿Dónde va el perro?"', 'Empieza con solo 2 categorías muy diferentes.'], develops: 'Categorización semántica', variation: 'Empieza con solo 2 categorías muy diferentes.', emoji: '🗂️' },
      { name: 'Juego del teléfono', materials: 'Teléfono de juguete', steps: ['Haz como que llamas por teléfono: "Ring ring."', '"¿Hola? Soy mamá. ¿Qué haces?"', 'Espera sus respuestas, aunque sean solo sonidos.', 'Responde a lo que diga como si fuera una conversación real.', 'Involucra a muñecos: "Llama al oso."'], develops: 'Turnos conversacionales, juego simbólico', variation: 'Involucra a muñecos: "Llama al oso."', emoji: '📱' },
    ]
  },
  {
    age: '2-3 años', badge: '2-3a', color: VERDE,
    activities: [
      { name: 'Cuentacuentos compartido', materials: 'Cuento ilustrado', steps: ['Elige un cuento conocido con buenas ilustraciones.', 'Lee el cuento haciendo pausas frecuentes.', 'Pregunta: "¿Qué pasó?" "¿Qué va a pasar ahora?"', 'Deja que pase las páginas a su ritmo.', 'Deja que "lea" el cuento a su manera.'], develops: 'Narrativa, comprensión, predicción', variation: 'Deja que "lea" el cuento a su manera.', emoji: '📖' },
      { name: 'Juego de las rimas', materials: 'Ninguno', steps: ['Di dos palabras: "¿Gato rima con pato? ¡Sí!"', 'Haz una palmada con cada rima encontrada.', 'Busca más: "gato, pato, plato..."', 'Turnos: uno dice una palabra, el otro busca la rima.', 'Empieza identificando rimas, luego generando.'], develops: 'Conciencia fonológica', variation: 'Empieza identificando rimas, luego generando.', emoji: '🎤' },
      { name: 'Describir secuencias', materials: '3 imágenes en orden', steps: ['Pon 3 imágenes de una acción cotidiana en orden.', 'Por ejemplo: levantarse, desayunar, ir al cole.', 'Pide que cuente qué pasa en cada imagen.', 'Ayuda con preguntas: "¿Y después qué pasa?"', 'Usa fotos reales de su rutina si es posible.'], develops: 'Narrativa secuencial, vocabulario', variation: 'Usa fotos reales de su rutina.', emoji: '🔢' },
      { name: 'Memory de sonidos', materials: 'Objetos sonoros', steps: ['Haz sonidos de animales conocidos.', 'Pide que adivine cuál es: "¿Qué animal hace muuu?"', 'Después, que haga el sonido y tú adivinas.', 'Turnos: uno hace el sonido, el otro adivina.', 'Empieza con sonidos muy diferentes entre sí.'], develops: 'Discriminación auditiva, turnos', variation: 'Empieza con sonidos muy diferentes.', emoji: '🔊' },
    ]
  },
];

function buildCuaderno03() {
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sharedCSS}</style></head><body>`;
  // Cover
  html += coverPage('Cuaderno de Estimulación del Lenguaje', '0 a 3 años', '20 actividades organizadas por edad');
  // Index
  html += `<div class="page index-page"><h2>Índice de Actividades</h2>`;
  cuaderno03Sections.forEach(s => {
    html += `<div class="index-section"><h3>${s.age}</h3><ul>`;
    s.activities.forEach(a => { html += `<li>${a.name}</li>`; });
    html += `</ul></div>`;
  });
  html += `</div>`;
  // Sections
  cuaderno03Sections.forEach(s => {
    html += sectionDivider(s.age, `Actividades para ${s.age}`);
    s.activities.forEach(a => {
      html += activityPage(a.name, s.badge, s.color, a.materials, a.steps, a.develops, a.variation, a.emoji);
    });
  });
  // Back cover
  html += backCover();
  html += `</body></html>`;
  return html;
}

// ---------------------------------------------------------------------------
// PDF 2: Cuaderno Estimulación 3-6 años
// ---------------------------------------------------------------------------
const cuaderno36Sections = [
  {
    area: 'Conciencia fonológica', badge: 'Fonología', color: VERDE,
    activities: [
      { name: 'Juego de las rimas', materials: 'Ninguno', steps: ['Di una palabra y busca rimas: "gato → pato, plato, rato."', 'Haz una palmada con cada rima encontrada.', 'Turnos: uno dice una palabra, el otro busca la rima.', 'Celebra las rimas absurdas e inventadas.', 'Más difícil: inventar rimas absurdas.'], develops: 'Conciencia fonológica', variation: 'Más difícil: inventar rimas absurdas.', emoji: '🎤' },
      { name: 'Contar sílabas con palmadas', materials: 'Ninguno', steps: ['Di una palabra dando una palmada por sílaba.', '"Ma-ri-po-sa" = 4 palmadas.', 'Pide que cuente cuántas palmadas ha dado.', 'Prueba con palabras de diferente longitud.', 'Empieza con palabras de 2 sílabas.'], develops: 'Segmentación silábica', variation: 'Empieza con palabras de 2 sílabas.', emoji: '👏' },
      { name: 'Buscar palabras que empiezan por...', materials: 'Ninguno', steps: ['"Dime cosas que empiecen por /m/: mesa, mono, moto..."', 'Haced turnos: uno dice una palabra, luego el otro.', 'El que más diga, gana.', 'Dar pista si se atasca: "Algo que usamos para comer en..."', 'Cambiad de sonido cada ronda.'], develops: 'Conciencia del fonema inicial', variation: 'Dar pista: "Algo que usamos para comer en..."', emoji: '🔤' },
      { name: 'Cadena de palabras', materials: 'Ninguno', steps: ['Explica la regla: la siguiente palabra empieza por la última sílaba.', '"Casa → saco → coche → chelo..."', 'Haced turnos alternando.', 'Permitir pistas y ayuda cuando se atasque.', 'Celebra las cadenas largas.'], develops: 'Segmentación y síntesis silábica', variation: 'Permitir pistas y ayuda.', emoji: '🔗' },
    ]
  },
  {
    area: 'Vocabulario', badge: 'Vocabulario', color: TERRACOTA,
    activities: [
      { name: 'Categorías rápidas', materials: 'Reloj o cronómetro', steps: ['"Dime animales en 30 segundos." ¡Empezamos!', 'Cuenta cada palabra que diga correctamente.', 'Luego cambia: frutas, ropa, transportes...', 'Anota el récord y trata de superarlo otro día.', 'Dar categorías más amplias para facilitar.'], develops: 'Vocabulario, acceso léxico', variation: 'Dar categorías más amplias para facilitar.', emoji: '⏱️' },
      { name: 'Adivina qué es', materials: 'Ninguno', steps: ['Describe un objeto sin decir su nombre.', '"Es grande, tiene cuatro patas y da leche."', 'El otro tiene que adivinar: "¡Una vaca!"', 'Turnos: ahora describe tú uno.', 'Empieza con objetos muy familiares.'], develops: 'Definición, descripción', variation: 'Empieza con objetos muy familiares.', emoji: '🤔' },
      { name: 'Palabras nuevas del día', materials: 'Ninguno', steps: ['Elige una palabra nueva cada día.', 'Explica su significado con ejemplos cercanos.', 'Úsala varias veces durante el día en contexto.', 'Por la noche, pregunta si la recuerda.', 'Elegir palabras útiles y cercanas a su vida.'], develops: 'Vocabulario expresivo', variation: 'Elegir palabras útiles y cercanas.', emoji: '🌟' },
      { name: 'Mapa mental de una palabra', materials: 'Papel y colores', steps: ['Escribe o dibuja una palabra en el centro del papel.', 'Alrededor, escribe o dibuja todo lo relacionado.', '"Playa → arena, agua, sol, cangrejo, toalla..."', 'Usa colores para conectar las ideas.', 'Hacerlo con dibujos si aún no escribe.'], develops: 'Redes semánticas', variation: 'Hacerlo con dibujos si no escribe.', emoji: '🧠' },
    ]
  },
  {
    area: 'Narrativa', badge: 'Narrativa', color: VERDE,
    activities: [
      { name: 'Inventar finales de cuentos', materials: 'Cuento conocido', steps: ['Lee un cuento conocido hasta casi el final.', 'Para justo antes del desenlace.', '"¿Qué crees que pasa?" Acepta todas las respuestas.', 'Valora la creatividad de sus finales.', 'Dar opciones si se atasca: "¿Se esconde o se va?"'], develops: 'Creatividad, estructura narrativa', variation: 'Dar opciones: "¿Se esconde o se va?"', emoji: '📝' },
      { name: 'Ordenar secuencias', materials: '4 imágenes desordenadas', steps: ['Pon 4 escenas desordenadas sobre la mesa.', 'Pide que las ordene: "¿Qué pasó primero?"', 'Una vez ordenadas, pide que cuente la historia.', 'Ayuda con conectores: "Primero... después... al final..."', 'Empieza con 3 imágenes si 4 es difícil.'], develops: 'Secuenciación, narrativa', variation: 'Empieza con 3 imágenes.', emoji: '🃏' },
      { name: 'Contar qué hizo hoy', materials: 'Ninguno', steps: ['Antes de dormir, pregunta: "Cuéntame 3 cosas que hiciste hoy."', 'Ayuda con preguntas: "¿Qué hiciste después de comer?"', 'Valora el orden temporal de su relato.', 'Añade detalles: "¿Y cómo te sentiste?"', 'Usar apoyos visuales como fotos del día.'], develops: 'Narrativa personal, memoria', variation: 'Usar apoyos visuales (fotos del día).', emoji: '🌙' },
      { name: 'Historia a partir de 3 imágenes', materials: '3 imágenes o fotos', steps: ['Da 3 imágenes sin relación aparente.', 'Pide que invente una historia que las conecte.', 'Valora la creatividad y la cohesión.', 'Ayuda con el inicio: "Había una vez..."', 'Empezar con imágenes que ya estén algo relacionadas.'], develops: 'Creatividad, cohesión narrativa', variation: 'Empezar con imágenes relacionadas.', emoji: '🖼️' },
    ]
  },
  {
    area: 'Articulación', badge: 'Articulación', color: TERRACOTA,
    activities: [
      { name: 'Trabalenguas suaves', materials: 'Listado impreso', steps: ['Elige un trabalenguas fácil: "Pablito clavó un clavito."', 'Repítelo tú primero despacio como modelo.', 'Pide que lo repita despacio contigo.', 'Poco a poco, aumenta la velocidad.', 'Empezar siempre muy despacio y con modelado.'], develops: 'Fluidez, precisión articulatoria', variation: 'Empezar muy despacio y con modelado.', emoji: '😜' },
      { name: 'Pares mínimos', materials: 'Tarjetas o dibujos', steps: ['Prepara pares de palabras parecidas: "pato/gato."', 'Muestra ambas imágenes o tarjetas.', 'Di una y pide que señale la correcta: "Señala pato."', 'Después, que sea quien dice la palabra.', 'Exagerar las diferencias al principio.'], develops: 'Discriminación fonológica', variation: 'Exagerar las diferencias al principio.', emoji: '👂' },
      { name: 'Repetición de pseudopalabras', materials: 'Lista preparada', steps: ['Di "palabras inventadas": "tralimón, burcapeta, sinfolante."', 'Pide que repita exactamente lo que has dicho.', 'Empieza con pseudopalabras cortas de 2 sílabas.', 'Aumenta la longitud gradualmente.', 'Celebra los intentos correctos.'], develops: 'Memoria fonológica', variation: 'Empezar con pseudopalabras de 2 sílabas.', emoji: '🔮' },
      { name: 'Praxias con espejo', materials: 'Espejo', steps: ['Poneos frente al espejo juntos.', 'Saca la lengua arriba, abajo, a los lados.', 'Infla mejillas, haz besos, chasquidos con la lengua.', 'Haced turnos: "Ahora te toca a ti."', 'Hacerlo como un juego: "El payaso hace..."'], develops: 'Motricidad orofacial', variation: 'Hacerlo como un juego: "El payaso hace..."', emoji: '🤡' },
    ]
  },
  {
    area: 'Comprensión', badge: 'Comprensión', color: VERDE,
    activities: [
      { name: 'Instrucciones de 3 pasos', materials: 'Objetos de casa', steps: ['Da instrucciones claras con 3 pasos.', '"Coge el lápiz rojo, ponlo encima del libro y da una palmada."', 'Observa si sigue los 3 pasos en orden.', 'Si falla, repite más despacio o reduce a 2 pasos.', 'Empieza con 2 pasos e incrementa.'], develops: 'Comprensión verbal, memoria secuencial', variation: 'Empieza con 2 pasos.', emoji: '📋' },
      { name: 'Absurdos verbales', materials: 'Ninguno', steps: ['Di frases absurdas: "Los peces vuelan por el cielo."', 'Pide que detecte el error: "¿Eso es verdad?"', 'Que lo corrija: "No, los peces nadan en el agua."', 'Mezcla frases absurdas con correctas.', 'Hacer las absurdas muy obvias al principio.'], develops: 'Comprensión, razonamiento', variation: 'Mezclar absurdas con correctas.', emoji: '🤪' },
      { name: 'Preguntas sobre cuentos', materials: 'Cuento', steps: ['Lee un cuento completo con atención.', 'Haz preguntas literales: "¿Quién era? ¿Qué pasó?"', 'Haz preguntas inferenciales: "¿Por qué? ¿Qué sentía?"', 'Pide que prediga: "¿Qué crees que hará después?"', 'Empezar con preguntas literales sencillas.'], develops: 'Comprensión auditiva, inferencia', variation: 'Empezar con preguntas literales.', emoji: '❓' },
      { name: 'Verdadero o falso', materials: 'Ninguno', steps: ['Di afirmaciones: "Los gatos ladran."', '"¿Verdadero o falso?"', 'Pide que justifique su respuesta: "¿Por qué?"', 'Alterna afirmaciones correctas e incorrectas.', 'Hacer las absurdas muy obvias al principio.'], develops: 'Razonamiento verbal, vocabulario', variation: 'Hacer las absurdas muy obvias al principio.', emoji: '✅' },
    ]
  },
];

function buildCuaderno36() {
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sharedCSS}</style></head><body>`;
  html += coverPage('Cuaderno de Estimulación del Lenguaje', '3 a 6 años', '20 actividades organizadas por área');
  // Index
  html += `<div class="page index-page"><h2>Índice de Actividades</h2>`;
  cuaderno36Sections.forEach(s => {
    html += `<div class="index-section"><h3>${s.area}</h3><ul>`;
    s.activities.forEach(a => { html += `<li>${a.name}</li>`; });
    html += `</ul></div>`;
  });
  html += `</div>`;
  // Sections
  cuaderno36Sections.forEach(s => {
    html += sectionDivider(s.area, `Actividades de ${s.area.toLowerCase()}`);
    s.activities.forEach(a => {
      html += activityPage(a.name, s.badge, s.color, a.materials, a.steps, a.develops, a.variation, a.emoji);
    });
  });
  html += backCover();
  html += `</body></html>`;
  return html;
}

// ---------------------------------------------------------------------------
// PDF 3: Kit de Ejercicios de Soplo
// ---------------------------------------------------------------------------
const soploExercises = [
  // Level 1 - Easy
  { num: 1, name: 'Soplar velas', level: 'Nivel 1 - Fácil', color: VERDE, materials: 'Vela, mechero', steps: ['Enciende una vela y colócala a unos 20 cm del niño/a.', 'Pide que sople para apagarla de un solo soplo.', 'Aumenta la distancia gradualmente: 30 cm, 40 cm...', 'Practica soplos suaves que solo muevan la llama sin apagar.'], works: 'Control de soplo dirigido', duration: '2 min', focus: 'Fuerza del soplo' },
  { num: 2, name: 'Pompas de jabón', level: 'Nivel 1 - Fácil', color: VERDE, materials: 'Jabón, aro', steps: ['Prepara la mezcla de jabón y moja el aro.', 'Sopla suavemente para hacer pompas grandes.', 'Si sopla demasiado fuerte, se rompen: buscar el soplo suave.', 'Intenta hacer pompas cada vez más grandes con soplo sostenido.'], works: 'Soplo suave y controlado', duration: '3 min', focus: 'Regulación de intensidad' },
  { num: 3, name: 'Soplar plumas', level: 'Nivel 1 - Fácil', color: VERDE, materials: 'Plumas o algodón', steps: ['Pon una pluma ligera sobre la mesa.', 'Sopla para moverla hacia delante.', 'Intenta llevarla hasta una "portería" hecha con dos objetos.', 'Practica controlando la dirección del soplo.'], works: 'Soplo direccional', duration: '3 min', focus: 'Dirección del soplo' },
  { num: 4, name: 'Mover bolitas de algodón', level: 'Nivel 1 - Fácil', color: VERDE, materials: 'Algodón, pajita', steps: ['Haz bolitas pequeñas de algodón.', 'Colócalas en la mesa formando una línea.', 'Sopla a través de la pajita para moverlas.', 'Intenta llevarlas todas a un recipiente.'], works: 'Soplo con instrumento', duration: '3 min', focus: 'Canalización del aire' },
  { num: 5, name: 'Silbatos y matasuegras', level: 'Nivel 1 - Fácil', color: VERDE, materials: 'Silbato o matasuegras', steps: ['Sopla el silbato con un soplo corto y fuerte.', 'Sopla el matasuegras con un soplo sostenido y continuo.', 'Alterna entre ambos para practicar diferentes patrones.', 'Haz un juego: silbato = para, matasuegras = camina.'], works: 'Soplo corto vs sostenido', duration: '2 min', focus: 'Alternancia de patrones' },
  // Level 2 - Medium
  { num: 6, name: 'Carreras de bolitas con pajita', level: 'Nivel 2 - Medio', color: TERRACOTA, materials: 'Pajita, bolita de papel', steps: ['Cada jugador tiene una bolita de papel y una pajita.', 'Marca una línea de salida y una meta en la mesa.', 'Sopla por la pajita para llevar la bolita hasta la meta.', '¡El primero en llegar gana! Mejor de 3 rondas.'], works: 'Soplo sostenido con dirección', duration: '5 min', focus: 'Resistencia de soplo' },
  { num: 7, name: 'Soplar molinillos', level: 'Nivel 2 - Medio', color: TERRACOTA, materials: 'Molinillo de viento', steps: ['Sujeta el molinillo frente al niño/a.', 'Sopla para que gire suavemente (soplo continuo).', 'Sopla fuerte para que gire rápido.', 'Practica alternando: suave-fuerte-suave.'], works: 'Regulación de intensidad', duration: '3 min', focus: 'Control de intensidad' },
  { num: 8, name: 'Pintar soplando', level: 'Nivel 2 - Medio', color: TERRACOTA, materials: 'Pajita, pintura aguada, papel', steps: ['Pon una gota de pintura aguada en el papel.', 'Sopla con la pajita para esparcir la pintura.', 'Crea formas y caminos soplando desde diferentes ángulos.', 'Usa varios colores para hacer una obra de arte.'], works: 'Soplo creativo dirigido', duration: '10 min', focus: 'Soplo con presión variable' },
  { num: 9, name: 'Soplar barquitos de papel', level: 'Nivel 2 - Medio', color: TERRACOTA, materials: 'Barco de papel, barreño con agua', steps: ['Haz un barco de papel y ponlo en el agua.', 'Sopla suavemente para moverlo por el agua.', 'Intenta llevarlo de un lado al otro del barreño.', 'Practica soplo continuo sin que se hunda.'], works: 'Soplo suave sostenido', duration: '5 min', focus: 'Constancia de soplo' },
  { num: 10, name: 'Mantener pluma en el aire', level: 'Nivel 2 - Medio', color: TERRACOTA, materials: 'Pluma', steps: ['Lanza una pluma al aire.', 'Sopla hacia arriba para mantenerla en el aire.', 'Cuenta los segundos que aguanta sin caer.', 'Intenta batir tu récord cada vez.'], works: 'Soplo vertical sostenido', duration: '3 min', focus: 'Soplo continuo vertical' },
  // Level 3 - Advanced
  { num: 11, name: 'Laberinto de soplo', level: 'Nivel 3 - Avanzado', color: CACAO, materials: 'Pajita, bolita, cartón con laberinto', steps: ['Dibuja un laberinto en cartón con bordes altos (plastilina o cartulina).', 'Coloca una bolita pequeña en la entrada.', 'Sopla con la pajita para llevar la bolita por el recorrido.', 'Intenta completar el laberinto sin salirte del camino.'], works: 'Soplo preciso y direccional', duration: '5 min', focus: 'Precisión de soplo' },
  { num: 12, name: 'Soplo direccional con vela', level: 'Nivel 3 - Avanzado', color: CACAO, materials: 'Vela, mechero', steps: ['Enciende una vela a 15 cm de distancia.', 'Sopla para que la llama se incline sin apagarse.', 'Practica controlar la fuerza: que se mueva pero no se apague.', 'Intenta inclinar la llama en diferentes direcciones.'], works: 'Control fino de intensidad', duration: '3 min', focus: 'Graduación de fuerza' },
  { num: 13, name: 'Soplo nasal', level: 'Nivel 3 - Avanzado', color: CACAO, materials: 'Espejo, pluma', steps: ['Tapa la boca con la mano o un papel.', 'Sopla solo por la nariz para mover una pluma.', 'Pon un espejito bajo la nariz para ver cómo se empaña.', 'Practica alternando: nariz derecha, nariz izquierda.'], works: 'Soplo nasal independiente', duration: '3 min', focus: 'Respiración nasal' },
  { num: 14, name: 'Soplar sin inflar mejillas', level: 'Nivel 3 - Avanzado', color: CACAO, materials: 'Espejo', steps: ['Poneos frente al espejo.', 'Sopla fuerte mirándote: las mejillas NO deben inflarse.', 'Si se inflan, para y vuelve a intentar.', 'Es un ejercicio de control del sellado labial.'], works: 'Sellado labial con soplo', duration: '3 min', focus: 'Competencia velofaríngea' },
  { num: 15, name: 'Soplo sostenido cronometrado', level: 'Nivel 3 - Avanzado', color: CACAO, materials: 'Cronómetro, pajita, agua con jabón', steps: ['Llena un vaso con agua y un poco de jabón.', 'Mete una pajita y sopla para hacer burbujas.', 'Cronometra cuánto dura el soplo continuo sin parar.', 'Anota el tiempo e intenta mejorarlo cada sesión.'], works: 'Capacidad respiratoria', duration: '3 min', focus: 'Soplo máximo' },
];

function buildKitSoplo() {
  let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sharedCSS}</style></head><body>`;
  // Cover
  html += coverPage('Kit de Ejercicios de Soplo', '15 ejercicios progresivos', 'Con materiales caseros');
  // Intro page
  html += `<div class="page intro-page">
    <h2>¿Por qué son importantes los ejercicios de soplo?</h2>
    <p>Los ejercicios de soplo son una herramienta fundamental en logopedia infantil. Ayudan a desarrollar el control del aire espirado, fortalecer la musculatura orofacial y mejorar la coordinación fono-respiratoria necesaria para el habla.</p>
    <p><strong>Beneficios principales:</strong></p>
    <ul>
      <li><strong>Fortalecen la musculatura oral:</strong> labios, mejillas y velo del paladar se tonifican con la práctica regular del soplo.</li>
      <li><strong>Mejoran el control respiratorio:</strong> aprender a regular la intensidad y duración del soplo es esencial para producir frases largas.</li>
      <li><strong>Ayudan con la articulación:</strong> fonemas fricativos como /f/, /s/, /ch/ y otros requieren un flujo de aire controlado que se entrena con estos ejercicios.</li>
      <li><strong>Desarrollan la coordinación fono-respiratoria:</strong> la sincronización entre respiración y fonación mejora significativamente.</li>
    </ul>
    <p><strong>Recomendaciones de uso:</strong></p>
    <ul>
      <li>Practica 2-3 ejercicios por sesión, no más de 10 minutos.</li>
      <li>Empieza por el Nivel 1 y avanza progresivamente.</li>
      <li>Convierte cada ejercicio en un juego divertido.</li>
      <li>Usa la tabla de seguimiento semanal para registrar el progreso.</li>
    </ul>
  </div>`;
  // Exercise cards
  soploExercises.forEach(e => {
    html += exerciseCard(e.num, e.name, e.level, e.color, e.materials, e.steps, e.works, e.duration, e.focus);
  });
  // Tracking table
  html += `<div class="page tracking-page">
    <h2>Tabla de Seguimiento Semanal</h2>
    <p style="text-align:center;font-size:12px;margin-bottom:14px;color:${CACAO};opacity:0.6;">Marca con ✓ los ejercicios realizados cada día</p>
    <table>
      <tr><th>Ejercicio</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th></tr>`;
  soploExercises.forEach(e => {
    html += `<tr><td>${e.num}. ${e.name}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
  });
  html += `</table></div>`;
  // Back cover
  html += backCover();
  html += `</body></html>`;
  return html;
}

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------
async function generatePDF(htmlContent, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    width: '794px',
    height: '1123px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(1);
  console.log(`  ✓ ${path.basename(outputPath)} → ${sizeKB} KB`);
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'downloads', 'productos');
  console.log('Generando cuadernos y kit de soplo...\n');

  await generatePDF(buildCuaderno03(), path.join(outDir, 'cuaderno-estimulacion-0-3.pdf'));
  await generatePDF(buildCuaderno36(), path.join(outDir, 'cuaderno-estimulacion-3-6.pdf'));
  await generatePDF(buildKitSoplo(), path.join(outDir, 'kit-ejercicios-soplo.pdf'));

  console.log('\n¡Listo! Todos los PDFs generados en public/downloads/productos/');
}

main().catch(err => { console.error(err); process.exit(1); });
