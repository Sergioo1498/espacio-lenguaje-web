import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";
import LogoIcon from "@/components/icons/LogoIcon";
import ShareButtons from "@/components/ui/ShareButtons";

const blogImages: Record<string, { src: string; alt: string }> = {
  "mi-hijo-no-habla-cuando-preocuparse": { src: "/images/blog-mi-hijo-no-habla.png", alt: "Manos de un niño señalando un libro ilustrado" },
  "ejercicios-lenguaje-para-casa": { src: "/images/blog-ejercicios.png", alt: "Mesa con materiales de logopedia y tarjetas" },
  "dislexia-en-ninos-como-detectarla": { src: "/images/blog-dislexia.png", alt: "Letras de madera desordenadas sobre superficie crema" },
  "estimulacion-del-lenguaje-en-casa": { src: "/images/blog-estimulacion.png", alt: "Manos de padre e hijo con materiales de estimulación del lenguaje" },
  "juegos-para-estimular-el-habla": { src: "/images/blog-juegos-habla.png", alt: "Juegos de logopedia infantil sobre una mesa" },
  "etapas-desarrollo-del-lenguaje": { src: "/images/blog-etapas-desarrollo.png", alt: "Bloques de letras y libro abierto simbolizando etapas del lenguaje" },
  "bilinguismo-infantil-mitos-y-realidades": { src: "/images/blog-bilinguismo.png", alt: "Libros infantiles en dos idiomas con banderitas" },
  "ejercicios-de-soplo-para-ninos": { src: "/images/blog-ejercicios-soplo.png", alt: "Ejercicios de soplo para niños con plumas y pompas" },
  "a-que-edad-debe-hablar-un-nino": { src: "/images/blog-edad-hablar.png", alt: "Manos de niño con bloques de letras y hitos del habla" },
  "tartamudez-infantil-cuando-preocuparse": { src: "/images/blog-tartamudez.png", alt: "Manos de niño con burbuja de diálogo y tarjetas" },
  "como-ensenar-la-r-a-un-nino": { src: "/images/blog-ensenar-r.png", alt: "Letra R de madera con materiales de articulación" },
  "fichas-logopedia-gratis-imprimir": { src: "/images/blog-fichas-logopedia.jpg", alt: "Fichas de logopedia infantil imprimibles sobre mesa de madera" },
  "praxias-bucofaciales-ninos": { src: "/images/blog-praxias.jpg", alt: "Espejo y materiales para praxias bucofaciales infantiles" },
  "conciencia-fonologica-actividades": { src: "/images/blog-conciencia-fonologica.jpg", alt: "Letras y tarjetas de sílabas para trabajar la conciencia fonológica" },
  "tel-trastorno-especifico-lenguaje": { src: "/images/blog-tel.jpg", alt: "Cuaderno de evaluación con materiales sobre trastorno específico del lenguaje" },
  "actividades-ninos-2-anos-lenguaje": { src: "/images/blog-actividades-2-anos.jpg", alt: "Juguetes y materiales para estimular el lenguaje en niños de 2 años" },
  "vocabulario-ninos-como-ampliar": { src: "/images/blog-vocabulario.jpg", alt: "Diccionario infantil con tarjetas de vocabulario para niños" },
  "atencion-temprana-que-es": { src: "/images/blog-atencion-temprana.jpg", alt: "Materiales clínicos para atención temprana infantil" },
  "mi-hijo-de-3-anos-no-habla-bien": { src: "/images/blog-3-anos-no-habla.jpg", alt: "Manos de niño de 3 años con bloques numéricos y tarjetas" },
  "ejercicios-para-la-r-fuerte": { src: "/images/blog-r-fuerte.jpg", alt: "Espejo de logopedia con letra R y materiales para trabajar la vibración lingual" },
  "frenillo-lingual-sintomas": { src: "/images/blog-frenillo.jpg", alt: "Materiales de evaluación oral: espejo y depresores linguales sobre superficie crema" },
  "logopedia-online-como-funciona": { src: "/images/blog-logopedia-online.jpg", alt: "Portátil con sesión de logopedia online y cuaderno de anotaciones" },
  "dislalia-infantil-tipos": { src: "/images/blog-dislalia.jpg", alt: "Tarjetas de articulación con los fonemas R, S, L sobre mesa de madera" },
};

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
  const img = blogImages[slug] || (meta.image ? { src: meta.image } : null);
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: {
      canonical: `https://www.espaciolenguaje.com/blog/${meta.slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      locale: "es_ES",
      url: `https://www.espaciolenguaje.com/blog/${meta.slug}`,
      siteName: "Espacio Lenguaje",
      images: img ? [{ url: img.src, width: 1200, height: 630, alt: meta.title }] : undefined,
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
  const heroImg = blogImages[slug] || (meta.image ? { src: meta.image, alt: meta.title } : null);
  const articleUrl = `https://www.espaciolenguaje.com/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    dateModified: meta.updatedAt || meta.date,
    inLanguage: "es-ES",
    image: heroImg?.src ? `https://www.espaciolenguaje.com${heroImg.src}` : undefined,
    author: {
      "@type": "Organization",
      name: "Espacio Lenguaje",
      url: "https://www.espaciolenguaje.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Espacio Lenguaje",
      url: "https://www.espaciolenguaje.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.espaciolenguaje.com/images/logo-chosen.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.espaciolenguaje.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.espaciolenguaje.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="section-padding pb-0 pt-8 md:pt-12">
        <div className="container-custom">
          <ol className="flex items-center gap-2 text-sm text-texto-muted">
            <li>
              <Link href="/" className="hover:text-terracota transition-colors">Inicio</Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li>
              <Link href="/blog" className="hover:text-terracota transition-colors">Blog</Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li className="text-cacao font-medium truncate max-w-[200px] md:max-w-none">
              {meta.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero image */}
      {heroImg && (
        <div className="container-custom max-w-3xl mt-4">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={heroImg.src}
              alt={heroImg.alt}
              width={1200}
              height={630}
              className="w-full h-auto max-h-[400px] object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="section-padding pb-8 pt-6">
        <div className="container-custom max-w-3xl">
          <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            {meta.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cacao mb-4 leading-tight">
            {meta.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-sm text-texto-muted">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{meta.readingTime} de lectura</span>
            </div>
            <ShareButtons url={articleUrl} title={meta.title} />
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
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-cacao rounded-2xl p-8 text-white">
                  <div className="mb-4 flex justify-center opacity-60">
                    <LogoIcon size={40} className="brightness-0 invert" />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-wider text-white/70 mb-2">
                    Recurso gratuito
                  </p>
                  <h3 className="font-serif text-2xl mb-3">Guía gratuita</h3>
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
              {relatedPosts.map((post) => {
                const relImg = blogImages[post.slug];
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-[180px] overflow-hidden">
                      {relImg ? (
                        <Image
                          src={relImg.src}
                          alt={relImg.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-arena flex items-center justify-center">
                          <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}
                      <span className="absolute bottom-3 left-4 inline-block rounded-full bg-white/90 backdrop-blur-sm text-verde-dark px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm">
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
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readingTime} de lectura</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
