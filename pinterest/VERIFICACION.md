# Verificación — 16 de septiembre de 2026

Implementación: **6f9fd66**, enviada a master. GitHub/Vercel confirmó `success` / `Deployment has completed` para el despliegue [FNw5CCQHSBE7ezqWd7ZvvLgYfc4U](https://vercel.com/sergioo1498s-projects/espacio-lenguaje-web/FNw5CCQHSBE7ezqWd7ZvvLgYfc4U).

| Comprobación | Resultado observado | Evidencia |
|---|---|---|
| Primera visita y formularios | PASS: primera visita, caducidad, visita sin UTM, almacenamiento corrupto/bloqueado, saneamiento de valores y cuatro endpoints reales con Brevo simulado | scripts/test-traffic-attribution.mjs |
| Perfiles existentes | PASS: familia/profesional; omisión y valores inválidos conservan perfil previo | scripts/test-perfil-forms.mjs |
| TypeScript | npx tsc --noEmit: exit 0 tras los cambios finales de metadatos | Ejecución local |
| Build | Compilación local inicial exit 0, 65 páginas; cambios finales compilados localmente y desplegados con éxito por Vercel | Estado de despliegue enlazado arriba |
| Metadatos locales | 32 páginas, 0 incidencias | metadata-local.json |
| Metadatos en producción | 32 páginas, HTTP 200, 0 incidencias; autor en los posts, tipos article/product y tamaños reales | metadata-after.json |
| Etiquetas Product | Una sola og:type=product; propiedad property y etiqueta dentro de head verificadas en una URL representativa | /recursos/fichas-articulacion |
| Pines | 60 PNG 1000×1500; titulares ≤12 palabras, títulos ≤100 caracteres, descripciones 150–300; paneles literales de fuente y UTM válidos | scripts/verify-pinterest-assets.mjs |
| Imágenes públicas | 60 HTTP 200; SHA-256 remoto idéntico al archivo local en todos los casos | images-live.json |
| Diseño | Cinco hojas de contacto revisadas y comprobación a tamaño completo; textos sin recortes | previews/ y render-audit.json |
| Alta real | Entrada por /lp/guia-gratis?utm_source=pinterest&utm_medium=social&utm_campaign=test → formulario → /descargar-guia | Interacción en navegador de Codex |
| Contacto Brevo | ID 177, creado 16-sep 17:57 Madrid; FUENTE_LEAD=guia-gratis, ORIGEN_TRAFICO=pinterest, CAMPANA_ORIGEN=test, PERFIL=familia | brevo-read.json |
| Limpieza | Añadido a lista 7 y retirado de lista 2; estado final listIds=[7] | brevo-cleanup.json |
| Analytics | 404 con hola@espaciolenguaje.com; sin lectura de métricas | Comprobación del panel |

No se ha publicado ningún pin en Pinterest ni importado una programación en Metricool. No se afirma que Pinterest haya validado externamente los Rich Pins. El dominio sigue pendiente del código de verificación; los CSV Metricool, de la plantilla exacta; el calendario, de confirmar fecha de arranque.
