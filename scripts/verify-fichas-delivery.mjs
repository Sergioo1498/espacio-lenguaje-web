// Ejecuta el checkout con Stripe simulado: no cobra ni dispara el webhook.
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
const compile=(source,require)=>{
 const exports={};
 vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,require,console,process,fetch});
 return exports;
};
const products=compile(fs.readFileSync('src/lib/products.ts','utf8'),()=>{});
let captured;
const requireMock=name=>{
 if(name==='@/lib/products')return products;
 if(name==='next/server')return {NextResponse:{json:(body,options)=>({body,status:options?.status||200})}};
 if(name==='@/lib/stripe')return {getStripeClient:()=>({checkout:{sessions:{create:async body=>{captured=body;return {id:'cs_test_verification',url:'https://checkout.stripe.com/test-verification'};}}}})};
 if(name==='stripe')return {};
 throw new Error(name);
};
const checkout=compile(fs.readFileSync('src/app/api/checkout/route.ts','utf8'),requireMock);
const webhook=compile(fs.readFileSync('src/app/api/webhooks/stripe/route.ts','utf8')+'\nexport {buildDownloadLinks};',requireMock);
const results=[];
for(const productId of ['fichas-articulacion','pack-completo']){
 const response=await checkout.POST({json:async()=>({productId})});
 assert.equal(response.status,200);
 assert.equal(captured.mode,'payment');
 assert.equal(captured.line_items[0].price,products.getProduct(productId).stripePriceId);
 const links=webhook.buildDownloadLinks([productId]);
 const url='https://www.espaciolenguaje.com/downloads/productos/pack-fichas-articulacion.pdf';
 assert(links.includes(url));
 results.push({productId,checkoutStatus:response.status,mode:captured.mode,priceId:captured.line_items[0].price,deliveryHtml:links,allFiles:captured.metadata.allFiles});
}
assert(process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_'));
fs.writeFileSync('drafts/pack-fichas-v4/fase2/delivery-check.json',JSON.stringify({localStripeMode:'test',checkout:'simulated Stripe; no charge or email',results},null,2));
console.log('PASS: checkout simulado y enlaces transaccionales de ambos packs; clave local de test.');
