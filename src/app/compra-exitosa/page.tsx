import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice, getProduct } from '@/lib/products';

export const metadata: Metadata = {
  title: '¡Gracias por tu compra!',
  robots: { index: false, follow: false },
};

const relatedProducts = products.filter(
  (p) =>
    p.id === 'pack-completo' ||
    p.id === 'guia-dislexia' ||
    p.id === 'cuaderno-0-3'
);

export default async function CompraExitosaPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const productId = params.product;
  const product = productId ? getProduct(productId) : null;

  return (
    <div className="pt-24 pb-16">
      <section className="section-padding">
        <div className="container-custom mx-auto max-w-2xl text-center">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-verde/10">
            <svg
              className="h-10 w-10 text-verde"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="font-serif text-3xl font-bold text-cacao md:text-4xl">
            ¡Gracias por tu compra!
          </h1>

          {product && (
            <p className="mt-2 text-lg text-terracota font-semibold">
              {product.name}
            </p>
          )}

          <p className="mt-4 text-texto-secundario">
            También te hemos enviado el enlace de descarga a tu email.
            Revisa tu bandeja de entrada (y spam, por si acaso).
          </p>

          {/* Download buttons */}
          {product && (
            <div className="mt-8 rounded-2xl bg-crema border border-terracota/10 p-6">
              <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-cacao">
                Descarga directa
              </h2>
              {product.file === 'multiple' && product.files ? (
                <div className="flex flex-col gap-3">
                  {product.files.map((file) => {
                    const name = file
                      .split('/')
                      .pop()
                      ?.replace('.pdf', '')
                      .replace(/-/g, ' ') || 'Recurso';
                    return (
                      <a
                        key={file}
                        href={file}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-pill bg-terracota px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-terracota-dark"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        {name}
                      </a>
                    );
                  })}
                </div>
              ) : product.file !== 'multiple' ? (
                <a
                  href={product.file}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-pill bg-terracota px-8 py-4 font-sans text-base font-semibold text-white transition-colors hover:bg-terracota-dark"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar PDF
                </a>
              ) : null}
            </div>
          )}

          {!product && (
            <div className="mt-8 rounded-2xl bg-verde/5 p-6">
              <p className="font-sans text-sm text-texto-secundario">
                Si no recibes el email en 5 minutos, escríbenos a{' '}
                <a
                  href="mailto:hola@espaciolenguaje.com"
                  className="font-semibold text-terracota"
                >
                  hola@espaciolenguaje.com
                </a>{' '}
                y te lo enviamos manualmente.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/recursos"
              className="inline-flex items-center justify-center rounded-pill bg-cacao/5 border border-cacao/10 px-6 py-3 font-sans text-sm font-semibold text-cacao transition-colors hover:bg-cacao/10"
            >
              Ver más recursos
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-pill border-2 border-cacao/10 px-6 py-3 font-sans text-sm font-semibold text-cacao transition-colors hover:bg-cacao/5"
            >
              Ir al blog
            </Link>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="section-padding pt-16">
        <div className="container-custom">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-cacao">
            También te puede interesar
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedProducts
              .filter((p) => p.id !== productId)
              .slice(0, 3)
              .map((p) => (
              <Link
                key={p.id}
                href="/recursos"
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-[160px] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-serif text-base font-semibold text-cacao">
                    {p.name}
                  </h3>
                  <span className="font-serif text-lg font-bold text-terracota">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
