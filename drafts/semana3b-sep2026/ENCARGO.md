# PROMPT — CUADERNOS, DÍA 14 DEL GATE Y QUIZ (semana 3 · parte 2 · 15/16-sep-2026)

**Accesos que necesita esta tarea:** repositorio de espaciolenguaje.com con commit y deploy (Vercel) · Google Search Console de la propiedad (cuenta hola@espaciolenguaje.com) para el bloque B; si no lo tienes, usa los datos que Sergio pegue al final de este prompt y dilo en el informe · clave API de Brevo solo para la prueba del bloque C con dirección de test · Vercel Analytics y Clarity para el bloque D (si siguen sin acceso, el bloque D se reporta como «sin acceso», no se estima).

**Contexto:** el saneamiento del 15-sep (commits 6316103 · a1136b7 · bf977a8) dejó los cuadernos con una actividad por página pero en texto corrido y con la mitad inferior de cada página vacía. El contenido es correcto y revisado; el contenedor no está al nivel del Pack de Fichas v4. El 16-sep se cumplen 14 días del gate en `fichas-logopedia-gratis-imprimir` y toca la decisión del guardarraíl y los retitulados aplazados. El quiz funciona pero no registra el evento `lead` y no recibe tráfico.

**Reglas fijas:** cero texto clínico nuevo; en los cuadernos **no cambia ni una palabra** (verificación por diff de texto normalizado vacío); ningún envío a listas reales ni a compradoras; no tocar checkout, webhook, entrega ni precios; el bloque B no se ejecuta antes del 16-sep ni sin la línea base de GSC; informe por bloque en tabla con evidencia literal (rutas, hashes, HTTP, diffs, títulos antiguos y nuevos). Orden: A → B → C → D.

---

## BLOQUE A · Plantilla de maquetación de los cuadernos (0-3 y 3-6)

A1. Diseña una plantilla de página de actividad para `generate-product-pdfs.mjs` (o el generador que produzca los cuadernos), con la misma paleta, tipografías (DM Sans / DM Serif) y estilo de portada que el Pack de Fichas v4. Cada actividad sigue ocupando una página. Estructura de la página:
- **Cabecera**: número y título de la actividad; debajo, tres chips separados: `Edad` · `Materiales` · `Duración` (hoy van apretados en una línea).
- **Cómo hacerlo**: pasos numerados con interlineado amplio.
- **Qué desarrolla**: caja destacada (fondo suave) con el texto actual, incluidas sus referencias.
- **Variaciones**: caja secundaria con el texto actual.
- **Zona inferior (hoy vacía)**: bloque «Registro» con `Fecha ____ · Hecho ☐ · Cómo ha ido: ______` y 3-4 líneas de notas. Solo rótulos; ninguna frase nueva más allá de esos.
- Pie: nombre del cuaderno · www.espaciolenguaje.com · nº de página.

A2. Páginas de bloque: cada bloque de edad/área abre con una página propia (nombre del bloque, franja de edad o área, lista de sus actividades con número y título). Portada e índice general al inicio con el mismo estilo que el Pack de Fichas. Si el índice ya existe, solo se restyle.

A3. Verificación obligatoria: `pdftotext` antes/después normalizado → el diff solo puede contener los rótulos nuevos del bloque «Registro», las páginas de bloque/índice y los números de página (lista exhaustiva de las líneas añadidas en el informe). Render de todas las páginas de ambos cuadernos y revisión visual: sin desbordes, sin títulos huérfanos, sin texto cortado en cajas. Nº de páginas final de cada uno.

A4. Despliegue en las mismas URLs con la misma protección; HTTP 200, Content-Length y sha256 antes/después. Actualiza el nº de páginas en las landings de cuaderno 0-3, cuaderno 3-6 y Pack Completo (`features` y `whatYouGet`) y el total del pack. Los otros cuatro PDF, hash idéntico. Kit de soplo: no se toca en este prompt.

---

## BLOQUE B · Día 14 del gate y retitulados (NO antes del 16-sep)

B0. **Línea base y lectura de 14 días** en GSC para `/blog/fichas-logopedia-gratis-imprimir`: línea base 3-30 ago = 102 clics · 831 impr · CTR 12,27 % · pos. 11,7. Lee los 14 días 2-15 sep (clics, impresiones, CTR, posición) y compáralos. **Regla del guardarraíl:** si la posición media ha empeorado más de 2 puestos de forma sostenida o el CTR ha caído más de un 30 %, **no retitules esta URL** y repórtalo con los números; en cualquier otro caso, el gate se mantiene y se aplica B3.

B1. `/blog/actividades-ninos-2-anos-lenguaje` (o el slug real): nuevo `<title>` (≤60 caracteres) y meta description (150-155) con la franja **«2 a 3 años»** literal al inicio (GSC: 475 impr de esa franja con CTR 1,3 %). H1 solo si no contiene la keyword. Cuerpo intacto.

B2. `/blog/ejercicios-para-la-r-fuerte`: nuevo title/meta con **«fonema R fuerte»** y **«RR»** literales (post en página 1 con CTR 0-3 % para esas queries: problema de título, no de posición). Cuerpo intacto.

B3. `/blog/fichas-logopedia-gratis-imprimir` (solo si B0 lo permite): amplía el title para incluir **«material de logopedia»** manteniendo «fichas de logopedia gratis para imprimir» al inicio (GSC: 161 impr de «material para logopedas» en esta URL). Meta ajustada. Ni una línea del cuerpo ni del gate.

B4. Método para los tres: keyword principal literal al inicio · beneficio concreto que esté en el post · señal profesional («revisado por logopeda») · sin clickbait, sin promesas terapéuticas, sin cifras que no aparezcan en el post. Anota en el informe la línea base de 28 días de cada URL antes del cambio y guarda title/meta antiguos para rollback. Despliega y pide indexación de las tres URLs desde GSC (inspección de URL → solicitar indexación), sin usar la Indexing API.

---

## BLOQUE C · Quiz: evento `lead` y tráfico interno

C1. En el envío correcto del quiz, dispara el evento de Analytics `lead` con el mismo esquema que usa `FichasGate` (fuente `quiz-necesita-logopeda`, y el resto de propiedades que ya lleve el evento en los otros formularios). Prueba en producción con `sergio.gonzalezt98+quiztest2@gmail.com`; confirma el evento en el debug/console y limpia el contacto a la lista 7.

C2. Añade un bloque CTA al quiz (mismo componente visual que los CTA existentes en los posts) al final de la sección principal de estos tres posts, con este texto literal y ninguno más: **«¿Dudas sobre si tu peque necesita logopeda? Haz nuestro test orientativo de 2 minutos. No es un diagnóstico: te orienta sobre cuándo consultar.»** + botón «Hacer el test». URLs: `/blog/mi-hijo-de-3-anos-no-habla-bien`, `/blog/mi-hijo-no-habla-cuando-preocuparse`, `/blog/a-que-edad-debe-hablar-un-nino` (confirma los slugs reales). Sin más cambios en esos posts.

---

## BLOQUE D · Métricas del gate (solo si hay acceso)

D1. Para `/blog/fichas-logopedia-gratis-imprimir`, 3-15 sep: páginas vistas · eventos `lead` (fuente `fichas-gratis`) · `descarga_pdf` (recurso `muestra-fichas-r`) · `inicio_checkout` (utm `tripwire-fichas*`) · `compra` con ese utm. Opt-in = leads/páginas vistas; descarga/lead; checkout/lead. Si Clarity está disponible: % de sesiones que llegan al bloque del gate. Tabla, sin interpretación. Si no hay acceso a Vercel Analytics o Clarity, escribe «sin acceso» y no estimes.

---

## INFORME FINAL
Tabla por bloque con evidencia literal; commits; nº de páginas y hashes de los PDF; para B, tabla URL · título antiguo · título nuevo · meta antigua · meta nueva · línea base 28d · lectura 14d del gate; para C, evento capturado y contacto limpiado; para D, la tabla o «sin acceso». Línea de «pendientes» si algo no se cerró.

---

**[Sergio: si Astra no tiene acceso a GSC, pega aquí la lectura de 14 días de la URL de fichas que te pase Claude el 16-sep: clics · impresiones · CTR · posición.]**
