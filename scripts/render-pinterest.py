"""Typeset source-based editorial cards, with no stock imagery or clinical additions."""
import json, re, urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path.cwd(); FONTS=ROOT/'pinterest/fonts'; FONTS.mkdir(parents=True,exist_ok=True)
for name,url in {
 'DMSerifDisplay-Regular.ttf':'https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf',
 'DMSans.ttf':'https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/DMSans%5Bopsz,wght%5D.ttf',
 'DMSerifDisplay-OFL.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/OFL.txt',
 'DMSans-OFL.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt',
}.items():
 if not (FONTS/name).exists(): urllib.request.urlretrieve(url,FONTS/name)

pins=json.loads((ROOT/'pinterest/pins.json').read_text(encoding='utf-8'))
OUT=ROOT/'public/pinterest'; OUT.mkdir(exist_ok=True)
PROOFS=ROOT/'pinterest/previews'; PROOFS.mkdir(exist_ok=True)
cream='#FDF8F4'; ink='#3D2C2E'; terracotta='#C4745A'; sage='#8FAE8B'
def font(size,serif=False,bold=False):
 f=ImageFont.truetype(str(FONTS/('DMSerifDisplay-Regular.ttf' if serif else 'DMSans.ttf')),size)
 if not serif:
  try: f.set_variation_by_axes([14,700 if bold else 400])
  except Exception: pass
 return f
def wrap(draw,text,f,width):
 lines=[];line=''
 for word in text.split():
  trial=(line+' '+word).strip()
  if draw.textlength(trial,font=f)>width and line: lines.append(line);line=word
  else: line=trial
 if line: lines.append(line)
 return lines
def lines(draw,text,xy,width,size,maxheight,serif=False,bold=False,color=ink):
 while True:
  f=font(size,serif,bold);parts=wrap(draw,text,f,width);step=round(size*1.19)
  if len(parts)*step<=maxheight:break
  size-=1
  if size<28:raise ValueError('Text would be too small: '+text)
 x,y=xy
 for part in parts: draw.text((x,y),part,font=f,fill=color,anchor='lt');y+=step
 return {'text':text,'fontSize':size,'lines':len(parts),'bottom':y}

logo=Image.open(ROOT/'public/images/logo-chosen.png').convert('RGBA');logo.thumbnail((94,94))
audit=[]
for pin in pins:
 variant=(pin['id']-1)%4
 bg=cream if variant<2 else ('#EEF2E9' if variant==2 else ink)
 fg=ink if variant<3 else cream
 im=Image.new('RGB',(1000,1500),bg);d=ImageDraw.Draw(im)
 accent=terracotta if variant%2==0 else sage
 d.rectangle((0,0,1000,18),fill=accent)
 # Small geometric page / speech motif, deliberately non-clinical.
 d.rounded_rectangle((785,62,929,180),radius=24,outline=accent,width=3)
 d.line((812,99,891,99),fill=accent,width=4);d.line((812,120,876,120),fill=accent,width=4)
 d.polygon([(808,177),(808,202),(838,177)],fill=accent)
 label='MATERIAL IMPRIMIBLE' if pin['sourceKind']=='product' else 'GUÍAS PARA FAMILIAS'
 if pin['board'].startswith('Material para'):label='PARA PROFESIONALES'
 d.text((66,99),label,font=font(25,bold=True),fill=fg)
 entries=[lines(d,pin['headline'],(66,236),855,76,385,True,color=fg)]
 d.line((67,638,207,638),fill=accent,width=7)
 d.text((66,677),'EN EL RECURSO' if pin['sourceKind']=='product' else 'EN ESTA GUÍA',font=font(23,bold=True),fill=fg)
 for n,panel in enumerate(pin['panels']):
  y=737+n*151
  d.rounded_rectangle((64,y,936,y+132),radius=21,fill='#FFFFFF' if variant!=3 else '#503D40')
  d.ellipse((86,y+36,146,y+96),fill=accent)
  d.text((116,y+65),str(n+1),font=font(27,bold=True),fill=ink,anchor='mm')
  text=re.sub(r'^\d+\.\s*','',panel)
  entry=lines(d,text,(173,y+31),725,34,88,bold=True,color=fg);entries.append(entry)
 d.rounded_rectangle((64,1220,936,1300),radius=40,fill=accent)
 cta='VER EL MATERIAL  →' if pin['sourceKind']=='product' else 'LEER LA GUÍA  →'
 d.text((500,1260),cta,font=font(28,bold=True),fill=ink,anchor='mm')
 im.paste(logo,(64,1352),logo)
 d.text((184,1363),'espaciolenguaje.com',font=font(29,bold=True),fill=fg)
 d.text((184,1413),'Revisado por logopeda colegiada',font=font(23),fill=fg)
 im.save(OUT/pin['filename'],optimize=True)
 audit.append({'id':pin['id'],'file':pin['filename'],'width':1000,'height':1500,'text':entries})

for start in range(0,len(pins),12):
 sheet=Image.new('RGB',(1200,1400),'#E6E1DA');draw=ImageDraw.Draw(sheet)
 for j,p in enumerate(pins[start:start+12]):
  thumb=Image.open(OUT/p['filename']);thumb.thumbnail((280,420));x=(j%4)*300+10;y=(j//4)*466+25
  sheet.paste(thumb,(x,y));draw.text((x,y-21),str(p['id']),font=font(18),fill=ink)
 sheet.save(PROOFS/f'contact-{start+1:02d}-{min(start+12,60):02d}.jpg',quality=90)
(ROOT/'pinterest/render-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print('Rendered 60 PNGs at 1000x1500, five contact sheets; no external pictograms used.')
