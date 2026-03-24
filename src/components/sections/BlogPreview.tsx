import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import SectionTag from '@/components/ui/SectionTag';
import AnimatedSection from '@/components/ui/AnimatedSection';

/* SVG illustrations for each card position */
const illustrations = [
  // Sound waves
  (
    <svg key="waves" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="40" r="6" stroke="#C4745A" strokeWidth="2" />
      <path d="M30 28C34 32 34 48 30 52" stroke="#C4745A" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M38 20C44 28 44 52 38 60" stroke="#C4745A" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M46 14C54 24 54 56 46 66" stroke="#C4745A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  // Book
  (
    <svg key="book" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 18C12 18 24 14 40 18C56 22 68 18 68 18V58C68 58 56 62 40 58C24 54 12 58 12 58V18Z" stroke="#8FAE8B" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="40" y1="18" x2="40" y2="58" stroke="#8FAE8B" strokeWidth="2" />
      <path d="M22 28H34" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M22 34H30" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M46 30H58" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M46 36H54" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  // Pencil
  (
    <svg key="pencil" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M52 16L64 28L28 64L12 68L16 52L52 16Z" stroke="#C4745A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M48 20L60 32" stroke="#C4745A" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 52L28 64" stroke="#C4745A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="62" cy="14" r="2" fill="#C4745A" opacity="0.3" />
    </svg>
  ),
];

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
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.15}>
              {/*
                Hover animations use CSS only (no framer-motion) since this
                is a server component. The AnimatedSection wrapper handles
                the entrance animation as a client island.
              */}
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300"
              >
                {/* Illustration area */}
                <div className="relative bg-arena flex items-center justify-center h-48">
                  {illustrations[i % illustrations.length]}

                  {/* Category badge */}
                  <span className="absolute bottom-3 left-4 inline-block rounded-full bg-verde/15 text-verde-dark px-3 py-1 text-xs font-semibold uppercase tracking-wider">
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
          ))}
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
