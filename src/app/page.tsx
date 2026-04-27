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

// El schema FAQPage vive dentro del componente <FAQ /> (sección sections/FAQ.tsx)
// para mantener una sola fuente de verdad sincronizada con las preguntas visibles.
// Tener un segundo FAQPage aquí causa el error "El campo FAQPage está duplicado"
// en Search Console y anula los rich results.

export default function Home() {
  return (
    <>
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
