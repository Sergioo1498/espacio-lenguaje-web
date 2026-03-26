import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTag from '@/components/ui/SectionTag';


const testimonials = [
  {
    initials: 'MG',
    color: 'bg-verde',
    quote:
      'Los recursos de Espacio Lenguaje nos han ayudado mucho a entender el desarrollo del lenguaje de nuestro hijo. Muy recomendable.',
    name: 'María G.',
  },
  {
    initials: 'CP',
    color: 'bg-terracota',
    quote:
      'La guía de hitos del lenguaje nos dio la tranquilidad que necesitábamos. Información clara y sin alarmismos.',
    name: 'Carlos P.',
  },
  {
    initials: 'AR',
    color: 'bg-verde',
    quote:
      'Como profesional de educación infantil, recomiendo Espacio Lenguaje por su rigor y cercanía.',
    name: 'Ana R.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-arena section-padding">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionTag variant="terracota">Testimonios</SectionTag>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-cacao">
            Lo que dicen las familias
          </h2>
        </AnimatedSection>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.initials} delay={i * 0.15}>
              {/*
                Hover animations use CSS only (no framer-motion) since this
                is a server component.
              */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-sm ${t.color}`}
                  >
                    {t.initials}
                  </span>
                  <span className="text-sm font-medium text-cacao">{t.name}</span>
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <svg
                    className="mb-3 text-terracota/20"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 18H12L8 26H14L18 18V6H6V18ZM20 18H26L22 26H28L32 18V6H20V18Z" />
                  </svg>
                  <p className="text-texto-secundario leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
