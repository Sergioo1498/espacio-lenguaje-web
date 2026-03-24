import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
const BREVO_LIST_ID = 2;

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

    const res = await fetch(BREVO_API_URL, {
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
      return NextResponse.json({ success: true });
    }

    const data = await res.json().catch(() => null);

    // Contact already exists — not an error
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
