import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogFilterGrid from "@/components/sections/BlogFilterGrid";

export const metadata: Metadata = {
  title: "Blog de Logopedia Infantil",
  description:
    "Artículos sobre desarrollo del lenguaje, señales de alerta, ejercicios de logopedia para niños, dislexia y estimulación del habla. Información basada en evidencia para familias.",
  alternates: { canonical: "https://www.espaciolenguaje.com/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="12" y="16" width="8" height="32" rx="2" fill="#C8705A" transform="rotate(-15 12 16)" />
              <rect x="14" y="18" width="4" height="6" rx="1" fill="#E8956E" transform="rotate(-15 14 18)" />
              <polygon points="16,48 20,48 18,54" fill="#C8705A" transform="rotate(-15 18 50)" />
              <path d="M36 24 C40 24, 42 20, 42 16" stroke="#7BAE7F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M40 28 C46 28, 49 22, 49 16" stroke="#7BAE7F" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
              <path d="M44 32 C52 32, 56 24, 56 16" stroke="#7BAE7F" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
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

      <BlogFilterGrid posts={posts} />
    </>
  );
}
