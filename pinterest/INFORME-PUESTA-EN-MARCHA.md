# Pinterest: puesta en marcha — 16 de septiembre de 2026

Inicio acordado expresamente por Sergio: **17-sep-2026, 10:00 Europe/Madrid**. Se sustituye únicamente la hora 09:00 contradictoria del documento por 10:00. Primera jornada termina a las 21:30. Revisión día 60: **16-nov-2026**.

## Estado por bloque

| Bloque | Estado | Evidencia |
|---|---|---|
| A1 Cuenta | Cuenta de empresa Espacio Lenguaje, @espaciolenguaje, hola@espaciolenguaje.com. Nombre y logo existentes coinciden con la marca; logo visualmente corresponde a public/images/logo-chosen.png. Bio literal guardada. Sitio verificado www.espaciolenguaje.com. | Perfil https://es.pinterest.com/espaciolenguaje/; ajustes muestran «Empresa» y «Tu sitio web está verificado». |
| A2 Tableros | Seis tableros públicos creados, descripciones exactas guardadas, todos con 0 pines. | boards-go-evidence.txt y enlaces abajo. |
| A3 Sitio | Etiqueta en head global, despliegue correcto, comprobada con curl. Pinterest confirma «Sitio web reclamado», «Verificado», «Conectado», «¡Listo!». | Commit 49d23f9; domain-verification-live.json; claim-go-evidence.txt. |
| A4 Rich Pins | Metadatos de artículo requeridos presentes en la URL indicada. El antiguo validador redirige a documentación «About Rich Pins», sin formulario de validación ni solicitud. No se afirma una activación manual inexistente ni una visualización aún no comprobada. | rich-pins-go-check.json; ayuda oficial enlazada abajo. |
| B1/B2 Metricool | Pendiente de inicio de sesión por Sergio. La pantalla muestra «¿Cómo quieres iniciar sesión?» y campos de acceso. No se introducen contraseñas. Plan, marca, conexión y plantilla aún sin comprobar. | https://app.metricool.com/ |
| B3 Calendario | 60 filas actualizadas: 8 el 17-sep; 4/día del 18 al 25-sep; 5/semana del 28-sep al 23-oct. Imágenes, títulos, descripciones, enlaces y boards intactos. CSV exacto Metricool pendiente de descargar su plantilla. | CALENDARIO.md, tabla-60-pines.csv, pins.json. |
| B4 Vista previa | Pendiente de acceso y plantilla Metricool. No se ha importado el CSV ni se presenta el calendario local como vista previa de Metricool. | Espera de acceso. |
| B5 Programación | No confirmada. Requiere «OK programar» de Sergio después de la revisión de la vista previa. Ninguna otra red modificada. | 0 publicaciones creadas o programadas por esta ejecución. |
| C Seguimiento | Pendiente de publicaciones reales. Los 8 del primer día no habrán terminado por la tarde: último pin a las 21:30 Madrid. Revisar después de esa hora. | Inicio 17-sep; revisión día 60 16-nov. |

## Tableros públicos

| Nombre | URL |
|---|---|
| Fichas de logopedia para imprimir | https://es.pinterest.com/espaciolenguaje/fichas-de-logopedia-para-imprimir/ |
| Ejercicios de pronunciación (R, S y más) | https://es.pinterest.com/espaciolenguaje/ejercicios-de-pronunciaci%C3%B3n-r-s-y-m%C3%A1s/ |
| Actividades de lenguaje 0-3 años | https://es.pinterest.com/espaciolenguaje/actividades-de-lenguaje-0-3-a%C3%B1os/ |
| Actividades de lenguaje 3-6 años | https://es.pinterest.com/espaciolenguaje/actividades-de-lenguaje-3-6-a%C3%B1os/ |
| Dislexia y tartamudez: guía para familias | https://es.pinterest.com/espaciolenguaje/dislexia-y-tartamudez-gu%C3%ADa-para-familias/ |
| Material para logopedas y maestros | https://es.pinterest.com/espaciolenguaje/material-para-logopedas-y-maestros/ |

## Etiqueta desplegada

```html
<meta name="p:domain_verify" content="da62b6958e21a635cad5db32681a118b"/>
```

## Rich Pins

[Ayuda oficial de Pinterest](https://help.pinterest.com/en/business/article/rich-pins): las páginas con etiquetas adecuadas generan Rich Pins al guardar pines y la sincronización puede tardar hasta 24 horas. Comprobados og:title, og:description, og:type=article y article:author en https://www.espaciolenguaje.com/blog/fichas-logopedia-gratis-imprimir. La visualización real queda para C1.

## Distribución semanal prevista, aún no programada

| Semana desde lunes | Pines |
|---|---|
| 14-sep | 20 |
| 21-sep | 20 |
| 28-sep | 5 |
| 5-oct | 5 |
| 12-oct | 5 |
| 19-oct | 5 |

Revisión semanal: sesiones utm_source=pinterest, leads ORIGEN_TRAFICO=pinterest, pines publicados acumulados e impresiones/guardados/clics semanales de Metricool. Sin operaciones en Brevo ni Stripe en esta tarea.
