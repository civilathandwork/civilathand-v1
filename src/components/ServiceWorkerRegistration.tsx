"use client";

import { useEffect } from "react";

export const ServiceWorkerRegistration: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none", // Always check for SW updates from network
        });

        console.log("[PWA] Service worker registered:", registration.scope);

        // Auto-update: if a new SW is found, activate it immediately
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New content is available — tell the new SW to activate
              newWorker.postMessage({ type: "SKIP_WAITING" });
              console.log("[PWA] New version available — activating");
            }
          });
        });

        // When SW takes control, refresh so users get latest content
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });
      } catch (err) {
        console.warn("[PWA] Service worker registration failed:", err);
      }
    };

    // Register after page load so it doesn't compete with critical resources
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
    }
  }, []);

  return null; // This component renders nothing — it just runs the effect
};
