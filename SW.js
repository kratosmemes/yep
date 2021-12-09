const OFFLINE_VERSION = 1;
const CACHE_NAME = "cache-v2";
// Customize this with a different URL if needed

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the
      // response isn't fulfilled from the HTTP cache; i.e., it will be from
      // the network.
      await cache.addAll([
        './offline.html',
        './img/engrane.png',
        './styles/styles.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        './crearEvento.html',
        './estilos.css'
      ])
    })()
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      //Remove caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map((cache)=>{
            if(cache !== CACHE_NAME){
              console.log("Limpiando cache...");
              return caches.delete(cache)
            }
          })
        )
      });
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Always try the network first.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // catch is only triggered if an exception is thrown, which is likely
          // due to a network error.
          // If fetch() returns a valid HTTP response with a response code in
          // the 4xx or 5xx range, the catch() will NOT be called.
          console.log("Fetch failed; returning offline page instead.", error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match('./offline.html');
          return cachedResponse;
        }
      })()
    );
  }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});

self.addEventListener('fetch' , (e)=>{
  console.log("Fetching...");
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
});

self.addEventListener('push' , e=>{
  const data = e.data.json();
  console.log(data)
  self.registration.showNotification(data.title , {
      body: data.message
  });
})
