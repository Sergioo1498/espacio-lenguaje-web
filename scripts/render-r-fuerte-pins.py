from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import json
root=Path.cwd()
pages=root/'drafts/pieza-4-r-fuerte/listas-r-fuerte-render'
out=root/'pinterest/drafts-noviembre-r-fuerte'
out.mkdir(parents=True,exist_ok=True)
font=ImageFont.truetype(str(root/'pinterest/fonts/DMSerifDisplay-Regular.ttf'),78)
small=ImageFont.truetype(str(root/'pinterest/fonts/DMSans.ttf'),25)
entries=[]
descriptions=[
 'Palabras con R fuerte al inicio y RR entre vocales, con pictogramas y una hoja de registro. Un imprimible de logopedia / fonoaudiología para leer y nombrar juntos; la selección y las pautas están pendientes de revisión.',
 'Frases cortas con R fuerte y un registro para anotar las palabras que se han leído. Este PDF de articulación reúne ejemplos originales para familias y profesionales de logopedia; borrador pendiente de revisión.',
 'Listas de R fuerte por posición y trabalenguas originales, acompañados de pictogramas. El material imprimible incluye un registro de observaciones para logopedia / fonoaudiología y aún necesita revisión clínica.'
]
for i,(title,indices) in enumerate([('Palabras con R fuerte',[2,3,7]),('Frases con R fuerte',[3,5,7]),('Listas para leer juntos',[2,4,6])],1):
    pin=Image.new('RGB',(1000,1500),'#FDF8F4');draw=ImageDraw.Draw(pin)
    draw.rounded_rectangle((60,70,940,145),radius=35,fill='#8FAE8B')
    draw.text((105,93),'ESPACIO LENGUAJE · MATERIAL EN REVISIÓN',font=small,fill='white')
    words=title.split();line1=' '.join(words[:3]);line2=' '.join(words[3:])
    draw.text((75,200),line1,font=font,fill='#3D2C2E')
    if line2:draw.text((75,290),line2,font=font,fill='#3D2C2E')
    for j,n in enumerate(indices):
        page=Image.open(pages/f'pagina-{n}.png').convert('RGBA');page.thumbnail((540,765))
        angle=[-10,5,0][j];page=page.rotate(angle,expand=True,resample=Image.Resampling.BICUBIC)
        x=[30,420,240][j];y=[500,470,680][j]
        mask=Image.new('RGBA',pin.size);shadow=Image.new('RGBA',page.size,(61,44,46,45));shadow.putalpha(page.getchannel('A').point(lambda v:int(v*.17)))
        mask.alpha_composite(shadow,(x+12,y+20));mask=mask.filter(ImageFilter.GaussianBlur(18));base=pin.convert('RGBA');base=Image.alpha_composite(base,mask);base.alpha_composite(page,(x,y));pin=base.convert('RGB')
    draw=ImageDraw.Draw(pin);draw.rectangle((0,1420,1000,1500),fill='#C4745A');draw.text((75,1444),'BORRADOR · NO PROGRAMAR SIN REVISIÓN DE BEA',font=small,fill='white')
    filename=f'r-fuerte-{i:02}.png';pin.save(out/filename)
    entries.append({'number':i,'type':'mockup','title':title,'description':descriptions[i-1],'board':'Fichas de logopedia para imprimir','link':'https://www.espaciolenguaje.com/blog/palabras-y-frases-con-r-fuerte?utm_source=pinterest&utm_medium=social&utm_campaign=r-fuerte-noviembre','date':None,'image':filename,'scheduled':False,'publicationCondition':'Bea + publicación del post; reemplazar un slot de noviembre, no sumar a los 20 existentes'})
(out/'pins.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2),encoding='utf8')
print('3 mockups 1000x1500 · NO PROGRAMADOS')
