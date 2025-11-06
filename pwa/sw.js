// Service Worker for Articles & Tools Website PWA
// Version 1.0.0 - Auto Cache Management

const CACHE_NAME = 'articles-tools-v1';
const RUNTIME_CACHE = 'articles-tools-runtime';
const CACHE_VERSION = '1.0.0';

// فایل‌های اصلی که باید کش شوند
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/components.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/components.js',
  '/assets/Font/fontiran.css',
  '/pwa/manifest.json',
  '/pwa/icons/256.png',
  '/pwa/icons/512.png',
  '/favicon.svg'
];

// نصب Service Worker و کش کردن فایل‌های استاتیک
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// فعال‌سازی Service Worker و پاک کردن کش‌های قدیمی
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// تابع برای تنظیم headers خودکار
function addCacheHeaders(response, url) {
  const headers = new Headers(response.headers);
  
  // تنظیم cache headers بر اساس نوع فایل
  if (url.pathname.match(/\.(css|js|woff|woff2|png|jpg|jpeg|svg|ico)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (url.pathname.match(/\.html$/)) {
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }
  
  // اضافه کردن security headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data:; connect-src 'self'");
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

// استراتژی Fetch: Cache First با Network Fallback و Auto Headers
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // فقط درخواست‌های همان origin را کش کن
  if (url.origin !== location.origin) {
    return;
  }

  // برای صفحات HTML از Network First استفاده کن
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // اضافه کردن headers خودکار
          const enhancedResponse = addCacheHeaders(response.clone(), url);
          
          // کش کردن نسخه جدید
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return enhancedResponse;
        })
        .catch(() => {
          // اگر آفلاین بود، از کش استفاده کن
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // اگر در کش نبود، صفحه آفلاین را نمایش بده
              return caches.match('/');
            });
        })
    );
    return;
  }

  // برای سایر فایل‌ها از Cache First استفاده کن
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // اگر درخواست موفق بود، در کش ذخیره کن
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // اضافه کردن headers خودکار
            const enhancedResponse = addCacheHeaders(response.clone(), url);

            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });

            return enhancedResponse;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error);
            // می‌توانید یک fallback response برگردانید
            return new Response('آفلاین هستید', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});

// مدیریت پیام‌ها از صفحه اصلی
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// مدیریت sync برای درخواست‌های پس‌زمینه
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // اینجا می‌توانید داده‌ها را همگام‌سازی کنید
      Promise.resolve()
    );
  }
});

// مدیریت نوتیفیکیشن‌ها
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'پیام جدید از ابـزارسـتـان',
    icon: '/pwa/icons/256.png',
    badge: '/pwa/icons/256.png',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'fa'
  };

  event.waitUntil(
    self.registration.showNotification('ابـزارسـتـان', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('[SW] Service Worker loaded');
