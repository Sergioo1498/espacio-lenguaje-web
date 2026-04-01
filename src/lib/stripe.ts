import Stripe from 'stripe';

export function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY no configurada. Añade tu clave de Stripe en .env.local'
    );
  }
  return new Stripe(key);
}
