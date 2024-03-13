self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache').then((cache) => {
      return cache.addAll([
        '/',
        '/style.css',
        '/script.js',
        '/manifest-light.json',
        '/manifest-dark.json',
        '/icon.svg',
        '/icon.png',
      ]);
    }),
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(globalThis.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).then((response) => {
          return caches.open('cache').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    }),
  );
});
