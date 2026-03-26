import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import LogoIcon from "@/components/icons/LogoIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      locale: "es_ES",
      url: `https://espaciolenguaje.com/blog/${meta.slug}`,
      siteName: "Espacio Lenguaje",
      images: meta.image ? [{ url: meta.image, width: 1200, height: 630, alt: meta.title }] : undefined,
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, meta.category);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: {
      "@type": "Organization",
      name: "Espacio Lenguaje",
      url: "https://espaciolenguaje.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Espacio Lenguaje",
      url: "https://espaciolenguaje.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://espaciolenguaje.com/blog/${meta.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="section-padding pb-0 pt-8 md:pt-12"
      >
        <div className="container-custom">
          <ol className="flex items-center gap-2 text-sm text-texto-muted">
            <li>
              <Link href="/" className="hover:text-terracota transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-terracota transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li className="text-cacao font-medium truncate max-w-[200px] md:max-w-none">
              {meta.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero image */}
      {(() => {
        const blogImages: Record<string, { src: string; alt: string }> = {
          'mi-hijo-no-habla-cuando-preocuparse': { src: '/images/blog-mi-hijo-no-habla.png', alt: 'Manos de un niño señalando un libro ilustrado' },
          'ejercicios-lenguaje-para-casa': { src: '/images/blog-ejercicios.png', alt: 'Mesa con materiales de logopedia y tarjetas' },
          'dislexia-en-ninos-como-detectarla': { src: '/images/blog-dislexia.png', alt: 'Letras de madera desordenadas sobre superficie crema' },
        };
        const img = blogImages[slug];
        return img ? (
          <div className="container-custom max-w-3xl mt-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        ) : null;
      })()}

      {/* Header */}
      <header className="section-padding pb-8 pt-6">
        <div className="container-custom max-w-3xl">
          <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            {meta.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cacao mb-4 leading-tight">
            {meta.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-texto-muted">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{meta.readingTime} de lectura</span>
          </div>
        </div>
      </header>

      {/* Content + Sidebar */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article */}
            <article className="flex-1 max-w-3xl">
              <div className="prose-article">
                <MDXRemote source={content} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="bg-cacao rounded-2xl p-8 text-white">
                  <div className="mb-4 flex justify-center opacity-60">
                    <LogoIcon size={40} className="brightness-0 invert" />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-wider text-white/70 mb-2">
                    Recurso gratuito
                  </p>
                  <h3 className="font-serif text-2xl mb-3">
                    Guía gratuita
                  </h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Descarga nuestra guía con ejercicios y actividades para
                    estimular el lenguaje de tu peque en casa.
                  </p>
                  <Link href="/#lead-magnet" className="btn-primary w-full text-center">
                    Descargar guía
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="container-custom px-6 md:px-8">
        <hr className="border-arena" />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-serif text-cacao mb-8">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="bg-arena py-10 flex items-center justify-center">
                    <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-cacao mb-2 group-hover:text-terracota transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-texto-secundario text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-texto-muted">
                      <time dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      <span>{post.readingTime} de lectura</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-terracota section-padding">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
            ¿Te ha resultado útil?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Descarga nuestra guía gratuita con más ejercicios y recursos para
            estimular el lenguaje de tu peque.
          </p>
          <Link
            href="/#lead-magnet"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-terracota font-sans font-medium rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Descargar guía gratuita
          </Link>
        </div>
      </section>
    </>
  );
}
