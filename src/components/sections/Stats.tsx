'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { end: 7, suffix: '%', description: 'de los niños tiene un trastorno del lenguaje' },
  { end: 800, suffix: 'K', description: 'niños con dislexia en España' },
  { end: 300, suffix: '+', description: 'días de espera en atención temprana' },
  { end: 65, suffix: '%', description: 'del fracaso escolar por dificultades del lenguaje' },
];

export default function Stats() {
  return (
    <section id="estadisticas" className="relative overflow-hidden bg-arena section-padding">
      {/* Decorative blob — left */}
      <svg
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 text-verde opacity-10"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M44.7,-56.2C57.5,-45.6,67,-30.7,71.3,-14.1C75.6,2.5,74.6,20.8,66.3,35.1C58,49.4,42.4,59.7,25.6,65.3C8.8,70.9,-9.2,71.8,-25.8,66.3C-42.4,60.8,-57.6,48.9,-65.5,33.5C-73.4,18.1,-74,-0.9,-68.5,-17.5C-63,-34.1,-51.4,-48.3,-37.8,-58.7C-24.2,-69.1,-8.6,-75.6,4.4,-80.8C17.4,-86,31.9,-66.8,44.7,-56.2Z" transform="translate(100 100)" />
      </svg>

      {/* Decorative blob — right */}
      <svg
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 text-terracota opacity-10"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M39.9,-51.6C52.1,-41.5,62.7,-29.6,67.6,-15.3C72.5,-1,71.7,15.7,64.5,29.4C57.3,43.1,43.7,53.8,28.6,60.3C13.5,66.8,-3.1,69.1,-19.2,65.2C-35.3,61.3,-50.9,51.2,-60.1,37C-69.3,22.8,-72.1,4.5,-68.2,-11.5C-64.3,-27.5,-53.7,-41.2,-40.8,-51.1C-27.9,-61,-12.7,-67.1,1.2,-68.6C15.1,-70.1,27.7,-61.7,39.9,-51.6Z" transform="translate(100 100)" />
      </svg>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.description} delay={i * 0.15} className="text-center">
              <div className="mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-sm leading-relaxed text-texto-secundario md:text-base">
                {stat.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
