const cacheName = "playgroundCache-v1.13";
const staticFiles = [
  "/playground/",
  "/playground/assets/index.css",
  "/playground/assets/index.js",
  "https://fonts.googleapis.com/css?family=Shadows+Into+Light|Poppins:ital@1&display=swap",
  "https://fonts.googleapis.com/css?family=Baloo+Thambi+2&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css",
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
