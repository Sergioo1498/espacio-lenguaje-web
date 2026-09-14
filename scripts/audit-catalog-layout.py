"""Evidencia de A: texto íntegro, páginas y coordenadas de actividades."""
import pathlib, subprocess, re, json, hashlib, difflib, xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parents[1]
DIR=ROOT/'drafts/saneamiento-sep2026'
BIN=next((ROOT/'tmp/pdfs/poppler').rglob('pdftotext.exe')).parent
names=['cuaderno-estimulacion-0-3','cuaderno-estimulacion-3-6','kit-ejercicios-soplo','guia-tartamudez','pack-fichas-articulacion']
def norm(s): return re.sub(r'\s+',' ',s).strip()
def extract(pdf,path):
 subprocess.run([str(BIN/'pdftotext.exe'),str(pdf.relative_to(ROOT)),str(path.relative_to(ROOT))],check=True,cwd=ROOT)
 return path.read_text(encoding='utf8')
def info(pdf):
 data=subprocess.check_output([str(BIN/'pdfinfo.exe'),str(pdf.relative_to(ROOT))],encoding='utf8',errors='replace',cwd=ROOT)
 return int(re.search(r'Pages:\s+(\d+)',data)[1])
def positions(pdf,name):
 xml=subprocess.check_output([str(BIN/'pdftotext.exe'),'-bbox',str(pdf.relative_to(ROOT)),'-'],cwd=ROOT)
 root=ET.fromstring(xml)
 result={}
 if name=='kit-ejercicios-soplo':
  html=(ROOT/'private/productos/_preview/kit-soplo.html').read_text(encoding='utf8')
  targets=[(i+1,t.split()) for i,t in enumerate(re.findall(r'<h3 class="exercise-title">(.*?)</h3>',html))]
 else: targets=[(i,['Actividad',str(i)]) for i in range(1,21)]
 for p,page in enumerate(root.iter('{http://www.w3.org/1999/xhtml}page'),1):
  words=list(page); texts=[w.text or '' for w in words]
  for n,target in targets:
   if n in result: continue
   for i in range(len(texts)-len(target)+1):
    if texts[i:i+len(target)]==target:
     result[n]={'page':p,'yPt':round(float(words[i].attrib['yMin']),2),'label':' '.join(target)};break
 return result
report=[]
for name in names:
 before=DIR/'before'/f'{name}.pdf'
 after=ROOT/'private/productos/_preview'/f'{name}-{"v4" if name=="pack-fichas-articulacion" else "v2"}.pdf'
 a=extract(before,DIR/f'{name}-before.txt');b=extract(after,DIR/f'{name}-after.txt')
 expected=norm(a)
 allowed='Ninguno'
 if name=='guia-tartamudez': expected=expected.replace('Guía gratuita','Guía de Tartamudez Infantil');allowed='Guía gratuita → Guía de Tartamudez Infantil (una aparición)'
 if name=='pack-fichas-articulacion':
  expected=expected.replace(' · V 4 C O N P I C T O G R A M A S','');allowed='Retirada de · v4 con pictogramas de la portada; Title conserva v4'
 diff=''.join(difflib.unified_diff([expected+'\n'],[norm(b)+'\n'],fromfile='esperado',tofile='generado'))
 (DIR/f'{name}-text.diff').write_text(diff,encoding='utf8')
 item={'file':name+'.pdf','beforePages':info(before),'afterPages':info(after),'allowedChange':allowed,'normalizedTextDiffEmpty':not diff,'sha256Before':hashlib.sha256(before.read_bytes()).hexdigest(),'sha256After':hashlib.sha256(after.read_bytes()).hexdigest(),'bytesBefore':before.stat().st_size,'bytesAfter':after.stat().st_size}
 if name in names[:3]:
  old,new=positions(before,name),positions(after,name)
  assert len(old)==len(new)==(15 if name=='kit-ejercicios-soplo' else 20),(name,len(old),len(new))
  item['activities']=[{'number':n,'before':old[n],'after':new[n],'startedMidPageBefore':old[n]['yPt']>100} for n in old]
  assert len(set(r['page'] for r in new.values()))==len(new), 'Cada actividad debe tener su propia página'
 report.append(item)
 print(name,item['beforePages'],'->',item['afterPages'],'text diff empty:',not diff)
(DIR/'layout-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
assert all(x['normalizedTextDiffEmpty'] for x in report),'Revisar diffs antes de desplegar'
