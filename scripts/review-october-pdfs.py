from pathlib import Path
import subprocess, json
from PIL import Image, ImageOps, ImageDraw
from pypdf import PdfReader
root=Path.cwd()
renderer=root/'tmp/pdfs/poppler/poppler-26.07.0/Library/bin/pdftoppm.exe'
records=[]
for pdf in sorted(set(root.glob('drafts/**/*.pdf'))):
    if pdf.parent.name not in ['pack-profesional','pieza-4-r-fuerte','pieza-2-praxias']: continue
    folder=pdf.parent/(pdf.stem+'-render')
    folder.mkdir(exist_ok=True)
    subprocess.run([str(renderer),'-r','300','-png',str(pdf.relative_to(root)),str((folder/'pagina').relative_to(root))],check=True,capture_output=True)
    pages=sorted(folder.glob('pagina-*.png'))
    thumbnails=[]
    for n,p in enumerate(pages):
        img=Image.open(p).convert('RGB');img.thumbnail((360,510))
        tile=Image.new('RGB',(380,550),'#ffffff');tile.paste(img,((380-img.width)//2,10));ImageDraw.Draw(tile).text((15,525),f'{n+1} / {len(pages)}',fill='#3D2C2E');thumbnails.append(tile)
    sheet=Image.new('RGB',(380*min(4,len(pages)),550*((len(pages)+3)//4)),'#ddd8d1')
    for i,tile in enumerate(thumbnails):sheet.paste(tile,((i%4)*380,(i//4)*550))
    sheet.save(pdf.parent/(pdf.stem+'-contacto.jpg'),quality=90)
    reader=PdfReader(str(pdf));records.append({'file':str(pdf.relative_to(root)),'pages':len(reader.pages),'bytes':pdf.stat().st_size,'rendered':len(pages),'textLengths':[len(p.extract_text() or '') for p in reader.pages]})
(root/'docs/codex/informes/pdf-drafts-verification.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(records,ensure_ascii=False,indent=2))
