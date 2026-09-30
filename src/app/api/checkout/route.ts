import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getProduct } from '@/lib/products';
import { checkoutAttribution } from '@/lib/checkout-attribution';

const BASE_URL = 'https://www.espaciolenguaje.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, addOnProductIds, utmCampaign } = body;
    const attribution = checkoutAttribution(body);

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

    const isTest = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') === true;
    if ((product.testOnly && !isTest) || (product.disabled && !(product.testOnly && isTest))) {
      return NextResponse.json(
        { error: product.disabledReason || 'Este producto no está disponible temporalmente.' },
        { status: 410 }
      );
    }

    const addOns = Array.isArray(addOnProductIds)
      ? addOnProductIds
          .filter((id): id is string => typeof id === 'string' && id !== productId)
          .map(getProduct)
          .filter((p): p is NonNullable<ReturnType<typeof getProduct>> => Boolean(p) && !p!.disabled && !p!.testOnly)
      : [];

    // Live price IDs cannot be used in the separate test account. Live is unchanged.
    const lineItems = [product, ...addOns].map((p) => isTest && p.stripeTestPriceId ? ({price: p.stripeTestPriceId, quantity: 1}) : isTest ? ({
      price_data: { currency: p.currency, unit_amount: p.price, product_data: { name: p.name } },
      quantity: 1,
    }) : ({ price: p.stripePriceId, quantity: 1 }));

    const allFiles = [product, ...addOns].flatMap((p) =>
      p.file === 'multiple' && p.files ? p.files : [p.file]
    );

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${BASE_URL}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}&product=${product.id}${
        typeof utmCampaign === 'string' && utmCampaign ? `&utm_campaign=${encodeURIComponent(utmCampaign)}` : ''
      }`,
      cancel_url: `${BASE_URL}/recursos`,
      payment_intent_data: { metadata: { productId: product.id, ...attribution } },
      metadata: {
        ...attribution,
        productId: product.id,
        productName: product.name,
        downloadFile: product.file,
        addOnProductIds: addOns.map((p) => p.id).join(',') || '',
        allFiles: allFiles.join(','),
        utmCampaign: typeof utmCampaign === 'string' ? utmCampaign.slice(0, 60) : '',
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
