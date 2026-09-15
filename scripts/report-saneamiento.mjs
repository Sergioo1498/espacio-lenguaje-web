import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const dir='drafts/saneamiento-sep2026';
const read=n=>JSON.parse(fs.readFileSync(`${dir}/${n}.json`));
const cell=x=>String(x).replace(/\|/g,'/').replace(/\n/g,' ');
let text='# Saneamiento del catálogo · septiembre de 2026\n\n';
text+='| Bloque | Resultado | Evidencia |\n|---|---|---|\n';
text+='| A1 | 55 actividades/ejercicios completos, cada uno en una página; introducciones de bloque en página nueva. Texto normalizado idéntico. | layout-audit.json, cinco *-text.diff vacíos. Renderizadas y revisadas las 136 páginas de los cinco PDF modificados. |\n';
text+='| A2 | Una sustitución: «Guía gratuita» → «Guía de Tartamudez Infantil». | guia-tartamudez-before.txt / -after.txt. No se modifica el resto del contenido ni su maquetación. |\n';
text+='| A3 | Retirado «· v4 con pictogramas» de la portada; Title conserva v4. | pack-fichas-articulacion-text.diff vacío tras esa única eliminación esperada. |\n';
text+='| A4 | Frase literal restaurada en landing kit y features[3] del Pack Completo: «Enfoque de control respiratorio y consciencia oral, no de mejora articulatoria». | src/lib/products-content.ts y live-A.json. |\n';
text+='| A5 | URLs conservadas, HTTP 200, Content-Length y SHA-256 verificados. Dislexia idéntica. Pack: 120 páginas antes del bonus. | live-before.json, live-A.json. |\n';
text+='| B | Calendario de una página A4 con logo, tipografías DM Sans/DM Serif, tabla lunes-domingo y campos pedidos. Pack: 5 PDF / 121 páginas. | calendario-text.txt, live-B.json, delivery-B.json. Siete checkouts simulados sin red/cobros/correos; los otros seis productos idénticos. |\n';
if(fs.existsSync(`${dir}/quiz-created.json`)){
 const q=read('quiz-created').result.data;const events=read('quiz-events').result.data.events;
 text+=`| C1 · quiz | Alta en lista ${q.listIds.join(',')}; FUENTE_LEAD=${q.attributes.FUENTE_LEAD}; EDAD_HIJO=${q.attributes.EDAD_HIJO}; INTERESES_TEMA=${q.attributes.INTERESES_TEMA}. Prueba en navegador: siete respuestas Sí; resultado amarillo 3/7; «¡Guía enviada! 🌱». | quiz-created.json; quiz-events.json: ${events.map(e=>e.event).join(', ')}; quiz-cleanup.json: lista final [7]. Circuito funcional; código del quiz intacto. |\n`;
}
if(fs.existsSync(`${dir}/perfil-blog-created.json`))text+='| C2 · perfil | Selector opcional Familia/Profesional en /lp/guia-gratis y formulario del blog; misma interacción y estilos que FichasGate. | test-perfil-forms.mjs: guarda ambos valores; omitir/valor inválido conserva el anterior. Pruebas reales: perfil-lp-created.json y perfil-blog-created.json; limpieza en lista 7. |\n';
text+='| C1/C3 · métricas | Pendiente de acceso. Vercel muestra 404 con hola@espaciolenguaje.com en el proyecto sergioo1498s-projects/espacio-lenguaje-web. Clarity muestra «Iniciar sesión». | No se sustituyen métricas ausentes por ceros. Acceso solicitado en la conversación. |\n';
text+='\n| Archivo | Páginas antes → después | Cambio de texto permitido | Diff normalizado |\n|---|---|---|---|\n';
for(const r of read('layout-audit'))text+=`| ${r.file} | ${r.beforePages} → ${r.afterPages} | ${r.allowedChange} | ${r.normalizedTextDiffEmpty?'Vacío':'REVISAR'} |\n`;
text+='| guia-dislexia.pdf | 20 → 20 | Ninguno | Archivo idéntico |\n| calendario-semanal.pdf | Nuevo → 1 | Plantilla solicitada, sin contenido clínico añadido | Texto en calendario-text.txt |\n| Pack Completo | 98 → 120 (A) → 121 (B) | 34 + 31 + 30 + 25 + 1 | Cinco archivos |\n';
text+='\n| Archivo | SHA-256 antes | SHA-256 final | HTTP | Content-Length final |\n|---|---|---|---|---|\n';
const latest=fs.existsSync(`${dir}/live-C.json`)?read('live-C'):read('live-B');
const baseline=read('baseline');
for(const p of latest.pdfs)text+=`| ${p.name} | ${baseline[p.name]?.sha256||'Nuevo'} | ${p.sha256} | ${p.status} | ${p.contentLength} |\n`;
text+='\n| Recurso | Actividad | Página anterior (Y, pt) | Empezaba a media página (Y > 100 pt) | Página final (Y, pt) |\n|---|---|---|---|---|\n';
for(const r of read('layout-audit'))for(const a of r.activities||[])text+=`| ${r.file} | ${a.number} | ${a.before.page} (${a.before.yPt}) | ${a.startedMidPageBefore?'Sí':'No'} | ${a.after.page} (${a.after.yPt}) |\n`;
text+='\n| Prueba | Email | Alta | Atributos | Estado final |\n|---|---|---|---|---|\n';
for(const [label,created,cleanup] of [['Quiz','quiz-created','quiz-cleanup'],['Landing','perfil-lp-created','perfil-lp-cleanup'],['Blog','perfil-blog-created','perfil-blog-cleanup']]){
 if(!fs.existsSync(`${dir}/${created}.json`))continue;
 const c=read(created),a=c.result.data;const clean=fs.existsSync(`${dir}/${cleanup}.json`)?read(cleanup):null;
 text+=`| ${label} | ${c.email} | HTTP ${c.result.http}; listas ${JSON.stringify(a.listIds)} | ${cell(JSON.stringify(a.attributes))} | ${clean?'PUT '+clean.result.update.http+'; GET '+clean.result.after.http+'; listas '+JSON.stringify(clean.result.after.data.listIds):'Pendiente'} |\n`;
}
text+='\n| Email | messageId | Evento | Fecha |\n|---|---|---|---|\n';
for(const f of ['quiz-events','perfil-events'])if(fs.existsSync(`${dir}/${f}.json`))for(const e of read(f).result.data.events)text+=`| ${e.email} | ${cell(e.messageId)} | ${e.event} | ${e.date} |\n`;
text+='\n| Periodo | Métrica solicitada | Valor | Estado / filtro |\n|---|---|---|---|\n';
for(const [period,metric,filter] of [
 ['Últimos 30 días','Pageviews quiz','/quiz/necesita-logopeda'],['Últimos 30 días','Eventos lead quiz','fuente=quiz-necesita-logopeda; el QuizClient actual no llama a track(lead)'],
 ['3–13 septiembre','Pageviews del artículo con gate','/blog/fichas-logopedia-gratis-imprimir'],['3–13 septiembre','Eventos lead','fuente=fichas-gratis'],['3–13 septiembre','Eventos descarga_pdf','recurso=muestra-fichas-r'],['3–13 septiembre','Eventos inicio_checkout','campana / utm tripwire-fichas*'],['3–13 septiembre','Tasa opt-in','leads/pageviews'],['3–13 septiembre','Tasa de descarga','descargas/leads'],['3–13 septiembre','Scroll Clarity','Porcentaje de usuarios que llega al gate'],
 ])text+=`| ${period} | ${metric} | No disponible | ${filter}; requiere acceso al panel |\n`;
text+='\n| Protección / alcance | SHA-256 antes | SHA-256 después | Estado |\n|---|---|---|---|\n';
for(const file of ['src/app/api/checkout/route.ts','src/app/api/webhooks/stripe/route.ts','src/lib/stripe.ts','next.config.ts','vercel.json']){
 if(!fs.existsSync(file))continue;
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 const a=hash(execFileSync('git',['show',`65c3755:${file}`]));
 // Git normalizes line endings: compare repository blobs, not CRLF working copies.
 const b=hash(execFileSync('git',['show',`HEAD:${file}`]));
 text+=`| ${file} | ${a} | ${b} | ${a===b?'Idéntico':'CAMBIADO'} |\n`;
}
text+='\n| Validación | Resultado |\n|---|---|\n| Texto | pdftotext por defecto, normalización exclusiva de espacios/saltos. Kit: el orden de lectura por defecto se mantiene; no se usa -raw para la comparación. |\n| Maquetación | 31 + 30 + 25 + 16 + 34 páginas renderizadas, además del calendario (1). Contact sheets inspeccionadas en tmp/pdfs/saneamiento. Cuaderno 3-6: corregidos dos títulos huérfanos y vuelto a renderizar entero. |\n| Tartamudez | Conserva los cortes de maquetación preexistentes; A2 autoriza únicamente sustituir la etiqueta. |\n| Checkout | Stripe simulado; siete productos; ningún cobro o email. Los otros seis productos conservan su hash de configuración. |\n| Formularios | Test previo falló por PERFIL ausente; tras el cambio, pasa para familia/profesional/omitido/inválido. |\n| Comunicaciones | Solo las dos direcciones de prueba autorizadas. Ningún nuevo correo a compradores, campañas ni listas. |\n';
text+='\n| Compilación y despliegue | Resultado |\n|---|---|\n| npx tsc --noEmit | Exit 0 tras A, B y C. |\n| npm run build | Exit 0; 65/65 páginas generadas. |\n| Producción A | 6316103; dpl_3qvqkJf5xo3jXPP8hXRDjzwwPQVB; Ready; live-A.json verificado antes de B. |\n| Producción B | a1136b7; espacio-lenguaje-l8m78qdcw-sergioo1498s-projects.vercel.app; Ready; live-B.json verificado antes de C. |\n| Producción C | bf977a8; dpl_6pNfQEmdstutnBdzTvb8w7saUsBx; Ready; live-C.json, E2E en producción y browser-checks.json. |\n';
text+='\n| Commit | Cambio |\n|---|---|\n';
for(const line of execFileSync('git',['log','--format=%h|%s','65c3755..HEAD'],{encoding:'utf8'}).trim().split('\n').reverse()){const [h,...s]=line.split('|');text+=`| ${h} | ${cell(s.join('|'))} |\n`;}
text+='\nDocumentación de las operaciones de verificación y limpieza: [actualizar un contacto](https://developers.brevo.com/reference/update-contact) y [eventos transaccionales](https://developers.brevo.com/reference/get-email-event-report).\n';
fs.writeFileSync(`${dir}/INFORME.md`,text);console.log('Informe y tablas guardados.');
