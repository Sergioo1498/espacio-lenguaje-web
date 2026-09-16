import fs from 'node:fs';
const inventory=JSON.parse(fs.readFileSync('pinterest/inventory.json','utf8'));
const boards=['Fichas de logopedia para imprimir','Ejercicios de pronunciación (R, S y más)','Actividades de lenguaje 0-3 años','Actividades de lenguaje 3-6 años','Dislexia y tartamudez: guía para familias','Material para logopedas y maestros'];
// Titles summarize the linked source; panel text is taken literally from its headings.
const rows=`fichas-logopedia-gratis-imprimir|Fichas de logopedia gratis para imprimir|3,4,5|0|transaccional
fichas-articulacion|Fichas de articulación: material imprimible por fonema|0,1,2|0|transaccional
cuaderno-0-3|Cuaderno de estimulación del lenguaje de 0 a 3 años|0,1,2|2|transaccional
cuaderno-3-6|Cuaderno de logopedia de 3 a 6 años|0,1,2|3|transaccional
kit-soplo|Kit de ejercicios de soplo con material casero|0,1,2|1|transaccional
pack-completo|Pack completo de logopedia infantil en PDF|0,1,2|0|transaccional
fichas-logopedia-gratis-imprimir|Fichas de logopedia: articulación, vocabulario y comprensión|3,4,7|0|transaccional
fichas-articulacion|Fichas de articulación con silabario y registro de progreso|1,2,5|0|transaccional
cuaderno-0-3|Cuaderno de estimulación 0–3: actividades con materiales cotidianos|1,2,4|2|transaccional
cuaderno-3-6|Cuaderno 3–6: actividades de conciencia fonológica|1,3,4|3|transaccional
pack-completo|Pack completo: fichas, cuadernos y calendario semanal|0,1,2|0|transaccional
fichas-logopedia-gratis-imprimir|Fichas de logopedia: muestra gratuita de articulación|3,4,5|0|transaccional
ejercicios-para-la-r-fuerte|Ejercicios para la R fuerte: de palabras a frases|5,6,7|1|articulacion
como-ensenar-la-r-a-un-nino|Cómo enseñar la R: R suave y RR fuerte|1,2,3|1|articulacion
mi-hijo-no-pronuncia-la-s|Mi hijo no pronuncia la S: tipos de sigmatismo|0,1,2|1|articulacion
praxias-bucofaciales-ninos|Praxias bucofaciales: para qué sirven y para qué no|1,2,3|1|articulacion
ejercicios-de-soplo-para-ninos|Ejercicios de soplo: plumas, pompas y molinillos|3,5,7|1|articulacion
dislalia-infantil-tipos|Dislalia infantil: los tipos explicados|3,4,5|1|articulacion
ejercicios-para-la-r-fuerte|Ejercicios para la R fuerte: cuándo consultar|1,6,8|1|articulacion
como-ensenar-la-r-a-un-nino|Cómo enseñar la R: qué es el rotacismo|0,1,3|1|articulacion
praxias-bucofaciales-ninos|Praxias bucofaciales con espejo: conoce sus límites|1,2,3|1|articulacion
kit-soplo|Kit de soplo: juego compartido y seguimiento|1,2,3|1|articulacion
actividades-ninos-2-anos-lenguaje|Actividades de lenguaje para niños de 2 años|4,5,6|2|desarrollo
etapas-desarrollo-del-lenguaje|Etapas del desarrollo del lenguaje de 0 a 6 años|0,5,8|2|desarrollo
a-que-edad-debe-hablar-un-nino|¿A qué edad debe hablar un niño?|0,2,4|2|desarrollo
estimulacion-del-lenguaje-en-casa|Estimulación del lenguaje en casa: actividades por edad|1,4,6|2|desarrollo
actividades-ninos-2-anos-lenguaje|Actividades de lenguaje: cesto, libros y paseo|4,5,6|2|desarrollo
mi-hijo-de-3-anos-no-habla-bien|Mi hijo de 3 años no habla bien|0,1,6|3|desarrollo
conciencia-fonologica-actividades|Conciencia fonológica: descubre sus tres niveles|3,4,5|3|desarrollo
juegos-para-estimular-el-habla|Juegos para estimular el habla en casa|3,4,7|3|desarrollo
dislexia-en-ninos-como-detectarla|Dislexia en niños: señales según la edad|0,1,7|4|dislexia-tartamudez
guia-dislexia|Guía de dislexia: adaptaciones escolares y acompañamiento familiar|0,3,4|4|dislexia-tartamudez
tartamudez-infantil-cuando-preocuparse|Tartamudez infantil: cuándo consultar|0,1,3|4|dislexia-tartamudez
guia-tartamudez|Guía de tartamudez infantil para familias y profesores|1,3,4|4|dislexia-tartamudez
dislexia-en-ninos-como-detectarla|Dislexia en niños: mitos y realidades|0,1,7|4|dislexia-tartamudez
guia-tartamudez|Tartamudez infantil: pautas familiares y cuándo consultar|0,1,4|4|dislexia-tartamudez
fichas-logopedia-gratis-imprimir|Fichas de logopedia para profesionales: articulación y vocabulario|3,4,5|5|profesionales
fichas-logopedia-gratis-imprimir|Fichas de logopedia: material de conciencia fonológica|3,5,7|5|profesionales
fichas-logopedia-gratis-imprimir|Fichas de logopedia para maestros: vocabulario y comprensión|4,5,7|5|profesionales
fichas-logopedia-gratis-imprimir|Fichas de logopedia: cinco tipos de material imprimible|2,3,7|5|profesionales
fichas-articulacion|Fichas de articulación: instrucciones para adultos|0,1,5|0|continuidad
cuaderno-0-3|Cuaderno 0–3: instrucciones paso a paso|0,2,4|2|continuidad
cuaderno-3-6|Cuaderno 3–6: variaciones por dificultad|0,1,4|3|continuidad
ejercicios-para-la-r-fuerte|Ejercicios para la R fuerte: palabras, frases y trabalenguas|5,6,7|1|continuidad
guia-dislexia|Guía de dislexia: ejercicios para casa y adaptaciones escolares|1,3,4|4|continuidad
fichas-logopedia-gratis-imprimir|Fichas de logopedia para imprimir: tipos de actividades|3,5,7|0|continuidad
vocabulario-ninos-como-ampliar|Vocabulario infantil: lectura compartida y juegos de categorías|4,6,7|3|continuidad
conciencia-fonologica-actividades|Conciencia fonológica: actividades para casa|0,2,8|3|continuidad
mi-hijo-no-pronuncia-la-s|Mi hijo no pronuncia la S: conoce el sigmatismo|0,2,7|1|continuidad
tartamudez-infantil-cuando-preocuparse|Tartamudez infantil: información para acompañar en familia|0,1,4|4|continuidad
pack-completo|Pack completo: materiales de estimulación del lenguaje|0,2,3|0|continuidad
a-que-edad-debe-hablar-un-nino|Desarrollo del lenguaje: primeras palabras y primeras frases|4,5,6|2|continuidad
actividades-ninos-2-anos-lenguaje|Actividades para niños de 2 años: ampliar el vocabulario|3,4,5|2|continuidad
praxias-bucofaciales-ninos|Praxias bucofaciales: materiales y usos|1,2,3|1|continuidad
guia-tartamudez|Guía de tartamudez: una sección para profesores|1,3,4|4|continuidad
fichas-logopedia-gratis-imprimir|Fichas de logopedia: recursos para el aula|3,4,7|5|continuidad
etapas-desarrollo-del-lenguaje|Etapas del lenguaje: de vocalizaciones a primeras palabras|1,3,5|2|continuidad
juegos-para-estimular-el-habla|Juegos de lenguaje: veo veo, canciones y cuentos|3,6,7|3|continuidad
kit-soplo|Kit de soplo: ejercicios progresivos y tabla de seguimiento|0,1,2|1|continuidad
dislexia-en-ninos-como-detectarla|Dislexia en niños: información y señales por edad|0,1,7|4|continuidad`;
const counts={};
const pins=rows.split('\n').map((line,i)=>{
 const [slug,headline,indices,board,cluster]=line.split('|');const source=inventory.find(p=>p.slug===slug);if(!source)throw Error(slug);
 const panels=indices.split(',').map(n=>source.headings[+n]);if(panels.some(p=>!p))throw Error(`Missing heading ${slug}`);
 const n=counts[slug]=(counts[slug]||0)+1;
 const filename=`pin-${slug}-${n}.png`;
 let description=`${headline}. ${source.kind==='product'?'Consulta qué incluye el recurso':'En el artículo encontrarás'}: ${panels.join('; ').toLowerCase()}. Información de logopedia infantil en Espacio Lenguaje.`;
 if(description.length>300)description=`${headline}. ${source.kind==='product'?'Consulta qué incluye el recurso':'Lee la guía'}: ${panels.slice(0,2).join('; ').toLowerCase()}. Espacio Lenguaje.`;
 if(description.length<150)description+=' Consulta el contenido completo en nuestra web.';
 if(description.length>300||description.length<150)throw Error(`Description length ${i+1} ${description.length}`);
 if(headline.split(/\s+/).length>12||headline.length>100)throw Error(`Headline length ${i+1}`);
 return {id:i+1,batch:i<40?'inicial':'continuidad',slug,headline,title:headline,description,panels,board:boards[+board],cluster,source:source.url,sourceKind:source.kind,filename,imageUrl:`https://www.espaciolenguaje.com/pinterest/${filename}`,link:`${source.url}?utm_source=pinterest&utm_medium=social&utm_campaign=pin-${slug}`,dayOffset:i<8?0:i<40?1+Math.floor((i-8)/4):12+Math.floor((i-40)/5)*7+(i-40)%5,time:i%2?'19:00':'10:00',scheduleStatus:'propuesta; fecha inicial pendiente',keywords:[headline.split(':')[0],'logopedia infantil',source.kind==='product'?'material imprimible':'familias'].join(', ')};
});
fs.writeFileSync('pinterest/pins.json',JSON.stringify(pins,null,2));
fs.writeFileSync('pinterest/boards.json',JSON.stringify(boards,null,2));
console.log(`Prepared ${pins.length} pins; all headlines <=12 words, titles <=100 characters and descriptions 150–300 characters.`);
