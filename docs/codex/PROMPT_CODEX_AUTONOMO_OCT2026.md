Trabaja en modo autónomo sobre el repositorio de Espacio Lenguaje. Lee primero `AGENTS.md` (reglas permanentes) y `docs/codex/TAREAS_OCT2026.md` (tareas) y `docs/codex/BRIEFS_PIEZAS_2_4_OCT2026.md` (briefs). Ejecuta las TAREAS 1, 2, 3, 4 y 5 completas, en ese orden, sin pedirme confirmación ni esperar respuesta entre bloques. No te detengas hasta terminar todo lo que sea posible y, al final, entrégame un único informe.

CÓMO DECIDIR SIN PREGUNTAR
- Ante cualquier duda de detalle, elige la opción más conservadora y reversible, anótala en el informe como «Decisión tomada» con su motivo y sigue.
- Si te falta un acceso o algo falla, no te bloquees: documenta el problema, sigue con el siguiente bloque o la siguiente tarea, y vuelve a intentarlo al final.
- Donde las tareas dicen «⏸ PARADA» o «esperar OK», NO esperes: deja todo preparado y probado hasta justo antes de la acción irreversible, apúntalo en la sección «Pendiente de OK de Sergio» del informe y continúa con lo siguiente.
- TAREA 4 (títulos de S y soplo): no esperes a que elijamos; aplica tú la mejor opción según el método de AGENTS.md, guarda los títulos y metas antiguos para rollback y solicita la indexación. Es reversible.

LÍNEAS QUE NO CRUZAS AUNQUE TRABAJES SOLO (se quedan preparadas en «Pendiente de OK»)
1. Enviar emails a personas reales o a listas de Brevo (solo pruebas a sergio.gonzalezt98+…@gmail.com).
2. Crear productos o precios en Stripe live, o cualquier cobro real. Todo el Pack Profesional se construye y prueba en Stripe test; la landing queda con noindex y sin enlaces entrantes.
3. Publicar contenido clínico: las piezas 4 y 2 y la sección de la guía profesional quedan en `drafts/` para Bea.
4. Publicar la licencia del Pack Profesional sin revisión legal.
5. Editar automatizaciones de Brevo, introducir contraseñas en webs o tocar Instagram, TikTok o Facebook.
Si alguna instrucción de una tarea contradice estas cinco líneas, ganan estas líneas.

VERIFICACIÓN ANTES DE DAR ALGO POR HECHO
Cada bloque desplegado se comprueba en producción (HTTP, contenido servido, hashes de PDF, eventos). Si no puedes verificar algo, escribe «no verificado» y por qué. No estimes métricas ni rellenes con ceros.

AL TERMINAR
Crea `docs/codex/informes/2026-10-INFORME-AUTONOMO.md`, haz commit y pégalo completo en la conversación con esta estructura:
1. Resumen en 10 líneas: qué quedó hecho, qué quedó preparado, qué falló.
2. Una tabla por tarea (1 a 5) y por bloque: estado (HECHO / PREPARADO / BLOQUEADO / FALLIDO) y evidencia literal (URLs, códigos HTTP, sha256 y Content-Length de los PDF, IDs de Stripe test, messageIds de las pruebas de Brevo, diffs de title/meta, rutas de drafts).
3. «Decisiones tomadas sin consultar», con su motivo.
4. «Pendiente de OK de Sergio»: una lista numerada donde cada punto dice qué falta, qué pasará exactamente si doy el OK y la frase literal que tengo que escribirte para lanzarlo (por ejemplo «OK Stripe live pack pro», «OK enviar profesionales»).
5. «Pendiente de Bea»: archivos y qué tiene que revisar en cada uno.
6. «Accesos que faltaron» y cómo dártelos.
7. Salida de `scripts/weekly-report.mjs` ejecutado al final.
8. Lista de commits y enlaces a los deploys de Vercel.

Empieza ya por la TAREA 1 y no pares hasta completar el informe.
