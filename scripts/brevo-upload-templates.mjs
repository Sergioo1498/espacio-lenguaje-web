#!/usr/bin/env node
/**
 * Sube (o actualiza si ya existen) los 5 templates de la secuencia de nurturing a Brevo.
 * Idempotente: busca por templateName, si existe hace PUT, si no POST.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
const apiKey = env.match(/^BREVO_API_KEY="?([^"\n]+)"?/m)?.[1];
if (!apiKey) {
  console.error("BREVO_API_KEY not found in .env.local");
  process.exit(1);
}

const BASE = "https://api.brevo.com/v3";
const H = { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" };

async function req(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: H,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

const SENDER = { name: "Espacio Lenguaje", email: "hola@espaciolenguaje.com" };
const FOOTER = `
  <p style="color:#9a8a8c;font-size:11px;margin-top:24px;">Espacio Lenguaje · Madrid, España · hola@espaciolenguaje.com<br/>
  <a href="{{ unsubscribe }}" style="color:#9a8a8c;">Darme de baja</a></p>`;
const HR = `<hr style="border:none;border-top:1px solid #F5E6D3;margin:28px 0;" />`;
const LOGO_LG = `<div style="text-align:center;margin-bottom:24px;"><img src="https://www.espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%;" /></div>`;
const LOGO_SM = `<div style="text-align:center;margin-bottom:24px;"><img src="https://www.espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="60" height="60" style="border-radius:50%;opacity:0.9;" /></div>`;

const greet = (mid = "") =>
  `{% if contact.NOMBRE %}¡Hola ${mid}{{ contact.NOMBRE }}! 👋{% else %}¡Hola${mid ? ` ${mid.trim()}` : ""}! 👋{% endif %}`;

const wrap = (body) => `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;">
${body}
${FOOTER}
</body>
</html>`;

const templates = [
  {
    name: "nurturing-01-welcome",
    subject: "🌱 Tu guía de Hitos del Lenguaje está aquí",
    html: wrap(`
${LOGO_LG}
<p style="font-size:16px;">${greet()}</p>
<p>Gracias por unirte a la comunidad de <strong>Espacio Lenguaje</strong>.</p>
<p>Aquí tienes tu guía de <strong>Hitos del Lenguaje de 0 a 6 años</strong>:</p>
<p style="text-align:center;margin:28px 0;">
  <a href="https://www.espaciolenguaje.com/descargar-guia" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Descargar guía</a>
</p>
<p style="font-size:13px;color:#6b5a5c;">También puedes descargarla directamente: <a href="https://www.espaciolenguaje.com/downloads/guia-hitos-lenguaje-espacio-lenguaje.pdf" style="color:#C4745A;">enlace al PDF</a></p>
${HR}
<p>En los próximos días te escribiré un par de veces con ideas concretas para aplicar en casa — nada de teoría densa, solo cosas que funcionan de verdad.</p>
<p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>`),
  },
  {
    name: "nurturing-02-narracion-paralela",
    subject: "Lo primero que haría yo en casa esta semana",
    html: wrap(`
${LOGO_SM}
<p style="font-size:16px;">{% if contact.NOMBRE %}¡Hola de nuevo, {{ contact.NOMBRE }}! 👋{% else %}¡Hola de nuevo! 👋{% endif %}</p>
<p>Si has empezado a leer la guía, habrás visto que hablamos de "hitos". Pero los hitos son solo el mapa — lo que de verdad mueve la aguja es <strong>lo que haces cada día en casa</strong>.</p>
<p>Así que hoy te cuento <strong>lo primero que yo recomendaría empezar esta misma semana</strong>, sin material especial, gratis, y que funciona:</p>
<div style="background:white;border-left:4px solid #C4745A;padding:20px 24px;margin:24px 0;border-radius:8px;">
  <p style="margin:0 0 8px 0;font-weight:600;color:#C4745A;">🗣️ La técnica de la narración en paralelo</p>
  <p style="margin:0;font-size:15px;">Mientras tu peque juega, <strong>tú narras en voz alta lo que hace</strong>. "Coges el coche rojo. Ahora el camión. El camión es grande. El coche es pequeño…"</p>
</div>
<p><strong>¿Por qué funciona?</strong> Porque le das vocabulario pegado al contexto real de lo que está mirando. Cada palabra se "fija" a una acción o a un objeto que tiene delante. Y no le pides nada — solo le rodeas de lenguaje útil.</p>
<p><strong>Cuánto al día:</strong> 5 minutos, 2-3 veces al día. Mientras os laváis las manos, durante la merienda, mientras montáis el puzzle.</p>
<p><strong>Qué NO hacer:</strong> evita convertirlo en examen ("¿qué es esto?"). Solo describe. Sin preguntas. Sin correcciones.</p>
<p>Si quieres profundizar, tengo un post entero con 10 técnicas así:</p>
<p style="text-align:center;margin:24px 0;">
  <a href="https://www.espaciolenguaje.com/blog/estimulacion-del-lenguaje-en-casa" style="display:inline-block;background-color:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;">Leer el artículo completo</a>
</p>
${HR}
<p style="font-size:14px;color:#6b5a5c;">En 2 días te escribo con algo importante: las señales que sí debes vigilar por edad (y las que no son alarma aunque lo parezcan).</p>
<p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>`),
  },
  {
    name: "nurturing-03-hitos-edad",
    subject: "¿Tu peque dice estas palabras a los 2 años?",
    html: wrap(`
${LOGO_SM}
<p style="font-size:16px;">${greet()}</p>
<p>Una de las preguntas que más me hacen es: <em>"¿es normal que a los X años todavía no…?"</em></p>
<p>La respuesta casi siempre depende del cuadro completo, pero hay algunas <strong>señales objetivas</strong> que sí merece la pena vigilar. Te dejo un resumen rápido:</p>
<table style="width:100%;border-collapse:collapse;margin:24px 0;background:white;border-radius:8px;overflow:hidden;">
  <tr style="background:#C4745A;color:white;">
    <th style="padding:12px;text-align:left;font-size:14px;">Edad</th>
    <th style="padding:12px;text-align:left;font-size:14px;">Lo esperable</th>
  </tr>
  <tr><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-weight:600;">12 meses</td><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-size:14px;">Dice "mamá", "papá" con intención. Señala lo que quiere.</td></tr>
  <tr style="background:#FDF8F4;"><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-weight:600;">18 meses</td><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-size:14px;">Dice unas 10-20 palabras. Entiende órdenes simples.</td></tr>
  <tr><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-weight:600;">2 años</td><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-size:14px;">Combina 2 palabras ("más agua", "mamá ven"). 50+ palabras.</td></tr>
  <tr style="background:#FDF8F4;"><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-weight:600;">3 años</td><td style="padding:12px;border-bottom:1px solid #F5E6D3;font-size:14px;">Frases de 3+ palabras. Le entienden personas externas.</td></tr>
  <tr><td style="padding:12px;font-weight:600;">4 años</td><td style="padding:12px;font-size:14px;">Cuenta lo que hizo. Frases completas.</td></tr>
</table>
<div style="background:#FFF4E6;border-left:4px solid #E0A852;padding:16px 20px;margin:24px 0;border-radius:8px;font-size:15px;">
  <strong>⚠️ Cuándo SÍ consultar:</strong> si a los 2 años no junta 2 palabras, o a los 3 años sólo tú le entiendes. No es cuestión de correr, pero sí de valorar.
</div>
<p><strong>Lo que NO es alarma aunque lo parezca:</strong></p>
<ul style="padding-left:20px;">
  <li>Que pronuncie mal la <em>R</em> o la <em>S</em> a los 3-4 años (es normal hasta los 5-6).</li>
  <li>Que entienda perfectamente pero hable menos que otros niños de su clase (si tiene intención comunicativa, va bien).</li>
  <li>Que mezcle dos idiomas en casa — el bilingüismo no causa retraso.</li>
</ul>
<p>Si quieres el detalle completo con edades exactas y las señales reales de alerta, tengo este artículo:</p>
<p style="text-align:center;margin:24px 0;">
  <a href="https://www.espaciolenguaje.com/blog/mi-hijo-no-habla-cuando-preocuparse" style="display:inline-block;background-color:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;">Cuándo preocuparse (guía completa)</a>
</p>
${HR}
<p style="font-size:14px;color:#6b5a5c;">En 3 días te cuento algo que he preparado para quienes quieren pasar de la teoría a tener un plan semana a semana.</p>
<p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>`),
  },
  {
    name: "nurturing-04-pitch-pack",
    subject: "El siguiente paso después de la guía",
    html: wrap(`
${LOGO_SM}
<p style="font-size:16px;">${greet()}</p>
<p>Si has leído los dos emails anteriores, probablemente ya has probado algo en casa. Quizás notas que tu peque se engancha más cuando le narras lo que hace, o que empieza a imitar palabras sueltas.</p>
<p>La guía gratuita te dio <strong>el mapa</strong>. Pero muchos padres me escriben con la misma pregunta:</p>
<p style="font-style:italic;color:#6b5a5c;border-left:3px solid #8FAE8B;padding-left:16px;margin:20px 0;">"Vale, ya sé dónde está mi peque en el desarrollo. Pero <strong>qué hago exactamente, día a día, para ayudarle</strong>?"</p>
<p>Para eso preparé el <strong>Pack Completo</strong>.</p>
<div style="background:white;padding:24px;border-radius:12px;margin:24px 0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
  <p style="margin:0 0 12px 0;font-weight:700;font-size:18px;color:#3D2C2E;">Pack Completo: Todo para estimular el lenguaje</p>
  <p style="margin:0 0 16px 0;font-size:14px;color:#6b5a5c;">Todos los recursos que uso con mis familias, en un solo pack.</p>
  <ul style="padding-left:20px;margin:0 0 16px 0;font-size:14px;">
    <li style="margin-bottom:6px;"><strong>Pack de Fichas de Articulación</strong> — 30 fichas imprimibles por fonema</li>
    <li style="margin-bottom:6px;"><strong>Cuaderno de Estimulación 0-3 años</strong> — 20 actividades por edad</li>
    <li style="margin-bottom:6px;"><strong>Cuaderno de Estimulación 3-6 años</strong> — 20 actividades avanzadas</li>
    <li style="margin-bottom:6px;"><strong>Kit de Ejercicios de Soplo</strong> — 15 ejercicios progresivos</li>
    <li><strong>Bonus:</strong> Calendario semanal para organizar la rutina</li>
  </ul>
  <div style="background:#FDF8F4;padding:16px;border-radius:8px;text-align:center;margin:16px 0;">
    <p style="margin:0;font-size:13px;color:#6b5a5c;text-decoration:line-through;">Precio por separado: 20,60 €</p>
    <p style="margin:4px 0 0 0;font-size:28px;font-weight:700;color:#C4745A;">14,90 €</p>
    <p style="margin:2px 0 0 0;font-size:12px;color:#8FAE8B;font-weight:600;">Ahorra 5,70 € (un 27%)</p>
  </div>
  <p style="text-align:center;margin:20px 0 0 0;">
    <a href="https://www.espaciolenguaje.com/recursos/pack-completo" style="display:inline-block;background-color:#C4745A;color:white;padding:14px 36px;border-radius:50px;text-decoration:none;font-weight:600;font-size:16px;">Ver el Pack Completo</a>
  </p>
</div>
<p style="font-size:14px;color:#6b5a5c;">Pago único, descarga inmediata tras la compra. Sin suscripciones ni letra pequeña.</p>
${HR}
<p style="font-size:14px;">Si ahora mismo no es el momento, sin problema — seguiremos enviándote contenido útil. Y si tienes dudas de si encaja con lo que buscas, <a href="mailto:hola@espaciolenguaje.com" style="color:#C4745A;">respóndeme a este email</a> y te cuento.</p>
<p>Un abrazo,<br/><strong>Espacio Lenguaje</strong></p>`),
  },
  {
    name: "nurturing-05-cierre",
    subject: "Una última cosa antes de despedirme",
    html: wrap(`
${LOGO_SM}
<p style="font-size:16px;">${greet()}</p>
<p>Este es el último email de la serie de bienvenida. Después seguiremos en contacto solo cuando tengamos algo realmente útil que contarte — sin inundar tu bandeja.</p>
<p>Antes de cerrar, quería preguntarte algo importante:</p>
<div style="background:white;padding:20px 24px;border-radius:12px;margin:24px 0;border:2px dashed #C4745A;">
  <p style="margin:0;font-size:16px;text-align:center;"><strong>¿Cuál es la mayor duda que tienes ahora mismo sobre el lenguaje de tu peque?</strong></p>
</div>
<p>Dale a <em>responder</em> y cuéntame. Leo todos los emails y respondo personalmente cuando puedo. Tus preguntas son las que inspiran los próximos artículos, guías y recursos.</p>
${HR}
<p style="font-size:15px;color:#6b5a5c;">Y si prefieres ir por tu cuenta con todo el material, el <strong>Pack Completo</strong> sigue con el descuento que te comenté:</p>
<p style="text-align:center;margin:20px 0;">
  <a href="https://www.espaciolenguaje.com/recursos/pack-completo" style="display:inline-block;background-color:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;">Ver el Pack (14,90 €)</a>
</p>
<p>Y también nos puedes encontrar en:</p>
<p style="font-size:14px;">
  <a href="https://instagram.com/espaciolenguaje" style="color:#C4745A;text-decoration:none;font-weight:600;">Instagram @espaciolenguaje</a><br/>
  <a href="https://tiktok.com/@espaciolenguaje" style="color:#C4745A;text-decoration:none;font-weight:600;">TikTok @espaciolenguaje</a>
</p>
${HR}
<p>Gracias por habernos acompañado estos días. Un abrazo grande,<br/><strong>Espacio Lenguaje</strong></p>`),
  },
];

// Fetch existing templates to find IDs by name
console.log("📥", "Consultando templates existentes...");
const existing = await req("GET", "/smtp/templates?limit=200&offset=0&sort=desc");
const byName = new Map();
(existing.data.templates || []).forEach((t) => byName.set(t.name, t.id));

for (const tpl of templates) {
  const existingId = byName.get(tpl.name);
  const payload = {
    templateName: tpl.name,
    subject: tpl.subject,
    sender: SENDER,
    htmlContent: tpl.html,
    isActive: true,
    replyTo: SENDER.email,
  };
  if (existingId) {
    const r = await req("PUT", `/smtp/templates/${existingId}`, payload);
    console.log(
      r.ok ? "  ✓" : "  ✗",
      `actualizado "${tpl.name}" (id=${existingId}) → ${r.status}`
    );
  } else {
    const r = await req("POST", "/smtp/templates", payload);
    console.log(
      r.ok ? "  ✓" : "  ✗",
      `creado "${tpl.name}" → ${r.status} · id=${r.data.id}`
    );
  }
}

console.log("\n📊", "Templates finales:");
const final = await req("GET", "/smtp/templates?limit=200&offset=0&sort=desc");
(final.data.templates || [])
  .filter((t) => t.name?.startsWith("nurturing-"))
  .forEach((t) =>
    console.log(`  [${t.id}] "${t.name}" · active=${t.isActive} · subject="${t.subject}"`)
  );

console.log("\n✅", "Listo.");
