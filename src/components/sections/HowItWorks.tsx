'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTag from '@/components/ui/SectionTag';

const steps = [
  {
    number: 1,
    title: 'Descubre',
    text: 'Identifica dónde está tu peque con nuestra guía de hitos del lenguaje',
    accentColor: 'terracota',
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="26" cy="26" r="14" stroke="#C4745A" strokeWidth="2.5" />
        <line
          x1="36.5"
          y1="36.5"
          x2="50"
          y2="50"
          stroke="#C4745A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="26" cy="26" r="6" stroke="#C4745A" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Aprende',
    text: 'Accede a ejercicios y recursos adaptados a su edad',
    accentColor: 'verde',
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14C8 14 18 10 30 14C42 18 52 14 52 14V46C52 46 42 50 30 46C18 42 8 46 8 46V14Z"
          stroke="#8FAE8B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="30" y1="14" x2="30" y2="46" stroke="#8FAE8B" strokeWidth="2" />
        <path
          d="M16 22H24"
          stroke="#8FAE8B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M16 28H22"
          stroke="#8FAE8B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M36 24H44"
          stroke="#8FAE8B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M36 30H42"
          stroke="#8FAE8B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Avanza',
    text: 'Aplica las estrategias en casa y observa los resultados',
    accentColor: 'terracota',
    icon: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 8L36 28H24L30 8Z"
          stroke="#C4745A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 28L18 40L26 36L24 28Z"
          stroke="#C4745A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M36 28L42 40L34 36L36 28Z"
          stroke="#C4745A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M26 36L30 52L34 36"
          stroke="#C4745A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="18" r="2" fill="#C4745A" opacity="0.3" />
        <circle cx="48" cy="22" r="1.5" fill="#C4745A" opacity="0.3" />
        <circle cx="44" cy="12" r="1" fill="#C4745A" opacity="0.2" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white section-padding">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionTag variant="verde">Así te ayudamos</SectionTag>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-cacao">
            3 pasos para impulsar el lenguaje de tu peque
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {/* Connecting dashed line (desktop only) */}
          <div
            className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-verde/30"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.2} className="relative">
              <div className="flex flex-col items-center text-center py-8">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-crema">
                    {step.icon}
                  </div>
                  {/* Number badge */}
                  <span
                    className={`absolute -top-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white ${
                      step.accentColor === 'terracota' ? 'bg-terracota' : 'bg-verde'
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <h3 className="mb-2 font-serif text-xl lg:text-2xl text-cacao">
                  {step.title}
                </h3>
                <p className="max-w-xs text-texto-secundario leading-relaxed">
                  {step.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
