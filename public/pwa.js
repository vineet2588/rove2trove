const note=document.querySelector('#connection-note');
function connectionState(){note.hidden=navigator.onLine;note.textContent='Offline · Sample gift discovery and saved treasures are available. Retailer websites need an internet connection.'}
addEventListener('online',connectionState);addEventListener('offline',connectionState);connectionState();
if('serviceWorker' in navigator&&window.isSecureContext){navigator.serviceWorker.register(new URL('./sw.js',import.meta.url)).catch(()=>{/* The normal website remains usable if offline caching is unavailable. */})}
let installPrompt;
const installButton=document.querySelector('#install-app');
addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.textContent='Install Rove2trove app'});
installButton.addEventListener('click',async()=>{if(installPrompt){await installPrompt.prompt();installPrompt=null}else document.querySelector('#install-dialog').showModal()});
document.querySelector('#close-install').onclick=()=>document.querySelector('#install-dialog').close();
addEventListener('appinstalled',()=>{installButton.hidden=true});
if(window.matchMedia('(display-mode: standalone)').matches)installButton.hidden=true;
