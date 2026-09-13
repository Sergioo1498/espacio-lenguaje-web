import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import ts from 'typescript';
import {execFileSync} from 'node:child_process';
const dir='drafts/pack-fichas-v4/fase2';
const readTs=s=>{const exports={};vm.runInNewContext(ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});return exports.productsContent;};
const before=readTs(execFileSync('git',['show','0e7d632:src/lib/products-content.ts'],{encoding:'utf8'}));
const after=readTs(fs.readFileSync('src/lib/products-content.ts','utf8'));
const proofs={
 'fichas-articulacion':'34 páginas; 30 fichas completas; referencias p.33; registro p.34. No hay actividades con frases ni progresión de frases.',
 'cuaderno-0-3':'16 páginas. Actividades 1-20 en cinco bloques por edad; listado de señales de alerta; no hay tabla mensual de hitos ni checklist con casillas. Algunas portadas y actividades se parten entre páginas (PDF no modificado).',
 'cuaderno-3-6':'17 páginas. Actividades 1-20 en cinco bloques; materiales, instrucciones y variaciones. No hay láminas/tarjetas para recortar ni registro por bloques. Algunas portadas y actividades se parten entre páginas (PDF no modificado).',
 'kit-soplo':'31 páginas. Ejercicios 01-15 con imágenes, materiales y edad; tabla de seguimiento semanal y referencias. Hay ejercicios repartidos entre páginas; PDF no modificado.',
 'pack-completo':'98 páginas = 34 + 16 + 17 + 31. src/lib/products.ts entrega cuatro rutas individuales, sin copia del pack ni fichero de calendario bonus. Las dos guías no forman parte de este pack.',
 'guia-dislexia':'20 páginas. Capítulo 4: checklist preescolar/primaria/secundaria; capítulo 8: 10 ejercicios; capítulo 9: informe imprimible para tutor. Sin archivo editable ni registro de ejercicios.',
 'guia-tartamudez':'16 páginas. Tabla comparativa, pautas familiares, ocho actividades y sección para profesores. Sin carta editable ni registro. El PDF contiene el texto «Guía gratuita» (desviación editorial reportada, no se toca).',
};
const cell=s=>s.replace(/\|/g,'/').replace(/\n/g,' ');
let report='# Fase 2 · Pack de Fichas v4 · 13-sep-2026\n\n';
report+='## A · Revisión y fuente\n\n| Punto | Resultado y evidencia |\n|---|---|\n| A1 | Aprobación de Bea sin cambios según el encargo. REVISION_BEA.md y el borrador de fase 1 se conservan como evidencia histórica. |\n| A2/A3 | Nueve adiciones en Posición articulatoria, fichas 22-30. text-diff.json detalla antes y añadido. Comparación DOM del borrador vs generación: portada, introducción y restantes campos idénticos. |\n';
const sourcePath='private/productos/_preview/pack-fichas-articulacion-content.md';
let stripped=fs.readFileSync(sourcePath,'utf8');
for(const d of JSON.parse(fs.readFileSync(dir+'/text-diff.json')))stripped=stripped.replace(' '+d.añadido,'');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const baseline=JSON.parse(fs.readFileSync(dir+'/baseline.json'));
report+=`| Fuente | Antes: ${baseline[sourcePath].sha256}. Después: ${hash(fs.readFileSync(sourcePath))}. Al retirar solo A2: ${hash(stripped)}. Coincide con antes: ${hash(stripped)===baseline[sourcePath].sha256}. |\n`;
report+='\n| Ficha | Campo | Añadido |\n|---|---|---|\n';
for(const d of JSON.parse(fs.readFileSync(dir+'/text-diff.json')))report+=`| ${d.ficha} (${d.palabra}) | ${d.campo} | ${d.añadido} |\n`;
report+='\n## B · PDF y despliegue\n\n| Punto | Evidencia |\n|---|---|\n| Generador | scripts/generate-fichas.mjs (git mv del generador v3). Una sola definición de getFichaData en scripts/_fichas-source.mjs; resto son imports/calls. |\n| Validación | 34 páginas, A4, 30/30 fichas con Edad esperada, Posición articulatoria y Silabario. pdfinfo.txt y pdffonts.txt: cinco fuentes embebidas. Title: Pack de Fichas de Articulación · v4 con pictogramas. |\n| Apertura | PDF leído y renderizado con Poppler; inspección visual de ficha 25 y páginas 33-34 sin cortes ni solapamientos. |\n| Pack Completo | Misma ruta /downloads/productos/pack-fichas-articulacion.pdf. Sin copia independiente. |\n| Checkout/entrega | delivery-check.json: checkout ejecutado con Stripe simulado, sin cobros ni correos; respuesta 200 y enlaces correctos para ambos packs. Clave local sk_test (valor no registrado). Código de checkout/webhook/Stripe y configuración de protección intactos. No se cambia la configuración remota de Stripe. |\n';
const liveBefore=JSON.parse(fs.readFileSync(dir+'/live-before.json'));
report+=`| Antes en producción | HTTP ${liveBefore.status}; Content-Length ${liveBefore.bytes}; sha256 ${liveBefore.sha256}. |\n`;
if(fs.existsSync(dir+'/live-after.json'))for(const f of JSON.parse(fs.readFileSync(dir+'/live-after.json')))report+=`| ${f.name} | HTTP ${f.status}; Content-Length ${f.contentLength}; sha256 ${f.sha256}; coincide local: ${f.localMatches}. |\n`;
report+='| Regresión | Los otros cinco PDF son idénticos antes/después (baseline.json, verification.json, live-after.json). El encargo habla de seis adicionales: hay seis PDF totales y siete productos; el Pack Completo agrupa cuatro, sin PDF propio. No se inventa un séptimo entregable. |\n';
report+='\n### Extracción literal de pdftotext: fichas 1, 15 y 25; páginas 33-34\n\n```text\n'+fs.readFileSync(dir+'/pdf-extracts.txt','utf8')+'\n```\n';
report+='\n## C · Auditoría de los siete productos\n\nValidación: `npx tsc --noEmit` y `npm run build` terminan con exit 0 (65 páginas generadas). `catalog-live.json`: siete HTTP 200 y 102 textos de features/whatYouGet comprobados, sin ausencias.\n\n| Producto | Promesa previa | Realidad | Estado |\n|---|---|---|---|\n';
for(const [id,b] of Object.entries(before))report+=`| ${id} | ${cell(b.whatYouGet.join('; '))} | ${proofs[id]} | Desviación corregida en texto: ${after[id].pageCount} páginas. PDF ajeno a fichas intacto. |\n`;
report+='\n### Comprobación de todas las features y whatYouGet\n\n| Producto | Campo | Antes | Después |\n|---|---|---|---|\n';
for(const [id,b] of Object.entries(before))for(const field of ['features','whatYouGet']){
const format=v=>typeof v==='string'?v:v.title+': '+v.description;
for(let i=0;i<Math.max(b[field].length,after[id][field].length);i++)report+=`| ${id} | ${field}[${i}] | ${cell(b[field][i]?format(b[field][i]):'—')} | ${cell(after[id][field][i]?format(after[id][field][i]):'—')} |\n`;
}
report+='\n## D · Correos\n\nAutorización recibida en esta conversación: Sergio escribió «ok enviar», después de los dos tests. Envíos individuales por POST /v3/smtp/email desde hola@espaciolenguaje.com, sin campañas ni listas. Nuria recibe texto plano literal; Celia/Laura incluyen «hace unos días». Sin adjuntos ni dirección postal. Los dos enlaces de descarga se verificaron otra vez con HTTP 200 y hash local idéntico antes de enviar.\n\n### D4 · Tests previos\n\n| Variante | Destino | HTTP | messageId |\n|---|---|---|---|\n';
for(const r of JSON.parse(fs.readFileSync(dir+'/tests-sent.json')))report+=`| ${r.variant} | ${r.to} | ${r.http} | ${r.result.messageId} |\n`;
const sent=JSON.parse(fs.readFileSync(dir+'/buyers-sent.json'));
const events=JSON.parse(fs.readFileSync(dir+'/buyer-events.json'));
report+='\n### D5 · Compradoras\n\n| Compradora | Destino | HTTP envío | messageId | requests | delivered | opened | clicked | Consulta eventos (UTC) |\n|---|---|---|---|---|---|---|---|---|\n';
for(const r of sent){
 const e=events.find(x=>x.messageId===r.result.messageId),c=e?.counts||{};
 report+=`| ${r.name} | ${r.email} | ${r.http} | ${r.result.messageId} | ${c.requests||0} | ${c.delivered||0} | ${(c.opened||0)+(c.uniqueOpened||0)} | ${c.clicks||c.clicked||0} | ${e?.checkedAt||'sin consulta'} |\n`;
}
report+='\nEvidencia literal: buyers-sent.json y buyer-events.json. Todas las consultas de eventos respondieron HTTP 200. Cero significa que ese evento aún no consta en la consulta; no significa que la persona no haya leído el correo.\n';
const leads=JSON.parse(fs.readFileSync(dir+'/leads-sep03-13.json'));
report+=`\n## E · Leads (solo lectura)\n\nGET /v3/contacts/lists/2/contacts?limit=500&offset=0&sort=asc: HTTP ${leads.pages[0].http}; ${leads.scannedUnique} contactos únicos revisados. Fecha de consulta: ${leads.checkedAt}. Periodo inclusivo 3-13 septiembre en Europe/Madrid: 11 fechas; el día 13 es parcial. Se filtra createdAt de los miembros actuales de la lista (no fecha de incorporación a la lista). Ningún contacto modificado.\n\n| FUENTE_LEAD | Total | Familia | Profesional | Sin dato | Leads/día |\n|---|---|---|---|---|---|\n`;
for(const r of leads.bySource)report+=`| ${r.source} | ${r.total} | ${r.familia} | ${r.profesional} | ${r.sinDato} | ${r.leadsPerDay.toFixed(2)} |\n`;
const sum=field=>leads.bySource.reduce((a,r)=>a+r[field],0);
report+=`| **Total** | **${leads.total}** | **${sum('familia')}** | **${sum('profesional')}** | **${sum('sinDato')}** | **${(leads.total/11).toFixed(2)}** |\n\nEvidencia: leads-sep03-13.json, con conteos por día, valores originales de atributos y metadatos de paginación. No se guardan direcciones de email de los leads.\n`;
report+='\n## Commits\n\n```text\n'+execFileSync('git',['log','--oneline','0e7d632..HEAD'],{encoding:'utf8'})+'```\n';
report+='\nPendientes: ninguno de los bloques A-E. Las desviaciones de otros PDF quedan documentadas y sin modificar, conforme al encargo. Aperturas y clics reflejan únicamente los eventos disponibles al consultar.\n';
fs.writeFileSync(dir+'/INFORME.md',report);
console.log('Informe por bloques y auditoría guardados.');
