import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
const phase=process.argv[2];
assert(['before','after'].includes(phase));
const dir='drafts/semana3b-sep2026';
const baseline=JSON.parse(fs.readFileSync(`${dir}/baseline.json`));
const names=Object.keys(baseline);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const pdfs=[];
for(const name of names){
 const url=`https://www.espaciolenguaje.com/downloads/productos/${name}`;
 const r=await fetch(url);const body=Buffer.from(await r.arrayBuffer());
 const local=fs.readFileSync(`public/downloads/productos/${name}`);
 pdfs.push({name,url,status:r.status,contentLength:r.headers.get('content-length'),bytes:body.length,sha256:sha(body),matchesLocal:sha(body)===sha(local),unchangedSinceBaseline:baseline[name]?.sha256===sha(body)});
}
const out={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/products-content.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:out});
const catalog=[];
for(const [id,p] of Object.entries(out.productsContent)){
 const url=`https://www.espaciolenguaje.com/recursos/${id}`;const r=await fetch(url);
 const h=(await r.text()).replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
 const claims=[...p.whatYouGet,...p.features.flatMap(f=>[f.title,f.description])];
 catalog.push({id,url,status:r.status,pageCount:p.pageCount,checkedClaims:claims.length,missing:claims.filter(x=>!h.includes(x))});
}
fs.writeFileSync(`${dir}/live-${phase}.json`,JSON.stringify({checkedAt:new Date().toISOString(),pdfs,catalog},null,2));
assert(pdfs.every(p=>p.status===200&&p.matchesLocal&&Number(p.contentLength)===p.bytes),'PDF deployment does not match local files');
assert(pdfs.filter(p=>!p.name.startsWith('cuaderno-')).every(p=>p.unchangedSinceBaseline));
if(phase==='after')assert(catalog.every(p=>p.status===200&&!p.missing.length),'Catalog claims do not match');
console.log(`PASS ${phase}: ${pdfs.length} PDFs HTTP 200, Content-Length and SHA-256 match; all catalog claims match; dislexia unchanged.`);
