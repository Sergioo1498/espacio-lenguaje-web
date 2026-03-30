import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products, formatPrice } from '@/lib/products';

export const metadata: Metadata = {
  title: '¡Gracias por tu compra!',
  robots: { index: false, follow: false },
};

const relatedProducts = products.filter(
  (p) => p.id === 'pack-completo' || p.id === 'guia-dislexia' || p.id === 'cuaderno-0-3'
);

export default function CompraExitosaPage() {
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

          <p className="mt-4 text-lg text-texto-secundario">
            Tu recurso está en camino a tu email. Revisa tu bandeja de entrada
            (y la carpeta de spam, por si acaso).
          </p>

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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/recursos"
              className="inline-flex items-center justify-center rounded-pill bg-terracota px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-terracota-dark"
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
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href="/recursos"
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-[160px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-serif text-base font-semibold text-cacao">
                    {product.name}
                  </h3>
                  <span className="font-serif text-lg font-bold text-terracota">
                    {formatPrice(product.price)}
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
