const CACHE = 'acompfinc-v2';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icone-192.png', './icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(chaves =>
    Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.hostname.indexOf('google.com') >= 0 || url.hostname.indexOf('googleusercontent.com') >= 0) return;

  e.respondWith(
    caches.match(e.request).then(cache => {
      const rede = fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && (url.origin === location.origin || url.hostname.indexOf('fonts.') >= 0)) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return resp;
      }).catch(() => cache);
      return cache || rede;
    })
  );
});
