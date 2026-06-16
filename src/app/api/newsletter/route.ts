import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_LIST_NEWSLETTER = 4;

// Dominios comunes para detectar typos
const COMMON_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.es", "icloud.com", "live.com", "msn.com"];

function detectEmailTypo(email: string): string | null {
  const parts = email.split("@");
  if (parts.length !== 2) return null;
  const domain = parts[1].toLowerCase();
  if (COMMON_DOMAINS.includes(domain)) return null;
  for (const known of COMMON_DOMAINS) {
    // Levenshtein distance simple
    if (Math.abs(domain.length - known.length) > 2) continue;
    let diffs = 0;
    const maxLen = Math.max(domain.length, known.length);
    for (let i = 0; i < maxLen; i++) {
      if (domain[i] !== known[i]) diffs++;
    }
    if (diffs <= 2) return `${parts[0]}@${known}`;
  }
  return null;
}

async function sendNewsletterWelcome(email: string, nombre: string | undefined, apiKey: string) {
  const saludo = nombre ? `Hola ${nombre} 👋` : "Hola 👋";
  try {
    await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Espacio Lenguaje", email: "hola@espaciolenguaje.com" },
        to: [{ email, name: nombre }],
        subject: "Bienvenida a la newsletter de Espacio Lenguaje 🌱",
        htmlContent: `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://www.espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="60" height="60" style="border-radius:50%;" />
  </div>
  <p style="font-size:16px;">${saludo}</p>
  <p>Gracias por suscribirte a la <strong>newsletter del blog de Espacio Lenguaje</strong>.</p>
  <p>Una vez por semana (los lunes) recibirás:</p>
  <ul style="padding-left:20px;font-size:15px;">
    <li style="margin-bottom:6px;">El artículo nuevo de la semana con un resumen rápido.</li>
    <li style="margin-bottom:6px;">Una idea concreta para aplicar en casa esa misma semana (10 minutos al día).</li>
    <li>De vez en cuando, un recurso descargable gratis que no aparece en la web.</li>
  </ul>
  <p style="font-size:14.5px;">Nada de teoría densa, sin spam, y darte de baja con un click si en algún momento ya no te aporta.</p>
  <p>Mientras tanto, si aún no tienes la guía gratuita de hitos del lenguaje (0-6 años), <a href="https://www.espaciolenguaje.com/lp/guia-gratis" style="color:#C4745A;font-weight:600;">descárgala aquí</a> — incluye señales de alerta por edad y un plan semanal.</p>
  <p>Nos vemos el lunes.</p>
  <p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>
  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Comunitat Valenciana, España · hola@espaciolenguaje.com</p>
</body></html>`,
      }),
    });
  } catch (err) {
    console.error("Newsletter welcome failed:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const nombre =
      typeof body.nombre === "string" && body.nombre.trim() ? body.nombre.trim().slice(0, 80) : undefined;
    const acceptedSuggestion = body.acceptedSuggestion === true;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Por favor, introduce un email válido." }, { status: 400 });
    }

    // Detectar typo común antes de aceptar
    if (!acceptedSuggestion) {
      const suggested = detectEmailTypo(email);
      if (suggested) {
        return NextResponse.json({ suggestion: suggested }, { status: 200 });
      }
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY not configured");
      return NextResponse.json({ error: "Error de configuración del servidor." }, { status: 500 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const attributes: Record<string, string | boolean> = {
      FUENTE_LEAD: "newsletter-blog",
      FECHA_SUSCRIPCION: today,
      COMPRO_PRODUCTO: false,
    };
    if (nombre) attributes.NOMBRE = nombre;

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_NEWSLETTER],
        updateEnabled: true,
        attributes,
      }),
    });

    if (res.ok || res.status === 201) {
      await sendNewsletterWelcome(email, nombre, apiKey);
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);
    if (data?.code === "duplicate_parameter") {
      return NextResponse.json({ success: true });
    }

    console.error("Brevo newsletter error:", res.status, data);
    return NextResponse.json({ error: "No hemos podido registrar tu email." }, { status: 502 });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Error del servidor." }, { status: 500 });
  }
}
