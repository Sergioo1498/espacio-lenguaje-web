// Fase 2 D4. Este script solo permite enviar al buzón de test de Sergio.
// Sin modo de envío a compradoras. Ante un intento incierto, revisar eventos; no repetir.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const dir='drafts/pack-fichas-v4/fase2';
const pdf='https://www.espaciolenguaje.com/downloads/productos/pack-fichas-articulacion.pdf';
const kit='https://www.espaciolenguaje.com/downloads/productos/kit-ejercicios-soplo.pdf';
const testEmail='sergio.gonzalezt98+v4test@gmail.com';
const prompt=fs.readFileSync(process.env.FASE2_PROMPT || 'C:/Users/USER/Downloads/PROMPT_CC_PACK_V4_FASE2_SEP2026.md','utf8');
const personal=prompt.match(/```\r?\n(Hola, Nuria:[\s\S]*?)\r?\n```/)[1].replace(/\r\n/g,'\n').replace('{PDF}',pdf).replace('{KIT}',kit);
const standardText=`¡Hola! 👋

Te escribo para pedirte disculpas y para mandarte algo.

Hemos detectado un error nuestro en el Pack de Fichas de Articulación que compraste: por un fallo técnico al generar el PDF, a cada una de las 30 fichas le faltaban tres bloques que sí deberían haber estado ahí:

- La edad esperada de adquisición del fonema.
- La posición articulatoria (dónde va la lengua, qué hacen los labios, si hay vibración).
- El silabario para practicar.

Los pictogramas, las palabras y el resto del material estaban bien. Pero esos tres bloques son justo los que te dicen cómo trabajar cada ficha, así que faltaba una parte importante.

Aquí tienes la versión completa, sin coste y sin que tengas que hacer nada:

${pdf}

Es el mismo pack, con los mismos 30 fonemas y los mismos pictogramas. Hemos recuperado los bloques que faltaban y añadido la página de referencias y una hoja de registro de progreso: ahora tiene 34 páginas, revisadas de nuevo por Bea, nuestra logopeda.

El enlace de tu email de compra también te lleva ya al fichero actualizado.

Gracias por tu confianza, y perdona la molestia. Si tienes cualquier duda —sobre esto o sobre cómo usar las fichas con tu peque— responde a este email y te leo personalmente.

Un abrazo,
Espacio Lenguaje`;
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const standardHtml=text=>`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;color:#3D2C2E;line-height:1.6;max-width:560px;margin:0 auto;padding:24px;background:#FDF8F4;"><div style="text-align:center;margin-bottom:24px"><img src="https://www.espaciolenguaje.com/images/logo-chosen.png" alt="Espacio Lenguaje" width="80" height="80" style="border-radius:50%"></div>${text.split('\n\n').map(p=>p===pdf?`<p style="text-align:center"><a href="${pdf}" style="display:inline-block;background:#C4745A;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold">Descargar el Pack de Fichas completo</a></p>`:`<p>${escape(p).replace(/\n/g,'<br>')}</p>`).join('')}<hr style="border:0;border-top:1px solid #F5E6D3"><p style="text-align:center;font-size:12px">Espacio Lenguaje · hola@espaciolenguaje.com</p></body></html>`;
const standardSubject='Tu Pack de Fichas, ahora sí completo — y una disculpa';
const personalSubject='Nuria, tu Pack de Fichas ahora sí está completo — y una disculpa';
const templates=[{variant:'estandar',subject:standardSubject,textContent:standardText,htmlContent:standardHtml(standardText)},{variant:'personal',subject:personalSubject,textContent:personal}];
fs.writeFileSync(dir+'/email-templates.json',JSON.stringify(templates,null,2));
fs.writeFileSync(dir+'/email-estandar.html',templates[0].htmlContent);
fs.writeFileSync(dir+'/email-personal.txt',personal);
const buyers=[['Sara','saravillamatarranz@gmail.com','estandar'],['Nuria','nuria.millet@gmail.com','personal'],['Celia','celia_543@hotmail.com','reciente'],['Laura','narcela840@gmail.com','reciente']].map(([name,email,variant])=>({name,email,variant,subject:variant==='personal'?personalSubject:standardSubject,textContent:variant==='personal'?personal:variant==='reciente'?standardText.replace('que compraste:','que compraste hace unos días:'):standardText,...(variant!=='personal'?{htmlContent:standardHtml(variant==='reciente'?standardText.replace('que compraste:','que compraste hace unos días:'):standardText)}:{})}));
fs.writeFileSync(dir+'/buyer-drafts-NOT-SENT.json',JSON.stringify(buyers,null,2));
if(!process.argv.includes('--send-tests')){console.log('Plantillas y cuatro borradores preparados. Ningún envío.');process.exit(0);}
assert(process.env.BREVO_API_KEY,'BREVO_API_KEY requerida');
const journal=dir+'/tests-sent.json';
assert(!fs.existsSync(journal),'Ya existe un registro de envío: revisar antes de repetir.');
const localHash=crypto.createHash('sha256').update(fs.readFileSync('public/downloads/productos/pack-fichas-articulacion.pdf')).digest('hex');
for(const url of [pdf,kit]){
 const r=await fetch(url);assert.equal(r.status,200,url);
 if(url===pdf)assert.equal(crypto.createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex'),localHash);
}
const records=[];
for(const {variant,...template} of templates){
 const record={variant,to:testEmail,subject:template.subject,startedAt:new Date().toISOString(),status:'attempting'};
 records.push(record);fs.writeFileSync(journal,JSON.stringify(records,null,2));
 const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':process.env.BREVO_API_KEY,'content-type':'application/json'},body:JSON.stringify({sender:{name:'Espacio Lenguaje',email:'hola@espaciolenguaje.com'},to:[{email:testEmail,name:'Sergio'}],...template,tags:['pack-fichas-v4-fase2-test',variant]})});
 const result=await r.json();Object.assign(record,{http:r.status,result,status:r.ok?'accepted':'failed'});fs.writeFileSync(journal,JSON.stringify(records,null,2));
 assert(r.ok,JSON.stringify(result));console.log(JSON.stringify(record));
}
console.log('PARADA D4: esperando OK enviar. Ningún email a compradoras.');
fs.appendFileSync(dir+'/INFORME.md','\n\n### D4 · Tests enviados\n\n| Variante | Destino | HTTP | messageId |\n|---|---|---|---|\n'+records.map(r=>`| ${r.variant} | ${r.to} | ${r.http} | ${r.result.messageId} |`).join('\n')+'\n\nEstado: esperando «OK enviar». Ningún envío a compradoras. Bloque E pendiente según el orden solicitado.\n');
