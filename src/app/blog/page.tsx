import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre logopedia infantil, estimulación del lenguaje, dislexia, ejercicios prácticos y señales de alerta. Recursos para familias y profesionales.",
};

const categories = [
  "Todos",
  "Señales de alerta",
  "Ejercicios",
  "Dislexia",
  "Estimulación",
  "Desarrollo del lenguaje",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            {/* Decorative pencil with sound waves SVG */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="12"
                y="16"
                width="8"
                height="32"
                rx="2"
                fill="#C8705A"
                transform="rotate(-15 12 16)"
              />
              <rect
                x="14"
                y="18"
                width="4"
                height="6"
                rx="1"
                fill="#E8956E"
                transform="rotate(-15 14 18)"
              />
              <polygon
                points="16,48 20,48 18,54"
                fill="#C8705A"
                transform="rotate(-15 18 50)"
              />
              <path
                d="M36 24 C40 24, 42 20, 42 16"
                stroke="#7BAE7F"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M40 28 C46 28, 49 22, 49 16"
                stroke="#7BAE7F"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M44 32 C52 32, 56 24, 56 16"
                stroke="#7BAE7F"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-cacao mb-4">
            Blog de Espacio Lenguaje
          </h1>
          <p className="text-lg text-texto-secundario max-w-2xl mx-auto">
            Artículos, guías y recursos sobre logopedia infantil para
            acompañarte en el desarrollo del lenguaje de tu peque.
          </p>
        </div>
      </section>

      {/* Category filter */}
      {/* TODO: Client-side filtering can be added later with a "use client" wrapper component */}
      <section className="py-8 px-6 md:px-8">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? "bg-terracota text-white"
                    : "border-2 border-cacao/20 text-cacao hover:border-terracota hover:text-terracota"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="section-padding pt-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card top area */}
                <div className="bg-arena py-12 flex items-center justify-center">
                  <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h2 className="font-serif text-xl text-cacao mb-2 group-hover:text-terracota transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-texto-secundario text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-texto-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime} de lectura</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-texto-secundario py-16">
              Pronto publicaremos nuevos artículos. ¡Vuelve a visitarnos!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
