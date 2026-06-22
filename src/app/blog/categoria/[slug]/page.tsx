import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategorySlug } from "@/lib/mdx";
import { localizedAlternates } from "@/lib/hreflang";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getAllCategories().find((c) => c.slug === slug);
  if (!category) return { title: "Categoría" };
  return {
    title: `${category.name} — Artículos del blog`,
    description: category.description,
    alternates: {
      canonical: `https://www.espaciolenguaje.com/blog/categoria/${slug}`,
      languages: localizedAlternates(`/blog/categoria/${slug}`),
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getAllCategories().find((c) => c.slug === slug);
  if (!category) notFound();
  const posts = getPostsByCategorySlug(slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.espaciolenguaje.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.espaciolenguaje.com/blog" },
      { "@type": "ListItem", position: 3, name: category.name, item: `https://www.espaciolenguaje.com/blog/categoria/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="Breadcrumb" className="section-padding pb-0 pt-8 md:pt-12">
        <div className="container-custom">
          <ol className="flex items-center gap-2 text-sm text-texto-muted">
            <li><Link href="/" className="hover:text-terracota transition-colors">Inicio</Link></li>
            <li aria-hidden="true">&gt;</li>
            <li><Link href="/blog" className="hover:text-terracota transition-colors">Blog</Link></li>
            <li aria-hidden="true">&gt;</li>
            <li className="text-cacao font-medium">{category.name}</li>
          </ol>
        </div>
      </nav>

      <header className="section-padding pb-8 pt-6">
        <div className="container-custom max-w-3xl">
          <span className="inline-block bg-verde text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Categoría · {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-cacao mb-4 leading-tight">
            {category.name}
          </h1>
          <p className="text-lg text-texto-secundario leading-relaxed">{category.description}</p>
        </div>
      </header>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-arena" />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-lg text-cacao mb-2 group-hover:text-terracota transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-texto-secundario text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <time className="text-xs text-texto-muted" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-xl font-serif text-cacao mb-4">Otras categorías</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {getAllCategories()
                .filter((c) => c.slug !== slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blog/categoria/${c.slug}`}
                    className="inline-block rounded-full bg-arena/60 hover:bg-terracota hover:text-white px-4 py-1.5 text-sm text-cacao transition-colors"
                  >
                    {c.name} ({c.count})
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

