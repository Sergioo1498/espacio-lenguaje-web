# CLAUDE.md — Reglas del proyecto Espacio Lenguaje

## Principio único

**El mejor código es el que no escribes.**

Antes de crear un componente, script, schema, endpoint, tabla, dependencia o abstracción, la pregunta por defecto es:

> ¿Ya hay algo (en la Web Platform, en Next.js, en Stripe, en el propio repo) que hace esto?

Si la respuesta es sí y "usarlo tal cual" cubre el 80% del caso, eso gana. Cerrar el 20% restante con un wrapper es la 2ª opción, nunca la 1ª.

---

## Reglas concretas

### UI y frontend

- **Prefiere HTML nativo antes que componentes.** `<details>` antes que acordeón, `<dialog>` antes que modal, `<input type="date">` antes que date picker, `<input list=…>` antes que autocomplete custom. Solo escribe wrapper si el nativo NO cumple un requisito real (no supuesto).
- **Prefiere `<Image>` de `next/image` sobre `<img>` para imágenes optimizables**, pero `<img>` sobre `<Image>` para SVG, iconos inline o casos con `sizes` complejo innecesario.
- **NO añadas librerías de animación / UI** (Framer Motion, Radix, HeadlessUI) para efectos que se resuelven en CSS puro. Framer Motion ya está en el bundle — solo úsalo cuando aporte algo que CSS no.
- **NO crees hooks personalizados** para lo que `useState` + un handler resuelven en 3 líneas.
- **NO refactorices "por elegancia"**. Si algo funciona y se lee, se queda.

### Next.js 15 + App Router

- Prefiere Server Components. `"use client"` solo cuando hace falta interactividad real.
- Aprovecha `metadata` (title, description, alternates, openGraph) por página en lugar de manipular `<head>` a mano.
- `generateStaticParams` para SSG cuando el catálogo cabe (blog, productos). No inventes ISR sin motivo.
- Rutas API pequeñas: 1 route.ts = 1 responsabilidad. No abstraer en "controllers".

### MDX y contenido

- Los posts son texto. **No inventes componentes MDX custom** salvo que 3+ posts vayan a usar el mismo patrón.
- Preferir tabla markdown (`| Col | Col |`) a componente `<ComparisonTable>`.
- Preferir blockquote (`>`) a componente `<Callout>`.
- Un solo H1 por post (el frontmatter title lo genera; no lo repitas en el cuerpo).

### Schemas JSON-LD

- Emitir SOLO los schemas cuyos campos podemos poblar de verdad. **Un schema mal poblado es peor que sin schema** (Google lo penaliza — nos pasó con MedicalWebPage en mayo).
- Antes de añadir un tipo nuevo (`FAQPage`, `HowTo`, `MedicalWebPage`, `Product`…), verifica con Google Rich Results Test que valida sin errores.
- Un solo schema por tipo por página (nunca duplicado). Si el schema ya está a nivel `layout`, no lo repitas en la `page`.

### Stripe, Brevo, endpoints

- **Usa lo nativo del proveedor antes que reimplementar en local**. Ejemplos:
  - Stripe tiene `mode: 'subscription'`, promo codes, tax settings, quantity limits. Úsalos.
  - Brevo tiene templates + attributes + list segmentation. Úsalo antes de mantener HTML de emails en el código.
- Endpoints API: sin ORMs, sin capas de servicio, sin DI containers. `fetch` directo a Brevo/Stripe y a otra cosa.

### Scripts (`/scripts/*.mjs`)

- Un archivo por tarea concreta (`gsc-bulk-inspect.mjs`, `brevo-audit.mjs`, `validate-products.mjs`). Cero framework.
- Prefiere fetch nativo de Node 18+ sobre `node-fetch`/`axios`.
- No añadas `dotenv` — usa `--env-file=.env.local` de Node nativo o lee `.env.local` manual.
- Prefiere logs en `console.log` con formato tabla plana antes que librerías de CLI table.

### Dependencias

- Pregunta antes de añadir una dependencia nueva: ¿resuelve un problema que tenemos HOY, o uno que podríamos tener?
- Si es hipotético, no la añadas.
- Cero packages transitivos con `postinstall`.

---

## Anti-patrones específicos que ya sufrimos aquí

| Anti-patrón | Cuándo pasó | Coste real |
|---|---|---|
| Schema `MedicalWebPage` con campos sin poblar (`audience` en vez de `medicalAudience`, `lastReviewed` duplicado con `dateModified`) | 29 may 2026 | Indexación cayó de 30 → 23 PASS en 12 días. Reverimos el 10 jun. |
| 10 commits SEO estructurales en 2 semanas | 29 may – 16 jun | Google no digirió los cambios, tráfico -76%. |
| Componente order bump custom (checkbox+state) cuando Stripe tiene `adjustable_quantity` y `add_ons` | 16 jun | Complejidad extra en `BuyWithBump.tsx` + `webhook` + `checkout` para algo nativo. |
| PDF de producto sin verificar contra la promesa de la web ("30 fichas imprimibles" era texto técnico sin pictogramas) | 24 jun (queja Nuria) | Casi chargeback + tiempo rediseñando + 2 productos pausados 1 mes. |
| Newsletter form en un componente propio pero embebido en el footer del post (donde nadie llega — scroll depth 47%) | 26 jun | 0 leads en 60 días desde su despliegue. |
| Sidebar QuizCTA con `lg:sticky` (solo desktop) sin equivalente móvil | 29 jun | 0 leads del quiz durante 22 días con 70% del tráfico en móvil. |

**Regla derivada de esos 6 casos**: cualquier cambio estructural (schema, componente crítico, endpoint, hreflang) se **prueba con 1 URL representativa antes de aplicar a todo el catálogo**.

---

## Checklist antes de commit

Rápido, mental, 30 segundos:

1. ¿Este cambio elimina líneas o solo añade? Añadir sin quitar es sospechoso.
2. ¿Hay algo NATIVO (Web, Next.js, Stripe, Brevo) que ya hace esto?
3. ¿La descripción del PR/commit cabe en 1 frase clara? Si necesito 3 párrafos, sobra alcance.
4. Si es un cambio estructural (schema/routing/metadata): ¿lo he probado en 1 URL antes de aplicar a todas?
5. Si toca producto vendible: ¿el usuario final recibe LO QUE PROMETE LA LANDING? (regla Nuria)

---

## Cuándo romper estas reglas

- Cuando el "código nativo" no cumple un **requisito real y verificable** (no supuesto).
- Cuando la duplicación de código nativo entre 3+ archivos sí justifica un helper.
- Cuando el propietario del proyecto (Sergio) pide explícitamente añadir algo aunque yo sugiera lo contrario. Con nota breve del riesgo, y adelante.

---

Última actualización: 2026-08-03. Basado en lecciones reales de los primeros 3 meses del proyecto.
