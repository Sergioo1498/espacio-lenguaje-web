import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const dir='drafts/semana3b-sep2026';
const read=n=>JSON.parse(fs.readFileSync(`${dir}/${n}.json`));
const cell=s=>String(s).replace(/\|/g,'/').replace(/\n/g,'<br>');
const audit=read('text-audit'),baseline=read('baseline');
const live=fs.existsSync(`${dir}/live-after.json`)?read('live-after'):null;
let t='# Semana 3B · septiembre de 2026\n\n';
t+='| Bloque | Estado | Evidencia literal |\n|---|---|---|\n';
t+=`| A · cuadernos | ${live?'Publicado y verificado':'Validado localmente; despliegue pendiente de verificación'} | Commit f3bc7b2. Cuaderno 0–3: 32 páginas; 3–6: 31 páginas; Pack Completo: 5 PDF / 123 páginas. |\n`;
t+='| A1 | 20 actividades por cuaderno, una por página; pasos numerados, cajas Qué desarrolla / Variaciones y Registro con cuatro líneas. | scripts/style-cuadernos.mjs, invocado únicamente para cuadernos desde generate-product-pdfs.mjs. El cuaderno 3–6 muestra solo Materiales, por respuesta expresa de Sergio; conserva «Instrucciones paso a paso». |\n';
t+='| A2 | Índice general añadido; cinco aperturas de bloque por cuaderno con su lista de actividades. | El índice y las listas reproducen literalmente los títulos existentes. Paleta #C4745A / #8FAE8B / #FDF8F4 / #3D2C2E; DM Sans y DM Serif Display. |\n';
t+='| A3 | Diff normalizado vacío en ambos PDF al retirar exclusivamente añadidos autorizados. | text-audit.json y los dos *-text.diff (0 bytes). Renderizadas y revisadas las 63 páginas finales; controles de desbordes y solapamiento con pies vacíos. |\n';
t+='| B | No ejecutado: fecha local 15-sep-2026. El encargo prohíbe hacerlo antes del 16-sep y exige GSC. | ENCARGO.md, reglas fijas y B0. No se cambian title/meta/H1 ni se solicita indexación. |\n';
t+='| C | Pendiente de B para respetar A → B → C → D. | No se añade todavía el evento del quiz ni los tres CTA; no se ha enviado quiztest2. |\n';
t+='| D | Pendiente de los bloques anteriores. | Última comprobación del encargo previo: sin acceso a Analytics/Clarity; no se realiza una nueva lectura ni se estiman métricas. |\n';
t+='\n| PDF | Páginas antes | Páginas después | SHA-256 antes | SHA-256 después | Bytes antes → después |\n|---|---|---|---|---|---|\n';
for(const r of audit)t+=`| ${r.file} | ${r.beforePages} | ${r.afterPages} | ${r.sha256Before} | ${r.sha256After} | ${r.bytesBefore} → ${r.bytesAfter} |\n`;
t+='\n| URL conservada | HTTP antes → después | Content-Length antes → después | SHA-256 final | Idéntico al archivo local | Sin cambios respecto al inicio |\n|---|---|---|---|---|---|\n';
const before=read('live-before');
for(const old of before.pdfs){const p=live?.pdfs.find(p=>p.name===old.name);t+=`| ${old.url} | ${old.status} → ${p?.status??'Pendiente'} | ${old.contentLength} → ${p?.contentLength??'Pendiente'} | ${p?.sha256??'Pendiente'} | ${p?.matchesLocal??'Pendiente'} | ${p?.unchangedSinceBaseline??'Pendiente'} |\n`;}
t+='\n| Catálogo | pageCount | whatYouGet / features |\n|---|---|---|\n| cuaderno-0-3 | 32 | PDF de 32 páginas en A4 |\n| cuaderno-3-6 | 31 | PDF de 31 páginas |\n| pack-completo | 123 | 5 PDFs (123 páginas totales); features de cuadernos: 32 y 31 páginas |\n';
t+='\n| Líneas añadidas (lista exhaustiva) | Tipo | Texto literal |\n|---|---|---|\n';
for(const r of audit){let n=0;for(const addition of r.removedAdditions)for(const line of addition.text.split('\n').filter(s=>s.trim()))t+=`| ${r.file} · ${++n} | ${addition.kind} | ${cell(line)} |\n`;}
t+='\n| Verificación | Resultado |\n|---|---|\n| Método de diff | pdftotext por defecto; solo se normalizan espacios/saltos. Se retiran exactamente las cadenas añadidas registradas en *-layout.json; el índice incluye su propio pie. No se eliminan palabras ni guiones originales. |\n| Referencias | Se conserva el ancho previo de la página de referencias: evita que un salto en Evidence-based cambie la extracción de pdftotext. Fuente original intacta. |\n| Revisión visual | Todas las páginas: cuaderno0 1–32 y cuaderno3 1–31; cuatro planchas en tmp/pdfs/semana3b. Inspección adicional de actividad 14 del 0–3 a 1200 px. Sin desbordes, títulos huérfanos ni cortes en cajas. |\n| TypeScript / diff Git | npx tsc --noEmit y git diff --check: exit 0. |\n| PDF no modificados | Cinco: fichas, kit de soplo, dislexia, tartamudez y calendario. El prompt dice cuatro; se verifica además el calendario incorporado en el encargo anterior. |\n';
t+='\n| Archivo preservado | SHA-256 en 00f457f | SHA-256 actual (blob Git) | Idéntico |\n|---|---|---|---|\n';
for(const path of ['private/productos/_preview/cuaderno-0-3-content.md','private/productos/_preview/cuaderno-3-6-content.md','src/lib/products.ts','src/app/api/checkout/route.ts','src/app/api/webhooks/stripe/route.ts','src/lib/stripe.ts','next.config.ts','vercel.json']){
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');const a=hash(execFileSync('git',['show',`00f457f:${path}`]));const b=hash(execFileSync('git',['show',`HEAD:${path}`]));t+=`| ${path} | ${a} | ${b} | ${a===b} |\n`;
}
t+='\n| B · dato exigido | Estado |\n|---|---|\n| Gate, línea base 3–30 ago | Proporcionada por Sergio: 102 clics · 831 impresiones · CTR 12,27 % · posición 11,7. Aún no contrastada en GSC. |\n| Gate, lectura 2–15 sep | Pendiente: no consultar ni ejecutar B antes del 16-sep. |\n| Línea base 28d de las tres URLs | Pendiente de GSC antes de retitular. |\n| Títulos/metas antiguos y nuevos | Pendiente; ningún cambio realizado en B. |\n';
t+='\n| Commit | Cambio |\n|---|---|\n';
for(const l of execFileSync('git',['log','--format=%h|%s','00f457f..HEAD'],{encoding:'utf8'}).trim().split('\n').reverse()){const [h,...s]=l.split('|');t+=`| ${h} | ${cell(s.join('|'))} |\n`;}
t+='\nPendientes: B a partir del 16-sep con GSC; después C y D, en ese orden. No hay envíos a compradoras o listas reales en este encargo.\n';
fs.writeFileSync(`${dir}/INFORME.md`,t);console.log('Informe de semana 3B guardado.');
