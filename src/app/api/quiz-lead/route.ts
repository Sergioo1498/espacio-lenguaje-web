import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_LIST_LEADS = 2;

async function sendQuizLeadEmail(
  email: string,
  nombre: string | undefined,
  age: string,
  level: string,
  apiKey: string
) {
  const saludo = nombre ? `Hola ${nombre} 👋` : "Hola 👋";
  const levelLabel =
    level === "verde"
      ? "🟢 Desarrollo en rango"
      : level === "amarillo"
        ? "🟡 Vigilar con atención"
        : "🔴 Recomendable consultar";
  try {
    await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Espacio Lenguaje", email: "hola@espaciolenguaje.com" },
        to: [{ email, name: nombre }],
        subject: "🌱 Tu guía de Hitos del Lenguaje + tu resultado del test",
        htmlContent: `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://www.espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="60" height="60" style="border-radius:50%;" />
  </div>
  <p style="font-size:16px;">${saludo}</p>
  <p>Gracias por hacer el test. Aquí tienes tu <strong>guía de Hitos del Lenguaje 0-6 años</strong> con el plan completo por edad.</p>
  <p style="text-align:center;margin:28px 0;">
    <a href="https://www.espaciolenguaje.com/downloads/guia-hitos-lenguaje-espacio-lenguaje.pdf" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar guía (PDF)</a>
  </p>
  <div style="background:white;border-radius:12px;padding:18px;margin:24px 0;">
    <p style="margin:0 0 6px 0;font-size:13px;color:#6b5a5c;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Tu resultado del test</p>
    <p style="margin:0;font-size:15px;"><strong>Rango de edad evaluado:</strong> ${age}</p>
    <p style="margin:6px 0 0 0;font-size:15px;"><strong>Nivel:</strong> ${levelLabel}</p>
  </div>
  <p style="font-size:14.5px;">Si el resultado es 🔴 o 🟡, recuerda: el test es solo orientativo. <strong>No diagnostica</strong> — pero sí señala si conviene una valoración profesional. Si quieres, escríbeme respondiendo a este email y te oriento sin compromiso.</p>
  <p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>
  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Comunitat Valenciana, España · hola@espaciolenguaje.com</p>
</body></html>`,
      }),
    });
  } catch (err) {
    console.error("Quiz lead email failed:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const nombre =
      typeof body.nombre === "string" && body.nombre.trim() ? body.nombre.trim().slice(0, 80) : undefined;
    const age = typeof body.age === "string" ? body.age.slice(0, 10) : "";
    const score = typeof body.score === "number" ? body.score : 0;
    const total = typeof body.total === "number" ? body.total : 0;
    const level = typeof body.level === "string" ? body.level : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email no válido." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server config error." }, { status: 500 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const attributes: Record<string, string | boolean | number> = {
      FUENTE_LEAD: "quiz-necesita-logopeda",
      FECHA_SUSCRIPCION: today,
      COMPRO_PRODUCTO: false,
      EDAD_HIJO: age,
      INTERESES_TEMA: `quiz-${level}-score-${score}-${total}`,
    };
    if (nombre) attributes.NOMBRE = nombre;

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_LEADS],
        updateEnabled: true,
        attributes,
      }),
    });

    if (res.ok || res.status === 201) {
      await sendQuizLeadEmail(email, nombre, age, level, apiKey);
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);
    if (data?.code === "duplicate_parameter") {
      await sendQuizLeadEmail(email, nombre, age, level, apiKey);
      return NextResponse.json({ success: true });
    }

    console.error("Quiz lead Brevo error:", res.status, data);
    return NextResponse.json({ error: "No se pudo registrar." }, { status: 502 });
  } catch (err) {
    console.error("Quiz lead error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
