# Fase 2 · Pack de Fichas v4 · 13-sep-2026

## A · Revisión y fuente

| Punto | Resultado y evidencia |
|---|---|
| A1 | Aprobación de Bea sin cambios según el encargo. REVISION_BEA.md y el borrador de fase 1 se conservan como evidencia histórica. |
| A2/A3 | Nueve adiciones en Posición articulatoria, fichas 22-30. text-diff.json detalla antes y añadido. Comparación DOM del borrador vs generación: portada, introducción y restantes campos idénticos. |
| Fuente | Antes: 371b141d81fbed5be6ae7d2abadccb53b2cfa82cff6078087c391e320e33a8cc. Después: d808a1bdc154c7bf4e5e70847379a61e7d7ca8a2de3b8711975a3a6be1e24148. Al retirar solo A2: 371b141d81fbed5be6ae7d2abadccb53b2cfa82cff6078087c391e320e33a8cc. Coincide con antes: true. |

| Ficha | Campo | Añadido |
|---|---|---|
| 22 (crema) | Posición articulatoria | Articula la K y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "ce-rema" en vez de "crema". |
| 23 (dragón) | Posición articulatoria | Articula la D y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "de-ragón" en vez de "dragón". |
| 24 (flor) | Posición articulatoria | Articula la F y pasa enseguida a la L, sin meter una vocal en medio. El error más habitual es decir "fe-lor" en vez de "flor". |
| 25 (fresa) | Posición articulatoria | Articula la F y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "fe-resa" en vez de "fresa". |
| 26 (globo) | Posición articulatoria | Articula la G y pasa enseguida a la L, sin meter una vocal en medio. El error más habitual es decir "ge-lobo" en vez de "globo". |
| 27 (grande) | Posición articulatoria | Articula la G y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "ge-rande" en vez de "grande". |
| 28 (plato) | Posición articulatoria | Articula la P y pasa enseguida a la L, sin meter una vocal en medio. El error más habitual es decir "pe-lato" en vez de "plato". |
| 29 (primo) | Posición articulatoria | Articula la P y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "pe-rimo" en vez de "primo". |
| 30 (tren) | Posición articulatoria | Articula la T y pasa enseguida a la R, sin meter una vocal en medio. El error más habitual es decir "te-ren" en vez de "tren". |

## B · PDF y despliegue

| Punto | Evidencia |
|---|---|
| Generador | scripts/generate-fichas.mjs (git mv del generador v3). Una sola definición de getFichaData en scripts/_fichas-source.mjs; resto son imports/calls. |
| Validación | 34 páginas, A4, 30/30 fichas con Edad esperada, Posición articulatoria y Silabario. pdfinfo.txt y pdffonts.txt: cinco fuentes embebidas. Title: Pack de Fichas de Articulación · v4 con pictogramas. |
| Apertura | PDF leído y renderizado con Poppler; inspección visual de ficha 25 y páginas 33-34 sin cortes ni solapamientos. |
| Pack Completo | Misma ruta /downloads/productos/pack-fichas-articulacion.pdf. Sin copia independiente. |
| Checkout/entrega | delivery-check.json: checkout ejecutado con Stripe simulado, sin cobros ni correos; respuesta 200 y enlaces correctos para ambos packs. Clave local sk_test (valor no registrado). Código de checkout/webhook/Stripe y configuración de protección intactos. No se cambia la configuración remota de Stripe. |
| Antes en producción | HTTP 200; Content-Length 1200652; sha256 85fa4e25f33458825c68bd5f5c5ed18b560fc894351e65f8baf59414b8769c99. |
| cuaderno-estimulacion-0-3.pdf | HTTP 200; Content-Length 3964846; sha256 f5616b46a0460ae409fff9a88fa97209fac565348cc7980f3fd9a5ac2e5f25cd; coincide local: true. |
| cuaderno-estimulacion-3-6.pdf | HTTP 200; Content-Length 3514979; sha256 4306c686a4a43af88da0db884346b580d84434a265eedd4f0b53e039aa5cdd8d; coincide local: true. |
| guia-dislexia.pdf | HTTP 200; Content-Length 2236445; sha256 9fdea8941e7f73967ddb2da42b4afd158864bf6902f432b7c1588b5bc19ce78b; coincide local: true. |
| guia-tartamudez.pdf | HTTP 200; Content-Length 2200989; sha256 d9f89be0d913438e4032ed94b4358850872a58915e6a18fd5933c3e6bf150c5d; coincide local: true. |
| kit-ejercicios-soplo.pdf | HTTP 200; Content-Length 11168387; sha256 806c5b0e3fb08bfc4d0f930b3d6538039dfb03342c9921e2d09910884c76fb5e; coincide local: true. |
| pack-fichas-articulacion.pdf | HTTP 200; Content-Length 1345438; sha256 f6fecf48756b6daaf6cd1fc9d9fe778436af96e7040d483519f5405489ca305b; coincide local: true. |
| Regresión | Los otros cinco PDF son idénticos antes/después (baseline.json, verification.json, live-after.json). El encargo habla de seis adicionales: hay seis PDF totales y siete productos; el Pack Completo agrupa cuatro, sin PDF propio. No se inventa un séptimo entregable. |

### Extracción literal de pdftotext: fichas 1, 15 y 25; páginas 33-34

```text
PÁGINA 3
                                                           FICHA 01




                                                             P
                                                      Edad esperada: 3 años



   Posición articulatoria: Labios cerrados, se abren de golpe expulsando aire seco. Sin vibración de la
   garganta.




                 INICIO                                      MEDIO                           FINAL




              PATO                                         MAPA                           STOP




                                                           Silabario:

                                    PA · P E · P I · P O · P U

Pictogramas: Arasaac · Gobierno de Aragón · CC BY-NC-SA                                       www.espaciolenguaje.com


PÁGINA 17
                                                           FICHA 15




                                                             J
                                                      Edad esperada: 4 años



   Posición articulatoria: Parte trasera de la lengua se acerca al paladar blando sin tocarlo, el aire sale con
   fricción seca.




                 INICIO                                      MEDIO                              FINAL




            JIRAFA                                          OJO                             RELOJ




                                                           Silabario:

                                     JA · JE · JI · JO · JU

Pictogramas: Arasaac · Gobierno de Aragón · CC BY-NC-SA                                          www.espaciolenguaje.com


PÁGINA 27
                                                           FICHA 25




                                                          FR
                                                     Edad esperada: 6-7 años



   Posición articulatoria: F seguida inmediatamente de R suave. Articula la F y pasa enseguida a la R, sin
   meter una vocal en medio. El error más habitual es decir "fe-resa" en vez de "fresa".




                 INICIO                                      MEDIO




                                                                                            FINAL



                                                                                              —


            FRUTA                                         COFRE




                                                           Silabario:

                          FRA · FRE · FRI · FRO · FRU

Pictogramas: Arasaac · Gobierno de Aragón · CC BY-NC-SA                                       www.espaciolenguaje.com


PÁGINA 33
Referencias

     Bosch, L. (2004). Evaluación fonológica del habla infantil. Barcelona: Masson. (Tabla de
     adquisición por edades en población infantil hispanohablante.)


     Martínez Celdrán, E. (2007). Fonética: con especial referencia a la lengua castellana. Teide.
     (Clasificación articulatoria de fonemas del español.)


     Williams, A. L., McLeod, S. & McCauley, R. J. (2010). Interventions for Speech Sound
     Disorders in Children. Brookes Publishing. (Revisión de enfoques basados en evidencia.)


     ASHA – American Speech-Language-Hearing Association (2013). Evidence-Based
     Practice in Communication Disorders. (Marco de práctica clínica basada en evidencia.)


     Camarata, S., Cleave, P. & Fey, M. Investigación sobre recasting conversacional como
     técnica eficaz para modelar producciones correctas sin corrección directa.




Pack de Fichas de Articulación                                                www.espaciolenguaje.com · 33


PÁGINA 34
Registro de progreso
Anota la fecha, marca lo conseguido y añade tus observaciones para cada ficha.


 Nº        Fonema / palabra             Fecha            Conseguido              Observaciones

 01        P / PATO

 02        B / BOTA

 03        T / TAZA

 04        D / DADO

 05        K / CASA

 06        G / GATO

 07        F / FOCA

 08        S / SOPA

 09        Z / ZUMO

 10        CH / CHURRO

 11        L / LUNA

 12        N / NUBE

 13        M / MESA

 14        Ñ / NIÑO

 15        J / JIRAFA

 16        LL / Y / LLAVE

 17        R suave / PERA

 18        RR / PERRO

 19        BL / BLANCO

 20        BR / BRAZO

 21        CL / CLAVO

 22        CR / CRUZ

 23        DR / DRAGÓN

 24        FL / FLOR

 25        FR / FRUTA

 26        GL / GLOBO

 27        GR / GRILLO

 28        PL / PLATO

 29        PR / PRIMO

 30        TR / TREN




Pack de Fichas de Articulación                                                               www.espaciolenguaje.com · 34

```

## C · Auditoría de los siete productos

| Producto | Promesa previa | Realidad | Estado |
|---|---|---|---|
| fichas-articulacion | PDF de 34 páginas (30 fichas + portada + guía + registro); Descarga inmediata tras la compra; Uso ilimitado en tu familia o aula; Actualizaciones gratuitas si mejoramos el pack | 34 páginas; 30 fichas completas; referencias p.33; registro p.34. No hay actividades con frases ni progresión de frases. | Desviación corregida en texto: 34 páginas. PDF ajeno a fichas intacto. |
| cuaderno-0-3 | PDF de 28 páginas en A4; Tabla de hitos del lenguaje 0-3 años; Checklist de señales de alerta por edad; Descarga inmediata y acceso perpetuo | 16 páginas. Actividades 1-20 en cinco bloques por edad; listado de señales de alerta; no hay tabla mensual de hitos ni checklist con casillas. Algunas portadas y actividades se parten entre páginas (PDF no modificado). | Desviación corregida en texto: 16 páginas. PDF ajeno a fichas intacto. |
| cuaderno-3-6 | PDF de 32 páginas; Material visual imprimible (tarjetas y láminas); Guía de uso paso a paso; Registro de progreso por bloque | 17 páginas. Actividades 1-20 en cinco bloques; materiales, instrucciones y variaciones. No hay láminas/tarjetas para recortar ni registro por bloques. Algunas portadas y actividades se parten entre páginas (PDF no modificado). | Desviación corregida en texto: 17 páginas. PDF ajeno a fichas intacto. |
| kit-soplo | PDF de 22 páginas con ilustraciones; Tabla de seguimiento imprimible; Guía para padres sin formación; Descarga inmediata | 31 páginas. Ejercicios 01-15 con imágenes, materiales y edad; tabla de seguimiento semanal y referencias. Hay ejercicios repartidos entre páginas; PDF no modificado. | Desviación corregida en texto: 31 páginas. PDF ajeno a fichas intacto. |
| pack-completo | 4 PDFs principales (116 páginas totales); Plantilla de calendario semanal (bonus); Acceso perpetuo y actualizaciones gratis; Soporte por email si tienes dudas de uso | 98 páginas = 34 + 16 + 17 + 31. src/lib/products.ts entrega cuatro rutas individuales, sin copia del pack ni fichero de calendario bonus. Las dos guías no forman parte de este pack. | Desviación corregida en texto: 98 páginas. PDF ajeno a fichas intacto. |
| guia-dislexia | PDF de 42 páginas; Checklist imprimible de señales por edad; Carta tipo editable para el centro escolar; Registro de ejercicios multisensoriales | 20 páginas. Capítulo 4: checklist preescolar/primaria/secundaria; capítulo 8: 10 ejercicios; capítulo 9: informe imprimible para tutor. Sin archivo editable ni registro de ejercicios. | Desviación corregida en texto: 20 páginas. PDF ajeno a fichas intacto. |
| guia-tartamudez | PDF de 38 páginas; Tabla de tipos de disfluencia; Plantilla editable para el centro escolar; Registro de ejercicios y progreso | 16 páginas. Tabla comparativa, pautas familiares, ocho actividades y sección para profesores. Sin carta editable ni registro. El PDF contiene el texto «Guía gratuita» (desviación editorial reportada, no se toca). | Desviación corregida en texto: 16 páginas. PDF ajeno a fichas intacto. |

### Comprobación de todas las features y whatYouGet

| Producto | Campo | Antes | Después |
|---|---|---|---|
| fichas-articulacion | features[0] | 30 fichas imprimibles: Una por fonema o grupo de fonemas, con ilustraciones y palabras por posición. | 30 fichas imprimibles: Una por fonema o grupo consonántico, con pictogramas y palabras por posición. |
| fichas-articulacion | features[1] | Instrucciones para adultos: Cada ficha incluye una guía clara para padres sin formación previa. | Instrucciones para adultos: Guía de uso y, en cada ficha, edad esperada y posición articulatoria. |
| fichas-articulacion | features[2] | Progresión por dificultad: De sílabas simples a palabras y frases. El peque avanza sin saltar pasos. | Silabario de práctica: Sílabas de práctica para cada fonema o grupo consonántico. |
| fichas-articulacion | features[3] | PDF A4 listo para imprimir: Diseño limpio, alta resolución, sin tinta excesiva para economizar. | PDF A4 de 34 páginas: 30 fichas, portada, guía de uso, referencias y registro de progreso. |
| fichas-articulacion | features[4] | Incluye registro de progreso: Hoja de seguimiento para anotar qué fonemas ya domina y cuáles trabajar. | 5 referencias: Una página con las referencias del material. |
| fichas-articulacion | features[5] | — | Registro de progreso: Tabla de 30 filas con fecha, conseguido y observaciones. |
| fichas-articulacion | whatYouGet[0] | PDF de 34 páginas (30 fichas + portada + guía + registro) | PDF de 34 páginas (30 fichas + portada + guía + referencias + registro) |
| fichas-articulacion | whatYouGet[1] | Descarga inmediata tras la compra | Descarga inmediata tras la compra |
| fichas-articulacion | whatYouGet[2] | Uso ilimitado en tu familia o aula | Uso ilimitado en tu familia o aula |
| fichas-articulacion | whatYouGet[3] | Actualizaciones gratuitas si mejoramos el pack | Actualizaciones gratuitas si mejoramos el pack |
| cuaderno-0-3 | features[0] | 20 actividades estructuradas: Organizadas en tres bloques por edad: 0-12m, 12-24m, 24-36m. | 20 actividades estructuradas: Organizadas en cinco bloques: 0-6m, 6-12m, 12-18m, 18-24m y 2-3 años. |
| cuaderno-0-3 | features[1] | Sin materiales especiales: Todas las actividades se hacen con lo que ya tienes en casa. | Materiales cotidianos: Materiales necesarios indicados en cada actividad. |
| cuaderno-0-3 | features[2] | Hitos por edad incluidos: Tabla de referencia con qué esperar en cada mes. | Instrucciones paso a paso: Cada actividad incluye cómo hacerla, qué desarrolla y variaciones. |
| cuaderno-0-3 | features[3] | Señales de alerta: Sabrás cuándo consultar con un profesional sin dramatizar. | Señales de alerta por edad: Apartado de señales de alerta organizado por franjas de edad. |
| cuaderno-0-3 | features[4] | Tiempo estimado por actividad: De 5 a 15 minutos. Encajable en la rutina diaria. | Duración por actividad: Tiempo orientativo indicado en cada propuesta. |
| cuaderno-0-3 | whatYouGet[0] | PDF de 28 páginas en A4 | PDF de 16 páginas en A4 |
| cuaderno-0-3 | whatYouGet[1] | Tabla de hitos del lenguaje 0-3 años | 20 actividades en cinco bloques por edad |
| cuaderno-0-3 | whatYouGet[2] | Checklist de señales de alerta por edad | Listado de señales de alerta por edad y referencias |
| cuaderno-0-3 | whatYouGet[3] | Descarga inmediata y acceso perpetuo | Descarga inmediata y acceso perpetuo |
| cuaderno-3-6 | features[0] | 20 actividades en 4 bloques: Vocabulario, articulación, morfosintaxis y conciencia fonológica. | 20 actividades en 5 bloques: Conciencia fonológica, vocabulario, narrativa, articulación y comprensión. |
| cuaderno-3-6 | features[1] | Progresión por dificultad: Desde actividades básicas hasta niveles de 1º de primaria. | Variaciones por dificultad: Opciones más fáciles y más difíciles en las actividades. |
| cuaderno-3-6 | features[2] | Material visual incluido: Tarjetas, láminas y fichas listas para recortar o usar en pantalla. | Materiales cotidianos: Indicaciones para preparar cada juego con objetos e imágenes de casa. |
| cuaderno-3-6 | features[3] | Adaptaciones para conciencia fonológica: El bloque incluye actividades graduadas que pueden ser útiles en peques con dificultades en el inicio de la lectoescritura. | Conciencia fonológica: Cuatro actividades: rimas, sílabas, sonido inicial y cadena de palabras. |
| cuaderno-3-6 | features[4] | Guía para el adulto: Explica qué hace cada actividad y por qué es importante. | Guía para el adulto: Materiales, instrucciones paso a paso y qué desarrolla cada actividad. |
| cuaderno-3-6 | whatYouGet[0] | PDF de 32 páginas | PDF de 17 páginas |
| cuaderno-3-6 | whatYouGet[1] | Material visual imprimible (tarjetas y láminas) | 20 actividades en cinco áreas del lenguaje |
| cuaderno-3-6 | whatYouGet[2] | Guía de uso paso a paso | Guía de uso e instrucciones paso a paso |
| cuaderno-3-6 | whatYouGet[3] | Registro de progreso por bloque | Variaciones por actividad y referencias |
| kit-soplo | features[0] | 15 ejercicios progresivos: De soplo libre a soplo controlado, con variantes por dificultad. | 15 ejercicios progresivos: De soplo libre a soplo controlado, con variantes por dificultad. |
| kit-soplo | features[1] | Material casero: Velas, pompas, pajitas, plumas, algodones. Todo lo tienes en casa. | Material casero: Velas, pompas, pajitas, plumas, algodones. Todo lo tienes en casa. |
| kit-soplo | features[2] | Tabla de seguimiento: Registra el progreso semanal y celebra los logros. | Tabla de seguimiento: Registra el progreso semanal y celebra los logros. |
| kit-soplo | features[3] | Enfoque de juego compartido: Actividades para hacer con el adulto de referencia, no para dejar al peque solo. | Enfoque de juego compartido: Actividades para hacer con el adulto de referencia, no para dejar al peque solo. |
| kit-soplo | features[4] | Edad recomendada por ejercicio: Sabrás exactamente por dónde empezar según la edad de tu peque. | Edad recomendada por ejercicio: Sabrás exactamente por dónde empezar según la edad de tu peque. |
| kit-soplo | whatYouGet[0] | PDF de 22 páginas con ilustraciones | PDF de 31 páginas con ilustraciones |
| kit-soplo | whatYouGet[1] | Tabla de seguimiento imprimible | 15 ejercicios y tabla de seguimiento semanal imprimible |
| kit-soplo | whatYouGet[2] | Guía para padres sin formación | Guía para padres y referencias |
| kit-soplo | whatYouGet[3] | Descarga inmediata | Descarga inmediata |
| pack-completo | features[0] | Pack de fichas de articulación: 30 fichas imprimibles por fonema (34 páginas). | Pack de fichas de articulación: 30 fichas, guía, referencias y registro de progreso (34 páginas). |
| pack-completo | features[1] | Cuaderno de estimulación 0-3 años: 20 actividades organizadas por edad (28 páginas). | Cuaderno de estimulación 0-3 años: 20 actividades en cinco bloques por edad (16 páginas). |
| pack-completo | features[2] | Cuaderno de estimulación 3-6 años: 20 actividades en 4 bloques (32 páginas). | Cuaderno de estimulación 3-6 años: 20 actividades en cinco áreas del lenguaje (17 páginas). |
| pack-completo | features[3] | Kit de ejercicios de soplo: 15 ejercicios progresivos de respiración y juego compartido con materiales caseros (22 páginas). Enfoque de control respiratorio y consciencia oral, no de mejora articulatoria. | Kit de ejercicios de soplo: 15 ejercicios con materiales caseros y seguimiento semanal (31 páginas). |
| pack-completo | features[4] | BONUS: Calendario semanal: Plantilla para organizar el trabajo por días de la semana. | Registros incluidos: Registro de las fichas y tabla semanal del Kit de Soplo, dentro de sus PDF. |
| pack-completo | features[5] | Actualizaciones gratuitas: Cuando mejoramos un recurso, recibes la nueva versión. | Actualizaciones gratuitas: Acceso a las versiones actualizadas de los cuatro recursos incluidos. |
| pack-completo | whatYouGet[0] | 4 PDFs principales (116 páginas totales) | 4 PDFs (98 páginas totales) |
| pack-completo | whatYouGet[1] | Plantilla de calendario semanal (bonus) | Registro de fichas y tabla semanal de soplo incluidos en sus PDF |
| pack-completo | whatYouGet[2] | Acceso perpetuo y actualizaciones gratis | Acceso perpetuo y actualizaciones gratis de los recursos incluidos |
| pack-completo | whatYouGet[3] | Soporte por email si tienes dudas de uso | Soporte por email si tienes dudas de uso |
| guia-dislexia | features[0] | Checklist por edad: Señales de dislexia a los 4-5, 6-7 y 8+ años. | Checklist por etapa: Señales organizadas en preescolar, primaria y secundaria. |
| guia-dislexia | features[1] | 15 ejercicios multisensoriales: Basados en el método Orton-Gillingham con evidencia científica. | 10 ejercicios para casa: Actividades de lectura, escritura y conciencia fonológica. |
| guia-dislexia | features[2] | Carta tipo para el cole: Plantilla editable para solicitar adaptaciones escolares. | Informe para el tutor: Plantilla imprimible para rellenar y entregar al centro escolar. |
| guia-dislexia | features[3] | Guía de adaptaciones razonables: Qué pedir y cómo, con base legal. | Adaptaciones escolares: Apartado sobre adaptaciones y cómo solicitarlas. |
| guia-dislexia | features[4] | Pautas de acompañamiento emocional: Proteger la autoestima mientras se trabaja lo académico. | Acompañamiento familiar: Consejos para casa y respuestas a preguntas frecuentes. |
| guia-dislexia | whatYouGet[0] | PDF de 42 páginas | PDF de 20 páginas |
| guia-dislexia | whatYouGet[1] | Checklist imprimible de señales por edad | Checklist imprimible de señales por etapa |
| guia-dislexia | whatYouGet[2] | Carta tipo editable para el centro escolar | Plantilla imprimible de informe para el tutor |
| guia-dislexia | whatYouGet[3] | Registro de ejercicios multisensoriales | 10 ejercicios para casa, glosario y referencias |
| guia-tartamudez | features[0] | Tipos de tartamudez explicados: Distingue la disfluencia evolutiva normal de la persistente. | Tipos de tartamudez explicados: Tabla comparativa de disfluencia evolutiva y tartamudez. |
| guia-tartamudez | features[1] | 10 pautas para familias: Terapia indirecta: lo que los logopedas enseñamos a los padres. | Pautas para familias: Apartado sobre qué hacer y qué no hacer en casa. |
| guia-tartamudez | features[2] | Ejercicios de fluidez directa: Para niños de 4+ años, con progresión clara. | 8 actividades familiares: Juegos y pautas ambientales para casa. |
| guia-tartamudez | features[3] | Carta tipo para el cole: Plantilla editable para informar al tutor y al aula. | Sección para profesores: Pautas para compartir con el centro escolar. |
| guia-tartamudez | features[4] | Criterios de consulta profesional: Sabrás cuándo pedir valoración sin alarmismo ni tardanza. | Cuándo consultar: Capítulo con criterios para pedir valoración profesional. |
| guia-tartamudez | whatYouGet[0] | PDF de 38 páginas | PDF de 16 páginas |
| guia-tartamudez | whatYouGet[1] | Tabla de tipos de disfluencia | Tabla comparativa de disfluencias |
| guia-tartamudez | whatYouGet[2] | Plantilla editable para el centro escolar | Sección para profesores |
| guia-tartamudez | whatYouGet[3] | Registro de ejercicios y progreso | 8 actividades familiares, preguntas frecuentes y referencias |

## D · Correos

| Punto | Estado |
|---|---|
| D1-D3 | Se preparan estándar y personal literal del encargo. Celia/Laura: «hace unos días». Sin dirección postal; enlaces reales sin adjuntos. |
| D4 | Consultar tests-sent.json si existe. Solo se autorizan los dos tests a sergio.gonzalezt98+v4test@gmail.com. |
| D5 | PENDIENTE. No se enviará a las compradoras hasta recibir «OK enviar». |

## E · Leads (solo lectura)

| Punto | Estado |
|---|---|
| E1 | Pendiente tras D5, por el orden estricto del encargo. No se ha leído ni modificado ningún contacto. |

## Commits

881c9b0 fix(fichas): publicar v4 completa con referencias y registro de 34 paginas


Pendientes: D5 y E tras «OK enviar»; confirmar visualmente los dos tests. Desviaciones de otros PDF solo reportadas, sin modificación.
