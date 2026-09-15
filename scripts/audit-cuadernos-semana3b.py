import pathlib, subprocess, re, json, hashlib, difflib
ROOT=pathlib.Path(__file__).resolve().parents[1]
DIR=ROOT/'drafts/semana3b-sep2026'
BIN=next((ROOT/'tmp/pdfs/poppler').rglob('pdftotext.exe')).parent
def norm(s):return re.sub(r'\s+',' ',s).strip()
def extract(pdf,out):
 subprocess.run([str(BIN/'pdftotext.exe'),str(pdf.relative_to(ROOT)),str(out.relative_to(ROOT))],cwd=ROOT,check=True)
 return out.read_text(encoding='utf8')
def pages(pdf):
 s=subprocess.check_output([str(BIN/'pdfinfo.exe'),str(pdf.relative_to(ROOT))],cwd=ROOT,encoding='utf8',errors='replace')
 return int(re.search(r'Pages:\s+(\d+)',s)[1])
results=[]
for age in ['0-3','3-6']:
 name='cuaderno-estimulacion-'+age
 before=DIR/'before'/f'{name}.pdf';after=ROOT/'private/productos/_preview'/f'{name}-v2.pdf'
 old=extract(before,DIR/f'{name}-before.txt');new=extract(after,DIR/f'{name}-after.txt')
 layout=json.loads((DIR/f'{name}-layout.json').read_text(encoding='utf8'))
 cleaned=norm(new);missing=[];removed=[]
 for addition in layout['additions']:
  t=norm(addition['text'])
  # Index includes its footer, so it is removed with the whole index page.
  if addition['kind']=='pie' and t.endswith(' · 2'):continue
  if t not in cleaned:missing.append(addition)
  else:cleaned=cleaned.replace(t,' ',1);removed.append(addition)
 cleaned=norm(cleaned)
 diff='\n'.join(difflib.unified_diff(norm(old).split(' '),cleaned.split(' '),fromfile='original',tofile='final-sin-rotulos-autorizados',lineterm=''))
 (DIR/f'{name}-text.diff').write_text(diff,encoding='utf8')
 r={'file':name+'.pdf','beforePages':pages(before),'afterPages':pages(after),'expectedPages':layout['pages'],'sha256Before':hashlib.sha256(before.read_bytes()).hexdigest(),'sha256After':hashlib.sha256(after.read_bytes()).hexdigest(),'bytesBefore':before.stat().st_size,'bytesAfter':after.stat().st_size,'normalizedDiffEmpty':not diff,'missingAddedText':missing,'removedAdditions':removed,'overflow':layout['overflow']}
 results.append(r)
 print(name,'pages',r['beforePages'],'->',r['afterPages'],'diffEmpty',not diff,'missingAdditions',len(missing))
 if diff:print(diff[:2200])
(DIR/'text-audit.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf8')
assert all(r['normalizedDiffEmpty'] and not r['missingAddedText'] and not r['overflow'] and r['afterPages']==r['expectedPages'] for r in results)
