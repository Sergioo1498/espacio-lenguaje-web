import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Recomendaciones para Estimular el Lenguaje',
  description:
    'Los mejores libros, juguetes y materiales recomendados por logopedas para estimular el desarrollo del lenguaje infantil.',
  alternates: { canonical: 'https://www.espaciolenguaje.com/recomendaciones' },
};

interface Recommendation {
  name: string;
  category: string;
  description: string;
  whyWeRecommend: string;
  ageRange: string;
  affiliateUrl: string;
  image: string;
}

const books: Recommendation[] = [
  {
    name: 'El monstruo de colores',
    category: 'Libro infantil',
    description:
      'Un clásico para trabajar emociones y vocabulario emocional con los más pequeños.',
    whyWeRecommend:
      'Perfecto para ampliar vocabulario de emociones y fomentar la expresión oral a partir de 3 años.',
    ageRange: '3-6 años',
    affiliateUrl: '#', // Actualizar con enlace de afiliado de Amazon
    image: '/images/producto-cuaderno-0-3.png',
  },
  {
    name: '¿A qué sabe la luna?',
    category: 'Libro infantil',
    description:
      'Cuento acumulativo ideal para trabajar memoria secuencial y vocabulario de animales.',
    whyWeRecommend:
      'Los cuentos acumulativos son excelentes para la memoria auditiva y la estructura narrativa.',
    ageRange: '2-5 años',
    affiliateUrl: '#',
    image: '/images/producto-cuaderno-0-3.png',
  },
  {
    name: 'De la cabeza a los pies (Eric Carle)',
    category: 'Libro infantil',
    description:
      'Libro interactivo que invita al movimiento y la imitación.',
    whyWeRecommend:
      'Combina lenguaje con movimiento corporal, ideal para niños con retraso del lenguaje.',
    ageRange: '1-4 años',
    affiliateUrl: '#',
    image: '/images/producto-cuaderno-0-3.png',
  },
  {
    name: 'Mis primeras 100 palabras',
    category: 'Libro de vocabulario',
    description:
      'Libro de imágenes reales organizadas por categorías.',
    whyWeRecommend:
      'Las imágenes reales (no dibujos) ayudan al reconocimiento y aprendizaje de vocabulario básico.',
    ageRange: '1-3 años',
    affiliateUrl: '#',
    image: '/images/producto-cuaderno-0-3.png',
  },
  {
    name: 'Adivina cuánto te quiero',
    category: 'Libro infantil',
    description:
      'Clásico para trabajar conceptos de tamaño, comparación y expresión afectiva.',
    whyWeRecommend:
      'Ideal para trabajar conceptos comparativos y fomentar el diálogo sobre emociones.',
    ageRange: '2-5 años',
    affiliateUrl: '#',
    image: '/images/producto-cuaderno-0-3.png',
  },
];

const toys: Recommendation[] = [
  {
    name: 'Juego de soplo con molinillos',
    category: 'Material de soplo',
    description:
      'Set de molinillos de colores para ejercicios de control del soplo.',
    whyWeRecommend:
      'El soplo es fundamental para la articulación. Los molinillos motivan a los niños a practicar.',
    ageRange: '2-6 años',
    affiliateUrl: '#',
    image: '/images/producto-kit-soplo.png',
  },
  {
    name: 'Lotto de imágenes (animales/objetos)',
    category: 'Juego educativo',
    description:
      'Juego de asociación con imágenes reales de animales y objetos cotidianos.',
    whyWeRecommend:
      'Excelente para trabajar vocabulario, categorización semántica y turnos de comunicación.',
    ageRange: '2-5 años',
    affiliateUrl: '#',
    image: '/images/producto-fichas-articulacion.png',
  },
  {
    name: 'Plastilina Play-Doh (pack colores)',
    category: 'Material sensorial',
    description:
      'Pack de plastilina en múltiples colores para actividades de motricidad y lenguaje.',
    whyWeRecommend:
      'La plastilina permite trabajar vocabulario de acciones (aplastar, estirar, cortar) y colores.',
    ageRange: '2-6 años',
    affiliateUrl: '#',
    image: '/images/producto-kit-soplo.png',
  },
  {
    name: 'Espejo infantil irrompible',
    category: 'Material de logopedia',
    description:
      'Espejo de seguridad para que el niño observe su boca al articular sonidos.',
    whyWeRecommend:
      'Herramienta esencial para ejercicios de articulación: el niño ve cómo coloca la lengua y los labios.',
    ageRange: '3-8 años',
    affiliateUrl: '#',
    image: '/images/producto-fichas-articulacion.png',
  },
  {
    name: 'Pompero gigante para burbujas',
    category: 'Material de soplo',
    description:
      'Pompero con diferentes tamaños de anilla para ejercicios de soplo.',
    whyWeRecommend:
      'Las burbujas requieren control de soplo sostenido y dirección, ideal para fortalecer musculatura orofacial.',
    ageRange: '2-6 años',
    affiliateUrl: '#',
    image: '/images/producto-kit-soplo.png',
  },
];

function ProductCard({ item }: { item: Recommendation }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative h-[160px] overflow-hidden bg-crema">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cacao/80 px-3 py-1 font-sans text-xs text-white">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 font-serif text-base font-semibold text-cacao">
          {item.name}
        </h3>
        <p className="mb-2 text-sm text-texto-secundario">{item.description}</p>
        <div className="mb-4 rounded-xl bg-verde/5 p-3">
          <p className="text-xs font-medium text-verde-dark">
            🗣️ Por qué lo recomendamos: {item.whyWeRecommend}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="rounded-full bg-arena px-2.5 py-1 font-sans text-xs text-cacao">
            {item.ageRange}
          </span>
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 rounded-pill bg-terracota px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-terracota-dark"
          >
            Ver en Amazon
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function RecomendacionesPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="section-padding pb-8">
        <div className="container-custom text-center">
          <span className="inline-block rounded-full bg-terracota/10 px-4 py-1.5 font-sans text-sm font-medium text-terracota-dark">
            Seleccionados por logopedas
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-cacao md:text-5xl">
            Recomendaciones
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-texto-secundario">
            Los mejores libros, juguetes y materiales para estimular el
            desarrollo del lenguaje de tu peque, seleccionados por nuestro
            equipo de logopedas.
          </p>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="px-6">
        <div className="container-custom">
          <div className="rounded-2xl bg-arena/50 p-4 text-center">
            <p className="font-sans text-xs text-texto-muted">
              Este artículo contiene enlaces de afiliado. Si compras a través de
              ellos, recibimos una pequeña comisión sin coste adicional para ti.
              Esto nos ayuda a seguir creando contenido gratuito.
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <h2 className="mb-2 font-serif text-2xl font-bold text-cacao md:text-3xl">
            📚 Libros recomendados
          </h2>
          <p className="mb-8 text-texto-secundario">
            Cuentos y libros que trabajan el lenguaje de forma natural.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <ProductCard key={book.name} item={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Toys Section */}
      <section className="section-padding py-12 bg-verde/5">
        <div className="container-custom">
          <h2 className="mb-2 font-serif text-2xl font-bold text-cacao md:text-3xl">
            🧸 Juguetes y materiales
          </h2>
          <p className="mb-8 text-texto-secundario">
            Materiales que usamos en sesiones de logopedia y que puedes tener en
            casa.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toys.map((toy) => (
              <ProductCard key={toy.name} item={toy} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-12">
        <div className="container-custom text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-cacao">
            ¿Buscas recursos profesionales?
          </h2>
          <p className="mb-6 text-texto-secundario">
            Nuestros cuadernos y fichas están diseñados específicamente por
            logopedas.
          </p>
          <a
            href="/recursos"
            className="inline-flex items-center justify-center rounded-pill bg-terracota px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-terracota-dark"
          >
            Ver recursos de logopedia →
          </a>
        </div>
      </section>
    </div>
  );
}
