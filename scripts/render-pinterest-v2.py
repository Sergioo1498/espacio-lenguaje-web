"""Render real PDF pages at 300 dpi and compose the second Pinterest pass."""
import json,re,subprocess,hashlib,math,sys
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageFilter
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path.cwd();TMP=Path('tmp/pinterest-v2');TMP.mkdir(parents=True,exist_ok=True)
OUT=Path('public/pinterest');FONTS=Path('pinterest/fonts');PROOFS=Path('pinterest/previews-v2');PROOFS.mkdir(exist_ok=True)
POPPLER=Path('tmp/pdfs/poppler/poppler-26.07.0/Library/bin/pdftoppm.exe')
pins=json.loads(Path('pinterest/pins.json').read_text(encoding='utf-8'))
inventory=json.loads(Path('pinterest/inventory.json').read_text(encoding='utf-8'))
copy=Path('pinterest/copy-v2.txt').read_text(encoding='utf-8').splitlines();assert len(copy)==60
cream='#FDF8F4';ink='#3D2C2E';terra='#C4745A';sage='#8FAE8B'
def font(size,serif=False,bold=False):
 f=ImageFont.truetype(str(FONTS/('DMSerifDisplay-Regular.ttf' if serif else 'DMSans.ttf')),size)
 if not serif:f.set_variation_by_axes([14,700 if bold else 400])
 return f
def clean(s):return re.sub(r'[*_`]|<[^>]+>','',re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',s)).strip()
def wrap(d,t,f,width):
 out=[];line=''
 for word in t.split():
  if d.textlength(word,font=f)>width:
   if line:out.append(line);line=''
   piece=''
   for char in word:
    if piece and d.textlength(piece+char,font=f)>width:out.append(piece);piece=''
    piece+=char
   line=piece
   continue
  v=(line+' '+word).strip()
  if d.textlength(v,font=f)>width and line:out.append(line);line=word
  else:line=v
 if line:out.append(line)
 return out
def text(d,t,x,y,width,size,maxheight,serif=False,bold=False,fill=ink,minsize=22):
 while True:
  f=font(size,serif,bold);ls=wrap(d,t,f,width);step=math.ceil(size*1.22)
  if len(ls)*step<=maxheight:break
  size-=1
  if size<minsize:raise ValueError('Text overflow '+t)
 for l in ls:d.text((x,y),l,font=f,fill=fill,anchor='lt');y+=step
 return y
pdfs={
 'free':('public/downloads/muestra-fichas-articulacion-r-ba5e7821166e.pdf',[2,3,4,5,6,7]),
 'fichas-articulacion':('public/downloads/productos/pack-fichas-articulacion.pdf',[10,13,19,20,22,27]),
 'cuaderno-0-3':('public/downloads/productos/cuaderno-estimulacion-0-3.pdf',[5,6,13,16,25,28]),
 'cuaderno-3-6':('public/downloads/productos/cuaderno-estimulacion-3-6.pdf',[6,7,11,12,17,26]),
 'kit-soplo':('public/downloads/productos/kit-ejercicios-soplo.pdf',[6,7,12,13,14,23]),
 'guia-dislexia':('public/downloads/productos/guia-dislexia.pdf',[9,10,12,15]),
 'guia-tartamudez':('public/downloads/productos/guia-tartamudez.pdf',[6,8,10,12]),
 'calendario':('public/downloads/productos/calendario-semanal.pdf',[1]),
}
evidence=[]
def pdfpage(key,n):
 file=pdfs[key][0];prefix=TMP/f'{key}-{n:02d}';out=prefix.with_suffix('.png')
 if not out.exists():subprocess.run([str(POPPLER),'-f',str(n),'-l',str(n),'-r','300','-png','-singlefile',file,str(prefix)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
 return {'path':str(out),'source':file,'page':n,'dpi':300,'sha256':hashlib.sha256(Path(file).read_bytes()).hexdigest()}
def postpages(source):
 content=source['content'];tables=list(re.finditer(r'(?:^\|.*\n){3,}',content,re.M));lists=list(re.finditer(r'(?:^(?:[-*] |\d+\. ).*\n){3,}',content,re.M))
 if source['slug']=='dislexia-en-ninos-como-detectarla':
  start=content.find('### Etapa preescolar');lists=[m for m in lists if m.start()>start] if start>=0 else lists
 match=(tables or lists)[0]
 headers=re.findall(r'^#{2,4} (.+)$',content[:match.start()],re.M);heading=clean(headers[-1]) if headers else source['title']
 raw=match.group();table=bool(tables)
 if table:
  rows=[[clean(v) for v in l.strip().strip('|').split('|')] for l in raw.splitlines()];columns=rows[0];rows=rows[2:]
 else:rows=[clean(re.sub(r'^(?:[-*] |\d+\. )','',l)) for l in raw.splitlines()];columns=[]
 # All selected rows are retained across the two excerpt images.
 groups=[rows[:math.ceil(len(rows)/2)],rows[math.ceil(len(rows)/2):]]
 results=[]
 for j,group in enumerate(groups):
  im=Image.new('RGB',(2480,3508),'white');d=ImageDraw.Draw(im)
  d.rectangle((0,0,2480,30),fill=terra)
  d.text((160,150),'ESPACIO LENGUAJE · EXTRACTO DEL ARTÍCULO',font=font(42,bold=True),fill=ink)
  y=text(d,source['title'],160,280,2160,112,450,True)
  y=text(d,heading,160,max(y+90,650),2160,66,260,bold=True)+80
  bottom=3200
  if table:
   widths=[2160/len(columns)]*len(columns);x=160;headerheight=160
   for c,w in zip(columns,widths):
    d.rectangle((x,y,x+w,y+headerheight),fill=sage);text(d,c,x+20,y+24,w-40,42,115,bold=True);x+=w
   y+=headerheight
   maxrow=(bottom-y)/max(len(group),1)
   for row in group:
    fsize=78
    while max(len(wrap(d,v,font(fsize),w-40))*math.ceil(fsize*1.22)+55 for v,w in zip(row,widths))>maxrow:
     fsize-=1
     if fsize<24:raise ValueError('Table too dense '+source['slug'])
    rh=max(280,max(len(wrap(d,v,font(fsize),w-40))*math.ceil(fsize*1.22)+55 for v,w in zip(row,widths)))
    x=160
    for v,w in zip(row,widths):
     d.rectangle((x,y,x+w,y+rh),fill=cream,outline='#D7CCC3',width=2);text(d,v,x+20,y+25,w-40,fsize,rh-40,minsize=24);x+=w
    y+=rh
  else:
   maxitem=min(650,(bottom-y)/max(len(group),1))
   for item in group:
    d.rounded_rectangle((160,y,2320,y+maxitem-28),radius=25,fill=cream)
    d.rectangle((200,y+35,238,y+73),outline=terra,width=4)
    text(d,item,290,y+32,1960,66,maxitem-72,minsize=28);y+=maxitem
  height=min(3508,max(1800,math.ceil(y+260)))
  im=im.crop((0,0,2480,height));d=ImageDraw.Draw(im)
  d.text((160,height-120),'espaciolenguaje.com · Fragmento '+str(j+1)+'/2',font=font(40),fill=ink)
  path=TMP/f'post-{source["slug"]}-{j+1}.png';im.save(path)
  results.append({'path':str(path),'source':source['url'],'kind':'table' if table else 'list','heading':heading,'literal':group,'columns':columns})
 return results
postcache={}
logo=Image.open('public/images/logo-chosen.png').convert('RGBA');logo.thumbnail((72,72))
def paper(canvas,path,cx,cy,w,angle):
 page=Image.open(path).convert('RGBA');page=page.resize((w,round(w*page.height/page.width)),Image.Resampling.LANCZOS)
 page=page.rotate(angle,resample=Image.Resampling.BICUBIC,expand=True)
 layer=Image.new('RGBA',(page.width+60,page.height+60));mask=Image.new('RGBA',layer.size)
 shadow=Image.new('RGBA',page.size,(50,35,25,60));shadow.putalpha(page.getchannel('A').point(lambda a:round(a*.20)))
 mask.alpha_composite(shadow,(30,38));mask=mask.filter(ImageFilter.GaussianBlur(15));layer.alpha_composite(mask);layer.alpha_composite(page,(30,20))
 canvas.alpha_composite(layer,(round(cx-layer.width/2),round(cy-layer.height/2)))

for p,line in zip(pins,copy):
 h,desc=line.split('|');assert len(h.split())<=8 and 150<=len(desc)<=300
 p.update(headline=h,title=h,description=desc,type='mockup' if p['id']<=44 else 'tarjeta',imageVersion='v2')
 p['imageUrl']=f'https://www.espaciolenguaje.com/pinterest/{p["filename"]}?v=2'
 source=next(s for s in inventory if s['url']==p['source']);resources=[]
 if p['type']=='mockup':
  key='free' if p['slug']=='fichas-logopedia-gratis-imprimir' and p['id'] not in [38,39,40] else p['slug']
  if key=='pack-completo':resources=[pdfpage('cuaderno-0-3',25),pdfpage('fichas-articulacion',10),pdfpage('calendario',1)]
  elif key in pdfs:
   pages=pdfs[key][1];start=(p['id']//2)%len(pages);count=3 if p['id']%3==0 else 2
   resources=[pdfpage(key,pages[(start+k)%len(pages)]) for k in range(count)]
  else:
   if key not in postcache:postcache[key]=postpages(source)
   resources=postcache[key]
  im=Image.new('RGBA',(1000,1500),cream);d=ImageDraw.Draw(im)
  d.text((62,49),'MATERIAL REAL' if 'page' in resources[0] else 'DEL ARTÍCULO',font=font(24,bold=True),fill=terra)
  text(d,h,62,115,880,77,240,True)
  if len(resources)==3:positions=[(310,842,470,9),(690,842,470,-9),(510,885,562,0)]
  elif p['id']%2:positions=[(355,815,550,8),(630,879,570,-6)]
  else:positions=[(640,813,540,-8),(362,881,570,5)]
  for r,pos in zip(resources,positions):paper(im,r['path'],*pos)
  d=ImageDraw.Draw(im)
  if key in ['free','fichas-articulacion','pack-completo']:
   d.text((62,1326),'Pictogramas: Arasaac · Gobierno de Aragón · CC BY-NC-SA',font=font(19),fill=ink)
 else:
  v=p['id']%4;bg=[sage,cream,ink,terra][v];fg=cream if v==2 else ink
  im=Image.new('RGBA',(1000,1500),bg);d=ImageDraw.Draw(im)
  d.text((65,60),'ESPACIO LENGUAJE · GUÍAS Y RECURSOS',font=font(23,bold=True),fill=fg)
  text(d,h,65,170,870,82,375,True,fill=fg)
  panels=[re.sub(r'^\d+\.\s*','',s) for s in p['panels']]
  if v==0:
   for j,s in enumerate(panels):
    y=655+j*185;d.line((75,y+35,125,y+35),fill=ink,width=3);text(d,s,160,y,755,41,150,fill=fg)
  elif v==1:
   d.rounded_rectangle((65,650,935,1090),radius=220,fill='#E7EDDF');text(d,panels[0],160,755,690,61,235,True)
   text(d,' · '.join(panels[1:]),70,1150,860,31,130)
  elif v==2:
   for j,s in enumerate(panels):
    y=625+j*205;d.text((65,y),f'0{j+1}',font=font(71,True),fill=sage);text(d,s,210,y+15,700,43,150,fill=fg)
  else:
   d.rectangle((65,630,935,1220),fill=cream);text(d,panels[0],115,695,770,61,260,True)
   text(d,' / '.join(panels[1:]),115,1040,770,33,130)
 p['resources']=resources
 d=ImageDraw.Draw(im);fg=cream if p['type']=='tarjeta' and p['id']%4==2 else ink
 im.alpha_composite(logo,(62,1370));d.text((155,1375),'espaciolenguaje.com',font=font(28,bold=True),fill=fg)
 d.text((155,1420),'Revisado por logopeda colegiada',font=font(23),fill=fg)
 im.convert('RGB').save(OUT/p['filename'],optimize=True)
 evidence.append({'id':p['id'],'type':p['type'],'sources':resources,'headlineWords':len(h.split()),'descriptionChars':len(desc),'dimensions':[1000,1500]})
 print('Rendered',p['id'],p['type'],flush=True)

for start in range(0,60,10):
 sheet=Image.new('RGB',(1500,980),'#E6E1DA');d=ImageDraw.Draw(sheet)
 for j,p in enumerate(pins[start:start+10]):
  thumb=Image.open(OUT/p['filename']);thumb.thumbnail((280,420));x=(j%5)*300+10;y=(j//5)*490+35;sheet.paste(thumb,(x,y));d.text((x,y-25),str(p['id']),font=font(20),fill=ink)
 sheet.save(PROOFS/f'contact-{start+1:02d}-{start+10:02d}.jpg',quality=94)
Path('pinterest/pins.json').write_text(json.dumps(pins,ensure_ascii=False,indent=2),encoding='utf-8')
Path('pinterest/render-audit-v2.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')
print('PASS 44 mockups and 16 cards, PDF source pages rendered at 300 dpi.')
