import fs from 'node:fs';
import Stripe from 'stripe';
process.loadEnvFile('.env.local');
const rows=[];
for(const tag of ['quiztest3','packprotest','packproemail','atribucion1','atribucion2']){
 const email=`sergio.gonzalezt98+${tag}@gmail.com`;
 const headers={'api-key':process.env.BREVO_API_KEY};
 const r=await fetch('https://api.brevo.com/v3/contacts/'+encodeURIComponent(email),{headers,signal:AbortSignal.timeout(25000)});
 const d=await r.json();
 const events=await fetch('https://api.brevo.com/v3/smtp/statistics/events?email='+encodeURIComponent(email)+'&limit=30',{headers,signal:AbortSignal.timeout(25000)});
 const messages=await events.json();
 rows.push({tag,contactHttp:r.status,listIds:d.listIds,emailBlacklisted:d.emailBlacklisted,campaign:d.attributes?.CAMPANA_ORIGEN,source:d.attributes?.ORIGEN_TRAFICO,eventsHttp:events.status,events:messages.events?.map(e=>({event:e.event,messageId:e.messageId,date:e.date}))});
}
fs.writeFileSync('docs/codex/informes/test-contact-cleanup.json',JSON.stringify(rows,null,2));
const key=process.env.STRIPE_SECRET_KEY;
if(!key?.startsWith('sk_test_'))throw Error('TEST ONLY');
const stripe=new Stripe(key,{httpClient:Stripe.createFetchHttpClient()});
const {url}=JSON.parse(fs.readFileSync('tmp/packpro-checkout-url.json'));
const id=url.match(/cs_test_[^#/?]+/)[0];
const session=await stripe.checkout.sessions.retrieve(id);
const evidence={sessionId:session.id,livemode:session.livemode,status:session.status,paymentStatus:session.payment_status,amountTotal:session.amount_total,paymentIntent:session.payment_intent,metadata:session.metadata,browser:'Reintento: timeout CDP; no se confirma compra alojada'};
fs.writeFileSync('drafts/pack-profesional/checkout-test.json',JSON.stringify(evidence,null,2));
console.log(JSON.stringify({rows,evidence},null,2));
