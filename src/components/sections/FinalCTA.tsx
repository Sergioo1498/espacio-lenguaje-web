import AnimatedSection from '@/components/ui/AnimatedSection';

export default function FinalCTA() {
  return (
    <section id="contacto" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-verde/5" />
        <div className="absolute bottom-16 left-[5%] w-16 h-16 rounded-full bg-verde/8" />
        <div className="absolute top-32 right-[8%] w-20 h-20 rounded-full bg-verde/6" />
        <div className="absolute bottom-24 right-[15%] w-12 h-12 rounded-full bg-verde/10" />
        <div className="absolute top-1/2 left-[20%] w-10 h-10 rounded-full bg-terracota/5" />
        <div className="absolute top-12 right-[30%] w-14 h-14 rounded-full bg-terracota/5" />
      </div>

      <div className="container-custom relative z-10 text-center">
        {/* Decorative sound waves */}
        <AnimatedSection className="flex justify-center mb-8">
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="60" cy="40" r="8" stroke="#C4745A" strokeWidth="2.5" />
            <path
              d="M74 28C80 32 80 48 74 52"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M46 28C40 32 40 48 46 52"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M84 18C94 26 94 54 84 62"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M36 18C26 26 26 54 36 62"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M94 8C108 20 108 60 94 72"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.2"
            />
            <path
              d="M26 8C12 20 12 60 26 72"
              stroke="#C4745A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.2"
            />
          </svg>
        </AnimatedSection>

        {/* Heading */}
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cacao mb-6">
            ¿Tienes dudas sobre el lenguaje de tu peque?
          </h2>
          <p className="text-lg text-texto-secundario max-w-xl mx-auto mb-10">
            Escríbenos y te orientamos sin compromiso.
          </p>
        </AnimatedSection>

        {/* CTA button */}
        <AnimatedSection delay={0.15}>
          <a
            href="mailto:hola@espaciolenguaje.com"
            className="btn-primary inline-block text-lg px-10 py-4"
          >
            Escríbenos
          </a>
        </AnimatedSection>

        {/* Instagram link */}
        <AnimatedSection delay={0.25} className="mt-8">
          <a
            href="https://instagram.com/espaciolenguaje"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-texto-secundario hover:text-terracota transition-colors duration-200"
          >
            {/* Instagram icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-sm font-medium">@espaciolenguaje</span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
