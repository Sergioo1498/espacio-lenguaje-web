'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import NewsletterForm from '@/components/ui/NewsletterForm';

const checkItems = [
  'Hitos del lenguaje por edad',
  'Señales de alerta claras',
  'Ejercicios para hacer en casa',
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <circle cx="10" cy="10" r="10" fill="#8FAE8B" />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LeadMagnet() {
  return (
    <section id="lead-magnet" className="section-padding">
      <div className="relative mx-6 max-w-6xl lg:mx-auto rounded-3xl overflow-hidden bg-cacao">
        {/* Pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/pattern-bg.png')",
            backgroundSize: "300px",
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />

        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-terracota opacity-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-[200px] h-[200px] rounded-full bg-verde opacity-[0.05] pointer-events-none"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 md:p-12 lg:p-16">
          {/* Left column */}
          <AnimatedSection direction="left" className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Guía gratuita: Hitos del lenguaje de 0 a 6 años
            </h2>

            <p className="mt-4 text-white/70 leading-relaxed max-w-lg">
              Descubre qué debería decir tu peque en cada etapa y cuándo consultar a un
              profesional.
            </p>

            {/* Form */}
            <div className="mt-8">
              <NewsletterForm variant="dark" buttonText="Descargar gratis" />
            </div>

            {/* Checklist */}
            <ul className="mt-8 space-y-3">
              {checkItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Right column — Guide image with 3D perspective */}
          <AnimatedSection
            direction="right"
            delay={0.2}
            className="flex items-center justify-center"
          >
            <motion.div
              className="relative w-full max-w-[320px]"
              style={{
                transform: 'perspective(800px) rotateY(-8deg)',
              }}
              whileHover={{
                transform: 'perspective(800px) rotateY(-2deg)',
                transition: { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/section-guia-gratuita.png"
                  alt="Guía gratuita de Espacio Lenguaje: Hitos del lenguaje de 0 a 6 años"
                  width={320}
                  height={240}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
