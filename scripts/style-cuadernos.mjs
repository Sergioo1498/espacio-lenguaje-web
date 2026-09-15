// Presentation only: existing DOM nodes retain their wording and order.
export async function styleCuadernos(page, prod) {
  await page.addStyleTag({content: `
    .cover{background:linear-gradient(145deg,#FDF8F4,#F5E6D3);border-top:5mm solid #C4745A;}
    .cover-tag{background:none;letter-spacing:.5pt;font-size:9pt;padding:0;}
    .cover h1{font-size:36pt;max-width:165mm;}.cover-sub{font-size:13pt;}
    .cover-img{border-radius:5mm;box-shadow:none;height:80mm;}
    .content-page{position:relative;padding:16mm 18mm 22mm;}
    .content-page.reference-page{padding:18mm 22mm 22mm;}
    .activity-page{display:flex;flex-direction:column;background:#fff;font-size:10pt;line-height:1.5;border-top:3mm solid #C4745A;}
    .activity-page>*{flex-shrink:0;}
    .activity-page h3{font-size:21pt;line-height:1.2;margin:0 0 5mm;padding-bottom:4mm;border-bottom:1px solid #e7d9ce;}
    .activity-page p{font-size:10pt;line-height:1.5;margin:0 0 3mm;}
    .activity-page .meta-chip{background:#FDF8F4;border:1px solid #ecdcd0;border-radius:3mm;padding:1.8mm 3mm;width:fit-content;max-width:100%;margin:0 0 2mm;font-size:9pt;}
    .activity-page .steps-label{color:#A35B45;font-weight:600;margin:3mm 0 1mm;}
    .activity-page ol{margin:2mm 0 4mm 7mm;padding-left:0;}
    .activity-page li{padding-left:1mm;margin-bottom:2.2mm;line-height:1.6;}
    .activity-page li::marker{font-weight:700;color:#A35B45;}
    .activity-page .development{background:#edf3eb;border-left:3px solid #8FAE8B;padding:3mm 4mm;border-radius:0 3mm 3mm 0;margin:0 0 3mm;}
    .activity-page .variations{background:#FDF8F4;border:1px solid #eddfd5;padding:3mm 4mm;border-radius:3mm;margin:0 0 3mm;}
    .activity-page blockquote{font-size:9pt;line-height:1.4;margin:1mm 0 3mm;padding:2mm 4mm;box-shadow:none;}
    .activity-page blockquote p{font-size:9pt;line-height:1.4;}
    .activity-page hr{display:none;}
    .activity-page .record{margin-top:auto;padding-top:4mm;}
    .record h4{font-family:'DM Sans',sans-serif;font-size:10pt;margin:0 0 2.5mm;color:#A35B45;}
    .record p{font-size:9pt;margin:0 0 1mm;}.record-line{height:9mm;border-bottom:1px solid #d6cbc3;}
    .page-footer{position:absolute;bottom:8mm;left:18mm;right:18mm;border-top:1px solid #ded2c8;padding-top:2mm;font-size:7pt;color:#8C7A7C;white-space:nowrap;text-align:center;}
    .chapter-list{list-style:none!important;margin:6mm 0 0!important;padding:0!important;border-top:1px solid #d8c6b8;}
    .chapter-list li{font-size:10pt;padding:3mm 0;margin:0!important;border-bottom:1px solid #e5d9ce;line-height:1.3;}
    .index-page{background:#FDF8F4;}.index-page h2{font-size:28pt!important;margin-bottom:5mm!important;}
    .index-group{margin-bottom:4mm;}.index-group h3{font-family:'DM Sans',sans-serif;font-weight:600;font-size:10pt;margin:0 0 1.5mm;color:#A35B45;}
    .index-group p{font-size:9pt;line-height:1.3;margin:0 0 1.5mm;}
    .chapter-page .chapter-image img{height:45mm;}.chapter-page h2{font-size:24pt;}
  `});
  return await page.evaluate(({title}) => {
    const coverTitle=document.querySelector('.cover h1');
    coverTitle.innerHTML=coverTitle.innerHTML.replace(/([03]-[36] años)/,'<span style="white-space:nowrap">$1</span>');
    const additions=[];
    const add=(node,kind)=>{node.dataset.added=kind;additions.push({kind,text:node.textContent.trim()});};
    const chapters=[];let chapter;
    for(const unit of document.querySelectorAll('.content-page')){
      if([...unit.children].some(n=>n.tagName==='H2'&&n.textContent.trim()==='Referencias'))unit.classList.add('reference-page');
      const heading=[...unit.children].find(n=>n.tagName==='H2'&&/^Bloque \d+/.test(n.textContent.trim()));
      if(heading){chapter={unit,title:heading.textContent.trim(),activities:[]};chapters.push(chapter);unit.classList.add('chapter-page');}
      if(unit.classList.contains('activity-page')){
        const h=[...unit.children].find(n=>n.tagName==='H3'&&/Actividad \d+/.test(n.textContent));
        chapter.activities.push(h.textContent.trim());
        // Markdown metadata may be in a single paragraph separated by newlines.
        for(const p of [...unit.querySelectorAll(':scope > p')]){
          if(!p.innerHTML.includes('\n'))continue;
          const lines=p.innerHTML.split('\n');
          if(lines.every(l=>/^\s*<strong>/.test(l))){
            for(const line of lines){const item=document.createElement('p');item.innerHTML=line;p.before(item);}p.remove();
          }
        }
        for(const p of unit.querySelectorAll(':scope > p')){
          const t=p.textContent.trim();
          if(/^(Edad|Materiales|Duración)\s*[:.]/.test(t))p.classList.add('meta-chip');
          else if(/^(Cómo hacerlo|Instrucciones paso a paso)/.test(t))p.classList.add('steps-label');
          else if(/^Qué desarrolla/.test(t))p.classList.add('development');
          else if(/^Variaciones/.test(t))p.classList.add('variations');
        }
        const record=document.createElement('section');record.className='record';
        record.innerHTML='<h4>Registro</h4><p>Fecha ____ · Hecho ☐ · Cómo ha ido: ______</p><div class="record-line"></div><div class="record-line"></div><div class="record-line"></div><div class="record-line"></div>';
        add(record,'registro');unit.appendChild(record);
      }
    }
    const index=document.createElement('section');index.className='content-page index-page';
    const indexTitle=document.createElement('h2');indexTitle.textContent='Índice';index.appendChild(indexTitle);
    for(const ch of chapters){
      const list=document.createElement('ul');list.className='chapter-list';
      for(const activity of ch.activities){const li=document.createElement('li');li.textContent=activity;list.appendChild(li);}
      add(list,'lista-bloque');ch.unit.appendChild(list);
      const group=document.createElement('div');group.className='index-group';
      const h=document.createElement('h3');h.textContent=ch.title;group.appendChild(h);
      for(const activity of ch.activities){const p=document.createElement('p');p.textContent=activity;group.appendChild(p);}
      index.appendChild(group);
    }
    add(index,'indice');document.querySelector('.content').prepend(index);
    const all=[document.querySelector('.cover'),...document.querySelectorAll('.content-page'),document.querySelector('.back-cover')];
    all.forEach((unit,i)=>{
      if(!unit.classList.contains('content-page'))return;
      const footer=document.createElement('footer');footer.className='page-footer';footer.textContent=`${title} · www.espaciolenguaje.com · ${i+1}`;add(footer,'pie');unit.appendChild(footer);
    });
    const overflow=[...document.querySelectorAll('.content-page')].filter(e=>e.scrollHeight>e.clientHeight+1).map(e=>e.textContent.slice(0,100));
    // Also catch overlap with the absolute footer and its bottom reserve.
    for(const unit of document.querySelectorAll('.content-page')){
      const foot=unit.querySelector('.page-footer');
      for(const child of [...unit.children].filter(e=>e!==foot))if(child.getBoundingClientRect().bottom>foot.getBoundingClientRect().top-4)overflow.push('Footer overlap: '+child.textContent.slice(0,70));
    }
    return {additions:[...document.querySelectorAll('[data-added]')].map(n=>({kind:n.dataset.added,text:n.innerText})),pages:all.length,overflow};
  }, {title:prod.title});
}
