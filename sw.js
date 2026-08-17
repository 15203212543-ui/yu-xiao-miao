const CACHE='yu-xiao-miao-pwa-v6';
const ASSETS=['./','./index.html','./styles.css','./app.js','./app.js?v=20260814','./record.js','./record.js?v=20260814','./orders.js','./orders.js?v=20260814','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match(new URL(event.request.url).pathname.endsWith('/app.js')?'./app.js':'./index.html'))))});
