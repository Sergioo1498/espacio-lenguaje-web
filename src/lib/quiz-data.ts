/**
 * Preguntas del quiz "¿Necesita mi peque consulta con logopeda?".
 *
 * Cada pregunta evalúa una señal de alerta basada en hitos clínicos
 * (GAT, AEP, DSM-5, Bosch 2004, Rescorla 2011, ASHA).
 *
 * Respuesta marcada como "alert" = 1 señal de alerta sumada al score.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  /** Respuesta que cuenta como "señal de alerta" */
  alertWhen: "yes" | "no";
}

export type AgeRange =
  | "0-1"
  | "1-2"
  | "2-3"
  | "3-4"
  | "4-5"
  | "5-6"
  | "6+";

export const ageRanges: Array<{ id: AgeRange; label: string }> = [
  { id: "0-1", label: "0 a 12 meses" },
  { id: "1-2", label: "12 a 24 meses" },
  { id: "2-3", label: "2 a 3 años" },
  { id: "3-4", label: "3 a 4 años" },
  { id: "4-5", label: "4 a 5 años" },
  { id: "5-6", label: "5 a 6 años" },
  { id: "6+", label: "6 años o más" },
];

export const quizByAge: Record<AgeRange, QuizQuestion[]> = {
  "0-1": [
    { id: "q1", question: "¿Sonríe socialmente y mantiene contacto visual cuando le hablas?", alertWhen: "no", hint: "Hito esperado: hacia las 6-8 semanas" },
    { id: "q2", question: "Hacia los 6 meses, ¿balbucea con sonidos como 'ba-ba', 'ma-ma' o 'da-da'?", alertWhen: "no", hint: "Hito 4-6 m: balbuceo canónico" },
    { id: "q3", question: "¿Gira la cabeza cuando le llamas por su nombre (8-12 meses)?", alertWhen: "no" },
    { id: "q4", question: "Hacia los 9-12 meses, ¿señala con el dedo o mira lo que tú señalas (atención conjunta)?", alertWhen: "no", hint: "Predictor clave del lenguaje posterior" },
    { id: "q5", question: "¿Reacciona a sonidos del entorno (juguetes, ruidos, voces)?", alertWhen: "no" },
    { id: "q6", question: "¿Hay algún antecedente familiar de retraso del lenguaje, dislexia o TEL?", alertWhen: "yes" },
    { id: "q7", question: "¿Tu bebé ha tenido otitis frecuentes (3 o más en últimos 6 meses)?", alertWhen: "yes", hint: "OME prolongada puede afectar al desarrollo del lenguaje" },
  ],
  "1-2": [
    { id: "q1", question: "A los 12 meses, ¿decía al menos una palabra con significado ('mamá', 'papá', 'agua', etc.)?", alertWhen: "no" },
    { id: "q2", question: "¿Comprende órdenes sencillas ('dame', 'ven', 'toma')?", alertWhen: "no" },
    { id: "q3", question: "A los 18 meses, ¿tiene al menos 10-20 palabras en su vocabulario?", alertWhen: "no", hint: "Hito orientativo CDC/GAT" },
    { id: "q4", question: "¿Señala con el dedo lo que quiere o lo que ve?", alertWhen: "no" },
    { id: "q5", question: "¿Imita gestos, palabras o acciones que ve en otros?", alertWhen: "no" },
    { id: "q6", question: "¿Mantiene contacto visual cuando interactúa contigo?", alertWhen: "no" },
    { id: "q7", question: "¿Pierde palabras que antes decía (regresión)?", alertWhen: "yes", hint: "Señal de alarma temprana — consultar siempre" },
  ],
  "2-3": [
    { id: "q1", question: "A los 24 meses, ¿tiene al menos 50 palabras en su vocabulario activo?", alertWhen: "no", hint: "Criterio Rescorla 2011 para 'hablante tardío'" },
    { id: "q2", question: "¿Combina 2 palabras espontáneamente ('mamá agua', 'nene coche')?", alertWhen: "no" },
    { id: "q3", question: "¿Responde a su nombre y sigue órdenes en 2 pasos ('coge el zapato y dámelo')?", alertWhen: "no" },
    { id: "q4", question: "¿Le entendéis tú o quienes le rodean al menos la mitad de lo que dice?", alertWhen: "no", hint: "Inteligibilidad ~50% esperada a los 2 años" },
    { id: "q5", question: "¿Repite mecánicamente palabras o frases sin parecer entenderlas (ecolalia persistente)?", alertWhen: "yes" },
    { id: "q6", question: "¿Tiene poca interacción comunicativa (no busca jugar, no comparte intereses)?", alertWhen: "yes" },
    { id: "q7", question: "¿Aparecen frustraciones o rabietas frecuentes cuando intenta comunicarse?", alertWhen: "yes" },
  ],
  "3-4": [
    { id: "q1", question: "¿Construye frases de 3 o más palabras de forma habitual?", alertWhen: "no" },
    { id: "q2", question: "¿Usa verbos en pasado, presente y plurales (aunque haga errores como 'rompido')?", alertWhen: "no", hint: "Sobre-regularizaciones son normales a esta edad" },
    { id: "q3", question: "¿Pregunta '¿qué es esto?' o '¿por qué?' espontáneamente?", alertWhen: "no" },
    { id: "q4", question: "¿Le entiende un adulto desconocido al menos el 75% de lo que dice?", alertWhen: "no" },
    { id: "q5", question: "¿Repite sílabas o palabras al hablar ('mi-mi-mi mamá')?", alertWhen: "yes", hint: "Disfluencias normales o tartamudez evolutiva — vigilar si dura >6 meses" },
    { id: "q6", question: "¿Pronuncia mal varios fonemas distintos (no solo /r/ o /s/)?", alertWhen: "yes" },
    { id: "q7", question: "¿Le cuesta entender órdenes complejas o instrucciones del cole?", alertWhen: "yes" },
  ],
  "4-5": [
    { id: "q1", question: "¿Cuenta lo que pasó en el cole o en casa de forma comprensible?", alertWhen: "no" },
    { id: "q2", question: "¿Sus frases son largas y bien construidas (>5 palabras)?", alertWhen: "no" },
    { id: "q3", question: "¿Pronuncia bien todos los fonemas excepto /r/ vibrante y /s/?", alertWhen: "no", hint: "/r/ y /s/ se consolidan más tarde (Bosch 2004)" },
    { id: "q4", question: "¿Reconoce rimas sencillas o palabras que empiezan igual?", alertWhen: "no", hint: "Conciencia fonológica básica" },
    { id: "q5", question: "¿Le entiende cualquier adulto sin dificultad?", alertWhen: "no", hint: "Inteligibilidad ~100% esperada" },
    { id: "q6", question: "¿Le cuesta mantener una conversación o seguir el tema?", alertWhen: "yes" },
    { id: "q7", question: "¿Sustituye, omite o distorsiona varios sonidos al hablar?", alertWhen: "yes" },
  ],
  "5-6": [
    { id: "q1", question: "¿Domina la pronunciación de prácticamente todos los fonemas incluida la /r/?", alertWhen: "no", hint: "La /rr/ se consolida hacia los 5-6 años" },
    { id: "q2", question: "¿Identifica el sonido inicial de palabras sencillas?", alertWhen: "no" },
    { id: "q3", question: "¿Puede contar una historia respetando el orden temporal?", alertWhen: "no" },
    { id: "q4", question: "¿Le cuesta segmentar palabras en sílabas?", alertWhen: "yes" },
    { id: "q5", question: "¿Muestra interés por las letras o por aprender a leer?", alertWhen: "no" },
    { id: "q6", question: "¿Hay tartamudez persistente o evita hablar en algunas situaciones?", alertWhen: "yes" },
    { id: "q7", question: "¿Le cuesta seguir las instrucciones del cole?", alertWhen: "yes" },
  ],
  "6+": [
    { id: "q1", question: "¿Lee con fluidez para su edad escolar?", alertWhen: "no" },
    { id: "q2", question: "¿Comprende lo que lee al primer intento?", alertWhen: "no" },
    { id: "q3", question: "¿Comete errores frecuentes de ortografía natural (omite letras, las cambia)?", alertWhen: "yes", hint: "Posible señal de dislalia o dislexia" },
    { id: "q4", question: "¿Persiste algún problema de pronunciación?", alertWhen: "yes" },
    { id: "q5", question: "¿Tartamudea de forma persistente?", alertWhen: "yes" },
    { id: "q6", question: "¿Tiene dificultades para mantener una conversación o expresar ideas?", alertWhen: "yes" },
    { id: "q7", question: "¿El profesorado ha mencionado dificultades de lenguaje o aprendizaje?", alertWhen: "yes" },
  ],
};

export interface QuizResult {
  level: "verde" | "amarillo" | "rojo";
  title: string;
  intro: string;
  recommendation: string;
}

export function interpretScore(score: number, total: number, age: AgeRange): QuizResult {
  const isYounger = age === "0-1" || age === "1-2";
  if (score <= 1) {
    return {
      level: "verde",
      title: "El desarrollo del lenguaje de tu peque parece estar en rango esperable",
      intro: `Has marcado ${score} de ${total} señales. La mayoría de hitos clave están presentes en el rango orientativo para su edad (${age}).`,
      recommendation: isYounger
        ? "Sigue con la estimulación natural: nombrar lo que hace, leer cuentos a diario, esperar su turno. Si en próximos meses notas que algo se estanca, vuelve a hacer el quiz."
        : "El desarrollo va bien. Mantén rutinas conversacionales (sobremesa, lectura, juego simbólico). Si en algún momento notas regresión o aparece tartamudez persistente, consulta.",
    };
  }
  if (score <= 3) {
    return {
      level: "amarillo",
      title: "Conviene observar con más atención",
      intro: `Has marcado ${score} de ${total} señales. No es motivo de alarma, pero sí merece la pena estimular con más intención durante 2-3 meses y reevaluar.`,
      recommendation:
        "Aplica una rutina de 10 minutos al día de estimulación específica para su edad: conversación con expansión, lectura compartida diaria, juego simbólico. Si en 3 meses no notas evolución clara, agenda una valoración con logopeda colegiada.",
    };
  }
  return {
    level: "rojo",
    title: "Recomendable consultar con logopeda colegiada",
    intro: `Has marcado ${score} de ${total} señales — varias coinciden con factores que conviene valorar profesionalmente. Esto NO significa que tu peque tenga un trastorno, pero sí que una valoración temprana puede aclararlo y, si hace falta, intervenir antes.`,
    recommendation:
      "Pide cita con un logopeda colegiado en tu zona o en consulta online. La atención temprana (0-6 años) es donde más impacto tiene la intervención. Mientras tanto, no esperes — empieza a aplicar estimulación específica para su edad.",
  };
}
