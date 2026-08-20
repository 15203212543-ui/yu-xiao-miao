const CACHE='yu-xiao-miao-pwa-v13';
const ASSETS=['./','./index.html','./styles.css','./styles.css?v=20260817-layout-fix','./app.js','./app.js?v=20260820','./record.js','./record.js?v=20260820','./orders.js','./orders.js?v=20260820','./selected-day.js','./selected-day.js?v=20260820','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
    return response;
  }).catch(async()=>{
    const exact=await caches.match(event.request);if(exact)return exact;
    const url=new URL(event.request.url),name=url.pathname.split('/').pop();
    if(name){const asset=await caches.match('./'+name);if(asset)return asset}
    if(event.request.mode==='navigate')return caches.match('./index.html');
    return new Response('',{status:503,statusText:'Offline asset unavailable'});
  }));
});
