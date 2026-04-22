import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTag from "@/components/ui/SectionTag";
import Logo from "@/components/icons/Logo";
import { defaultAuthor, hasPendingCredentials } from "@/lib/team";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Equipo editorial y metodología | Espacio Lenguaje",
  description:
    "Contenido clínico de Espacio Lenguaje supervisado por logopeda colegiada. Seguimos guías oficiales (GAT, AEP, DSM-5) y un proceso editorial con revisión profesional fechada en cada artículo.",
  alternates: { canonical: "https://www.espaciolenguaje.com/sobre-nosotros" },
  openGraph: {
    title: "Sobre Nosotros — Equipo editorial de Espacio Lenguaje",
    description:
      "Logopedia infantil basada en evidencia. Contenido supervisado por logopeda colegiada siguiendo guías oficiales.",
    url: "https://www.espaciolenguaje.com/sobre-nosotros",
    type: "website",
  },
};

export default function SobreNosotrosPage() {
  const lead = defaultAuthor();
  const pendingData = hasPendingCredentials(lead);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": lead.profileUrl,
    name: lead.publicName,
    jobTitle: lead.jobTitle,
    url: lead.profileUrl,
    alumniOf: lead.degrees.map((d) => ({
      "@type": "EducationalOrganization",
      name: d.institution,
    })),
    memberOf: {
      "@type": "Organization",
      name: lead.collegeName,
      url: lead.collegeUrl,
    },
    knowsAbout: lead.specialties,
    worksFor: {
      "@type": "Organization",
      name: "Espacio Lenguaje",
      url: "https://www.espaciolenguaje.com",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.espaciolenguaje.com/#organization",
    name: "Espacio Lenguaje",
    url: "https://www.espaciolenguaje.com",
    logo: "https://www.espaciolenguaje.com/images/logo-chosen.png",
    description:
      "Proyecto de divulgación clínica sobre logopedia infantil, con contenido supervisado por logopeda colegiada.",
    founder: personSchema,
    areaServed: { "@type": "Country", name: "España" },
    knowsLanguage: "es",
    sameAs: [
      "https://www.instagram.com/espaciolenguaje",
    ],
  };

  const sources = [
    {
      name: "Libro Blanco de la Atención Temprana (GAT)",
      url: "https://www.sld.cu/galerias/pdf/sitios/rehabilitacion-temprana/libro_blanco.pdf",
      role: "Marco de referencia en intervención en 0-6 años.",
    },
    {
      name: "Asociación Española de Pediatría (AEP)",
      url: "https://www.aeped.es/",
      role: "Guías oficiales de seguimiento del desarrollo y patología pediátrica.",
    },
    {
      name: "DSM-5 (American Psychiatric Association)",
      url: "https://www.psychiatry.org/psychiatrists/practice/dsm",
      role: "Criterios diagnósticos de trastornos del neurodesarrollo y comunicación.",
    },
    {
      name: "ASHA — American Speech-Language-Hearing Association",
      url: "https://www.asha.org/",
      role: "Evidencia clínica internacional en logopedia y trastornos del lenguaje.",
    },
    {
      name: "Plena Inclusión",
      url: "https://www.plenainclusion.org/",
      role: "Recursos sobre lenguaje accesible e inclusión de personas con discapacidad intelectual.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ── Hero ── */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <Logo showText={false} size={80} />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-cacao mb-4">
            El equipo editorial detrás de Espacio Lenguaje
          </h1>
          <p className="text-lg text-texto-secundario max-w-2xl mx-auto mb-10">
            Contenido clínico revisado por logopeda colegiada. Metodología
            editorial transparente, basada en guías oficiales del sector.
          </p>

          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/section-about.png"
              alt="Materiales y recursos clínicos de logopedia infantil sobre mesa de madera"
              width={1200}
              height={400}
              className="w-full h-auto max-h-[400px] object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Quién está detrás ── */}
      <section id="logopeda-principal" className="section-padding scroll-mt-24">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <SectionTag variant="terracota">Quién revisa el contenido</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-8">
              Una logopeda colegiada detrás de cada artículo
            </h2>

            <div className="rounded-2xl bg-arena/50 p-6 md:p-10">
              <h3 className="font-serif text-2xl text-cacao mb-4">
                {lead.publicName}
              </h3>
              <p className="text-texto-secundario mb-6 leading-relaxed">
                {lead.jobTitle}. Todo el contenido clínico publicado se escribe
                o revisa aquí antes de llegar a ti.
              </p>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                <div>
                  <dt className="font-medium text-cacao">Colegiación profesional</dt>
                  <dd className="text-texto-secundario">
                    {pendingData ? (
                      <span className="italic">Colegio profesional pendiente de publicar.</span>
                    ) : (
                      <>
                        Colegiada en el{" "}
                        <a
                          href={lead.collegeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-terracota"
                        >
                          {lead.collegeName}
                        </a>
                        .
                      </>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="font-medium text-cacao">Formación académica</dt>
                  <dd className="text-texto-secundario">
                    {lead.degrees.map((d) => (
                      <div key={d.title + d.institution}>
                        {d.title}
                        {!d.institution.includes("[X]") && (
                          <>
                            {" · "}
                            {d.institution}
                            {d.year > 0 && `, ${d.year}`}
                          </>
                        )}
                      </div>
                    ))}
                  </dd>
                </div>

                {lead.yearsOfExperience && lead.yearsOfExperience > 0 ? (
                  <div>
                    <dt className="font-medium text-cacao">Experiencia clínica</dt>
                    <dd className="text-texto-secundario">
                      {lead.yearsOfExperience} años en{" "}
                      {lead.sectors.join(", ").toLowerCase()}.
                    </dd>
                  </div>
                ) : null}

                <div>
                  <dt className="font-medium text-cacao">Áreas de trabajo</dt>
                  <dd className="text-texto-secundario">
                    {lead.specialties.join(" · ")}.
                  </dd>
                </div>
              </dl>

              <p className="mt-8 text-sm text-texto-muted border-t border-cacao/10 pt-6">
                <strong className="text-cacao">¿Por qué no mostramos nombres, caras ni números de colegiación?</strong>{" "}
                La divulgación pública en internet tiene una responsabilidad
                legal y profesional distinta a la consulta clínica individual.
                Optamos por comunicar nuestras titulaciones y colegiación a
                nivel institucional —lo que te permite verificar la coherencia
                de la formación que hay detrás—, manteniendo al mismo tiempo
                la privacidad del equipo y la de los niños que aparecen en
                nuestros materiales. Si en algún momento necesitas una
                valoración personalizada, busca un profesional colegiado en
                tu ciudad: cada caso requiere evaluación individual.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Metodología editorial ── */}
      <section id="metodologia" className="bg-arena section-padding scroll-mt-24">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <SectionTag variant="verde">Metodología editorial</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-6">
              Cómo escribimos y revisamos cada artículo
            </h2>
            <p className="text-lg text-texto-secundario mb-10">
              Ninguna afirmación clínica sale publicada sin fuente detrás.
              Cada post pasa por el siguiente proceso antes de aparecer en el blog:
            </p>

            <ol className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Investigación con fuentes primarias",
                  body: "Revisamos guías clínicas oficiales (GAT, AEP, DSM-5, ASHA) y literatura especializada antes de redactar. No escribimos desde opiniones: escribimos desde evidencia.",
                },
                {
                  step: "2",
                  title: "Redacción orientada a familias",
                  body: "Traducimos el conocimiento clínico a un lenguaje que cualquier madre o padre pueda aplicar en casa, sin perder rigor. Si un término técnico es necesario, lo explicamos.",
                },
                {
                  step: "3",
                  title: "Revisión profesional",
                  body: "Cada artículo se revisa por logopeda colegiada antes de publicar. La fecha de publicación y de última revisión aparecen al final de cada post.",
                },
                {
                  step: "4",
                  title: "Actualización periódica",
                  body: "Los posts se revisan cuando hay novedades clínicas relevantes o al menos una vez al año. La fecha de actualización se refleja en el artículo y en el schema estructurado que lee Google.",
                },
                {
                  step: "5",
                  title: "Puerta abierta al feedback",
                  body: "Si una familia o profesional detecta algo que pueda mejorarse, nos lo dice y lo corregimos. No somos infalibles y lo asumimos públicamente.",
                },
              ].map((s) => (
                <li key={s.step} className="flex gap-5">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota text-white font-serif text-lg flex items-center justify-center">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-cacao mb-1">{s.title}</h3>
                    <p className="text-texto-secundario leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Guías y fuentes ── */}
      <section id="fuentes" className="section-padding scroll-mt-24">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <SectionTag>Guías y fuentes que seguimos</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-6">
              Fuentes públicas que puedes consultar
            </h2>
            <p className="text-lg text-texto-secundario mb-10">
              Estas son las referencias profesionales que usamos como columna
              vertebral del contenido. Todas están accesibles públicamente:
            </p>

            <ul className="space-y-4">
              {sources.map((src) => (
                <li key={src.url} className="border-l-4 border-verde/40 pl-5 py-2">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg text-cacao hover:text-terracota transition-colors"
                  >
                    {src.name} ↗
                  </a>
                  <p className="text-sm text-texto-secundario mt-1">{src.role}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-texto-muted">
              Además, en los artículos que tratan temas clínicos concretos
              incluimos las referencias específicas que hemos consultado
              (estudios, manuales o guías de colegios profesionales).
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Principios editoriales ── */}
      <section className="bg-arena section-padding">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <SectionTag variant="verde">En lo que creemos</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-10">
              Cuatro principios que guían cada decisión editorial
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Evidencia antes que opinión",
                  body: "Si no hay fuente sólida (guía oficial, estudio revisado, manual profesional), no lo publicamos. Aunque retrase un artículo.",
                },
                {
                  title: "Familiar y aplicable",
                  body: "El lenguaje se trabaja en casa, en el día a día. Cada recurso busca que una madre o padre pueda usarlo sin necesidad de formación previa.",
                },
                {
                  title: "Respeto al ritmo de cada niño",
                  body: "Evitamos el tono alarmista. Damos señales objetivas sobre cuándo consultar y cuándo esperar, sin inducir ansiedad innecesaria.",
                },
                {
                  title: "Honestidad sobre lo que no sabemos",
                  body: "Cuando un tema no tiene consenso clínico, lo decimos claramente. Preferimos una respuesta matizada a una certeza falsa.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="font-serif text-xl text-cacao mb-2">{p.title}</h3>
                  <p className="text-sm text-texto-secundario leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Transparencia ── */}
      <section id="transparencia" className="section-padding scroll-mt-24">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <SectionTag variant="terracota">Política de transparencia</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif text-cacao mt-4 mb-6">
              Lo que puedes comprobar en cada artículo
            </h2>
            <ul className="space-y-3 text-texto-secundario">
              <li>
                <strong className="text-cacao">Fecha de publicación</strong> y{" "}
                <strong className="text-cacao">última revisión</strong> visibles
                al final de cada post.
              </li>
              <li>
                <strong className="text-cacao">Autoría y revisión profesional</strong>{" "}
                indicadas explícitamente en cada artículo.
              </li>
              <li>
                <strong className="text-cacao">Número de colegiación</strong>{" "}
                verificable en el directorio público del colegio profesional.
              </li>
              <li>
                <strong className="text-cacao">Datos estructurados (schema.org)</strong>{" "}
                que comunican a Google quién escribe, quién revisa y cuándo se
                actualizó cada contenido — del mismo modo que cualquier medio
                profesional serio.
              </li>
              <li>
                <strong className="text-cacao">Correcciones a la vista</strong>:
                si encuentras un error, escríbenos y lo corregimos con
                transparencia. El histórico editorial se conserva.
              </li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-cacao section-padding">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif text-white mb-4">
              ¿Tienes dudas sobre un contenido?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Escríbenos si quieres verificar una referencia, sugerir un tema o
              reportar algo que pueda mejorarse. Respondemos en persona.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-cacao font-sans font-medium rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Escríbenos
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
