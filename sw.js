const CACHE='yu-xiao-miao-pwa-v13';
const ASSETS=['./','./index.html','./styles.css','./styles.css?v=20260817-layout-fix','./app.js','./app.js?v=20260820','./record.js','./record.js?v=20260820','./orders.js','./orders.js?v=20260820','./selected-day.js','./selected-day.js?v=20260820','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  // Static app assets use cache-first so the installed PWA opens immediately.
  // A background request refreshes the cache for the next launch.
  event.respondWith(caches.match(event.request).then(cached=>{
    const refresh=fetch(event.request).then(response=>{
      if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));
      return response;
    }).catch(()=>null);
    if(cached){event.waitUntil(refresh);return cached;}
    return refresh.then(response=>response||caches.match('./index.html'));
  }));
});
