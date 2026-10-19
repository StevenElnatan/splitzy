/* Splitzy service worker: lets the app open and scan with no internet.
   Online it always fetches the newest files (falling back to the saved copy if the network is slow or down).
   Bump VERSION whenever you upload new files. */
const VERSION='splitzy-v6';
const FILES=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const saved=()=>caches.match(r,{ignoreSearch:true}).then(h=>h||(r.mode==='navigate'?caches.match('./index.html').then(x=>x||caches.match('./')):undefined));
  const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res});
  e.respondWith(Promise.race([net,new Promise((_,no)=>setTimeout(no,6000))]).catch(()=>saved().then(h=>h||net.catch(()=>Response.error()))));
});
