import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de Espacio Lenguaje. Información sobre los tipos de cookies que utilizamos y cómo gestionarlas.",
};

export default function CookiesPage() {
  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-cacao mb-10">
          Política de Cookies
        </h1>

        <div className="space-y-10">
          {/* ¿Qué son las cookies? */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              ¿Qué son las cookies?
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Las cookies son pequeños archivos de texto que los sitios web
                instalan en el navegador del usuario. Sirven para almacenar
                información sobre tu visita, como tus preferencias de idioma,
                el contenido de tu carrito de compra o tu nombre de usuario, con
                el objetivo de mejorar tu experiencia de navegación.
              </p>
            </div>
          </div>

          {/* Tipos de cookies que utilizamos */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Tipos de cookies que utilizamos
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                A continuación, se detallan los tipos de cookies que puede
                utilizar este sitio web:
              </p>
            </div>
          </div>

          {/* Cookies técnicas */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Cookies técnicas
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Son aquellas que permiten al usuario la navegación a través del
                sitio web y la utilización de las diferentes opciones o
                servicios que en él existen, como por ejemplo controlar el
                tráfico y la comunicación de datos, identificar la sesión o
                acceder a partes de acceso restringido.
              </p>
            </div>
          </div>

          {/* Cookies analíticas */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Cookies analíticas
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Son aquellas que nos permiten cuantificar el número de usuarios
                y así realizar la medición y análisis estadístico de la
                utilización que hacen los usuarios del sitio web.
              </p>
              <p>
                [COMPLETAR: Indicar si se utiliza Google Analytics u otra
                herramienta de analítica, el nombre de las cookies, su
                finalidad, la duración y si son propias o de terceros.]
              </p>
            </div>
          </div>

          {/* Cómo gestionar las cookies */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Cómo gestionar las cookies
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Puedes permitir, bloquear o eliminar las cookies instaladas en
                tu equipo mediante la configuración de las opciones del
                navegador que utilizas. A continuación, te indicamos los
                enlaces con la información para gestionar las cookies en los
                principales navegadores:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota transition-colors"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota transition-colors"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota transition-colors"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota transition-colors"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p>
                Ten en cuenta que si desactivas las cookies, es posible que
                algunas funcionalidades del sitio web no estén disponibles.
              </p>
            </div>
          </div>

          {/* Más información */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Más información
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Si tienes cualquier duda o consulta sobre esta Política de
                Cookies, puedes contactar con nosotros a través de nuestro
                correo electrónico: hola@espaciolenguaje.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
