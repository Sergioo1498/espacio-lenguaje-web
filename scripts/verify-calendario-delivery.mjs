// Checkout and transactional link generation with Stripe mocked. No charge or email.
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const compile=(source,require)=>{
 const exports={};vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,require,console,process,fetch:()=>{throw new Error('Network disabled in mock');}});return exports;
};
const products=compile(fs.readFileSync('src/lib/products.ts','utf8'),()=>{});
const before=compile(execFileSync('git',['show','6316103:src/lib/products.ts'],{encoding:'utf8'}),()=>{});
let captured;
const requireMock=name=>{
 if(name==='@/lib/products')return products;
 if(name==='next/server')return {NextResponse:{json:(body,options)=>({body,status:options?.status||200})}};
 if(name==='@/lib/stripe')return {getStripeClient:()=>({checkout:{sessions:{create:async body=>{captured=body;return {id:'cs_test_verification',url:'https://checkout.stripe.com/test-verification'};}}}})};
 if(name==='stripe')return {};throw new Error(name);
};
const checkout=compile(fs.readFileSync('src/app/api/checkout/route.ts','utf8'),requireMock);
const webhook=compile(fs.readFileSync('src/app/api/webhooks/stripe/route.ts','utf8')+'\nexport {buildDownloadLinks};',requireMock);
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const results=[];
for(const p of products.products){
 const old=before.getProduct(p.id);
 if(p.id!=='pack-completo')assert.equal(hash(p),hash(old));
 else assert.equal(hash({...p,files:old.files}),hash(old));
 const response=await checkout.POST({json:async()=>({productId:p.id})});assert.equal(response.status,200);
 assert.equal(captured.line_items[0].price,p.stripePriceId);
 const html=webhook.buildDownloadLinks([p.id]);const urls=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(u=>u.includes('/downloads/'));
 const expected=(p.files||[p.file]).map(f=>'https://www.espaciolenguaje.com'+f);
 assert.equal(JSON.stringify(urls),JSON.stringify(expected));
 if(p.id==='pack-completo')assert.equal(urls.length,5);
 results.push({id:p.id,checkoutStatus:response.status,urls,configurationHashBefore:hash(old),configurationHashAfter:hash(p),unchanged:p.id!=='pack-completo'});
}
fs.writeFileSync('drafts/saneamiento-sep2026/delivery-B.json',JSON.stringify({checkedAt:new Date().toISOString(),mode:'Stripe simulated; no network, charges or emails',results},null,2));
console.log('PASS: 7 checkouts simulated; Pack Completo 5 files; other 6 products unchanged.');
