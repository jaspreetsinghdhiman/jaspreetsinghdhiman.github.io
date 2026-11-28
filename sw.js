/* Jaspreet Singh Portfolio — service worker
 * Network-first for pages and local assets, with safe offline fallbacks.
 * Only portfolio routes are cached; Punjab Roots/Heritage sub-sites are excluded.
 */
const CACHE_PREFIX = 'jaspreet-portfolio';
const CACHE_VERSION = 'v1';
const CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION;
const OFFLINE_URL = '/offline.html';
const MAX_ASSET_ENTRIES = 80;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

function isPortfolioPath(pathname) {
  return !pathname.startsWith('/punjab-roots/') &&
         !pathname.startsWith('/punjab-heritage/');
}

async function trimAssetCache(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_ASSET_ENTRIES) {
    await Promise.all(keys.slice(0, keys.length - MAX_ASSET_ENTRIES).map((key) => cache.delete(key)));
  }
}

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function assetNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
      await trimAssetCache(cache);
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !isPortfolioPath(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, OFFLINE_URL));
    return;
  }

  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(assetNetworkFirst(request));
  }
});
