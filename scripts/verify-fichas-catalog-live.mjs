import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const out={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/products-content.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:out});
const result=[];
for(const [id,p] of Object.entries(out.productsContent)){
 const url='https://www.espaciolenguaje.com/recursos/'+id;
 const r=await fetch(url);
 const h=(await r.text()).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
 const claims=[...p.whatYouGet,...p.features.flatMap(f=>[f.title,f.description])];
 result.push({id,url,status:r.status,checkedClaims:claims.length,missing:claims.filter(x=>!h.includes(x))});
}
fs.writeFileSync('drafts/pack-fichas-v4/fase2/catalog-live.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(result.some(x=>x.status!==200||x.missing.length))process.exitCode=1;
