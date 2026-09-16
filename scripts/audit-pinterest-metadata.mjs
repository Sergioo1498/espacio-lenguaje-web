import fs from 'node:fs';
import sharp from 'sharp';
const [label='before',base='https://www.espaciolenguaje.com']=process.argv.slice(2);
const inventory=JSON.parse(fs.readFileSync('pinterest/inventory.json','utf8'));
const all=[];
for(const item of inventory){
 const url=base+new URL(item.url).pathname;const res=await fetch(url);const html=await res.text();
 const tags=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>Object.fromEntries([...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a=>[a[1],a[2]])));
 const value=key=>tags.filter(t=>(t.property||t.name)===key).map(t=>t.content);
 const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>{try{return JSON.parse(m[1])['@type'];}catch{return 'invalid';}});
 const entry={url:item.url,http:res.status,title:value('og:title'),description:value('og:description'),image:value('og:image'),width:item.imageWidth,height:item.imageHeight,type:value('og:type'),author:value('article:author'),schema:schemas,issues:[]};
 for(const key of ['title','description','image'])if(entry[key].length!==1)entry.issues.push(`${key}: missing/duplicate`);
 if(entry.type.length!==1||entry.type[0]!==(item.kind==='post'?'article':'product'))entry.issues.push('og:type incorrect');
 if(!tags.some(t=>t.property==='og:type'))entry.issues.push('og:type must use property');
 if(Number(value('og:image:width')[0])!==item.imageWidth||Number(value('og:image:height')[0])!==item.imageHeight)entry.issues.push('declared image dimensions mismatch');
 if(item.kind==='post'&&!entry.author.length)entry.issues.push('article:author missing');
 if(entry.width<1000)entry.issues.push('image under 1000 px');
 if(!schemas.includes(item.kind==='post'?'Article':'Product'))entry.issues.push('schema missing');
 if(res.status!==200)entry.issues.push('not HTTP 200');
 all.push(entry);
}
fs.writeFileSync(`pinterest/metadata-${label}.json`,JSON.stringify(all,null,2));console.log(JSON.stringify({checked:all.length,issues:all.filter(e=>e.issues.length).map(e=>({url:e.url,issues:e.issues}))},null,2));
if(label!=='before'&&all.some(e=>e.issues.length))process.exitCode=1;
