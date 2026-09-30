# Informe autónomo de octubre · Espacio Lenguaje

Ejecutado el 30 de septiembre de 2026, Europe/Madrid. Alcance: T1–T5 autorizadas con «adelante» y PROMPT_CODEX_AUTONOMO_OCT2026.md. HECHO significa comprobado; PREPARADO significa borrador o configuración sin activar; BLOQUEADO identifica una dependencia concreta.

## 1. Resumen en diez líneas

1. Atribución UTM implementada en Checkout, PaymentIntent, evento inicio_checkout y alta de comprador en Brevo.
2. Dos PaymentIntents independientes de Stripe test finalizaron y dos fixtures de webhook dieron HTTP 200; el Checkout alojado sigue sin completar.
3. Quiz probado en producción con +quiztest3, guía entregada y tres CTA literales verificados.
4. Los siete PDF actuales conservan hashes y tamaños; la función del email de compra permanece idéntica.
5. Vercel permite leer páginas vistas; los eventos personalizados responden HTTP 402 y el opt-in no puede calcularse.
6. Informe semanal ejecutado: 22 leads, cero ventas/devoluciones live medidas en el período y datos incompletos de Pinterest señalados.
7. Pack Profesional preparado a 34,90 € en Stripe test, con vista previa noindex, guía, licencia y emails de prueba entregados.
8. R fuerte queda en drafts: PDF de ocho páginas, listas, revisión de Bea y tres mockups sin programar.
9. S y soplo tienen nuevos title/meta en producción; cuerpos y H1 intactos; indexación manual bloqueada por acceso al navegador.
10. Praxias queda en drafts: anomalía GSC medida y maqueta de diez páginas para que Bea defina ocho fichas; ninguna publicación clínica nueva.

## 2. Estado y evidencia por tarea

### Tarea 1 · Medición

| Bloque | Estado | Evidencia literal |
| --- | --- | --- |
| A · Implementación | HECHO | utm_source, utm_medium, utm_campaign, ORIGEN_TRAFICO y referrer_path sanitizados en metadata; override tripwire; webhook escribe CAMPANA_ORIGEN. Prueba first-touch/privacidad/valores inválidos: PASS. |
| A · Dos pagos y webhook de prueba | HECHO | Dos PaymentIntents independientes: succeeded, livemode:false. Dos fixtures firmados: HTTP 200; Brevo lista 3 y campañas correctas antes de limpiar. IDs en tabla inferior. |
| A · Checkout alojado completo | BLOQUEADO | Sesiones Stripe test open, payment_intent:null. Navegador mostró «This link is incomplete»; reintento final dio timeout CDP. Los PaymentIntents independientes NO prueban el E2E de Checkout. |
| A · Entrega existente | HECHO | Dos emails de entrega: delivered. Función sendPurchaseEmail SHA256 antes/después: 0c84b8540453278fe8d03dad59f3333c9da73d054f0e2d82ce289e360682f8b4. Siete PDF HTTP 200, hashes sin cambios. |
| B · Quiz y CTA | HECHO | Producción: formulario confirmó «¡Guía enviada!». Brevo FUENTE_LEAD=quiz-necesita-logopeda; messageId <202609302005.17549369922@smtp-relay.mailin.fr>, delivered. track(lead,{fuente:quiz-necesita-logopeda}) tras éxito; ingesta no verificada por HTTP 402. |
| C · Páginas vistas | HECHO | API Vercel visits/aggregate HTTP 200; período septiembre hasta la ejecución, día 30 parcial. Octubre aún no ha comenzado. |
| C · Eventos y opt-in | BLOQUEADO | lead, descarga_pdf, inicio_checkout y compra: HTTP 402 payment_required: «Accessing Analytics custom events requires an Enterprise or Pro plan.» No se estiman leads/vistas ni conversiones por UTM. |
| D · Informe semanal | HECHO | weekly-report.mjs ejecutado al final; solo lectura externa, salida local. Ventanas Madrid, prueba de ambos cambios de hora PASS; snapshot Stripe live completo y período validado. Salida íntegra en sección 7. |

Las dos pruebas de atribución:

| Origen | Sesión test | PaymentIntent independiente | Campaña / origen Brevo |
| --- | --- | --- | --- |
| /gracias/fichas-gratis | cs_test_a1dQNjQNSD7nh9slix9TAzoXEaeQuIyWIP51szWltLlhDGHGTCVi1UqVWq | pi_3ULU09QW6wP4sOaT5rE5ItE6 | tripwire-fichas / pinterest; webhook 200; limpieza 204 |
| /recursos/fichas-articulacion | cs_test_a18RWJFefAXB3u1XqUkfTT1OS3uR9X4pn4Tn9JeFDFKObRcoaK4yEgGt6y | pi_3ULUXyQW6wP4sOaT1zvhn8JL | tripwire-fichas-pdf / pinterest; webhook 200; limpieza 204 |

Metadata común verificada: utm_source=pinterest, utm_medium=social, ORIGEN_TRAFICO=pinterest. referrer_path coincide con cada origen; utm_campaign y CAMPANA_ORIGEN son tripwire-fichas y tripwire-fichas-pdf, respectivamente.

Emails de compra de estas pruebas: `<202609302056.28095913377@smtp-relay.mailin.fr>` y `<202609302056.15540772827@smtp-relay.mailin.fr>`, ambos delivered.

Los tres CTA se sirven con HTTP 200 y botón «Hacer el test» en:

- [Post de 3 años](https://www.espaciolenguaje.com/blog/mi-hijo-de-3-anos-no-habla-bien)
- [Cuándo preocuparse](https://www.espaciolenguaje.com/blog/mi-hijo-no-habla-cuando-preocuparse)
- [Edad de inicio del habla](https://www.espaciolenguaje.com/blog/a-que-edad-debe-hablar-un-nino)

Texto añadido: «¿Dudas sobre si tu peque necesita logopeda? Haz nuestro test orientativo de 2 minutos. No es un diagnóstico: te orienta sobre cuándo consultar.» El resto de cada post se conservó.

Opt-in solicitado, sin estimaciones:

| Punto de captura | Páginas vistas | Visitantes | Leads Analytics | Opt-in |
| --- | --- | --- | --- | --- |
| /blog/fichas-logopedia-gratis-imprimir | 468 | 362 | no verificado · HTTP 402 | no verificable |
| /lp/guia-gratis | 102 | 89 | no verificado · HTTP 402 | no verificable |
| /quiz/necesita-logopeda | 45 | 35 | no verificado · HTTP 402 | no verificable |
| Formulario del blog | 2711 | no sumar únicos entre URLs | no verificado · HTTP 402 | no verificable |

Las vistas de artículos son páginas vistas, no exposiciones medidas del formulario. Incluyen tráfico de comprobación; no se inventa una depuración histórica. La API permite estas consultas según la [documentación oficial de Vercel](https://vercel.com/docs/analytics/web-analytics-api). Evidencia: [docs/codex/informes/vercel-analytics-septiembre.json](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/vercel-analytics-septiembre.json>).

PDF existentes: enlaces bajo https://www.espaciolenguaje.com/downloads/productos/. Todos unchanged=true:

| Archivo | HTTP | Content-Length | SHA256 |
| --- | --- | --- | --- |
| [calendario-semanal.pdf](https://www.espaciolenguaje.com/downloads/productos/calendario-semanal.pdf) | 200 | 369569 | `61c0106958122327fbe66fff1f500c9c2de6b26a223cac278abdba8240a03315` |
| [cuaderno-estimulacion-0-3.pdf](https://www.espaciolenguaje.com/downloads/productos/cuaderno-estimulacion-0-3.pdf) | 200 | 4091365 | `37570bef81317fbad3fe4e17e7badac956888cc4cda8c63c7e2bcd3257dcf0db` |
| [cuaderno-estimulacion-3-6.pdf](https://www.espaciolenguaje.com/downloads/productos/cuaderno-estimulacion-3-6.pdf) | 200 | 3609545 | `f87ffe380e51aefcb2ad9b4f32e06626c680150df4d9d6176d44e283cc78e318` |
| [guia-dislexia.pdf](https://www.espaciolenguaje.com/downloads/productos/guia-dislexia.pdf) | 200 | 2236445 | `9fdea8941e7f73967ddb2da42b4afd158864bf6902f432b7c1588b5bc19ce78b` |
| [guia-tartamudez.pdf](https://www.espaciolenguaje.com/downloads/productos/guia-tartamudez.pdf) | 200 | 2201035 | `e1a7e000b53f15bd2ef5480129738f954bea8313257d4814ed936c8e23c34458` |
| [kit-ejercicios-soplo.pdf](https://www.espaciolenguaje.com/downloads/productos/kit-ejercicios-soplo.pdf) | 200 | 10956500 | `712b4f65ba5095d7672ccdc4f544f5dd9497dd10a0fdf60773ea4c3954ad8ef1` |
| [pack-fichas-articulacion.pdf](https://www.espaciolenguaje.com/downloads/productos/pack-fichas-articulacion.pdf) | 200 | 1345168 | `5659d79760e66a5308b00435cb03514dc3e96046f84e5c7cadc92c24196f1d10` |

Limpieza final medida por GET de Brevo HTTP 200: +quiztest3, +packprotest, +packproemail, +atribucion1 y +atribucion2, todos listIds=[7] y emailBlacklisted=true. [Prueba de limpieza y entregas](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/test-contact-cleanup.json>).

### Tarea 2 · Pack Profesional

| Bloque | Estado | Evidencia literal |
| --- | --- | --- |
| A · Stripe test | HECHO | Cuenta acct_1TGnWPQW6wP4sOaT; livemode=false; producto prod_VMBwnSoGXb2e5e; precio price_1ULTYnQW6wP4sOaTsMuWq4eX; unit_amount=3490 EUR. Ningún producto/precio live creado. |
| A · Guía y licencia | PREPARADO | Guía 7 páginas, licencia 1 página, cinco PDF base 123 páginas: total previsto 131 páginas y 7 archivos. Secuenciación [CONTENIDO BEA]; licencia PENDIENTE DE REVISIÓN LEGAL. products.ts declara los siete archivos, testOnly y disabled. |
| A · Checkout y entrega de ensayo | BLOQUEADO | Sesión cs_test_a1RwRgSGqT8S3zhk18O91V4udiXGFdYu3CZH4jlpgl2OrOvAerX1mselP9: open/unpaid, amount_total=3490, payment_intent=null. Ensayo de entrega separado HTTP 201 y delivered; no equivale a compra completa. |
| B · Landing de revisión | HECHO | /recursos/pack-profesional HTTP 200, robots noindex,nofollow; sin entrada en /recursos ni sitemap. /api/checkout pro en producción HTTP 410. CTA desactivado, precio previsto, 5 FAQ, comparación, garantía propuesta de 14 días. |
| C · Publicación | BLOQUEADO | Faltan Bea, abogado, aceptación de Sergio y Checkout test completo. Plan de activación preparado en PUBLICACION-PENDIENTE.md; enlaces condicionales profesionales aún no están activos. No se publicaron los dos PDF privados ni se habilitó compra live. |
| D · Email profesional | HECHO | Plantilla Brevo #13 pack-profesional-presentacion-oct2026; enviada solo a +packproemail. messageId <202609301958.83096581678@smtp-relay.mailin.fr>, delivered. Envío real pendiente. |
| E · Nurturing | PREPARADO | Plantilla #14 nurturing-04b-pitch-profesional creada, no enviada. NURTURING-SERGIO.md contiene pasos para condición PERFIL; automatización 1 no editada. |

El primer ensayo con siete adjuntos falló HTTP 400 MESSAGE_SIZE_EXCEEDED (límite 20 MB). Se corrigió conservando los cinco enlaces públicos existentes y adjuntando solo guía/licencia privadas. Entrega a +packprotest: `<202609302000.60361651507@smtp-relay.mailin.fr>`, HTTP 201 y delivered. No se modificó el email de compra actual.

- [Guía profesional, siete páginas](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/guia-uso-profesional.pdf>)
- [Licencia en lenguaje llano](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/LICENCIA.md>) y [PDF de licencia](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/licencia-profesional.pdf>)
- [Captura escritorio](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/landing-desktop.png>) y [captura móvil](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/landing-mobile.png>)
- [Email para revisar](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/email-profesionales.md>), [instrucciones de nurturing](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/NURTURING-SERGIO.md>) y [plan de publicación](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/PUBLICACION-PENDIENTE.md>)

[Vista previa en producción](https://www.espaciolenguaje.com/recursos/pack-profesional).

![Vista previa del Pack Profesional en escritorio](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/landing-desktop.png>)

### Tarea 3 · R fuerte

| Bloque | Estado | Evidencia literal |
| --- | --- | --- |
| Post y revisión | PREPARADO | drafts/pieza-4-r-fuerte/post.mdx y REVISION_BEA.md: listas de 20 iniciales, 20 intervocálicas y 17 tras consonante; 16 sinfones como contraste con R suave; 9 frases originales, 4 trabalenguas y 5 FAQ. Bloques clínicos marcados para Bea. |
| PDF | PREPARADO | listas-r-fuerte.pdf: 8 páginas, render de las 8 a 300 dpi. Pictogramas ARASAAC: rey, reloj, robot, perro, carro y sonrisa; atribución incluida. Hoja de registro y último CTA Pack de Fichas 4,90 €. |
| Captura y tripwire | PREPARADO | capture-config.json enabled:false; source=r-fuerte-gratis; thanksPath=/gracias/r-fuerte; utmCampaign=tripwire-r-fuerte; productId=fichas-articulacion. Configuración y plan preparados; rutas y endpoint aún no registrados. |
| Tres pines | PREPARADO | pinterest/drafts-noviembre-r-fuerte/r-fuerte-01.png, -02.png, -03.png: 1000×1500, 2–3 páginas reales superpuestas, títulos cortos, descripciones distintas, UTM Pinterest y tablero Fichas de logopedia para imprimir. date=null, scheduled=false. |
| Publicación | BLOQUEADO | Falta revisión de Bea. Post, gracias y PDF no están disponibles públicamente; HTTP 404 verificado. Ningún pin nuevo programado. |

[PDF de R fuerte](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/listas-r-fuerte.pdf>) · [Render de las ocho páginas](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/listas-r-fuerte-contacto.jpg>) · [Tabla de revisión](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/REVISION_BEA.md>) · [Datos de los tres pines](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/pinterest/drafts-noviembre-r-fuerte/pins.json>) · [Activación pendiente](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/ACTIVACION.md>).

Edades y cuándo consultar proceden del texto publicado de R fuerte; no se añadieron edades nuevas. La clasificación y dificultad de las palabras, especialmente las familias enredar/enrollar y la selección de vocabulario, requieren validación de Bea. «Tren» y «fresa» se separaron como contraste, sin clasificarlas como vibrante múltiple.

### Tarea 4 · CTR de S y soplo

| Bloque | Estado | Evidencia literal |
| --- | --- | --- |
| A · Diagnóstico | HECHO | GSC web 2026-08-31–2026-09-27; líneas base y 20 consultas por URL medidas. Tablas completas debajo. |
| B · Dos opciones | HECHO | Dos title ≤60 y meta entre 150–155 por URL. Elegida opción A: sigmatismo informativo; soplo ejercicios/juegos caseros. |
| C · Aplicar y desplegar | HECHO | Ambas URL HTTP 200 con title/meta elegidos en HTML servido. H1 y cuerpo intactos; rollback guardado. Medición: 14-oct-2026. Último cambio anterior 2-sep, más de 14 días. |
| C · Solicitar indexación | BLOQUEADO | Search Console del navegador mostraba página de inicio/«Empezar ahora», sin sesión de inspección utilizable. Reintentos finales: timeout CDP. No se usó Google Indexing API ni se afirma haber solicitado indexación. |

Línea base de 28 días:

| URL | Clics | Impresiones | CTR | Posición |
| --- | --- | --- | --- | --- |
| [mi-hijo-no-pronuncia-la-s](https://www.espaciolenguaje.com/blog/mi-hijo-no-pronuncia-la-s) | 21 | 2304 | 0.911% | 5.909 |
| [ejercicios-de-soplo-para-ninos](https://www.espaciolenguaje.com/blog/ejercicios-de-soplo-para-ninos) | 32 | 3053 | 1.048% | 7.026 |

#### mi-hijo-no-pronuncia-la-s

Intención: Consulta informativa sobre sigmatismo, tipos y causas; predomina sigmatismo (316 impresiones).

| Consulta | Impresiones | Clics | CTR | Posición |
| --- | --- | --- | --- | --- |
| sigmatismo | 316 | 1 | 0.316% | 8.918 |
| sigmatismo que es | 60 | 0 | 0.000% | 9.650 |
| sigmatismo interdental | 57 | 1 | 1.754% | 5.684 |
| que es sigmatismo | 30 | 0 | 0.000% | 9.567 |
| laterales de la s | 27 | 0 | 0.000% | 1.000 |
| que es el sigmatismo | 20 | 0 | 0.000% | 7.700 |
| sigmatismo lateral | 13 | 0 | 0.000% | 4.538 |
| signatismo | 9 | 0 | 0.000% | 7.333 |
| sigmatismo significado | 6 | 0 | 0.000% | 9.500 |
| dificultad para pronunciar la s | 5 | 0 | 0.000% | 6.400 |
| dislalia s | 3 | 0 | 0.000% | 17.000 |
| artículos que hablen de eso | 1 | 0 | 0.000% | 3.000 |
| con la s | 1 | 0 | 0.000% | 1.000 |
| el niño tiene 4 años | 1 | 0 | 0.000% | 8.000 |
| la s | 1 | 0 | 0.000% | 2.000 |
| lenguaje s | 1 | 0 | 0.000% | 11.000 |
| punto articulatorio fonema s | 1 | 0 | 0.000% | 15.000 |
| s interdental | 1 | 0 | 0.000% | 7.000 |
| sigmatismo anterior | 1 | 0 | 0.000% | 10.000 |
| tiene 3 años | 1 | 0 | 0.000% | 1.000 |

| Opción | Title | Caracteres | Meta | Caracteres |
| --- | --- | --- | --- | --- |
| A · aplicada | Sigmatismo: qué es, tipos y cuándo consultar | 44 | Sigmatismo: qué es, tipos de dificultad con la S y cuándo consultar. Orientación para familias sobre causas y edades. Revisado por logopeda colegiada. | 150 |
| B | Sigmatismo: por qué tu hijo no pronuncia la S | 45 | Sigmatismo: conoce los tipos y las posibles causas de la dificultad para pronunciar la S, qué hacer en casa y cuándo consultar. Revisado por logopeda. | 150 |

Diff servido HTTP 200:

- Title anterior: Mi hijo no pronuncia la S: tipos de sigmatismo, edades y qué hacer
- Title nuevo: **Sigmatismo: qué es, tipos y cuándo consultar**
- Meta anterior: El sigmatismo (dificultad para pronunciar la /s/) es una de las dislalias más frecuentes en preescolar. Tipos (interdental, lateral, dental), edad esperable para dominarla, causas y qué hacer en casa basado en evidencia (sin praxias aisladas).
- Meta nueva: Sigmatismo: qué es, tipos de dificultad con la S y cuándo consultar. Orientación para familias sobre causas y edades. Revisado por logopeda colegiada.
- H1 conservado: Mi hijo no pronuncia la S: tipos de sigmatismo, edades y qué hacer
- SHA256 del cuerpo antes/después: `323a9c0c0c2faf33dc95b4a895b4656d71b84e68f0927e5cf0c3e8a2a9fdb474`


#### ejercicios-de-soplo-para-ninos

Intención: Ejercicios y juegos caseros; ejercicios de soplo lidera (102 impresiones).

| Consulta | Impresiones | Clics | CTR | Posición |
| --- | --- | --- | --- | --- |
| ejercicios de soplo | 102 | 1 | 0.980% | 6.451 |
| ejercicios de soplo para niños | 58 | 2 | 3.448% | 5.638 |
| juegos de soplo para niños | 49 | 1 | 2.041% | 10.061 |
| actividades de soplo | 44 | 1 | 2.273% | 8.523 |
| actividades de soplo para niños | 24 | 0 | 0.000% | 6.250 |
| actividades de soplo para niños de 2 a 3 años | 20 | 0 | 0.000% | 5.050 |
| como enseñar a soplar a un niño | 20 | 0 | 0.000% | 8.650 |
| juegos de soplo | 19 | 0 | 0.000% | 8.684 |
| actividades de soplo para estimular el lenguaje | 17 | 0 | 0.000% | 5.412 |
| ejercicios de soplo terapia de lenguaje | 16 | 0 | 0.000% | 7.063 |
| ejercicios de soplo para terapia de lenguaje | 14 | 0 | 0.000% | 8.071 |
| ejercicios de soplo para niños para que sirve | 13 | 0 | 0.000% | 7.385 |
| juegos de soplar | 12 | 0 | 0.000% | 9.417 |
| juegos de soplar para niños | 9 | 1 | 11.111% | 5.111 |
| como enseñar a soplar a un bebe | 9 | 0 | 0.000% | 9.778 |
| ejercicios de soplo para lenguaje | 8 | 0 | 0.000% | 7.250 |
| materiales para trabajar el soplo | 8 | 0 | 0.000% | 15.750 |
| ejercicios soplo | 7 | 0 | 0.000% | 9.429 |
| soplo infantil | 7 | 0 | 0.000% | 38.286 |
| material de soplo | 5 | 0 | 0.000% | 12.800 |

| Opción | Title | Caracteres | Meta | Caracteres |
| --- | --- | --- | --- | --- |
| A · aplicada | Ejercicios de soplo para niños: 8 juegos con material casero | 60 | Ejercicios de soplo para niños de 2 a 6 años: 8 juegos con pompas, plumas y molinillos, material de casa y orientaciones. Revisado por logopeda colegiada. | 154 |
| B | Ejercicios de soplo para niños: 8 juegos en casa | 48 | Ejercicios de soplo para niños: 8 juegos caseros de 2 a 6 años con pompas, plumas y molinillos. Material y pasos claros. Revisado por logopeda colegiada. | 153 |

Diff servido HTTP 200:

- Title anterior: Ejercicios de soplo para niños: 8 juegos caseros
- Title nuevo: **Ejercicios de soplo para niños: 8 juegos con material casero**
- Meta anterior: Ejercicios de soplo para niños de 2 a 6 años: 8 juegos con pompas, plumas, velas y molinillos, usando material de casa. Revisado por logopeda colegiada.
- Meta nueva: Ejercicios de soplo para niños de 2 a 6 años: 8 juegos con pompas, plumas y molinillos, material de casa y orientaciones. Revisado por logopeda colegiada.
- H1 conservado: Ejercicios de soplo para niños: 8 juegos caseros
- SHA256 del cuerpo antes/después: `0f671871175ee68e135be576959853f5a082970d24581bb98d7c6713bd85c28e`


El title anterior de las tablas es el valor editorial de frontmatter; la plantilla del layout añadía « | Espacio Lenguaje». El nuevo title SEO usa absolute para que los 44/60 caracteres sean también los del HTML servido. El H1 editorial se conserva. Rollback: eliminar seoTitle/seoDescription añadidos y restaurar la generación anterior, con su marca. [docs/codex/informes/ctr-rollback.json](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/ctr-rollback.json>). HTML comprobado: [docs/codex/informes/ctr-production.json](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/ctr-production.json>). No se ha creado un recordatorio automático ni se ha medido todavía el efecto del cambio.

### Tarea 5 · Praxias

| Bloque | Estado | Evidencia literal |
| --- | --- | --- |
| Anomalía antes de redactar | HECHO | Consulta «materiales para trabajar praxias bucofaciales con niños», GSC web 31-ago–27-sep: 24 impresiones, 0 clics, posición 1,7917. 23 impresiones en /blog/praxias-bucofaciales-ninos, posición 1,8261; 1 en /blog/ejercicios-lenguaje-para-casa, posición 1. Todas DESKTOP, país esp. |
| Tipo de resultado | HECHO | Image agregado: fila con 0 impresiones/0 clics; posición no aplicable. Image por dimensiones sin filas. searchAppearance sin filas: fragmento concreto NO identificado. No se atribuye el cero a imágenes o snippet destacado. |
| Post y revisión | PREPARADO | drafts/pieza-2-praxias/post.mdx y REVISION_BEA.md. Definición, límites, ocho fichas y cinco FAQ para Bea. Caja de honestidad copiada del post existente. |
| PDF | PREPARADO | fichas-praxias.pdf: 10 páginas, portada + 8 fichas con huecos + tripwire. Objetivos, edad, material, pictograma, pasos, variación y límites los define Bea; no se inventaron actividades. Render 10/10 a 300 dpi. |
| Captura | PREPARADO | capture-config.json enabled:false; fuente praxias-gratis, /gracias/praxias, campaña tripwire-praxias → kit-soplo. Plan de integración en ACTIVACION.md; endpoint y rutas no registrados. |
| Publicación | BLOQUEADO | Contenido clínico pendiente de Bea. Post, gracias y PDF HTTP 404; no se publicó nada. |

La posición 2,2 del brief no se reproduce exactamente en esta ventana; no se mezclan períodos ni se deduce el formato del resultado a partir de la posición. [Evidencia GSC](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/gsc-praxias-anomaly.json>) · [Maqueta PDF](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/fichas-praxias.pdf>) · [Render de las diez páginas](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/fichas-praxias-contacto.jpg>) · [Revisión Bea](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/REVISION_BEA.md>).

PDF privados entregados para revisión, no publicados:

| PDF | Páginas / renders 300 dpi | Bytes | SHA256 |
| --- | --- | --- | --- |
| [drafts/pack-profesional/guia-uso-profesional.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/guia-uso-profesional.pdf>) | 7 / 7 | 235393 | `77c01c137a0fbf67dd6849f367a0bf73c77446ee461933dfc269e4c5a8b72648` |
| [drafts/pack-profesional/licencia-profesional.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/licencia-profesional.pdf>) | 1 / 1 | 74324 | `cbc0a16e6c11ec8b2f7b14afd3d168be2aaacd991f978acb00dd90d1f1498d25` |
| [drafts/pieza-2-praxias/fichas-praxias.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/fichas-praxias.pdf>) | 10 / 10 | 368064 | `d9d2dd1abd858fe4d2df2fd97237c9a51e2dd0fedb2c574b059368e74562d58a` |
| [drafts/pieza-4-r-fuerte/listas-r-fuerte.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/listas-r-fuerte.pdf>) | 8 / 8 | 332786 | `2c62dab8380e5cd6419270be9739b5fdbeae5fd53207d00978bfcd4a9fc77d3d` |

Comprobación adicional: las URL públicas de los dos posts nuevos inicialmente devolvían 500 por intentar leer MDX inexistente. Se corrigió con dynamicParams=false, restringiendo los slugs a los artículos compilados; ahora las ocho URL de borradores/descargas comprobadas dan 404. [HTTP de protección de borradores](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/draft-publication-safeguards.json>).

Verificación técnica: npm run build terminó con código 0 y generó 66 páginas; npx tsc --noEmit y node --check de los scripts finales terminaron con código 0. Pruebas de atribución y Madrid: PASS. Vercel recompila los cambios finales; estados verificables en sección 8. Revisión independiente final confirmó las correcciones de fecha Madrid, completitud del snapshot, transporte del email, UTM y bloqueos de producto testOnly. Ningún E2E de Checkout se presenta como completado.

## 3. Decisiones tomadas sin consultar

1. Conservar la atribución first-touch de 30 días existente en localStorage; no añadir otra cookie ni atribuir visitas desconocidas a directo.
2. Permitir que la campaña explícita del tripwire prevalezca sobre la de captación, conservando fuente/medio y un pathname sin parámetros personales.
3. Usar price_data en Stripe test para productos con IDs live de otra cuenta; en live se mantienen los IDs y precios existentes. El Pack Profesional usa su precio test específico.
4. Separar PaymentIntents, fixtures, emails de ensayo y compras Checkout: cada prueba acredita solo lo que realmente verificó.
5. Mantener guía y licencia privadas; sustituir siete adjuntos por cinco enlaces y dos adjuntos para respetar el límite de Brevo.
6. Elegir la opción A de title/meta en ambos artículos por consultas dominantes y beneficio ya presente; separar SEO del H1 para conservar contenido.
7. Separar sinfones con R suave de la lista de R fuerte; marcar todas las selecciones y pautas para Bea.
8. Entregar praxias con huecos y pictogramas pendientes, porque Bea debe definir las ocho actividades.
9. No sumar tres pines a una cuota mensual de 20; quedan sin fecha para sustituir espacios de noviembre tras publicar el post.
10. Usar lectura autenticada de la CLI/API de Vercel para recuperar vistas. No contratar un plan para acceder a eventos.
11. Usar snapshot live completo obtenido mediante el conector Stripe de lectura; no usar la clave test como si fuera live.
12. Mantener NULL de Metricool y declarar el alcance de los leads: contactos creados en la ventana que siguen en listas 2/4, excluida la 7; no reconstruir conversiones históricas sin evidencia.
13. Corregir el 500 de artículos inexistentes al detectarlo durante la protección de borradores.

No se enviaron emails a destinatarios reales/listas, no se editó Brevo Automation 1, no se crearon precios/productos live, no se tocaron otras redes ni se introdujeron contraseñas.

## 4. Pendiente de OK de Sergio

1. **«OK pack pro»**: aceptar la guía, licencia y landing de revisión después de disponer de la sección de Bea, licencia legal y prueba Checkout completa. No crea por sí solo un precio live ni envía emails.
2. **«OK Stripe live pack pro»**: con esas dependencias resueltas y el OK anterior, crear el nuevo producto/precio live de 34,90 €, incorporar los PDF aprobados, habilitar compra, quitar noindex, incluirlo en sitemap y preparar/verificar los enlaces profesionales y el tripwire por perfil. No cambia precios existentes ni autoriza emails.
3. **«OK enviar profesionales»**: con el pack disponible y texto final revisado, enviar la presentación transaccional uno a uno a los contactos profesionales elegibles y registrar sus messageIds. El borrador actual dice que el pack está en preparación y debe actualizarse/probarse antes del envío real.
4. **«OK publicar R fuerte»**: tras revisión de Bea, incorporar post/PDF aprobados y terminar/probar la integración de captura y gracias/r-fuerte; activar solo después de verificar entrega y atribución. No programa pines automáticamente.
5. **«OK publicar praxias»**: después de que Bea defina y apruebe las ocho fichas, regenerar y revisar PDF/post, terminar/probar captura y gracias/praxias, y publicarlos.
6. **«OK sustituir 3 pines de noviembre»**: tras publicación comprobada del post de R fuerte, sustituir tres espacios de la cola existente por los mockups aprobados, manteniendo Metricool gratuito y un máximo de 20 publicaciones por mes.

Los accesos y las pruebas reversibles no necesitan un nuevo OK: se completarán cuando el navegador permita realizarlas. La rama de nurturing la añade Sergio siguiendo el documento; Codex no modifica automatizaciones.

## 5. Pendiente de Bea

| Archivo | Revisión necesaria |
| --- | --- |
| [drafts/pack-profesional/CONTENIDO_BEA.md](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/CONTENIDO_BEA.md>) | Escribir Cómo secuenciar el material por objetivo; revisar mapa de áreas y contexto de las plantillas. |
| [drafts/pack-profesional/guia-uso-profesional.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pack-profesional/guia-uso-profesional.pdf>) | Revisar guía completa después de incorporar su sección, sin convertir registro/pauta en recomendaciones no validadas. |
| [drafts/pieza-4-r-fuerte/REVISION_BEA.md](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/REVISION_BEA.md>) | Marcar cada lista, 9 frases, 4 trabalenguas y 5 FAQ; confirmar posiciones, orden de dificultad y vocabulario infantil. |
| [drafts/pieza-4-r-fuerte/post.mdx](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/post.mdx>) | Validar todos los bloques ⚕, explicación R/RR/sinfones, recasting, pauta y consulta; revisar que las citas literales encajen. |
| [drafts/pieza-4-r-fuerte/listas-r-fuerte.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-4-r-fuerte/listas-r-fuerte.pdf>) | Revisar las 8 páginas, pictogramas, recuentos y hoja de registro. |
| [drafts/pieza-2-praxias/REVISION_BEA.md](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/REVISION_BEA.md>) | Definir las 8 actividades: objetivo, edad, material, pictograma, pasos, variación y precauciones; revisar 5 FAQ. |
| [drafts/pieza-2-praxias/post.mdx](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/post.mdx>) | Completar definición/tabla/límites/pautas y validar la caja de honestidad copiada. |
| [drafts/pieza-2-praxias/fichas-praxias.pdf](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/drafts/pieza-2-praxias/fichas-praxias.pdf>) | Sustituir todos los huecos, comprobar pictogramas elegidos y revisar las 10 páginas regeneradas. |

La licencia la revisa un abogado: derechos de uso individual/centro, copias impresas, prohibición de redistribución digital y compatibilidad de las condiciones de los pictogramas. No se declara validada.

## 6. Accesos y dependencias que faltaron

| Sistema | Problema concreto | Cómo resolverlo |
| --- | --- | --- |
| Vercel Analytics eventos | API HTTP 402; visitas y deploys sí accesibles con la cuenta/proyecto correcto. El navegador estaba en hola@ sin acceso al proyecto de Sergio. | Para el panel, abrir la cuenta sergio.gonzalezt98@gmail.com o añadir hola@ al proyecto. Los eventos además requieren Pro/Enterprise; dar acceso no elimina el límite de plan. No se cambió la suscripción. Alternativa de medición sin coste queda por decidir, no implementada. |
| Search Console · solicitar indexación | OAuth de lectura GSC funciona; navegador sin sesión de inspección utilizable y después timeout CDP. | Iniciar sesión personalmente en el navegador de Codex con una cuenta con acceso a https://www.espaciolenguaje.com/ y abrir Inspección de URL. No pegar contraseña ni token en el chat. |
| Stripe Checkout test | API test funciona, sesiones open; navegador muestra enlace incompleto o timeout CDP. | Restablecer el navegador y abrir una nueva sesión test; completar pago con tarjeta de prueba y verificar evento real, metadata, entrega y limpieza. No usar un pago live. |
| Sección clínica y licencia | Faltan contenido de Bea y documento legal final. | Devolver los archivos revisados en drafts antes de activar el producto o los posts. |
| Pinterest últimos días | Metricool devuelve NULL para impresiones/clics/guardados 28–29 sep. | Reexportar esas métricas cuando estén disponibles; no cambiar la programación. |

No faltó acceso de lectura a GSC, Brevo, Stripe live por conector, Metricool ni Git/Vercel deploy. Se reintentaron los bloques inaccesibles al final; no se introdujeron credenciales en webs. Octubre no se mide todavía porque la ejecución es anterior al 1 de octubre.

## 7. Salida íntegra del informe semanal ejecutado al final

Comando:

`node scripts/weekly-report.mjs --as-of 2026-09-30 --stripe-snapshot docs/codex/informes/stripe-live-week-snapshot.json --pinterest-csv docs/codex/informes/pinterest-metricool-2026-09-23-29.csv`

El CSV fue normalizado desde una lectura real de Analytics de Metricool, marca 6045962, no desde un CSV de programación. Stripe live usa cuenta acct_1TGnVzHJju972q1P: paginación completa de cobros/devoluciones y filtro de período; los ceros de esta sección son medidos.

# Informe semanal · 2026-09-30

Generado en modo solo lectura. Brevo y Stripe: 2026-09-23–2026-09-29 (días completos Europe/Madrid). GSC: termina 2026-09-27 por retraso habitual; no equivale a datos de hoy. AOV = ventas brutas / cobros exitosos; neto antes de comisiones.

## 1 · GSC 7 días (2026-09-21–2026-09-27)

| Ámbito | Clics | Impresiones | CTR | Posición |
| --- | --- | --- | --- | --- |
| Total | 276 | 7641 | 3.612% | 7.464 |
| https://www.espaciolenguaje.com/blog/fichas-logopedia-gratis-imprimir | 73 | 405 | 18.025% | 5.104 |
| https://www.espaciolenguaje.com/blog/actividades-ninos-2-anos-lenguaje | 67 | 1335 | 5.019% | 6.196 |
| https://www.espaciolenguaje.com/blog/ejercicios-para-la-r-fuerte | 53 | 1230 | 4.309% | 6.776 |
| https://www.espaciolenguaje.com/blog/praxias-bucofaciales-ninos | 19 | 518 | 3.668% | 7.477 |
| https://www.espaciolenguaje.com/blog/etapas-desarrollo-del-lenguaje | 12 | 447 | 2.685% | 8.463 |

## 1 · GSC 28 días (2026-08-31–2026-09-27)

| Ámbito | Clics | Impresiones | CTR | Posición |
| --- | --- | --- | --- | --- |
| Total | 892 | 29096 | 3.066% | 10.386 |
| https://www.espaciolenguaje.com/blog/fichas-logopedia-gratis-imprimir | 228 | 1550 | 14.710% | 6.955 |
| https://www.espaciolenguaje.com/blog/actividades-ninos-2-anos-lenguaje | 217 | 5738 | 3.782% | 6.988 |
| https://www.espaciolenguaje.com/blog/ejercicios-para-la-r-fuerte | 168 | 4006 | 4.194% | 6.774 |
| https://www.espaciolenguaje.com/blog/praxias-bucofaciales-ninos | 53 | 2273 | 2.332% | 8.180 |
| https://www.espaciolenguaje.com/blog/etapas-desarrollo-del-lenguaje | 36 | 1464 | 2.459% | 9.606 |

## 2 · Leads nuevos por día

| Día Madrid | Leads |
| --- | --- |
| 2026-09-29 | 5 |
| 2026-09-27 | 5 |
| 2026-09-28 | 4 |
| 2026-09-26 | 2 |
| 2026-09-25 | 2 |
| 2026-09-24 | 2 |
| 2026-09-23 | 2 |

## 3 · Leads por FUENTE_LEAD

| FUENTE_LEAD | Leads |
| --- | --- |
| guia-gratis | 19 |
| fichas-gratis | 3 |

## 4 · Leads por PERFIL

| PERFIL | Leads |
| --- | --- |
| sin declarar | 14 |
| profesional | 5 |
| familia | 3 |

## 5 · Leads por ORIGEN_TRAFICO

| ORIGEN_TRAFICO | Leads |
| --- | --- |
| sin declarar | 20 |
| chatgpt.com | 2 |

Leads de listas 2/4 creados en el período, excluida lista 7: **22**. Fuente: createdAt; no fecha de última modificación. Una dimensión sin declarar no se atribuye a directo.

## 6 · Stripe live

| Ventas | Bruto EUR | Devoluciones | Devuelto EUR | Neto EUR | AOV EUR |
| --- | --- | --- | --- | --- | --- |
| 0 | 0.00 | 0 | 0.00 | 0.00 | no aplicable (sin ventas) |

## 7 · Pinterest

Export aportado: docs/codex/informes/pinterest-metricool-2026-09-23-29.csv.

```csv
date,pinterestImpressions,pinterestPins,pinterestPinClicks,pinterestOutboundClicks,pinterestSaves
2026-09-23,0,1,0,0,0
2026-09-24,1,1,0,0,0
2026-09-25,0,1,0,0,0
2026-09-26,0,1,0,0,0
2026-09-27,0,1,0,0,0
2026-09-28,NULL,1,NULL,NULL,NULL
2026-09-29,NULL,1,NULL,NULL,NULL

```

Archivo: docs\informes\semana-2026-09-30.md

## 8. Commits y deploys

| Commit | Cambio |
| --- | --- |
| 1015a1e | Guarda pruebas de producción, Analytics y materiales pendientes de aprobación |
| 836a441 | Cierra pruebas de atribución y ajusta informe Madrid y entrega privada |
| 3eedaeb | Completa pictogramas y tres mockups privados de R fuerte |
| 058e142 | Prepara ocho fichas de praxias para Bea y verifica la consulta en GSC |
| 376b1cf | Devuelve 404 para artículos fuera del catálogo publicado |
| ddf46fd | Optimiza title y meta de sigmatismo y soplo con línea base y rollback |
| c46c4f8 | Prepara borrador de R fuerte y freebie de ocho páginas para Bea |
| 82eb00c | Prepara Pack Profesional en test, vista previa y documentos privados de revisión |
| 01f48ea | Completa atribución de checkout y eventos del quiz; añade informe semanal |

Deploys recuperados mediante API Vercel HTTP 200; asociación a commit verificada:

| Commit | Estado observado | Deploy |
| --- | --- | --- |
| 1015a1e | READY | [https://espacio-lenguaje-7sfzlw99r-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-7sfzlw99r-sergioo1498s-projects.vercel.app) |
| 836a441 | READY | [https://espacio-lenguaje-bt7tjdcza-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-bt7tjdcza-sergioo1498s-projects.vercel.app) |
| 376b1cf | READY | [https://espacio-lenguaje-ldnp3pi40-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-ldnp3pi40-sergioo1498s-projects.vercel.app) |
| ddf46fd | READY | [https://espacio-lenguaje-rfpvuh3h3-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-rfpvuh3h3-sergioo1498s-projects.vercel.app) |
| c46c4f8 | READY | [https://espacio-lenguaje-6izjsozgy-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-6izjsozgy-sergioo1498s-projects.vercel.app) |
| 82eb00c | READY | [https://espacio-lenguaje-3khlzc5n3-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-3khlzc5n3-sergioo1498s-projects.vercel.app) |
| 01f48ea | READY | [https://espacio-lenguaje-286hrit1a-sergioo1498s-projects.vercel.app](https://espacio-lenguaje-286hrit1a-sergioo1498s-projects.vercel.app) |

[Web de producción](https://www.espaciolenguaje.com). Los commits de borradores no publican sus archivos en la web. El propio informe se guarda y se añade después en un commit documental; su hash se identifica con git log. No se incorporaron archivos ajenos a estas tareas ni URLs privadas completas de sesiones Stripe. Los renders individuales a 300 dpi quedan en el workspace y se entregan sus hojas de contacto; no se subieron los PNG grandes al repositorio.

Informe guardado en [docs/codex/informes/2026-10-INFORME-AUTONOMO.md](<C:/Users/USER/Desktop/💼 TRABAJO Y PROYECTOS/ESPACIO LENGUAJE/espacio-lenguaje-web/docs/codex/informes/2026-10-INFORME-AUTONOMO.md>).
