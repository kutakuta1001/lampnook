// public/sw.js — ビルド時にキャッシュ名とプリキャッシュ一覧の埋め込みが置換される（vite.config.ts の swBuildId）
const CACHE = "goho-1791979391870";
// ビルド成果物（ハッシュ付き JS/CSS を含む）の一覧。初回訪問後のオフライン起動に必要
const PRECACHE = ["/lampnook/","/lampnook/icon-192.png","/lampnook/icon-512.png","/lampnook/index.html","/lampnook/manifest.webmanifest","/lampnook/assets/main-BHTM_rTG.js","/lampnook/assets/shadowInvalidator-Dw9ivRHH.css","/lampnook/assets/shadowInvalidator-Zu_QOiiX.js","/lampnook/audio/CREDITS.md","/lampnook/audio/bellcricket.m4a","/lampnook/audio/birds.m4a","/lampnook/audio/brown.m4a","/lampnook/audio/cafe.m4a","/lampnook/audio/city.m4a","/lampnook/audio/fire.m4a","/lampnook/audio/forest.m4a","/lampnook/audio/insects.m4a","/lampnook/audio/lake.m4a","/lampnook/audio/pages.m4a","/lampnook/audio/rain.m4a","/lampnook/audio/stream.m4a","/lampnook/audio/tentrain.m4a","/lampnook/generated/assets.json","/lampnook/ui/brass.png","/lampnook/ui/envelope.png","/lampnook/ui/fabric.png","/lampnook/ui/groove.png","/lampnook/ui/key-down.png","/lampnook/ui/key.png","/lampnook/ui/knob.png","/lampnook/ui/memo.png","/lampnook/ui/paper.png","/lampnook/ui/plaque.png","/lampnook/ui/radio.png","/lampnook/ui/sticky.png","/lampnook/ui/tag.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  // skipWaiting しない: 開いている画面は旧版のまま動かし、開き直しで切り替える
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith("goho-") && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.headers.has("range")) return; // 音声の部分取得はキャッシュしない
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: req.mode === "navigate" });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === "basic") await cache.put(req, res.clone());
      return res;
    } catch (err) {
      if (req.mode === "navigate") { const shell = await cache.match("/lampnook/index.html"); if (shell) return shell; }
      throw err;
    }
  })());
});
