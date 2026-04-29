import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products, formatPrice } from '@/lib/products';
import BuyButton from './BuyButton';

export const metadata: Metadata = {
  title: 'Material de logopedia infantil para imprimir: fichas, cuadernos y guías (PDF)',
  description:
    'Material de logopedia infantil revisado por logopeda colegiada: 30 fichas de articulación por fonema, cuadernos de estimulación 0-3 y 3-6 años, guías de dislexia y tartamudez, kit de soplo. PDF descarga inmediata desde 3,90€.',
  alternates: { canonical: 'https://www.espaciolenguaje.com/recursos' },
  openGraph: {
    title: 'Material de logopedia infantil para imprimir | Espacio Lenguaje',
    description:
      'Fichas, cuadernos y guías de logopedia infantil revisadas por logopeda colegiada. PDF imprimibles, descarga inmediata.',
    url: 'https://www.espaciolenguaje.com/recursos',
    type: 'website',
  },
};

const freeResources = [
  {
    name: 'Guía Hitos del Lenguaje 0-6 años',
    description: 'Todo lo que tu peque debería decir a cada edad.',
    href: '/#lead-magnet',
  },
  {
    name: 'Checklist de Señales de Alerta',
    description: '1 página imprimible con las señales clave por edad.',
    href: '/#lead-magnet',
  },
  {
    name: '5 Juegos para Estimular el Habla',
    description: 'Actividades sencillas para hacer hoy mismo en casa.',
    href: '/#lead-magnet',
  },
];

const faqs = [
  {
    q: '¿Cómo recibo mi recurso?',
    a: 'Inmediatamente después del pago, recibirás un email con el enlace de descarga. También podrás descargarlo desde la página de confirmación.',
  },
  {
    q: '¿Puedo pedir factura?',
    a: 'Sí. Escríbenos a hola@espaciolenguaje.com con tus datos de facturación y te la enviamos.',
  },
  {
    q: '¿Los materiales son imprimibles?',
    a: 'Sí. Todos los recursos están en formato PDF optimizado para imprimir en A4.',
  },
  {
    q: '¿Hay devoluciones?',
    a: 'Al ser productos digitales, no admitimos devoluciones una vez descargados. Si tienes algún problema, escríbenos y lo resolvemos.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.espaciolenguaje.com' },
    { '@type': 'ListItem', position: 2, name: 'Recursos', item: 'https://www.espaciolenguaje.com/recursos' },
  ],
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Recursos de Logopedia Infantil',
  description: 'Material profesional de logopedia infantil descargable',
  url: 'https://www.espaciolenguaje.com/recursos',
  numberOfItems: products.length,
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: p.name,
      description: p.description,
      image: `https://www.espaciolenguaje.com${p.image}`,
      url: 'https://www.espaciolenguaje.com/recursos',
      brand: { '@type': 'Organization', name: 'Espacio Lenguaje' },
      offers: {
        '@type': 'Offer',
        price: (p.price / 100).toFixed(2),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.espaciolenguaje.com/recursos',
      },
    },
  })),
};

export default function RecursosPage() {
  const featuredProduct = products.find((p) => p.id === 'pack-completo')!;
  const regularProducts = products.filter((p) => p.id !== 'pack-completo');

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Hero */}
      <section className="section-padding pb-8">
        <div className="container-custom text-center">
          <span className="inline-block rounded-full bg-verde/10 px-4 py-1.5 font-sans text-sm font-medium text-verde-dark">
            Revisado por logopeda colegiada
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-cacao md:text-5xl lg:text-6xl">
            Material de Logopedia Infantil
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-texto-secundario">
            Fichas, cuadernos y guías diseñadas por logopedas para estimular el lenguaje en casa.
            PDF imprimibles, descarga inmediata.
          </p>

          {/* Resumen rápido de qué hay disponible */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-cacao/10 bg-white p-6 text-left shadow-sm md:p-8">
            <p className="font-sans text-sm font-semibold uppercase tracking-wider text-terracota">
              Lo que vas a encontrar
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-texto-secundario sm:grid-cols-2">
              <li>
                <strong className="text-cacao">Fichas de articulación</strong> — 30 fichas imprimibles, un fonema por página, con instrucciones para padres.
              </li>
              <li>
                <strong className="text-cacao">Cuadernos de estimulación</strong> — 20 actividades por edad (0-3 y 3-6 años), basadas en evidencia.
              </li>
              <li>
                <strong className="text-cacao">Guías clínicas</strong> — Dislexia y tartamudez, con criterios DSM-5 y referencias académicas.
              </li>
              <li>
                <strong className="text-cacao">Kit de soplo</strong> — 15 ejercicios reposicionados según la evidencia actual (ASHA 2013).
              </li>
            </ul>
            <p className="mt-5 text-xs italic text-texto-muted">
              Todo el material complementa el trabajo en casa, no sustituye la valoración profesional. Si observas señales de alerta, consulta con una logopeda colegiada.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Product — Pack Completo */}
      <section className="section-padding pt-8 pb-12">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-terracota/5 to-verde/5 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-terracota px-3 py-1 font-sans text-xs font-semibold text-white">
                  Ahorra un 28%
                </span>
                <h2 className="mt-4 font-serif text-3xl font-bold text-cacao md:text-4xl">
                  <Link href={`/recursos/${featuredProduct.id}`} className="hover:text-terracota transition-colors">
                    {featuredProduct.name}
                  </Link>
                </h2>
                <p className="mt-3 text-texto-secundario">
                  {featuredProduct.description}
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-terracota">
                    {formatPrice(featuredProduct.price)}
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="text-lg text-texto-muted line-through">
                      {formatPrice(featuredProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <BuyButton productId={featuredProduct.id} size="large" />
                  <Link
                    href={`/recursos/${featuredProduct.id}`}
                    className="inline-flex items-center justify-center rounded-pill border border-cacao/20 px-6 py-3 font-sans text-sm font-semibold text-cacao transition-colors hover:border-terracota hover:text-terracota"
                  >
                    Ver detalle →
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[3/2]">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <h2 className="mb-8 font-serif text-2xl font-bold text-cacao md:text-3xl">
            Todos los recursos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image — linked */}
                <Link href={`/recursos/${product.id}`} className="relative block h-[200px] overflow-hidden" aria-label={`Ver detalle de ${product.name}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-terracota px-3 py-1 font-sans text-xs font-semibold text-white">
                      {product.badge}
                    </span>
                  )}
                  {product.popular && !product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-verde px-3 py-1 font-sans text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-serif text-lg font-semibold text-cacao">
                    <Link href={`/recursos/${product.id}`} className="hover:text-terracota transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-texto-secundario">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-terracota">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-texto-muted line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <BuyButton productId={product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="section-padding py-12 bg-verde/5">
        <div className="container-custom">
          <h2 className="mb-2 font-serif text-2xl font-bold text-cacao md:text-3xl">
            Recursos gratuitos
          </h2>
          <p className="mb-8 text-texto-secundario">
            Empieza con estos recursos gratis. Solo necesitas tu email.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {freeResources.map((res) => (
              <a
                key={res.name}
                href={res.href}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-verde/10">
                  <svg
                    className="h-5 w-5 text-verde"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 font-serif text-base font-semibold text-cacao">
                  {res.name}
                </h3>
                <p className="text-sm text-texto-secundario">
                  {res.description}
                </p>
                <span className="mt-3 inline-block font-sans text-sm font-medium text-terracota">
                  Descargar gratis →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding py-12">
        <div className="container-custom mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-cacao md:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-white p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between font-sans font-medium text-cacao">
                  {faq.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-texto-muted transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-texto-secundario">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-12">
        <div className="container-custom text-center">
          <p className="text-texto-secundario">
            ¿No sabes cuál elegir? Escríbenos a{' '}
            <a
              href="mailto:hola@espaciolenguaje.com"
              className="font-semibold text-terracota hover:text-terracota-dark"
            >
              hola@espaciolenguaje.com
            </a>{' '}
            y te asesoramos.
          </p>
        </div>
      </section>
    </div>
  );
}
