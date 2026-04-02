import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getProduct } from '@/lib/products';

const BASE_URL = 'https://www.espaciolenguaje.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json(
        { error: 'Producto no válido.' },
        { status: 400 }
      );
    }

    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado.' },
        { status: 404 }
      );
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}&product=${product.id}`,
      cancel_url: `${BASE_URL}/recursos`,
      metadata: {
        productId: product.id,
        productName: product.name,
        downloadFile: product.file,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Checkout error:', message);
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago.', detail: message },
      { status: 500 }
    );
  }
}
