import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const products = [
  {
    id: 'fichas-articulacion',
    name: 'Pack de Fichas de Articulación',
    description: '30 fichas imprimibles con ejercicios de articulación para cada fonema del español.',
    price: 490,
    image: 'https://espaciolenguaje.com/images/producto-fichas-articulacion.png',
  },
  {
    id: 'cuaderno-0-3',
    name: 'Cuaderno de Estimulación 0-3 años',
    description: '20 actividades organizadas por edad para estimular el lenguaje de tu bebé.',
    price: 590,
    image: 'https://espaciolenguaje.com/images/producto-cuaderno-0-3.png',
  },
  {
    id: 'cuaderno-3-6',
    name: 'Cuaderno de Estimulación 3-6 años',
    description: '20 actividades para desarrollar vocabulario, articulación y conciencia fonológica.',
    price: 590,
    image: 'https://espaciolenguaje.com/images/producto-cuaderno-3-6.png',
  },
  {
    id: 'kit-soplo',
    name: 'Kit de Ejercicios de Soplo',
    description: '15 ejercicios progresivos de soplo con materiales caseros.',
    price: 390,
    image: 'https://espaciolenguaje.com/images/producto-kit-soplo.png',
  },
  {
    id: 'pack-completo',
    name: 'Pack Completo: Todo para Estimular el Lenguaje',
    description: 'Fichas + Cuadernos + Kit de Soplo + Bonus Calendario Semanal.',
    price: 1490,
    image: 'https://espaciolenguaje.com/images/producto-pack-completo.png',
  },
  {
    id: 'guia-dislexia',
    name: 'Guía de Dislexia en Edad Escolar',
    description: 'Todo sobre dislexia: detección, ejercicios, adaptaciones escolares y checklist.',
    price: 990,
    image: 'https://espaciolenguaje.com/images/producto-guia-dislexia.png',
  },
  {
    id: 'guia-tartamudez',
    name: 'Guía de Tartamudez Infantil',
    description: 'Guía completa para familias: tipos, qué hacer, ejercicios de fluidez.',
    price: 990,
    image: 'https://espaciolenguaje.com/images/producto-guia-tartamudez.png',
  },
];

async function main() {
  const results = {};

  for (const p of products) {
    console.log(`Creating product: ${p.name}...`);

    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      images: [p.image],
      metadata: { localId: p.id },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.price,
      currency: 'eur',
    });

    results[p.id] = {
      productId: product.id,
      priceId: price.id,
      amount: p.price,
    };

    console.log(`  ✓ ${p.name}: price=${price.id}`);
  }

  console.log('\n=== STRIPE PRICE IDS ===');
  console.log(JSON.stringify(results, null, 2));

  // Output mapping for products.ts
  console.log('\n=== FOR lib/products.ts ===');
  for (const [id, data] of Object.entries(results)) {
    console.log(`'${id}': '${data.priceId}',`);
  }
}

main().catch(console.error);
