var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './style.css',
    './index.html',
    './script.js',
]

self.addEventListener('install', function (e) {
    console.log("[ServiceWorker] Installed")
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching cacheFiles")
return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function (e) {
    console.log("[ServiceWorker] Activated")
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.nap(function (thisCacheName) {
                if (thisCacheName !== cacheName){
                    console.log("[ServiceWorker] Removing Cached Files from" , thisCacheName);
                        return caches.delete(thisCacheName);
                }

            }))
        })
    )
})

self.addEventListener('fetch', function (e) {
    console.log("[ServiceWorker] Fetching", e.request.url);
})