// JPNV Sports PWA Service Worker
// Optimized for mobile performance and offline capabilities

const CACHE_NAME = 'jpnv-sports-v1.2.0';
const urlsToCache = [
  '/jpnv-sports-2025/',
  '/jpnv-sports-2025/index.html',
  '/jpnv-sports-2025/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('JPNV Sports: Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('JPNV Sports: Cache install failed', error);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone request for fetch
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone response for caching
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // Return offline fallback for HTML pages
          if (event.request.destination === 'document') {
            return caches.match('/jpnv-sports-mobile-website.html');
          }
        });
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('JPNV Sports: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for match updates
self.addEventListener('sync', event => {
  if (event.tag === 'match-updates') {
    event.waitUntil(
      fetch('/api/matches')
        .then(response => response.json())
        .then(data => {
          // Update cached match data
          return caches.open(CACHE_NAME)
            .then(cache => {
              cache.put('/api/matches', new Response(JSON.stringify(data)));
            });
        })
        .catch(error => {
          console.log('JPNV Sports: Background sync failed', error);
        })
    );
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New JPNV Sports update available!',
    icon: '/images/jpnv-sports-icon-192x192.png',
    badge: '/images/jpnv-sports-badge-72x72.png',
    tag: 'jpnv-sports-notification',
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View Matches',
        icon: '/images/view-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/close-icon.png'
      }
    ],
    vibrate: [200, 100, 200],
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('JPNV Sports', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Notification closed, no action needed
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});