
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('service-worker.js', {scope: './'})
        .then(function (registration) {
            console.log("Service Worker Registered", registration)
        })
        .catch(function (err) {
            console.log("Service Worker Failed to register", err);
        })
}
