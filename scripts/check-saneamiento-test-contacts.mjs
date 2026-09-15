import fs from 'node:fs';
import assert from 'node:assert/strict';
const [mode,alias,label]=process.argv.slice(2);
assert(['read','cleanup','events'].includes(mode));assert(['quiztest','perfiltest'].includes(alias));assert(/^[a-z0-9-]+$/.test(label));
const email=`sergio.gonzalezt98+${alias}@gmail.com`;
const path=`contacts/${encodeURIComponent(email)}`;
const apiKey=process.env.BREVO_API_KEY;assert(apiKey);
async function req(path,method='GET',body){
 const r=await fetch('https://api.brevo.com/v3/'+path,{method,headers:{'api-key':apiKey,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const text=await r.text();const data=text?JSON.parse(text):null;
 assert(r.ok||r.status===404,JSON.stringify({http:r.status,data}));return {http:r.status,data};
}
let result;
if(mode==='events'){
 const r=await req('smtp/statistics/events?'+new URLSearchParams({email,days:'2',limit:'100',sort:'desc'}));
 result={...r,data:{events:(r.data.events||[]).filter(e=>e.email?.toLowerCase()===email)}};
}else if(mode==='cleanup'){
 const before=await req(path);assert.equal(before.http,200);
 const body={listIds:[7],unlinkListIds:(before.data.listIds||[]).filter(id=>id!==7)};
 const update=await req(path,'PUT',body);const after=await req(path);
 assert.equal(JSON.stringify(after.data.listIds),JSON.stringify([7]));
 result={before,request:body,update,after};
}else result=await req(path);
fs.writeFileSync(`drafts/saneamiento-sep2026/${label}.json`,JSON.stringify({checkedAt:new Date().toISOString(),mode,email,result},null,2));
console.log(JSON.stringify({mode,email,result},null,2));
