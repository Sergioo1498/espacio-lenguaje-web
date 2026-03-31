const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ─── Helper ───────────────────────────────────────────────────────────────────
function imageToBase64(filePath) {
  const abs = path.join(__dirname, '..', filePath);
  const data = fs.readFileSync(abs);
  const ext = path.extname(filePath).slice(1) === 'png' ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${data.toString('base64')}`;
}

const LOGO = imageToBase64('public/images/logo-chosen.png');

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  crema: '#FDF8F4',
  terracota: '#C4745A',
  verde: '#8FAE8B',
  cacao: '#3D2C2E',
  arena: '#F5E6D3',
};

// ─── Shared CSS ───────────────────────────────────────────────────────────────
const baseCSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 794px; font-family: system-ui, -apple-system, sans-serif; color: ${C.cacao}; background: ${C.crema}; }
  h1, h2, h3, h4 { font-family: Georgia, 'Times New Roman', serif; color: ${C.cacao}; }
  .page { width: 794px; min-height: 1123px; padding: 60px; position: relative; page-break-after: always; background: ${C.crema}; overflow: hidden; }
  .page:last-child { page-break-after: avoid; }

  /* Cover */
  .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .cover img.logo { width: 180px; margin-bottom: 30px; }
  .cover h1 { font-size: 38px; line-height: 1.2; margin-bottom: 16px; color: ${C.terracota}; }
  .cover p.subtitle { font-size: 18px; color: ${C.cacao}; max-width: 500px; margin-bottom: 30px; }
  .cover .badge { background: ${C.verde}; color: white; padding: 8px 24px; border-radius: 20px; font-size: 14px; font-weight: 600; }
  .cover .deco-top { position: absolute; top: 0; left: 0; width: 100%; height: 12px; background: linear-gradient(90deg, ${C.terracota}, ${C.verde}); }
  .cover .deco-bottom { position: absolute; bottom: 0; left: 0; width: 100%; height: 12px; background: linear-gradient(90deg, ${C.verde}, ${C.terracota}); }

  /* Back cover */
  .back-cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: ${C.arena}; }
  .back-cover img.logo { width: 140px; margin-bottom: 20px; }
  .back-cover h2 { font-size: 28px; color: ${C.terracota}; margin-bottom: 12px; }
  .back-cover p { font-size: 16px; max-width: 460px; line-height: 1.6; margin-bottom: 10px; }

  /* Chapter heading */
  .chapter-heading { background: ${C.arena}; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  .chapter-heading .chapter-num { font-size: 14px; text-transform: uppercase; letter-spacing: 3px; color: ${C.terracota}; margin-bottom: 10px; }
  .chapter-heading h2 { font-size: 34px; line-height: 1.2; color: ${C.cacao}; margin-bottom: 16px; }
  .chapter-heading .chapter-intro { font-size: 16px; line-height: 1.6; max-width: 580px; }
  .chapter-heading .deco { position: absolute; bottom: 60px; right: 60px; width: 80px; height: 80px; border-radius: 50%; background: ${C.verde}; opacity: .15; }

  /* Content pages */
  .content { padding-top: 50px; }
  .content h3 { font-size: 22px; color: ${C.terracota}; margin-bottom: 12px; margin-top: 22px; }
  .content h4 { font-size: 17px; color: ${C.verde}; margin-bottom: 8px; margin-top: 16px; }
  .content p, .content li { font-size: 14px; line-height: 1.65; }
  .content ul, .content ol { margin-left: 22px; margin-bottom: 10px; }
  .content li { margin-bottom: 4px; }
  .content .highlight-box { background: ${C.arena}; border-left: 4px solid ${C.terracota}; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 14px 0; font-size: 14px; line-height: 1.6; }
  .content .tip-box { background: #eaf3ea; border-left: 4px solid ${C.verde}; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 14px 0; font-size: 14px; line-height: 1.6; }
  .page-number { position: absolute; bottom: 30px; right: 60px; font-size: 11px; color: #999; }
  .page-footer { position: absolute; bottom: 30px; left: 60px; display: flex; align-items: center; gap: 8px; }
  .page-footer img { height: 22px; }
  .page-footer span { font-size: 10px; color: #999; }

  /* Tables */
  table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }
  th { background: ${C.terracota}; color: white; padding: 10px 12px; text-align: left; font-weight: 600; }
  td { padding: 9px 12px; border-bottom: 1px solid #e0d5cc; vertical-align: top; }
  tr:nth-child(even) td { background: ${C.arena}; }

  /* Checklist */
  .checklist-item { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; font-size: 13px; line-height: 1.5; }
  .checklist-item .box { width: 16px; height: 16px; border: 2px solid ${C.terracota}; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }

  /* Do / Don't */
  .do-dont { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 14px 0; }
  .do-col { background: #eaf3ea; padding: 16px; border-radius: 8px; }
  .dont-col { background: #fce8e4; padding: 16px; border-radius: 8px; }
  .do-col h4, .dont-col h4 { margin-top: 0; font-size: 16px; }
  .do-col li, .dont-col li { font-size: 13px; line-height: 1.6; margin-bottom: 4px; }

  /* Flowchart */
  .flow { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 20px 0; }
  .flow-step { background: ${C.arena}; border: 2px solid ${C.terracota}; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; text-align: center; max-width: 400px; }
  .flow-arrow { font-size: 22px; color: ${C.terracota}; line-height: 1; padding: 4px 0; }

  /* Exercise card */
  .exercise-card { background: white; border: 1px solid #e0d5cc; border-radius: 10px; padding: 16px 20px; margin-bottom: 14px; }
  .exercise-card .ex-num { display: inline-block; background: ${C.terracota}; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; font-size: 14px; margin-right: 10px; }
  .exercise-card h4 { display: inline; font-size: 16px; color: ${C.cacao}; }
  .exercise-card p { font-size: 13px; line-height: 1.6; margin-top: 8px; }

  /* Game card */
  .game-card { background: white; border: 2px solid ${C.verde}; border-radius: 12px; padding: 20px; margin-bottom: 18px; }
  .game-card .game-num { display: inline-block; background: ${C.verde}; color: white; width: 32px; height: 32px; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; font-size: 16px; margin-right: 10px; }
  .game-card h4 { display: inline; font-size: 17px; color: ${C.cacao}; }
  .game-card .game-age { display: inline-block; background: ${C.arena}; color: ${C.terracota}; font-size: 12px; padding: 2px 10px; border-radius: 10px; margin-left: 8px; font-weight: 600; }
  .game-card p { font-size: 13.5px; line-height: 1.65; margin-top: 8px; }
  .game-card .game-meta { display: flex; gap: 20px; margin-top: 10px; font-size: 12px; color: #777; }
  .game-card .game-meta strong { color: ${C.cacao}; }

  /* Printable checklist page */
  .print-page { background: white; }
  .print-page h2 { text-align: center; margin-bottom: 4px; }
  .print-page .print-subtitle { text-align: center; font-size: 14px; color: #777; margin-bottom: 18px; }
`;

// ─── Page helpers ─────────────────────────────────────────────────────────────
function footer(n) {
  return `<div class="page-footer"><img src="${LOGO}" /><span>espaciolenguaje.com</span></div><div class="page-number">${n}</div>`;
}

function coverPage(title, subtitle, badge) {
  return `<div class="page cover">
    <div class="deco-top"></div>
    <img class="logo" src="${LOGO}" />
    <h1>${title}</h1>
    <p class="subtitle">${subtitle}</p>
    ${badge ? `<div class="badge">${badge}</div>` : ''}
    <div class="deco-bottom"></div>
  </div>`;
}

function chapterPage(num, title, intro, pn) {
  return `<div class="page chapter-heading">
    <div class="chapter-num">Capítulo ${num}</div>
    <h2>${title}</h2>
    <p class="chapter-intro">${intro}</p>
    <div class="deco"></div>
    ${footer(pn)}
  </div>`;
}

function backCover() {
  return `<div class="page back-cover">
    <img class="logo" src="${LOGO}" />
    <h2>Espacio Lenguaje</h2>
    <p>Logopedia infantil especializada.<br/>Recursos, guías y acompañamiento profesional para familias y educadores.</p>
    <p style="margin-top:12px;font-weight:600;color:${C.terracota};">espaciolenguaje.com</p>
  </div>`;
}

// ─── PDF 1 – Guía Dislexia ───────────────────────────────────────────────────
function buildDislexiaHTML() {
  let pages = '';

  // Cover
  pages += coverPage(
    'Guía de Dislexia<br/>en Edad Escolar',
    'Todo lo que necesitas saber para detectar, entender y apoyar a tu hijo/a con dislexia.',
    'Guía gratuita · Espacio Lenguaje'
  );

  // TOC
  pages += `<div class="page content">
    <h2 style="color:${C.terracota};font-size:28px;margin-bottom:24px;">Índice de contenidos</h2>
    <ol style="font-size:16px;line-height:2.2;">
      <li>Qué es la dislexia</li>
      <li>Señales por edad</li>
      <li>Checklist de detección</li>
      <li>Diferencias con otros trastornos</li>
      <li>Qué hacer si sospechas</li>
      <li>Adaptaciones escolares</li>
      <li>10 ejercicios para casa</li>
      <li>Plantilla de informe para tutores</li>
      <li>Recursos y bibliografía</li>
    </ol>
    ${footer(2)}
  </div>`;

  // ── Cap 1 ──
  pages += chapterPage(1, 'Qué es la dislexia', 'Entender la dislexia es el primer paso para ayudar. En este capítulo desmontamos mitos y explicamos qué es realmente.', 3);
  pages += `<div class="page content">
    <h3>Definición</h3>
    <p>La dislexia es una <strong>dificultad específica del aprendizaje</strong> de origen neurobiológico que afecta principalmente a la lectura y la escritura. Es importante entender que la dislexia <strong>NO</strong> tiene nada que ver con la inteligencia: las personas con dislexia pueden ser tan inteligentes (o más) que cualquier otra persona.</p>
    <p style="margin-top:12px;">Se estima que la dislexia afecta entre el <strong>5% y el 10% de la población</strong>, lo que la convierte en la dificultad de aprendizaje más común. Esto significa que en un aula de 25 alumnos, es probable que al menos uno o dos presenten dislexia en algún grado.</p>

    <div class="highlight-box">
      <strong>¿Qué ocurre en el cerebro?</strong><br/>
      El cerebro de una persona con dislexia procesa el lenguaje escrito de manera diferente. Las áreas cerebrales encargadas de conectar las letras con los sonidos (conciencia fonológica) funcionan de forma distinta, lo que hace que la decodificación lectora sea más lenta y costosa.
    </div>

    <h3>Lo que la dislexia NO es</h3>
    <ul>
      <li><strong>No es pereza.</strong> Los niños con dislexia suelen esforzarse mucho más que sus compañeros para lograr los mismos resultados.</li>
      <li><strong>No es falta de inteligencia.</strong> Muchas personas brillantes y creativas tienen dislexia (Einstein, Steve Jobs, Agatha Christie).</li>
      <li><strong>No es culpa de una mala enseñanza.</strong> Aunque los métodos de enseñanza pueden ayudar, la dislexia tiene una base neurológica.</li>
      <li><strong>No se cura, pero se compensa.</strong> Con las estrategias adecuadas, una persona con dislexia puede alcanzar cualquier meta académica y profesional.</li>
      <li><strong>No es ver las letras al revés.</strong> Este es uno de los mitos más extendidos. Aunque pueden ocurrir inversiones, no son la característica definitoria de la dislexia.</li>
    </ul>

    <div class="tip-box">
      <strong>Dato importante:</strong> La dislexia tiene un fuerte componente hereditario. Si uno de los padres tiene dislexia, la probabilidad de que un hijo la tenga es del 40-60%.
    </div>

    <h3>Tipos de dislexia</h3>
    <p>Existen diferentes clasificaciones, pero las más habituales son:</p>
    <ul>
      <li><strong>Dislexia fonológica:</strong> dificultad para convertir las letras en sonidos. Les cuesta leer palabras nuevas o inventadas.</li>
      <li><strong>Dislexia superficial:</strong> dificultad para reconocer palabras de forma global. Leen letra a letra, muy lentamente.</li>
      <li><strong>Dislexia mixta:</strong> combinación de ambas dificultades. Es la más frecuente.</li>
    </ul>
    ${footer(4)}
  </div>`;

  pages += `<div class="page content">
    <h3>Fortalezas asociadas a la dislexia</h3>
    <p>Las personas con dislexia a menudo desarrollan habilidades excepcionales en otras áreas como compensación:</p>
    <ul>
      <li><strong>Pensamiento visual y espacial:</strong> excelente capacidad para pensar en imágenes y en tres dimensiones.</li>
      <li><strong>Creatividad:</strong> suelen ser muy creativos y tener ideas originales.</li>
      <li><strong>Resolución de problemas:</strong> encuentran soluciones alternativas e innovadoras.</li>
      <li><strong>Visión global:</strong> captan el panorama general mejor que los detalles aislados.</li>
      <li><strong>Empatía:</strong> al haber experimentado dificultades, suelen ser especialmente empáticos.</li>
      <li><strong>Resiliencia:</strong> aprenden a superar obstáculos desde pequeños.</li>
    </ul>

    <div class="highlight-box">
      <strong>Recuerda:</strong> Un diagnóstico de dislexia no es una sentencia, sino el primer paso para conseguir las herramientas y el apoyo adecuados. Cuanto antes se identifique, más eficaz será la intervención.
    </div>
    ${footer(5)}
  </div>`;

  // ── Cap 2 ──
  pages += chapterPage(2, 'Señales por edad', 'Las señales de dislexia varían según la etapa evolutiva. Conocerlas te permitirá actuar a tiempo.', 6);

  pages += `<div class="page content">
    <h3>Preescolar (3-5 años)</h3>
    <p>En esta etapa, las señales son sutiles pero observables. No todos los niños que muestran estas señales tendrán dislexia, pero conviene estar atentos:</p>
    <ul>
      <li><strong>Dificultad con las rimas:</strong> le cuesta encontrar palabras que rimen (gato-pato) o completar rimas conocidas.</li>
      <li><strong>Confusión de sonidos similares:</strong> confunde sonidos parecidos (p/b, t/d, f/z) al hablar.</li>
      <li><strong>Inicio tardío del habla:</strong> empezó a hablar más tarde que otros niños de su edad.</li>
      <li><strong>Dificultad para aprender las letras:</strong> le cuesta recordar el nombre o el sonido de las letras.</li>
      <li><strong>Problemas con secuencias:</strong> dificultad para recordar los días de la semana, los colores en orden, contar del 1 al 10.</li>
    </ul>

    <div class="tip-box">
      <strong>Importante:</strong> A esta edad, muchas de estas señales pueden ser parte del desarrollo normal. Se consideran señales de alerta cuando se dan varias a la vez y persisten en el tiempo.
    </div>

    <h3>Primaria (6-9 años)</h3>
    <p>Es la etapa en la que la dislexia se hace más evidente, ya que las exigencias de lectura y escritura aumentan:</p>
    <ul>
      <li><strong>Lectura lenta y laboriosa:</strong> lee mucho más despacio que sus compañeros, silabea palabras conocidas.</li>
      <li><strong>Inversión de letras:</strong> confunde b/d, p/q, escribe letras en espejo (más allá de los 7 años).</li>
      <li><strong>Evita leer en voz alta:</strong> pone excusas, se pone nervioso, dice que no le gusta leer.</li>
      <li><strong>Errores ortográficos frecuentes:</strong> omite letras, las añade, las cambia de orden ("pader" por "padre").</li>
      <li><strong>Dificultad para copiar de la pizarra:</strong> tarda mucho, pierde el punto donde estaba, comete errores.</li>
      <li><strong>Comprensión lectora pobre:</strong> puede decodificar pero no entiende lo que ha leído porque toda su energía se va en el proceso de lectura.</li>
    </ul>
    ${footer(7)}
  </div>`;

  pages += `<div class="page content">
    <h3>Secundaria (10+ años)</h3>
    <p>En los últimos cursos de primaria y en secundaria, las señales pueden haberse compensado parcialmente, pero aparecen nuevas dificultades:</p>
    <ul>
      <li><strong>Comprensión lectora insuficiente:</strong> dificultades con textos largos o complejos, necesita releer varias veces.</li>
      <li><strong>Errores ortográficos persistentes:</strong> a pesar de estudiar las reglas, sigue cometiendo faltas.</li>
      <li><strong>Escritura lenta:</strong> tarda mucho en redactar, los exámenes escritos son un reto constante.</li>
      <li><strong>Dificultad con idiomas extranjeros:</strong> especialmente con el inglés, donde la relación letra-sonido es muy irregular.</li>
      <li><strong>Evitación de tareas de lectura:</strong> prefiere vídeos, audios o que le expliquen oralmente.</li>
    </ul>

    <div class="highlight-box">
      <strong>Señales emocionales a tener en cuenta:</strong> Frustración, baja autoestima académica, ansiedad ante los exámenes, rechazo escolar, comentarios como "soy tonto" o "no puedo". Estas señales emocionales son tan importantes como las académicas.
    </div>

    <h3>¿Cuándo actuar?</h3>
    <p>La regla general es: <strong>si tienes dudas, consulta</strong>. Es mejor hacer una evaluación y que el resultado sea "desarrollo normal" que dejar pasar señales importantes. La intervención temprana (antes de los 8 años) es la más eficaz, pero <strong>nunca es tarde para empezar</strong>.</p>
    ${footer(8)}
  </div>`;

  // ── Cap 3 – Checklist ──
  pages += chapterPage(3, 'Checklist de detección', 'Una herramienta práctica para recopilar tus observaciones y compartirlas con profesionales.', 9);

  const checkItems = [
    { cat: 'Preescolar (3-5 años)', items: [
      'Le cuesta encontrar o completar rimas',
      'Confunde sonidos parecidos al hablar',
      'Empezó a hablar más tarde que otros niños',
      'Dificultad para aprender las letras del alfabeto',
      'No recuerda secuencias (días, números en orden)',
      'Dificultad para aprender canciones o retahílas',
    ]},
    { cat: 'Primaria (6-9 años)', items: [
      'Lee mucho más lento que sus compañeros',
      'Confunde letras similares (b/d, p/q) después de los 7 años',
      'Evita leer en voz alta',
      'Comete muchos errores ortográficos',
      'Le cuesta copiar de la pizarra',
      'No comprende bien lo que lee',
      'Se desorienta con izquierda/derecha',
    ]},
    { cat: 'Secundaria (10+ años)', items: [
      'Necesita releer varias veces para entender un texto',
      'Errores ortográficos persistentes',
      'Escritura muy lenta',
      'Gran dificultad con idiomas extranjeros',
      'Evita tareas que impliquen leer o escribir',
      'Baja autoestima académica o frustración frecuente',
      'Rendimiento oral muy superior al escrito',
    ]},
  ];

  let checklistHTML = '';
  for (const group of checkItems) {
    checklistHTML += `<h4 style="margin-top:14px;">${group.cat}</h4>`;
    for (const item of group.items) {
      checklistHTML += `<div class="checklist-item"><div class="box"></div><span>${item}</span></div>`;
    }
  }

  pages += `<div class="page content print-page">
    <h3 style="text-align:center;margin-bottom:4px;">Checklist de Detección de Dislexia</h3>
    <p class="print-subtitle">Marca las señales que observes. Si marcas 3+ en una franja de edad, consulta con un profesional.</p>
    ${checklistHTML}
    <div style="margin-top:20px;padding:14px;background:${C.arena};border-radius:8px;font-size:12px;">
      <strong>Nombre del niño/a:</strong> ________________________________ &nbsp;&nbsp; <strong>Edad:</strong> ________ &nbsp;&nbsp; <strong>Fecha:</strong> ________________<br/><br/>
      <strong>Observaciones:</strong> _________________________________________________________________________________
    </div>
    ${footer(10)}
  </div>`;

  // ── Cap 4 ──
  pages += chapterPage(4, 'Diferencias con otros trastornos', 'Es fácil confundir la dislexia con otras dificultades. Esta tabla comparativa te ayudará a entender las diferencias.', 11);

  pages += `<div class="page content">
    <h3>Tabla comparativa</h3>
    <table>
      <thead>
        <tr><th>Característica</th><th>Dislexia</th><th>TDAH</th><th>TEL</th><th>Dif. Gral. Aprendizaje</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Afecta a</strong></td><td>Lectura y escritura</td><td>Atención, hiperactividad, impulsividad</td><td>Lenguaje oral (comprensión y/o expresión)</td><td>Todas las áreas académicas</td></tr>
        <tr><td><strong>Señal clave</strong></td><td>Decodificación lectora lenta, errores fonológicos</td><td>No puede mantener la atención, se mueve constantemente</td><td>Habla tarde, vocabulario pobre, frases mal estructuradas</td><td>Ritmo de aprendizaje más lento en general</td></tr>
        <tr><td><strong>Inteligencia</strong></td><td>Normal o superior</td><td>Normal o superior</td><td>Normal o superior</td><td>Por debajo de la media</td></tr>
        <tr><td><strong>Quién diagnostica</strong></td><td>Neuropsicólogo, logopeda especializado</td><td>Neuropediatra, psicólogo clínico</td><td>Logopeda, neuropsicólogo</td><td>Psicólogo, equipo multidisciplinar</td></tr>
        <tr><td><strong>Edad habitual de detección</strong></td><td>6-8 años</td><td>5-7 años</td><td>3-5 años</td><td>Variable</td></tr>
        <tr><td><strong>¿Pueden coexistir?</strong></td><td colspan="4" style="text-align:center;">Sí. La comorbilidad es frecuente: un 30-40% de los niños con dislexia también presentan TDAH, y un porcentaje similar tiene dificultades de lenguaje oral asociadas.</td></tr>
      </tbody>
    </table>

    <div class="tip-box">
      <strong>¿Por qué importa diferenciar?</strong> Porque cada trastorno requiere una intervención específica. Un niño con dislexia necesita trabajo fonológico y de lectoescritura; un niño con TDAH puede necesitar medicación y estrategias de regulación; un niño con TEL necesita intervención logopédica centrada en el lenguaje oral.
    </div>

    <h3>¿Pueden darse juntos?</h3>
    <p>Sí, y de hecho es bastante habitual. Los profesionales que evalúan a tu hijo deben valorar todas las posibilidades para ofrecer un diagnóstico completo y un plan de intervención que cubra todas las necesidades.</p>
    ${footer(12)}
  </div>`;

  // ── Cap 5 ──
  pages += chapterPage(5, 'Qué hacer si sospechas', 'Una ruta clara paso a paso para pasar de la sospecha al plan de acción.', 13);

  pages += `<div class="page content">
    <h3>Ruta de actuación</h3>
    <div class="flow">
      <div class="flow-step">1. Habla con el tutor/a del colegio<br/><span style="font-weight:400;font-size:12px;">Comparte tus observaciones y pide las suyas.</span></div>
      <div class="flow-arrow">&#8595;</div>
      <div class="flow-step">2. Consulta con el pediatra<br/><span style="font-weight:400;font-size:12px;">Descarta problemas de visión o audición.</span></div>
      <div class="flow-arrow">&#8595;</div>
      <div class="flow-step">3. Evaluación por un logopeda o neuropsicólogo<br/><span style="font-weight:400;font-size:12px;">Evaluación específica de lectoescritura y procesos cognitivos.</span></div>
      <div class="flow-arrow">&#8595;</div>
      <div class="flow-step">4. Diagnóstico formal<br/><span style="font-weight:400;font-size:12px;">Informe con resultados, diagnóstico y recomendaciones.</span></div>
      <div class="flow-arrow">&#8595;</div>
      <div class="flow-step">5. Plan de intervención<br/><span style="font-weight:400;font-size:12px;">Logopedia + adaptaciones escolares + pautas para casa.</span></div>
    </div>

    <div class="highlight-box">
      <strong>¿Cuánto tarda todo el proceso?</strong> Depende del contexto, pero en general: la evaluación completa suele tardar 2-4 sesiones (1-2 semanas). Obtener el informe, 1-2 semanas más. Comenzar la intervención, lo antes posible tras el diagnóstico.
    </div>

    <h3>¿Qué llevar a la primera consulta?</h3>
    <ul>
      <li>Boletines de notas de los últimos cursos</li>
      <li>Trabajos escolares donde se observen las dificultades</li>
      <li>Informes previos (si los hay) de orientación escolar</li>
      <li>Tu checklist de observaciones (capítulo 3)</li>
      <li>Historial familiar de dificultades lectoras</li>
    </ul>
    ${footer(14)}
  </div>`;

  pages += `<div class="page content">
    <h3>¿Dónde buscar ayuda?</h3>
    <ul>
      <li><strong>Equipo de orientación del colegio:</strong> pueden hacer una valoración inicial y proponer adaptaciones.</li>
      <li><strong>Logopeda especializado en lectoescritura:</strong> es el profesional que trabajará directamente la lectura y escritura.</li>
      <li><strong>Neuropsicólogo:</strong> realizará una evaluación cognitiva completa para descartar o confirmar otros trastornos.</li>
      <li><strong>Asociaciones de dislexia:</strong> ofrecen información, apoyo y recursos (FEDIS, Dislexia sin Barreras, asociaciones autonómicas).</li>
    </ul>

    <div class="tip-box">
      <strong>Consejo:</strong> No esperes a que el colegio tome la iniciativa. Si sospechas, actúa tú. Muchas familias pierden meses o años esperando una evaluación pública. Una evaluación privada, aunque suponga un coste, puede ahorrar mucho sufrimiento.
    </div>
    ${footer(15)}
  </div>`;

  // ── Cap 6 ──
  pages += chapterPage(6, 'Adaptaciones escolares', 'Medidas que el colegio puede (y debe) implementar para que tu hijo/a pueda demostrar lo que realmente sabe.', 16);

  pages += `<div class="page content">
    <h3>Adaptaciones recomendadas</h3>
    <p>La legislación educativa contempla adaptaciones para alumnos con dificultades específicas de aprendizaje. Estas son las más importantes:</p>

    <h4>En exámenes</h4>
    <ul>
      <li><strong>Más tiempo:</strong> entre un 25% y un 50% más de tiempo en los exámenes.</li>
      <li><strong>Exámenes orales:</strong> como alternativa o complemento a los escritos.</li>
      <li><strong>Uso del ordenador:</strong> para escribir respuestas (con corrector ortográfico desactivado si se evalúa la ortografía, o activado si no).</li>
      <li><strong>Lectura en voz alta de enunciados:</strong> por el profesor o un compañero.</li>
      <li><strong>No penalizar la ortografía:</strong> en materias que no sean Lengua.</li>
    </ul>

    <h4>En el aula</h4>
    <ul>
      <li><strong>Sentarle en primera fila:</strong> más cerca de la pizarra y del profesor.</li>
      <li><strong>Fuentes recomendadas:</strong> OpenDyslexic, Verdana, Arial, tamaño 14pt mínimo, interlineado 1.5.</li>
      <li><strong>Apoyos visuales:</strong> esquemas, mapas conceptuales, imágenes que acompañen al texto.</li>
      <li><strong>Láminas de colores:</strong> leer con una lámina transparente de color encima puede ayudar.</li>
      <li><strong>Reducir la copia:</strong> proporcionarle el texto impreso en lugar de que lo copie de la pizarra.</li>
      <li><strong>Adaptar los deberes:</strong> menos cantidad, priorizar calidad sobre cantidad.</li>
    </ul>

    <div class="highlight-box">
      <strong>¿Cómo solicitarlas?</strong> Pide una reunión con el tutor y el orientador escolar. Presenta el informe diagnóstico y solicita formalmente las adaptaciones. Tienen obligación de implementarlas si hay un diagnóstico que las justifique.
    </div>
    ${footer(17)}
  </div>`;

  pages += `<div class="page content">
    <h4>Para los deberes en casa</h4>
    <ul>
      <li>Dividir las tareas en bloques cortos (15-20 minutos) con descansos.</li>
      <li>Usar audiolibros como apoyo a la lectura.</li>
      <li>Permitir que dicte sus ideas antes de escribirlas.</li>
      <li>Usar mapas mentales y esquemas visuales para estudiar.</li>
      <li>Crear un espacio de estudio tranquilo y organizado.</li>
      <li>Celebrar los avances, por pequeños que sean.</li>
    </ul>

    <h4>Tecnología de apoyo</h4>
    <ul>
      <li><strong>Text-to-speech:</strong> programas que leen el texto en voz alta (Natural Reader, @Voice).</li>
      <li><strong>Speech-to-text:</strong> dictado por voz para evitar la barrera de la escritura.</li>
      <li><strong>Audiolibros:</strong> plataformas como Audible, Storytel o la biblioteca pública digital.</li>
      <li><strong>Apps específicas:</strong> Dytective (detección), Piruletras (ejercicios), Glifing (lectura).</li>
    </ul>

    <div class="tip-box">
      <strong>Recuerda:</strong> Las adaptaciones no son un privilegio, son un derecho. Un niño con dislexia que no tiene adaptaciones es como un niño con miopía al que le quitan las gafas: no puede rendir según su verdadero potencial.
    </div>
    ${footer(18)}
  </div>`;

  // ── Cap 7 ──
  pages += chapterPage(7, '10 ejercicios para casa', 'Actividades que puedes hacer en familia para reforzar la lectoescritura de forma lúdica y sin presión.', 19);

  const exercises = [
    { n: 1, title: 'Lectura compartida', desc: 'Dedica 10 minutos al día a leer juntos, por turnos. Tú lees una página, él/ella lee la siguiente. Si se atasca, le ayudas sin reprochar. Lo importante es que sea un momento agradable.' },
    { n: 2, title: 'Juego de rimas', desc: 'Decid palabras y buscad rimas: "gato → pato → plato → rato". Podéis hacerlo en el coche, paseando o en la cena. Fortalece la conciencia fonológica, que es la base de la lectura.' },
    { n: 3, title: 'Deletreo multisensorial', desc: 'Escribe letras o palabras en bandejas con arena, arroz o sal. También podéis escribir con el dedo en la espalda y adivinar. Cuantos más sentidos impliquemos, mejor se fija el aprendizaje.' },
    { n: 4, title: 'Lectura en voz alta con modelado', desc: 'Tú lees un párrafo en voz alta, señalando las palabras. Luego él/ella lee el mismo párrafo. El modelado le da seguridad y le muestra cómo suena una lectura fluida.' },
    { n: 5, title: 'Sopas de letras', desc: 'Buscar palabras en sopas de letras trabaja el reconocimiento visual de las palabras. Empieza con sopas sencillas y aumenta la dificultad gradualmente.' },
  ];
  const exercises2 = [
    { n: 6, title: 'Dictado adaptado', desc: 'Dicta frases cortas (3-5 palabras) que el niño ya conoce. El objetivo es que tenga éxito, no que falle. Mejor 5 palabras bien escritas que 20 con errores.' },
    { n: 7, title: 'Lectura con regla o ventana', desc: 'Tapa las líneas de arriba y abajo con una regla o un papel con una ranura. Así se centra en una sola línea y no se pierde. Reduce la fatiga visual y mejora la concentración.' },
    { n: 8, title: 'Ordenar letras magnéticas', desc: 'Usa letras magnéticas para formar palabras en la nevera. Cambia una letra y que el niño lea la nueva palabra: "casa → masa → mesa". Trabaja la manipulación fonológica.' },
    { n: 9, title: 'Asociar palabra-imagen', desc: 'Crea tarjetas con una palabra por un lado y un dibujo por otro. El niño lee la palabra y la asocia con la imagen. Es un método de lectura global que complementa al fonológico.' },
    { n: 10, title: 'Diario creativo', desc: 'Anímale a escribir un diario donde cuente lo que quiera: su día, un sueño, una historia inventada. La regla: nunca se corrige. El objetivo es que disfrute escribiendo sin miedo a equivocarse.' },
  ];

  let exHTML1 = '';
  for (const e of exercises) {
    exHTML1 += `<div class="exercise-card"><span class="ex-num">${e.n}</span><h4>${e.title}</h4><p>${e.desc}</p></div>`;
  }
  let exHTML2 = '';
  for (const e of exercises2) {
    exHTML2 += `<div class="exercise-card"><span class="ex-num">${e.n}</span><h4>${e.title}</h4><p>${e.desc}</p></div>`;
  }

  pages += `<div class="page content">${exHTML1}${footer(20)}</div>`;
  pages += `<div class="page content">${exHTML2}${footer(21)}</div>`;

  pages += `<div class="page content">
    <h3>Consejos generales para los ejercicios</h3>
    <div class="tip-box">
      <ul>
        <li><strong>Poco y a menudo:</strong> mejor 10 minutos al día que una hora los domingos.</li>
        <li><strong>Sin presión:</strong> si el niño está cansado o frustrado, parad. No es un castigo.</li>
        <li><strong>Celebra el esfuerzo:</strong> no el resultado. "Me encanta lo que te has esforzado" vale más que "muy bien".</li>
        <li><strong>Varía las actividades:</strong> la monotonía mata la motivación.</li>
        <li><strong>Hazlo divertido:</strong> si parece deberes, no funcionará. Si parece un juego, sí.</li>
        <li><strong>Sé paciente:</strong> los avances son lentos pero reales. Compara con él mismo, nunca con otros.</li>
      </ul>
    </div>
    ${footer(22)}
  </div>`;

  // ── Cap 8 – Plantilla ──
  pages += chapterPage(8, 'Plantilla de informe para tutores', 'Un documento que puedes imprimir y entregar al tutor para facilitar la comunicación y la solicitud de adaptaciones.', 23);

  pages += `<div class="page content print-page" style="padding:40px 50px;">
    <h3 style="text-align:center;margin-bottom:4px;">Informe de Observaciones para el Tutor/a</h3>
    <p class="print-subtitle" style="margin-bottom:14px;">Rellenar y entregar al tutor junto con el informe diagnóstico</p>

    <div style="border:1px solid #ccc;padding:14px;border-radius:8px;margin-bottom:14px;font-size:13px;line-height:2;">
      <strong>Nombre del alumno/a:</strong> ____________________________________________<br/>
      <strong>Curso:</strong> ______________  <strong>Fecha:</strong> ______________  <strong>Centro:</strong> ________________________________<br/>
      <strong>Diagnóstico:</strong> ____________________________________________<br/>
      <strong>Profesional que diagnostica:</strong> ____________________________________________<br/>
      <strong>Fecha del diagnóstico:</strong> ______________
    </div>

    <h4 style="margin-bottom:6px;">Dificultades observadas (marcar las que apliquen):</h4>
    <div style="column-count:2;font-size:12px;margin-bottom:14px;">
      ${['Lectura lenta','Errores ortográficos frecuentes','Dificultad de comprensión lectora','Inversión de letras','Dificultad para copiar','Escritura lenta','Baja autoestima académica','Evitación de tareas de lectura','Dificultad con idiomas extranjeros','Otros: _______________'].map(i => `<div class="checklist-item"><div class="box"></div><span>${i}</span></div>`).join('')}
    </div>

    <h4 style="margin-bottom:6px;">Adaptaciones solicitadas:</h4>
    <div style="column-count:2;font-size:12px;margin-bottom:14px;">
      ${['Más tiempo en exámenes','Exámenes orales','Uso de ordenador','No penalizar ortografía','Material impreso (no copiar)','Fuente adaptada (tamaño 14+)','Sentarse en primera fila','Reducción de deberes','Lectura de enunciados en voz alta','Otras: _______________'].map(i => `<div class="checklist-item"><div class="box"></div><span>${i}</span></div>`).join('')}
    </div>

    <div style="margin-top:20px;font-size:13px;line-height:2.2;border-top:1px solid #ccc;padding-top:14px;">
      <strong>Firma del padre/madre/tutor legal:</strong> _________________________ &nbsp;&nbsp; <strong>Fecha:</strong> ______________<br/>
      <strong>Firma del tutor/a:</strong> _________________________ &nbsp;&nbsp; <strong>Fecha:</strong> ______________<br/>
      <strong>Firma del orientador/a:</strong> _________________________ &nbsp;&nbsp; <strong>Fecha:</strong> ______________
    </div>
    ${footer(24)}
  </div>`;

  // ── Cap 9 ──
  pages += chapterPage(9, 'Recursos y bibliografía', 'Lecturas, webs y materiales recomendados para seguir aprendiendo.', 25);

  pages += `<div class="page content">
    <h3>Libros recomendados</h3>
    <ul>
      <li><em>"El don de la dislexia"</em> – Ronald D. Davis. Una visión positiva y esperanzadora.</li>
      <li><em>"Dislexia: una comprensión de los trastornos de aprendizaje"</em> – Uta Frith. Una referencia científica fundamental.</li>
      <li><em>"Superando la dislexia"</em> – Sally Shaywitz. La guía más completa en castellano.</li>
      <li><em>"Mi hijo no es un problema, tiene un problema"</em> – Amanda Morin. Práctico y empático.</li>
    </ul>

    <h3>Webs y asociaciones</h3>
    <ul>
      <li><strong>FEDIS</strong> (Federación Española de Dislexia): fedis.org</li>
      <li><strong>Dislexia sin Barreras:</strong> dislexiasinbarreras.com</li>
      <li><strong>Understood.org:</strong> recursos en inglés y español sobre dificultades de aprendizaje.</li>
      <li><strong>Orientación Andújar:</strong> orientacionandujar.es – materiales gratuitos descargables.</li>
    </ul>

    <h3>Apps y herramientas</h3>
    <ul>
      <li><strong>Dytective:</strong> test de detección y ejercicios personalizados (Change Dyslexia).</li>
      <li><strong>Piruletras:</strong> app de ejercicios de ortografía para niños con dislexia.</li>
      <li><strong>Glifing:</strong> método de entrenamiento lector con base científica.</li>
      <li><strong>Natural Reader:</strong> text-to-speech gratuito para leer textos en voz alta.</li>
    </ul>

    <h3>Referencias científicas</h3>
    <ul>
      <li>Shaywitz, S. E. (2003). <em>Overcoming Dyslexia</em>. Vintage Books.</li>
      <li>Cuetos, F. (2010). <em>Psicología de la lectura</em>. Wolters Kluwer.</li>
      <li>Snowling, M. J., & Hulme, C. (2012). <em>The Science of Reading</em>. Blackwell.</li>
      <li>Serrano, F., & Defior, S. (2008). Dyslexia speed problems in a transparent orthography. <em>Annals of Dyslexia</em>, 58(1), 81-95.</li>
    </ul>
    ${footer(26)}
  </div>`;

  // Extra content pages to exceed 30
  pages += `<div class="page content">
    <h3>Preguntas frecuentes</h3>
    <h4>¿La dislexia se cura?</h4>
    <p>No se "cura" en el sentido tradicional, porque no es una enfermedad. Es una forma diferente de procesar el lenguaje escrito. Sin embargo, con intervención adecuada, las personas con dislexia aprenden estrategias compensatorias que les permiten leer y escribir con eficacia. Muchos adultos con dislexia alcanzan niveles académicos y profesionales excelentes.</p>

    <h4>¿A qué edad se puede diagnosticar?</h4>
    <p>El diagnóstico formal suele hacerse a partir de los 6-7 años, cuando el aprendizaje de la lectura está en marcha. Sin embargo, se pueden detectar señales de riesgo desde los 4-5 años, y una intervención preventiva en preescolar puede marcar una gran diferencia.</p>

    <h4>¿Es hereditaria?</h4>
    <p>Sí, tiene un fuerte componente genético. Si un padre o madre tiene dislexia, hay entre un 40% y un 60% de probabilidades de que sus hijos la tengan. Si hay antecedentes familiares, conviene estar especialmente atentos.</p>

    <h4>¿Los niños con dislexia son más creativos?</h4>
    <p>Hay evidencia de que muchas personas con dislexia desarrollan habilidades excepcionales en pensamiento visual, creatividad y resolución de problemas. Esto no significa que todos los niños con dislexia sean artistas, pero sí que su forma diferente de pensar puede ser una ventaja en muchos campos.</p>

    <h4>¿Las gafas de colores ayudan?</h4>
    <p>Algunas personas experimentan una mejora al leer con láminas o gafas de colores (especialmente azul o amarillo). Esto se conoce como síndrome de Irlen o estrés visual. No es un tratamiento para la dislexia, pero puede ser un complemento útil si ayuda a reducir la fatiga visual.</p>

    <h4>¿Mi hijo podrá ir a la universidad?</h4>
    <p>Absolutamente sí. Las universidades tienen servicios de atención a la diversidad que ofrecen adaptaciones para estudiantes con dislexia. Muchos profesionales exitosos tienen dislexia. La clave está en la intervención temprana, las estrategias compensatorias y, sobre todo, no permitir que la dislexia defina los límites de lo que tu hijo puede conseguir.</p>
    ${footer(27)}
  </div>`;

  pages += `<div class="page content">
    <h3>Carta a los padres y madres</h3>
    <div class="highlight-box" style="font-size:15px;line-height:1.8;">
      <p>Si estás leyendo esta guía, es porque sospechas que tu hijo o hija puede tener dislexia, o porque ya tiene un diagnóstico y quieres entender mejor cómo ayudarle.</p>
      <p style="margin-top:10px;">Queremos que sepas que <strong>no estás solo/a</strong>. Miles de familias pasan por lo mismo, y con la información y el apoyo adecuados, el camino se hace mucho más llevadero.</p>
      <p style="margin-top:10px;">Tu hijo/a tiene muchas fortalezas. La dislexia es solo una pieza más de su forma de ser, no le define. Con paciencia, comprensión y las herramientas correctas, puede conseguir todo lo que se proponga.</p>
      <p style="margin-top:10px;">Si necesitas orientación profesional, en <strong>Espacio Lenguaje</strong> estamos a tu disposición. Ofrecemos evaluación, intervención y acompañamiento a familias.</p>
      <p style="margin-top:10px;font-weight:600;color:${C.terracota};">El primer paso es el más importante, y ya lo has dado: informarte.</p>
    </div>

    <div style="text-align:center;margin-top:40px;">
      <img src="${LOGO}" style="width:120px;margin-bottom:14px;" /><br/>
      <span style="font-size:16px;font-weight:600;color:${C.terracota};">espaciolenguaje.com</span><br/>
      <span style="font-size:13px;color:#888;">Logopedia infantil especializada</span>
    </div>
    ${footer(28)}
  </div>`;

  pages += `<div class="page content">
    <h3>Glosario de términos</h3>
    <table>
      <thead><tr><th>Término</th><th>Definición</th></tr></thead>
      <tbody>
        <tr><td><strong>Conciencia fonológica</strong></td><td>Capacidad de identificar y manipular los sonidos del lenguaje hablado. Es la habilidad más importante para aprender a leer.</td></tr>
        <tr><td><strong>Decodificación</strong></td><td>Proceso de convertir las letras escritas en sonidos y palabras. En la dislexia, este proceso es lento y costoso.</td></tr>
        <tr><td><strong>Dificultad específica de aprendizaje (DEA)</strong></td><td>Trastorno que afecta a un área concreta del aprendizaje (lectura, escritura, cálculo) sin afectar a la inteligencia general.</td></tr>
        <tr><td><strong>Disgrafía</strong></td><td>Dificultad específica para la escritura. Puede coexistir con la dislexia.</td></tr>
        <tr><td><strong>Disortografía</strong></td><td>Dificultad específica para la ortografía. Es muy frecuente en la dislexia.</td></tr>
        <tr><td><strong>Lectura global</strong></td><td>Reconocer palabras enteras "de un vistazo", sin decodificar letra a letra. Los lectores expertos usan mayoritariamente esta ruta.</td></tr>
        <tr><td><strong>Lectura fonológica</strong></td><td>Leer convirtiendo cada letra en su sonido correspondiente. Es la ruta que usamos con palabras nuevas o desconocidas.</td></tr>
        <tr><td><strong>Neuropsicólogo</strong></td><td>Profesional especializado en la relación entre el cerebro y el comportamiento. Realiza evaluaciones cognitivas completas.</td></tr>
        <tr><td><strong>TDAH</strong></td><td>Trastorno por Déficit de Atención e Hiperactividad. Puede coexistir con la dislexia.</td></tr>
        <tr><td><strong>TEL</strong></td><td>Trastorno Específico del Lenguaje. Afecta al lenguaje oral (comprensión y/o expresión).</td></tr>
      </tbody>
    </table>
    ${footer(29)}
  </div>`;

  pages += `<div class="page content">
    <h3>Notas personales</h3>
    <p style="color:#999;margin-bottom:20px;">Utiliza esta página para anotar tus observaciones, preguntas para el profesional o cualquier idea que quieras recordar.</p>
    ${Array(18).fill('<div style="border-bottom:1px solid #e0d5cc;height:38px;"></div>').join('')}
    ${footer(30)}
  </div>`;

  // Back cover
  pages += backCover();

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${baseCSS}</style></head><body>${pages}</body></html>`;
}

// ─── PDF 2 – Guía Tartamudez ─────────────────────────────────────────────────
function buildTartamudezHTML() {
  let pages = '';

  pages += coverPage(
    'Guía de Tartamudez<br/>Infantil',
    'Comprende, acompaña y ayuda a tu hijo/a. Todo lo que necesitas saber sobre la tartamudez en la infancia.',
    'Guía gratuita · Espacio Lenguaje'
  );

  // TOC
  pages += `<div class="page content">
    <h2 style="color:${C.terracota};font-size:28px;margin-bottom:24px;">Índice de contenidos</h2>
    <ol style="font-size:16px;line-height:2.2;">
      <li>Qué es la tartamudez</li>
      <li>Evolutiva vs que necesita intervención</li>
      <li>Factores de riesgo</li>
      <li>Qué hacer y qué NO hacer</li>
      <li>Ejercicios de fluidez para casa</li>
      <li>Sección para profesores</li>
      <li>Cuándo consultar</li>
      <li>Recursos y bibliografía</li>
    </ol>
    ${footer(2)}
  </div>`;

  // Cap 1
  pages += chapterPage(1, 'Qué es la tartamudez', 'La tartamudez es mucho más que "trabarse al hablar". Vamos a entender qué ocurre realmente.', 3);

  pages += `<div class="page content">
    <h3>Definición</h3>
    <p>La tartamudez (o disfemia) es un <strong>trastorno de la fluidez del habla</strong> que se caracteriza por interrupciones involuntarias en el flujo del discurso. Estas interrupciones pueden adoptar diferentes formas según el tipo de tartamudez.</p>

    <h3>Tipos de tartamudez</h3>
    <table>
      <thead><tr><th>Tipo</th><th>Qué ocurre</th><th>Ejemplo</th></tr></thead>
      <tbody>
        <tr><td><strong>Clónica</strong></td><td>Repeticiones de sonidos, sílabas o palabras</td><td>"Pe-pe-pe-pero yo quiero ir"</td></tr>
        <tr><td><strong>Tónica</strong></td><td>Bloqueos: el sonido no sale, hay tensión muscular</td><td>"...........Pero yo quiero ir" (silencio tenso antes)</td></tr>
        <tr><td><strong>Mixta</strong></td><td>Combinación de repeticiones y bloqueos</td><td>"Pe-pe-...........pero yo quiero ir"</td></tr>
      </tbody>
    </table>

    <h3>Datos clave</h3>
    <ul>
      <li>Afecta aproximadamente al <strong>5% de los niños</strong> en algún momento de su desarrollo.</li>
      <li>Solo el <strong>1% de la población</strong> mantiene la tartamudez en la edad adulta.</li>
      <li>Es más frecuente en <strong>niños que en niñas</strong> (proporción 3:1 a 4:1).</li>
      <li>Suele aparecer entre los <strong>2 y los 5 años</strong>, coincidiendo con la explosión del lenguaje.</li>
      <li>No está causada por nerviosismo, timidez ni problemas emocionales (aunque estos pueden empeorarla).</li>
    </ul>

    <div class="highlight-box">
      <strong>Disfluencia normal vs. tartamudez:</strong> Todos los niños (y adultos) tienen momentos de disfluencia: repetir una palabra, decir "eh...", empezar y parar una frase. Esto es completamente normal. La diferencia con la tartamudez es la frecuencia, la tensión asociada y la duración.
    </div>
    ${footer(4)}
  </div>`;

  pages += `<div class="page content">
    <h3>¿Qué pasa en el cerebro?</h3>
    <p>Investigaciones con neuroimagen han mostrado que las personas que tartamudean presentan diferencias en las conexiones cerebrales entre las áreas encargadas de planificar el habla y las que la ejecutan. Es como si la "autopista" entre el pensamiento y el movimiento de los músculos del habla tuviera un tramo en obras.</p>

    <h3>Mitos sobre la tartamudez</h3>
    <ul>
      <li><strong>"Tartamudea porque es nervioso":</strong> Falso. La tartamudez tiene una base neurológica. El nerviosismo puede empeorarla, pero no la causa.</li>
      <li><strong>"Si le digo que respire y hable despacio, se le pasará":</strong> Falso. Estas instrucciones aumentan la ansiedad y empeoran la tartamudez.</li>
      <li><strong>"Es por un susto o un trauma":</strong> Falso. Aunque el estrés puede ser un desencadenante, la tartamudez tiene una base genética y neurológica.</li>
      <li><strong>"Se le pasará solo":</strong> A veces sí (muchos niños superan la disfluencia evolutiva), pero no siempre. Si persiste más de 6 meses, conviene consultar.</li>
      <li><strong>"Los niños que tartamudean son menos inteligentes":</strong> Completamente falso. La tartamudez no tiene ninguna relación con la inteligencia.</li>
    </ul>

    <div class="tip-box">
      <strong>Dato importante:</strong> La tartamudez tiene un componente genético significativo. Si hay antecedentes familiares, la probabilidad de que un niño tartamudee es mayor, y también es menor la probabilidad de que se resuelva espontáneamente.
    </div>
    ${footer(5)}
  </div>`;

  // Cap 2
  pages += chapterPage(2, 'Evolutiva vs que necesita intervención', 'No toda disfluencia es tartamudez. Aprende a distinguir cuándo es parte del desarrollo normal y cuándo conviene actuar.', 6);

  pages += `<div class="page content">
    <h3>Tabla comparativa</h3>
    <table>
      <thead><tr><th>Aspecto</th><th>Disfluencia evolutiva</th><th>Tartamudez que necesita intervención</th></tr></thead>
      <tbody>
        <tr><td><strong>Edad</strong></td><td>2-5 años (lo más habitual)</td><td>Cualquier edad</td></tr>
        <tr><td><strong>Tipo de repetición</strong></td><td>Palabras o sílabas enteras ("yo-yo-yo quiero")</td><td>Sonidos aislados ("y-y-y-yo quiero")</td></tr>
        <tr><td><strong>Tensión</strong></td><td>No se observa tensión muscular</td><td>Tensión visible en cara, cuello o cuerpo</td></tr>
        <tr><td><strong>Conciencia</strong></td><td>El niño no se da cuenta</td><td>El niño es consciente, se frustra</td></tr>
        <tr><td><strong>Duración</strong></td><td>Menos de 6 meses</td><td>Más de 6 meses</td></tr>
        <tr><td><strong>Conductas secundarias</strong></td><td>No hay</td><td>Parpadeo, movimientos de cabeza, evitación de palabras</td></tr>
        <tr><td><strong>Evolución</strong></td><td>Va y viene, mejora con el tiempo</td><td>Se mantiene o empeora</td></tr>
        <tr><td><strong>Reacción emocional</strong></td><td>No hay o es leve</td><td>Ansiedad, vergüenza, evita hablar</td></tr>
      </tbody>
    </table>

    <div class="highlight-box">
      <strong>Regla orientativa:</strong> Si la disfluencia dura más de 6 meses, si observas tensión o lucha al hablar, si el niño evita situaciones de comunicación, o si hay antecedentes familiares de tartamudez, consulta con un logopeda. Mejor consultar de más que de menos.
    </div>
    ${footer(7)}
  </div>`;

  pages += `<div class="page content">
    <h3>Las conductas secundarias: una señal de alarma</h3>
    <p>Las conductas secundarias son movimientos o estrategias que el niño desarrolla de forma involuntaria para intentar "salir" del bloqueo. Son una señal clara de que la tartamudez le está afectando:</p>
    <ul>
      <li><strong>Parpadeo rápido o cierre de ojos</strong> durante los bloqueos.</li>
      <li><strong>Movimientos de cabeza</strong> (hacia atrás, hacia los lados) para "empujar" la palabra.</li>
      <li><strong>Tensión en labios, mandíbula o cuello</strong> visible al hablar.</li>
      <li><strong>Cambio de palabras:</strong> sustituye la palabra que le bloquea por otra diferente.</li>
      <li><strong>Evitación:</strong> deja de hablar, responde con monosílabos, no participa en clase.</li>
      <li><strong>Muletillas:</strong> usa "pues", "eh", "o sea" para tomar impulso antes de la palabra difícil.</li>
    </ul>
    <p style="margin-top:12px;">Si observas alguna de estas conductas, es importante consultar con un logopeda especializado en fluidez. Las conductas secundarias indican que la tartamudez está consolidándose y que el niño está sufriendo.</p>
    ${footer(8)}
  </div>`;

  // Cap 3
  pages += chapterPage(3, 'Factores de riesgo', 'Conocer los factores de riesgo ayuda a decidir si conviene esperar o actuar.', 9);

  pages += `<div class="page content">
    <h3>Factores que aumentan el riesgo de persistencia</h3>
    <p>No todos los niños que empiezan a tartamudear mantendrán la tartamudez. Los siguientes factores hacen más probable que la disfluencia persista:</p>

    <div class="exercise-card">
      <span class="ex-num">1</span><h4>Antecedentes familiares</h4>
      <p>Si algún familiar (padres, abuelos, tíos) tartamudea o tartamudeó de niño y no se resolvió, el riesgo de persistencia aumenta significativamente.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">2</span><h4>Sexo masculino</h4>
      <p>Los niños tienen 3-4 veces más probabilidades que las niñas de tartamudear, y también menos probabilidades de recuperación espontánea.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">3</span><h4>Duración mayor de 6 meses</h4>
      <p>Cuanto más tiempo lleve el niño tartamudeando, menor es la probabilidad de resolución espontánea.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">4</span><h4>Inicio después de los 3 años y medio</h4>
      <p>Un inicio más tardío se asocia con mayor riesgo de persistencia.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">5</span><h4>Otras dificultades del habla o lenguaje</h4>
      <p>Si el niño también tiene dificultades articulatorias o de lenguaje, el riesgo de persistencia aumenta.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">6</span><h4>Severidad creciente</h4>
      <p>Si la tartamudez va a más en lugar de a menos, es una señal clara de que conviene intervenir.</p>
    </div>

    <div class="tip-box">
      <strong>Importante:</strong> Estos factores son orientativos. Un niño puede no tener ningún factor de riesgo y necesitar intervención, o tener varios y resolverlo solo. En caso de duda, consulta siempre.
    </div>
    ${footer(10)}
  </div>`;

  // Cap 4
  pages += chapterPage(4, 'Qué hacer y qué NO hacer', 'El entorno familiar tiene un papel fundamental. Tu forma de reaccionar puede ayudar enormemente o, sin querer, empeorar la situación.', 11);

  pages += `<div class="page content">
    <div class="do-dont">
      <div class="do-col">
        <h4 style="color:${C.verde};">&#10003; SÍ hacer</h4>
        <ul>
          <li><strong>Mantén el contacto visual</strong> mientras habla. Que sienta que le escuchas con interés.</li>
          <li><strong>Escucha con paciencia</strong>, sin prisa. Deja que termine a su ritmo.</li>
          <li><strong>Habla tú despacio</strong>. Modela un ritmo de habla tranquilo (sin exagerar).</li>
          <li><strong>Dale tiempo</strong> para terminar. No interrumpas ni completes sus frases.</li>
          <li><strong>Haz preguntas sencillas</strong> (sí/no, opciones) para reducir la presión.</li>
          <li><strong>Valora lo que dice</strong>, no cómo lo dice. "Qué historia tan interesante".</li>
          <li><strong>Crea un ambiente tranquilo</strong> para hablar: sin ruido, sin prisas, sin interrupciones.</li>
        </ul>
      </div>
      <div class="dont-col">
        <h4 style="color:${C.terracota};">&#10007; NO hacer</h4>
        <ul>
          <li><strong>No le digas "habla despacio"</strong> o "piensa antes de hablar". Aumenta la ansiedad.</li>
          <li><strong>No termines sus frases</strong>. Aunque creas que le ayudas, le frustra.</li>
          <li><strong>No apartes la mirada</strong>. Si miras a otro lado, siente que es un problema.</li>
          <li><strong>No muestres impaciencia</strong>. Nada de suspirar, mirar el reloj o fruncir el ceño.</li>
          <li><strong>No le hagas repetir</strong>. "Dilo otra vez bien" es contraproducente.</li>
          <li><strong>No le pongas en evidencia</strong>. Nunca le obligues a hablar en situaciones que le generan ansiedad.</li>
          <li><strong>No hables de la tartamudez negativamente</strong> delante de él ni con otros cuando pueda oír.</li>
        </ul>
      </div>
    </div>

    <div class="highlight-box">
      <strong>La regla de oro:</strong> Lo más importante que puedes hacer es que tu hijo sienta que lo que dice importa más que cómo lo dice. Si se siente escuchado y aceptado, la presión comunicativa disminuye, y con ella, la tartamudez.
    </div>
    ${footer(12)}
  </div>`;

  pages += `<div class="page content">
    <h3>Hablar de la tartamudez con tu hijo</h3>
    <p>Muchos padres evitan hablar de la tartamudez por miedo a empeorarla. Pero si el niño ya es consciente, no hablar de ello le transmite que es algo vergonzoso o que hay que esconder.</p>
    <ul>
      <li><strong>Si él lo saca:</strong> "A veces las palabras se atascan, ¿verdad? A mucha gente le pasa. No pasa nada."</li>
      <li><strong>Normaliza:</strong> "A mí también me pasa a veces que no me salen las palabras, sobre todo cuando estoy cansado/a."</li>
      <li><strong>Empodera:</strong> "Tu cerebro tiene tantas ideas que a veces la boca no va tan rápido. Eso es porque eres muy listo/a."</li>
    </ul>

    <div class="tip-box">
      <strong>Consejo práctico:</strong> Crea un "momento de hablar" diario: 10 minutos antes de dormir, sin pantallas, sin prisas, donde cada uno cuente algo de su día. Un espacio seguro para comunicarse sin presión.
    </div>

    <h3>¿Y los hermanos?</h3>
    <p>Si hay hermanos, explícales de forma adaptada a su edad que a veces las palabras se atascan y que hay que tener paciencia. No permitas burlas ni imitaciones. Involúcralos como aliados: "Cuando tu hermano/a esté hablando, le esperamos, ¿vale?"</p>
    ${footer(13)}
  </div>`;

  // Cap 5
  pages += chapterPage(5, 'Ejercicios de fluidez para casa', 'Actividades sencillas que podéis hacer en familia para practicar un habla más fluida sin presión.', 14);

  const fluencyEx = [
    { n: 1, title: 'Habla rítmica', desc: 'Hablar siguiendo un ritmo suave, como si cantaras. Podéis dar palmadas suaves mientras habláis, siguiendo el ritmo de las sílabas. El ritmo externo ayuda al cerebro a organizar la secuencia del habla. Practicad con frases cortas y conocidas.' },
    { n: 2, title: 'Lectura en coro', desc: 'Leed juntos, al mismo tiempo, el mismo texto. Cuando hablamos al unísono con otra persona, la tartamudez prácticamente desaparece. Esto le da confianza y la experiencia de hablar sin bloqueos.' },
    { n: 3, title: 'Canto', desc: 'Cantad canciones juntos. La tartamudez casi nunca aparece al cantar, porque el canto utiliza circuitos cerebrales diferentes al habla. Además de ser terapéutico, es divertido y crea momentos de conexión familiar.' },
    { n: 4, title: 'Respiración diafragmática', desc: 'Poned la mano en la barriga. Inspirad profundamente por la nariz (la barriga se hincha) y soltad el aire despacio por la boca. Practicad varias veces antes de hablar. Una buena respiración es la base de un habla fluida.' },
  ];
  const fluencyEx2 = [
    { n: 5, title: 'Habla prolongada', desc: 'Estirad las vocales al hablar: "Eeeeso eeees uuun gaaato muuuy boooniiiito". Al principio suena exagerado, pero ayuda al cerebro a mantener la continuidad del habla sin bloqueos. Id reduciendo la prolongación gradualmente.' },
    { n: 6, title: 'Inicio suave', desc: 'Practicad empezar las frases con un volumen suave, como un susurro que va subiendo. En lugar de "atacar" la primera sílaba con fuerza, se empieza suavemente: "hhhhola, ¿qué tal?". Reduce los bloqueos iniciales.' },
    { n: 7, title: 'Frases cortas primero', desc: 'Empezad con frases de 2-3 palabras: "Quiero agua", "Es bonito", "Vamos fuera". Cuando estas salgan fluidas, id alargando: "Quiero un vaso de agua, por favor". Construir éxito desde lo simple.' },
    { n: 8, title: 'Juego de roles', desc: 'Jugad a tiendas, al médico, a restaurantes. Las situaciones de juego son menos estresantes que la conversación real y permiten practicar el habla en un contexto divertido y sin presión. Además, el juego simbólico potencia el lenguaje.' },
  ];

  let fHTML1 = '';
  for (const e of fluencyEx) {
    fHTML1 += `<div class="exercise-card"><span class="ex-num">${e.n}</span><h4>${e.title}</h4><p>${e.desc}</p></div>`;
  }
  let fHTML2 = '';
  for (const e of fluencyEx2) {
    fHTML2 += `<div class="exercise-card"><span class="ex-num">${e.n}</span><h4>${e.title}</h4><p>${e.desc}</p></div>`;
  }

  pages += `<div class="page content">${fHTML1}${footer(15)}</div>`;
  pages += `<div class="page content">${fHTML2}${footer(16)}</div>`;

  pages += `<div class="page content">
    <h3>Consejos para los ejercicios</h3>
    <div class="tip-box">
      <ul>
        <li><strong>Hazlo a diario:</strong> 5-10 minutos al día, mejor que una sesión larga a la semana.</li>
        <li><strong>Hazlo divertido:</strong> si parece terapia, el niño se resistirá. Si parece un juego, querrá repetir.</li>
        <li><strong>Modela tú primero:</strong> haz el ejercicio tú antes de pedirle que lo haga él.</li>
        <li><strong>No corrijas:</strong> si tartamudea durante el ejercicio, no pasa nada. El objetivo es practicar, no ser perfecto.</li>
        <li><strong>Celebra:</strong> "¡Qué bien lo hemos pasado!" es mejor que "¡Qué bien has hablado!".</li>
        <li><strong>Busca el mejor momento:</strong> cuando esté descansado y relajado, no después de un día agotador.</li>
      </ul>
    </div>
    ${footer(17)}
  </div>`;

  // Cap 6
  pages += chapterPage(6, 'Sección para profesores', 'Pautas específicas para el entorno escolar. Puedes compartir esta sección con los profesores de tu hijo/a.', 18);

  pages += `<div class="page content">
    <h3>Pautas para el aula</h3>
    <div class="exercise-card">
      <span class="ex-num">1</span><h4>No forzar la lectura en voz alta</h4>
      <p>Nunca obligar a leer en voz alta delante de la clase. Si quiere participar, ofrecerle la opción, pero sin presionar. Puede leer en voz alta al profesor en privado si lo prefiere.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">2</span><h4>Darle tiempo</h4>
      <p>Cuando le preguntes, dale tiempo extra para responder. No mires el reloj ni muestres impaciencia. Si ves que se bloquea, reformula la pregunta de forma más sencilla.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">3</span><h4>No interrumpir ni completar</h4>
      <p>Dejar que termine a su ritmo, aunque tarde. Completar sus frases le transmite que su forma de hablar es un problema.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">4</span><h4>No evaluar la fluidez</h4>
      <p>Si tiene que hacer una exposición oral, evaluar el contenido, la preparación y la creatividad, nunca la fluidez del habla.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">5</span><h4>Ubicación en el aula</h4>
      <p>Sentarle donde se sienta cómodo (no necesariamente en primera fila). Preguntarle en privado dónde prefiere sentarse.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">6</span><h4>Conversación privada</h4>
      <p>Hablar con el alumno en privado sobre sus necesidades. Preguntarle qué le ayuda y qué le resulta difícil. Hacerle partícipe de las decisiones.</p>
    </div>
    <div class="exercise-card">
      <span class="ex-num">7</span><h4>Adaptar las presentaciones orales</h4>
      <p>Ofrecer alternativas: presentar en grupo, grabar un vídeo, hacer una presentación con apoyo visual donde hable menos, o presentar solo ante el profesor.</p>
    </div>
    ${footer(19)}
  </div>`;

  pages += `<div class="page content">
    <h3>Crear un aula segura</h3>
    <p>Más allá de las pautas individuales, es fundamental crear un clima de aula donde la diversidad comunicativa sea respetada:</p>
    <ul>
      <li>Trabajar el <strong>respeto a los turnos de habla</strong> con todos los alumnos.</li>
      <li>No tolerar <strong>burlas ni imitaciones</strong>. Intervenir inmediatamente si ocurren.</li>
      <li>Incorporar actividades de <strong>educación emocional</strong> que trabajen la empatía.</li>
      <li>Si el alumno lo desea, hablar con la clase sobre la tartamudez de forma <strong>normalizada</strong>.</li>
    </ul>

    <div class="highlight-box">
      <strong>Para el profesor:</strong> Un niño que tartamudea puede tener mucho que aportar. No le definas por su tartamudez. Busca sus fortalezas y poténcialas. Tu actitud marcará la diferencia entre un alumno que se apaga y uno que florece.
    </div>
    ${footer(20)}
  </div>`;

  // Cap 7
  pages += chapterPage(7, 'Cuándo consultar', 'Señales claras de que es momento de buscar ayuda profesional.', 21);

  pages += `<div class="page content">
    <h3>Consulta con un logopeda si...</h3>
    <div style="margin:16px 0;">
      ${[
        'La tartamudez dura más de 6 meses.',
        'El niño se muestra frustrado, triste o enfadado por su forma de hablar.',
        'Observas tensión visible (en cara, cuello o cuerpo) al hablar.',
        'El niño evita hablar, responde con monosílabos o deja de participar.',
        'Aparecen conductas secundarias: parpadeo, movimientos de cabeza, muletillas.',
        'La tartamudez va a más en lugar de a menos.',
        'Hay antecedentes familiares de tartamudez persistente.',
        'El niño tiene más de 5 años y sigue tartamudeando.',
        'Otros niños se burlan o el niño sufre socialmente.',
        'Tú, como padre/madre, estás preocupado/a. Tu instinto importa.'
      ].map((item, i) => `<div class="checklist-item"><div class="box" style="background:${C.terracota};border-color:${C.terracota};"></div><span>${item}</span></div>`).join('')}
    </div>

    <div class="tip-box">
      <strong>¿Qué hará el logopeda?</strong> Evaluará el tipo y la severidad de la tartamudez, los factores de riesgo, el impacto emocional y comunicativo. A partir de ahí, diseñará un plan de intervención que puede incluir: trabajo directo con el niño, pautas para la familia, coordinación con el colegio y seguimiento.
    </div>

    <h3>¿Cuánto dura la intervención?</h3>
    <p>Depende de cada caso. Algunos niños mejoran significativamente en pocos meses; otros necesitan un seguimiento más largo. Lo importante es que la intervención temprana tiene los mejores resultados: cuanto antes se empiece, más probable es la recuperación completa.</p>
    ${footer(22)}
  </div>`;

  // Cap 8
  pages += chapterPage(8, 'Recursos y bibliografía', 'Lecturas, webs y materiales para seguir aprendiendo sobre tartamudez infantil.', 23);

  pages += `<div class="page content">
    <h3>Libros recomendados</h3>
    <ul>
      <li><em>"Tartamudez: guía para padres"</em> – Fundación Española de la Tartamudez. Práctico y accesible.</li>
      <li><em>"El niño que tartamudea"</em> – J. Scott Yaruss & Nina Reardon-Reeves. Una guía para familias basada en evidencia.</li>
      <li><em>"Stuttering: Foundations and Clinical Applications"</em> – Ehud Yairi & Carol Seery. Referencia académica completa.</li>
    </ul>

    <h3>Webs y asociaciones</h3>
    <ul>
      <li><strong>Fundación Española de la Tartamudez (TTM):</strong> fundacionttm.org</li>
      <li><strong>The Stuttering Foundation:</strong> stutteringhelp.org (en inglés y español)</li>
      <li><strong>ISAD (International Stuttering Awareness Day):</strong> isastutter.org</li>
      <li><strong>Asociación Española de Tartamudez:</strong> recursos y grupos de apoyo.</li>
    </ul>

    <h3>Para niños</h3>
    <ul>
      <li><em>"El tartamudo"</em> – Cuento infantil para normalizar la tartamudez.</li>
      <li><em>"A veces las palabras se atascan"</em> – Libro ilustrado para niños que tartamudean.</li>
      <li>Vídeos de personas famosas que tartamudean: Ed Sheeran, Joe Biden, Emily Blunt.</li>
    </ul>

    <h3>Películas y documentales</h3>
    <ul>
      <li><em>"El discurso del rey"</em> (2010) – La historia del rey Jorge VI y su tartamudez.</li>
      <li><em>"Rocket Science"</em> (2007) – Un adolescente con tartamudez se une al equipo de debate.</li>
    </ul>
    ${footer(24)}
  </div>`;

  pages += `<div class="page content">
    <h3>Carta a las familias</h3>
    <div class="highlight-box" style="font-size:15px;line-height:1.8;">
      <p>La tartamudez puede generar preocupación, frustración y a veces culpa. Queremos decirte algo importante: <strong>no es culpa tuya</strong>, y hay mucho que puedes hacer para ayudar.</p>
      <p style="margin-top:10px;">Tu hijo/a necesita sentir que <strong>lo que dice importa más que cómo lo dice</strong>. Necesita un hogar donde hablar sea seguro, donde no haya prisa ni juicio.</p>
      <p style="margin-top:10px;">Con el apoyo adecuado, la mayoría de los niños mejoran significativamente. Y los que mantienen cierto grado de tartamudez pueden aprender a comunicarse con confianza y sin miedo.</p>
      <p style="margin-top:10px;">En <strong>Espacio Lenguaje</strong> estamos especializados en fluidez infantil. Si necesitas orientación, estamos a tu lado.</p>
      <p style="margin-top:10px;font-weight:600;color:${C.terracota};">Tu hijo/a tiene voz. Ayúdale a usarla.</p>
    </div>

    <div style="text-align:center;margin-top:40px;">
      <img src="${LOGO}" style="width:120px;margin-bottom:14px;" /><br/>
      <span style="font-size:16px;font-weight:600;color:${C.terracota};">espaciolenguaje.com</span><br/>
      <span style="font-size:13px;color:#888;">Logopedia infantil especializada</span>
    </div>
    ${footer(25)}
  </div>`;

  pages += backCover();

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${baseCSS}</style></head><body>${pages}</body></html>`;
}

// ─── PDF 3 – Checklist Señales de Alerta ─────────────────────────────────────
function buildChecklistHTML() {
  const rows = [
    { edad: '0-6 meses', esperable: 'Gorjeos, risas, reacciona a sonidos', alerta: 'No reacciona a voces, no sonríe, silencio total', nivel: '&#9888;&#65039;' },
    { edad: '6-12 meses', esperable: 'Balbuceo (ba-ba, ma-ma), señala', alerta: 'No balbucea, no responde a su nombre', nivel: '&#9888;&#65039;' },
    { edad: '12-18 meses', esperable: '3-10 palabras, comprende instrucciones simples', alerta: 'No dice ninguna palabra, no señala', nivel: '&#9888;&#65039;&#9888;&#65039;' },
    { edad: '18-24 meses', esperable: '10-50 palabras, empieza a combinar', alerta: 'Menos de 10 palabras, no combina ninguna', nivel: '&#9888;&#65039;&#9888;&#65039;' },
    { edad: '2-3 años', esperable: 'Frases de 2-3 palabras, 75% inteligible', alerta: 'Solo palabras sueltas, no le entienden', nivel: '&#9888;&#65039;&#9888;&#65039;&#9888;&#65039;' },
    { edad: '3-4 años', esperable: 'Frases completas, cuenta cosas', alerta: 'Frases muy cortas, errores gramaticales severos', nivel: '&#9888;&#65039;&#9888;&#65039;' },
    { edad: '4-5 años', esperable: 'Narra historias, articula casi todo', alerta: 'Dificultad con r, s, o múltiples sonidos', nivel: '&#9888;&#65039;' },
    { edad: '5-6 años', esperable: 'Lenguaje completo, inicia lectoescritura', alerta: 'Dificultad con letras, lectura, escritura', nivel: '&#9888;&#65039;&#9888;&#65039;' },
  ];

  let tableRows = '';
  for (const r of rows) {
    tableRows += `<tr>
      <td style="font-weight:700;white-space:nowrap;color:${C.terracota};">${r.edad}</td>
      <td>${r.esperable}</td>
      <td style="color:#b33;">${r.alerta}</td>
      <td style="text-align:center;font-size:16px;">${r.nivel}</td>
    </tr>`;
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    ${baseCSS}
    body { background: white; }
    .page { background: white; padding: 40px 50px; }
    table { font-size: 13.5px; }
    th { font-size: 13px; }
    td { padding: 10px 12px; }
  </style>
  </head><body>
    <div class="page">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <img src="${LOGO}" style="height:50px;" />
        <span style="font-size:11px;color:#999;">espaciolenguaje.com</span>
      </div>
      <div style="width:100%;height:4px;background:linear-gradient(90deg,${C.terracota},${C.verde});border-radius:2px;margin-bottom:20px;"></div>

      <h2 style="text-align:center;color:${C.terracota};font-size:26px;margin-bottom:4px;">Checklist: Señales de Alerta del Lenguaje</h2>
      <p style="text-align:center;font-size:13px;color:#777;margin-bottom:18px;">Guía rápida para identificar posibles señales de alerta en el desarrollo del lenguaje infantil</p>

      <table>
        <thead>
          <tr>
            <th>Edad</th>
            <th>Lo esperable</th>
            <th>Señal de alerta</th>
            <th>¿Consultar?</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>

      <div style="margin-top:20px;padding:16px;background:${C.arena};border-radius:10px;border-left:4px solid ${C.terracota};font-size:14px;line-height:1.6;">
        <strong>Si marcas alguna señal de alerta, consulta con un logopeda.</strong> La intervención temprana es la más eficaz. No esperes a que "se le pase solo": cuanto antes se actúe, mejores resultados se obtienen.
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:20px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${LOGO}" style="height:30px;" />
          <span style="font-size:12px;color:${C.terracota};font-weight:600;">espaciolenguaje.com</span>
        </div>
        <span style="font-size:10px;color:#aaa;">© Espacio Lenguaje · Logopedia infantil especializada</span>
      </div>
    </div>
  </body></html>`;

  return html;
}

// ─── PDF 4 – 5 Juegos ───────────────────────────────────────────────────────
function buildJuegosHTML() {
  const gameFooter = (n) => `<div style="position:absolute;bottom:30px;left:60px;right:60px;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:8px;"><img src="${LOGO}" style="height:22px;" /><span style="font-size:10px;color:#999;">Descarga más recursos en espaciolenguaje.com/recursos</span></div>
    <span style="font-size:11px;color:#999;">${n}</span>
  </div>`;

  let pages = '';

  // Cover
  pages += `<div class="page cover">
    <div class="deco-top"></div>
    <img class="logo" src="${LOGO}" />
    <h1 style="font-size:34px;">5 Juegos para Estimular<br/>el Habla en Casa</h1>
    <p class="subtitle">Actividades sencillas, divertidas y sin materiales especiales para potenciar el lenguaje de tu hijo/a desde casa.</p>
    <div class="badge">De 18 meses a 5+ años</div>
    <div style="margin-top:40px;max-width:520px;text-align:left;font-size:14px;line-height:1.7;color:${C.cacao};">
      <p>El juego es la herramienta más poderosa para estimular el lenguaje. Los niños aprenden a hablar hablando, y las mejores oportunidades surgen en los momentos cotidianos: la hora del baño, la compra, el camino al cole.</p>
      <p style="margin-top:10px;">Estos 5 juegos están diseñados por logopedas para que puedas incorporarlos fácilmente en tu rutina diaria. No necesitas ser especialista ni comprar materiales caros: solo necesitas tiempo, ganas y un poco de creatividad.</p>
    </div>
    <div class="deco-bottom"></div>
  </div>`;

  // Page 2 – Games 1-3
  pages += `<div class="page content">
    <h2 style="color:${C.terracota};font-size:24px;margin-bottom:20px;">Juegos para estimular el habla</h2>

    <div class="game-card">
      <span class="game-num">1</span><h4>"El supermercado"</h4><span class="game-age">3+ años</span>
      <p>Jugad a hacer la compra. Nombrad cada alimento al meterlo en la cesta (real o imaginaria). Usad categorías para ampliar vocabulario: <em>"Necesitamos fruta: manzana, plátano, uvas... ¿qué más fruta se te ocurre?"</em></p>
      <p>Podéis hacer la lista de la compra juntos antes de ir al supermercado de verdad, o jugar con alimentos de juguete en casa.</p>
      <div class="game-meta">
        <span><strong>Material:</strong> objetos de cocina o recortes de revistas</span>
        <span><strong>Trabaja:</strong> vocabulario, categorías semánticas</span>
      </div>
    </div>

    <div class="game-card">
      <span class="game-num">2</span><h4>"Veo veo" mejorado</h4><span class="game-age">2+ años</span>
      <p>En vez de usar letras (que pueden ser difíciles para los más pequeños), usad descripciones: <em>"Veo veo algo que es rojo y redondo"</em>, <em>"Veo algo que sirve para sentarse"</em>. El niño tiene que adivinar y luego es su turno de describir.</p>
      <p>Podéis jugarlo en el coche, en la sala de espera, paseando por la calle... ¡en cualquier momento!</p>
      <div class="game-meta">
        <span><strong>Material:</strong> ninguno</span>
        <span><strong>Trabaja:</strong> descripción, vocabulario, atributos</span>
      </div>
    </div>

    <div class="game-card">
      <span class="game-num">3</span><h4>"El teléfono mágico"</h4><span class="game-age">18+ meses</span>
      <p>Usad un teléfono de juguete (o un plátano, o un mando a distancia) para "llamar" a la abuela, a un personaje de dibujos, al médico. Narrad la conversación, haced preguntas, inventad historias.</p>
      <p>Para los más pequeños, modela tú la conversación: <em>"Ring ring... ¿Hola, abuela? Hoy hemos ido al parque. ¿Verdad, cariño?"</em></p>
      <div class="game-meta">
        <span><strong>Material:</strong> teléfono de juguete</span>
        <span><strong>Trabaja:</strong> turnos conversacionales, narrativa</span>
      </div>
    </div>
    ${gameFooter(2)}
  </div>`;

  // Page 3 – Games 4-5
  pages += `<div class="page content">
    <div class="game-card">
      <span class="game-num">4</span><h4>"Caja de sonidos"</h4><span class="game-age">2+ años</span>
      <p>Meted varios objetos cotidianos en una caja o bolsa opaca: unas tijeras, un coche de juguete, unas llaves, una campana, papel de burbujas. Sacad uno, haced su sonido: tijeras (<em>clic-clic</em>), coche (<em>brum-brum</em>), llaves (<em>clin-clin</em>).</p>
      <p>Después, una variante: haced el sonido SIN enseñar el objeto y que el niño adivine qué es. Trabaja la discriminación auditiva y las onomatopeyas, que son una de las primeras formas de lenguaje.</p>
      <div class="game-meta">
        <span><strong>Material:</strong> caja, objetos cotidianos que hagan sonido</span>
        <span><strong>Trabaja:</strong> onomatopeyas, discriminación auditiva</span>
      </div>
    </div>

    <div class="game-card">
      <span class="game-num">5</span><h4>"Cuéntame tu día"</h4><span class="game-age">3+ años</span>
      <p>Antes de dormir (o durante la cena), cada miembro de la familia cuenta 3 cosas de su día usando conectores temporales: <em>"Primero he ido al cole... Después hemos jugado en el patio... Por último he merendado galletas."</em></p>
      <p>Empieza tú para modelar la estructura. Haz preguntas abiertas: <em>"¿Y qué pasó después?", "¿Cómo te sentiste?"</em>. Este juego fortalece la narrativa, la secuenciación temporal y la expresión de emociones.</p>
      <div class="game-meta">
        <span><strong>Material:</strong> ninguno</span>
        <span><strong>Trabaja:</strong> narrativa, secuenciación temporal, expresión emocional</span>
      </div>
    </div>

    <div style="margin-top:24px;padding:18px;background:${C.arena};border-radius:10px;font-size:14px;line-height:1.7;">
      <h4 style="color:${C.terracota};margin-bottom:8px;">Consejos para sacar el máximo partido</h4>
      <ul style="margin-left:18px;">
        <li><strong>No corrijas directamente:</strong> si dice "toche" en vez de "coche", repite tú la palabra correcta de forma natural: <em>"¡Sí, qué coche más bonito!"</em></li>
        <li><strong>Amplía:</strong> si dice "perro grande", tú di: <em>"Sí, es un perro muy grande y marrón"</em>.</li>
        <li><strong>Sigue su interés:</strong> si le gustan los dinosaurios, haced el "Veo veo" con dinosaurios.</li>
        <li><strong>Poco y a menudo:</strong> 10 minutos al día de juego con lenguaje vale más que una hora a la semana.</li>
        <li><strong>Divertíos:</strong> si no es divertido, no funciona. El lenguaje se aprende jugando.</li>
      </ul>
    </div>
    ${gameFooter(3)}
  </div>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${baseCSS}</style></head><body>${pages}</body></html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.pdf({
    path: outputPath,
    width: '794px',
    height: '1123px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  const size = fs.statSync(outputPath).size;
  console.log(`  ✓ ${outputPath} (${(size / 1024).toFixed(1)} KB)`);
}

(async () => {
  const root = path.join(__dirname, '..');

  // Ensure output dirs
  fs.mkdirSync(path.join(root, 'public/downloads/productos'), { recursive: true });
  fs.mkdirSync(path.join(root, 'public/downloads'), { recursive: true });

  console.log('Generando PDFs de lead magnets...\n');

  const tasks = [
    { html: buildDislexiaHTML(), out: path.join(root, 'public/downloads/productos/guia-dislexia.pdf') },
    { html: buildTartamudezHTML(), out: path.join(root, 'public/downloads/productos/guia-tartamudez.pdf') },
    { html: buildChecklistHTML(), out: path.join(root, 'public/downloads/checklist-senales-alerta.pdf') },
    { html: buildJuegosHTML(), out: path.join(root, 'public/downloads/5-juegos-estimular-habla.pdf') },
  ];

  for (const t of tasks) {
    await generatePDF(t.html, t.out);
  }

  console.log('\n¡Todos los PDFs generados correctamente!');
})();
