import {runtime} from './runtime.js';
import {recommend} from './catalog.js';
function demo(brief,offline=false){return {gifts:recommend(brief),mode:'demo',notice:`${offline?'Offline discovery. ':''}Sample collection · illustrative prices · delivery and availability unverified.`}}
export async function getRecommendations(brief){
  if(runtime.staticDemo||!navigator.onLine)return demo(brief,!navigator.onLine);
  try{
    const response=await fetch(new URL('./api/recommend',import.meta.url),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(brief),signal:AbortSignal.timeout(18000)});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'Please try again.');
    return data;
  }catch(error){if(error instanceof TypeError)return demo(brief,true);throw error}
}
