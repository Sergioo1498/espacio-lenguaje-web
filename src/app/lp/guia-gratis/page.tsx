import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LandingForm from './LandingForm';

export const metadata: Metadata = {
  title: 'Guía Gratuita de Hitos del Lenguaje 0-6 años',
  description:
    'Descarga gratis nuestra guía de hitos del lenguaje infantil. Señales de alerta, ejercicios para casa y cuándo consultar. Creada por logopedas.',
  alternates: { canonical: 'https://www.espaciolenguaje.com/lp/guia-gratis' },
  openGraph: {
    title: 'Guía Gratuita: Hitos del Lenguaje 0-6 años | Espacio Lenguaje',
    description:
      'Descubre qué debería decir tu peque a cada edad. Señales de alerta y ejercicios para casa.',
    images: [
      {
        url: '/images/og-landing-guia.jpg',
        width: 1200,
        height: 630,
        alt: 'Guía gratuita de hitos del lenguaje infantil',
      },
    ],
  },
};

export default function LandingGuiaGratis() {
  return (
    <div className="min-h-screen bg-crema">
      {/* Minimal header — logo only */}
      <header className="flex justify-center py-6">
        <Link href="/" aria-label="Espacio Lenguaje - Inicio">
          <Image
            src="/images/logo-chosen.png"
            alt="Espacio Lenguaje"
            width={56}
            height={56}
            className="rounded-full"
          />
        </Link>
      </header>

      <main className="mx-auto max-w-xl px-6 pb-16">
        {/* HERO */}
        <section className="text-center">
          <span className="inline-block rounded-full bg-verde/10 px-4 py-1.5 font-sans text-sm font-medium text-verde-dark">
            100% gratuita
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-cacao md:text-4xl">
            Guía de Hitos del Lenguaje
            <br />
            <span className="text-terracota">de 0 a 6 años</span>
          </h1>
          <p className="mt-4 text-texto-secundario">
            Descubre qué debería decir tu peque a cada edad, las señales de
            alerta y ejercicios para hacer en casa.
          </p>

          {/* Guide mockup */}
          <div className="relative mx-auto mt-8 h-[240px] w-[200px]">
            <Image
              src="/images/guia-portada.png"
              alt="Guía de Hitos del Lenguaje de 0 a 6 años"
              fill
              className="rounded-lg object-contain drop-shadow-xl"
              priority
            />
          </div>

          {/* Form */}
          <div className="mt-8">
            <LandingForm />
            <p className="mt-3 font-sans text-xs text-texto-muted">
              Gratis · PDF · Enviamos a tu email · Sin spam
            </p>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { number: '7%', text: 'de los niños tiene un trastorno del lenguaje' },
            { number: '308', text: 'días de espera media en atención temprana' },
            { number: '4x', text: 'más efectiva es la intervención temprana' },
          ].map((stat) => (
            <div
              key={stat.number}
              className="rounded-2xl bg-white p-5 text-center shadow-sm"
            >
              <span className="block font-serif text-2xl font-bold text-terracota">
                {stat.number}
              </span>
              <span className="mt-1 block font-sans text-xs text-texto-secundario">
                {stat.text}
              </span>
            </div>
          ))}
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="mt-16">
          <h2 className="text-center font-serif text-2xl font-bold text-cacao">
            ¿Qué incluye la guía?
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              'Hitos del lenguaje organizados por edad (0-6 años)',
              'Señales de alerta claras para cada etapa',
              'Un ejercicio práctico para hacer en casa en cada franja',
              'Cuándo consultar a un logopeda',
              'Creada por logopedas colegiadas',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-verde"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="font-sans text-sm text-cacao">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECOND CTA */}
        <section className="mt-16 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="font-serif text-xl font-bold text-cacao">
            Descárgala ahora
          </h2>
          <p className="mt-2 text-sm text-texto-muted">
            Más de 2.500 familias ya la tienen
          </p>
          <div className="mt-6">
            <LandingForm />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-16 space-y-4">
          {[
            {
              text: 'La guía de hitos nos dio la tranquilidad que necesitábamos. Muy clara y práctica.',
              author: 'Carlos P.',
            },
            {
              text: 'Información clara y sin alarmismos. Muy recomendable para cualquier padre primerizo.',
              author: 'María G.',
            },
          ].map((t) => (
            <blockquote
              key={t.author}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-sm italic text-texto-secundario">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-3 font-sans text-xs font-semibold text-cacao">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-cacao/5 bg-crema py-6 text-center">
        <p className="font-sans text-xs text-texto-muted">
          Espacio Lenguaje · Logopedia Infantil
        </p>
        <div className="mt-2 flex justify-center gap-4 font-sans text-xs text-texto-muted">
          <Link href="/aviso-legal" className="hover:text-terracota">
            Aviso legal
          </Link>
          <Link href="/privacidad" className="hover:text-terracota">
            Privacidad
          </Link>
        </div>
        <p className="mt-2 font-sans text-xs text-texto-muted">
          &copy; 2026 Espacio Lenguaje
        </p>
      </footer>
    </div>
  );
}
