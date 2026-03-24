import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding flex min-h-[70vh] items-center justify-center bg-white">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative speech bubble with "?" */}
        <svg
          className="mx-auto mb-8 h-32 w-32"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M64 8C33.1 8 8 28.6 8 54c0 14.2 7.8 26.9 20 35.4V104l14.2-7.8C48.8 98 56.2 100 64 100c30.9 0 56-20.6 56-46S94.9 8 64 8Z"
            fill="#C8553D"
            opacity="0.12"
          />
          <path
            d="M64 12C35.3 12 12 30.8 12 54c0 13 7 24.8 18 32.8V100l12.5-6.9C49 95 56.3 97 64 97c28.7 0 52-18.8 52-43S92.7 12 64 12Z"
            stroke="#C8553D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="64"
            y="66"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#5B8C5A"
            fontFamily="serif"
            fontSize="40"
            fontWeight="bold"
          >
            ?
          </text>
        </svg>

        <h1 className="font-serif text-4xl text-cacao md:text-5xl">
          P&aacute;gina no encontrada
        </h1>

        <p className="mt-4 font-sans text-lg text-texto-secundario">
          Lo sentimos, la p&aacute;gina que buscas no existe o ha sido movida.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/blog" className="btn-outline">
            Ir al blog
          </Link>
        </div>
      </div>
    </section>
  );
}
