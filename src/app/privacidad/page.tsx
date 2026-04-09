import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Espacio Lenguaje. Información sobre el tratamiento de datos personales, derechos del usuario y política de cookies.",
  alternates: { canonical: "https://www.espaciolenguaje.com/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif text-cacao mb-10">
          Política de Privacidad
        </h1>

        <div className="space-y-10">
          {/* Responsable del tratamiento */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Responsable del tratamiento
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-cacao">Identidad:</strong>{" "}
                  Espacio Lenguaje
                </li>
                <li>
                  <strong className="text-cacao">NIF/CIF:</strong>{" "}
                  Pendiente de registro
                </li>
                <li>
                  <strong className="text-cacao">Dirección:</strong>{" "}
                  Madrid, España
                </li>
                <li>
                  <strong className="text-cacao">Correo electrónico:</strong>{" "}
                  hola@espaciolenguaje.com
                </li>
              </ul>
            </div>
          </div>

          {/* Finalidad del tratamiento */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Finalidad del tratamiento
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Los datos personales que nos facilites a través de los
                formularios de este sitio web serán tratados con las siguientes
                finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Gestionar el envío de la información o recurso solicitado.
                </li>
                <li>
                  Enviar comunicaciones comerciales y newsletters, siempre que
                  hayas dado tu consentimiento expreso.
                </li>
                <li>
                  Responder a consultas realizadas a través del formulario de
                  contacto.
                </li>
              </ul>
            </div>
          </div>

          {/* Legitimación */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Legitimación
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                La base legal para el tratamiento de tus datos es el
                consentimiento del usuario, obtenido mediante la aceptación
                expresa de esta política de privacidad al enviar tus datos a
                través de nuestros formularios.
              </p>
            </div>
          </div>

          {/* Destinatarios */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Destinatarios
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Tus datos no serán cedidos a terceros, salvo obligación legal.
                Podrán tener acceso a tus datos los prestadores de servicios
                que actúen como encargados de tratamiento (por ejemplo, la
                plataforma de email marketing utilizada para el envío de
                newsletters).
              </p>
            </div>
          </div>

          {/* Derechos del usuario */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Derechos del usuario
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>Como usuario, tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Acceder a tus datos personales.</li>
                <li>
                  Solicitar la rectificación de los datos inexactos.
                </li>
                <li>Solicitar la supresión de tus datos.</li>
                <li>
                  Solicitar la limitación del tratamiento de tus datos.
                </li>
                <li>Oponerte al tratamiento de tus datos.</li>
                <li>Solicitar la portabilidad de tus datos.</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, puedes enviarnos un
                correo electrónico a hola@espaciolenguaje.com indicando el
                derecho que deseas ejercer y adjuntando copia de tu documento
                de identidad.
              </p>
            </div>
          </div>

          {/* Periodo de conservación */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Periodo de conservación
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Los datos personales proporcionados se conservarán mientras se
                mantenga la relación contractual, no se solicite su supresión
                por el interesado y no deban eliminarse por ser necesarios para
                el cumplimiento de una obligación legal.
              </p>
            </div>
          </div>

          {/* Terceros y encargados del tratamiento */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Terceros y encargados del tratamiento
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Para la prestación de nuestros servicios, trabajamos con los
                siguientes proveedores que pueden acceder a tus datos personales
                como encargados del tratamiento:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-cacao">Stripe, Inc.</strong> — Pasarela
                  de pago para procesar transacciones con tarjeta. Stripe actúa
                  como encargado del tratamiento de los datos de pago. Política
                  de privacidad:{" "}
                  <a href="https://stripe.com/es/privacy" target="_blank" rel="noopener noreferrer" className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota">
                    stripe.com/privacy
                  </a>
                </li>
                <li>
                  <strong className="text-cacao">Brevo (Sendinblue)</strong> —
                  Plataforma de email marketing para enviar correos
                  transaccionales y newsletters. Almacena tu dirección de email
                  y gestiona el envío de comunicaciones. Política de privacidad:{" "}
                  <a href="https://www.brevo.com/es/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota">
                    brevo.com/privacy
                  </a>
                </li>
                <li>
                  <strong className="text-cacao">Vercel, Inc.</strong> —
                  Plataforma de alojamiento web. Utilizamos Vercel Analytics y
                  Vercel Speed Insights para recopilar datos anónimos de
                  rendimiento y uso del sitio. No se recopilan datos personales
                  identificativos a través de estas herramientas. Política de
                  privacidad:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota">
                    vercel.com/privacy
                  </a>
                </li>
                <li>
                  <strong className="text-cacao">Amazon EU S.à r.l.</strong> —
                  Programa de afiliados. Algunos enlaces de la página de
                  recomendaciones son enlaces de afiliado. Amazon puede utilizar
                  cookies para rastrear las compras realizadas a través de estos
                  enlaces.
                </li>
              </ul>
            </div>
          </div>

          {/* Política de cookies */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif text-cacao mb-4">
              Política de cookies
            </h2>
            <div className="text-texto-secundario leading-relaxed space-y-3">
              <p>
                Este sitio web utiliza cookies. Para obtener información
                detallada sobre las cookies que utilizamos y cómo gestionarlas,
                consulta nuestra{" "}
                <Link
                  href="/cookies"
                  className="text-terracota underline decoration-terracota/30 underline-offset-2 hover:decoration-terracota transition-colors"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
