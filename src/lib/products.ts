export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // céntimos
  currency: string;
  file: string;
  files?: string[];
  image: string;
  category: 'padres' | 'profesionales' | 'mixto';
  popular?: boolean;
  badge?: string;
  originalPrice?: number;
}

export const products: Product[] = [
  {
    id: 'fichas-articulacion',
    name: 'Pack de Fichas de Articulación',
    description:
      '30 fichas imprimibles con ejercicios de articulación para cada fonema del español. Instrucciones claras para padres.',
    price: 490,
    currency: 'eur',
    file: '/downloads/productos/pack-fichas-articulacion.pdf',
    image: '/images/producto-fichas-articulacion.png',
    category: 'padres',
    popular: true,
  },
  {
    id: 'cuaderno-0-3',
    name: 'Cuaderno de Estimulación 0-3 años',
    description:
      '20 actividades organizadas por edad para estimular el lenguaje de tu bebé desde casa.',
    price: 590,
    currency: 'eur',
    file: '/downloads/productos/cuaderno-estimulacion-0-3.pdf',
    image: '/images/producto-cuaderno-0-3.png',
    category: 'padres',
  },
  {
    id: 'cuaderno-3-6',
    name: 'Cuaderno de Estimulación 3-6 años',
    description:
      '20 actividades para desarrollar vocabulario, articulación y conciencia fonológica.',
    price: 590,
    currency: 'eur',
    file: '/downloads/productos/cuaderno-estimulacion-3-6.pdf',
    image: '/images/producto-cuaderno-3-6.png',
    category: 'padres',
  },
  {
    id: 'kit-soplo',
    name: 'Kit de Ejercicios de Soplo',
    description:
      '15 ejercicios progresivos de soplo con materiales caseros y tabla de seguimiento.',
    price: 390,
    currency: 'eur',
    file: '/downloads/productos/kit-ejercicios-soplo.pdf',
    image: '/images/producto-kit-soplo.png',
    category: 'padres',
  },
  {
    id: 'pack-completo',
    name: 'Pack Completo: Todo para Estimular el Lenguaje',
    description:
      'Todos los recursos en un solo pack con descuento. Fichas + Cuadernos + Kit de Soplo + Bonus: Calendario Semanal.',
    price: 1490,
    currency: 'eur',
    originalPrice: 2060,
    file: 'multiple',
    files: [
      '/downloads/productos/pack-fichas-articulacion.pdf',
      '/downloads/productos/cuaderno-estimulacion-0-3.pdf',
      '/downloads/productos/cuaderno-estimulacion-3-6.pdf',
      '/downloads/productos/kit-ejercicios-soplo.pdf',
    ],
    image: '/images/producto-pack-completo.png',
    category: 'padres',
    popular: true,
    badge: 'Más vendido',
  },
  {
    id: 'guia-dislexia',
    name: 'Guía de Dislexia en Edad Escolar',
    description:
      'Todo sobre dislexia: detección, ejercicios, adaptaciones escolares y checklist para tutores.',
    price: 990,
    currency: 'eur',
    file: '/downloads/productos/guia-dislexia.pdf',
    image: '/images/producto-guia-dislexia.png',
    category: 'mixto',
  },
  {
    id: 'guia-tartamudez',
    name: 'Guía de Tartamudez Infantil',
    description:
      'Guía completa para familias: tipos de tartamudez, qué hacer, ejercicios de fluidez y cuándo consultar.',
    price: 990,
    currency: 'eur',
    file: '/downloads/productos/guia-tartamudez.pdf',
    image: '/images/producto-guia-tartamudez.png',
    category: 'mixto',
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
