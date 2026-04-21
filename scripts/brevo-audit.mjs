#!/usr/bin/env node
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
const headers = { "api-key": apiKey, Accept: "application/json" };

async function get(path) {
  const res = await fetch(BASE + path, { headers });
  if (!res.ok) {
    return { _error: res.status, _body: await res.text().catch(() => "") };
  }
  return res.json();
}

const [account, lists, senders, templatesResp, contactsStats, attributes, webhooks, folders] =
  await Promise.all([
    get("/account"),
    get("/contacts/lists?limit=50&offset=0"),
    get("/senders"),
    get("/smtp/templates?limit=50&offset=0"),
    get("/contacts?limit=1&offset=0"),
    get("/contacts/attributes"),
    get("/webhooks"),
    get("/contacts/folders?limit=20&offset=0"),
  ]);

console.log("=== ACCOUNT ===");
console.log({
  email: account.email,
  firstName: account.firstName,
  lastName: account.lastName,
  companyName: account.companyName,
  plan: account.plan?.[0]?.type,
  credits: account.plan?.[0]?.credits,
});

console.log("\n=== SENDERS (remitentes verificados) ===");
if (senders.senders) {
  senders.senders.forEach((s) =>
    console.log(`  [${s.id}] ${s.name} <${s.email}> · verified=${s.active}`)
  );
} else console.log(senders);

console.log("\n=== LISTAS DE CONTACTOS ===");
if (lists.lists) {
  console.log(`Total listas: ${lists.count}`);
  lists.lists.forEach((l) =>
    console.log(
      `  [${l.id}] "${l.name}" · ${l.totalSubscribers} suscritos · ${l.totalBlacklisted} baja · folderId=${l.folderId}`
    )
  );
} else console.log(lists);

console.log("\n=== FOLDERS ===");
if (folders.folders) {
  folders.folders.forEach((f) =>
    console.log(`  [${f.id}] "${f.name}" · ${f.totalSubscribers} contactos · ${f.uniqueSubscribers} únicos`)
  );
} else console.log(folders);

console.log("\n=== CONTACTOS (total) ===");
console.log(`Total contactos en la cuenta: ${contactsStats.count || "?"}`);

console.log("\n=== ATRIBUTOS DE CONTACTO ===");
if (attributes.attributes) {
  attributes.attributes
    .filter((a) => !a.type?.includes("calculated"))
    .forEach((a) =>
      console.log(`  ${a.name} (${a.category}/${a.type || "-"})`)
    );
}

console.log("\n=== TEMPLATES DE EMAIL ===");
if (templatesResp.templates) {
  console.log(`Total templates: ${templatesResp.count}`);
  templatesResp.templates.forEach((t) =>
    console.log(
      `  [${t.id}] "${t.name}" · subject="${t.subject}" · active=${t.isActive} · createdAt=${t.createdAt}`
    )
  );
} else console.log(templatesResp);

console.log("\n=== WEBHOOKS ===");
if (webhooks && Array.isArray(webhooks)) {
  webhooks.forEach((w) => console.log(`  [${w.id}] type=${w.type} url=${w.url} events=${w.events?.join(",")}`));
} else console.log(webhooks);
