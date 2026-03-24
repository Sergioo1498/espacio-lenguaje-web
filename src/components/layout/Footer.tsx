import Logo from "@/components/icons/Logo";

const contenidoLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Recursos", href: "#servicios" },
  { label: "Guías gratuitas", href: "#lead-magnet" },
];

const infoLinks = [
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "mailto:hola@espaciolenguaje.com" },
];

const legalLinks = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-sans text-sm text-white/70 transition-colors duration-200 hover:text-terracota-light"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-cacao">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              {/* Logo with white text override */}
              <div className="[&_span]:!text-white">
                <Logo showText />
              </div>
            </div>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-white/70">
              Donde cada peque encuentra su voz. Recursos y acompañamiento
              profesional en logopedia infantil.
            </p>

            {/* Instagram */}
            <a
              href="https://instagram.com/espaciolenguaje"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-sans text-sm text-white/70 transition-colors duration-200 hover:text-terracota-light"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              @espaciolenguaje
            </a>
          </div>

          {/* Link columns */}
          <FooterLinkColumn title="Contenido" links={contenidoLinks} />
          <FooterLinkColumn title="Información" links={infoLinks} />
          <FooterLinkColumn title="Legal" links={legalLinks} />
        </div>

        {/* Separator */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 font-sans text-xs text-white/50 sm:flex-row">
          <p>&copy; 2026 Espacio Lenguaje</p>
          <p>Hecho con cariño para las familias que más lo necesitan</p>
        </div>
      </div>
    </footer>
  );
}
