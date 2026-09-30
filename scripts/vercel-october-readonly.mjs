import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const authPath=process.env.VERCEL_AUTH_FILE || path.join(process.env.APPDATA || path.join(os.homedir(),'AppData/Roaming'),'com.vercel.cli/Data/auth.json');
const {token}=JSON.parse(fs.readFileSync(authPath,'utf8'));
const {projectId,orgId:teamId}=JSON.parse(fs.readFileSync('.vercel/project.json','utf8'));
const read=async(endpoint,params={})=>{
 const url=new URL(endpoint,'https://api.vercel.com');url.search=new URLSearchParams({teamId,...params});
 const r=await fetch(url,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(25000)});
 return {http:r.status,data:await r.json()};
};
const common={projectId,since:'2026-09-01T00:00:00+02:00',until:new Date().toISOString(),limit:'100'};
const evidence={asOf:new Date().toISOString(),october:'No iniciado: fecha de ejecución 30-sep-2026',queries:{}};
for(const [name,dataset,params] of [
 ['pageviews','visits',{by:'requestPath'}],
 ['leads','events',{by:'eventData/fuente',filter:"eventName eq 'lead'"}],
 ...['descarga_pdf','inicio_checkout','compra'].map(event=>[event,'events',{by:'eventData/utm_campaign',filter:`eventName eq '${event}'`}])
]){
 try{evidence.queries[name]=await read(`/v1/query/web-analytics/${dataset}/aggregate`,{...common,...params});}
 catch(e){evidence.queries[name]={error:e.message};}
}
fs.writeFileSync('docs/codex/informes/vercel-analytics-septiembre.json',JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence,null,2));
const deploys=await read('/v6/deployments',{projectId,limit:'10'});
const clean={http:deploys.http,deployments:deploys.data.deployments?.map(d=>({id:d.uid,url:'https://'+d.url,state:d.state,target:d.target,created:d.created,commit:d.meta?.githubCommitSha,message:d.meta?.githubCommitMessage}))};
fs.writeFileSync('docs/codex/informes/vercel-deployments.json',JSON.stringify(clean,null,2));console.log(JSON.stringify(clean,null,2));
