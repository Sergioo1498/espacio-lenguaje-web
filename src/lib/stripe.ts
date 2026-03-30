import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'sk_test_placeholder') {
    throw new Error(
      'STRIPE_SECRET_KEY no configurada. Añade tu clave de Stripe en .env.local'
    );
  }
  return new Stripe(key, { typescript: true });
}

// Lazy initialization — only created when actually used in API routes
let _stripe: Stripe | null = null;
export function getStripeClient(): Stripe {
  if (!_stripe) {
    _stripe = getStripe();
  }
  return _stripe;
}
