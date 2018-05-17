self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open('cache').then(function(cache) {
        return cache.match(event.request).then(function(response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                // if we got a response from the cache, update the cache
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                // rejected promise - just ignore it, we're offline
                console.log("Error in fetch()", e);
                
                 e.waitUntil(
    caches.open('cache').then(function(cache) {
      return cache.addAll([
    '/',
        '/index.html',
        '/index.html?homescreen=1',
       '/?homescreen=1',
    './script.css',
    './style.css',
    './manifest.json',
    './http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    './http://fonts.googleapis.com/css?family=Ubuntu:400,700',
    './images/ttc.png/',
    '/sw.js/'
       
       
        
      ]);
    })
  );
               
            });

            // respond from the cache, or the network
            return response || fetchPromise;
        });
    }));
});
