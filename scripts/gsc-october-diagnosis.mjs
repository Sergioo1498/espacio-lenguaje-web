import fs from 'node:fs';
import {gscQuery} from './_gsc-readonly.mjs';
const SITE_URL='https://www.espaciolenguaje.com/';
const base={startDate:'2026-08-31',endDate:'2026-09-27',type:'web'};
const query=async(extra)=> (await gscQuery({...base,...extra})).rows||[];
const pageFilter=slug=>[{filters:[{dimension:'page',operator:'equals',expression:SITE_URL+'blog/'+slug}]}];
const records={period:base,pages:{}};
for(const slug of ['mi-hijo-no-pronuncia-la-s','ejercicios-de-soplo-para-ninos']){
 const filters=pageFilter(slug);
 const baseline=await query({dimensionFilterGroups:filters});
 const all=await query({dimensions:['query'],rowLimit:25000,dimensionFilterGroups:filters});
 records.pages[slug]={baseline:baseline[0]||null,top20:all.sort((a,b)=>b.impressions-a.impressions).slice(0,20),frontmatter:fs.readFileSync('content/'+slug+'.mdx','utf8').split('---')[1]};
}
fs.writeFileSync('docs/codex/informes/gsc-ctr-baseline.json',JSON.stringify(records,null,2));
console.log('Diagnóstico T4 guardado, consultas por impresiones.');
