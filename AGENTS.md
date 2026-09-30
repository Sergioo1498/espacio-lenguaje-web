# AGENTS.md — Espacio Lenguaje (instrucciones permanentes para Codex)

> Colocar este archivo en la raíz del repositorio `espacio-lenguaje-web`. Codex lo lee en cada tarea. Las tareas concretas van en `docs/codex/TAREAS_OCT2026.md`.

## 1. Qué es el proyecto
Espacio Lenguaje (espaciolenguaje.com) es una marca faceless de logopedia infantil: blog SEO + recursos en PDF de pago + captación de email. Una logopeda colegiada (Bea) revisa todo el contenido clínico. El dueño es Sergio; él aprueba envíos, cambios de precio y cualquier acción irreversible. La estrategia la define Claude (director de estrategia); Codex ejecuta y reporta con evidencia.

## 2. Stack y piezas clave
- Next.js 15 App Router, SSG, Tailwind, desplegado en Vercel (proyecto `sergioo1498s-projects/espacio-lenguaje-web`).
- Contenido MDX en `content/`. Catálogo en `src/lib/products.ts` (entrega, rutas) y `src/lib/products-content.ts` (textos de landing: `features`, `whatYouGet`, FAQ).
- Checkout Stripe one-shot: `src/app/api/checkout/route.ts`; webhook `src/app/api/webhooks/stripe/route.ts` → alta en Brevo lista 3 (compradores), baja de lista 2, email transaccional de entrega. `src/lib/stripe.ts`.
- Entregables en `public/downloads/productos/` (7 PDF: pack-fichas-articulacion, cuaderno-estimulacion-0-3, cuaderno-estimulacion-3-6, kit-ejercicios-soplo, guia-dislexia, guia-tartamudez, calendario-semanal). Generadores en `scripts/` (`generate-fichas.mjs`, `_fichas-source.mjs`, `generate-product-pdfs.mjs`, `style-cuadernos.mjs`).
- Gate de fichas: `/blog/fichas-logopedia-gratis-imprimir` + `FichasGate.tsx` + `/api/lead-fichas` + `/gracias/fichas-gratis` (tripwire Pack de Fichas 4,90 €).
- Analítica: Vercel Analytics (eventos `lead`, `descarga_pdf`, `inicio_checkout`, `compra`), Clarity, Google Search Console (propiedad `https://www.espaciolenguaje.com/`).
- Pinterest vía Metricool (plan gratuito, 20 pines/mes). Material en `pinterest/`.

## 3. Brevo (email)
- Listas: **2** leads-guia-gratis · **3** compradores · **4** newsletter-blog · **5** identified_contacts · **7** blacklist/pruebas.
- Atributos: `FUENTE_LEAD` (guia-gratis, fichas-gratis, quiz-necesita-logopeda, newsletter-blog, compra-stripe…), `PERFIL` (familia/profesional), `EDAD_HIJO`, `INTERESES_TEMA`, `COMPRO_PRODUCTO`, `ORIGEN_TRAFICO`, `CAMPANA_ORIGEN`, `FECHA_SUSCRIPCION`.
- Automatización 1 «Nurturing leads guía hitos» con pitch (plantilla #4) y salida al entrar en lista 3.
- Contactos de prueba: `sergio.gonzalezt98+<etiqueta>@gmail.com`. Tras cada prueba, el contacto va a la lista 7.

## 4. Reglas que no se rompen nunca
1. **Contenido clínico:** nada clínico nuevo se publica sin revisión de Bea. Codex puede redactar borradores en `drafts/`, nunca publicarlos. No inventar estudios, cifras, autores, referencias, edades de adquisición ni tratamientos. Si un dato no tiene fuente verificable ya presente en el sitio, se omite.
2. **Frontera educativo/clínico:** sin diagnósticos, sin promesas de resultados; «cuándo consultar» donde toque.
3. **Envíos:** cero emails a listas reales o a clientes sin un «OK enviar» explícito de Sergio en la conversación. Las pruebas van solo a direcciones `sergio.gonzalezt98+…@gmail.com`.
4. **Dinero:** no cambiar precios existentes; no tocar la lógica de checkout/webhook/entrega salvo en lo que la tarea indique, y siempre con prueba en **modo test de Stripe**. Crear productos o precios en Stripe **live** solo tras «OK Stripe live» de Sergio.
5. **Credenciales:** no introducir contraseñas ni claves en formularios web; si aparece un login, parar y avisar. Las claves van en variables de entorno, nunca en commits ni en informes.
6. **SEO:** no usar la Google Indexing API para posts; no tocar el cuerpo de un post al cambiar title/meta; guardar siempre title/meta antiguos para rollback; no acumular dos cambios en la misma URL en menos de 14 días.
7. **Redes:** solo Pinterest; no publicar ni programar en Instagram, TikTok o Facebook aunque estén conectados en Metricool.
8. **Calidad del material:** freebies y PDF al nivel del Pack de Fichas v4 (paleta #C4745A / #8FAE8B / #FDF8F4 / #3D2C2E, DM Sans + DM Serif Display, pictogramas Arasaac con atribución CC BY-NC-SA). Nada de páginas medio vacías ni texto cortado.
9. **Terminología:** en contenido nuevo, dual cuando encaje («logopedia / fonoaudiología»): el 52 % del tráfico es de Latinoamérica.

## 5. Cómo trabajar e informar
- Cada tarea se ejecuta por bloques en el orden indicado; cada bloque se despliega y verifica antes del siguiente. Si algo no se puede verificar, se dice; no se estima ni se rellena con ceros.
- Commits pequeños por bloque, mensaje en español o inglés claro.
- **Informe obligatorio** al final de cada tarea en `docs/codex/informes/<fecha>-<tarea>.md` y pegado en la conversación: tabla por bloque con evidencia literal (URLs, HTTP, sha256/Content-Length de PDF, diffs, messageIds de Brevo, IDs de Stripe en test), commits, y una línea de «pendientes». Nada de prosa sin tabla.
- Distinguir siempre HECHO (medido), ESTIMACIÓN e HIPÓTESIS.
- Ante una ambigüedad que cambie el resultado, preguntar a Sergio antes de ejecutar; ante una de detalle, decidir de forma conservadora y anotarlo.
