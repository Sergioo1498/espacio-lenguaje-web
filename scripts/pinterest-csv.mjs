// Export only: pins.json owns the approved Free calendar.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const pins=JSON.parse(fs.readFileSync('pinterest/pins.json','utf8'));
assert.equal(pins.length,60);
const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const csv=rows=>'\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
for(const batch of ['inicial','continuidad']){
 const list=pins.filter(p=>p.batch===batch);
 fs.writeFileSync(`pinterest/pinterest-${batch}-PROPUESTA.csv`,csv([['Title','Media URL','Pinterest board','Description','Link','Publish date','Keywords'],...list.map(p=>[p.title,p.imageUrl,p.board,p.description,p.link,p.publishUTC,p.keywords])]));
}
console.log('Pinterest CSV exports updated from approved dates. Metricool uses metricool-import.csv; do not reimport already scheduled posts.');
