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

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PdfMockup({
  className = '',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`mockup ${className}`}>
      <Image
        src="/images/guia-portada.png"
        alt="Guía gratuita: Hitos del lenguaje de 0 a 6 años — Espacio Lenguaje"
        width={600}
        height={800}
        priority={priority}
        className="mockup-img"
      />
      <div className="mockup-badge-evidence">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6 10.5L8.5 13L14 7.5"
            stroke="#6D8D69"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Basada en evidencia
      </div>
      <div className="mockup-badge-logo">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 2l2.2 5.2L18 8l-4.2 3.8L15 18l-5-3-5 3 1.2-6.2L2 8l5.8-.8z"
            fill="#C4745A"
          />
        </svg>
        Creada por logopedas
      </div>
      <div className="mockup-pages-badge">11 páginas · PDF</div>
    </div>
  );
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://www.espaciolenguaje.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Guía gratuita de hitos del lenguaje',
      item: 'https://www.espaciolenguaje.com/lp/guia-gratis',
    },
  ],
};

export default function LandingGuiaGratis() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <style>{`
        .hero-blob::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -15%;
          width: 520px;
          height: 520px;
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          background: #F5E6D3;
          opacity: 0.5;
          z-index: 0;
        }
        .mockup-wrap { perspective: 1400px; }
        .mockup {
          position: relative;
          width: min(340px, 82vw);
          transform: rotateY(-14deg) rotateX(6deg) rotate(-1.5deg);
          transform-style: preserve-3d;
          animation: mockup-float 5s ease-in-out infinite;
          filter: drop-shadow(0 30px 50px rgba(61,44,46,0.30)) drop-shadow(0 10px 20px rgba(61,44,46,0.15));
        }
        .mockup.side { width: min(300px, 72vw); transform: rotateY(12deg) rotate(2deg); animation-duration: 6s; }
        @keyframes mockup-float {
          0%, 100% { transform: rotateY(-14deg) rotateX(6deg) rotate(-1.5deg) translateY(0); }
          50%      { transform: rotateY(-14deg) rotateX(6deg) rotate(-1.5deg) translateY(-10px); }
        }
        .mockup-img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 6px;
        }
        .mockup-badge-evidence, .mockup-badge-logo, .mockup-pages-badge {
          position: absolute;
          background: #fff;
          padding: 8px 14px;
          border-radius: 999px;
          box-shadow: 0 10px 24px rgba(61,44,46,0.22);
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transform: translateZ(60px);
          white-space: nowrap;
        }
        .mockup-badge-evidence { top: -14px; left: -24px; color: #6D8D69; }
        .mockup-badge-logo { bottom: 32px; right: -40px; color: #a85f48; }
        .mockup-pages-badge {
          bottom: -14px; left: 50%;
          transform: translateX(-50%) translateZ(60px);
          color: #3D2C2E;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 11px;
        }
        @media (prefers-reduced-motion: reduce) { .mockup { animation: none !important; } }

        .final-cta-bg::before, .final-cta-bg::after {
          content: ''; position: absolute; border-radius: 50%; filter: blur(4px);
        }
        .final-cta-bg::before { width: 280px; height: 280px; background: rgba(196,116,90,0.15); top: -80px; right: -60px; }
        .final-cta-bg::after { width: 200px; height: 200px; background: rgba(143,174,139,0.10); bottom: -70px; left: -50px; }
      `}</style>

      <div className="min-h-screen bg-crema text-cacao">
        {/* Topbar — logo only */}
        <header className="flex items-center justify-center px-5 py-5">
          <Link href="/" aria-label="Espacio Lenguaje - Inicio">
            <Image
              src="/images/logo-icon.png"
              alt="Espacio Lenguaje"
              width={48}
              height={48}
              className="block"
            />
          </Link>
        </header>

        {/* HERO */}
        <section className="hero-blob relative overflow-hidden pb-16 pt-4 md:pb-24 md:pt-12">
          <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-verde/15 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-verde-dark">
                <span className="h-1.5 w-1.5 rounded-full bg-verde"></span>
                Guía gratuita · PDF
              </span>
              <h1 className="text-balance font-serif text-4xl leading-tight text-cacao md:text-5xl lg:text-[56px]">
                Descubre si el lenguaje de tu peque va por{' '}
                <em className="not-italic text-terracota">buen camino</em>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-texto-secundario md:text-lg">
                Una guía clara y sin alarmismos para saber qué debería decir tu
                hijo en cada etapa, de 0 a 6 años, y cuándo merece la pena
                consultar.
              </p>

              <div className="mt-7 max-w-lg">
                <LandingForm />
                <p className="mt-3 font-sans text-xs text-texto-muted">
                  Sin spam. Puedes darte de baja en cualquier momento.{' '}
                  <Link href="/privacidad" className="text-terracota hover:underline">
                    Política de privacidad
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex">
                  {[
                    { bg: '#C4745A', letter: 'M' },
                    { bg: '#8FAE8B', letter: 'A' },
                    { bg: '#D4917A', letter: 'L' },
                    { bg: '#6D8D69', letter: 'S' },
                  ].map((avatar, i) => (
                    <span
                      key={avatar.letter}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-crema font-sans text-xs font-bold text-white"
                      style={{
                        background: avatar.bg,
                        marginLeft: i === 0 ? 0 : '-10px',
                      }}
                      aria-hidden="true"
                    >
                      {avatar.letter}
                    </span>
                  ))}
                </div>
                <p className="font-sans text-sm text-texto-secundario">
                  <strong className="font-semibold text-cacao">
                    +2.500 familias
                  </strong>{' '}
                  ya la han descargado
                </p>
              </div>
            </div>

            <div className="mockup-wrap flex items-center justify-center py-5">
              <PdfMockup priority />
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-5">
            <h2 className="text-balance mx-auto max-w-xl text-center font-serif text-3xl text-cacao md:text-4xl">
              ¿Te suena alguna de estas situaciones?
            </h2>
            <p className="mx-auto mb-12 mt-3 max-w-lg text-center text-lg text-texto-secundario">
              No estás sola. Miles de familias pasan por estas dudas cada
              semana.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: '"Los niños de su edad ya hablan mucho más"',
                  text: 'Te comparas con primos, compis del parque o niños de Instagram y empieza la inquietud.',
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  ),
                },
                {
                  title: '"El pediatra me dice que espere"',
                  text: 'Pero por dentro sientes que algo podrías estar haciendo ya, sin esperar a los 3 años.',
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 11.5c0 4.142-4.03 7.5-9 7.5-1.3 0-2.53-.23-3.65-.65L3 20l1.5-4.15C3.55 14.6 3 13.1 3 11.5 3 7.358 7.03 4 12 4s9 3.358 9 7.5z" />
                    </svg>
                  ),
                },
                {
                  title: '"Quiero ayudarle, pero no sé por dónde empezar"',
                  text: 'Buscas en internet y encuentras información contradictoria, alarmista o muy técnica.',
                  icon: (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 2l2.5 6 6.5.5-5 4.5L18 20l-6-3.5L6 20l2-6.5-5-4.5L9.5 8z" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="rounded-3xl bg-crema p-7"
                >
                  <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-terracota/10 p-3 text-terracota">
                    {card.icon}
                  </div>
                  <h3 className="mb-2 font-serif text-xl text-cacao">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-texto-secundario">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUDES */}
        <section className="relative overflow-hidden bg-arena py-20">
          <div className="mx-auto max-w-5xl px-5">
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-verde/15 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-verde-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-verde"></span>
                  Qué incluye la guía
                </span>
                <h2 className="text-balance font-serif text-3xl text-cacao md:text-[40px] md:leading-tight">
                  11 páginas claras, prácticas y sin alarmismos
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-texto-secundario">
                  Hemos condensado lo esencial que una familia necesita para
                  observar, acompañar y tomar decisiones con confianza.
                </p>
                <ul className="mt-7 flex flex-col gap-4">
                  {[
                    {
                      strong: 'Hitos por edad',
                      rest: '— qué esperar a los 12, 18, 24 meses y cada año hasta los 6.',
                    },
                    {
                      strong: 'Señales de alerta',
                      rest: '— cuáles son normales y cuáles merecen una consulta profesional.',
                    },
                    {
                      strong: 'Ejercicios para casa',
                      rest: '— actividades sencillas por edad, con pocos materiales y cinco minutos.',
                    },
                    {
                      strong: 'Errores comunes',
                      rest: 'que frenan el lenguaje sin que nos demos cuenta.',
                    },
                    {
                      strong: 'Cuándo consultar',
                      rest: 'a un logopeda y qué esperar de esa primera visita.',
                    },
                  ].map((item) => (
                    <li
                      key={item.strong}
                      className="flex items-start gap-3.5 text-[15.5px] leading-snug text-cacao"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-verde text-white">
                        <CheckIcon />
                      </span>
                      <span>
                        <strong className="font-semibold text-cacao">
                          {item.strong}
                        </strong>{' '}
                        <span className="text-texto-secundario">{item.rest}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mockup-wrap flex justify-center">
                <PdfMockup className="side" />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta-bg relative overflow-hidden bg-cacao py-20 text-crema md:py-24">
          <div className="relative z-10 mx-auto max-w-xl px-5 text-center">
            <h2 className="text-balance font-serif text-3xl text-crema md:text-[40px] md:leading-tight">
              Descárgala ahora y sal de dudas esta semana
            </h2>
            <p className="mt-4 text-base text-crema/75 md:text-[17px]">
              PDF de 11 páginas · Lo recibes en tu email en 1 minuto.
            </p>
            <div className="mt-7">
              <LandingForm />
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-5 font-sans text-sm text-crema/80">
              {[
                '100% gratuito',
                'Sin spam',
                'Creada por logopedas',
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <span className="text-verde-light">
                    <CheckIcon className="text-verde-light" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-cacao/5 bg-crema py-8 text-center">
          <p className="font-sans text-[13px] text-texto-muted">
            <strong className="font-semibold text-cacao">Espacio Lenguaje</strong>{' '}
            — logopedia infantil
          </p>
          <div className="mt-2 flex justify-center gap-5 font-sans text-[13px] text-texto-secundario">
            <Link href="/aviso-legal" className="hover:text-terracota">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="hover:text-terracota">
              Privacidad
            </Link>
            <Link href="/contacto" className="hover:text-terracota">
              Contacto
            </Link>
          </div>
          <p className="mt-3 font-sans text-xs text-texto-muted">
            © 2026 · Hecho con cariño para las familias que más lo necesitan
          </p>
        </footer>
      </div>
    </>
  );
}
