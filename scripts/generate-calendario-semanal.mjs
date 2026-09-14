import fs from 'node:fs';
import puppeteer from 'puppeteer';

const logo=fs.readFileSync('public/images/logo-chosen.png').toString('base64');
const days=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const html=`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Calendario semanal · Espacio Lenguaje</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;background:#FDF8F4;color:#3D2C2E;font-family:'DM Sans',sans-serif;font-size:10pt}
main{width:210mm;height:297mm;padding:16mm;display:flex;flex-direction:column}
header{display:flex;align-items:center;gap:5mm;border-bottom:1px solid #C4745A;padding-bottom:5mm}header img{width:19mm;height:19mm;border-radius:50%}h1{font:25pt 'DM Serif Display',serif;margin:0 0 2mm}header p{margin:0;color:#6b5a5c;font-size:9pt}.instruction{margin:6mm 0;font-size:11pt}
h2{font-size:10pt;font-weight:600;margin:0 0 3mm}.field{height:24mm;border:1px solid #ded2c8;border-radius:3mm;padding:4mm;background:white}
table{width:100%;border-collapse:collapse;margin:7mm 0;table-layout:fixed;font-size:9pt}thead{background:#8FAE8B;color:#243628}th{padding:3mm 2mm;text-align:left;font-weight:600}td{height:17mm;border-bottom:1px solid #ded2c8;border-right:1px solid #eee5dd;padding:3mm 2mm;vertical-align:top;background:white}tbody th{background:#f3e9df;border-bottom:1px solid #ded2c8;vertical-align:top;padding-top:3mm}th:first-child{width:15%}th:nth-child(2){width:22%}th:nth-child(3){width:27%}th:nth-child(4){width:13%}th:nth-child(5){width:23%}footer{margin-top:auto;text-align:center;color:#78686a;font-size:8pt}
</style></head><body><main><header><img src="data:image/png;base64,${logo}" alt="Espacio Lenguaje"><div><h1>Calendario semanal</h1><p>Espacio Lenguaje</p></div></header>
<p class="instruction">Elige 1-2 actividades al día; 10-15 minutos bastan</p>
<section class="field"><h2>Objetivo de la semana</h2></section>
<table><thead><tr><th>Día</th><th>Recurso</th><th>Actividad o ficha</th><th>Tiempo</th><th>Notas</th></tr></thead><tbody>${days.map(d=>`<tr><th scope="row">${d}</th><td></td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>
<section class="field"><h2>Qué ha ido bien</h2></section><footer>www.espaciolenguaje.com</footer></main></body></html>`;
fs.writeFileSync('private/productos/_preview/calendario-semanal.html',html);
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();await page.setContent(html,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
 const overflow=await page.evaluate(()=>document.querySelector('main').scrollHeight>document.querySelector('main').clientHeight+1);
 if(overflow)throw new Error('Calendar overflows A4');
 await page.pdf({path:'public/downloads/productos/calendario-semanal.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
 console.log('Calendario semanal generado.');
}finally{await browser.close();}
