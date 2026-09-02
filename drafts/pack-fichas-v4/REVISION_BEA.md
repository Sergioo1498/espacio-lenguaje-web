# Revisión de Bea — Pack de Fichas de Articulación v4

**Estado: BORRADOR. No desplegado. No sustituye al PDF que se vende hoy.**

Fecha: 2 septiembre 2026 · Fichero: `drafts/pack-fichas-v4/pack-fichas-articulacion-v4.pdf`

---

## Qué ha pasado

El generador del pack tenía un fallo en el parseo del markdown fuente: el regex que aísla cada ficha llevaba el flag `/m`, y con ese flag el `$` deja de significar «final del documento» para significar «final de línea». La consecuencia es que la sección de cada ficha se cortaba en su titular (46 caracteres en vez de ~430) y **tres bloques desaparecían del PDF sin que nadie lo notara**.

Comprobación objetiva sobre el HTML que genera cada versión:

| Bloque | v3 (lo que se vende hoy) | v4 (este borrador) |
|---|---|---|
| Edad esperada | **0 de 30** | **30 de 30** |
| Posición articulatoria | **0 de 30** | **30 de 30** |
| Silabario | **0 de 30** | **30 de 30** |

## Qué cambia respecto a v3

- Reaparecen los tres bloques de arriba en las 30 fichas. **Es el único cambio de contenido.**
- La portada y el `/Title` del PDF pasan a decir `v4`.
- El PDF pesa 1.286.756 bytes frente a 1.200.652 (+86 KB, que es el texto recuperado).

## Qué NO cambia

- **Pictogramas**: los mismos 150, de Arasaac, sin tocar.
- **Orden y selección de fichas**: las mismas 30, en el mismo orden, un fonema por página.
- **Palabras diana**: las mismas en inicio, medio y final.
- **Diseño**: mismos estilos, mismos colores, mismas 32 páginas (portada + introducción + 30 fichas).
- **Página de introducción**: idéntica, incluida la tabla de edades de Bosch (2004).

El texto que reaparece **no es nuevo**: estaba desde el principio en el markdown fuente `pack-fichas-articulacion-content.md` y simplemente no llegaba al PDF. Aun así, es contenido clínico y por eso pasa por tu revisión antes de sustituir nada.

---

## Aparte: la sección de Referencias nunca ha llegado al PDF

El markdown fuente termina con un apartado `## Referencias` con **5 referencias bibliográficas**
(Bosch 2004; Martínez Celdrán 2007; Williams, McLeod & McCauley 2010; ASHA 2013; Camarata). El
generador compone el documento con tres bloques —portada, introducción y las 30 fichas— y no hay
ningún punto donde se rendericen esas referencias. Es decir: **no llegan al comprador ni en v3 ni
en esta v4**.

Es un hueco distinto del fallo del regex y **no lo he tocado**: añadir una página de bibliografía
al producto es una decisión de Sergio, y el texto es tuyo. Lo dejo anotado aquí porque la página
de introducción sí cita "Bosch, 2004" sin que el lector pueda ver la referencia completa.

## Lo que verá el comprador en cada ficha

Texto extraído del HTML generado, tal cual se imprime.

| Nº | Fonema | Edad esperada | Posición articulatoria | Silabario |
|---|---|---|---|---|
| 01 | **P** | 3 años | Labios cerrados, se abren de golpe expulsando aire seco. Sin vibración de la garganta. | PA · PE · PI · PO · PU |
| 02 | **B** | 3 años | Labios juntos suavemente, se abren con vibración de la garganta (sonora). | BA · BE · BI · BO · BU |
| 03 | **T** | 3 años | Punta de la lengua toca la cara interna de los dientes superiores, aire explosivo seco. Sin vibración de la garganta. | TA · TE · TI · TO · TU |
| 04 | **D** | 3 años | Punta de la lengua toca la cara interna de los dientes superiores, aire explosivo suave y sonoro (vibra la garganta). | DA · DE · DI · DO · DU |
| 05 | **K** | 3 años | Parte trasera de la lengua toca el paladar blando. Aire explosivo sin vibración de garganta. | KA · KE · KI · KO · KU |
| 06 | **G** | 3 años | Como la K pero con sonoridad (vibra la garganta). Parte trasera de la lengua contra el paladar blando. | GA · GUE · GUI · GO · GU |
| 07 | **F** | 3 años | Dientes superiores tocan suavemente el labio inferior. El aire sale continuo, sin vibración de la garganta. | FA · FE · FI · FO · FU |
| 08 | **S** | 4 años | Punta de la lengua cerca del paladar alveolar (sin tocarlo), el aire pasa por un canal central. Sin vibración. | SA · SE · SI · SO · SU |
| 09 | **Z** | 5-6 años | Punta de la lengua asoma suavemente entre los dientes, el aire sale continuo. Sin vibración de la garganta. | ZA · CE · CI · ZO · ZU |
| 10 | **CH** | 3 años | La lengua toca el paladar duro, se suelta de golpe liberando aire con fricción. Sin vibración. | CHA · CHE · CHI · CHO · CHU |
| 11 | **L** | 3 años | Punta de la lengua apoyada en el paladar alveolar, el aire sale por los lados. Sonora. | LA · LE · LI · LO · LU |
| 12 | **N** | 3 años | Punta de la lengua apoyada en el paladar alveolar, el aire sale por la nariz. Sonora. | NA · NE · NI · NO · NU |
| 13 | **M** | 3 años | Labios cerrados, el aire sale por la nariz. Sonora. | MA · ME · MI · MO · MU |
| 14 | **Ñ** | 3 años | Lengua plana contra el paladar duro, el aire sale por la nariz. Sonora. | ÑA · ÑE · ÑI · ÑO · ÑU |
| 15 | **J** | 4 años | Parte trasera de la lengua se acerca al paladar blando sin tocarlo, el aire sale con fricción seca. | JA · JE · JI · JO · JU |
| 16 | **LL / Y** | 4 años | Lengua contra el paladar duro, el aire sale con fricción suave. Sonora. | YA · YE · YI · YO · YU |
| 17 | **R suave** | 5-6 años | Punta de la lengua golpea una sola vez el paladar alveolar. Breve y sonora. | ARA · ERE · IRI · ORO · URU (ra suave intervocálica) |
| 18 | **RR** | 6-7 años | Punta de la lengua vibra repetidamente contra el paladar alveolar con el aire espirado. Sonora. | RRA · RRE · RRI · RRO · RRU |
| 19 | **BL** | 6-7 años | B seguida inmediatamente de L, sin vocal intermedia. Labios cerrados que se abren mientras la lengua sube al paladar alveolar. | BLA · BLE · BLI · BLO · BLU |
| 20 | **BR** | 6-7 años | B seguida inmediatamente de R suave, sin vocal intermedia. | BRA · BRE · BRI · BRO · BRU |
| 21 | **CL** | 6-7 años | K seguida inmediatamente de L. Parte trasera de la lengua baja y la punta sube al paladar alveolar. | CLA · CLE · CLI · CLO · CLU |
| 22 | **CR** | 6-7 años | K seguida inmediatamente de R suave. | CRA · CRE · CRI · CRO · CRU |
| 23 | **DR** | 6-7 años | D seguida inmediatamente de R suave. | DRA · DRE · DRI · DRO · DRU |
| 24 | **FL** | 6-7 años | F seguida inmediatamente de L. | FLA · FLE · FLI · FLO · FLU |
| 25 | **FR** | 6-7 años | F seguida inmediatamente de R suave. | FRA · FRE · FRI · FRO · FRU |
| 26 | **GL** | 6-7 años | G seguida inmediatamente de L. | GLA · GLE · GLI · GLO · GLU |
| 27 | **GR** | 6-7 años | G seguida inmediatamente de R suave. | GRA · GRE · GRI · GRO · GRU |
| 28 | **PL** | 6-7 años | P seguida inmediatamente de L. | PLA · PLE · PLI · PLO · PLU |
| 29 | **PR** | 6-7 años | P seguida inmediatamente de R suave. | PRA · PRE · PRI · PRO · PRU |
| 30 | **TR** | 6-7 años | T seguida inmediatamente de R suave. | TRA · TRE · TRI · TRO · TRU |

## Campos vacíos o sospechosos

| Nº | Fonema | Aviso |
|---|---|---|
| 22 | CR | posición muy corta |
| 23 | DR | posición muy corta |
| 24 | FL | posición muy corta |
| 25 | FR | posición muy corta |
| 26 | GL | posición muy corta |
| 27 | GR | posición muy corta |
| 28 | PL | posición muy corta |
| 29 | PR | posición muy corta |
| 30 | TR | posición muy corta |

---

## Qué necesitamos de ti

1. Que las 30 descripciones de **posición articulatoria** sean correctas y estén bien redactadas para una familia sin formación.
2. Que las **edades esperadas** de cada fonema sigan siendo las que quieres sostener (vienen de Bosch, 2004, igual que la tabla de la introducción).
3. Que los **silabarios** no induzcan a error (por ejemplo, la ficha 17 · R suave lleva la nota «ra suave intervocálica»).

Con tu visto bueno, se sustituye el PDF en producción manteniendo la misma URL y se avisa a quienes ya compraron.
