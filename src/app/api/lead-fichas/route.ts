import { NextResponse } from "next/server";

/**
 * Alta de lead desde el gate del post de fichas.
 * Misma mecánica que /api/subscribe (lista 2 + email transaccional), cambiando
 * la fuente del lead y añadiendo el atributo PERFIL.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_LIST_ID = 2;
const BASE_URL = "https://www.espaciolenguaje.com";
const PDF_PATH = "/downloads/guia-hitos-lenguaje-espacio-lenguaje.pdf";

async function sendGuideEmail(email: string, nombre: string | undefined, apiKey: string) {
  const saludo = nombre ? `¡Hola ${nombre}! 👋` : "¡Hola! 👋";
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
        subject: "🌱 Tu guía de Hitos del Lenguaje está aquí",
        htmlContent: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="${BASE_URL}/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%;" />
  </div>

  <p style="font-size:16px;">${saludo}</p>

  <p>Aquí tienes tu guía de <strong>Hitos del Lenguaje de 0 a 6 años</strong>, con los hitos esperables por edad y las señales de alerta que conviene vigilar.</p>

  <p style="text-align:center;margin:28px 0;">
    <a href="${BASE_URL}${PDF_PATH}" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar la guía (PDF)</a>
  </p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p>En los próximos días te escribiré un par de veces con ideas concretas para aplicar en casa — nada de teoría densa, solo cosas que funcionan de verdad.</p>

  <p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>

  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · hola@espaciolenguaje.com<br/>Revisado por logopeda colegiada</p>
</body>
</html>`,
      }),
    });
  } catch (err) {
    console.error("Failed to send fichas guide email:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const nombre =
      typeof body.nombre === "string" && body.nombre.trim()
        ? body.nombre.trim().slice(0, 80)
        : undefined;
    const perfil =
      body.perfil === "familia" || body.perfil === "profesional" ? body.perfil : undefined;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Por favor, introduce un email válido." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json({ error: "Error de configuración del servidor." }, { status: 500 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const attributes: Record<string, string | boolean> = {
      FUENTE_LEAD: "fichas-gratis",
      FECHA_SUSCRIPCION: today,
      COMPRO_PRODUCTO: false,
    };
    if (nombre) attributes.NOMBRE = nombre;
    if (perfil) attributes.PERFIL = perfil;

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes,
      }),
    });

    if (res.ok || res.status === 201) {
      await sendGuideEmail(email, nombre, apiKey);
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);
    if (data?.code === "duplicate_parameter") {
      return NextResponse.json({ success: true });
    }

    console.error("Brevo API error:", res.status, data);
    return NextResponse.json(
      { error: "No hemos podido registrar tu email. Inténtalo de nuevo." },
      { status: 502 }
    );
  } catch (err) {
    console.error("lead-fichas error:", err);
    return NextResponse.json({ error: "Error del servidor. Inténtalo de nuevo." }, { status: 500 });
  }
}
