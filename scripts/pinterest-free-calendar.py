import csv, json, datetime as dt, shutil, re
from pathlib import Path
from zoneinfo import ZoneInfo

root=Path(__file__).resolve().parents[1]
folder=root/'pinterest'
if not (folder/'metricool-template.csv').exists():
    shutil.copyfile(Path('C:/Users/USER/Downloads/Mtr_plantilla_calendario.csv'),folder/'metricool-template.csv')
pins=json.loads((folder/'pins.json').read_text(encoding='utf-8'))
original=[{k:p[k] for k in ['id','title','description','imageUrl','board','link']} for p in pins]
def weekdays(month):
    return [dt.date(2026,month,d) for d in range(1,32) if d<=__import__('calendar').monthrange(2026,month)[1] and dt.date(2026,month,d).weekday()<5][:20]
later=weekdays(10)+weekdays(11)
first_times=['10:00','11:00','13:00','15:00','17:00','19:00','20:30','21:30']
for p in pins:
    i=p['id']
    if i<=8: date=dt.date(2026,9,17);time=first_times[i-1]
    elif i<=20: date=dt.date(2026,9,18)+dt.timedelta(days=i-9);time='10:00' if i%2 else '19:00'
    else: date=later[i-21];time='10:00' if i%2 else '19:00'
    p.update(date=date.isoformat(),time=time,dayOffset=(date-dt.date(2026,9,17)).days)
    local=dt.datetime.fromisoformat(p['date']+'T'+time).replace(tzinfo=ZoneInfo('Europe/Madrid'))
    p['publishUTC']=local.astimezone(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%S')
assert original==[{k:p[k] for k in original[0]} for p in pins]
assert all(sum(p['date'].startswith(f'2026-{m:02}') for p in pins)==20 for m in [9,10,11])
(folder/'pins.json').write_text(json.dumps(pins,ensure_ascii=False,indent=2),encoding='utf-8')
headers=next(csv.reader((folder/'metricool-template.csv').open(encoding='utf-8-sig'),delimiter=';'))
networks=['Facebook','Twitter/X','LinkedIn','GBP','Instagram','Pinterest','TikTok','Youtube','Threads','Bluesky']
rows=[]
for p in pins:
    row={h:'' for h in headers}
    row.update({n:'false' for n in networks})
    row.update({'Text':p['description'],'Date':p['date'],'Time':p['time']+':00','Draft':'false','Pinterest':'true','Picture Url 1':p['imageUrl'],'Alt text picture 1':p['headline'],'Pinterest Board':p['board'],'Pinterest Pin Title':p['title'],'Pinterest Pin Link':p['link'],'Pinterest Pin New Format':'false','Shortener':'false'})
    assert all(row[k] for k in ['Text','Date','Time','Draft','Pinterest','Picture Url 1','Pinterest Board','Pinterest Pin Title','Pinterest Pin Link'])
    assert all(row[n]=='false' for n in networks if n!='Pinterest')
    rows.append(row)
for suffix,subset in [('',rows),('-septiembre',rows[:20]),('-octubre',rows[20:40]),('-noviembre',rows[40:])]:
    with (folder/f'metricool-import{suffix}.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=headers,delimiter=';');w.writeheader();w.writerows(subset)
heading='# Calendario aprobado — Metricool Free\n\nAutorización: «ok programar y mantener la suscripcion gratuita asi que tenemos que ajustar las publicaciones a 20 mensuales».\n\n60 pines: 20 septiembre, 20 octubre, 20 noviembre. Inicio: 17-sep-2026 10:00 Madrid. Revisión día 60: 16-nov-2026; el calendario continúa hasta el 27-nov. Horas Europe/Madrid, incluido cambio de hora de octubre. La programación real se acredita en INFORME-PUESTA-EN-MARCHA.md.\n\nRevisión semanal: sesiones utm_source=pinterest, leads ORIGEN_TRAFICO=pinterest, pines publicados acumulados e impresiones/guardados/clics de Metricool.\n\n| Nº | Tipo | Título | Descripción | Board | Enlace | Fecha Madrid | Imagen |\n|---|---|---|---|---|---|---|---|\n'
(folder/'CALENDARIO.md').write_text(heading+'\n'.join(f"| {p['id']} | {p['type']} | {p['title']} | {p['description']} | {p['board']} | [Página]({p['link']}) | {p['date']} {p['time']} | [PNG]({p['imageUrl']}) |" for p in pins),encoding='utf-8')
with (folder/'tabla-60-pines.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f);w.writerow(['Nº','Tipo','Título','Descripción','Board','Enlace','Fecha Madrid','Imagen'])
    for p in pins:w.writerow([p['id'],p['type'],p['title'],p['description'],p['board'],p['link'],p['date']+' '+p['time'],p['imageUrl']])
gallery=root/'public/pinterest/index.html';html=gallery.read_text(encoding='utf-8')
for p in pins:
    pattern=r'(<small>'+str(p['id'])+r' · [^<]* · )\d{4}-\d{2}-\d{2} \d{2}:\d{2} Madrid'
    html,n=re.subn(pattern,lambda m:m.group(1)+p['date']+' '+p['time']+' Madrid',html);assert n==1
html=html.replace('Inicio acordado: 17-sep a las 10:00 Madrid. Programación pendiente de confirmación.','Calendario Free aprobado: 20 pines al mes de septiembre a noviembre. Inicio: 17-sep a las 10:00 Madrid.')
gallery.write_text(html,encoding='utf-8')
print('PASS: 60 pins, 20/month, original content unchanged, exact template headers, required fields filled, only Pinterest enabled.')
