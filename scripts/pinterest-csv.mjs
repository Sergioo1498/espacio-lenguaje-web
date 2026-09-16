import fs from 'node:fs';
import assert from 'node:assert/strict';
const start=process.argv[2]||'2026-09-21';
assert(/^\d{4}-\d{2}-\d{2}$/.test(start));
const pins=JSON.parse(fs.readFileSync('pinterest/pins.json','utf8'));
const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const csv=rows=>'\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
for(const p of pins){
 if(p.id>40)p.dayOffset=14+Math.floor((p.id-41)/5)*7+(p.id-41)%5;
 const d=new Date(`${start}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+p.dayOffset);p.date=d.toISOString().slice(0,10);
 const local=new Date(`${p.date}T${p.time}:00Z`);
 const offset=new Intl.DateTimeFormat('en',{timeZone:'Europe/Madrid',timeZoneName:'shortOffset'}).formatToParts(local).find(v=>v.type==='timeZoneName').value;
 const hours=Number(offset.replace('GMT',''));p.publishUTC=new Date(local.getTime()-hours*3600000).toISOString().slice(0,19);
}
for(const batch of ['inicial','continuidad']){
 const list=pins.filter(p=>p.batch===batch);
 fs.writeFileSync(`pinterest/pinterest-${batch}-PROPUESTA.csv`,csv([['Title','Media URL','Pinterest board','Description','Link','Publish date','Keywords'],...list.map(p=>[p.title,p.imageUrl,p.board,p.description,p.link,p.publishUTC,p.keywords])]));
 // Editorial staging file, not falsely presented as Metricool's exact account template.
 fs.writeFileSync(`pinterest/metricool-${batch}-PENDIENTE-PLANTILLA.csv`,csv([['Text','Date','Time','Draft','Pinterest','Picture Url 1','Pinterest Board','Pinterest Pin Title','Pinterest Pin Link'],...list.map(p=>[p.description,p.date,p.time+':00','TRUE','TRUE',p.imageUrl,p.board,p.title,p.link])]));
}
fs.writeFileSync('pinterest/pins.json',JSON.stringify(pins,null,2));
fs.writeFileSync('pinterest/CALENDARIO.md',`# Calendario propuesto — segundo pase\n\nInicio orientativo: ${start}, pendiente de confirmación. No se ha programado ni publicado nada. Horas Europe/Madrid; CSV Pinterest convertido a UTC, incluido el cambio de hora del 25 de octubre.\n\n| Nº | Tipo | Título | Descripción | Board | Enlace | Fecha Madrid | Imagen |\n|---|---|---|---|---|---|---|---|\n`+pins.map(p=>`| ${p.id} | ${p.type} | ${p.title} | ${p.description} | ${p.board} | [Página con UTM](${p.link}) | ${p.date} ${p.time} | [PNG](${p.imageUrl}) |`).join('\n'));
fs.writeFileSync('pinterest/tabla-60-pines.csv',csv([['Nº','Tipo','Título','Descripción','Board','Enlace','Fecha Madrid','Imagen'],...pins.map(p=>[p.id,p.type,p.title,p.description,p.board,p.link,p.date+' '+p.time,p.imageUrl])]));
console.log('CSV drafts generated. Metricool files require the actual template. Start date is proposed, not confirmed.');
