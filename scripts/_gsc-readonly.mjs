import fs from 'node:fs';
let token;
export async function gscQuery(requestBody){
 const stored=JSON.parse(fs.readFileSync('google-oauth-token.json','utf8'));
 token ||= stored.access_token;
 const url='https://searchconsole.googleapis.com/webmasters/v3/sites/'+encodeURIComponent('https://www.espaciolenguaje.com/')+'/searchAnalytics/query';
 const run=()=>fetch(url,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(requestBody),signal:AbortSignal.timeout(25000)});
 let response=await run();
 if(response.status===401){const client=JSON.parse(fs.readFileSync('google-oauth-client.json','utf8')).installed;const refresh=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({client_id:client.client_id,client_secret:client.client_secret,refresh_token:stored.refresh_token,grant_type:'refresh_token'}),signal:AbortSignal.timeout(25000)});if(!refresh.ok)throw Error('OAuth refresh HTTP '+refresh.status);token=(await refresh.json()).access_token;response=await run();}
 if(!response.ok)throw Error('GSC HTTP '+response.status);
 return await response.json();
}
