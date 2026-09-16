# Experimento Pinterest — septiembre 2026

Commit de implementación: **6f9fd66**. Evidencias y resultados detallados en [VERIFICACION.md](VERIFICACION.md).

Segundo pase: ver [INFORME-SEGUNDO-PASE.md](INFORME-SEGUNDO-PASE.md).

## Estado por bloque

| Bloque | Resultado | Evidencia |
|---|---|---|
| A1 · Reclamar dominio | Pendiente del código de Sergio; no se ha insertado un valor ficticio | ENCARGO.md, hueco A1 |
| A2 · Metadatos | 32 URLs verificadas; 0 con incidencias | metadata-before.json / metadata-after.json |
| A2 · Rich Pins Pinterest | Metadatos auditados; no se afirma validación externa de Pinterest | La ayuda oficial actual describe sincronización automática; ver comprobación manual abajo |
| A3 · Brevo | ORIGEN_TRAFICO y CAMPANA_ORIGEN creados como texto | brevo-attributes.json |
| A3 · Formularios | Guía de portada y landing, fichas, quiz y blog; primera visita, caducidad de 30 días | scripts/test-traffic-attribution.mjs |
| A3 · E2E | Alta verificada y contacto trasladado a lista 7 | brevo-read.json / brevo-cleanup.json |
| B1 · Inventario | 25 posts y 7 productos; 3 ideas por página | INVENTARIO.md, inventory.json |
| B2 · Arranque | 40 PNG, 1000×1500, DM Sans + DM Serif Display, paleta de marca, logo y sello | public/pinterest/, render-audit.json |
| B3 · Metricool | Borradores con campos documentados; NO importables como entrega final hasta recibir la plantilla exacta | metricool-inicial-PENDIENTE-PLANTILLA.csv |
| B3 · Respaldo Pinterest | CSV con cabeceras solicitadas y horas UTC | pinterest-inicial-PROPUESTA.csv |
| B4 · Continuidad | 20 PNG y CSV, 5 por semana durante 4 semanas | pinterest-continuidad-PROPUESTA.csv |
| Imágenes públicas | 60 comprobadas; 60 HTTP 200 con hash idéntico | images-live.json |
| C1 · Analytics | Sin acceso: 404 con hola@espaciolenguaje.com en el proyecto de sergioo1498 | Comprobación visible del panel; instrucciones abajo |
| C2 · Revisión semanal | Línea incorporada al plan actualizado | PLAN-CRECIMIENTO.md |

## Calendario y archivos

Inicio **propuesto**, no confirmado: 2026-09-21. No hay pines publicados por el ejecutor ni programación realizada. El primer día contiene 8 pines y los ocho siguientes, 4 por día. Dos turnos alternos: 10:00 y 19:00 Europe/Madrid. Continuidad del 2026-10-05 al 2026-10-30; cinco pines cada semana. Pinterest recibe UTC, incluido el cambio de hora del 25 de octubre.

La tabla completa de los **60 títulos, boards, fechas, enlaces UTM e imágenes** está en [CALENDARIO.md](CALENDARIO.md). Galería: https://www.espaciolenguaje.com/pinterest/index.html.

Los CSV de Metricool son documentos preparatorios: falta adaptar TODAS las cabeceras, su orden, separador y formatos a la plantilla que descargue Sergio. No se ha simulado una importación ni se ha confirmado su compatibilidad con la cuenta. Los CSV de respaldo de Pinterest tienen fechas propuestas; comprobar que sigan siendo futuras antes de importar. Nunca dejar Publish date vacío: Pinterest lo interpreta como publicación inmediata.

## Texto y diseño

Titular de imagen ≤8 palabras, título ≤100 caracteres y descripción de 150–300 caracteres en los 60 pines. Se han sustituido las tarjetas del primer pase por 44 mockups de páginas reales y 16 tarjetas con cuatro composiciones. Las páginas PDF se renderizan con pdftoppm a 300 dpi. Las tablas y listas proceden de los artículos enlazados. Las fuentes exactas, páginas y textos extraídos están en render-audit-v2.json. La galería lleva noindex,nofollow y no figura en el sitemap.

## Atribución

Se guarda utm_source, utm_medium y utm_campaign en localStorage el-first-visit, con vencimiento de 30 días. Brevo recibe ORIGEN_TRAFICO (source) y CAMPANA_ORIGEN (campaign); medium permanece en la atribución del navegador. FUENTE_LEAD sigue identificando el formulario. Una primera visita sin UTM queda sin atribución: no se inventa direct. Los envíos sin atribución no borran valores ya existentes en Brevo. Si el navegador bloquea almacenamiento, el formulario sigue funcionando y aprovecha los UTM de la URL actual. No se han cambiado precios, checkout, webhook, entrega ni cuerpos de los posts.

## URLs corregidas en A2

| URL | Incidencia inicial |
|---|---|
| https://www.espaciolenguaje.com/blog/a-que-edad-debe-hablar-un-nino | article:author missing |
| https://www.espaciolenguaje.com/blog/actividades-ninos-2-anos-lenguaje | article:author missing |
| https://www.espaciolenguaje.com/blog/atencion-temprana-que-es | article:author missing |
| https://www.espaciolenguaje.com/blog/bilinguismo-infantil-mitos-y-realidades | article:author missing |
| https://www.espaciolenguaje.com/blog/como-ensenar-la-r-a-un-nino | article:author missing |
| https://www.espaciolenguaje.com/blog/conciencia-fonologica-actividades | article:author missing |
| https://www.espaciolenguaje.com/blog/dislalia-infantil-tipos | article:author missing |
| https://www.espaciolenguaje.com/blog/dislexia-en-ninos-como-detectarla | article:author missing |
| https://www.espaciolenguaje.com/blog/ejercicios-de-soplo-para-ninos | article:author missing |
| https://www.espaciolenguaje.com/blog/ejercicios-lenguaje-para-casa | article:author missing |
| https://www.espaciolenguaje.com/blog/ejercicios-para-la-r-fuerte | article:author missing |
| https://www.espaciolenguaje.com/blog/estimulacion-del-lenguaje-en-casa | article:author missing |
| https://www.espaciolenguaje.com/blog/etapas-desarrollo-del-lenguaje | article:author missing |
| https://www.espaciolenguaje.com/blog/fichas-logopedia-gratis-imprimir | article:author missing |
| https://www.espaciolenguaje.com/blog/frenillo-lingual-sintomas | article:author missing |
| https://www.espaciolenguaje.com/blog/juegos-para-estimular-el-habla | article:author missing |
| https://www.espaciolenguaje.com/blog/logopedia-online-como-funciona | article:author missing |
| https://www.espaciolenguaje.com/blog/mi-hijo-de-3-anos-no-habla-bien | article:author missing |
| https://www.espaciolenguaje.com/blog/mi-hijo-no-habla-cuando-preocuparse | article:author missing |
| https://www.espaciolenguaje.com/blog/mi-hijo-no-pronuncia-la-s | article:author missing |
| https://www.espaciolenguaje.com/blog/praxias-bucofaciales-ninos | article:author missing |
| https://www.espaciolenguaje.com/blog/retraso-simple-del-lenguaje | article:author missing |
| https://www.espaciolenguaje.com/blog/tartamudez-infantil-cuando-preocuparse | article:author missing |
| https://www.espaciolenguaje.com/blog/tel-trastorno-especifico-lenguaje | article:author missing |
| https://www.espaciolenguaje.com/blog/vocabulario-ninos-como-ampliar | article:author missing |
| https://www.espaciolenguaje.com/recursos/fichas-articulacion | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/cuaderno-0-3 | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/cuaderno-3-6 | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/kit-soplo | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/pack-completo | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/guia-dislexia | og:type incorrect |
| https://www.espaciolenguaje.com/recursos/guia-tartamudez | og:type incorrect |

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
