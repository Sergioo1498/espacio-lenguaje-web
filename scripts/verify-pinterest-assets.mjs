import fs from 'node:fs';
import sharp from 'sharp';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const pins=JSON.parse(fs.readFileSync('pinterest/pins.json','utf8'));
const inventory=JSON.parse(fs.readFileSync('pinterest/inventory.json','utf8'));
assert.equal(pins.length,60);assert.equal(new Set(pins.map(p=>p.filename)).size,60);
assert.equal(pins.filter(p=>p.type==='mockup').length,44);
assert.equal(pins.filter(p=>p.type==='tarjeta').length,16);
const counts={};const results=[];
for(const p of pins){
 const source=inventory.find(s=>s.url===p.source);assert(source);
 assert(p.panels.every(s=>source.headings.includes(s)));
 assert(p.headline.split(/\s+/).length<=8&&p.title.length<=100);
 if(p.type==='mockup'){
  assert(p.resources.length>=2&&p.resources.length<=3);
  for(const resource of p.resources)if(resource.page)assert.equal(resource.dpi,300);
 }
 assert(p.description.length>=150&&p.description.length<=300);
 const u=new URL(p.link);assert.equal(u.searchParams.get('utm_source'),'pinterest');assert.equal(u.searchParams.get('utm_medium'),'social');assert.equal(u.searchParams.get('utm_campaign'),`pin-${p.slug}`);assert(!u.pathname.endsWith('.pdf'));
 const buffer=fs.readFileSync(`public/pinterest/${p.filename}`);const meta=await sharp(buffer).metadata();assert.equal(meta.width,1000);assert.equal(meta.height,1500);assert.equal(meta.format,'png');
 if(p.id<=40)counts[p.cluster]=(counts[p.cluster]||0)+1;
 if(process.argv.includes('--live')){const r=await fetch(p.imageUrl);const bytes=Buffer.from(await r.arrayBuffer());const hash=b=>crypto.createHash('sha256').update(b).digest('hex');results.push({id:p.id,url:p.imageUrl,http:r.status,bytes:bytes.length,sha256:hash(bytes),matches:hash(bytes)===hash(buffer)});}
}
assert.deepEqual(counts,{transaccional:12,articulacion:10,desarrollo:8,'dislexia-tartamudez':6,profesionales:4});
if(results.length){fs.writeFileSync('pinterest/images-live.json',JSON.stringify(results,null,2));assert(results.every(r=>r.http===200&&r.matches));}
console.log(`PASS 60 images, sizes, text lengths, literal source panels, destination/UTM links, 40-pin distribution${results.length?', all public PNG hashes':''}.`);
