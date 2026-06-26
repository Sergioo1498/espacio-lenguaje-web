# Checklist obligatorio pre-publicación de producto

Para evitar el caso Nuria (compradora 24 jun 2026 que recibió un PDF que NO coincidía con la promesa de la página de venta), **ningún producto se publica ni se reactiva en `products.ts` (eliminando `disabled: true`) sin pasar TODOS estos puntos**.

## 1. Contenido del PDF coincide con la promesa de la web

Por cada bullet de `whatYouGet` y `features` en `src/lib/products-content.ts`, debe existir en el PDF una sección/página/elemento que lo cumpla. Documentar el mapping:

| Bullet de la web | Página del PDF | Verificado por |
|---|---|---|
| "30 fichas imprimibles" | Páginas 3-32 | Bea |
| "Tabla de seguimiento" | Página 33 | Bea |
| "..." | "..." | "..." |

Sin tabla completa = no se publica.

## 2. Bloques de transparencia obligatorios

En `products-content.ts` el producto DEBE tener (todos):

- `whatIncludes`: 5-7 puntos concretos de qué entrega el PDF.
- `whatDoesNotInclude`: 3-5 puntos de qué NO entrega (evita Nurias).
- `notForYouIf`: 2-3 perfiles de personas que NO deberían comprarlo.
- `importantNotice` (opcional pero recomendado si el producto es ambiguo o tiene riesgo clínico).

## 3. Vista previa real del PDF visible en la página de venta

[TODO futuro] Cada producto debe mostrar al menos 2 páginas reales del PDF como imagen, antes del botón Comprar. Conversión PDF→PNG con `pdf2pic` o `pdfjs` + puppeteer. Cuando se implemente:

```bash
node scripts/generate-pdf-previews.mjs <slug>
```

## 4. Email transaccional menciona garantía y soporte

El email post-compra (`src/app/api/webhooks/stripe/route.ts → sendPurchaseEmail`) DEBE incluir:

- Botón/enlace de descarga visible.
- Bloque garantía 14 días con texto explícito "responde 'reembolso' a este email".
- Frase "responde a este email si tienes cualquier duda" (no enviar a formulario).
- Footer correcto (Comunitat Valenciana).

## 5. Validación automática pasa

```bash
node scripts/validate-products.mjs
```

Debe salir sin BLOQUEANTES (warnings son aceptables). El script verifica:

- PDF existe en `public/downloads/productos/`.
- Tamaño > 50KB.
- Texto extraíble > 1500 caracteres.
- Bloques de transparencia presentes en `products-content.ts`.

## 6. Bea (logopeda colegiada) ha leído el PDF de principio a fin

Sin lectura completa = no se publica. Si Bea encuentra cualquier afirmación clínica sin cita o que contradiga evidencia actual (ASHA, CATALISE, Bosch, DSM-5), el PDF se corrige antes de publicar.

## 7. Test de compra real

Antes de quitar `disabled: true`, hacer una compra real con cuenta personal:

1. `/recursos/<slug>` → ver que `importantNotice`, bloques transparencia y garantía 14 días son visibles.
2. Click "Comprar" → checkout Stripe normal → completar pago.
3. Recibir email transaccional → verificar que botón descarga funciona en móvil + escritorio.
4. Descargar PDF → abrirlo en visor → confirmar que el contenido coincide con la página de venta.
5. Refund manual desde Stripe Dashboard.

Si cualquier paso falla, NO se publica. Coste: ~10 min + 1 transacción de prueba.

## Histórico de productos con problemas

### `pack-fichas-articulacion` — pausado 2026-06-26

- Compradora: Nuria Millet (24 jun, 2ª venta del proyecto)
- Problema: PDF entregaba texto técnico (posiciones articulatorias, palabras-diana, silabarios) en lugar de las láminas visuales con pictogramas que un padre/madre espera al comprar "30 fichas imprimibles".
- Solución corta plazo: PDF v3 con pictogramas Arasaac enviado a Nuria como adjunto + producto marcado `disabled: true` en `products.ts`.
- Solución largo plazo: verificar mapping promesa-contenido antes de re-activar.

### `pack-completo` — pausado 2026-06-26

- Mismo motivo: incluye el PDF defectuoso de fichas-articulacion entre sus 4 PDFs.

## Para reactivar un producto pausado

1. Quitar `disabled: true` y `disabledReason` de `src/lib/products.ts`.
2. Ejecutar `node scripts/validate-products.mjs` → sin bloqueantes.
3. Compra de prueba (punto 7 arriba).
4. Si todo OK: commit + push + verificar en producción.
