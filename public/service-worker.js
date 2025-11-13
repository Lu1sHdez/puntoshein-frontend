/* eslint-disable no-restricted-globals */

// Nombre fijo para manejar versiones
const CACHE_NAME = "puntoshein-cache-v7";
const OFFLINE_URL = "/index.html";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/acercaDe",
  "/privacidad",
  "/terminos",
  "/deslindeLegal",
  "/contacto",
  "/mapa-del-sitio",
  "/preguntasFrecuentes",
];

// === INSTALACIÓN ===
self.addEventListener("install", (event) => {
  console.log("[SW] Instalando y precacheando...");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);

      // Precarga automática de todos los archivos generados en el build
      try {
        const res = await fetch("/asset-manifest.json");
        const manifest = await res.json();
        const files = Object.values(manifest.files || {});
        const assets = files.filter(
          (path) =>
            path &&
            (path.endsWith(".js") ||
              path.endsWith(".css") ||
              path.endsWith(".png") ||
              path.endsWith(".jpg") ||
              path.endsWith(".svg"))
        );
        await cache.addAll(assets);
        console.log(`[SW] Archivos estáticos añadidos: ${assets.length}`);
      } catch (err) {
        console.warn("[SW] No se pudo leer asset-manifest.json", err);
      }
    })()
  );
  self.skipWaiting();
});

// === ACTIVACIÓN ===
self.addEventListener("activate", (event) => {
  console.log("[SW] Activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Solo interceptar API GET
  if (request.method === "GET" && request.url.includes("/api/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        // 1) Responder instantáneo desde caché
        const cachedResponse = await cache.match(request);

        // 2) Actualizar en segundo plano
        const networkPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        // 3) Cache si existe; si no, esperar la red
        return cachedResponse || networkPromise;
      })()
    );

    return; // ⚠ para que no pase al manejador general
  }
});
// === INTERCEPTAR PETICIONES ===
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cachear recursos estáticos
          if (
            response.ok &&
            (request.url.includes("/static/") ||
              request.url.endsWith(".js") ||
              request.url.endsWith(".css") ||
              request.url.endsWith(".png") ||
              request.url.endsWith(".jpg") ||
              request.url.endsWith(".svg"))
          ) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          }
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL)); // Fallback cuando no hay red
    })
  );
});
