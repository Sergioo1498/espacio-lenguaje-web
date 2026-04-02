import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getProduct } from '@/lib/products';
import type Stripe from 'stripe';

const BREVO_SMTP_URL = 'https://api.brevo.com/v3/smtp/email';
const BASE_URL = 'https://www.espaciolenguaje.com';

function buildDownloadLinks(productId: string): string {
  const product = getProduct(productId);
  if (!product) return '';

  if (product.file === 'multiple' && product.files) {
    return product.files
      .map((f) => {
        const name = f.split('/').pop()?.replace('.pdf', '').replace(/-/g, ' ') || 'Recurso';
        return `<p style="text-align:center;margin:12px 0;"><a href="${BASE_URL}${f}" style="display:inline-block;background-color:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">Descargar: ${name}</a></p>`;
      })
      .join('');
  }

  return `<p style="text-align:center;margin:28px 0;"><a href="${BASE_URL}${product.file}" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar ahora</a></p>`;
}

async function sendPurchaseEmail(
  email: string,
  productName: string,
  productId: string
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured — cannot send purchase email');
    return;
  }

  const downloadButtons = buildDownloadLinks(productId);

  const res = await fetch(BREVO_SMTP_URL, {
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
      subject: `Tu recurso "${productName}" está listo 🌱`,
      htmlContent: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="${BASE_URL}/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%;" />
  </div>

  <p style="font-size:16px;">¡Hola! 👋</p>

  <p>¡Gracias por tu compra! Tu recurso <strong>${productName}</strong> ya está listo para descargar.</p>

  ${downloadButtons}

  <p style="font-size:13px;color:#6b5a5c;">Si tienes algún problema con la descarga, responde a este email y te ayudaremos encantados.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p>¿Quieres más recursos? Visita nuestra <a href="${BASE_URL}/recursos" style="color:#C4745A;font-weight:600;text-decoration:none;">tienda</a> o nuestro <a href="${BASE_URL}/blog" style="color:#C4745A;font-weight:600;text-decoration:none;">blog</a>.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p style="color:#6b5a5c;font-size:14px;">Un abrazo,<br/><strong>El equipo de Espacio Lenguaje</strong></p>

  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Madrid, España<br/>hola@espaciolenguaje.com</p>
</body>
</html>`,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Brevo email failed (${res.status}):`, errorBody);
  } else {
    console.log(`Purchase email sent to ${email} for ${productName}`);
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('Webhook: missing stripe-signature header');
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

  console.log(`Stripe webhook received: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const productName = session.metadata?.productName;
    const email = session.customer_details?.email;

    console.log(`Checkout completed: email=${email}, productId=${productId}, amount=${session.amount_total}c`);

    if (productId && email) {
      const product = getProduct(productId);
      if (product) {
        await sendPurchaseEmail(email, productName || product.name, productId);
      } else {
        console.error(`Product not found: ${productId}`);
      }
    } else {
      console.error(`Missing data: email=${email}, productId=${productId}`);
    }
  }

  return NextResponse.json({ received: true });
}
