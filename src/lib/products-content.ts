export interface ProductContent {
  seoTitle: string;
  seoDescription: string;
  subtitle: string;
  pageCount: number;
  ageRange?: string;
  longDescription: string[];
  features: { title: string; description: string }[];
  whatYouGet: string[];
  audience: string[];
  faqs: { q: string; a: string }[];
  relatedProductIds?: string[];
  relatedBlogPosts?: { slug: string; title: string }[];
}

export const productsContent: Record<string, ProductContent> = {
  'fichas-articulacion': {
    seoTitle: 'Fichas de logopedia para imprimir: pack de articulación (30 fichas)',
    seoDescription:
      'Pack de 30 fichas de logopedia imprimibles con ejercicios de articulación por fonema. Material diseñado por logopedas para trabajar la pronunciación en casa. PDF desde 3,90€.',
    subtitle: 'Material imprimible de articulación, fonema por fonema',
    pageCount: 34,
    longDescription: [
      'Si tu peque dice "toche" en vez de "coche", o se come las eses, o la R todavía no le sale, no estás sola. Las dificultades de articulación son una de las consultas más frecuentes en logopedia infantil, y la mayoría se trabajan con ejercicios repetidos, estructurados y progresivos.',
      'Este pack de **30 fichas de logopedia imprimibles** está diseñado exactamente para eso: darte un material ordenado por fonema, con instrucciones claras para padres y madres sin formación en logopedia. No necesitas saber qué es un punto de articulación ni un fonema fricativo — las fichas guían paso a paso la actividad.',
      'Cada ficha trabaja un fonema concreto (R, S, L, K, CH, Z, entre otros), con una batería de palabras organizadas por posición (inicial, media, final), ilustraciones para señalar y pequeños juegos de repetición. Están pensadas para sesiones cortas de 10-15 minutos, que es justo el tiempo que un niño de 3-6 años mantiene la atención en una tarea estructurada.',
      'El material es el mismo tipo de ficha que usamos en consulta: el soporte visual ayuda al niño a anclar el sonido correcto, y las instrucciones para el adulto evitan errores comunes (corregir directamente, forzar la pronunciación, repetir demasiado). Si tu peque lleva meses con un mismo error de articulación, un trabajo sistemático en casa puede marcar una diferencia real en semanas.',
      'Es un material complementario al trabajo de logopedia, no sustitutivo. Si el problema persiste, siempre recomendamos valoración profesional. Pero para la mayoría de dislalias evolutivas leves, este tipo de práctica estructurada en casa funciona muy bien.',
    ],
    features: [
      { title: '30 fichas imprimibles', description: 'Una por fonema o grupo de fonemas, con ilustraciones y palabras por posición.' },
      { title: 'Instrucciones para adultos', description: 'Cada ficha incluye una guía clara para padres sin formación previa.' },
      { title: 'Progresión por dificultad', description: 'De sílabas simples a palabras y frases. El peque avanza sin saltar pasos.' },
      { title: 'PDF A4 listo para imprimir', description: 'Diseño limpio, alta resolución, sin tinta excesiva para economizar.' },
      { title: 'Incluye registro de progreso', description: 'Hoja de seguimiento para anotar qué fonemas ya domina y cuáles trabajar.' },
    ],
    whatYouGet: [
      'PDF de 34 páginas (30 fichas + portada + guía + registro)',
      'Descarga inmediata tras la compra',
      'Uso ilimitado en tu familia o aula',
      'Actualizaciones gratuitas si mejoramos el pack',
    ],
    audience: [
      'Padres y madres con peques de 3 a 7 años que tienen dificultades con algún fonema concreto',
      'Maestras de infantil o primaria que quieren material de refuerzo fonológico',
      'Logopedas que buscan material extra para mandar de tarea a casa',
    ],
    faqs: [
      {
        q: '¿A qué edad puedo empezar a usar las fichas?',
        a: 'Están diseñadas principalmente para niños de 3 a 7 años. Antes de los 3 años, la mayoría de dificultades de articulación son evolutivas normales y no requieren trabajo específico.',
      },
      {
        q: '¿Necesito saber algo de logopedia para usarlas?',
        a: 'No. Cada ficha incluye instrucciones paso a paso para el adulto, explicadas en lenguaje claro y sin jerga profesional.',
      },
      {
        q: '¿Cuántas fichas se pueden hacer al día?',
        a: 'Recomendamos 1-2 fichas al día, en sesiones de 10-15 minutos. Lo importante es la constancia, no el volumen.',
      },
    ],
    relatedProductIds: ['kit-soplo', 'cuaderno-3-6', 'pack-completo'],
    relatedBlogPosts: [
      { slug: 'dislalia-infantil-tipos', title: 'Dislalia infantil: tipos, causas y tratamiento' },
      { slug: 'como-ensenar-la-r-a-un-nino', title: 'Cómo enseñar la R a un niño' },
      { slug: 'praxias-bucofaciales-ninos', title: 'Praxias bucofaciales para niños' },
    ],
  },

  'cuaderno-0-3': {
    seoTitle: 'Cuaderno de estimulación del lenguaje 0-3 años: 20 actividades (PDF)',
    seoDescription:
      'Cuaderno de estimulación del lenguaje para bebés y niños de 0 a 3 años. 20 actividades organizadas por edad, diseñadas por logopedas. PDF imprimible desde 5,90€.',
    subtitle: 'Estimulación del lenguaje desde el primer babeo',
    pageCount: 28,
    ageRange: '0-3 años',
    longDescription: [
      'Los tres primeros años son la ventana de oportunidad más importante para el desarrollo del lenguaje. No se trata de "enseñar" a hablar — los bebés aprenden el idioma por exposición e interacción — pero sí podemos crear el entorno perfecto para que esa maquinaria se active con fuerza.',
      'Este **cuaderno de estimulación del lenguaje 0-3 años** está pensado para padres y madres que quieren aprovechar esos primeros años con actividades concretas, adaptadas a cada franja de edad, sin necesidad de materiales especiales ni formación previa. Son 20 actividades estructuradas, probadas por logopedas y organizadas en tres bloques: 0-12 meses, 12-24 meses y 24-36 meses.',
      'En el bloque de 0 a 12 meses encontrarás rutinas para favorecer el contacto visual, la atención conjunta, el balbuceo y la respuesta a sonidos. Nada de "flashcards" ni pantallas: actividades pensadas para integrar en la rutina (baño, comida, cambio de pañal) y que se apoyan en lo que los bebés adoran — la voz de mamá y papá, la imitación y los juegos de cara a cara.',
      'Entre los 12 y 24 meses entramos en la explosión del vocabulario. El cuaderno propone actividades para ampliar léxico, iniciar combinaciones de dos palabras y reforzar comprensión (que suele ir siempre por delante de la expresión). Incluye pautas claras sobre qué esperar y qué no — muy útil para familias que se comparan con otros niños y viven con angustia cada "retraso aparente".',
      'De 24 a 36 meses el foco está en construir frases, seguir narrativas sencillas, jugar simbólicamente y trabajar las primeras preguntas ("¿qué?", "¿dónde?"). Cada actividad viene con una pregunta tipo "Si tu hijo no consigue esto, ¿qué hago?" que da tranquilidad y siguiente paso.',
      'El cuaderno es un **compañero de ruta para los tres primeros años**, no un método cerrado. Úsalo cuando tengas dudas, cuando busques ideas nuevas, o simplemente cuando quieras tener la tranquilidad de que estás acompañando bien el desarrollo del lenguaje de tu peque.',
    ],
    features: [
      { title: '20 actividades estructuradas', description: 'Organizadas en tres bloques por edad: 0-12m, 12-24m, 24-36m.' },
      { title: 'Sin materiales especiales', description: 'Todas las actividades se hacen con lo que ya tienes en casa.' },
      { title: 'Hitos por edad incluidos', description: 'Tabla de referencia con qué esperar en cada mes.' },
      { title: 'Señales de alerta', description: 'Sabrás cuándo consultar con un profesional sin dramatizar.' },
      { title: 'Tiempo estimado por actividad', description: 'De 5 a 15 minutos. Encajable en la rutina diaria.' },
    ],
    whatYouGet: [
      'PDF de 28 páginas en A4',
      'Tabla de hitos del lenguaje 0-3 años',
      'Checklist de señales de alerta por edad',
      'Descarga inmediata y acceso perpetuo',
    ],
    audience: [
      'Padres y madres primerizos que quieren acompañar el desarrollo del lenguaje con buenas prácticas',
      'Familias con hablantes tardíos (late talkers) que buscan ideas concretas para casa',
      'Educadoras de escuela infantil que quieren un material de referencia práctico',
    ],
    faqs: [
      {
        q: '¿Sirve si mi bebé tiene menos de 6 meses?',
        a: 'Sí. Incluimos actividades para estimular el lenguaje desde el primer mes — principalmente contacto visual, respuesta a sonidos y protoconversaciones.',
      },
      {
        q: '¿Y si sospecho que mi peque tiene un retraso?',
        a: 'El cuaderno incluye un checklist claro de señales de alerta. Si cumple varios criterios, recomendamos valoración profesional. Las actividades siguen siendo útiles como apoyo.',
      },
      {
        q: '¿Es compatible con el bilingüismo?',
        a: 'Totalmente. Cada actividad puede hacerse en cualquier idioma. El bilingüismo no causa retraso del lenguaje, solo requiere exposición de calidad a ambas lenguas.',
      },
    ],
    relatedProductIds: ['cuaderno-3-6', 'fichas-articulacion', 'pack-completo'],
    relatedBlogPosts: [
      { slug: 'etapas-desarrollo-del-lenguaje', title: 'Etapas del desarrollo del lenguaje 0-6 años' },
      { slug: 'actividades-ninos-2-anos-lenguaje', title: 'Actividades para estimular el lenguaje a los 2 años' },
      { slug: 'mi-hijo-no-habla-cuando-preocuparse', title: 'Mi hijo no habla: señales de alerta' },
    ],
  },

  'cuaderno-3-6': {
    seoTitle: 'Cuaderno de logopedia 3-6 años: vocabulario, articulación y conciencia fonológica',
    seoDescription:
      'Cuaderno de estimulación del lenguaje para niños de 3 a 6 años: 20 actividades de vocabulario, articulación y conciencia fonológica. PDF imprimible diseñado por logopedas.',
    subtitle: 'Vocabulario, articulación y conciencia fonológica',
    pageCount: 32,
    ageRange: '3-6 años',
    longDescription: [
      'Entre los 3 y los 6 años el lenguaje de un peque da un salto espectacular: pasa de frases de 3-4 palabras a conversaciones completas, construye narrativas, hace preguntas abstractas y empieza a prepararse para la lectoescritura. Es también la etapa en que más errores de articulación "se limpian" y donde la conciencia fonológica — clave para aprender a leer — se desarrolla.',
      'Este **cuaderno de logopedia 3-6 años** está organizado en cuatro bloques: vocabulario, articulación, morfosintaxis y conciencia fonológica. Son 20 actividades progresivas diseñadas por logopedas que trabajan a diario con esta franja de edad.',
      'En el bloque de vocabulario encontrarás juegos para ampliar léxico por campos semánticos (animales, familia, emociones, alimentos), trabajar antónimos y categorizar. El vocabulario receptivo y expresivo a los 4-5 años es uno de los predictores más potentes del rendimiento escolar posterior.',
      'El bloque de articulación incluye ejercicios específicos para los fonemas que más tardan en adquirirse: R (vibrante simple y múltiple), S, Z y grupos consonánticos (br, pl, tr). Cada actividad combina praxias, discriminación auditiva y repetición contextualizada.',
      'Morfosintaxis: desde los 3 años los niños empiezan a construir frases cada vez más complejas con subordinadas, conjugaciones irregulares y conectores. Este bloque propone actividades narrativas (cuéntame qué pasó), juegos de completar frases y tareas de ordenar secuencias.',
      'Y el último bloque, **conciencia fonológica**, es especialmente importante en el último año de infantil (5-6 años): segmentar sílabas, identificar sonido inicial y final, rimas, omisión de sílabas. Son las habilidades que, mejor entrenadas, predicen un aprendizaje de lectoescritura sin tropiezos.',
      'El cuaderno está pensado para familias y también para aulas de infantil. Es un material que acompaña los últimos dos años de educación infantil y la transición a primaria con bases firmes.',
    ],
    features: [
      { title: '20 actividades en 4 bloques', description: 'Vocabulario, articulación, morfosintaxis y conciencia fonológica.' },
      { title: 'Progresión por dificultad', description: 'Desde actividades básicas hasta niveles de 1º de primaria.' },
      { title: 'Material visual incluido', description: 'Tarjetas, láminas y fichas listas para recortar o usar en pantalla.' },
      { title: 'Compatible con dislexia', description: 'El bloque de conciencia fonológica incluye adaptaciones para niños con sospecha de dislexia.' },
      { title: 'Guía para el adulto', description: 'Explica qué hace cada actividad y por qué es importante.' },
    ],
    whatYouGet: [
      'PDF de 32 páginas',
      'Material visual imprimible (tarjetas y láminas)',
      'Guía de uso paso a paso',
      'Registro de progreso por bloque',
    ],
    audience: [
      'Familias con peques de 3 a 6 años',
      'Maestras de infantil (último ciclo) y primaria (primero)',
      'Logopedas que quieren material extra de trabajo en casa',
    ],
    faqs: [
      {
        q: '¿Cubre la preparación para la lectoescritura?',
        a: 'Sí. El bloque de conciencia fonológica es exactamente lo que los niños necesitan dominar antes de aprender a leer. Es la misma progresión que trabajamos en logopedia preventiva.',
      },
      {
        q: '¿Mi peque tiene TEL, ¿le sirve?',
        a: 'Sirve como apoyo complementario al tratamiento especializado. En TEL es esencial que un logopeda dirija el plan principal, pero este tipo de actividades estructuradas en casa suman mucho.',
      },
      {
        q: '¿Puedo usarlo en aula?',
        a: 'Sí. Hay secciones pensadas para trabajo individual y otras para pequeño grupo.',
      },
    ],
    relatedProductIds: ['fichas-articulacion', 'cuaderno-0-3', 'guia-dislexia'],
    relatedBlogPosts: [
      { slug: 'conciencia-fonologica-actividades', title: 'Conciencia fonológica: actividades por edad' },
      { slug: 'vocabulario-ninos-como-ampliar', title: 'Cómo ampliar el vocabulario de un niño' },
      { slug: 'tel-trastorno-especifico-lenguaje', title: 'TEL: Trastorno Específico del Lenguaje' },
    ],
  },

  'kit-soplo': {
    seoTitle: 'Kit de ejercicios de soplo para niños: 15 actividades progresivas (PDF)',
    seoDescription:
      'Kit de 15 ejercicios de soplo para niños con materiales caseros. Fortalece los músculos del habla con actividades progresivas diseñadas por logopedas. PDF desde 3,90€.',
    subtitle: '15 ejercicios progresivos con materiales de casa',
    pageCount: 22,
    longDescription: [
      'El soplo es la base de muchos fonemas del español — especialmente la S, la F, la CH, la Z y, de forma indirecta, la R. Un niño que no controla bien el flujo de aire tiene más dificultades para articular con claridad, y su habla suele ser menos inteligible para personas ajenas a la familia.',
      'Este **kit de ejercicios de soplo para niños** recopila los 15 ejercicios que usamos en consulta y que mejor funcionan para trabajar en casa. Están organizados por **dificultad progresiva**: empezamos con soplo libre (soplar velas, pompas, plumas), pasamos a soplo dirigido (guiar una pelotita por un circuito, hacer volar papeles), y terminamos con soplo controlado (soplo sostenido, intercalar inspiración y espiración, jugar con silbatos).',
      'La clave del entrenamiento de soplo es la **progresión**. Muchos padres bien intencionados empiezan con silbatos o globos — que son de los ejercicios más difíciles — y se frustran cuando su peque no lo consigue. Con la secuencia correcta, en 3-4 semanas de práctica diaria de 5 minutos, se ven resultados evidentes.',
      'Cada ejercicio incluye: material necesario (todo casero), edad recomendada, objetivo específico (qué músculos trabaja), pasos claros para el adulto, y una variante más fácil y otra más difícil. Así puedes adaptar el ejercicio al momento exacto de tu peque, sin frustración.',
      'El kit también incluye una **tabla de seguimiento** para marcar qué ejercicio dominó cada semana, y consejos sobre cuándo es el mejor momento del día para practicar (spoiler: antes del desayuno o antes de dormir, cuando están descansados y con atención disponible).',
      'Es un material útil tanto como refuerzo del trabajo en consulta como de forma preventiva. Trabajar el soplo en familias con niños de 3-5 años ayuda al desarrollo de una articulación clara, mejora la resistencia respiratoria y — de forma indirecta — favorece el desarrollo de la musculatura orofacial que también interviene en la masticación y la deglución.',
    ],
    features: [
      { title: '15 ejercicios progresivos', description: 'De soplo libre a soplo controlado, con variantes por dificultad.' },
      { title: 'Material casero', description: 'Velas, pompas, pajitas, plumas, algodones. Todo lo tienes en casa.' },
      { title: 'Tabla de seguimiento', description: 'Registra el progreso semanal y celebra los logros.' },
      { title: 'Sesiones cortas', description: '5 minutos al día son suficientes para ver mejoras en 3-4 semanas.' },
      { title: 'Edad recomendada por ejercicio', description: 'Sabrás exactamente por dónde empezar según la edad de tu peque.' },
    ],
    whatYouGet: [
      'PDF de 22 páginas con ilustraciones',
      'Tabla de seguimiento imprimible',
      'Guía para padres sin formación',
      'Descarga inmediata',
    ],
    audience: [
      'Familias con peques de 3 a 6 años que tienen articulación poco clara',
      'Padres de niños con rotacismo (dificultad con la R) o dislalias en fonemas fricativos',
      'Maestras de infantil que quieren trabajar la musculatura orofacial en grupo',
    ],
    faqs: [
      {
        q: '¿A qué edad puedo empezar?',
        a: 'Desde los 2,5-3 años funciona bien el soplo libre (velas, pompas). A partir de los 4 años pueden hacerse los ejercicios de soplo dirigido. Antes de los 2,5 años no recomendamos ejercicios estructurados, solo juegos espontáneos.',
      },
      {
        q: '¿Y si se marea al soplar?',
        a: 'Es normal al principio si hace muchas repeticiones seguidas. Por eso recomendamos sesiones cortas (5 minutos) y con pausas.',
      },
      {
        q: '¿El soplo solo mejora la articulación?',
        a: 'No solo. También mejora la respiración, la capacidad pulmonar, la fuerza de la musculatura orofacial y, en algunos casos, incluso la alimentación (si hay problemas de masticación o babeo).',
      },
    ],
    relatedProductIds: ['fichas-articulacion', 'cuaderno-3-6', 'pack-completo'],
    relatedBlogPosts: [
      { slug: 'ejercicios-de-soplo-para-ninos', title: 'Ejercicios de soplo para niños' },
      { slug: 'praxias-bucofaciales-ninos', title: 'Praxias bucofaciales para niños' },
      { slug: 'como-ensenar-la-r-a-un-nino', title: 'Cómo enseñar la R a un niño' },
    ],
  },

  'pack-completo': {
    seoTitle: 'Pack completo de logopedia infantil: todo para estimular el lenguaje (PDF)',
    seoDescription:
      'Pack completo de material logopédico infantil: fichas de articulación + cuadernos de estimulación 0-3 y 3-6 + kit de soplo + bonus. 28% de descuento sobre compra individual. PDF desde 14,90€.',
    subtitle: 'Todos los recursos con 28% de descuento',
    pageCount: 116,
    longDescription: [
      'Si te gusta lo que hacemos y quieres tener **todo el material de logopedia infantil en casa**, el pack completo es tu mejor opción. Incluye las fichas de articulación, los dos cuadernos de estimulación (0-3 y 3-6 años), el kit de ejercicios de soplo y un bonus: un calendario semanal para organizar el trabajo con tu peque sin frustración.',
      'El pack completo ahorra un **28% respecto a la compra individual** de cada recurso (20,60€ → 14,90€) y te da una biblioteca de logopedia infantil que cubre desde el primer balbuceo (0 meses) hasta la entrada a primaria (6 años). Es el material que usarías si tu logopeda te encargara "qué hacer en casa" durante un año entero.',
      'Es especialmente útil si: tienes más de un peque (te cubre distintas edades), tu hijo tiene varias áreas a trabajar (articulación + vocabulario + soplo), o quieres invertir una sola vez y tener material para años. También si eres profesional (logopeda o maestra) que busca material variado para trabajar con diferentes niños.',
      'Cada recurso incluido es el mismo que vendemos individualmente. No hay material "de relleno" ni versiones reducidas: recibes los 4 PDFs completos más el bonus del calendario semanal.',
      'El **calendario semanal bonus** es una plantilla imprimible para organizar las actividades de tu peque por días de la semana. Incluye una propuesta de "plan tipo" para distintos perfiles (peque con dificultades de articulación, con vocabulario escaso, con retraso leve del lenguaje, preparación para lectoescritura). Es exactamente lo que decimos a las familias en consulta: "hagan X los lunes, Y los miércoles, Z los viernes", pero ya hecho.',
      'La descarga es **inmediata** tras la compra. Recibes todos los PDFs en tu correo y puedes descargarlos desde la página de confirmación. El pack no caduca, no tiene suscripción y las actualizaciones son gratuitas (cuando mejoramos algún recurso, te llega la nueva versión por email).',
    ],
    features: [
      { title: 'Pack de fichas de articulación', description: '30 fichas imprimibles por fonema (34 páginas).' },
      { title: 'Cuaderno de estimulación 0-3 años', description: '20 actividades organizadas por edad (28 páginas).' },
      { title: 'Cuaderno de estimulación 3-6 años', description: '20 actividades en 4 bloques (32 páginas).' },
      { title: 'Kit de ejercicios de soplo', description: '15 ejercicios progresivos con materiales caseros (22 páginas).' },
      { title: 'BONUS: Calendario semanal', description: 'Plantilla para organizar el trabajo por días de la semana.' },
      { title: 'Actualizaciones gratuitas', description: 'Cuando mejoramos un recurso, recibes la nueva versión.' },
    ],
    whatYouGet: [
      '4 PDFs principales (116 páginas totales)',
      'Plantilla de calendario semanal (bonus)',
      'Acceso perpetuo y actualizaciones gratis',
      'Soporte por email si tienes dudas de uso',
    ],
    audience: [
      'Familias con más de un peque en edades diferentes',
      'Familias con peques que tienen varias áreas a trabajar (articulación + vocabulario + soplo)',
      'Maestras y logopedas que quieren una biblioteca de referencia a mano',
    ],
    faqs: [
      {
        q: '¿El pack es mejor que comprar los recursos sueltos?',
        a: 'Si vas a usar 2 o más de los recursos, sí — te sale un 28% más barato. Si solo quieres trabajar un área concreta (solo soplo, por ejemplo), mejor el recurso individual.',
      },
      {
        q: '¿Cuándo recibo los archivos?',
        a: 'Inmediatamente tras la compra. Recibes un email con el enlace y también puedes descargarlos desde la página de confirmación.',
      },
      {
        q: '¿Hay alguna novedad que no esté incluida?',
        a: 'No. El pack siempre incluye todo el material premium que tenemos publicado. Los nuevos recursos que lancemos se añadirán automáticamente al pack y los recibirás gratis.',
      },
    ],
    relatedProductIds: ['guia-dislexia', 'guia-tartamudez'],
    relatedBlogPosts: [
      { slug: 'estimulacion-del-lenguaje-en-casa', title: 'Estimulación del lenguaje en casa' },
      { slug: 'ejercicios-lenguaje-para-casa', title: '5 ejercicios de lenguaje para casa' },
      { slug: 'logopedia-online-como-funciona', title: 'Logopedia online: cómo funciona' },
    ],
  },

  'guia-dislexia': {
    seoTitle: 'Guía de dislexia en niños: detección, ejercicios y adaptaciones escolares',
    seoDescription:
      'Guía completa de dislexia infantil: cómo detectarla, qué ejercicios hacer en casa, adaptaciones escolares y checklist para tutores. PDF imprimible diseñado por logopedas.',
    subtitle: 'Detección, ejercicios y adaptaciones para el cole',
    pageCount: 42,
    longDescription: [
      'La dislexia afecta a entre un 5 y un 10% de la población infantil, pero sigue siendo uno de los trastornos de aprendizaje peor comprendidos. Muchas familias pasan años pensando que su hijo "no se esfuerza lo suficiente" o que "ya espabilará", cuando en realidad necesita un enfoque distinto — y pautas concretas que pueden marcar la diferencia en cómo vive su etapa escolar.',
      'Esta **guía de dislexia infantil** está pensada para familias que sospechan que su peque puede tener dislexia, o que ya tienen un diagnóstico y no saben por dónde empezar. También es útil para maestras y tutores que quieren entender mejor cómo funciona la dislexia y cómo adaptar el aula.',
      'La guía arranca con la detección. Explicamos cómo se manifiesta la dislexia a distintas edades: qué señales buscar a los 4-5 años (antes del aprendizaje formal de la lectura), qué síntomas aparecen en primero y segundo de primaria, y qué observar en cursos superiores. Incluimos un checklist claro por edad para que sepas si lo que observas es típico de dislexia o puede ser otra cosa.',
      'Después nos centramos en los **ejercicios multisensoriales** — la base del abordaje con evidencia científica más sólida en dislexia. Te explicamos qué es el método Orton-Gillingham, por qué funciona y te damos 15 actividades concretas para trabajar en casa: conciencia fonológica, asociación fonema-grafema, vocabulario visual, fluidez lectora. No son actividades "milagro": son las que realmente se usan en intervención.',
      'El siguiente bloque es sobre **adaptaciones escolares**. Esta es la parte que más suele pedir ayuda: ¿qué derecho tiene mi hijo? ¿qué puedo pedir al cole? ¿qué adaptaciones funcionan de verdad y cuáles son puro paripé? Incluimos una carta tipo para solicitar adaptaciones al centro, un listado de adaptaciones razonables y no razonables, y cómo documentar todo para no quedar indefensa si el cole se resiste.',
      'Cerramos con un bloque sobre el **impacto emocional** de la dislexia. Los niños con dislexia no diagnosticada o no atendida tienen más riesgo de baja autoestima, ansiedad escolar y abandono temprano. Damos pautas concretas para proteger la autoestima del peque mientras se trabaja lo académico — porque ningún aprendizaje cuaja si el niño ha perdido la confianza en sí mismo.',
      'La guía es un material que queremos que uses como referencia durante años: desde la primera sospecha hasta la preparación de cada curso escolar.',
    ],
    features: [
      { title: 'Checklist por edad', description: 'Señales de dislexia a los 4-5, 6-7 y 8+ años.' },
      { title: '15 ejercicios multisensoriales', description: 'Basados en el método Orton-Gillingham con evidencia científica.' },
      { title: 'Carta tipo para el cole', description: 'Plantilla editable para solicitar adaptaciones escolares.' },
      { title: 'Guía de adaptaciones razonables', description: 'Qué pedir y cómo, con base legal.' },
      { title: 'Pautas de acompañamiento emocional', description: 'Proteger la autoestima mientras se trabaja lo académico.' },
    ],
    whatYouGet: [
      'PDF de 42 páginas',
      'Checklist imprimible de señales por edad',
      'Carta tipo editable para el centro escolar',
      'Registro de ejercicios multisensoriales',
    ],
    audience: [
      'Familias que sospechan dislexia en su peque',
      'Familias con diagnóstico reciente que no saben por dónde empezar',
      'Maestras y tutores que quieren adaptar el aula con criterio',
      'Logopedas y pedagogos que buscan material estructurado para familias',
    ],
    faqs: [
      {
        q: '¿Sirve si mi peque aún no está diagnosticado?',
        a: 'Sí. De hecho, es una de las mejores maneras de ordenar tus sospechas antes de ir al profesional. Te damos criterios claros para saber si vale la pena pedir una valoración.',
      },
      {
        q: '¿Los ejercicios sustituyen a la logopedia?',
        a: 'No. La dislexia se trabaja con intervención especializada. Los ejercicios son un apoyo en casa muy útil, pero no reemplazan el trabajo semanal con un profesional.',
      },
      {
        q: '¿Incluye adaptaciones para la ESO?',
        a: 'Sí. El bloque de adaptaciones cubre desde infantil hasta secundaria, con énfasis en los cursos más demandantes (4º-6º primaria y 1º ESO).',
      },
    ],
    relatedProductIds: ['cuaderno-3-6', 'pack-completo'],
    relatedBlogPosts: [
      { slug: 'dislexia-en-ninos-como-detectarla', title: 'Dislexia en niños: cómo detectarla a tiempo' },
      { slug: 'conciencia-fonologica-actividades', title: 'Conciencia fonológica: actividades' },
      { slug: 'atencion-temprana-que-es', title: 'Atención temprana: qué es y cuándo' },
    ],
  },

  'guia-tartamudez': {
    seoTitle: 'Guía de tartamudez infantil: tipos, ejercicios de fluidez y cuándo consultar',
    seoDescription:
      'Guía completa de tartamudez infantil para familias: tipos, qué hacer en casa, ejercicios de fluidez, cuándo consultar con un logopeda. PDF imprimible diseñado por logopedas.',
    subtitle: 'Para familias que quieren ayudar sin empeorar',
    pageCount: 38,
    longDescription: [
      'La tartamudez infantil es una de las dificultades del habla que más angustia genera en las familias — precisamente porque nadie nos ha enseñado qué hacer cuando un niño empieza a bloquearse al hablar. Y lo primero que hacemos suele ser exactamente lo que menos ayuda: completarle las frases, pedirle que respire hondo, decirle "habla despacio". Bien intencionado, pero contraproducente.',
      'Esta **guía de tartamudez infantil** nace de una necesidad que vemos en consulta todos los meses: familias asustadas que llegan con información contradictoria de internet y con un peque que va bloqueándose cada vez más. La guía está escrita para que, después de leerla, sepas exactamente qué hacer, qué no hacer y cuándo es momento de buscar ayuda profesional.',
      'Arrancamos explicando los **tipos de tartamudez**. No toda disfluencia es tartamudez patológica: entre los 2 y los 5 años, un porcentaje altísimo de niños atraviesan una fase de **disfluencia evolutiva** perfectamente normal que se resuelve sola. La distinguimos de la tartamudez persistente, que sí requiere intervención, con una tabla de señales clara y sin alarmismo.',
      'El segundo bloque es el más práctico: **qué hacer y qué no hacer en casa**. Incluimos las 10 pautas clave que usamos en terapia indirecta (la que trabajamos con las familias, no con el niño). Son cosas tipo "baja tu velocidad de habla cuando hables con tu peque", "deja pausas claras entre turnos", "mantén el contacto visual incluso cuando se bloquea". Parecen pequeños cambios, pero cuando una familia los aplica con constancia, el niño nota el cambio y su fluidez mejora.',
      'Después entramos en los **ejercicios de fluidez** directa. Son actividades pensadas para niños de 4 años en adelante — antes no se trabaja directamente con el niño, solo con la familia. Juegos de ritmo, actividades de respiración-habla, lectura compartida con patrones de fluidez. Todo explicado paso a paso.',
      'Un bloque especialmente útil es el de **cómo hablar con el cole**. La tartamudez puede convertirse en una fuente de burlas si el cole no la gestiona bien. Incluimos una carta modelo para el tutor, pautas específicas para el aula y un protocolo de actuación si hay burlas.',
      'Cerramos con **cuándo consultar con un logopeda**. No todo pide intervención profesional inmediata — pero sí hay criterios claros (duración, frecuencia, reacciones emocionales del peque, antecedentes familiares) que marcan el momento de pedir valoración. La guía te da esos criterios para que no llegues ni demasiado pronto ni demasiado tarde.',
    ],
    features: [
      { title: 'Tipos de tartamudez explicados', description: 'Distingue la disfluencia evolutiva normal de la persistente.' },
      { title: '10 pautas para familias', description: 'Terapia indirecta: lo que los logopedas enseñamos a los padres.' },
      { title: 'Ejercicios de fluidez directa', description: 'Para niños de 4+ años, con progresión clara.' },
      { title: 'Carta tipo para el cole', description: 'Plantilla editable para informar al tutor y al aula.' },
      { title: 'Criterios de consulta profesional', description: 'Sabrás cuándo pedir valoración sin alarmismo ni tardanza.' },
    ],
    whatYouGet: [
      'PDF de 38 páginas',
      'Tabla de tipos de disfluencia',
      'Plantilla editable para el centro escolar',
      'Registro de ejercicios y progreso',
    ],
    audience: [
      'Familias con peques de 2-8 años que han empezado a tartamudear',
      'Familias con tartamudez persistente buscando orientación complementaria',
      'Maestras y tutores que quieren gestionar bien un alumno con tartamudez',
    ],
    faqs: [
      {
        q: 'Mi hijo de 3 años tartamudea, ¿debo preocuparme?',
        a: 'Probablemente no — entre los 2 y los 5 años es muy común una fase de disfluencia evolutiva. La guía te da criterios claros para distinguir lo normal de lo preocupante. Si cumple varios criterios de "persistente", recomendamos valoración.',
      },
      {
        q: '¿Qué hago si se burlan de él en el cole?',
        a: 'Hay un bloque específico sobre esto con un protocolo paso a paso y una carta tipo para el tutor. Lo mejor es actuar pronto, con el cole como aliado.',
      },
      {
        q: '¿Puedo hacer los ejercicios sin ser logopeda?',
        a: 'Los ejercicios de terapia indirecta (con la familia) sí. Los ejercicios directos con el niño son como apoyo al trabajo del logopeda, no sustituto.',
      },
    ],
    relatedProductIds: ['cuaderno-3-6', 'pack-completo'],
    relatedBlogPosts: [
      { slug: 'tartamudez-infantil-cuando-preocuparse', title: 'Tartamudez infantil: cuándo es normal' },
      { slug: 'mi-hijo-no-habla-cuando-preocuparse', title: 'Mi hijo no habla: señales de alerta' },
      { slug: 'logopedia-online-como-funciona', title: 'Logopedia online: cómo funciona' },
    ],
  },
};

export function getProductContent(id: string): ProductContent | undefined {
  return productsContent[id];
}
