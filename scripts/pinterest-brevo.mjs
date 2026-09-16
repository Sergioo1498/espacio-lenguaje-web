import fs from 'node:fs';
import assert from 'node:assert/strict';
const mode=process.argv[2];assert(['attributes','read','cleanup'].includes(mode));
const key=process.env.BREVO_API_KEY;assert(key,'BREVO_API_KEY missing');
const email='sergio.gonzalezt98+pintest@gmail.com';
async function req(path,method='GET',body){const r=await fetch(`https://api.brevo.com/v3/${path}`,{method,headers:{'api-key':key,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});const raw=await r.text();const data=raw?JSON.parse(raw):null;assert(r.ok||r.status===404,`Brevo HTTP ${r.status}`);return {status:r.status,data};}
let evidence;
if(mode==='attributes'){
 const before=await req('contacts/attributes');const changes=[];
 for(const name of ['ORIGEN_TRAFICO','CAMPANA_ORIGEN']){const old=before.data.attributes.find(a=>a.name===name);if(old){assert.equal(old.type,'text');changes.push({name,action:'already exists',type:old.type});}else{const r=await req(`contacts/attributes/normal/${name}`,'POST',{type:'text'});changes.push({name,action:'created',http:r.status});}}
 const after=await req('contacts/attributes');evidence={changes,attributes:after.data.attributes.filter(a=>['ORIGEN_TRAFICO','CAMPANA_ORIGEN'].includes(a.name))};
}else{
 const path=`contacts/${encodeURIComponent(email)}`;const before=await req(path);
 if(mode==='cleanup'){assert.equal(before.status,200);const request={listIds:[7],unlinkListIds:before.data.listIds.filter(i=>i!==7)};await req(path,'PUT',request);const after=await req(path);assert.deepEqual(after.data.listIds,[7]);evidence={email,before,request,after};}
 else evidence={email,...before};
}
fs.writeFileSync(`pinterest/brevo-${mode}.json`,JSON.stringify({checkedAt:new Date().toISOString(),...evidence},null,2));console.log(JSON.stringify(evidence,null,2));
