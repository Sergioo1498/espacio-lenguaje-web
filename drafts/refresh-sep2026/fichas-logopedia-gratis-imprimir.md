# Propuesta de ampliación — `/blog/fichas-logopedia-gratis-imprimir`

**Estado: BORRADOR PARA REVISIÓN DE BEA. No publicado.**
Fecha: 2 septiembre 2026 · Datos GSC: 2026-06-02 → 2026-08-30

---

## 1. Qué dicen los datos

El post ya rinde bien en su intención principal ("fichas de logopedia gratis"): 401 clics y 2.984
impresiones en 90 días, posición media 10,0. Las queries que **no** cubre bien son todas variantes
de un término más amplio: *material* / *recursos* de logopedia.

| Impresiones | Clics | CTR | Posición | Query |
|---|---|---|---|---|
| 184 | 1 | 0,5 % | 35,1 | material logopedia |
| 169 | 0 | 0,0 % | 22,3 | material de logopedia |
| 161 | 0 | 0,0 % | 24,1 | material para logopedas |
| 124 | 0 | 0,0 % | 11,4 | materiales logopedia |
| 63 | 4 | 6,3 % | 15,8 | recursos logopedia |
| 43 | 0 | 0,0 % | 42,4 | material logopédico |
| 30 | 0 | 0,0 % | 30,4 | material para logopedia |
| 10 | 0 | 0,0 % | 8,4 | material logopedia pdf |
| 7 | 0 | 0,0 % | 8,6 | logopedia gratis |
| 5 | 0 | 0,0 % | 17,6 | materiales de logopedia |

**Lectura**: ~800 impresiones/90d en posiciones 11-42 para "material de logopedia". Google entiende
que el post habla de fichas, no de material en general. Y hay una señal de intención distinta que
conviene no pasar por alto: **"material para logopedas"** (161 impresiones) lo buscan profesionales,
no familias. Es la misma división que desde hoy capturamos en el formulario con el atributo `PERFIL`.

## 2. Qué propongo añadir

### Sección A — "Tipos de material de logopedia (más allá de las fichas)"
Ubicación sugerida: después de *"5 tipos de fichas de logopedia imprescindibles"*.

Ampliar de "fichas" a "material", que es el término que la gente busca. Cubriría, con el mismo
criterio de organización por objetivo que ya usa el post:

- Material impreso (fichas, cuadernos, tableros de comunicación).
- Material manipulativo (espejo, pajitas, velas, objetos del cesto de tesoros).
- Material visual (pictogramas, secuencias temporales).
- Material digital (apps, generadores de fichas).

**Requiere validación de Bea**: qué material tiene respaldo real y cuál es "material de moda" sin
evidencia. En particular, el post ya sostiene —correctamente— que las praxias aisladas no
transfieren al habla; si listamos material de praxias hay que mantener esa misma cautela y no
contradecirnos.

### Sección B — "Material para logopedas: qué cambia respecto al material para familias"
Ubicación sugerida: antes de *"Cuándo las fichas no bastan"*.

Sección corta que reconozca la intención profesional: qué busca una logopeda en un material
(criterio de selección de estímulos, progresión, registro de datos) frente a lo que busca una
familia (instrucciones claras, poco tiempo, sin jerga).

**Requiere validación de Bea — es la sección de mayor riesgo**: hablar a profesionales exige un
registro técnico que solo ella puede firmar. Alternativa más conservadora: no escribirla y aceptar
que esa query no es nuestra.

### Sección C — FAQ adicional
El post ya tiene FAQ y schema `FAQPage` correctamente poblado. Añadir 2 preguntas alineadas con las
queries: *"¿Dónde encuentro material de logopedia gratis en PDF?"* y *"¿Sirve el mismo material para
casa y para consulta?"*.

## 3. Fuentes a usar (verificar cita exacta antes de publicar)

- **ARASAAC** (Gobierno de Aragón) — licencia y condiciones de uso de los pictogramas. Ya citada en el post.
- **ASHA** — *Practice Portal*, apartado de trastornos de los sonidos del habla, para sostener el
  criterio de "material con objetivo funcional" frente a ejercicios aislados.
- **AEP** (Asociación Española de Pediatría) — para cualquier referencia a hitos por edad que
  aparezca en las tablas de selección de material.
- **GAT** (Grupo de Atención Temprana) — *Libro Blanco de la Atención Temprana*, si se menciona
  material en contexto de intervención temprana.

⚠️ No he verificado apartados ni páginas concretas de ninguna de estas fuentes. Antes de publicar
hay que localizar la cita exacta o retirar la afirmación que se apoya en ella.

## 4. Lo que NO propongo tocar

- La tabla de repositorios externos y la frase "sin formularios, sin registros": describe las
  fuentes de terceros y sigue siendo cierta.
- El bloque "En resumen" ni las afirmaciones clínicas ya revisadas.
- El gate de captura, que ya está en producción y no toca el contenido del artículo.
