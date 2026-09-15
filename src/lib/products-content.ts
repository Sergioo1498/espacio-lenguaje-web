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
  /** Bloque "Qué incluye / Qué NO incluye" — transparencia que previene Nuria 2.0 */
  whatIncludes?: string[];
  whatDoesNotInclude?: string[];
  /** Filtros honestos: "este producto NO es para ti si..." */
  notForYouIf?: string[];
  /** Aviso importante visible arriba (riesgo de malentendido / disclaimer clínico) */
  importantNotice?: string;
}

export const productsContent: Record<string, ProductContent> = {
  'fichas-articulacion': {
    seoTitle: 'Fichas de logopedia para imprimir: pack de articulación (30 fichas)',
    seoDescription:
      'Pack de 30 fichas de logopedia imprimibles con ejercicios de articulación por fonema. Material diseñado por logopedas para trabajar la pronunciación en casa. PDF por 4,90 €.',
    subtitle: 'Material imprimible de articulación, fonema por fonema',
    pageCount: 34,
    longDescription: [
      'Si tu peque dice "toche" en vez de "coche", o se come las eses, o la R todavía no le sale, no estás sola. Las dificultades de articulación son una de las consultas más frecuentes en logopedia infantil, y la mayoría se trabajan con ejercicios repetidos, estructurados y progresivos.',
      'Este pack de **30 fichas de logopedia imprimibles** está diseñado exactamente para eso: darte un material ordenado por fonema, con instrucciones claras para padres y madres sin formación en logopedia. No necesitas saber qué es un punto de articulación ni un fonema fricativo — las fichas guían paso a paso la actividad.',
      'Cada ficha trabaja un fonema concreto (R, S, L, K, CH, Z, entre otros), con palabras organizadas por posición (inicial, media y final cuando corresponde), pictogramas y silabario. La guía de uso propone sesiones de 5-10 minutos.',
      'El material es el mismo tipo de ficha que usamos en consulta: el soporte visual ayuda al niño a anclar el sonido correcto, y las instrucciones para el adulto evitan errores comunes (corregir directamente, forzar la pronunciación, repetir demasiado). Si tu peque lleva meses con un mismo error de articulación, un trabajo sistemático en casa puede marcar una diferencia real en semanas.',
      'Es un material complementario al trabajo de logopedia, no sustitutivo. Si el problema persiste, siempre recomendamos valoración profesional. Pero para la mayoría de dislalias evolutivas leves, este tipo de práctica estructurada en casa funciona muy bien.',
    ],
    features: [
      {
        "title": "30 fichas imprimibles",
        "description": "Una por fonema o grupo consonántico, con pictogramas y palabras por posición."
      },
      {
        "title": "Instrucciones para adultos",
        "description": "Guía de uso y, en cada ficha, edad esperada y posición articulatoria."
      },
      {
        "title": "Silabario de práctica",
        "description": "Sílabas de práctica para cada fonema o grupo consonántico."
      },
      {
        "title": "PDF A4 de 34 páginas",
        "description": "30 fichas, portada, guía de uso, referencias y registro de progreso."
      },
      {
        "title": "5 referencias",
        "description": "Una página con las referencias del material."
      },
      {
        "title": "Registro de progreso",
        "description": "Tabla de 30 filas con fecha, conseguido y observaciones."
      }
    ],
    whatYouGet: [
      "PDF de 34 páginas (30 fichas + portada + guía + referencias + registro)",
      "Descarga inmediata tras la compra",
      "Uso ilimitado en tu familia o aula",
      "Actualizaciones gratuitas si mejoramos el pack"
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
        a: 'No. El pack incluye una guía de uso, y cada ficha indica la edad esperada, la posición articulatoria y el silabario.',
      },
      {
        q: '¿Cuántas fichas se pueden hacer al día?',
        a: 'La guía propone trabajar un fonema cada vez en sesiones de 5-10 minutos. Lo importante es la constancia, no el volumen.',
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
    pageCount: 32,
    ageRange: '0-3 años',
    whatIncludes: [
      '20 actividades distribuidas en 5 bloques por edad (0-6m, 6-12m, 12-18m, 18-24m, 2-3 años)',
      'Cada actividad con: materiales necesarios, duración, 5 pasos concretos, qué desarrolla, variantes fáciles y difíciles',
      'Señales de alerta por edad (cuándo conviene consultar con logopeda)',
      'Base teórica: programa Hanen, lectura dialógica (Whitehurst), estimulación focalizada (Girolametto)',
      'Referencias clínicas completas al final',
    ],
    whatDoesNotInclude: [
      'NO es un programa de terapia (es estimulación natural, no intervención clínica)',
      'NO incluye fichas visuales ni pictogramas imprimibles para el peque (es guía para el adulto)',
      'NO sustituye valoración profesional si detectas señales de alerta',
    ],
    notForYouIf: [
      'Tu peque tiene más de 3 años (mira el Cuaderno 3-6)',
      'Buscas un programa de terapia estructurada con sesiones formales',
      'Esperas láminas para el peque (este cuaderno es para guiar al adulto en interacciones cotidianas)',
    ],
    longDescription: [
      'Los tres primeros años son la ventana de oportunidad más importante para el desarrollo del lenguaje. No se trata de "enseñar" a hablar — los bebés aprenden el idioma por exposición e interacción — pero sí podemos crear el entorno perfecto para que esa maquinaria se active con fuerza.',
      'Este **cuaderno de estimulación del lenguaje 0-3 años** está pensado para padres y madres que quieren aprovechar esos primeros años con actividades concretas, adaptadas a cada franja de edad, sin necesidad de materiales especiales ni formación previa. Son 20 actividades estructuradas, probadas por logopedas y organizadas en cinco bloques: 0-6 meses, 6-12 meses, 12-18 meses, 18-24 meses y 2-3 años.',
      'En el bloque de 0 a 12 meses encontrarás rutinas para favorecer el contacto visual, la atención conjunta, el balbuceo y la respuesta a sonidos. Nada de "flashcards" ni pantallas: actividades pensadas para integrar en la rutina (baño, comida, cambio de pañal) y que se apoyan en lo que los bebés adoran — la voz de mamá y papá, la imitación y los juegos de cara a cara.',
      'Entre los 12 y 24 meses entramos en la explosión del vocabulario. El cuaderno propone actividades para ampliar léxico, iniciar combinaciones de dos palabras y reforzar comprensión (que suele ir siempre por delante de la expresión). Incluye pautas claras sobre qué esperar y qué no — muy útil para familias que se comparan con otros niños y viven con angustia cada "retraso aparente".',
      'De 24 a 36 meses el foco está en construir frases, seguir narrativas sencillas, jugar simbólicamente y trabajar las primeras preguntas ("¿qué?", "¿dónde?"). Cada actividad incluye instrucciones y variaciones para adaptar la propuesta.',
      'El cuaderno es un **compañero de ruta para los tres primeros años**, no un método cerrado. Úsalo cuando tengas dudas, cuando busques ideas nuevas, o simplemente cuando quieras tener la tranquilidad de que estás acompañando bien el desarrollo del lenguaje de tu peque.',
    ],
    features: [
      {
        "title": "20 actividades estructuradas",
        "description": "Organizadas en cinco bloques: 0-6m, 6-12m, 12-18m, 18-24m y 2-3 años."
      },
      {
        "title": "Materiales cotidianos",
        "description": "Materiales necesarios indicados en cada actividad."
      },
      {
        "title": "Instrucciones paso a paso",
        "description": "Cada actividad incluye cómo hacerla, qué desarrolla y variaciones."
      },
      {
        "title": "Señales de alerta por edad",
        "description": "Apartado de señales de alerta organizado por franjas de edad."
      },
      {
        "title": "Duración por actividad",
        "description": "Tiempo orientativo indicado en cada propuesta."
      }
    ],
    whatYouGet: [
      "PDF de 32 páginas en A4",
      "20 actividades en cinco bloques por edad",
      "Listado de señales de alerta por edad y referencias",
      "Descarga inmediata y acceso perpetuo"
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
    pageCount: 31,
    ageRange: '3-6 años',
    whatIncludes: [
      '20 actividades en 5 bloques (conciencia fonológica, vocabulario, narrativa, articulación, comprensión)',
      'Cada actividad con instrucciones paso a paso, materiales caseros, duración, qué desarrolla',
      'Sesiones cortas (5-10 min) integrables en rutinas cotidianas (baño, cena, paseo)',
      'Principios pedagógicos: juego primero, modelado antes que corrección, vocabulario contextualizado',
      'Pensado para prepararse para la lectoescritura (4-6 años)',
    ],
    whatDoesNotInclude: [
      'NO es un programa de terapia (es estimulación general, no intervención clínica)',
      'NO incluye fichas visuales con pictogramas para el peque (es guía para el adulto)',
      'NO trabaja un fonema concreto si tu peque tiene dislalia (necesita logopeda + fichas específicas)',
    ],
    notForYouIf: [
      'Tu peque tiene menos de 3 años (mira el Cuaderno 0-3)',
      'Buscas láminas para que el peque coloree o señale (esto guía actividades para el adulto)',
      'Necesitas un plan personalizado para una dificultad concreta (necesitas logopeda)',
    ],
    longDescription: [
      'Entre los 3 y los 6 años el lenguaje de un peque da un salto espectacular: pasa de frases de 3-4 palabras a conversaciones completas, construye narrativas, hace preguntas abstractas y empieza a prepararse para la lectoescritura. Es también la etapa en que más errores de articulación "se limpian" y donde la conciencia fonológica — clave para aprender a leer — se desarrolla.',
      'Este **cuaderno de logopedia 3-6 años** está organizado en cinco bloques: conciencia fonológica, vocabulario, narrativa, articulación y comprensión. Son 20 actividades progresivas diseñadas por logopedas que trabajan a diario con esta franja de edad.',
      'En el bloque de vocabulario encontrarás juegos para ampliar léxico por campos semánticos (animales, familia, emociones, alimentos), trabajar antónimos y categorizar. El vocabulario receptivo y expresivo a los 4-5 años es uno de los predictores más potentes del rendimiento escolar posterior.',
      'El bloque de articulación reúne cuatro actividades: trabalenguas suaves, pares mínimos, repetición de pseudopalabras y detective de sonidos.',
      'El bloque de narrativa propone inventar finales, ordenar secuencias, contar qué hizo hoy y crear historias a partir de imágenes. El de comprensión incluye instrucciones de tres pasos, absurdos verbales, preguntas sobre cuentos y verdadero o falso.',
      'El bloque de conciencia fonológica incluye juegos de rimas, conteo de sílabas, búsqueda de palabras por sonido inicial y cadenas de palabras.',
      'El cuaderno está pensado para familias y también para aulas de infantil. Es un material que acompaña los últimos dos años de educación infantil y la transición a primaria con bases firmes.',
    ],
    features: [
      {
        "title": "20 actividades en 5 bloques",
        "description": "Conciencia fonológica, vocabulario, narrativa, articulación y comprensión."
      },
      {
        "title": "Variaciones por dificultad",
        "description": "Opciones más fáciles y más difíciles en las actividades."
      },
      {
        "title": "Materiales cotidianos",
        "description": "Indicaciones para preparar cada juego con objetos e imágenes de casa."
      },
      {
        "title": "Conciencia fonológica",
        "description": "Cuatro actividades: rimas, sílabas, sonido inicial y cadena de palabras."
      },
      {
        "title": "Guía para el adulto",
        "description": "Materiales, instrucciones paso a paso y qué desarrolla cada actividad."
      }
    ],
    whatYouGet: [
      "PDF de 31 páginas",
      "20 actividades en cinco áreas del lenguaje",
      "Guía de uso e instrucciones paso a paso",
      "Variaciones por actividad y referencias"
    ],
    audience: [
      'Familias con peques de 3 a 6 años',
      'Maestras de infantil (último ciclo) y primaria (primero)',
      'Logopedas que quieren material extra de trabajo en casa',
    ],
    faqs: [
      {
        q: '¿Cubre la preparación para la lectoescritura?',
        a: 'Sí. El bloque de conciencia fonológica es exactamente lo que los niños necesitan dominar antes de aprender a leer. Es la misma progresión que trabajamos en estimulación del lenguaje en casa.',
      },
      {
        q: '¿Mi peque tiene TEL, ¿le sirve?',
        a: 'Este cuaderno NO sustituye la intervención logopédica en TEL. Es un material de refuerzo general que puede usarse en casa como apoyo, siempre bajo el plan principal de la logopeda responsable del caso.',
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
      '15 ejercicios progresivos de respiración y soplo con materiales caseros. Pensados para juego compartido, control respiratorio y apoyo en casos específicos (respiración bucal persistente, deglución atípica) bajo indicación profesional.',
    subtitle: '15 ejercicios progresivos con materiales de casa',
    pageCount: 25,
    importantNotice:
      'Este kit trabaja respiración funcional, control del aire y juego compartido. NO corrige problemas de articulación (la evidencia actual — ASHA 2013, Lof & Watson 2008 — no respalda que el soplo mejore la pronunciación de fonemas). Si tu peque tiene dislalia o dificultades para pronunciar sonidos, necesita valoración con logopeda colegiada, no este kit.',
    whatIncludes: [
      '15 ejercicios de soplo y respiración funcional, organizados de fácil a difícil',
      'Materiales caseros para cada ejercicio (velas, pompas, pajitas, plumas, algodones)',
      'Edad recomendada por ejercicio (desde 2,5 años hasta 6+)',
      'Tabla de seguimiento semanal imprimible',
      'Guía para padres sin formación logopédica',
      'Disclaimer clínico honesto sobre qué SÍ y qué NO trabaja el soplo',
    ],
    whatDoesNotInclude: [
      'NO es un tratamiento para corregir errores de pronunciación',
      'NO sustituye una valoración o intervención logopédica',
      'NO incluye plan personalizado para tu peque concreto',
      'NO incluye fichas de articulación ni pictogramas (eso son otros productos)',
    ],
    notForYouIf: [
      'Tu peque tiene dislalia o no pronuncia bien varios sonidos — necesita logopeda colegiada, no soplo',
      'Esperas un programa de terapia estructurada con resultados garantizados',
      'Tu peque tiene menos de 2,5 años (los ejercicios estructurados aún no aplican)',
    ],
    longDescription: [
      'El soplo y la respiración funcional son áreas en las que muchas familias quieren acompañar a su peque: ya sea porque disfrutan del juego compartido con pompas y molinillos, porque la logopeda les ha pedido trabajar la respiración en casa, o porque quieren tener actividades estructuradas que involucren consciencia oral sin pantallas.',
      'Este **kit de ejercicios de soplo para niños** recopila 15 actividades organizadas por **dificultad progresiva**: empezamos con soplo libre (soplar velas, pompas, plumas), pasamos a soplo dirigido (guiar una pelotita por un circuito, hacer volar papeles), y terminamos con soplo controlado (soplo sostenido, intercalar inspiración y espiración, jugar con silbatos). Son propuestas de juego compartido entre peque y adulto de referencia.',
      '**Aviso importante sobre evidencia**: la investigación actual (ASHA 2013; Lof & Watson 2008) **no respalda** que los ejercicios de soplo mejoren directamente la articulación de fonemas (/s/, /f/, /ch/, /z/, /r/). Si tu peque tiene dificultades específicas de pronunciación, esas dificultades requieren trabajo fonético específico supervisado por una logopeda colegiada — no se resuelven soplando. El kit no promete mejorar la articulación.',
      '¿Entonces para qué sirve este material? Está pensado para: (1) **juego compartido** entre peque y adulto, con actividades estructuradas que no dependen de pantallas; (2) **control respiratorio** de forma lúdica (inspiración-espiración conscientes, sostenimiento del flujo, graduación de intensidad); (3) **apoyo complementario en casos de respiración bucal persistente o deglución atípica**, siempre bajo indicación profesional previa; (4) **consciencia oral** (notar cómo se coloca la boca, sentir el aire, regular la fuerza del soplo).',
      'Cada actividad incluye: material necesario (todo casero), edad recomendada, objetivo funcional, pasos claros para el adulto y una variante más fácil y otra más difícil. También incluye una **tabla de seguimiento** semanal y orientaciones sobre el mejor momento del día para jugar (cuando el peque está descansado y con atención disponible).',
      'Si una logopeda está llevando el caso de tu peque, comparte el kit con ella antes de introducirlo: podrá indicarte qué ejercicios encajan con el plan y cuáles conviene dejar de lado. Este kit es un complemento lúdico, nunca un sustituto de intervención profesional.',
    ],
    features: [
      { title: '15 ejercicios progresivos', description: 'De soplo libre a soplo controlado, con variantes por dificultad.' },
      { title: 'Material casero', description: 'Velas, pompas, pajitas, plumas, algodones. Todo lo tienes en casa.' },
      { title: 'Tabla de seguimiento', description: 'Registra el progreso semanal y celebra los logros.' },
      { title: 'Enfoque de juego compartido', description: 'Actividades para hacer con el adulto de referencia. Enfoque de control respiratorio y consciencia oral, no de mejora articulatoria.' },
      { title: 'Edad recomendada por ejercicio', description: 'Sabrás exactamente por dónde empezar según la edad de tu peque.' },
    ],
    whatYouGet: [
      "PDF de 25 páginas con ilustraciones",
      "15 ejercicios y tabla de seguimiento semanal imprimible",
      "Guía para padres y referencias",
      "Descarga inmediata"
    ],
    audience: [
      'Familias que buscan actividades de juego compartido con control respiratorio',
      'Familias con indicación profesional de trabajar respiración bucal persistente o deglución atípica en casa',
      'Maestras de infantil que quieren propuestas de respiración y consciencia oral en grupo',
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
        q: '¿Este kit mejora la articulación de fonemas como la /s/, /f/, /ch/, /z/ o /r/?',
        a: 'No de forma directa. La evidencia actual (ASHA 2013, Lof & Watson 2008) no respalda que los ejercicios de soplo mejoren la articulación de fonemas. El control respiratorio sí tiene indicación en casos específicos (respiración bucal persistente, deglución atípica), pero las dificultades de articulación requieren trabajo fonético específico supervisado por una logopeda colegiada.',
      },
      {
        q: '¿Para qué sí sirve realmente el kit?',
        a: 'Para juego compartido entre peque y adulto, para actividades de control respiratorio lúdico, como apoyo complementario en casos de respiración bucal persistente o deglución atípica (siempre bajo indicación profesional) y para trabajar consciencia oral de forma divertida.',
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
      'Pack completo de material logopédico infantil: fichas de articulación + cuadernos de estimulación 0-3 y 3-6 + kit de soplo. 28% de descuento sobre compra individual. PDF desde 14,90€.',
    subtitle: 'Cuatro recursos con 28% de descuento',
    pageCount: 123,
    longDescription: [
      'Si te gusta lo que hacemos y quieres tener **cuatro recursos de logopedia infantil en casa**, el pack completo es tu mejor opción. Incluye las fichas de articulación, los dos cuadernos de estimulación (0-3 y 3-6 años), el kit de ejercicios de soplo con sus tablas de seguimiento incluidas.',
      'El pack completo ahorra un **28% respecto a la compra individual** de cada recurso (20,60€ → 14,90€) y te da una biblioteca de materiales de lenguaje infantil que cubre desde el primer balbuceo (0 meses) hasta la entrada a primaria (6 años). Son materiales complementarios que pueden formar parte del trabajo en casa, siempre bajo plan profesional si existe intervención clínica.',
      'Es especialmente útil si: tienes más de un peque (te cubre distintas edades), tu hijo tiene varias áreas a trabajar (articulación + vocabulario + soplo), o quieres invertir una sola vez y tener material para años. También si eres profesional (logopeda o maestra) que busca material variado para trabajar con diferentes niños.',
      'Cada recurso incluido es el mismo que vendemos individualmente. No hay material "de relleno" ni versiones reducidas: recibes los 4 PDFs completos y el calendario semanal imprimible como bonus (5 archivos en total).',
      'La descarga es **inmediata** tras la compra. Recibes todos los PDFs en tu correo y puedes descargarlos desde la página de confirmación. El pack no caduca, no tiene suscripción y las actualizaciones son gratuitas (cuando mejoramos algún recurso, te llega la nueva versión por email).',
    ],
    features: [
      {
        "title": "Pack de fichas de articulación",
        "description": "30 fichas, guía, referencias y registro de progreso (34 páginas)."
      },
      {
        "title": "Cuaderno de estimulación 0-3 años",
        "description": "20 actividades en cinco bloques por edad (32 páginas)."
      },
      {
        "title": "Cuaderno de estimulación 3-6 años",
        "description": "20 actividades en cinco áreas del lenguaje (31 páginas)."
      },
      {
        "title": "Kit de ejercicios de soplo",
        "description": "15 ejercicios con materiales caseros y seguimiento semanal (25 páginas). Enfoque de control respiratorio y consciencia oral, no de mejora articulatoria."
      },
      {
        "title": "Registros incluidos",
        "description": "Registro de las fichas y tabla semanal del Kit de Soplo, dentro de sus PDF."
      },
      {
        "title": "Actualizaciones gratuitas",
        "description": "Acceso a las versiones actualizadas de los cuatro recursos incluidos."
      }
    ],
    whatYouGet: [
      "5 PDFs (123 páginas totales)",
      "Calendario semanal imprimible (bonus)",
      "Registro de fichas y tabla semanal de soplo incluidos en sus PDF",
      "Acceso perpetuo y actualizaciones gratis de los recursos incluidos",
      "Soporte por email si tienes dudas de uso"
    ],
    audience: [
      'Familias con más de un peque en edades diferentes',
      'Familias con peques que quieren cubrir varias áreas (articulación, vocabulario, control respiratorio)',
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
        a: 'El pack incluye las fichas, los dos cuadernos y el Kit de Soplo. Las guías de dislexia y tartamudez se venden por separado.',
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
    pageCount: 20,
    whatIncludes: [
      '10 capítulos sobre dislexia infantil',
      'Checklist explícito de detección por etapa con casillas + ficha de observación',
      'Diferencias entre dislexia y otros trastornos (TDAH, TEL, retraso lector)',
      'Adaptaciones escolares concretas para llevar al cole + plantilla de informe para el tutor',
      '10 ejercicios para casa basados en Orton-Gillingham',
      'FAQ + glosario + referencias clínicas',
    ],
    whatDoesNotInclude: [
      'NO es un diagnóstico (solo una valoración profesional puede diagnosticar dislexia)',
      'NO es un programa terapéutico personalizado',
      'NO incluye plan de intervención individualizado para tu peque',
    ],
    notForYouIf: [
      'Tu peque tiene menos de 6 años (la dislexia se diagnostica a partir del aprendizaje lector)',
      'Buscas un diagnóstico clínico (necesitas evaluación neuropsicológica o logopédica)',
      'Necesitas terapia personalizada (necesitas profesional, no una guía)',
    ],
    longDescription: [
      'La dislexia afecta a entre un 5 y un 10% de la población infantil, pero sigue siendo uno de los trastornos de aprendizaje peor comprendidos. Muchas familias pasan años pensando que su hijo "no se esfuerza lo suficiente" o que "ya espabilará", cuando en realidad necesita un enfoque distinto — y pautas concretas que pueden marcar la diferencia en cómo vive su etapa escolar.',
      'Esta **guía de dislexia infantil** está pensada para familias que sospechan que su peque puede tener dislexia, o que ya tienen un diagnóstico y no saben por dónde empezar. También es útil para maestras y tutores que quieren entender mejor cómo funciona la dislexia y cómo adaptar el aula.',
      'La guía arranca con la detección. Explicamos cómo se manifiesta la dislexia a distintas edades: qué señales buscar a los 4-5 años (antes del aprendizaje formal de la lectura), qué síntomas aparecen en primero y segundo de primaria, y qué observar en cursos superiores. Incluimos un checklist claro por edad para que sepas si lo que observas es típico de dislexia o puede ser otra cosa.',
      'Después nos centramos en los **ejercicios multisensoriales** — la base del abordaje con evidencia científica más sólida en dislexia. Te explicamos qué es el método Orton-Gillingham, por qué funciona y te damos 10 actividades concretas para trabajar en casa: conciencia fonológica, asociación fonema-grafema, vocabulario visual, fluidez lectora. No son actividades "milagro": son las que realmente se usan en intervención.',
      'El siguiente bloque es sobre **adaptaciones escolares**. Esta es la parte que más suele pedir ayuda: ¿qué derecho tiene mi hijo? ¿qué puedo pedir al cole? ¿qué adaptaciones funcionan de verdad y cuáles son puro paripé? Incluimos una plantilla imprimible de informe para el tutor, un listado de adaptaciones razonables y no razonables, y cómo documentar todo para no quedar indefensa si el cole se resiste.',
      'Cerramos con un bloque sobre el **impacto emocional** de la dislexia. Los niños con dislexia no diagnosticada o no atendida tienen más riesgo de baja autoestima, ansiedad escolar y abandono temprano. Damos pautas concretas para proteger la autoestima del peque mientras se trabaja lo académico — porque ningún aprendizaje cuaja si el niño ha perdido la confianza en sí mismo.',
      'La guía es un material que queremos que uses como referencia durante años: desde la primera sospecha hasta la preparación de cada curso escolar.',
    ],
    features: [
      {
        "title": "Checklist por etapa",
        "description": "Señales organizadas en preescolar, primaria y secundaria."
      },
      {
        "title": "10 ejercicios para casa",
        "description": "Actividades de lectura, escritura y conciencia fonológica."
      },
      {
        "title": "Informe para el tutor",
        "description": "Plantilla imprimible para rellenar y entregar al centro escolar."
      },
      {
        "title": "Adaptaciones escolares",
        "description": "Apartado sobre adaptaciones y cómo solicitarlas."
      },
      {
        "title": "Acompañamiento familiar",
        "description": "Consejos para casa y respuestas a preguntas frecuentes."
      }
    ],
    whatYouGet: [
      "PDF de 20 páginas",
      "Checklist imprimible de señales por etapa",
      "Plantilla imprimible de informe para el tutor",
      "10 ejercicios para casa, glosario y referencias"
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
    pageCount: 16,
    whatIncludes: [
      '8 capítulos sobre tartamudez infantil',
      'Tabla comparativa: disfluencia evolutiva normal vs tartamudez patológica',
      'Factores de riesgo y predictores',
      'Qué hacer / qué NO hacer (lo más importante de la guía)',
      '8 actividades para hacer en familia (pautas ambientales, no ejercicios de "no tartamudees")',
      'Sección específica para profesores',
      'Criterios clínicos para saber cuándo consultar (programa Lidcombe, evidencia)',
    ],
    whatDoesNotInclude: [
      'NO es un programa de terapia (la tartamudez patológica requiere logopeda colegiada)',
      'NO promete "curar" la tartamudez con ejercicios en casa',
      'NO incluye plan personalizado para tu peque',
    ],
    notForYouIf: [
      'Buscas un protocolo terapéutico tipo Lidcombe (eso lo aplica una logopeda formada)',
      'Esperas ejercicios que "eliminen" la tartamudez (los enfoques actuales trabajan aceptación + fluidez, no eliminación)',
    ],
    longDescription: [
      'La tartamudez infantil es una de las dificultades del habla que más angustia genera en las familias — precisamente porque nadie nos ha enseñado qué hacer cuando un niño empieza a bloquearse al hablar. Y lo primero que hacemos suele ser exactamente lo que menos ayuda: completarle las frases, pedirle que respire hondo, decirle "habla despacio". Bien intencionado, pero contraproducente.',
      'Esta **guía de tartamudez infantil** nace de una necesidad que vemos en consulta todos los meses: familias asustadas que llegan con información contradictoria de internet y con un peque que va bloqueándose cada vez más. La guía está escrita para que, después de leerla, sepas exactamente qué hacer, qué no hacer y cuándo es momento de buscar ayuda profesional.',
      'Arrancamos explicando los **tipos de tartamudez**. No toda disfluencia es tartamudez patológica: entre los 2 y los 5 años, un porcentaje altísimo de niños atraviesan una fase de **disfluencia evolutiva** perfectamente normal que se resuelve sola. La distinguimos de la tartamudez persistente, que sí requiere intervención, con una tabla de señales clara y sin alarmismo.',
      'El segundo bloque es el más práctico: **qué hacer y qué no hacer en casa**. Incluimos un apartado con pautas sobre qué hacer y qué no hacer en casa. Son cosas tipo "baja tu velocidad de habla cuando hables con tu peque", "deja pausas claras entre turnos", "mantén el contacto visual incluso cuando se bloquea". Parecen pequeños cambios, pero cuando una familia los aplica con constancia, el niño nota el cambio y su fluidez mejora.',
      'El capítulo de actividades para casa reúne ocho juegos y pautas ambientales para hacer en familia, con indicaciones de uso.',
      'Un bloque especialmente útil es el de **cómo hablar con el cole**. La tartamudez puede convertirse en una fuente de burlas si el cole no la gestiona bien. Incluimos una sección para profesores con pautas para el aula y orientaciones ante las burlas.',
      'Cerramos con **cuándo consultar con un logopeda**. No todo pide intervención profesional inmediata — pero sí hay criterios claros (duración, frecuencia, reacciones emocionales del peque, antecedentes familiares) que marcan el momento de pedir valoración. La guía te da esos criterios para que no llegues ni demasiado pronto ni demasiado tarde.',
    ],
    features: [
      {
        "title": "Tipos de tartamudez explicados",
        "description": "Tabla comparativa de disfluencia evolutiva y tartamudez."
      },
      {
        "title": "Pautas para familias",
        "description": "Apartado sobre qué hacer y qué no hacer en casa."
      },
      {
        "title": "8 actividades familiares",
        "description": "Juegos y pautas ambientales para casa."
      },
      {
        "title": "Sección para profesores",
        "description": "Pautas para compartir con el centro escolar."
      },
      {
        "title": "Cuándo consultar",
        "description": "Capítulo con criterios para pedir valoración profesional."
      }
    ],
    whatYouGet: [
      "PDF de 16 páginas",
      "Tabla comparativa de disfluencias",
      "Sección para profesores",
      "8 actividades familiares, preguntas frecuentes y referencias"
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
        a: 'La sección para profesores incluye pautas para el aula y orientaciones ante las burlas. Puedes compartirla con el tutor.',
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
