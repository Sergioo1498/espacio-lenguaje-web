import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import matter from 'gray-matter';
import sharp from 'sharp';
function readTS(file){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,process:{env:{}},Intl});return exports;}
const {products}=readTS('src/lib/products.ts');
const {productsContent}=readTS('src/lib/products-content.ts');
const source=fs.readFileSync('src/app/blog/[slug]/page.tsx','utf8');
const images=Object.fromEntries([...source.matchAll(/"([a-z0-9-]+)": \{ src: "([^"]+)"/g)].map(m=>[m[1],m[2]]));
const clean=s=>s.replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[*_`]/g,'').trim();
const inventory=[];
for(const file of fs.readdirSync('content').filter(f=>f.endsWith('.mdx'))){const {data,content}=matter(fs.readFileSync(`content/${file}`,'utf8'));const slug=file.replace('.mdx','');inventory.push({kind:'post',slug,url:`https://www.espaciolenguaje.com/blog/${slug}`,title:data.title,description:data.excerpt,image:images[slug]||data.image,priority:/fichas|ejercicios|actividades|juegos|conciencia|vocabulario|estimulacion|ensenar/.test(slug)?'solución / prioritaria':'problema / secundaria',headings:[...content.matchAll(/^#{2,3} (.+)$/gm)].map(m=>clean(m[1])),content});}
for(const p of products){const c=productsContent[p.id];inventory.push({kind:'product',slug:p.id,url:`https://www.espaciolenguaje.com/recursos/${p.id}`,title:c.seoTitle,description:c.seoDescription,image:p.image,priority:'transaccional / prioritaria',headings:c.features.map(f=>f.title),content:JSON.stringify(c),product:p,details:c});}
for(const item of inventory){const meta=await sharp(`public${item.image}`).metadata();item.imageWidth=meta.width;item.imageHeight=meta.height;}
fs.writeFileSync('pinterest/inventory.json',JSON.stringify(inventory,null,2));
fs.writeFileSync('pinterest/INVENTARIO.md','# Inventario de material publicado\n\n| Página | Prioridad | Imagen destacada | Tamaño real | Ideas extraídas |\n|---|---|---|---|---|\n'+inventory.map(p=>`| [${p.title}](${p.url}) | ${p.priority} | [Imagen](https://www.espaciolenguaje.com${p.image}) | ${p.imageWidth}×${p.imageHeight} | ${p.headings.slice(0,3).join(' · ').replaceAll('|','/')} |`).join('\n'));
console.log(JSON.stringify(inventory.map(({slug,title,headings,imageWidth,imageHeight})=>({slug,title,headings:headings.slice(0,9),imageWidth,imageHeight})),null,2));
