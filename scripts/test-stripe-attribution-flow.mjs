import fs from 'node:fs';
import Stripe from 'stripe';
process.loadEnvFile('.env.local');
const key=process.env.STRIPE_SECRET_KEY;
if(!key?.startsWith('sk_test_'))throw Error('TEST ONLY');
const stripe=new Stripe(key,{httpClient:Stripe.createFetchHttpClient()});
const input=JSON.parse(fs.readFileSync('docs/codex/informes/stripe-test-evidence.json'));
const evidence=[];
for(const [index,item] of input.entries()){
 const email=`sergio.gonzalezt98+atribucion${index+1}@gmail.com`;
 const intent=await stripe.paymentIntents.create({amount:490,currency:'eur',payment_method:'pm_card_visa',confirm:true,automatic_payment_methods:{enabled:true,allow_redirects:'never'},metadata:item.metadata},{idempotencyKey:`oct2026-attribution-intent-${index+1}`});
 const row={sessionId:item.id,checkoutStatus:item.status,paymentIntentId:intent.id,paymentStatus:intent.status,metadata:intent.metadata,livemode:intent.livemode,fixture:'PaymentIntent independiente; sesión Checkout NO completada'};
 evidence.push(row);fs.writeFileSync('docs/codex/informes/stripe-flow-test.json',JSON.stringify(evidence,null,2));
 if(process.env.STRIPE_WEBHOOK_SECRET){
  const payload=JSON.stringify({id:`evt_test_oct_attribution_${index+1}`,object:'event',type:'checkout.session.completed',livemode:false,data:{object:{id:item.id,object:'checkout.session',metadata:item.metadata,customer_details:{email,name:'Prueba Sergio'},amount_total:490,payment_intent:intent.id}}});
  const signature=stripe.webhooks.generateTestHeaderString({payload,secret:process.env.STRIPE_WEBHOOK_SECRET});
  const result=await fetch('http://localhost:3010/api/webhooks/stripe',{method:'POST',headers:{'stripe-signature':signature,'Content-Type':'application/json'},body:payload,signal:AbortSignal.timeout(30000)});
  row.webhook={http:result.status,type:'fixture firmado local, no evento Checkout real'};
  const headers={'api-key':process.env.BREVO_API_KEY};
  const contact=await(await fetch('https://api.brevo.com/v3/contacts/'+encodeURIComponent(email),{headers,signal:AbortSignal.timeout(25000)})).json();
  row.brevo={source:contact.attributes?.ORIGEN_TRAFICO,campaign:contact.attributes?.CAMPANA_ORIGEN,listIds:contact.listIds};
  const cleanup=await fetch('https://api.brevo.com/v3/contacts',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({email,listIds:[7],unlinkListIds:[2,3,4,5],emailBlacklisted:true,updateEnabled:true}),signal:AbortSignal.timeout(25000)});row.cleanupHttp=cleanup.status;
 }else row.webhook={status:'sin STRIPE_WEBHOOK_SECRET local'};
 fs.writeFileSync('docs/codex/informes/stripe-flow-test.json',JSON.stringify(evidence,null,2));console.log(row);
}
