'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTag from '@/components/ui/SectionTag';

const services = [
  {
    title: 'Recursos descargables',
    description:
      'Fichas, actividades y materiales listos para imprimir. Diseñados por logopedas para trabajar en casa.',
    link: { label: 'Explorar →', href: '/blog' },
    image: '/images/section-recursos.png',
    imageAlt: 'Fichas y tarjetas de logopedia infantil sobre una mesa de madera con la mano de un niño',
  },
  {
    title: 'Contenido educativo',
    description:
      'Artículos basados en evidencia para entender el desarrollo del lenguaje de tu hijo.',
    link: { label: 'Leer artículos →', href: '/blog' },
    image: '/images/section-educativo.png',
    imageAlt: 'Libro infantil abierto con ilustraciones y bloques de letras de madera',
  },
  {
    title: 'Guías para familias',
    description:
      'Guías paso a paso para familias que quieren ayudar a su peque desde casa.',
    link: { label: 'Descubrir →', href: '#lead-magnet' },
    image: '/images/section-guias.png',
    imageAlt: 'Manos de padre e hijo haciendo ejercicios de logopedia con tarjetas ilustradas',
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
                className="group flex h-full flex-col rounded-3xl bg-white overflow-hidden shadow-sm"
              >
                {/* Image */}
                <div className="relative h-[180px] md:h-[200px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8">
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
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
