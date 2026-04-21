#!/usr/bin/env node
/**
 * Arquitectura base de Brevo para Espacio Lenguaje.
 * Idempotente: se puede volver a ejecutar sin duplicar nada.
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

const log = (emoji, ...args) => console.log(emoji, ...args);

// --- 1. Folder: renombrar "Your first folder" a "espacio-lenguaje" ---
log("📁", "Folders...");
const folders = await req("GET", "/contacts/folders?limit=20&offset=0");
const defaultFolder = folders.data.folders?.find((f) => f.name === "Your first folder");
const targetFolder = folders.data.folders?.find((f) => f.name === "espacio-lenguaje");
if (targetFolder) {
  log("  ✓", `folder "espacio-lenguaje" ya existe [id=${targetFolder.id}]`);
} else if (defaultFolder) {
  const r = await req("PUT", `/contacts/folders/${defaultFolder.id}`, { name: "espacio-lenguaje" });
  log(r.ok ? "  ✓" : "  ✗", `renombré folder ${defaultFolder.id} → "espacio-lenguaje" (${r.status})`);
} else {
  const r = await req("POST", "/contacts/folders", { name: "espacio-lenguaje" });
  log(r.ok ? "  ✓" : "  ✗", `creé folder "espacio-lenguaje" (${r.status})`, r.data);
}

// Refresh folder id
const foldersAfter = await req("GET", "/contacts/folders?limit=20&offset=0");
const folderId = foldersAfter.data.folders?.find((f) => f.name === "espacio-lenguaje")?.id;

// --- 2. Lista #2 renombrar a "leads-guia-gratis" ---
log("\n📬", "Listas...");
const lists = await req("GET", "/contacts/lists?limit=50&offset=0");
const list2 = lists.data.lists?.find((l) => l.id === 2);
if (list2 && list2.name !== "leads-guia-gratis") {
  const r = await req("PUT", `/contacts/lists/2`, { name: "leads-guia-gratis" });
  log(r.ok ? "  ✓" : "  ✗", `renombré lista #2 "${list2.name}" → "leads-guia-gratis" (${r.status})`);
} else if (list2) {
  log("  ✓", `lista #2 ya se llama "leads-guia-gratis"`);
}

// Crear lista "compradores" si no existe
const compradores = lists.data.lists?.find((l) => l.name === "compradores");
if (compradores) {
  log("  ✓", `lista "compradores" ya existe [id=${compradores.id}]`);
} else {
  const r = await req("POST", "/contacts/lists", { name: "compradores", folderId: folderId || 1 });
  log(r.ok ? "  ✓" : "  ✗", `creé lista "compradores" (${r.status})`, r.data);
}

// Crear lista "newsletter-blog"
const newsletter = lists.data.lists?.find((l) => l.name === "newsletter-blog");
if (newsletter) {
  log("  ✓", `lista "newsletter-blog" ya existe [id=${newsletter.id}]`);
} else {
  const r = await req("POST", "/contacts/lists", { name: "newsletter-blog", folderId: folderId || 1 });
  log(r.ok ? "  ✓" : "  ✗", `creé lista "newsletter-blog" (${r.status})`, r.data);
}

// --- 3. Atributos custom ---
log("\n🏷️", "Atributos custom...");
const attrs = await req("GET", "/contacts/attributes");
const existingAttrs = new Set(attrs.data.attributes?.map((a) => a.name) || []);

const customAttrs = [
  { name: "FUENTE_LEAD", type: "text", category: "normal" },
  { name: "FECHA_SUSCRIPCION", type: "date", category: "normal" },
  { name: "COMPRO_PRODUCTO", type: "boolean", category: "normal" },
  { name: "INTERESES_TEMA", type: "text", category: "normal" },
  { name: "EDAD_HIJO", type: "text", category: "normal" },
];

for (const attr of customAttrs) {
  if (existingAttrs.has(attr.name)) {
    log("  ✓", `atributo ${attr.name} ya existe`);
    continue;
  }
  const r = await req("POST", `/contacts/attributes/${attr.category}/${attr.name}`, { type: attr.type });
  log(r.ok ? "  ✓" : "  ✗", `creé atributo ${attr.name} (${attr.type}) → ${r.status}`);
}

// --- 4. Limpieza de contactos de test ---
log("\n🗑️", "Limpieza contactos de test...");
const toDelete = [
  "sergio.gonzalezt98+brevotest@gmail.com",
  "sergio8cuc@gmail.com",
  "hola@espaciolenguaje.com",
];
for (const email of toDelete) {
  const r = await req("DELETE", `/contacts/${encodeURIComponent(email)}`);
  if (r.ok || r.status === 204) log("  ✓", `borrado ${email}`);
  else if (r.status === 404) log("  ·", `${email} ya no existe (ok)`);
  else log("  ✗", `error borrando ${email} → ${r.status}`, r.data);
}

// --- 5. Etiquetar Ariadna con atributos retroactivos ---
log("\n🏷️", "Etiquetando Ariadna (lead orgánico pre-publicidad)...");
const today = new Date().toISOString().slice(0, 10);
const r = await req("PUT", `/contacts/${encodeURIComponent("ariadna.valleg@aecm.gob.mx")}`, {
  attributes: {
    FUENTE_LEAD: "organico-pre-publicidad",
    FECHA_SUSCRIPCION: "2026-04-21",
    COMPRO_PRODUCTO: false,
  },
});
log(r.ok ? "  ✓" : "  ✗", `actualizada Ariadna → ${r.status}`);

// --- Resumen final ---
log("\n📊", "Estado final:");
const finalFolders = await req("GET", "/contacts/folders?limit=20&offset=0");
finalFolders.data.folders?.forEach((f) => log(`  folder [${f.id}] "${f.name}"`));
const finalLists = await req("GET", "/contacts/lists?limit=50&offset=0");
finalLists.data.lists?.forEach((l) => log(`  lista [${l.id}] "${l.name}" · ${l.totalSubscribers} suscritos`));
const finalAttrs = await req("GET", "/contacts/attributes");
const customOnly = finalAttrs.data.attributes?.filter((a) =>
  ["FUENTE_LEAD", "FECHA_SUSCRIPCION", "COMPRO_PRODUCTO", "INTERESES_TEMA", "EDAD_HIJO"].includes(a.name)
);
customOnly?.forEach((a) => log(`  atributo [${a.name}] tipo=${a.type}`));

log("\n✅", "Arquitectura lista.");
