'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

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

function GuideMockup() {
  return (
    <motion.div
      className="relative w-full max-w-[280px] mx-auto"
      style={{
        transform: 'perspective(800px) rotateY(-8deg)',
      }}
      whileHover={{
        transform: 'perspective(800px) rotateY(-2deg)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
    >
      <div className="rounded-2xl bg-white p-6 shadow-2xl">
        {/* Cover content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Decorative verde badges */}
          <div className="flex gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-verde" />
            <span className="inline-block w-3 h-3 rounded-full bg-verde-light" />
            <span className="inline-block w-3 h-3 rounded-full bg-verde/50" />
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-cacao leading-snug">
            Hitos del lenguaje
            <br />
            de 0 a 6 años
          </h3>

          {/* Decorative content lines */}
          <div className="w-full space-y-2 py-2">
            <div className="h-1.5 w-full rounded-full bg-arena" />
            <div className="h-1.5 w-4/5 mx-auto rounded-full bg-arena" />
            <div className="h-1.5 w-3/5 mx-auto rounded-full bg-arena" />
          </div>

          {/* Small icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-verde/15">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2L12.5 7.5H17.5L13.5 11L15 17L10 13.5L5 17L6.5 11L2.5 7.5H7.5L10 2Z"
                fill="#8FAE8B"
              />
            </svg>
          </div>

          {/* More decorative lines */}
          <div className="w-full space-y-2 py-1">
            <div className="h-1.5 w-full rounded-full bg-arena" />
            <div className="h-1.5 w-5/6 mx-auto rounded-full bg-arena" />
          </div>

          {/* Subtitle */}
          <p className="text-xs font-semibold uppercase tracking-wider text-terracota">
            Espacio Lenguaje
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadMagnet() {
  return (
    <section id="lead-magnet" className="section-padding">
      <div className="relative mx-6 max-w-6xl lg:mx-auto rounded-3xl overflow-hidden bg-cacao">
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
            <form
              className="mt-8 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Tu email"
                required
                className="flex-1 rounded-pill px-6 py-3.5 text-sm bg-white text-cacao placeholder:text-texto-muted outline-none focus:ring-2 focus:ring-terracota/50"
              />
              <button
                type="submit"
                className="rounded-pill bg-terracota px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-terracota-dark whitespace-nowrap"
              >
                Descargar gratis
              </button>
            </form>

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

          {/* Right column */}
          <AnimatedSection
            direction="right"
            delay={0.2}
            className="flex items-center justify-center"
          >
            <GuideMockup />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
