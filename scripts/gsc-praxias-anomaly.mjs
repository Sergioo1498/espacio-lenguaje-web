import fs from 'node:fs';
import {gscQuery} from './_gsc-readonly.mjs';
const result={query:'materiales para trabajar praxias bucofaciales con niños',startDate:'2026-08-31',endDate:'2026-09-27',evidence:[],interpretation:'La posición de GSC no identifica por sí sola un fragmento destacado. No atribuir el cero a imágenes sin datos.'};
for(const type of ['web','image'])for(const dimensions of [[],['page','device','country']]){
 try{const data=await gscQuery({startDate:result.startDate,endDate:result.endDate,type,dimensions,rowLimit:100,dimensionFilterGroups:[{filters:[{dimension:'query',operator:'equals',expression:result.query}]}]});result.evidence.push({type,dimensions,rows:data.rows||[],status:data.rows?.length?'medido':'sin filas devueltas; no equivale a cero medido'});}catch(e){result.evidence.push({type,dimensions,status:'sin acceso',error:e.message});}
 fs.writeFileSync('docs/codex/informes/gsc-praxias-anomaly.json',JSON.stringify(result,null,2));
}
try{const data=await gscQuery({startDate:result.startDate,endDate:result.endDate,type:'web',dimensions:['searchAppearance'],rowLimit:100,dimensionFilterGroups:[{filters:[{dimension:'query',operator:'equals',expression:result.query}]}]});result.evidence.push({type:'web',dimensions:['searchAppearance'],rows:data.rows||[],status:data.rows?.length?'medido':'sin filas; tipo de fragmento no identificado'});}catch(e){result.evidence.push({dimensions:['searchAppearance'],status:'no disponible',error:e.message});}
fs.writeFileSync('docs/codex/informes/gsc-praxias-anomaly.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
