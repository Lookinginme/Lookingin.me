const CACHE_NAME = 'nurse-betty-cache-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/ai_checker',
  '/tracker',
  '/static/css/ai_checker.css',
  '/static/js/ai_checker.js',
  '/static/audio/NurseBetty_AI_Checker1.mp3',
  '/static/images/nursebettybot2.png',
  '/static/icons/betty-icon-192.png',
  '/static/icons/betty-icon-512.png'
];

// 🔧 Install event: cache all essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('🧁 Nurse Betty is caching essential files...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 🔁 Fetch event: serve cached version if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

// ♻️ Activate: optional cache cleanup (future)
self.addEventListener('activate', event => {
  console.log('✨ Service Worker activated');
});
