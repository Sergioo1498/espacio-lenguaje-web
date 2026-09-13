// Cierre autorizado por Sergio: «ok enviar». Envío individual con diario local.
// Los modos events y leads solo hacen GET. El envío no se repite si hay diario.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const dir='drafts/pack-fichas-v4/fase2';
const journal=dir+'/buyers-sent.json';
const mode=process.argv[2];
const apiKey=process.env.BREVO_API_KEY;
assert(apiKey,'Falta BREVO_API_KEY');
async function get(path){
 const r=await fetch('https://api.brevo.com/v3/'+path,{headers:{'api-key':apiKey,accept:'application/json'}});
 const body=await r.json();assert(r.ok,JSON.stringify({http:r.status,body}));return {http:r.status,body};
}
if(mode==='send'){
 assert.equal(process.argv[3],'--approved-ok-enviar');
 assert(!fs.existsSync(journal),'Existe diario: no repetir envíos; consultar events.');
 const drafts=JSON.parse(fs.readFileSync(dir+'/buyer-drafts-NOT-SENT.json'));
 assert.deepEqual(drafts.map(x=>x.email),['saravillamatarranz@gmail.com','nuria.millet@gmail.com','celia_543@hotmail.com','narcela840@gmail.com']);
 const templates=JSON.parse(fs.readFileSync(dir+'/email-templates.json'));
 assert.equal(drafts[1].textContent,templates[1].textContent);assert(!drafts[1].htmlContent);
 assert.equal(drafts[0].textContent,templates[0].textContent);
 for(const d of drafts.slice(2))assert.equal(d.textContent,templates[0].textContent.replace('que compraste:','que compraste hace unos días:'));
 for(const filename of ['pack-fichas-articulacion.pdf','kit-ejercicios-soplo.pdf']){
  const r=await fetch('https://www.espaciolenguaje.com/downloads/productos/'+filename);assert.equal(r.status,200);
  const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
  assert.equal(hash(Buffer.from(await r.arrayBuffer())),hash(fs.readFileSync('public/downloads/productos/'+filename)));
 }
 const records=[];
 for(const {name,email,variant,subject,textContent,htmlContent} of drafts){
  const record={name,email,variant,subject,approvedBy:'Sergio: ok enviar (mensaje de esta conversación)',startedAt:new Date().toISOString(),status:'attempting'};
  records.push(record);fs.writeFileSync(journal,JSON.stringify(records,null,2));
  const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':apiKey,'content-type':'application/json'},body:JSON.stringify({sender:{name:'Espacio Lenguaje',email:'hola@espaciolenguaje.com'},to:[{name,email}],subject,textContent,...(htmlContent?{htmlContent}:{}),tags:['pack-fichas-v4-fase2',variant]})});
  const result=await r.json();Object.assign(record,{http:r.status,result,status:r.ok?'accepted':'failed'});
  fs.writeFileSync(journal,JSON.stringify(records,null,2));console.log(JSON.stringify(record));
  assert(r.ok,'Envío rechazado; revisar diario antes de continuar.');
 }
} else if(mode==='events'){
 const records=JSON.parse(fs.readFileSync(journal));
 const out=[];
 for(const record of records){
  const events=[];const pages=[];
  for(let offset=0;;offset+=100){
   const query=new URLSearchParams({messageId:record.result.messageId,limit:'100',offset:String(offset),sort:'asc'});
   const {http,body}=await get('smtp/statistics/events?'+query);
   pages.push({http,offset,count:(body.events||[]).length});
   events.push(...(body.events||[]));if((body.events||[]).length<100)break;
  }
  // Filtrar defensivamente por messageId aunque el proveedor ya filtre.
  const relevant=events.filter(e=>e.messageId===record.result.messageId);
  const counts={};for(const e of relevant)counts[e.event]=(counts[e.event]||0)+1;
  out.push({name:record.name,email:record.email,messageId:record.result.messageId,checkedAt:new Date().toISOString(),pages,counts,events:relevant});
 }
 fs.writeFileSync(dir+'/buyer-events.json',JSON.stringify(out,null,2));
 console.log(JSON.stringify(out.map(({events,pages,...r})=>r),null,2));
} else if(mode==='leads'){
 assert(JSON.parse(fs.readFileSync(journal)).every(x=>x.status==='accepted'),'Completar D antes de E');
 const seen=new Set(),selected=[],pages=[],rawSources={},rawProfiles={};
 const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'});
 for(let offset=0;;offset+=500){
  const {http,body}=await get(`contacts/lists/2/contacts?limit=500&offset=${offset}&sort=asc`);
  const contacts=body.contacts||[];pages.push({http,offset,returned:contacts.length,total:body.count});
  for(const c of contacts){
   assert(c.createdAt,'Contacto sin createdAt');
   const key=c.id??c.email;if(seen.has(key))continue;seen.add(key);
   const day=date.format(new Date(c.createdAt));if(day<'2026-09-03'||day>'2026-09-13')continue;
   const rawSource=String(c.attributes?.FUENTE_LEAD||'').trim();
   const rawProfile=String(c.attributes?.PERFIL||'').trim();
   const s=rawSource.toLowerCase(),p=rawProfile.toLowerCase();
   const source=['guia-gratis','fichas-gratis','quiz-necesita-logopeda'].includes(s)?s:'otros';
   const profile=['familia','profesional'].includes(p)?p:'sin dato';
   selected.push({day,source,profile});rawSources[rawSource||'(vacío)']=(rawSources[rawSource||'(vacío)']||0)+1;rawProfiles[rawProfile||'(vacío)']=(rawProfiles[rawProfile||'(vacío)']||0)+1;
  }
  if(contacts.length<500)break;
 }
 const bySource=['guia-gratis','fichas-gratis','quiz-necesita-logopeda','otros'].map(source=>{
  const rows=selected.filter(x=>x.source===source);return {source,total:rows.length,leadsPerDay:rows.length/11,familia:rows.filter(x=>x.profile==='familia').length,profesional:rows.filter(x=>x.profile==='profesional').length,sinDato:rows.filter(x=>x.profile==='sin dato').length};
 });
 const byDay={};for(const r of selected){byDay[r.day]??={};byDay[r.day][r.source]=(byDay[r.day][r.source]||0)+1;}
 const result={checkedAt:new Date().toISOString(),listId:2,from:'2026-09-03',through:'2026-09-13',timeZone:'Europe/Madrid',calendarDays:11,note:'Miembros actuales de lista 2, filtrados por fecha de creación del contacto; 13-sep parcial al momento de consulta. Solo GET. Media por 11 fechas inclusivas.',scannedUnique:seen.size,total:selected.length,pages,rawSources,rawProfiles,bySource,byDay};
 fs.writeFileSync(dir+'/leads-sep03-13.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
} else throw new Error('Modo requerido: send --approved-ok-enviar | events | leads');
