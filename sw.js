/* Splitzy service worker: caches the app so it opens and scans with no internet.
   Bump VERSION whenever you upload a new index.html. */
const VERSION='splitzy-v5';
const FILES=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSION).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}
    return res;
  }).catch(()=>r.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
