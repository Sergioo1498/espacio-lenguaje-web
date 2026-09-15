import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
// Exercise real handlers, replacing only external Brevo calls. No email/contact changes.
for(const route of ['subscribe','newsletter']){
 let saved={PERFIL:'profesional'};
 const exports={};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(`src/app/api/${route}/route.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{
  exports,console,process:{env:{BREVO_API_KEY:'mock'}},
  require:()=>({NextResponse:{json:(body,opts)=>({body,status:opts?.status||200})}}),
  fetch:async(url,options)=>{if(url.endsWith('/contacts'))Object.assign(saved,JSON.parse(options.body).attributes);return {ok:true,status:201,json:async()=>({})};},
 });
 for(const [perfil,expected] of [['familia','familia'],['profesional','profesional'],[undefined,'profesional'],['invalid','profesional']]){
  const r=await exports.POST({json:async()=>({email:'sergio.gonzalezt98+perfiltest@gmail.com',perfil})});
  assert.equal(r.status,200);assert.equal(saved.PERFIL,expected,`${route}: profile ${perfil}`);
 }
 console.log(`PASS ${route}: family/professional saved; omitted/invalid preserve existing profile.`);
}
