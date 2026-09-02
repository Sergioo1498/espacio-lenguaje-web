import { NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { getProduct } from '@/lib/products';
import type Stripe from 'stripe';

const BREVO_SMTP_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';
const BASE_URL = 'https://www.espaciolenguaje.com';

const BREVO_LIST_LEADS = 2;
const BREVO_LIST_COMPRADORES = 3;

async function upsertCustomerInBrevo(
  email: string,
  productName: string,
  productId: string,
  amountCents: number,
  customerName?: string | null
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured — cannot upsert customer contact');
    return;
  }

  const [firstName, ...rest] = (customerName || '').trim().split(/\s+/);
  const lastName = rest.join(' ');

  const payload = {
    email,
    attributes: {
      COMPRO_PRODUCTO: true,
      ...(firstName && { NOMBRE: firstName }),
      ...(lastName && { APELLIDOS: lastName }),
      ULTIMO_PRODUCTO: productName,
      ULTIMO_PRODUCTO_ID: productId,
      ULTIMO_IMPORTE_EUR: (amountCents / 100).toFixed(2),
      FECHA_ULTIMA_COMPRA: new Date().toISOString().slice(0, 10),
      FUENTE_LEAD: 'compra-stripe',
    },
    listIds: [BREVO_LIST_COMPRADORES],
    unlinkListIds: [BREVO_LIST_LEADS],
    updateEnabled: true,
  };

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Brevo upsert customer failed (${res.status}):`, errorBody);
  } else {
    console.log(`Brevo: customer ${email} marked COMPRO_PRODUCTO=true and moved to list ${BREVO_LIST_COMPRADORES}`);
  }
}

function buildDownloadLinks(productIds: string[]): string {
  const files: string[] = [];
  for (const id of productIds) {
    const product = getProduct(id);
    if (!product) continue;
    if (product.file === 'multiple' && product.files) {
      files.push(...product.files);
    } else if (product.file) {
      files.push(product.file);
    }
  }
  const unique = [...new Set(files)];
  if (unique.length === 0) return '';
  return unique
    .map((f) => {
      const name = f.split('/').pop()?.replace('.pdf', '').replace(/-/g, ' ') || 'Recurso';
      return `<p style="text-align:center;margin:12px 0;"><a href="${BASE_URL}${f}" style="display:inline-block;background-color:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">Descargar: ${name}</a></p>`;
    })
    .join('');
}

async function sendPurchaseEmail(
  email: string,
  productName: string,
  productIds: string[]
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured — cannot send purchase email');
    return;
  }

  const downloadButtons = buildDownloadLinks(productIds);

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

  <p>¡Gracias por confiar en nosotros! Tu recurso <strong>${productName}</strong> ya está listo para descargar.</p>

  ${downloadButtons}

  <div style="background:#FDF8F4;border:1px solid #F5E6D3;border-radius:10px;padding:16px 18px;margin:24px 0;">
    <p style="margin:0 0 6px 0;font-weight:700;font-size:14px;color:#3D2C2E;">🛡️ Garantía de 14 días sin preguntas</p>
    <p style="margin:0;font-size:13px;color:#6b5a5c;line-height:1.55;">Si al abrir el PDF ves que no es lo que esperabas <strong>por la razón que sea</strong> (no era el formato que imaginabas, el contenido no encaja con tu peque, el diseño no te convence...), <strong>respóndeme a este email</strong> con la palabra <strong>"reembolso"</strong> y te devuelvo el importe. Sin formularios, sin preguntas, sin justificarte. Tienes 14 días desde hoy.</p>
  </div>

  <p style="font-size:14px;color:#6b5a5c;">Si tienes cualquier problema con la descarga, dudas sobre cómo usar el recurso, o quieres preguntarme algo sobre tu peque, responde a este email y te leo personalmente.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p style="font-size:14px;">¿Quieres más? Visita nuestros <a href="${BASE_URL}/recursos" style="color:#C4745A;font-weight:600;text-decoration:none;">recursos</a>, lee el <a href="${BASE_URL}/blog" style="color:#C4745A;font-weight:600;text-decoration:none;">blog</a> o haz el <a href="${BASE_URL}/quiz/necesita-logopeda" style="color:#C4745A;font-weight:600;text-decoration:none;">test gratuito</a> para saber si tu peque necesita logopeda.</p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p style="color:#6b5a5c;font-size:14px;">Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>

  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · hola@espaciolenguaje.com<br/>Revisado por logopeda colegiada</p>
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
        const addOnIds = (session.metadata?.addOnProductIds || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const allProductIds = [productId, ...addOnIds];
        const resolvedName =
          addOnIds.length > 0
            ? `${productName || product.name} (+ ${addOnIds.length} extra)`
            : productName || product.name;
        await Promise.allSettled([
          sendPurchaseEmail(email, resolvedName, allProductIds),
          upsertCustomerInBrevo(
            email,
            resolvedName,
            productId,
            session.amount_total || 0,
            session.customer_details?.name
          ),
        ]);
      } else {
        console.error(`Product not found: ${productId}`);
      }
    } else {
      console.error(`Missing data: email=${email}, productId=${productId}`);
    }
  }

  return NextResponse.json({ received: true });
}
