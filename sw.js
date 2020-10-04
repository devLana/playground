const cacheName = "playgroundCache-v1.3";
const staticFiles = [
  "/playground/",
  "/playground/assets/index.css",
  "/playground/assets/index.js",
];

const corsCache = "playgroundCors-v1.1.2";
const dependencies = [
  "https://fonts.googleapis.com/css?family=Shadows+Into+Light|Poppins:ital@1&display=swap",
  "https://fonts.googleapis.com/css?family=Baloo+Thambi+2&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(staticFiles)));
});

self.addEventListener("install", e => {
  e.waitUntil(caches.open(corsCache).then(cache => cache.addAll(dependencies)));
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
  const cacheNames = [cacheName, corsCache];
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!cacheNames.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
