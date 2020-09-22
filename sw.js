const cacheName = "playgroundCache-v1.2";
const staticFiles = [
  "/playground/",
  "/playground/assets/index.css",
  "/playground/assets/index.js",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticFiles)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;

      return fetch(e.request).then(response => {
        if (response.status !== 200) return;

        const responseToCache = response.clone();
        caches.open(cacheName).then(cache => {
          cache.put(e.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
