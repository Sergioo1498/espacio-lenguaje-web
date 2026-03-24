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
        subject: "¡Bienvenid@ a Espacio Lenguaje! 🌱",
        htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="font-family: system-ui, -apple-system, sans-serif; color: #3D2C2E; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="font-size: 20px; font-weight: bold; color: #3D2C2E;">espacio</span><span style="font-size: 20px; color: #C4745A;">lenguaje</span>
  </div>

  <p style="font-size: 16px;">¡Hola! 👋</p>

  <p>Gracias por unirte a la comunidad de <strong>Espacio Lenguaje</strong>.</p>

  <p>Estamos preparando la <strong>Guía de Hitos del Lenguaje de 0 a 6 años</strong>. Te la enviaremos a este email en cuanto esté lista.</p>

  <p>Mientras tanto, puedes visitar nuestro blog con artículos sobre logopedia infantil:</p>

  <p style="text-align: center; margin: 24px 0;">
    <a href="https://espaciolenguaje.com/blog" style="display: inline-block; background-color: #C4745A; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px;">Visitar el blog</a>
  </p>

  <p>También puedes seguirnos en Instagram para consejos diarios:</p>
  <p style="text-align: center;">
    <a href="https://instagram.com/espaciolenguaje" style="color: #C4745A; text-decoration: none; font-weight: 600;">@espaciolenguaje</a>
  </p>

  <hr style="border: none; border-top: 1px solid #F5E6D3; margin: 32px 0;" />

  <p style="color: #6b5a5c; font-size: 14px;">Un abrazo,<br /><strong>El equipo de Espacio Lenguaje</strong></p>
</body>
</html>`,
      }),
    });
  } catch (err) {
    // Don't fail the subscription if welcome email fails
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
      // New contact created — send welcome email
      await sendWelcomeEmail(email, apiKey);
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);

    // Contact already exists — not an error, but don't send welcome email again
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
