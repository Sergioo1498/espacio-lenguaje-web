# TAREAS PARA CODEX — OCTUBRE 2026

> Guardar como `docs/codex/TAREAS_OCT2026.md`. Se ejecutan **de una en una, en este orden**, cada una con su propio prompt a Codex: «Ejecuta la TAREA N de docs/codex/TAREAS_OCT2026.md siguiendo AGENTS.md». Estrategia de fondo: `PLAN_OCTUBRE_2026` (proyecto Claude).

## 0 · Antes de empezar (Sergio, una vez)
- [ ] Repositorio clonado en el entorno de Codex con permiso de push; deploy automático de Vercel activo.
- [ ] Variables de entorno disponibles para Codex (sin pegarlas en el chat): `BREVO_API_KEY`, `STRIPE_SECRET_KEY_TEST`, `STRIPE_SECRET_KEY` (live, solo lectura salvo «OK Stripe live»), credenciales de Search Console (cuenta de servicio con acceso a la propiedad o token OAuth de hola@).
- [ ] **Acceso a Vercel Analytics:** añadir hola@espaciolenguaje.com como miembro del proyecto o un token de Vercel con permiso de lectura de Analytics. Sin esto la TAREA 1 queda coja.
- [ ] Copiar `AGENTS.md` a la raíz del repo y este archivo a `docs/codex/`.

---

## TAREA 1 · Cerrar las fugas de medición (semana 1)

**Por qué:** en septiembre no pudimos medir el opt-in del gate, atribuir el tripwire ni saber por qué el quiz está a cero. Sin esto, octubre se decide a ciegas.

**A · Atribución en Stripe.** Al crear la sesión de Checkout, copiar a `metadata` de la sesión y del `payment_intent`: `utm_source`, `utm_medium`, `utm_campaign`, la página de origen (`referrer_path`) y `ORIGEN_TRAFICO` si existe la cookie de atribución de 30 días. Incluye los tripwires (`tripwire-fichas`, `tripwire-fichas-pdf`). Prueba en **modo test**: 2 compras simuladas (una desde `/gracias/fichas-gratis`, otra desde la landing) → metadata visible en Stripe test. El webhook debe escribir `CAMPANA_ORIGEN` en Brevo al alta del comprador. Checkout y entrega: mismo comportamiento que hoy (hashes de los PDF sin cambios, email de entrega idéntico).

**B · Quiz.** Verificar en producción: (1) que el envío del quiz dispara `track('lead', {fuente:'quiz-necesita-logopeda'})`; (2) que existen los 3 CTA al quiz en `/blog/mi-hijo-de-3-anos-no-habla-bien`, `/blog/mi-hijo-no-habla-cuando-preocuparse`, `/blog/a-que-edad-debe-hablar-un-nino` con el texto literal: «¿Dudas sobre si tu peque necesita logopeda? Haz nuestro test orientativo de 2 minutos. No es un diagnóstico: te orienta sobre cuándo consultar.» + botón «Hacer el test». Si falta algo, añadirlo (sin tocar el resto del post). Prueba E2E con `+quiztest3`, limpieza a lista 7.

**C · Opt-in y embudo (solo lectura).** Con Vercel Analytics, del 1 al 30 de septiembre y del 1 de octubre en adelante: páginas vistas y eventos `lead` por fuente para `/blog/fichas-logopedia-gratis-imprimir`, `/lp/guia-gratis`, quiz y formulario del blog; `descarga_pdf`, `inicio_checkout` y `compra` por utm. Tabla con opt-in (leads/vistas) por punto de captura. Si no hay acceso: «sin acceso», no estimar.

**D · Informe semanal automático.** Crear `scripts/weekly-report.mjs` que genere `docs/informes/semana-<AAAA-MM-DD>.md` con los 7 números de la revisión semanal: clics/impresiones/CTR/posición GSC (7 y 28 días) y de las 5 URLs top; leads nuevos por día, por `FUENTE_LEAD`, por `PERFIL` y por `ORIGEN_TRAFICO` (Brevo, por `createdAt` en Europe/Madrid, excluyendo lista 7); ventas, devoluciones, ingreso neto y AOV (Stripe live, solo lectura); Pinterest desde el CSV exportado de Metricool si existe. Sin escritura en ningún sistema. Ejecutarlo una vez y adjuntar la salida.

**Informe:** tablas A-D, commits, salida de `weekly-report`.

---

## TAREA 2 · Pack Profesional (semanas 1-2) — con dos paradas

**Por qué:** 16 de 20 leads que declararon perfil son profesionales; el techo de 14,90 € no deja crecer la facturación. Mismo material, licencia profesional, otro precio.

**A · Producto.**
- Entregables: los 5 PDF del Pack Completo (mismas rutas) + **Guía de uso en sesión** (`guia-uso-profesional.pdf`, 6-8 págs.) + licencia.
- La guía: Codex maqueta el **esqueleto y las plantillas no clínicas** — portada, índice, «Cómo está organizado el material» (mapa de qué PDF trabaja qué área, sacado literalmente de las landings actuales), **hoja de registro por alumno** (nombre · objetivo · ficha/actividad · fecha · resultado · observaciones), **plantilla de pauta para familias** (casillas en blanco para que el profesional escriba), y la licencia resumida. La sección «Cómo secuenciar el material por objetivo» queda como página marcada `[CONTENIDO BEA]` en `drafts/pack-profesional/`: la escribe Bea.
- **Licencia** (borrador en `drafts/pack-profesional/LICENCIA.md`, lenguaje llano): uso por un profesional (logopeda, fonoaudiólogo/a, maestro/a AL/PT, psicopedagogo/a) con todos los niños y familias que atienda, en consulta, aula o centro; impresión ilimitada para esas sesiones; entregar copias impresas a las familias atendidas; **no** permitido: revender, subir el PDF a webs/drives compartidos, distribuir el archivo digital, uso por varios profesionales de un centro (→ licencia de centro, «consúltanos»). Marcar «PENDIENTE DE REVISIÓN LEGAL».
- Precio: **34,90 €**. Crear producto y precio en **Stripe test**; entrega configurada en `products.ts` con los 6 archivos + licencia.

**B · Landing** `/recursos/pack-profesional` (con `noindex` y sin enlaces entrantes hasta el OK final): propuesta («El material de Espacio Lenguaje, con licencia para usarlo en tu consulta o aula»), qué incluye con nº de páginas reales, para quién (logopedas / fonoaudiólogos, maestros AL/PT, psicopedagogos), qué permite la licencia en 5 viñetas, comparación con el Pack Completo (mismo material + licencia + guía), garantía de 14 días igual que el resto, FAQ (5) incluida «¿Puedo usarlo en un centro con varios profesionales?». Terminología dual. Sin testimonios inventados.

**⏸ PARADA 1:** informe con capturas de la landing (móvil y escritorio), PDF de la guía con el hueco de Bea, licencia en borrador y compra de prueba en Stripe test con entrega recibida en `+packprotest`. Esperar «OK pack pro» de Sergio **y** licencia revisada por abogado **y** sección de Bea escrita.

**C · Publicación (tras la parada 1).** Insertar el texto de Bea, regenerar la guía, crear producto/precio en **Stripe live** (requiere «OK Stripe live»), quitar `noindex`, añadir al sitemap, enlaces desde: bloque de producto de `/blog/fichas-logopedia-gratis-imprimir` (visible cuando el lector elige «profesional» en el gate y como segundo CTA), `/recursos`, y los posts con intención profesional (fichas, praxias, conciencia fonológica). En `/gracias/fichas-gratis`, si `PERFIL=profesional`, mostrar el Pack Profesional en lugar del tripwire de 4,90 €.

**D · Email a profesionales.** Redactar en `drafts/pack-profesional/email-profesionales.md` un único email para los leads con `PERFIL=profesional` (hoy ~16): presentación honesta del pack, sin urgencia artificial ni descuento. Crear plantilla en Brevo y enviarla solo a `+packproemail`.

**⏸ PARADA 2:** esperar «OK enviar profesionales». Tras el OK, envío transaccional uno a uno (no campaña) y registro de messageIds.

**E · Rama de nurturing (la hace Sergio en Brevo; Codex prepara).** Plantilla `nurturing-04b-pitch-profesional` en Brevo + instrucciones paso a paso para que Sergio añada en la automatización 1 una condición «PERFIL = profesional → plantilla 04b; si no → plantilla 04». Codex no edita automatizaciones.

**Informe:** tablas A-E, IDs de Stripe (test y, en su caso, live), capturas, commits.

---

## TAREA 3 · Pieza 4: «Palabras y frases con R fuerte» (borrador para Bea)

Seguir el brief `BRIEFS_PIEZAS_2_4_OCT2026.md` (copiar a `docs/codex/`). Entregables **en `drafts/pieza-4-r-fuerte/`, sin publicar**:
- `post.mdx` con la estructura del brief; cada bloque clínico marcado `⚕ REVISAR BEA`; listas de palabras propias (vocabulario infantil frecuente, ordenadas de simple a complejo) y frases/trabalenguas originales; edades y «cuándo consultar» copiados **literalmente** de lo ya publicado en `ejercicios-para-la-r-fuerte` y en el Pack de Fichas.
- `REVISION_BEA.md`: tabla con cada lista/frase para que Bea marque OK/cambio, y las 5 FAQ.
- Freebie `listas-r-fuerte.pdf` (8 págs., estándar v4, pictogramas Arasaac en palabras clave, hoja de registro, última página con tripwire al Pack de Fichas).
- Preparado pero **desactivado**: fuente `r-fuerte-gratis`, `/gracias/r-fuerte`, tripwire con `utm_campaign=tripwire-r-fuerte` y metadata de Checkout (Tarea 1A).
- 3 pines nuevos (mockups del freebie) en `pinterest/` para añadir a la cola de noviembre.

**Informe:** rutas, render de las 8 págs. del PDF, recuento de palabras por lista, commits. Publicación: tarea aparte cuando Bea devuelva la revisión.

---

## TAREA 4 · Sprint CTR 2: posts de la S y de soplo (semana 2)

**A · Diagnóstico (solo lectura, GSC 28 días):** para `/blog/mi-hijo-no-pronuncia-la-s` y `/blog/ejercicios-de-soplo-para-ninos`: 20 consultas top con impresiones, clics, CTR y posición; title y meta actuales; qué intención domina (¿buscan ejercicios? ¿edad? ¿juegos?). Línea base 28 días de cada URL.

**B · Propuesta** en el informe: 2 opciones de title (≤60) y meta (150-155) por URL con el método de siempre (keyword literal al inicio, beneficio que ya esté en el post, señal «revisado por logopeda», sin clickbait ni promesas). **⏸ PARADA:** esperar a que Sergio o Claude elijan opción.

**C · Aplicar** la opción elegida (solo title/meta; H1 solo si no contiene la keyword), desplegar, solicitar indexación desde la inspección de URL de GSC, guardar los antiguos para rollback. Fecha de medición: +14 días.

---

## TAREA 5 · Pieza 2: «Fichas de praxias bucofaciales para imprimir» (borrador para Bea)

Igual que la Tarea 3, siguiendo el brief de la pieza 2, en `drafts/pieza-2-praxias/`. Diferencia clave: **el contenido de las 8 fichas lo define Bea**; Codex entrega la estructura, la maqueta del PDF con los huecos marcados, la caja de honestidad copiada del post de praxias existente, y la configuración desactivada (`praxias-gratis`, `/gracias/praxias`, `tripwire-praxias` → Kit de Soplo). Antes de redactar, comprobar en GSC la anomalía de «materiales para trabajar praxias bucofaciales con niños» (pos. 2,2 con 0 clics: tipo de resultado, dispositivo, país) y reportarla.

---

## Calendario orientativo
| Semana | Tareas |
|---|---|
| 1 (1-5 oct) | T1 completa · T2 A-B hasta parada 1 · T3 |
| 2 (6-12 oct) | T4 · T2 C-D si hay OK, licencia y texto de Bea |
| 3-4 (13-26 oct) | T5 · publicación de la pieza 4 tras revisión de Bea |
| 31 oct | `weekly-report` + revisión de cierre con Claude |
