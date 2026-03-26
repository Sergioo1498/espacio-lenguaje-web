'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTag from '@/components/ui/SectionTag';

const services = [
  {
    title: 'Recursos descargables',
    description:
      'Fichas, actividades y materiales listos para imprimir. Diseñados por logopedas para trabajar en casa.',
    link: { label: 'Explorar →', href: '/blog' },
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        {/* Document body */}
        <rect x="16" y="8" width="40" height="52" rx="4" fill="#4A7C59" opacity="0.15" />
        <rect x="18" y="10" width="36" height="48" rx="3" stroke="#4A7C59" strokeWidth="2" fill="white" />
        {/* Text lines */}
        <line x1="26" y1="22" x2="46" y2="22" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="30" x2="42" y2="30" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="38" x2="44" y2="38" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
        {/* Checkmark */}
        <circle cx="38" cy="48" r="6" fill="#C75C2E" opacity="0.2" />
        <path d="M34 48 L37 51 L42 45" stroke="#C75C2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Small hand pointing */}
        <path d="M56 32 C60 30, 66 32, 64 37 C62 40, 58 40, 56 38 Z" fill="#C75C2E" opacity="0.7" />
        <rect x="54" y="37" width="8" height="12" rx="3" fill="#C75C2E" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Contenido educativo',
    description:
      'Artículos basados en evidencia para entender el desarrollo del lenguaje de tu hijo.',
    link: { label: 'Leer artículos →', href: '/blog' },
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        {/* Open book — left page */}
        <path d="M40 18 C32 16, 16 16, 12 18 L12 58 C16 56, 32 56, 40 58 Z" fill="#4A7C59" opacity="0.12" stroke="#4A7C59" strokeWidth="2" />
        {/* Open book — right page */}
        <path d="M40 18 C48 16, 64 16, 68 18 L68 58 C64 56, 48 56, 40 58 Z" fill="#4A7C59" opacity="0.12" stroke="#4A7C59" strokeWidth="2" />
        {/* Spine */}
        <line x1="40" y1="18" x2="40" y2="58" stroke="#4A7C59" strokeWidth="2" />
        {/* Sound waves */}
        <path d="M50 28 C53 28, 53 34, 50 34" stroke="#C75C2E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M54 24 C60 26, 60 36, 54 38" stroke="#C75C2E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M58 20 C66 24, 66 38, 58 42" stroke="#C75C2E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
        {/* Text lines on left page */}
        <line x1="18" y1="28" x2="34" y2="28" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="34" x2="32" y2="34" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="40" x2="34" y2="40" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Guías para familias',
    description:
      'Guías paso a paso para familias que quieren ayudar a su peque desde casa.',
    link: { label: 'Descubrir →', href: '#lead-magnet' },
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        {/* Adult hand */}
        <path
          d="M18 50 C18 38, 24 28, 32 26 C36 25, 38 27, 38 30 L38 42 C38 44, 36 46, 34 46 L26 46 C22 46, 18 48, 18 50 Z"
          fill="#4A7C59"
          opacity="0.25"
          stroke="#4A7C59"
          strokeWidth="2"
        />
        {/* Small hand */}
        <path
          d="M50 48 C50 42, 52 36, 56 35 C58 34.5, 60 36, 60 38 L60 44 C60 46, 58 47, 56 47 L52 47 C51 47, 50 47.5, 50 48 Z"
          fill="#C75C2E"
          opacity="0.3"
          stroke="#C75C2E"
          strokeWidth="2"
        />
        {/* Heart between hands */}
        <path
          d="M40 34 C40 30, 44 28, 46 30 C48 28, 52 30, 52 34 C52 40, 46 44, 46 44 C46 44, 40 40, 40 34 Z"
          fill="#C75C2E"
          opacity="0.6"
        />
        {/* Connection wave */}
        <path
          d="M34 52 C38 48, 42 48, 46 52 C50 56, 54 56, 58 52"
          stroke="#4A7C59"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicios" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="mx-auto mb-14 max-w-2xl text-center">
          <SectionTag>Nuestros recursos</SectionTag>
          <h2 className="mt-4 font-serif text-3xl font-bold text-cacao md:text-4xl lg:text-5xl">
            Todo lo que necesitas para acompañar a tu peque
          </h2>
          <p className="mt-4 text-texto-secundario md:text-lg">
            Herramientas prácticas creadas por profesionales para apoyar el desarrollo del lenguaje
            desde casa, a tu ritmo.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm"
              >
                {/* Icon */}
                <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="mb-2 font-serif text-xl font-semibold text-cacao">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mb-6 flex-1 text-texto-secundario">{service.description}</p>

                {/* Link */}
                <Link
                  href={service.link.href}
                  className="inline-flex items-center font-medium text-terracota transition-colors hover:text-terracota-dark"
                >
                  {service.link.label}
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
