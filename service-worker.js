const CACHE_NAME = 'calculator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.pixabay.com/photo/2022/05/08/03/10/calculator-7181192_960_720.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'https://cdn.pixabay.com/photo/2022/05/08/03/10/calculator-7181192_960_720.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
