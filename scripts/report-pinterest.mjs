import fs from 'node:fs';
const pins=JSON.parse(fs.readFileSync('pinterest/pins.json','utf8'));
const before=JSON.parse(fs.readFileSync('pinterest/metadata-before.json','utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
fs.writeFileSync('public/pinterest/index.html',`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Biblioteca Pinterest · Espacio Lenguaje</title><style>body{margin:0;background:#FDF8F4;color:#3D2C2E;font:16px system-ui}header{padding:48px 5vw 24px;max-width:900px}h1{font:44px Georgia;margin:0 0 16px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;padding:24px 5vw 64px}figure{margin:0;background:white;border:1px solid #e3d7d0;border-radius:12px;overflow:hidden}img{display:block;width:100%;height:auto}figcaption{padding:20px}a{color:#8f4c37}p{line-height:1.5}small{color:#685659}</style><header><p>ESPACIO LENGUAJE · BIBLIOTECA DE CONTENIDO</p><h1>60 ideas para compartir</h1><p>40 pines de arranque y 20 de continuidad. Material preparado, pendiente de publicación en Pinterest. Las fechas son una propuesta.</p></header><main>${pins.map(p=>`<figure><a href="${esc(p.imageUrl)}"><img src="${esc(p.filename)}" width="1000" height="1500" loading="lazy" alt="${esc(p.headline)}"></a><figcaption><small>${p.id} · ${p.batch} · ${p.date} ${p.time} Madrid</small><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><p><small>${esc(p.board)}</small></p><a href="${esc(p.link)}">Página de destino →</a></figcaption></figure>`).join('')}</main></html>`);
const statuses=fs.existsSync('pinterest/metadata-after.json')?JSON.parse(fs.readFileSync('pinterest/metadata-after.json','utf8')):null;
const cleanup=fs.existsSync('pinterest/brevo-cleanup.json')?JSON.parse(fs.readFileSync('pinterest/brevo-cleanup.json','utf8')):null;
const live=fs.existsSync('pinterest/images-live.json')?JSON.parse(fs.readFileSync('pinterest/images-live.json','utf8')):null;
fs.writeFileSync('pinterest/INFORME.md',`# Experimento Pinterest — septiembre 2026

Commit de implementación: **6f9fd66**. Evidencias y resultados detallados en [VERIFICACION.md](VERIFICACION.md).

## Estado por bloque

| Bloque | Resultado | Evidencia |
|---|---|---|
| A1 · Reclamar dominio | Pendiente del código de Sergio; no se ha insertado un valor ficticio | ENCARGO.md, hueco A1 |
| A2 · Metadatos | ${statuses?`${statuses.length} URLs verificadas; ${statuses.filter(p=>p.issues.length).length} con incidencias`:'Cambios preparados; verificación del despliegue pendiente'} | metadata-before.json / metadata-after.json |
| A2 · Rich Pins Pinterest | Metadatos auditados; no se afirma validación externa de Pinterest | La ayuda oficial actual describe sincronización automática; ver comprobación manual abajo |
| A3 · Brevo | ORIGEN_TRAFICO y CAMPANA_ORIGEN creados como texto | brevo-attributes.json |
| A3 · Formularios | Guía de portada y landing, fichas, quiz y blog; primera visita, caducidad de 30 días | scripts/test-traffic-attribution.mjs |
| A3 · E2E | ${cleanup?'Alta verificada y contacto trasladado a lista 7':'Pendiente del despliegue y de la prueba en producción'} | brevo-read.json / brevo-cleanup.json |
| B1 · Inventario | 25 posts y 7 productos; 3 ideas por página | INVENTARIO.md, inventory.json |
| B2 · Arranque | 40 PNG, 1000×1500, DM Sans + DM Serif Display, paleta de marca, logo y sello | public/pinterest/, render-audit.json |
| B3 · Metricool | Borradores con campos documentados; NO importables como entrega final hasta recibir la plantilla exacta | metricool-inicial-PENDIENTE-PLANTILLA.csv |
| B3 · Respaldo Pinterest | CSV con cabeceras solicitadas y horas UTC | pinterest-inicial-PROPUESTA.csv |
| B4 · Continuidad | 20 PNG y CSV, 5 por semana durante 4 semanas | pinterest-continuidad-PROPUESTA.csv |
| Imágenes públicas | ${live?`${live.length} comprobadas; ${live.filter(x=>x.http===200&&x.matches).length} HTTP 200 con hash idéntico`:'Pendiente de despliegue'} | images-live.json |
| C1 · Analytics | Sin acceso: 404 con hola@espaciolenguaje.com en el proyecto de sergioo1498 | Comprobación visible del panel; instrucciones abajo |
| C2 · Revisión semanal | Línea incorporada al plan actualizado | PLAN-CRECIMIENTO.md |

## Calendario y archivos

Inicio **propuesto**, no confirmado: ${pins[0].date}. No hay pines publicados por el ejecutor ni programación realizada. El primer día contiene 8 pines y los ocho siguientes, 4 por día. Dos turnos alternos: 10:00 y 19:00 Europe/Madrid. Continuidad del ${pins[40].date} al ${pins[59].date}; cinco pines cada semana. Pinterest recibe UTC, incluido el cambio de hora del 25 de octubre.

La tabla completa de los **60 títulos, boards, fechas, enlaces UTM e imágenes** está en [CALENDARIO.md](CALENDARIO.md). Galería: https://www.espaciolenguaje.com/pinterest/index.html.

Los CSV de Metricool son documentos preparatorios: falta adaptar TODAS las cabeceras, su orden, separador y formatos a la plantilla que descargue Sergio. No se ha simulado una importación ni se ha confirmado su compatibilidad con la cuenta. Los CSV de respaldo de Pinterest tienen fechas propuestas; comprobar que sigan siendo futuras antes de importar. Nunca dejar Publish date vacío: Pinterest lo interpreta como publicación inmediata.

## Texto y diseño

Titular de imagen ≤12 palabras, título ≤100 caracteres y descripción de 150–300 caracteres en los 60 pines. Los tres paneles proceden literalmente de los encabezados de cada página (se retira la numeración cuando la aporta el diseño). Los titulares resumen el mismo contenido. No hay fotos de personas, pictogramas ajenos ni nuevas afirmaciones clínicas. Las licencias OFL de las dos fuentes están junto a los archivos de fuente. Se han revisado las cinco hojas de contacto y un pin a tamaño completo. Los 40 iniciales respetan el reparto 12/10/8/6/4.

## Atribución

Se guarda utm_source, utm_medium y utm_campaign en localStorage el-first-visit, con vencimiento de 30 días. Brevo recibe ORIGEN_TRAFICO (source) y CAMPANA_ORIGEN (campaign); medium permanece en la atribución del navegador. FUENTE_LEAD sigue identificando el formulario. Una primera visita sin UTM queda sin atribución: no se inventa direct. Los envíos sin atribución no borran valores ya existentes en Brevo. Si el navegador bloquea almacenamiento, el formulario sigue funcionando y aprovecha los UTM de la URL actual. No se han cambiado precios, checkout, webhook, entrega ni cuerpos de los posts.

## URLs corregidas en A2

| URL | Incidencia inicial |
|---|---|
${before.map(p=>`| ${p.url} | ${p.issues.join('; ')||'Sin incidencias'} |`).join('\n')}

article:author corresponde a artículos, no a productos. Los productos conservan su schema Product y precio real. Todas las imágenes destacadas ya superaban 1000 px de ancho.

## Comprobación manual de Rich Pins

La [documentación oficial de Pinterest](https://help.pinterest.com/en/business/article/rich-pins) indica que el marcado permite la sincronización automática (puede tardar hasta 24 horas). No presenta el antiguo validador como requisito de activación. Esto no garantiza la aceptación ni visualización de un pin de producto.

Tras publicar, revisar estos tres destinos y registrar el resultado visible en Pinterest:
- https://www.espaciolenguaje.com/blog/fichas-logopedia-gratis-imprimir
- https://www.espaciolenguaje.com/blog/ejercicios-para-la-r-fuerte
- https://www.espaciolenguaje.com/recursos/fichas-articulacion

## Medición cada lunes

1. Entrar con la cuenta con acceso al proyecto Vercel → espacio-lenguaje-web → Analytics. Elegir la semana anterior completa.
2. Panel UTM Parameters → Source → pinterest. Leer la métrica que muestre el panel con su nombre exacto; Visitors y Page Views no equivalen a sesiones. Los filtros UTM requieren Web Analytics Plus o Enterprise según la [documentación de Vercel](https://vercel.com/docs/analytics/filtering). Si no existe el filtro, registrar «no disponible», no cero.
3. Como comprobación separada, panel Referrers → pinterest.com; este filtro no sustituye a utm_source=pinterest (la app puede no enviar referrer). No se ha confirmado tráfico real ni eventos históricos.
4. Brevo → contactos filtrados por ORIGEN_TRAFICO=pinterest y fecha del periodo. Excluir la lista 7 y el alias pintest de las cifras reales.
5. Metricool → Analítica → Pinterest: registrar los pines efectivamente publicados acumulados, no los preparados ni programados.

**Fecha de decisión: pendiente de la fecha real del primer pin.** Día 60 desde ese primer pin; umbral original ≥500 sesiones/mes. Si Vercel no ofrece sesiones, dejar el dato pendiente y acordar una métrica comparable antes de decidir; no sustituirlo silenciosamente por visitas o visitantes.

## Fuentes operativas

- [CSV de Metricool](https://help.metricool.com/how-to-schedule-posts-in-batch-with-a-csv-file-in-metricool-3zwxj): plantilla exacta, UTF-8 y formatos seleccionados al importar.
- [Subida masiva de Pinterest](https://help.pinterest.com/en/business/article/bulk-upload-video-pins): columnas y fecha/hora UTC.

## Pendientes de Sergio

Código de verificación; plantilla CSV de Metricool; confirmación de fecha de arranque; revisión editorial de las piezas antes de publicarlas según el plan; importación/publicación y confirmación del primer pin. El sello se refiere al contenido original revisado y no sustituye esa revisión final.
`);
console.log('Report and gallery generated.');
