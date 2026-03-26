import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import SectionTag from '@/components/ui/SectionTag';
import AnimatedSection from '@/components/ui/AnimatedSection';

const blogImages: Record<string, { src: string; alt: string }> = {
  'mi-hijo-no-habla-cuando-preocuparse': {
    src: '/images/blog-mi-hijo-no-habla.png',
    alt: 'Manos de un niño señalando un libro ilustrado con animales',
  },
  'ejercicios-lenguaje-para-casa': {
    src: '/images/blog-ejercicios.png',
    alt: 'Mesa con materiales de logopedia: espejo, tarjetas y pegatinas de recompensa',
  },
  'dislexia-en-ninos-como-detectarla': {
    src: '/images/blog-dislexia.png',
    alt: 'Letras de madera desordenadas sobre superficie color crema, mano de niño tomando una letra',
  },
  'estimulacion-del-lenguaje-en-casa': {
    src: '/images/blog-estimulacion.png',
    alt: 'Manos de padre e hijo con materiales de estimulación del lenguaje',
  },
  'juegos-para-estimular-el-habla': {
    src: '/images/blog-juegos-habla.png',
    alt: 'Juegos de logopedia infantil sobre una mesa',
  },
  'etapas-desarrollo-del-lenguaje': {
    src: '/images/blog-etapas-desarrollo.png',
    alt: 'Bloques de letras y libro abierto simbolizando etapas del lenguaje',
  },
  'bilinguismo-infantil-mitos-y-realidades': {
    src: '/images/blog-bilinguismo.png',
    alt: 'Libros infantiles en dos idiomas con banderitas',
  },
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <SectionTag variant="verde">Blog</SectionTag>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-cacao">
            Artículos para entender y acompañar
          </h2>
          <p className="mt-4 text-lg text-texto-secundario max-w-2xl mx-auto">
            Información basada en evidencia, explicada con cercanía.
          </p>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => {
            const image = blogImages[post.slug];
            return (
              <AnimatedSection key={post.slug} delay={i * 0.15}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300"
                >
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-arena flex items-center justify-center">
                        <span className="text-texto-muted text-sm">Imagen</span>
                      </div>
                    )}
                    {/* Category badge */}
                    <span className="absolute bottom-3 left-4 inline-block rounded-full bg-white/90 backdrop-blur-sm text-verde-dark px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-cacao mb-2 group-hover:text-terracota transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-texto-secundario text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <time className="text-xs text-texto-muted" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA link */}
        <AnimatedSection className="text-center mt-12">
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center gap-2"
          >
            Ver todos los artículos →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
