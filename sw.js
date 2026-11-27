// STRUXA service worker: network-first (always the newest version when online), cached copy when offline.
const V='struxa-v11',SHELL=['./','index.html','i18n.js','i18n-learn.js','learn.js','learn-joints.js','learn-failure.js','learn-history.js','learn-quiz.js','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png','favicon-32.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(V).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))))}
 else if(/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)){e.respondWith(caches.open(V).then(c=>c.match(r).then(h=>{const n=fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>h);return h||n})))}});
