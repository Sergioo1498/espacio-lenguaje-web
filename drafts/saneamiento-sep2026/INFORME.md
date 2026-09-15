# Saneamiento del catálogo · septiembre de 2026

| Bloque | Resultado | Evidencia |
|---|---|---|
| A1 | 55 actividades/ejercicios completos, cada uno en una página; introducciones de bloque en página nueva. Texto normalizado idéntico. | layout-audit.json, cinco *-text.diff vacíos. Renderizadas y revisadas las 136 páginas de los cinco PDF modificados. |
| A2 | Una sustitución: «Guía gratuita» → «Guía de Tartamudez Infantil». | guia-tartamudez-before.txt / -after.txt. No se modifica el resto del contenido ni su maquetación. |
| A3 | Retirado «· v4 con pictogramas» de la portada; Title conserva v4. | pack-fichas-articulacion-text.diff vacío tras esa única eliminación esperada. |
| A4 | Frase literal restaurada en landing kit y features[3] del Pack Completo: «Enfoque de control respiratorio y consciencia oral, no de mejora articulatoria». | src/lib/products-content.ts y live-A.json. |
| A5 | URLs conservadas, HTTP 200, Content-Length y SHA-256 verificados. Dislexia idéntica. Pack: 120 páginas antes del bonus. | live-before.json, live-A.json. |
| B | Calendario de una página A4 con logo, tipografías DM Sans/DM Serif, tabla lunes-domingo y campos pedidos. Pack: 5 PDF / 121 páginas. | calendario-text.txt, live-B.json, delivery-B.json. Siete checkouts simulados sin red/cobros/correos; los otros seis productos idénticos. |
| C1 · quiz | Alta en lista 2; FUENTE_LEAD=quiz-necesita-logopeda; EDAD_HIJO=3-4; INTERESES_TEMA=quiz-amarillo-score-3-7. Prueba en navegador: siete respuestas Sí; resultado amarillo 3/7; «¡Guía enviada! 🌱». | quiz-created.json; quiz-events.json: opened, delivered, requests; quiz-cleanup.json: lista final [7]. Circuito funcional; código del quiz intacto. |
| C2 · perfil | Selector opcional Familia/Profesional en /lp/guia-gratis y formulario del blog; misma interacción y estilos que FichasGate. | test-perfil-forms.mjs: guarda ambos valores; omitir/valor inválido conserva el anterior. Pruebas reales: perfil-lp-created.json y perfil-blog-created.json; limpieza en lista 7. |
| C1/C3 · métricas | Pendiente de acceso. Vercel muestra 404 con hola@espaciolenguaje.com en el proyecto sergioo1498s-projects/espacio-lenguaje-web. Clarity muestra «Iniciar sesión». | No se sustituyen métricas ausentes por ceros. Acceso solicitado en la conversación. |

| Archivo | Páginas antes → después | Cambio de texto permitido | Diff normalizado |
|---|---|---|---|
| cuaderno-estimulacion-0-3.pdf | 16 → 31 | Ninguno | Vacío |
| cuaderno-estimulacion-3-6.pdf | 17 → 30 | Ninguno | Vacío |
| kit-ejercicios-soplo.pdf | 31 → 25 | Ninguno | Vacío |
| guia-tartamudez.pdf | 16 → 16 | Guía gratuita → Guía de Tartamudez Infantil (una aparición) | Vacío |
| pack-fichas-articulacion.pdf | 34 → 34 | Retirada de · v4 con pictogramas de la portada; Title conserva v4 | Vacío |
| guia-dislexia.pdf | 20 → 20 | Ninguno | Archivo idéntico |
| calendario-semanal.pdf | Nuevo → 1 | Plantilla solicitada, sin contenido clínico añadido | Texto en calendario-text.txt |
| Pack Completo | 98 → 120 (A) → 121 (B) | 34 + 31 + 30 + 25 + 1 | Cinco archivos |

| Archivo | SHA-256 antes | SHA-256 final | HTTP | Content-Length final |
|---|---|---|---|---|
| cuaderno-estimulacion-0-3.pdf | f5616b46a0460ae409fff9a88fa97209fac565348cc7980f3fd9a5ac2e5f25cd | 64ec13151ce170cb8626df5ff99e165cf32c1412a4650a73d48ea10ae8f9b6ff | 200 | 3923238 |
| cuaderno-estimulacion-3-6.pdf | 4306c686a4a43af88da0db884346b580d84434a265eedd4f0b53e039aa5cdd8d | 161c3f317eba81f40e8cf9666158b99288e809088328d5457ae4a7aaa533b9ce | 200 | 3474674 |
| guia-dislexia.pdf | 9fdea8941e7f73967ddb2da42b4afd158864bf6902f432b7c1588b5bc19ce78b | 9fdea8941e7f73967ddb2da42b4afd158864bf6902f432b7c1588b5bc19ce78b | 200 | 2236445 |
| guia-tartamudez.pdf | d9f89be0d913438e4032ed94b4358850872a58915e6a18fd5933c3e6bf150c5d | e1a7e000b53f15bd2ef5480129738f954bea8313257d4814ed936c8e23c34458 | 200 | 2201035 |
| kit-ejercicios-soplo.pdf | 806c5b0e3fb08bfc4d0f930b3d6538039dfb03342c9921e2d09910884c76fb5e | 712b4f65ba5095d7672ccdc4f544f5dd9497dd10a0fdf60773ea4c3954ad8ef1 | 200 | 10956500 |
| pack-fichas-articulacion.pdf | f6fecf48756b6daaf6cd1fc9d9fe778436af96e7040d483519f5405489ca305b | 5659d79760e66a5308b00435cb03514dc3e96046f84e5c7cadc92c24196f1d10 | 200 | 1345168 |
| calendario-semanal.pdf | Nuevo | 61c0106958122327fbe66fff1f500c9c2de6b26a223cac278abdba8240a03315 | 200 | 369569 |

| Recurso | Actividad | Página anterior (Y, pt) | Empezaba a media página (Y > 100 pt) | Página final (Y, pt) |
|---|---|---|---|---|
| cuaderno-estimulacion-0-3.pdf | 1 | 4 (560.93) | Sí | 4 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 2 | 5 (85.43) | No | 5 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 3 | 5 (359.18) | Sí | 6 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 4 | 5 (668.18) | Sí | 7 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 5 | 6 (288.68) | Sí | 9 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 6 | 6 (560.18) | Sí | 10 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 7 | 7 (-1.57) | No | 11 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 8 | 7 (253.43) | Sí | 12 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 9 | 8 (532.43) | Sí | 14 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 10 | 8 (786.68) | Sí | 15 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 11 | 9 (225.68) | Sí | 16 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 12 | 9 (498.68) | Sí | 17 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 13 | 10 (75.68) | No | 19 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 14 | 10 (365.93) | Sí | 20 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 15 | 10 (638.93) | Sí | 21 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 16 | 11 (75.68) | No | 22 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 17 | 12 (75.68) | No | 24 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 18 | 12 (348.68) | Sí | 25 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 19 | 12 (585.68) | Sí | 26 (49.43) |
| cuaderno-estimulacion-0-3.pdf | 20 | 13 (-1.57) | No | 27 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 1 | 4 (815.93) | Sí | 5 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 2 | 5 (263.93) | Sí | 6 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 3 | 5 (574.43) | Sí | 7 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 4 | 6 (57.68) | No | 8 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 5 | 7 (111.68) | Sí | 10 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 6 | 7 (404.93) | Sí | 11 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 7 | 7 (697.43) | Sí | 12 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 8 | 8 (161.93) | Sí | 13 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 9 | 9 (568.43) | Sí | 15 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 10 | 10 (57.68) | No | 16 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 11 | 10 (350.18) | Sí | 17 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 12 | 10 (661.43) | Sí | 18 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 13 | 12 (-1.57) | No | 20 (91.43) |
| cuaderno-estimulacion-3-6.pdf | 14 | 12 (291.68) | Sí | 21 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 15 | 12 (619.43) | Sí | 22 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 16 | 13 (152.93) | Sí | 23 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 17 | 13 (761.93) | Sí | 25 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 18 | 14 (207.68) | Sí | 26 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 19 | 14 (517.43) | Sí | 27 (49.43) |
| cuaderno-estimulacion-3-6.pdf | 20 | 14 (810.68) | Sí | 28 (49.43) |
| kit-ejercicios-soplo.pdf | 1 | 6 (39.46) | No | 5 (39.46) |
| kit-ejercicios-soplo.pdf | 2 | 7 (39.46) | No | 6 (39.46) |
| kit-ejercicios-soplo.pdf | 3 | 8 (39.46) | No | 7 (39.46) |
| kit-ejercicios-soplo.pdf | 4 | 10 (39.46) | No | 8 (39.46) |
| kit-ejercicios-soplo.pdf | 5 | 11 (39.46) | No | 9 (39.46) |
| kit-ejercicios-soplo.pdf | 6 | 13 (39.46) | No | 11 (39.46) |
| kit-ejercicios-soplo.pdf | 7 | 14 (39.46) | No | 12 (39.46) |
| kit-ejercicios-soplo.pdf | 8 | 16 (39.46) | No | 13 (39.46) |
| kit-ejercicios-soplo.pdf | 9 | 17 (39.46) | No | 14 (39.46) |
| kit-ejercicios-soplo.pdf | 10 | 19 (39.46) | No | 15 (39.46) |
| kit-ejercicios-soplo.pdf | 11 | 21 (39.46) | No | 17 (39.46) |
| kit-ejercicios-soplo.pdf | 12 | 22 (39.46) | No | 18 (39.46) |
| kit-ejercicios-soplo.pdf | 13 | 23 (39.46) | No | 19 (39.46) |
| kit-ejercicios-soplo.pdf | 14 | 25 (39.46) | No | 20 (39.46) |
| kit-ejercicios-soplo.pdf | 15 | 27 (39.46) | No | 21 (39.46) |

| Prueba | Email | Alta | Atributos | Estado final |
|---|---|---|---|---|
| Quiz | sergio.gonzalezt98+quiztest@gmail.com | HTTP 200; listas [2] | {"COMPRO_PRODUCTO":false,"EDAD_HIJO":"3-4","FECHA_SUSCRIPCION":"2026-09-15","FUENTE_LEAD":"quiz-necesita-logopeda","INTERESES_TEMA":"quiz-amarillo-score-3-7","NOMBRE":"Sergio test saneamiento"} | PUT 204; GET 200; listas [7] |
| Landing | sergio.gonzalezt98+perfiltest@gmail.com | HTTP 200; listas [2] | {"COMPRO_PRODUCTO":false,"FECHA_SUSCRIPCION":"2026-09-15","FUENTE_LEAD":"guia-gratis","NOMBRE":"Sergio perfil test","PERFIL":"familia"} | PUT 204; GET 200; listas [7] |
| Blog | sergio.gonzalezt98+perfiltest@gmail.com | HTTP 200; listas [7,4] | {"COMPRO_PRODUCTO":false,"FECHA_SUSCRIPCION":"2026-09-15","FUENTE_LEAD":"newsletter-blog","NOMBRE":"Sergio perfil test","PERFIL":"profesional"} | PUT 204; GET 200; listas [7] |

| Email | messageId | Evento | Fecha |
|---|---|---|---|
| sergio.gonzalezt98+quiztest@gmail.com | <202609151348.46019976677@smtp-relay.mailin.fr> | opened | 2026-09-15T15:48:31.024+02:00 |
| sergio.gonzalezt98+quiztest@gmail.com | <202609151348.46019976677@smtp-relay.mailin.fr> | delivered | 2026-09-15T15:48:15.000+02:00 |
| sergio.gonzalezt98+quiztest@gmail.com | <202609151348.46019976677@smtp-relay.mailin.fr> | requests | 2026-09-15T15:48:14.677+02:00 |
| sergio.gonzalezt98+perfiltest@gmail.com | <202609151355.60150226457@smtp-relay.mailin.fr> | requests | 2026-09-15T15:55:29.015+02:00 |
| sergio.gonzalezt98+perfiltest@gmail.com | <202609151355.60150226457@smtp-relay.mailin.fr> | delivered | 2026-09-15T15:55:29.000+02:00 |
| sergio.gonzalezt98+perfiltest@gmail.com | <202609151354.51100004904@smtp-relay.mailin.fr> | delivered | 2026-09-15T15:54:34.000+02:00 |
| sergio.gonzalezt98+perfiltest@gmail.com | <202609151354.51100004904@smtp-relay.mailin.fr> | requests | 2026-09-15T15:54:33.011+02:00 |

| Periodo | Métrica solicitada | Valor | Estado / filtro |
|---|---|---|---|
| Últimos 30 días | Pageviews quiz | No disponible | /quiz/necesita-logopeda; requiere acceso al panel |
| Últimos 30 días | Eventos lead quiz | No disponible | fuente=quiz-necesita-logopeda; el QuizClient actual no llama a track(lead); requiere acceso al panel |
| 3–13 septiembre | Pageviews del artículo con gate | No disponible | /blog/fichas-logopedia-gratis-imprimir; requiere acceso al panel |
| 3–13 septiembre | Eventos lead | No disponible | fuente=fichas-gratis; requiere acceso al panel |
| 3–13 septiembre | Eventos descarga_pdf | No disponible | recurso=muestra-fichas-r; requiere acceso al panel |
| 3–13 septiembre | Eventos inicio_checkout | No disponible | campana / utm tripwire-fichas*; requiere acceso al panel |
| 3–13 septiembre | Tasa opt-in | No disponible | leads/pageviews; requiere acceso al panel |
| 3–13 septiembre | Tasa de descarga | No disponible | descargas/leads; requiere acceso al panel |
| 3–13 septiembre | Scroll Clarity | No disponible | Porcentaje de usuarios que llega al gate; requiere acceso al panel |

| Protección / alcance | SHA-256 antes | SHA-256 después | Estado |
|---|---|---|---|
| src/app/api/checkout/route.ts | 35f1c289a0f355d849a567abfdcb17a75f1c7636a0045441f48d9e0afa63a59d | 35f1c289a0f355d849a567abfdcb17a75f1c7636a0045441f48d9e0afa63a59d | Idéntico |
| src/app/api/webhooks/stripe/route.ts | b2b902bf360447feb229f2a59d5727bfd7e9233136f7b8ee3ace034614278553 | b2b902bf360447feb229f2a59d5727bfd7e9233136f7b8ee3ace034614278553 | Idéntico |
| src/lib/stripe.ts | 3a22d91062aeec4633f0921015d6999a7c5af997531e801ad6e78c1d1bfe1ec4 | 3a22d91062aeec4633f0921015d6999a7c5af997531e801ad6e78c1d1bfe1ec4 | Idéntico |
| next.config.ts | 3517c00a5a358846a174bee4551302fd7dd74fe022ed2e87acff6665927e10be | 3517c00a5a358846a174bee4551302fd7dd74fe022ed2e87acff6665927e10be | Idéntico |
| vercel.json | 6c02ecd30b1934803698bc4b90cb0adc0c45acc60ea27e480ac324bc50aa272e | 6c02ecd30b1934803698bc4b90cb0adc0c45acc60ea27e480ac324bc50aa272e | Idéntico |

| Validación | Resultado |
|---|---|
| Texto | pdftotext por defecto, normalización exclusiva de espacios/saltos. Kit: el orden de lectura por defecto se mantiene; no se usa -raw para la comparación. |
| Maquetación | 31 + 30 + 25 + 16 + 34 páginas renderizadas, además del calendario (1). Contact sheets inspeccionadas en tmp/pdfs/saneamiento. Cuaderno 3-6: corregidos dos títulos huérfanos y vuelto a renderizar entero. |
| Tartamudez | Conserva los cortes de maquetación preexistentes; A2 autoriza únicamente sustituir la etiqueta. |
| Checkout | Stripe simulado; siete productos; ningún cobro o email. Los otros seis productos conservan su hash de configuración. |
| Formularios | Test previo falló por PERFIL ausente; tras el cambio, pasa para familia/profesional/omitido/inválido. |
| Comunicaciones | Solo las dos direcciones de prueba autorizadas. Ningún nuevo correo a compradores, campañas ni listas. |

| Compilación y despliegue | Resultado |
|---|---|
| npx tsc --noEmit | Exit 0 tras A, B y C. |
| npm run build | Exit 0; 65/65 páginas generadas. |
| Producción A | 6316103; dpl_3qvqkJf5xo3jXPP8hXRDjzwwPQVB; Ready; live-A.json verificado antes de B. |
| Producción B | a1136b7; espacio-lenguaje-l8m78qdcw-sergioo1498s-projects.vercel.app; Ready; live-B.json verificado antes de C. |
| Producción C | bf977a8; dpl_6pNfQEmdstutnBdzTvb8w7saUsBx; Ready; live-C.json, E2E en producción y browser-checks.json. |

| Commit | Cambio |
|---|---|
| 6316103 | fix: reflow catalog PDFs and restore accurate product claims |
| a1136b7 | feat: include weekly printable calendar in complete pack |
| bf977a8 | feat: collect optional profile on guide and blog forms |

Documentación de las operaciones de verificación y limpieza: [actualizar un contacto](https://developers.brevo.com/reference/update-contact) y [eventos transaccionales](https://developers.brevo.com/reference/get-email-event-report).
