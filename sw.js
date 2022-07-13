self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache').then((cache) => {
      return cache.addAll([
        '/breathe/',
        '/breathe/style.css',
        '/breathe/script.js',
        '/breathe/manifest-light.json',
        '/breathe/manifest-dark.json',
        '/breathe/icon.svg',
        '/breathe/icon.png',
      ]);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
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
    })
  );
});
