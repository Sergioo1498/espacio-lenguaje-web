import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal de Espacio Lenguaje. Información sobre datos identificativos, condiciones de uso, propiedad intelectual y limitación de responsabilidad.",
  alternates: { canonical: "https://www.espaciolenguaje.com/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-cacao mb-10">
          Aviso Legal
        </h1>

        <div className="space-y-10">
          {/* Datos identificativos */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Datos identificativos
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                En cumplimiento con el deber de información recogido en el
                artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
                la Sociedad de la Información y del Comercio Electrónico
                (LSSICE), a continuación se reflejan los siguientes datos:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-cacao">Titular:</strong>{" "}
                  Espacio Lenguaje
                </li>
                <li>
                  <strong className="text-cacao">NIF/CIF:</strong>{" "}
                  Pendiente de registro
                </li>
                <li>
                  <strong className="text-cacao">Domicilio:</strong>{" "}
                  Madrid, España
                </li>
                <li>
                  <strong className="text-cacao">Correo electrónico:</strong>{" "}
                  hola@espaciolenguaje.com
                </li>
                <li>
                  <strong className="text-cacao">Sitio web:</strong>{" "}
                  espaciolenguaje.com
                </li>
              </ul>
            </div>
          </div>

          {/* Condiciones de uso */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Condiciones de uso
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                El acceso y uso de este sitio web atribuye la condición de
                usuario e implica la aceptación plena y sin reservas de todas y
                cada una de las disposiciones incluidas en este Aviso Legal.
              </p>
              <p>
                El usuario se compromete a hacer un uso adecuado de los
                contenidos y servicios que se ofrecen a través de este sitio web
                y a no emplearlos para realizar actividades ilícitas o
                contrarias a la buena fe y al ordenamiento legal.
              </p>
            </div>
          </div>

          {/* Propiedad intelectual */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Propiedad intelectual
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Todos los contenidos de este sitio web, incluyendo textos,
                fotografías, gráficos, imágenes, iconos, tecnología, software,
                enlaces y demás contenidos audiovisuales o sonoros, así como su
                diseño gráfico y códigos fuente, son propiedad intelectual de
                Espacio Lenguaje o de terceros, sin que puedan entenderse
                cedidos al usuario ninguno de los derechos de explotación
                reconocidos por la normativa vigente.
              </p>
              <p>
                Queda prohibida la reproducción, transformación, distribución,
                comunicación pública, puesta a disposición del público y, en
                general, cualquier otra forma de explotación, parcial o total,
                de los elementos referidos en el párrafo anterior.
              </p>
            </div>
          </div>

          {/* Limitación de responsabilidad */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Limitación de responsabilidad
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Espacio Lenguaje no se hace responsable de los daños y
                perjuicios de cualquier naturaleza que pudieran derivarse del
                uso de este sitio web, incluyendo, sin limitación, errores u
                omisiones en los contenidos, falta de disponibilidad del sitio
                web o la transmisión de virus o programas maliciosos.
              </p>
              <p>
                La información contenida en este sitio web es de carácter
                general e informativo y no sustituye en ningún caso la consulta
                con un profesional cualificado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
