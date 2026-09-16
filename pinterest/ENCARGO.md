# PROMPT — EXPERIMENTO PINTEREST · ARRANQUE (semana 3 · 16-sep-2026)

**Marco:** experimento P4 del Plan de Crecimiento. HIPÓTESIS: Pinterest puede aportar tráfico cualificado (familias y docentes que buscan imprimibles) sin depender de la edad del dominio. DURACIÓN: 60 días desde el primer pin. MÉTRICA: sesiones con `utm_source=pinterest` y leads con `ORIGEN_TRAFICO=pinterest`. UMBRAL día 60: ≥500 sesiones/mes → escalar; si no → congelar y volcar el tiempo en contenido.

**Accesos que necesita esta tarea:** repositorio con commit y deploy (Vercel) · lectura de `content/` y `public/` para reutilizar material · Brevo (solo lectura de atributos + creación de un atributo nuevo). **No** necesita acceso a Pinterest: los pines los sube Sergio con el CSV de subida masiva o a mano; el ejecutor prepara todo el material.

**Reglas fijas:** cero texto clínico nuevo. Todo texto de pin (título, descripción, texto sobre la imagen) se toma **literalmente o resumido sin añadir afirmaciones** de posts y productos ya publicados y revisados; ninguna cifra, síntoma o consejo que no esté ya en la página enlazada. Ningún pin enlaza a un PDF directamente: siempre a la página del blog o del producto (ahí está la captura de email). No tocar checkout, webhook, entrega, precios ni los formularios más allá de C1. Informe por bloque en tabla con evidencia literal.

---

## BLOQUE A · Preparar el dominio para Pinterest (repo)

A1. **Reclamar el sitio**: añade en el `<head>` global la etiqueta `<meta name="p:domain_verify" content="…">` con el valor que Sergio pegue aquí: **[Sergio: pega el código de verificación que da Pinterest en Ajustes → Cuentas reclamadas → Sitio web]**. Despliega y comprueba que la etiqueta sale en el HTML de la home en producción (`curl` + grep). Si Sergio prefiere el fichero HTML de verificación, sírvelo en la raíz con HTTP 200.

A2. **Rich Pins**: verifica que cada post y cada landing de producto expone Open Graph completo (`og:title`, `og:description`, `og:image` ≥ 1000 px de ancho, `og:type` article/product, `article:author`) y schema Article/Product ya existente. Lista las URLs a las que falte algo y corrígelo solo en metadatos (sin tocar cuerpo). Reporta el resultado del validador de Rich Pins de Pinterest para 3 URLs (Sergio lo ejecuta si el ejecutor no puede).

A3. **Atribución**: captura `utm_source`/`utm_medium`/`utm_campaign` en la primera visita (cookie o localStorage, 30 días) y pásalos a Brevo al crear el contacto en todos los formularios (guía, fichas, quiz, blog) en un atributo nuevo **`ORIGEN_TRAFICO`** (texto, p. ej. `pinterest`) y **`CAMPANA_ORIGEN`** (p. ej. `pin-fichas-r`). Sin utm, el atributo queda vacío (no inventar `direct`). Test end-to-end con `sergio.gonzalezt98+pintest@gmail.com` entrando con `?utm_source=pinterest&utm_medium=social&utm_campaign=test` y dándose de alta en la guía → contacto con ambos atributos → limpieza a lista 7.

---

## BLOQUE B · 40 pines iniciales (material, no publicación)

B1. **Inventario de material publicable**: lista de los 25 posts y 7 productos con su URL, imagen destacada actual y 2-3 «ideas de pin» extraídas de su contenido (una tabla propia, una lista de actividades, una definición, un «cuándo consultar»). Marca qué posts son de intención transaccional/solución (prioridad) y cuáles de problema (secundarios).

B2. **Genera 40 imágenes de pin** en 1000×1500 px (2:3), PNG, con el sistema visual de los productos (paleta #C4745A / #8FAE8B / #FDF8F4 / #3D2C2E, DM Sans + DM Serif Display, logo pequeño abajo, «Revisado por logopeda colegiada» como sello discreto). Sin caras ni fotos de stock de personas: ilustración plana, pictogramas Arasaac (con su atribución cuando se usen), capturas de las fichas/cuadernos, tablas y listas. Texto grande y legible en móvil (≤ 12 palabras en el titular de la imagen). Reparto orientativo:
- 12 pines del cluster transaccional (fichas, material de logopedia, muestra gratuita, pack de fichas, cuadernos, kit de soplo, calendario).
- 10 pines del cluster R / articulación / praxias / soplo.
- 8 pines de desarrollo del lenguaje por edad (2-3 años, etapas 0-6, a qué edad habla, hitos).
- 6 pines de dislexia y tartamudez (solo contenido ya publicado: señales y «cuándo consultar», sin dramatizar).
- 4 pines «para profesionales» (material para logopedas/maestros) → enlazan al post de fichas.
Guárdalos en `public/pinterest/` con nombre `pin-<slug>-<n>.png` para que tengan URL pública (el CSV de subida masiva necesita URL de imagen).

B3. **CSV para programar desde Metricool** (Sergio publica con Metricool, no con Pinterest directamente). Usa la plantilla de importación de Metricool para Pinterest: **[Sergio: descarga la plantilla en Metricool → Planificación → Importar CSV → «Descargar plantilla» y pégala aquí o súbela al repo como `pinterest/metricool-template.csv`]**. Respeta exactamente sus cabeceras, separador y formato de fecha/hora; una fila por pin con fecha, hora (10:00 o 19:00 hora de Madrid, alternando), texto/descripción, título del pin, board, enlace con utm e imagen por URL pública (`https://www.espaciolenguaje.com/pinterest/pin-….png`). Genera también, como respaldo, el CSV en formato «Bulk create Pins» de Pinterest (Title, Media URL, Pinterest board, Description, Link, Publish date, Keywords) por si la importación de Metricool falla. Reglas de copy: título ≤ 100 caracteres con la keyword principal al inicio (la misma del post) · descripción 150-300 caracteres, natural, con 2-3 keywords y terminología dual cuando aplique («logopedia / fonoaudiología») · enlace a la página con `?utm_source=pinterest&utm_medium=social&utm_campaign=pin-<slug>` · fechas de publicación escalonadas: 8 pines el primer día y 4/día los siguientes 8 días (Pinterest penaliza subir 40 de golpe). Boards propuestos (Sergio los crea con estos nombres exactos): «Fichas de logopedia para imprimir» · «Ejercicios de pronunciación (R, S y más)» · «Actividades de lenguaje 0-3 años» · «Actividades de lenguaje 3-6 años» · «Dislexia y tartamudez: guía para familias» · «Material para logopedas y maestros».

B4. **Calendario de continuidad**: además de los 40, deja preparados 20 pines más (mismo formato) y un segundo CSV con 5 pines/semana durante 4 semanas, para que Sergio los suba sin pedir material nuevo.

---

## BLOQUE C · Medición

C1. Confirma que Vercel Analytics registra el referrer `pinterest.com` y los utm (si Analytics sigue sin acceso para el ejecutor, indica exactamente qué filtro debe abrir Sergio para leer «sesiones con utm_source=pinterest» cada lunes).
C2. Añade a la revisión semanal del proyecto la línea: sesiones Pinterest · leads `ORIGEN_TRAFICO=pinterest` · pines publicados acumulados. Fecha de decisión: **día 60 desde el primer pin publicado** (anótala en el informe cuando Sergio confirme la fecha).

---

## INFORME FINAL
Tabla por bloque; URL de cada imagen de pin y el CSV (ruta en el repo); tabla de los 40 pines (título · board · enlace con utm · fecha programada); URLs corregidas en A2; resultado del test de A3; commits.

---

## Checklist manual para Sergio (Pinterest, 30-40 min)
1. Confirmar que la cuenta es **de empresa** (o convertirla: Ajustes → Convertir en cuenta de empresa). Nombre: Espacio Lenguaje. Bio: 1 frase con «logopedia infantil», «recursos para familias y profesionales», «revisado por logopeda colegiada». Foto: logo.
2. **Reclamar el sitio** (Ajustes → Cuentas reclamadas → Sitio web): copiar el código de verificación al hueco A1 de este prompt.
3. Crear los **6 boards** con los nombres exactos de B3 y una descripción de 1-2 frases con keywords.
4. **Metricool**: conectar la cuenta de Pinterest a la marca de Espacio Lenguaje (Conexiones → Pinterest) **después** de crear los 6 boards, para que Metricool los vea; comprobar que tu plan incluye programación en Pinterest e importación por CSV; descargar la plantilla CSV (Planificación → Importar CSV) y pegarla en el hueco B3 del prompt.
5. Cuando el ejecutor entregue el CSV: Metricool → Planificación → Importar CSV → revisar la vista previa (imagen, board y enlace de 3-4 pines al azar) → confirmar. Respaldo: Pinterest → Crear → Subida masiva con el segundo CSV.
6. Activar **Rich Pins** desde el validador de Pinterest con una URL del blog.
7. Anotar la fecha del primer pin publicado y pasársela a Claude para fijar el día 60. La lectura semanal de pines (impresiones, guardados, clics) se saca de Metricool → Analítica → Pinterest; las sesiones y leads, de Vercel/Brevo como dice el bloque C.
