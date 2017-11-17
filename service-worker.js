var cacheName = 'v1';
var cacheFiles = [
    './',
    './index.html',
    './style.css',
    './index.html',
    './script.js',
    './http://fonts.googleapis.com/css?family=Ubuntu:400,700',
    './http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'
]

self.addEventListener('install', function (e) {
    console.log("[ServiceWorker] Installed")
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})
self.addEventListener('activate', function (e) {
    console.log("[ServiceWorker] Activate")
})

self.addEventListener('fetch', function (e) {
console.log("[ServiceWorker] Fetching", e.request.url);
})
