import fs from 'node:fs';
import assert from 'node:assert/strict';
const start=process.argv[2]||'2026-09-17';
assert(/^\d{4}-\d{2}-\d{2}$/.test(start));
const pins=JSON.parse(fs.readFileSync('pinterest/pins.json','utf8'));
const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const csv=rows=>'\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
for(const p of pins){
 if(p.id<=8){p.dayOffset=0;p.time=['10:00','11:00','13:00','15:00','17:00','19:00','20:30','21:30'][p.id-1];}
 else if(p.id<=40){p.dayOffset=1+Math.floor((p.id-9)/4);p.time=['10:00','13:00','17:00','20:00'][(p.id-9)%4];}
 else {p.dayOffset=11+Math.floor((p.id-41)/5)*7+(p.id-41)%5;p.time=(p.id-41)%2===0?'10:00':'19:00';}
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
fs.writeFileSync('pinterest/CALENDARIO.md',`# Calendario de puesta en marcha\n\nInicio acordado: ${start} a las 10:00 Madrid. Día 60 de revisión: 2026-11-16. La confirmación final en Metricool requiere el «OK programar» de Sergio. Este archivo no acredita publicaciones programadas. Horas Europe/Madrid; CSV Pinterest convertido a UTC.\n\nPrimera jornada: 10:00, 11:00, 13:00, 15:00, 17:00, 19:00, 20:30 y 21:30. Del 18 al 25 de septiembre: cuatro al día. Continuidad: lunes a viernes del 28 de septiembre al 23 de octubre.\n\nRevisión semanal: sesiones con utm_source=pinterest, leads con ORIGEN_TRAFICO=pinterest, pines publicados acumulados e impresiones, guardados y clics semanales de Metricool.\n\n| Nº | Tipo | Título | Descripción | Board | Enlace | Fecha Madrid | Imagen |\n|---|---|---|---|---|---|---|---|\n`+pins.map(p=>`| ${p.id} | ${p.type} | ${p.title} | ${p.description} | ${p.board} | [Página con UTM](${p.link}) | ${p.date} ${p.time} | [PNG](${p.imageUrl}) |`).join('\n'));
fs.writeFileSync('pinterest/tabla-60-pines.csv',csv([['Nº','Tipo','Título','Descripción','Board','Enlace','Fecha Madrid','Imagen'],...pins.map(p=>[p.id,p.type,p.title,p.description,p.board,p.link,p.date+' '+p.time,p.imageUrl])]));
console.log('Calendar regenerated with agreed start. Metricool files still require the actual template and final scheduling approval.');
