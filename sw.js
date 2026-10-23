const CACHE='bozp-audit-premium-contact-20261023-v1';
const FILES=['./index.html','./manifest.webmanifest','./logo-sidebar.png','./hero.jpg','./hero-light.jpg','./icon-192.png','./icon-512.png','./company-1.jpg','./company-2.jpg','./company-3.jpg','./company-4.jpg','./company-5.jpg','./company-6.jpg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(FILES.map(file=>c.add(file)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('bozp-audit-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request; if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'||url.pathname.endsWith('/index.html')){
  event.respondWith(fetch(req).then(response=>{if(response.ok){const clone=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',clone));}return response;}).catch(()=>caches.match('./index.html').then(r=>r||Response.error())));return;
 }
 event.respondWith(caches.match(req,{ignoreSearch:true}).then(cached=>cached||fetch(req).then(response=>{if(response.ok)caches.open(CACHE).then(c=>c.put(req,response.clone()));return response;})));
});
