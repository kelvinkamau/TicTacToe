var consoleMessages = ["Hey hey there buddy! :)", "Hope you're having a great day 😊", "How do you comfort a JavaScript bug? You console it 😎"],
    consoleMessage = consoleMessages[Math.floor(Math.random() * consoleMessages.length)];
console.log(consoleMessage);
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open('cache').then(function (cache) {
        return cache.match(event.request).then(function (response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function (networkResponse) {
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                console.log("Error in fetch()", e);

                e.waitUntil(
                    caches.open('cache').then(function (cache) {
                        return cache.addAll([
                            '/',

                            'AunderwinceTicTacToe/index.html',
                            'AunderwinceTicTacToe/index.html?homescreen=1',
                            '/?homescreen=1',
                            'AunderwinceTicTacToe/script.js',
                            'AunderwinceTicTacToe/style.css',
                            'AunderwinceTicTacToe/images/ttc.png',
                            'https://fonts.googleapis.com/css?family=Ubuntu:400,700',
                            'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
                            'AunderwinceTicTacToe/manifest.json',
                            'AunderwinceTicTacToe/sw.js',
                            'https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png'
                        ]);
                    })
                );
            });
            return response || fetchPromise;
        });
    }));
});