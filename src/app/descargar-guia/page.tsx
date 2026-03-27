import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Descarga tu guía gratuita",
  robots: { index: false, follow: false },
};

const blogImages: Record<string, string> = {
  "etapas-desarrollo-del-lenguaje": "/images/blog-etapas-desarrollo.png",
  "estimulacion-del-lenguaje-en-casa": "/images/blog-estimulacion.png",
  "mi-hijo-no-habla-cuando-preocuparse": "/images/blog-mi-hijo-no-habla.png",
};

export default function DescargarGuiaPage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="section-padding bg-arena">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-3xl md:text-4xl font-serif text-cacao mb-4">
            ¡Gracias! Tu guía está lista
          </h1>
          <p className="text-lg text-texto-secundario mb-8">
            Haz clic en el botón para descargar tu guía de Hitos del Lenguaje de 0 a 6 años.
          </p>
          <a
            href="/downloads/guia-hitos-lenguaje-espacio-lenguaje.pdf"
            download
            className="btn-primary text-lg px-10 py-4 touch-manipulation"
          >
            Descargar guía (PDF)
          </a>
          <p className="mt-6 text-sm text-texto-muted">
            También te la hemos enviado a tu email.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-serif text-cacao mb-8 text-center">
            Mientras tanto, puede interesarte:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  {blogImages[post.slug] ? (
                    <Image
                      src={blogImages[post.slug]}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-arena" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base text-cacao group-hover:text-terracota transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
