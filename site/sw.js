/* nobody fm: the service worker (issue #87). it keeps the station's shell (the page, its scripts and styles, the themes, the fonts,
   the icons) so the installed app opens without the wire, and nothing else: never a track, never the index, never an mp3, never
   the API. a request for anything not on the list below goes to the network as if this file did not exist. the shell is fetched
   network-first, so a new deploy is what a visitor gets whenever the wire is up; the cache is the fallback. */
const CACHE = 'nobody-shell-1';
const SHELL = [
  './', 'index.html', 'station.css', 'config.js', 'synth.js', 'visuals.js', 'terminal.js', 'volume.js', 'station.js', 'manifest.webmanifest',
  'themes/phosphor/theme.css', 'themes/phosphor/theme.js', 'themes/city/theme.css', 'themes/city/theme.js',
  'themes/tapedeck/theme.css', 'themes/tapedeck/theme.js', 'themes/arena/theme.css', 'themes/arena/theme.js', 'vis/arena-core.js',
  'themes/campfire/theme.css', 'themes/campfire/theme.js',
  'vendor/vt323.woff2', 'vendor/jetbrains-mono-variable.woff2', 'vendor/orbitron-variable.woff2', 'vendor/space-grotesk-variable.woff2',
  'vendor/barlow-condensed-700.woff2', 'vendor/barlow-condensed-800.woff2', 'vendor/patrick-hand.woff2', 'vendor/permanent-marker.woff2',
  'vendor/plex-mono-regular.woff2', 'vendor/unbounded-variable.woff2',
  'img/icon-192.png', 'img/icon-512.png', 'img/icon-maskable-512.png', 'img/icon-180.png', 'img/nobody-cover-400.webp', 'img/nobody-cover-1400.webp'
];
const scope = new URL(self.registration.scope);
const shellPaths = new Set(SHELL.map((p) => new URL(p, scope).pathname));
// what may never be cached, whatever the list says: audio by destination, extension or a range request
const AUDIO = /\.(mp3|wav|ogg|oga|opus|flac|m4a|aac|webm)$/i;
function isShell(req) {
  if (req.method !== 'GET' || req.destination === 'audio' || req.headers.has('range')) return false;
  const u = new URL(req.url);
  return u.origin === scope.origin && !AUDIO.test(u.pathname) && shellPaths.has(u.pathname);
}

self.addEventListener('install', (e) => {
  // one file that does not come (a font a deploy left out) does not keep the rest from being kept
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((p) => c.add(new Request(p, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('nobody-shell-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (!isShell(req)) return;   // not ours: the browser fetches it as if there were no worker
  // the page with any query (?theme=, ?play=) is the one page
  const key = new URL(req.url); key.search = ''; key.hash = '';
  e.respondWith(fetch(req).then((res) => {
    if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(key.href, copy)); }
    return res;
  }).catch(() => caches.match(key.href).then((hit) => hit || (req.mode === 'navigate' ? caches.match(new URL('index.html', scope).href) : null)).then((hit) => hit || Response.error())));
});
