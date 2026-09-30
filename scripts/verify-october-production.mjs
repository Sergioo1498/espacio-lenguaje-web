import fs from 'node:fs';
const base='https://www.espaciolenguaje.com';
const rows=[];
for(const slug of ['mi-hijo-no-pronuncia-la-s','ejercicios-de-soplo-para-ninos']){
 const url=base+'/blog/'+slug;const r=await fetch(url,{signal:AbortSignal.timeout(25000)});const h=await r.text();
 rows.push({url,http:r.status,title:h.match(/<title>(.*?)<\/title>/)?.[1],meta:h.match(/<meta name="description" content="([^"]+)/)?.[1],h1:h.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]});
}
fs.writeFileSync('docs/codex/informes/ctr-production.json',JSON.stringify(rows,null,2));
const safeguards=[];
for(const route of ['/gracias/r-fuerte','/gracias/praxias','/blog/palabras-y-frases-con-r-fuerte','/blog/fichas-praxias-bucofaciales-imprimir','/downloads/productos/guia-uso-profesional.pdf','/downloads/productos/licencia-profesional.pdf','/downloads/listas-r-fuerte.pdf','/downloads/fichas-praxias.pdf']){
 const r=await fetch(base+route,{signal:AbortSignal.timeout(25000)});safeguards.push({route,http:r.status});await r.body?.cancel();
}
fs.writeFileSync('docs/codex/informes/draft-publication-safeguards.json',JSON.stringify(safeguards,null,2));
console.log(JSON.stringify({rows,safeguards},null,2));
