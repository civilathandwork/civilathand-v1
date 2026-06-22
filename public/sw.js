// This service worker exists solely to unregister any stale versions of itself.
// A previous service worker was registered and is now causing stale cache issues.
// This file ensures browsers cleanly remove the old registration.

self.addEventListener('install', () => {
  // Skip waiting so this SW activates immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all open clients immediately
  event.waitUntil(
    self.clients.claim().then(() => {
      // Unregister this service worker so future loads are unaffected
      return self.registration.unregister();
    })
  );
});
