> Estado vigente: 60 pines programados, 20/mes, plan gratuito. Ver [INFORME-PUESTA-EN-MARCHA.md](INFORME-PUESTA-EN-MARCHA.md) y [CALENDARIO.md](CALENDARIO.md). El contenido siguiente documenta una fase anterior; no volver a importar los CSV.

# Pinterest — segundo pase antes de publicar

## Cambios

| Requisito | Entrega | Evidencia |
|---|---|---|
| Al menos 40 mockups | **44 mockups**, números 1–44; dos o tres páginas superpuestas con sombras sobre #FDF8F4 | pins.json, render-audit-v2.json |
| Material real | Fichas del pack y muestra gratuita, actividades de ambos cuadernos, ejercicios del kit, calendario y páginas de las guías | Ruta del PDF, página y SHA-256 en render-audit-v2.json |
| Render PDF | **pdftoppm -r 300 -png**, con selección de páginas; PDF originales sin modificar | scripts/render-pinterest-v2.py |
| Artículos | Tablas y listas transcritas literalmente de las fuentes publicadas, con contexto y rótulo «Extracto del artículo» | Campos literal, columns, heading y source del manifiesto |
| Tarjetas | **16 tarjetas**, números 45–60; cuatro composiciones con fondos salvia, crema, cacao y terracota, sin botón repetido | previews-v2/ |
| Titulares y descripciones | 60 titulares de hasta **8 palabras** y descripciones de **150–300 caracteres**, reescritos individualmente | copy-v2.txt, tabla-60-pines.csv |
| Tono | Se eliminan las fórmulas repetidas del primer pase. Logopedia/fonoaudiología se integra en dos pines para profesionales | Pines 37 y 40 |
| Galería | Meta robots **noindex,nofollow**. La ruta ya estaba excluida del sitemap por su listado explícito de páginas | public/pinterest/index.html, src/app/sitemap.ts |
| Imágenes | Permanecen públicas. Enlaces de la galería y CSV con ?v=2 para actualizar las vistas previas | imageUrl de pins.json |
| Publicación | No se publica ni programa ningún pin en Pinterest o Metricool | Únicamente se actualizan archivos y su alojamiento en la web |

## Archivos

- [Tabla de 60 filas](CALENDARIO.md): número, tipo, título, descripción, board, enlace UTM, fecha Madrid e imagen.
- [Tabla CSV de 60 filas](tabla-60-pines.csv).
- Pinterest: pinterest-inicial-PROPUESTA.csv (40) y pinterest-continuidad-PROPUESTA.csv (20).
- Metricool: metricool-inicial-PENDIENTE-PLANTILLA.csv y metricool-continuidad-PENDIENTE-PLANTILLA.csv. Siguen pendientes de adaptar a la plantilla real de la cuenta; no se presentan como importación validada.
- Galería: https://www.espaciolenguaje.com/pinterest/index.html?v=2.
- Nuevo ZIP: ENTREGA_PINTEREST_SEP2026_V2.zip, en la carpeta principal del proyecto.

Se conservan las fechas propuestas del 21 de septiembre al 30 de octubre, las seis categorías de boards y los destinos UTM. La fecha real de arranque sigue pendiente de confirmación. Los CSV de Pinterest llevan la hora UTC correspondiente a Madrid, incluido el cambio de hora de octubre.

## Trazabilidad visual

Las imágenes del post de fichas que presentan la muestra usan el PDF gratuito, sin hacer pasar el pack de pago por descarga gratuita. Los pines profesionales de conciencia fonológica y selección de materiales muestran la tabla del propio artículo. Los mockups con pictogramas incluyen la atribución Arasaac / Gobierno de Aragón / CC BY-NC-SA.

Los extractos de artículos conservan encabezados, columnas y celdas o elementos de lista. Los saltos de línea se adaptan a la imagen, sin introducir texto clínico nuevo. Las páginas PDF se muestran completas como objetos superpuestos, sin rehacer su contenido. Los PDF, artículos, formularios, precios, checkout, webhook y entrega permanecen intactos en este segundo pase.

## Validación final

Ejecutar scripts/verify-pinterest-assets.mjs para dimensiones, número de mockups/tarjetas, límites de texto, fuentes y enlaces; añadir --live para verificar HTTP 200 y hash de las 60 imágenes. Los resultados del segundo pase se conservan en images-live-v2.json y comprobacion-web-v2.json. La comprobación visual usa las seis hojas de contacto de previews-v2 y ampliaciones de muestras representativas.


Verificado en produccion el 16 de septiembre de 2026: despliegue 7f82073 correcto, 60 PNG con HTTP 200 y SHA-256 identico al archivo local; galeria HTTP 200 con 60 figuras y robots noindex,nofollow; sitemap HTTP 200 sin /pinterest/. Los cinco CSV contienen 40, 20, 40, 20 y 60 filas respectivamente. ZIP comprobado sin errores.
