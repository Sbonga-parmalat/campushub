const CACHE_NAME = 'campus-hub-v1';
// Add every single file you want to be available offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './learning.html',
    './library.html',
    './mfolozi.png',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght=700;800&display=swap'
];

// 1. Install Event: Saves your files into the phone's cache storage
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching app assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Activate Event: Cleans up old caches if you update the app version later
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Removing old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// 3. Fetch Event: Intercepts network requests to serve files offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached file if found, otherwise try to fetch it from the network
            return cachedResponse || fetch(event.request);
        })
    );
});
