import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import LeadMagnet from "@/components/sections/LeadMagnet";
import BlogPreview from "@/components/sections/BlogPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import WaveDivider from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Espacio Lenguaje — Logopedia Infantil | Recursos y Ejercicios",
  description:
    "Logopedia infantil: estimulación del lenguaje, dislexia, tartamudez. Guías gratuitas, ejercicios para casa y recursos profesionales. Descarga la guía de hitos 0-6 años.",
  alternates: { canonical: "https://www.espaciolenguaje.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuándo debería preocuparme por el lenguaje de mi hijo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Si a los 12 meses no balbucea ni señala, a los 18 meses no dice ninguna palabra, o a los 2 años no combina dos palabras, es recomendable consultar con un logopeda.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es un retraso del lenguaje?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un retraso del lenguaje ocurre cuando un niño no alcanza los hitos esperados de comunicación para su edad. Puede afectar a la comprensión, a la expresión o a ambos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo estimular el lenguaje de mi peque en casa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Habla mucho con tu peque narrando lo que hacéis juntos, lee cuentos cada día, canta canciones, juega a juegos de turnos y dale tiempo para responder. Lo más importante es que sea un momento agradable y sin presión.",
      },
    },
    {
      "@type": "Question",
      name: "¿A partir de qué edad se puede ir al logopeda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No hay una edad mínima. Cuanto antes se detecte y se aborde una dificultad del lenguaje, mejor es el pronóstico. Los programas de atención temprana atienden desde los 0 años.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los recursos descargables son suficientes o necesito un profesional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestros recursos complementan la estimulación en casa, pero no sustituyen la valoración de un logopeda. Si observas señales de alerta, consulta con un profesional.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <TrustBar />
      <WaveDivider color="#ffffff" />
      <Stats />
      <WaveDivider color="#ffffff" flip />
      <Services />
      <HowItWorks />
      <WaveDivider color="#ffffff" />
      <LeadMagnet />
      <WaveDivider color="#ffffff" flip />
      <BlogPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
