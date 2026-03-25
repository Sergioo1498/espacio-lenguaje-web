import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTag from "@/components/ui/SectionTag";
import LogoIcon from "@/components/icons/LogoIcon";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce Espacio Lenguaje: un equipo especializado en logopedia infantil. Recursos basados en evidencia para estimulación del lenguaje, dislexia y tartamudez.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          {/* Logo icon */}
          <div className="flex justify-center mb-6">
            <LogoIcon size={64} />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-cacao mb-4">
            Un espacio donde el lenguaje florece
          </h1>
          <p className="text-lg text-texto-secundario max-w-2xl mx-auto">
            Logopedia infantil basada en evidencia, cercanía y respeto por cada
            niño.
          </p>
        </div>
      </section>

      {/* ── Nuestra misión ── */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <SectionTag variant="terracota">Nuestra misión</SectionTag>
            <div className="mt-6 max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-texto-secundario">
                Espacio Lenguaje nace de la pasión por acompañar a cada niño en
                su camino hacia una comunicación plena. Creemos que cada peque
                tiene el potencial de expresarse, y nuestro trabajo es darle las
                herramientas para conseguirlo.
              </p>
              <p className="text-lg text-texto-secundario">
                Somos un equipo especializado en logopedia infantil: retrasos
                del lenguaje, dislexia, tartamudez y estimulación temprana.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Nuestra filosofía ── */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          <SectionTag variant="verde">Nuestra filosofía</SectionTag>
          <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-10">
            En lo que creemos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 — Evidencia científica */}
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Beaker / flask */}
                    <path
                      d="M15 6V16L8 32C7.5 33.5 8.5 35 10 35H30C31.5 35 32.5 33.5 32 32L25 16V6"
                      stroke="#C4745A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M14 6H26"
                      stroke="#C4745A"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 26H28"
                      stroke="#C4745A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                    <circle cx="17" cy="30" r="1.5" fill="#C4745A" opacity="0.6" />
                    <circle cx="23" cy="28" r="1" fill="#C4745A" opacity="0.4" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-cacao mb-2">
                  Evidencia científica
                </h3>
                <p className="text-sm text-texto-secundario">
                  Todo lo que compartimos está respaldado por investigación y
                  práctica clínica.
                </p>
              </div>
            </AnimatedSection>

            {/* Card 2 — Enfoque familiar */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* House with heart */}
                    <path
                      d="M6 20L20 8L34 20"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M10 18V33C10 34 10.5 35 12 35H28C29.5 35 30 34 30 33V18"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M20 21C18 19 15 19 15 22C15 25 20 28 20 28C20 28 25 25 25 22C25 19 22 19 20 21Z"
                      stroke="#8FAE8B"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-cacao mb-2">
                  Enfoque familiar
                </h3>
                <p className="text-sm text-texto-secundario">
                  Trabajamos con las familias porque el lenguaje se construye en
                  casa, en el día a día.
                </p>
              </div>
            </AnimatedSection>

            {/* Card 3 — Sin prisas */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Hourglass */}
                    <path
                      d="M12 6H28"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 34H28"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 6C14 6 14 14 20 20C14 26 14 34 14 34"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M26 6C26 6 26 14 20 20C26 26 26 34 26 34"
                      stroke="#8FAE8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M17 30H23"
                      stroke="#8FAE8B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-cacao mb-2">
                  Sin prisas
                </h3>
                <p className="text-sm text-texto-secundario">
                  Cada niño tiene su ritmo. Acompañamos sin presionar, celebrando
                  cada avance.
                </p>
              </div>
            </AnimatedSection>

            {/* Card 4 — Con cariño */}
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {/* Heart in hands */}
                    <path
                      d="M8 22C8 22 6 26 6 28C6 32 10 34 14 32L18 30"
                      stroke="#C4745A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M32 22C32 22 34 26 34 28C34 32 30 34 26 32L22 30"
                      stroke="#C4745A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M20 16C18 13 14 13 14 17C14 21 20 25 20 25C20 25 26 21 26 17C26 13 22 13 20 16Z"
                      stroke="#C4745A"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-cacao mb-2">
                  Con cariño
                </h3>
                <p className="text-sm text-texto-secundario">
                  Detrás de cada recurso hay horas de trabajo con un único
                  objetivo: ayudar a tu peque.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Lo que nos diferencia ── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <SectionTag>Lo que nos diferencia</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-6">
              El foco donde importa
            </h2>
            <p className="text-lg text-texto-secundario mb-8">
              No mostramos caras. En nuestros contenidos verás manos pequeñas
              trabajando, materiales de logopedia y ejercicios prácticos. Esto
              protege la privacidad de los niños y pone el foco donde importa: en
              el proceso.
            </p>

            {/* Decorative SVG — hands with speech bubble */}
            <div className="flex justify-center">
              <svg
                width="100"
                height="60"
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Left hand */}
                <path
                  d="M10 45C10 45 12 35 18 32C20 31 22 32 22 34L22 38C22 38 24 34 26 34C28 34 28 36 28 38"
                  stroke="#8FAE8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M10 45C10 45 8 48 10 50C12 52 18 52 22 50L28 46"
                  stroke="#8FAE8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Right hand */}
                <path
                  d="M90 45C90 45 88 35 82 32C80 31 78 32 78 34L78 38C78 38 76 34 74 34C72 34 72 36 72 38"
                  stroke="#8FAE8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M90 45C90 45 92 48 90 50C88 52 82 52 78 50L72 46"
                  stroke="#8FAE8B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Speech bubble */}
                <path
                  d="M38 8C38 4 42 2 50 2C58 2 62 4 62 8C62 12 58 16 50 16C50 16 48 16 46 18L44 22L44 16C40 16 38 12 38 8Z"
                  stroke="#C4745A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M44 8H56"
                  stroke="#C4745A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M46 12H54"
                  stroke="#C4745A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Cómo trabajamos ── */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <SectionTag variant="terracota">Cómo trabajamos</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-6">
              Recursos que marcan la diferencia
            </h2>
            <p className="text-lg text-texto-secundario max-w-3xl mx-auto mb-10">
              Creamos recursos descargables, artículos basados en evidencia y
              guías prácticas para familias. Todo diseñado para que puedas
              estimular el lenguaje de tu hijo desde casa, a tu ritmo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Download icon */}
              <div className="flex flex-col items-center gap-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6V26"
                    stroke="#C4745A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 20L20 26L26 20"
                    stroke="#C4745A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M8 30V32C8 33.5 9 34 10 34H30C31 34 32 33.5 32 32V30"
                    stroke="#C4745A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="text-sm font-medium text-cacao">
                  Recursos descargables
                </span>
              </div>

              {/* Book icon */}
              <div className="flex flex-col items-center gap-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8C6 8 12 6 20 8V34C12 32 6 34 6 34V8Z"
                    stroke="#8FAE8B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M34 8C34 8 28 6 20 8V34C28 32 34 34 34 34V8Z"
                    stroke="#8FAE8B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="text-sm font-medium text-cacao">
                  Artículos basados en evidencia
                </span>
              </div>

              {/* Heart icon */}
              <div className="flex flex-col items-center gap-2">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 14C17 8 10 8 10 15C10 22 20 30 20 30C20 30 30 22 30 15C30 8 23 8 20 14Z"
                    stroke="#C4745A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="text-sm font-medium text-cacao">
                  Guías para familias
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif text-cacao mb-4">
              ¿Quieres saber más?
            </h2>
            <p className="text-lg text-texto-secundario mb-8">
              Estamos aquí para ayudarte. Cuéntanos tu caso y te orientamos.
            </p>
            <Link href="/contacto" className="btn-primary">
              Escríbenos
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
