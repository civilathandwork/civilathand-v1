/**
 * Civil At Hand — Production Service Worker
 * Strategy: Cache-First for static assets, Network-First for pages/API
 * Offline fallback page served when network unavailable
 */

const CACHE_VERSION = "cah-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// ── Assets to pre-cache on install ──────────────────────────────────────────
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/logo.jpg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // Core pages — cache shells for instant load
  "/blog",
  "/calculators",
  "/services/all-services",
  "/portfolio",
  "/education",
  "/about",
  "/contact",
  "/faq",
];

// ── Cache limits ─────────────────────────────────────────────────────────────
const MAX_DYNAMIC_ITEMS = 60;
const MAX_IMAGE_ITEMS = 30;
const MAX_CACHE_AGE_DAYS = 7;

// ── Install: pre-cache all shell assets ──────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("[SW] Pre-cache failed (some assets may be missing):", err))
  );
});

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !validCaches.includes(key))
            .map((key) => {
              console.log("[SW] Deleting old cache:", key);
              return caches.delete(key);
            })
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Helper: limit cache size ──────────────────────────────────────────────────
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxItems);
  }
}

// ── Helper: is the response fresh enough? ────────────────────────────────────
function isFresh(response) {
  if (!response) return false;
  const dateHeader = response.headers.get("date");
  if (!dateHeader) return true; // No date = assume fresh
  const age = (Date.now() - new Date(dateHeader).getTime()) / (1000 * 60 * 60 * 24);
  return age < MAX_CACHE_AGE_DAYS;
}

// ── Fetch: routing strategy ───────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore: non-GET, cross-origin (except Google Fonts / Analytics CDN), chrome-extension
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) {
    // Allow Google Fonts and Analytics through without caching
    if (
      url.hostname.includes("fonts.googleapis.com") ||
      url.hostname.includes("fonts.gstatic.com") ||
      url.hostname.includes("googletagmanager.com") ||
      url.hostname.includes("pagead2.googlesyndication.com")
    ) {
      return; // Let browser handle these normally
    }
    return; // All other cross-origin: skip SW
  }
  if (url.protocol === "chrome-extension:") return;

  // ── API routes: Network-Only (never cache) ─────────────────────────────────
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request));
    return;
  }

  // ── Images: Cache-First, fallback to network ──────────────────────────────
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached && isFresh(cached)) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh.ok) {
            cache.put(request, fresh.clone());
            trimCache(IMAGE_CACHE, MAX_IMAGE_ITEMS);
          }
          return fresh;
        } catch {
          return cached || new Response("Image unavailable offline", { status: 503 });
        }
      })
    );
    return;
  }

  // ── Static assets (_next/static): Cache-First, long-lived ─────────────────
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      })
    );
    return;
  }

  // ── manifest.json, robots.txt, sw.js: Cache-First ─────────────────────────
  if (
    url.pathname === "/manifest.json" ||
    url.pathname === "/robots.txt" ||
    url.pathname === "/sw.js"
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      })
    );
    return;
  }

  // ── HTML pages: Network-First, fallback to cache, then offline page ────────
  if (request.destination === "document" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
            trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Try to serve the root shell for SPA-style navigation
          const rootCache = await caches.match("/");
          if (rootCache) return rootCache;
          // Last resort: offline fallback page
          return caches.match("/offline") || new Response(
            `<!DOCTYPE html><html><head><title>Offline — Civil At Hand</title>
            <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
            <style>body{font-family:sans-serif;background:#111;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:2rem}
            h1{font-size:2rem;font-weight:900;text-transform:uppercase;margin-bottom:1rem}
            p{color:#94a3b8;margin-bottom:2rem}
            .orange{color:#f97316}
            a{display:inline-block;background:#f97316;color:#fff;font-weight:700;padding:.75rem 2rem;border-radius:.375rem;text-decoration:none;font-size:.75rem;text-transform:uppercase;letter-spacing:.1em}
            </style></head>
            <body><h1>CIVIL <span class="orange">AT HAND</span></h1>
            <p>You are currently offline. Check your internet connection and try again.</p>
            <a href="/">Try Again</a></body></html>`,
            { status: 200, headers: { "Content-Type": "text/html" } }
          );
        })
    );
    return;
  }

  // ── Everything else: Network-First with dynamic cache ─────────────────────
  event.respondWith(
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          const cache = await caches.open(DYNAMIC_CACHE);
          cache.put(request, response.clone());
          trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        return cached || new Response("Content unavailable offline", { status: 503 });
      })
  );
});

// ── Background Sync: retry failed form submissions when back online ───────────
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-leads") {
    event.waitUntil(syncLeads());
  }
});

async function syncLeads() {
  // Future: read from IndexedDB and replay failed /api/leads POST requests
  console.log("[SW] Background sync: leads");
}

// ── Push Notifications (ready for future use) ─────────────────────────────────
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Civil At Hand", body: event.data.text(), icon: "/icons/icon-192x192.png" };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "Civil At Hand", {
      body: data.body || "You have a new update.",
      icon: data.icon || "/icons/icon-192x192.png",
      badge: "/icons/icon-96x96.png",
      tag: data.tag || "cah-notification",
      data: { url: data.url || "/" },
      actions: [
        { action: "open", title: "Open App" },
        { action: "dismiss", title: "Dismiss" },
      ],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

console.log("[SW] Civil At Hand Service Worker loaded — version:", CACHE_VERSION);
