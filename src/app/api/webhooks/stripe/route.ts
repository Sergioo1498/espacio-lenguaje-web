import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getProduct } from '@/lib/products';
import Stripe from 'stripe';

const BREVO_SMTP_URL = 'https://api.brevo.com/v3/smtp/email';

async function sendPurchaseEmail(
  email: string,
  productName: string,
  downloadUrl: string
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  try {
    await fetch(BREVO_SMTP_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Espacio Lenguaje',
          email: 'hola@espaciolenguaje.com',
        },
        to: [{ email }],
        subject: 'Tu recurso de Espacio Lenguaje está listo 🌱',
        htmlContent: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%;" />
  </div>

  <p style="font-size:16px;">¡Hola! 👋</p>

  <p>¡Gracias por tu compra! Tu recurso <strong>${productName}</strong> ya está listo para descargar.</p>

  <p style="text-align:center;margin:28px 0;">
    <a href="${downloadUrl}" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar ahora</a>
  </p>

  <p style="font-size:13px;color:#6b5a5c;">Si tienes algún problema con la descarga, responde a este email y te ayudaremos encantados.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p>¿Quieres más recursos? Visita nuestra <a href="https://espaciolenguaje.com/recursos" style="color:#C4745A;font-weight:600;text-decoration:none;">tienda</a> o nuestro <a href="https://espaciolenguaje.com/blog" style="color:#C4745A;font-weight:600;text-decoration:none;">blog</a>.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p style="color:#6b5a5c;font-size:14px;">Un abrazo,<br/><strong>El equipo de Espacio Lenguaje</strong></p>

  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Madrid, España<br/>hola@espaciolenguaje.com</p>
</body>
</html>`,
      }),
    });
  } catch (err) {
    console.error('Failed to send purchase email:', err);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const email = session.customer_details?.email;

    if (productId && email) {
      const product = getProduct(productId);
      if (product) {
        const baseUrl =
          process.env.NEXT_PUBLIC_URL || 'https://espaciolenguaje.com';
        const downloadUrl =
          product.file === 'multiple'
            ? `${baseUrl}/compra-exitosa?session_id=${session.id}`
            : `${baseUrl}${product.file}`;

        await sendPurchaseEmail(email, product.name, downloadUrl);
      }
    }

    console.log(
      `Payment succeeded: ${email} purchased ${productId} (${session.amount_total}c)`
    );
  }

  return NextResponse.json({ received: true });
}
