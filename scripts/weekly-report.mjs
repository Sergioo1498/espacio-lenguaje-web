// Read-only report. Never sends emails, schedules posts or changes contacts.
import fs from 'node:fs';
import path from 'node:path';
import Stripe from 'stripe';
import { gscQuery } from './_gsc-readonly.mjs';
import { madridMidnightEpoch } from './_madrid-time.mjs';
if(fs.existsSync('.env.local')) process.loadEnvFile?.('.env.local');
const arg = name => { const i=process.argv.indexOf(name); return i<0?undefined:process.argv[i+1]; };
const today=arg('--as-of') || new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid'}).format(new Date());
if(!/^\d{4}-\d{2}-\d{2}$/.test(today)) throw new Error('Invalid --as-of');
const shift=(n)=>new Date(Date.parse(today+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
const madrid=value=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid'}).format(new Date(value));
const md=(headers, rows)=>['| '+headers.join(' | ')+' |','| '+headers.map(()=>'---').join(' | ')+' |',...rows.map(row=>'| '+row.map(v=>String(v??'sin dato').replaceAll('|','/')).join(' | ')+' |')].join('\n');
const group=(rows,key)=>Object.entries(rows.reduce((a,r)=>{const k=key(r)||'sin declarar';a[k]=(a[k]||0)+1;return a;},{})).sort((a,b)=>b[1]-a[1]);
const sections=[`# Informe semanal · ${today}\n\nGenerado en modo solo lectura. Brevo y Stripe: ${shift(-7)}–${shift(-1)} (días completos Europe/Madrid). GSC: termina ${shift(-3)} por retraso habitual; no equivale a datos de hoy. AOV = ventas brutas / cobros exitosos; neto antes de comisiones.`];
try {
 const sc={searchanalytics:{query:async({requestBody})=>({data:await gscQuery(requestBody)})}}; const SITE_URL='https://www.espaciolenguaje.com/';
 for(const days of [7,28]) {
  const requestBody={startDate:shift(-days-2),endDate:shift(-3),type:'web'};
  const [totals,pages]=await Promise.all([sc.searchanalytics.query({siteUrl:SITE_URL,requestBody}),sc.searchanalytics.query({siteUrl:SITE_URL,requestBody:{...requestBody,dimensions:['page'],rowLimit:5}})]);
  const format=r=>r?[r.clicks,r.impressions,(r.ctr*100).toFixed(3)+'%',r.position.toFixed(3)]:['sin datos','sin datos','sin datos','sin datos'];
  sections.push(`## 1 · GSC ${days} días (${requestBody.startDate}–${requestBody.endDate})\n\n`+md(['Ámbito','Clics','Impresiones','CTR','Posición'],[['Total',...format(totals.data.rows?.[0])],...(pages.data.rows||[]).map(r=>[r.keys[0],...format(r)])]));
 }
} catch(e) { sections.push('## 1 · GSC\n\nSin acceso: '+e.message); }
try {
 if(!process.env.BREVO_API_KEY) throw new Error('BREVO_API_KEY no disponible');
 let contacts=[];
 for(let offset=0;;offset+=500){const response=await fetch(`https://api.brevo.com/v3/contacts?limit=500&offset=${offset}`,{headers:{'api-key':process.env.BREVO_API_KEY}});if(!response.ok)throw new Error('HTTP '+response.status);const data=await response.json();contacts.push(...data.contacts);if(data.contacts.length<500)break;}
 const leads=contacts.filter(c=>!c.listIds?.includes(7) && (c.listIds?.includes(2)||c.listIds?.includes(4)) && madrid(c.createdAt)>=shift(-7)&&madrid(c.createdAt)<today);
 sections.push('## 2 · Leads nuevos por día\n\n'+md(['Día Madrid','Leads'],group(leads,c=>madrid(c.createdAt))));
 for(const [n,key] of [[3,'FUENTE_LEAD'],[4,'PERFIL'],[5,'ORIGEN_TRAFICO']])sections.push(`## ${n} · Leads por ${key}\n\n`+md([key,'Leads'],group(leads,c=>c.attributes?.[key])));
 sections.push(`Leads de listas 2/4 creados en el período, excluida lista 7: **${leads.length}**. Fuente: createdAt; no fecha de última modificación. Una dimensión sin declarar no se atribuye a directo.`);
}catch(e){sections.push('## 2–5 · Brevo\n\nSin acceso: '+e.message);}
try {
 const key=process.env.STRIPE_SECRET_KEY_LIVE_READONLY || process.env.STRIPE_SECRET_KEY;
 const snapshot=arg('--stripe-snapshot');
 let values;
 if(snapshot){const data=JSON.parse(fs.readFileSync(snapshot,'utf8'));if(data.livemode!==true||data.complete!==true||data.startDate!==shift(-7)||data.endDate!==shift(-1))throw new Error('Snapshot live, completitud o período no válido');values=data;}
 else {
  if(!key||!key.startsWith('sk_live_')&&!key.startsWith('rk_live_'))throw new Error('Solo hay clave Stripe test; falta credencial live de lectura o snapshot verificado');
  const stripe=new Stripe(key,{httpClient:Stripe.createFetchHttpClient()});
  const boundary=madridMidnightEpoch;
  const charges=[];for await(const c of stripe.charges.list({created:{gte:boundary(shift(-7)),lt:boundary(today)},limit:100}))if(c.paid&&c.status==='succeeded')charges.push(c);
  const refunds=[];for await(const r of stripe.refunds.list({created:{gte:boundary(shift(-7)),lt:boundary(today)},limit:100}))if(r.status==='succeeded')refunds.push(r);
  const all=[...charges,...refunds];if(all.some(r=>r.currency!=='eur'))throw new Error('Monedas mixtas: requiere informe por moneda');
  values={sales:charges.length,grossCents:charges.reduce((s,c)=>s+c.amount,0),refunds:refunds.length,refundCents:refunds.reduce((s,r)=>s+r.amount,0)};
 }
 sections.push('## 6 · Stripe live\n\n'+md(['Ventas','Bruto EUR','Devoluciones','Devuelto EUR','Neto EUR','AOV EUR'],[[values.sales,(values.grossCents/100).toFixed(2),values.refunds,(values.refundCents/100).toFixed(2),((values.grossCents-values.refundCents)/100).toFixed(2),values.sales?(values.grossCents/values.sales/100).toFixed(2):'no aplicable (sin ventas)']]));
}catch(e){sections.push('## 6 · Stripe live\n\nSin acceso: '+e.message);}
const csv=arg('--pinterest-csv');
sections.push('## 7 · Pinterest\n\n'+(csv&&fs.existsSync(csv)?`Export aportado: ${csv}.\n\n\`\`\`csv\n${fs.readFileSync(csv,'utf8')}\n\`\`\``:'Sin export CSV de Analytics de Metricool. Los CSV de programación no son métricas. No estimado. Mantener 20 publicaciones/mes y plan gratuito.'));
const output=sections.join('\n\n')+'\n';fs.mkdirSync('docs/informes',{recursive:true});const destination=path.join('docs/informes',`semana-${today}.md`);fs.writeFileSync(destination,output);console.log(output);console.log('Archivo: '+destination);
