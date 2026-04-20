import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProduct, formatPrice } from '@/lib/products';
import { getProductContent } from '@/lib/products-content';
import BuyButton from '../BuyButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) return {};

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: `https://www.espaciolenguaje.com/recursos/${product.id}` },
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `https://www.espaciolenguaje.com/recursos/${product.id}`,
      type: 'website',
      siteName: 'Espacio Lenguaje',
      images: [{ url: product.image, width: 1200, height: 630, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  const content = getProductContent(slug);
  if (!product || !content) notFound();

  const productUrl = `https://www.espaciolenguaje.com/recursos/${product.id}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: content.seoDescription,
    image: `https://www.espaciolenguaje.com${product.image}`,
    url: productUrl,
    sku: product.id,
    brand: { '@type': 'Organization', name: 'Espacio Lenguaje' },
    category: 'Logopedia infantil',
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      seller: { '@type': 'Organization', name: 'Espacio Lenguaje' },
      itemCondition: 'https://schema.org/NewCondition',
      ...(product.originalPrice && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: (product.originalPrice / 100).toFixed(2),
          priceCurrency: 'EUR',
        },
      }),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.espaciolenguaje.com' },
      { '@type': 'ListItem', position: 2, name: 'Recursos', item: 'https://www.espaciolenguaje.com/recursos' },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const relatedProducts = (content.relatedProductIds || [])
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="pt-24 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb visible */}
      <nav aria-label="breadcrumb" className="section-padding pb-0">
        <div className="container-custom">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-sm text-texto-muted">
            <li><Link href="/" className="hover:text-terracota">Inicio</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/recursos" className="hover:text-terracota">Recursos</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-cacao">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-padding pb-8 pt-6">
        <div className="container-custom">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
            <div className="relative overflow-hidden rounded-3xl bg-arena">
              <Image
                src={product.image}
                alt={`${product.name} — portada del PDF`}
                width={800}
                height={800}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-terracota px-3 py-1 font-sans text-xs font-semibold text-white shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <div>
              <span className="inline-block rounded-full bg-verde/15 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-verde-dark">
                {content.ageRange ? `Edad: ${content.ageRange}` : 'Material profesional'}
              </span>
              <h1 className="mt-3 font-serif text-3xl leading-tight text-cacao md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-texto-secundario">{content.subtitle}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-4xl font-bold text-terracota">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-texto-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    {discount !== null && (
                      <span className="rounded-full bg-verde/15 px-3 py-1 font-sans text-xs font-semibold text-verde-dark">
                        −{discount}%
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="mt-1 font-sans text-sm text-texto-muted">
                PDF · {content.pageCount} páginas · Descarga inmediata
              </p>

              <div className="mt-6">
                <BuyButton productId={product.id} size="large" />
              </div>

              <ul className="mt-8 grid gap-3 text-[15px] text-cacao">
                {[
                  'Descarga inmediata tras el pago',
                  'Uso ilimitado en tu familia o aula',
                  'Creado por logopedas con experiencia clínica',
                  'Pago seguro con Stripe',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verde/15 text-verde-dark">
                      ✓
                    </span>
                    <span className="text-texto-secundario">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="section-padding py-12">
        <div className="container-custom mx-auto max-w-3xl">
          <h2 className="mb-6 font-serif text-2xl text-cacao md:text-3xl">Sobre este recurso</h2>
          <div className="space-y-5 text-[17px] leading-relaxed text-texto-secundario">
            {content.longDescription.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cacao">$1</strong>') }} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-arena py-14">
        <div className="container-custom">
          <h2 className="mb-8 font-serif text-2xl text-cacao md:text-3xl">Qué encontrarás dentro</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {content.features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-serif text-lg text-cacao">{f.title}</h3>
                <p className="text-[15px] text-texto-secundario">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get + Audience */}
      <section className="section-padding py-12">
        <div className="container-custom grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-5 font-serif text-2xl text-cacao md:text-3xl">Qué recibes al comprar</h2>
            <ul className="space-y-3 text-[16px] text-cacao">
              {content.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verde text-white">✓</span>
                  <span className="text-texto-secundario">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 font-serif text-2xl text-cacao md:text-3xl">¿Para quién es?</h2>
            <ul className="space-y-3 text-[16px] text-cacao">
              {content.audience.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracota/20 text-terracota">→</span>
                  <span className="text-texto-secundario">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-arena py-14">
        <div className="container-custom mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-2xl text-cacao md:text-3xl">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white p-6 shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between font-sans font-medium text-cacao">
                  {faq.q}
                  <svg className="h-5 w-5 shrink-0 text-texto-muted transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <p className="mt-4 text-texto-secundario">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related products + related posts */}
      {(relatedProducts.length > 0 || (content.relatedBlogPosts && content.relatedBlogPosts.length > 0)) && (
        <section className="section-padding py-14">
          <div className="container-custom grid gap-12 lg:grid-cols-2">
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl text-cacao md:text-3xl">También te puede interesar</h2>
                <ul className="space-y-4">
                  {relatedProducts.map((rp) => (
                    <li key={rp.id}>
                      <Link
                        href={`/recursos/${rp.id}`}
                        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image src={rp.image} alt={rp.name} fill className="object-cover" sizes="80px" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-base text-cacao">{rp.name}</h3>
                          <p className="font-sans text-sm text-terracota">{formatPrice(rp.price)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.relatedBlogPosts && content.relatedBlogPosts.length > 0 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl text-cacao md:text-3xl">Artículos relacionados</h2>
                <ul className="space-y-3">
                  {content.relatedBlogPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <h3 className="font-sans text-[15px] font-medium text-cacao">{post.title}</h3>
                        <span className="mt-1 inline-block font-sans text-sm text-terracota">Leer artículo →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-padding bg-cacao py-14 text-crema">
        <div className="container-custom mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-crema md:text-4xl">
            Empieza hoy con {product.name}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-crema/80 md:text-[17px]">
            {formatPrice(product.price)} · PDF de {content.pageCount} páginas · Descarga inmediata.
          </p>
          <div className="mt-6 flex justify-center">
            <BuyButton productId={product.id} size="large" />
          </div>
        </div>
      </section>
    </div>
  );
}
