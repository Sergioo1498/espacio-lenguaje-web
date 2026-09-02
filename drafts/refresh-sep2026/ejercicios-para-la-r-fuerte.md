# Propuesta de ampliación — `/blog/ejercicios-para-la-r-fuerte`

**Estado: BORRADOR PARA REVISIÓN DE BEA. No publicado.**
Fecha: 2 septiembre 2026 · Datos GSC: 2026-06-02 → 2026-08-30

---

## 1. Qué dicen los datos

2.447 impresiones en 90 días repartidas en 108 queries. El problema **no es posición**: casi todo
está en página 1. Es que la gente no hace clic.

| Impresiones | Clics | CTR | Posición | Query |
|---|---|---|---|---|
| 387 | 9 | 2,3 % | 6,6 | fonema r fuerte |
| 354 | 0 | 0,0 % | 7,5 | r fuerte |
| 121 | 3 | 2,5 % | 6,4 | fonema rr fuerte |
| 102 | 3 | 2,9 % | 8,2 | como decir r fuerte |
| 95 | 2 | 2,1 % | 6,5 | actividades con r fuerte |
| 92 | 1 | 1,1 % | 7,8 | ejercicios con rr |
| 78 | 2 | 2,6 % | 6,6 | actividades r fuerte |
| 69 | 1 | 1,4 % | 8,1 | praxias para la r |
| 67 | 1 | 1,5 % | 10,6 | palabras con rr fuerte |
| 62 | 1 | 1,6 % | 8,3 | actividades para trabajar la r |

**Lectura**: en posición 6-8 un CTR normal estaría en torno al 5-8 %. Estamos en 0-3 %. Parte se
arregla con el snippet (ya identificado el 24-ago: el `excerpt` son 247 caracteres de resumen
académico que Google trunca). Pero hay dos huecos de contenido reales:

1. **"palabras con rr fuerte"** (67 impr) — el post no tiene un listado de palabras. Es lo primero
   que busca alguien que va a trabajar el fonema.
2. **"praxias para la r"** (69 impr) — y aquí hay un conflicto que solo Bea puede resolver, ver abajo.

## 2. Qué propongo añadir

### Sección A — Listado de palabras con /rr/ por posición
Ubicación sugerida: dentro de *"10 ejercicios progresivos"*, como tabla de apoyo.

Palabras agrupadas por posición del fonema (inicial: *rata, rojo, rueda*; media: *perro, carro,
torre*) y por estructura silábica. Es material de trabajo, no una afirmación clínica, y encaja con
el nivel 3 que el post ya describe ("sílabas/palabras").

**Requiere validación de Bea**: la selección y el orden de dificultad de las palabras sí es criterio
profesional. Yo no debo decidir qué palabra va antes que cuál.

### Sección B — "¿Y las praxias para la R?" ⚠️ DECISIÓN CLÍNICA, NO EDITORIAL
Ubicación sugerida: después de *"Pre-requisitos antes de empezar"*.

Aquí hay una tensión real que quiero dejar explícita en lugar de resolverla yo:

- El post **ya afirma**, y con razón, que la evidencia actual no respalda que las praxias aisladas
  transfieran al habla, citando ASHA (2013) y Lof & Watson (2008).
- Pero 69 personas al trimestre buscan literalmente "praxias para la r", y otras tantas llegan desde
  `/blog/praxias-bucofaciales-ninos`.

Opciones, para que decida Bea:
- **(a)** Sección corta que responda la pregunta explicando por qué no las recomendamos y qué hacer
  en su lugar. Sirve la intención de búsqueda sin traicionar la evidencia.
- **(b)** No escribirla y dejar que esa query siga sin cubrirse.

Mi recomendación es (a), pero el texto tiene que escribirlo o firmarlo ella: es exactamente el tipo
de matiz donde una frase mal calibrada nos deja mal.

### Sección C — Respuesta directa a "cómo se dice la R fuerte"
El post abre con un "En resumen" centrado en la **edad** de adquisición. La query dominante
("fonema r fuerte", "como decir r fuerte") busca el **mecanismo**. Propongo añadir 2-3 líneas al
bloque de resumen que describan la producción del fonema.

**Requiere validación de Bea**: descripción del punto y modo de articulación. No la escribo yo.

## 3. Fuentes a usar (verificar cita exacta antes de publicar)

- **ASHA** — *Practice Portal · Speech Sound Disorders*, para el criterio sobre praxias no verbales.
  El post ya cita ASHA 2013; conviene comprobar si sigue siendo la referencia vigente.
- **AEP** — hitos de adquisición fonológica por edad, si se refuerza la parte de "a qué edad".
- Bosch (2004), ya citado en el post para la consolidación de /rr/ hacia los 5-6 años.

⚠️ No he verificado ninguna cita concreta. Bosch (2004) y ASHA (2013) vienen del texto ya publicado,
no de una comprobación mía en la fuente original.

## 4. Cambio que NO necesita a Bea y sí mueve la aguja

Reescribir el `excerpt` del frontmatter (es la meta description). Hoy son 247 caracteres que Google
corta a media frase y que abren con una cita académica. No es contenido clínico nuevo: es
reformular en ≤155 caracteres lo que el artículo ya dice. Puede hacerse sin revisión.
