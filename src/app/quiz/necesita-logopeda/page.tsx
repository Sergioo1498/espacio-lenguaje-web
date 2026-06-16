import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/hreflang";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Test: ¿Necesita mi peque consulta con logopeda? (gratis)",
  description:
    "Test interactivo gratuito para padres: 7 preguntas adaptadas a la edad de tu peque (0-6 años) basadas en hitos clínicos (GAT, AEP, Bosch 2004). Resultado interpretado al instante. Revisado por logopeda colegiada.",
  alternates: {
    canonical: "https://www.espaciolenguaje.com/quiz/necesita-logopeda",
    languages: localizedAlternates("/quiz/necesita-logopeda"),
  },
  openGraph: {
    title: "Test: ¿Necesita mi peque consulta con logopeda?",
    description: "Test gratuito basado en hitos clínicos. 2 minutos. Resultado interpretado al instante.",
    type: "website",
    url: "https://www.espaciolenguaje.com/quiz/necesita-logopeda",
  },
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Test: ¿Necesita mi peque consulta con logopeda?",
  url: "https://www.espaciolenguaje.com/quiz/necesita-logopeda",
  description:
    "Test interactivo gratuito basado en hitos clínicos para orientar a familias sobre si conviene consultar con logopeda.",
  inLanguage: "es-ES",
  audience: { "@type": "Audience", audienceType: "Parents of children 0-6" },
  isAccessibleForFree: true,
};

export default function QuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <QuizClient />
    </>
  );
}
