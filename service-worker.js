const CACHE_NAME = "ai-chrome-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

// Install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(FILES_TO_CACHE)
    )
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", () => {
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(response =>
      response || fetch(e.request)
    )
  );
});
