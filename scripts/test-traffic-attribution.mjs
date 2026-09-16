import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
let now=Date.now(), saved=null;
const window={location:{search:'?utm_source=pinterest&utm_medium=social&utm_campaign=test'},localStorage:{getItem:()=>saved,setItem:(k,v)=>{saved=v;}}};
const helper={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/traffic-attribution.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:helper,window,URLSearchParams,Date:{now:()=>now}});
assert.equal(helper.getTrafficAttribution().utm_source,'pinterest');
window.location.search='?utm_source=other&utm_campaign=second';
assert.equal(helper.getTrafficAttribution().utm_campaign,'test');
now+=31*86400000;
assert.equal(helper.getTrafficAttribution().utm_source,'other');
saved=null;window.location.search='';assert.equal(Object.keys(helper.getTrafficAttribution()).length,0);
window.location.search='?utm_source=pinterest';assert.equal(Object.keys(helper.getTrafficAttribution()).length,0);
saved='bad JSON';assert.equal(helper.getTrafficAttribution().utm_source,'pinterest');
window.localStorage.getItem=()=>{throw Error('blocked');};window.localStorage.setItem=()=>{throw Error('blocked');};
assert.equal(helper.getTrafficAttribution().utm_source,'pinterest');
assert.equal(Object.keys(helper.trafficAttributes({utm_source:['bad'],utm_campaign:'<script>'})).length,0);
console.log('PASS first visit, 30-day expiry, no UTM, malformed/blocked storage, input validation.');
for(const route of ['subscribe','newsletter','lead-fichas','quiz-lead']) {
 let contact;
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(`src/app/api/${route}/route.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{
  exports,console,process:{env:{BREVO_API_KEY:'mock'}},
  require:name=>name.includes('traffic-attribution')?helper:{NextResponse:{json:(body,opts)=>({body,status:opts?.status||200})}},
  fetch:async(url,opts)=>{if(url.endsWith('/contacts'))contact=JSON.parse(opts.body);return {ok:true,status:201,json:async()=>({})};},
 });
 for(const attribution of [{utm_source:'pinterest',utm_medium:'social',utm_campaign:'test'},undefined,{utm_source:'<bad>'}]) {
  const r=await exports.POST({json:async()=>({email:'unit-test@example.com',perfil:'familia',age:'3-4',attribution})});
  assert.equal(r.status,200);
  assert.equal(contact.attributes.ORIGEN_TRAFICO,attribution?.utm_campaign?'pinterest':undefined);
  assert.equal(contact.attributes.CAMPANA_ORIGEN,attribution?.utm_campaign?'test':undefined);
  assert.ok(contact.attributes.FUENTE_LEAD);
 }
 console.log(`PASS ${route}: campaign attribution and unattributed requests; existing lead source preserved.`);
}
