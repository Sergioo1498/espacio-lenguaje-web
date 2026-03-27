import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_LIST_ID = 2;

async function sendWelcomeEmail(email: string, apiKey: string) {
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
        to: [{ email }],
        subject: "🌱 Tu guía de Hitos del Lenguaje está aquí",
        htmlContent: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%;" />
  </div>

  <p style="font-size:16px;">¡Hola! 👋</p>

  <p>Gracias por unirte a la comunidad de <strong>Espacio Lenguaje</strong>.</p>

  <p>Aquí tienes tu guía de <strong>Hitos del Lenguaje de 0 a 6 años</strong>:</p>

  <p style="text-align:center;margin:28px 0;">
    <a href="https://espaciolenguaje.com/descargar-guia" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar guía</a>
  </p>

  <p style="font-size:13px;color:#6b5a5c;">También puedes descargarla directamente: <a href="https://espaciolenguaje.com/downloads/guia-hitos-lenguaje-espacio-lenguaje.pdf" style="color:#C4745A;">enlace al PDF</a></p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p>¿Quieres más recursos? Visita nuestro <a href="https://espaciolenguaje.com/blog" style="color:#C4745A;font-weight:600;text-decoration:none;">blog</a> con artículos sobre logopedia infantil.</p>

  <p style="font-size:14px;">Síguenos en redes:<br/>
    <a href="https://instagram.com/espaciolenguaje" style="color:#C4745A;text-decoration:none;font-weight:600;">Instagram @espaciolenguaje</a><br/>
    <a href="https://tiktok.com/@espaciolenguaje" style="color:#C4745A;text-decoration:none;font-weight:600;">TikTok @espaciolenguaje</a>
  </p>

  <hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />

  <p style="color:#6b5a5c;font-size:14px;">Un abrazo,<br/><strong>El equipo de Espacio Lenguaje</strong></p>

  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Madrid, España<br/>hola@espaciolenguaje.com</p>
</body>
</html>`,
      }),
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Por favor, introduce un email válido." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

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
      }),
    });

    if (res.ok || res.status === 201) {
      await sendWelcomeEmail(email, apiKey);
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
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Error del servidor. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
