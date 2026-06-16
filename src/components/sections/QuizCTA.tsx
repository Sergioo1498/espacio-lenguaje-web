import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function QuizCTA() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-custom">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl rounded-3xl border-2 border-terracota/20 bg-gradient-to-br from-arena/40 via-white to-terracota/5 p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-terracota/10 flex items-center justify-center text-3xl md:text-4xl">
                🧩
              </div>
              <div className="flex-1">
                <span className="inline-block bg-verde/15 text-verde-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  Test gratuito · 2 minutos
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-cacao mb-2 leading-tight">
                  ¿Necesita mi peque consulta con logopeda?
                </h2>
                <p className="text-texto-secundario text-sm md:text-base leading-relaxed">
                  7 preguntas adaptadas a la edad de tu peque, basadas en hitos clínicos (GAT, AEP, Bosch 2004). Resultado interpretado al instante — sin diagnóstico, solo orientación.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <Link
                  href="/quiz/necesita-logopeda"
                  className="inline-flex w-full md:w-auto items-center justify-center rounded-pill bg-terracota hover:bg-terracota-dark text-white px-6 md:px-8 py-3 md:py-4 font-semibold transition-all hover:scale-[1.02] whitespace-nowrap"
                >
                  Empezar test →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
