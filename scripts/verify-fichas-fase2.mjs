import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import puppeteer from 'puppeteer';
const dir='drafts/pack-fichas-v4/fase2';
const html=fs.readFileSync('private/productos/_preview/pack-fichas-articulacion-v4.html','utf8');
const old=fs.readFileSync('drafts/pack-fichas-v4/pack-fichas-articulacion-v4.html','utf8');
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage();
 async function extract(content) {
  await page.setContent(content);
  return page.evaluate(()=>({
   pages:[...document.querySelectorAll('body > section')].map(e=>e.textContent.replace(/\s+/g,' ').trim()),
   fichas:[...document.querySelectorAll('.ficha')].map(e=>({
    posicion:e.querySelector('.posicion').textContent.replace(/\s+/g,' ').trim(),
    rest:[...e.children].filter(c=>!c.classList.contains('posicion')).map(c=>c.textContent.replace(/\s+/g,' ').trim()).join('|'),
    edad:!!e.querySelector('.ficha-meta'),silabario:!!e.querySelector('.silabario')
   }))
  }));
 }
 const a=await extract(old),b=await extract(html);
 assert.equal(b.pages.length,34); assert.equal(b.fichas.length,30);
 assert.deepEqual(b.pages.slice(0,2),a.pages.slice(0,2));
 let changes=0;
 for(let i=0;i<30;i++){
  assert(b.fichas[i].edad&&b.fichas[i].silabario);
  assert.equal(b.fichas[i].rest,a.fichas[i].rest);
  if(i<21)assert.equal(b.fichas[i].posicion,a.fichas[i].posicion);
  else {assert(b.fichas[i].posicion.startsWith(a.fichas[i].posicion+' Articula la ')); changes++;}
 }
 const baseline=JSON.parse(fs.readFileSync(dir+'/baseline.json'));
 const regression={};
 for(const [p,before] of Object.entries(baseline)){
  if(p.endsWith('pack-fichas-articulacion.pdf')||p.endsWith('pack-fichas-articulacion-content.md'))continue;
  const after=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  assert.equal(after,before.sha256,p);regression[p]={before:before.sha256,after,identical:true};
 }
 const pdfPages=fs.readFileSync(dir+'/pack-fichas-articulacion.txt','utf8').split('\f');
 assert.equal(pdfPages.filter(p=>p.trim()).length,34);
 for(let i=2;i<32;i++)for(const label of ['Edad esperada:','Posición articulatoria:','Silabario:'])assert(pdfPages[i].includes(label));
 fs.writeFileSync(dir+'/pdf-extracts.txt',[2,16,26,32,33].map(i=>`PÁGINA ${i+1}\n${pdfPages[i]}`).join('\n\n'));
 fs.writeFileSync(dir+'/verification.json',JSON.stringify({pages:34,completeFichas:30,changedFields:changes,coverAndIntroIdentical:true,regression},null,2));
 console.log('PASS: 34 páginas; 30/30 fichas completas; diff exacto de 9 posiciones; regresión de hashes OK.');
} finally {await browser.close();}
