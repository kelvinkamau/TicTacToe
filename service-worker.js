var cacheName = 'v1';
var cacheFiles = [
   './',
    './index.html',
    './app.js',
    './script.css',
    './style.css',
    './http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    './http://fonts.googleapis.com/css?family=Ubuntu:400,700',
    'service-worker.js'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(

        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');
    
    e.waitUntil(

        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);

    e.respondWith(
        caches.match(e.request)
            .then(function(response) {

                if ( response ) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                    return response;
                }
                var requestClone = e.request.clone();
                fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            console.log("[ServiceWorker] No response from fetch request")
                            return response;
                        }
                        var responseClone = response.clone();

                        caches.open(cacheName).then(function(cache) {

                            cache.put(e.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', e.request.url);
                            return response;
                        });

                    })
                    .catch(function(err) {
                        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                    });
            })
    );
})