# Email de reenvío a compradores — Pack de Fichas v4

**Estado: BORRADOR. No enviado.** Se envía en la fase 2, uno a uno por transaccional
(`POST /v3/smtp/email`), nunca como campaña.

---

## Destinatarios: 2

| Email | Producto comprado | Importe | Fecha |
|---|---|---|---|
| nuria.millet@gmail.com | Pack de Fichas de Articulación | 4,90 € | 2026-06-24 |
| saravillamatarranz@gmail.com | Pack Completo (incluye las fichas) | 14,90 € | 2026-05-27 |

**Excluidos de la lista 3:**
- `sergitogt98@gmail.com` — compra de prueba (Kit de Soplo), excluido por indicación expresa.
- `joset_n@hotmail.com` — compró el Cuaderno 0-3, que no está afectado por este fallo.

⚠️ **Ojo con Nuria**: es la compradora cuya queja del 24 de junio originó el rediseño a v3.
Compró el 24-jun y el PDF v3 se generó el 26-jun, así que recibió la versión anterior y
después la v3 — y esa v3 también venía incompleta. Es la persona a la que peor le puede
sentar este email si no está bien escrito, y la que más merece recibirlo.

---

## Asunto

```
Tu Pack de Fichas, ahora completo (fallo nuestro)
```

## Cuerpo

Misma plantilla visual que el email de entrega del webhook: logo circular arriba, fondo
`#FDF8F4`, botón terracota `#C4745A`, pie con `Espacio Lenguaje · hola@espaciolenguaje.com`.

---

¡Hola! 👋

Te escribo para pedirte disculpas y para mandarte algo.

Hemos detectado un error nuestro en el **Pack de Fichas de Articulación** que compraste: por
un fallo técnico al generar el PDF, **a cada una de las 30 fichas le faltaban tres bloques**
que sí deberían haber estado ahí:

- La **edad esperada de adquisición** del fonema.
- La **posición articulatoria** (dónde va la lengua, qué hacen los labios, si hay vibración).
- El **silabario** para practicar.

Los pictogramas, las palabras y el resto del material estaban bien. Pero esos tres bloques
son justo los que te dicen *cómo* trabajar cada ficha, así que faltaba una parte importante.

**Aquí tienes la versión completa**, sin coste y sin que tengas que hacer nada:

[ Descargar el Pack de Fichas completo ]

Es el mismo pack, con los mismos 30 fonemas y los mismos pictogramas: solo hemos devuelto a
su sitio lo que faltaba.

Gracias por tu confianza, y perdona la molestia. Si tienes cualquier duda —sobre esto o
sobre cómo usar las fichas con tu peque— responde a este email y te leo personalmente.

Un abrazo,
**Espacio Lenguaje**

---

## Notas de implementación (fase 2)

- El enlace del botón apunta a `https://www.espaciolenguaje.com/downloads/productos/pack-fichas-articulacion.pdf`,
  la **misma URL de siempre**, para que los enlaces de entrega ya enviados sigan funcionando.
- Envío individual con `POST https://api.brevo.com/v3/smtp/email`, un destinatario por
  llamada, para poder reportar `requests`/`delivered` por persona.
- Remitente `Espacio Lenguaje <hola@espaciolenguaje.com>`, igual que el resto de transaccionales.
- No se menciona la sección de Referencias: esa decisión está pendiente y no forma parte de
  este arreglo.
