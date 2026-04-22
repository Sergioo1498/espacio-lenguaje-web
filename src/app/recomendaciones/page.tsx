import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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
      'El clásico de Anna Llenas para identificar y nombrar emociones. Cada color representa un sentimiento diferente.',
    whyWeRecommend:
      'Amplía el vocabulario emocional, que es una de las áreas más difíciles del lenguaje. Los niños aprenden a poner nombre a lo que sienten, lo que reduce la frustración y mejora la comunicación.',
    ageRange: '3-6 años',
    affiliateUrl: 'https://amzn.to/4cdFshL',
    image: '/images/recomendacion-01.jpg',
  },
  {
    name: '¿A qué sabe la luna?',
    category: 'Libro infantil',
    description:
      'Cuento acumulativo donde los animales se suben unos encima de otros para alcanzar la luna. Cada página repite y amplía la secuencia.',
    whyWeRecommend:
      'Los cuentos acumulativos son una herramienta terapéutica: trabajan memoria secuencial, anticipación y vocabulario de animales. El niño puede "predecir" qué viene después, lo que refuerza la comprensión narrativa.',
    ageRange: '2-5 años',
    affiliateUrl: 'https://amzn.to/4dDuHHL',
    image: '/images/recomendacion-02.jpg',
  },
  {
    name: 'La pequeña oruga glotona',
    category: 'Libro infantil',
    description:
      'Eric Carle cuenta la historia de una oruga que come diferentes alimentos a lo largo de la semana hasta convertirse en mariposa.',
    whyWeRecommend:
      'Trabaja vocabulario de alimentos, días de la semana, números y secuencias temporales. Las páginas troqueladas invitan a señalar y tocar, ideal para niños con retraso del lenguaje que necesitan apoyo multisensorial.',
    ageRange: '1-4 años',
    affiliateUrl: 'https://amzn.to/3PYkgF6',
    image: '/images/recomendacion-03.jpg',
  },
  {
    name: 'Elmer',
    category: 'Libro infantil',
    description:
      'La historia de un elefante de colores que es diferente a los demás. Un cuento sobre aceptar la diversidad.',
    whyWeRecommend:
      'Excelente para trabajar colores, emociones y lenguaje descriptivo. La estructura repetitiva ayuda a los niños a anticipar y participar activamente en la lectura. Además, permite hablar sobre las diferencias de forma natural.',
    ageRange: '2-5 años',
    affiliateUrl: 'https://amzn.to/4mfhc3a',
    image: '/images/recomendacion-04.jpg',
  },
  {
    name: 'Adivina cuánto te quiero',
    category: 'Libro infantil',
    description:
      'Una liebre pequeña y una grande compiten por decir cuánto se quieren usando comparaciones cada vez más grandes.',
    whyWeRecommend:
      'Ideal para trabajar conceptos comparativos (más alto, más lejos, más grande), lenguaje figurado y expresión afectiva. Fomenta que el niño practique estructuras como "Te quiero hasta..." seguido de su propia idea.',
    ageRange: '2-5 años',
    affiliateUrl: 'https://amzn.to/47SnVdD',
    image: '/images/recomendacion-05.jpg',
  },
];

const materials: Recommendation[] = [
  {
    name: 'Espejo de logopedia',
    category: 'Material de logopedia',
    description:
      'Espejo de seguridad para que el niño observe su boca al articular sonidos. Imprescindible en cualquier sesión de logopedia.',
    whyWeRecommend:
      'El espejo puede ser útil para que el peque tome consciencia de cómo coloca su boca ante ciertos fonemas, siempre dentro del trabajo fonético específico que dirija su logopeda. No es un instrumento de autocorrección autónoma.',
    ageRange: '3-8 años',
    affiliateUrl: 'https://amzn.to/4e8O1gb',
    image: '/images/recomendacion-06.jpg',
  },
  {
    name: 'Letras de madera Montessori',
    category: 'Material educativo',
    description:
      'Set de letras de madera con colores y texturas para manipular, ordenar y formar palabras de forma sensorial.',
    whyWeRecommend:
      'Tocar y manipular letras activa la memoria multisensorial, facilitando el aprendizaje de la lectoescritura. Ideal para niños con dificultades de conciencia fonológica o riesgo de dislexia: asocian el sonido con la forma de la letra de forma táctil.',
    ageRange: '3-6 años',
    affiliateUrl: 'https://amzn.to/4dIqX85',
    image: '/images/recomendacion-07.jpg',
  },
  {
    name: 'Tarjetas de vocabulario',
    category: 'Material de logopedia',
    description:
      'Set de tarjetas con imágenes reales organizadas por categorías semánticas: animales, alimentos, objetos, acciones.',
    whyWeRecommend:
      'Algunos estudios sugieren que las fotografías pueden favorecer la generalización del vocabulario a entornos reales. No hay consenso absoluto, pero es una opción razonable para ampliar léxico con imágenes del día a día. Permiten trabajar denominación, categorización, descripción y juegos de memoria.',
    ageRange: '1-6 años',
    affiliateUrl: 'https://amzn.to/48EpIDh',
    image: '/images/recomendacion-08.jpg',
  },
  {
    name: 'Pompas de jabón',
    category: 'Material de soplo',
    description:
      'Set de pompas de jabón con diferentes tamaños de aro para practicar ejercicios de soplo controlado.',
    whyWeRecommend:
      'Las pompas son un juego estupendo para momentos compartidos con tu peque y para practicar control respiratorio de forma divertida. No esperamos que mejoren directamente la articulación de fonemas.',
    ageRange: '2-6 años',
    affiliateUrl: 'https://amzn.to/41VqKqG',
    image: '/images/recomendacion-09.jpg',
  },
  {
    name: 'Molinillo de viento',
    category: 'Material de soplo',
    description:
      'Molinillos de colores para ejercicios de control de soplo. El niño sopla y ve cómo gira: feedback visual inmediato.',
    whyWeRecommend:
      'Los molinillos son juguetes divertidos que permiten al peque experimentar cómo su respiración mueve el mundo. Úsalos como juego compartido, sin expectativas clínicas específicas.',
    ageRange: '2-6 años',
    affiliateUrl: 'https://amzn.to/4cfVmbl',
    image: '/images/recomendacion-10.jpg',
  },
];

function ProductCard({ item }: { item: Recommendation }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative h-[180px] overflow-hidden bg-crema">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-cacao/80 px-3 py-1 font-sans text-xs text-white">
            {item.category}
          </span>
          <span className="rounded-full bg-arena px-2.5 py-1 font-sans text-xs text-cacao">
            {item.ageRange}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-lg font-semibold text-cacao">
          {item.name}
        </h3>
        <p className="mb-3 text-sm text-texto-secundario">{item.description}</p>
        <div className="mb-4 rounded-xl bg-verde/5 p-4">
          <p className="text-sm text-verde-dark">
            <span className="font-semibold">Por qué lo recomendamos:</span>{' '}
            {item.whyWeRecommend}
          </p>
        </div>
        <div className="mt-auto">
          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-terracota px-5 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-terracota-dark"
          >
            Ver en Amazon
            <svg
              className="h-4 w-4"
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

      {/* Hero image */}
      <section className="px-6 pb-8">
        <div className="container-custom">
          <div className="relative h-[200px] md:h-[300px] overflow-hidden rounded-2xl">
            <Image
              src="/images/recomendaciones-hero.jpg"
              alt="Libros infantiles y materiales educativos de madera sobre superficie crema"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <h2 className="mb-2 font-serif text-2xl font-bold text-cacao md:text-3xl">
            Libros recomendados
          </h2>
          <p className="mb-8 text-texto-secundario">
            Cuentos que trabajan el lenguaje de forma natural. Cada uno está
            seleccionado por su valor terapéutico, no solo porque sea
            &quot;bonito&quot;.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <ProductCard key={book.name} item={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section-padding py-12 bg-verde/5">
        <div className="container-custom">
          <h2 className="mb-2 font-serif text-2xl font-bold text-cacao md:text-3xl">
            Materiales de logopedia
          </h2>
          <p className="mb-8 text-texto-secundario">
            Materiales que usamos en sesiones de logopedia y que puedes tener en
            casa. Todos son asequibles y fáciles de encontrar.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((mat) => (
              <ProductCard key={mat.name} item={mat} />
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
            logopedas para trabajar en casa.
          </p>
          <Link
            href="/recursos"
            className="inline-flex items-center justify-center rounded-pill bg-terracota px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-terracota-dark"
          >
            Ver recursos de logopedia
          </Link>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="px-6 pb-12">
        <div className="container-custom">
          <div className="rounded-2xl bg-arena/50 p-6">
            <p className="font-sans text-xs leading-relaxed text-texto-muted">
              <strong className="text-texto-secundario">
                Aviso sobre enlaces de afiliado:
              </strong>{' '}
              Esta página contiene enlaces de afiliado de Amazon. Si compras a
              través de ellos, recibimos una pequeña comisión sin coste
              adicional para ti. Solo recomendamos productos que usamos o que
              consideramos útiles para el desarrollo del lenguaje. Esta comisión
              nos ayuda a seguir creando contenido gratuito para familias.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
