> Estado vigente: 60 pines programados, 20/mes, plan gratuito. Ver [INFORME-PUESTA-EN-MARCHA.md](INFORME-PUESTA-EN-MARCHA.md) y [CALENDARIO.md](CALENDARIO.md). El contenido siguiente documenta una fase anterior; no volver a importar los CSV.

# Publicación por Sergio

## Cuenta y boards

Nombre: **Espacio Lenguaje**. Bio propuesta: «Logopedia infantil y recursos para familias y profesionales. Contenido revisado por logopeda colegiada». Foto: logo del proyecto.

| Board (nombre exacto) | Descripción propuesta |
|---|---|
| Fichas de logopedia para imprimir | Fichas imprimibles de articulación, vocabulario y conciencia fonológica. Muestras gratuitas y recursos de Espacio Lenguaje. |
| Ejercicios de pronunciación (R, S y más) | Guías de articulación sobre la R, la RR y la S. Información sobre praxias, sus límites y materiales de soplo. |
| Actividades de lenguaje 0-3 años | Actividades por edad, primeras palabras y juegos de lenguaje. Recursos para acompañar en casa de 0 a 3 años. |
| Actividades de lenguaje 3-6 años | Vocabulario, juegos y conciencia fonológica. Cuadernos y guías de lenguaje para familias con peques de 3 a 6 años. |
| Dislexia y tartamudez: guía para familias | Información sobre dislexia y tartamudez infantil. Guías para familias, acompañamiento escolar y cuándo consultar. |
| Material para logopedas y maestros | Fichas de logopedia para imprimir y material de vocabulario, articulación y comprensión. Recursos para consulta y aula. |

## Antes de importar

1. Confirmar cuenta de empresa y los seis boards; comprobar que Metricool los reconoce.
2. Facilitar el código de verificación del dominio. Añadirlo a la web no equivale por sí solo a completar la reclamación en Pinterest.
3. Entregar la plantilla descargada de la cuenta Metricool, con sus cabeceras originales. Los archivos PENDIENTE-PLANTILLA son borradores; todavía no prueban compatibilidad.
4. Revisar las piezas con Bea según el estándar del plan y confirmar la fecha de inicio. El 21 de septiembre es una propuesta, no una publicación confirmada.
5. Cuando el CSV exacto esté adaptado, importar primero como borrador. Revisar al menos un pin de producto, uno de blog y uno de continuidad: imagen, título, descripción, board y página de destino con UTM. Elegir zona Europe/Madrid y formatos de fecha/hora correctos.
6. Usar solo una vía de importación para evitar duplicados: Metricool o respaldo Pinterest. El respaldo emplea UTC; no volver a convertirlo a hora local.
7. Registrar la fecha del primer pin realmente publicado para calcular el día 60. Registrar cada lunes pines publicados, tráfico atribuible y leads reales (sin lista 7).

## Reprogramar los borradores

En el repositorio: `node scripts/pinterest-csv.mjs AAAA-MM-DD` y después `node scripts/report-pinterest.mjs`. Cambia los CSV y el calendario propuesto; no publica ni programa nada en plataformas. Antes de reutilizar un CSV, revisar que todas sus fechas sean futuras.

Los 60 PNG están en `public/pinterest/`. Ningún enlace de destino apunta directamente a un PDF. `CALENDARIO.md` contiene la tabla completa con imágenes y enlaces públicos.
