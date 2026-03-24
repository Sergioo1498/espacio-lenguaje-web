import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const subject =
      typeof body.subject === "string" ? body.subject.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 },
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Por favor, introduce un email válido." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 500 },
      );
    }

    const res = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Espacio Lenguaje Web",
          email: "hola@espaciolenguaje.com",
        },
        to: [{ email: "hola@espaciolenguaje.com", name: "Espacio Lenguaje" }],
        replyTo: { email, name },
        subject: `[Web] ${subject}`,
        htmlContent: `
          <h2>Nuevo mensaje desde la web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      }),
    });

    if (res.ok || res.status === 201) {
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);
    console.error("Brevo SMTP error:", res.status, data);
    return NextResponse.json(
      { error: "No hemos podido enviar tu mensaje. Inténtalo de nuevo." },
      { status: 502 },
    );
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json(
      { error: "Error del servidor. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
