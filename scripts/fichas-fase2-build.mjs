// Aplicación y comprobación acotada de las nueve adiciones aprobadas en fase 2.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {SOURCE_MD, getFichaData} from './_fichas-source.mjs';
const original = execFileSync('git', ['show', '0e7d632:private/productos/_preview/pack-fichas-articulacion-content.md'], {encoding:'utf8'});
const additions = [
  [22,'K','R','ce-rema','crema'], [23,'D','R','de-ragón','dragón'],
  [24,'F','L','fe-lor','flor'], [25,'F','R','fe-resa','fresa'],
  [26,'G','L','ge-lobo','globo'], [27,'G','R','ge-rande','grande'],
  [28,'P','L','pe-lato','plato'], [29,'P','R','pe-rimo','primo'],
  [30,'T','R','te-ren','tren'],
];
let updated = original;
const diff=[];
for(const [num,c,l,error,word] of additions) {
  const before=getFichaData(original,num).posicion;
  const extra=`Articula la ${c} y pasa enseguida a la ${l}, sin meter una vocal en medio. El error más habitual es decir "${error}" en vez de "${word}".`;
  updated=updated.replace(new RegExp(`(## Ficha ${num}\\b[\\s\\S]*?\\*\\*Posición articulatoria\\*\\*: [^\\r\\n]+)`), '$1 '+extra);
  diff.push({ficha:num,palabra:word,campo:'Posición articulatoria',antes:before,añadido:extra});
}
const current=fs.readFileSync(SOURCE_MD,'utf8');
assert.equal(current.replace(/\r\n/g,'\n'), original.replace(/\r\n/g,'\n'), 'La fuente debe ser la aprobada antes de aplicar A2');
for(let n=1;n<=30;n++) {
  const num=String(n).padStart(2,'0');
  const a=getFichaData(original,num),b=getFichaData(updated,num);
  for(const field of Object.keys(a)) assert.equal(b[field],field==='posicion'&&n>=22 ? a[field]+' '+diff[n-22].añadido : a[field]);
}
fs.writeFileSync(SOURCE_MD,updated);
fs.writeFileSync('drafts/pack-fichas-v4/fase2/text-diff.json',JSON.stringify(diff,null,2));
console.log('A2: exactamente nueve adiciones; restantes campos idénticos.');
