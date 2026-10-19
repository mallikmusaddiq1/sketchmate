const CACHE_NAME = "tracemate-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./lib/localforage.min.js",
  "./assets/icon.svg",
  "./manifest.json"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((k) =>
      Promise.all(
        k.map((n) => {
          if (n !== CACHE_NAME) {
            return caches.delete(n);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
