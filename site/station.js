/* nobody fm: the station. boot, the deck, the queue, tuning, the catalogue, the pages, the keys,
   the router, the counter, the guestbook, and what the city is told. design: docs/site-design.md
   (sections 1 to 11 for the behaviour, 12 for the look). classic script on purpose (5.7). */
(function () {
  'use strict';
  const V = NOBODY.vis, T = NOBODY.term, SY = NOBODY.synth, A = NOBODY.vis.analyser;
  const $ = function (id) { return document.getElementById(id); };
  const qs = new URLSearchParams(location.search);
  const MUTE = qs.get('mute') === '1';
  const FILE = location.protocol === 'file:';
  // test-only flags, honoured only with ?mute=1: ?autostart=1 presses the key for the harness after the boot,
  // ?boot=skip does the same without waiting for the typing. headless chrome cannot press a key.
  const AUTOSTART = MUTE && (qs.get('autostart') === '1' || qs.get('boot') === 'skip');
  const BOOT_SKIP = MUTE && qs.get('boot') === 'skip';
  const CFG = Object.assign({ tracksBase: '../tracks/', backend: null, requestLine: null, source: null, defaultTheme: 'phosphor' }, window.NOBODY_CONFIG || {});
  if (qs.get('tracks')) CFG.tracksBase = qs.get('tracks');
  // the request line (#26): a ?requestApi=<url>&requestKey=<key> query is honoured for a loopback address only, so a link can
  // never send the configured key somewhere else. the key is a public, pinned, rate-limited requester key (api/README.md).
  (function () {
    const qa = qs.get('requestApi');
    if (!qa) return;
    try {
      if (/^(127\.0\.0\.1|localhost|\[::1\])$/.test(new URL(qa).hostname)) {
        CFG.requestApi = qa; CFG.requestKey = qs.get('requestKey') || null;
        if (qs.get('turnstileSiteKey')) CFG.turnstileSiteKey = qs.get('turnstileSiteKey');   // the harness's Turnstile test key
      }
    } catch (e) {}
  })();
  if (!/\/$/.test(CFG.tracksBase)) CFG.tracksBase += '/';

  const st = NOBODY.st = {};
  // S is the station's state. it is exposed read-only as NOBODY.state for the screenshot and test harness.
  const S = NOBODY.state = {
    tracks: [], bySlug: {}, num: {}, queue: [], current: null, history: [], played: new Set(), albums: [], albumBySlug: {}, albumOfSlug: {},
    state: 'standby', shuffle: false, repeat: false, hl: -1, filter: '', sort: 'newest',
    onAir: false, airSince: 0, visitor: 0, view: 'home', readoutTyper: null, whyTyper: null,
    deadTimer: 0, deadLeft: 60, idleTimer: 0, tuningToken: 0, scopeMode: 'bars', booted: false,
    konami: [], nameTaps: 0, nameTapAt: 0, twoAmDone: '', preloader: null, dialBusy: false, localOnly: !CFG.backend
  };
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // two decks (issue #87): the next track loads into the one off air and crosses in; they swap ids, so `deck` and #deck are
  // always the one on air
  let deck = $('deck');
  const decks = [deck, $('deckB')], glass = $('glass'), power = $('power');
  const el = {};
  ['boot', 'bootLines', 'banner', 'bootTagline', 'bootFreq', 'bootWait', 'main', 'headerMain', 'headerPage', 'chip', 'chip2', 'uptime', 'uptime2',
    'trackCount', 'hdrSlug', 'hdrTime', 'hdrBar', 'hdrBack', 'txLabel', 'vol', 'volDeco', 'npSlug', 'npMeta', 'readout', 'readoutText', 'readoutCursor',
    'make', 'makeState', 'makeForm', 'makeWords', 'makeSend', 'makeRemix', 'makeLine',
    'audBadge', 'audRow', 'audBtn', 'audLine', 'progress', 'progressTime', 'dial', 'nextUp', 'spectrum', 'baseline', 'scope', 'deadair', 'tower', 'towerStatic', 'reread', 'bed', 'fat', 'fatPrev', 'fatPlay', 'fatNext', 'fatQueue', 'licence',
    'catalogue', 'sortLabel', 'shuffleLabel', 'findBtn', 'catHead', 'catRows', 'catEmpty', 'page', 'terminal', 'log', 'cmd', 'cmdCursor', 'promptRow', 'hints',
    'visitorInline', 'wireTag', 'footer', 'odometer', 'countTag', 'help', 'helpTitle', 'helpBody', 'helpClose', 'stationName', 'stationName2', 'transmitter',
    'themeBtn', 'themes', 'themeList', 'themesClose', 'failRow', 'failRetry', 'failNext',
    'car', 'carTapBtn', 'carState', 'carTitle', 'carAlbum', 'carViz', 'carCover', 'carUp', 'carPrompt', 'carFill', 'carTime', 'carPrev', 'carPlay', 'carNext', 'carKeep', 'carDrive', 'carMore']
    .forEach(function (id) { el[id] = $(id); });

  const BANNER = [
    '#   #  ###  ####   ###  ####  #   #    ##### #   #',
    '##  # #   # #   # #   # #   #  # #     #     ## ##',
    '# # # #   # ####  #   # #   #   #      ####  # # #',
    '#  ## #   # #   # #   # #   #   #      #     #   #',
    '#   #  ###  ####   ###  ####    #      #     #   #'
  ].join('\n');
  const BANNER_PHONE = [
    '#   #  ###  ####   ###  ####  #   #',
    '##  # #   # #   # #   # #   #  # # ',
    '# # # #   # ####  #   # #   #   #  ',
    '#  ## #   # #   # #   # #   #   #  ',
    '#   #  ###  ####   ###  ####    #  ',
    '                FM   88.8          '
  ].join('\n');
  /* ---------------- the theme (12.0): one token set, one visuals module, a few strings ---------------- */
  const THEMES = NOBODY.themes || {};
  NOBODY.theme = { current: null, name: null };
  function TH() { return NOBODY.theme.current; }
  function themeCtx() {
    return { el: el, glass: glass, power: power, S: S, get deck() { return deck; }, V: V, A: A, T: T, fmt: fmt, phone: phone, cols: cols, content: content,
      libs: function () { return NOBODY.libs || null; }, wantsTower: function () { return S.state === 'dead' || !!S.idle; }, print: T.print,
      // the actions (design 12.0, the interface hooks, issue #53): each is the station's own function, so a theme that owns the
      // browsing paradigm asks for the same things the keys and the commands do, and the log narrates them the same way
      play: function (slug) { if (S.bySlug[slug]) playNow(slug); },
      queue: function (slug) { st.queueAdd(slug); },
      open: function (slug) { if (S.bySlug[slug]) openTrack(slug); },
      find: function (words) { st.setFilter(words); },
      remix: function (slug) { st.remixThis(slug); },
      // albums (issue #73): the same API as NOBODY.albums/album/albumOf/cover/playAlbum, plus the album page
      openAlbum: function (slug) { if (S.albumBySlug[slug]) openAlbum(slug); }, playAlbum: function (slug) { return playAlbum(slug); },
      nextUp: function () { return nextUpInfo(); },
      // B-sides (issue #111): a theme's own automatic pick (a cruise, an auto-fly, a surprise) takes only a slug this says yes to
      inRotation: function (slug) { return inRotation(slug); },
      albums: function () { return S.albums.slice(); }, albumOf: function (track) { return albumOf(track); }, cover: function (x, size) { return coverUrl(x, size); },
      setHighlight: function (slug) { setHighlight(slug); },
      setLayout: function (name) { st.setLayout(name); },
      // a track's own file, for a theme that previews it through its own element (issue #64: the campfire's scope)
      src: function (slug) { return S.bySlug[slug] ? trackUrl(S.bySlug[slug], 'mp3') : null; }, fileMode: function () { return FILE; },
      tracks: function () { return S.tracks; }, queueList: function () { return S.queue.slice(); }, current: function () { return S.current; },
      filter: function () { return S.filter; }, visible: function () { return (S.visible || []).map(function (b) { return b.dataset.slug; }); },
      hidden: function () { return st.hidden(); }, layout: function () { return S.layout || null; } };
  }
  // the keys a theme may claim for its paradigm (12.0): the arrows, and letters the station's own table does not use. t is the
  // station's since issue #63 (the theme picker). the movement keys w a s d may be claimed together with the arrows: a is read by the
  // cheat code before any claim, and s, the station's shuffle, is shift+s while a theme holds it
  // `v` is the hidden mode's visualizer key; a theme that says visualizer: false (issue #82) has no station visualizer and may claim it
  // `+`, `=`, `-` and Home (issue #84): a theme with a map may zoom with them; a key the theme does not take is the volume again
  const CLAIMABLE = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'f', 'd', 'h', 'l', 'o', 'u', 'w', 'x', 'y', 'z', 'e', 'v', '+', '=', '-', 'Home'];
  const MOVEMENT = ['w', 'a', 's', 'd'];
  const IFACE = { kind: null, keys: [], arrows: false, layouts: [], viz: true };
  function themeInit(name) {
    const th = THEMES[name]; if (!th) return false;
    NOBODY.theme.current = th; NOBODY.theme.name = name; S.theme = name;
    document.documentElement.dataset.theme = name;
    th.init(themeCtx());
    th.stationName(el.stationName); th.stationName(el.stationName2);
    th.catalogue(S.tracks);
    if (S.current) th.playing(S.current);
    S.nextUpKey = null; drawNextUp();   // the new theme's nextUp hook hears the current answer (issue #87)
    drawVol();
    A.resize();
    themeInterface(th);
    if (CAR.on) { CAR.ink = null; CAR.coverSrc = ''; carSync(); if (S.current && S.onAir) mediaSession(S.bySlug[S.current]); }
    return true;
  }
  // the interface paradigm (12.0, issue #53): a theme that answers interface() claims keys, adds commands and names its layouts;
  // the station refuses a claim on one of its own keys and says so once. nothing here changes what the station does.
  function themeInterface(th) {
    const iface = th.interface ? th.interface() : null;
    IFACE.kind = iface ? (iface.kind || 'custom') : null; IFACE.keys = []; IFACE.arrows = false; IFACE.layouts = iface && iface.layouts ? iface.layouts.slice() : [];
    IFACE.viz = !(iface && iface.visualizer === false);
    HELP_HIDE[1] = IFACE.viz ? 'hide the interface (v: bars)' : 'hide the interface';
    hideVizSync();
    document.body.dataset.interface = IFACE.kind || '';
    // a theme without a paradigm may still add commands (issue #88: phosphor's `album` and `art`); it claims no key and no layout
    if (!iface) { delete document.body.dataset.layout; S.layout = null; if (th.commands) T.extend(S.theme, th.commands()); return; }
    const refused = [], withArrows = (iface.keys || []).some(function (k) { return /^Arrow/.test(k); });
    (iface.keys || []).forEach(function (k) { if (CLAIMABLE.indexOf(k) >= 0 || (withArrows && MOVEMENT.indexOf(k) >= 0)) IFACE.keys.push(k); else refused.push(k); });
    IFACE.arrows = IFACE.keys.some(function (k) { return /^Arrow/.test(k); });
    if (refused.length) T.print(S.theme + ' asked for ' + refused.join(', ') + '. the station keeps those keys. refused.', 'amber');
    if (th.commands) T.extend(S.theme, th.commands());
    if (IFACE.layouts.length) st.setLayout(IFACE.layouts[0], true);
  }
  function themeRelease() {
    T.retract(S.theme);
    IFACE.kind = null; IFACE.keys = []; IFACE.arrows = false; IFACE.layouts = []; IFACE.viz = true;
    document.body.dataset.interface = ''; delete document.body.dataset.layout; S.layout = null;
  }
  // the layout of the home view (12.0, issue #53): the station sets body[data-layout], the theme's CSS folds the cards, the theme
  // moves its camera; quiet skips the log line (the first layout at init)
  st.setLayout = function (name, quiet) {
    if (!IFACE.kind || IFACE.layouts.indexOf(name) < 0) { if (!quiet) T.print('no city here. the list is the city.', 'mid'); return; }
    if (S.layout === name) return;
    S.layout = name;
    document.body.dataset.layout = name;
    if (TH() && TH().layout) TH().layout(name);
    relayout();
    if (!quiet) T.print(name === 'air' ? 'the air.' : 'the ' + name + '.', 'mid');
  };
  st.layout = function () { return S.layout || null; };
  st.interfaceState = function () { return { kind: IFACE.kind, keys: IFACE.keys.slice(), layouts: IFACE.layouts.slice(), layout: S.layout || null }; };
  // the highlight by slug: one cursor for the list and for the theme's picture (12.0, issue #53)
  function setHighlight(slug) {
    const i = (S.visible || []).findIndex(function (b) { return b.dataset.slug === slug; });
    if (i < 0 || i === S.hl) return;
    S.hl = i; highlight();
  }
  function pageKind() { return S.state === 'dead' ? 'dead' : S.view === 'track' || S.view === 'album' ? 'page' : S.view === 'guestbook' ? 'guestbook' : 'home'; }
  document.addEventListener('libs-ready', function () { const th = TH(); if (th && th.libsReady) th.libsReady(); });

  /* ---------------- helpers ---------------- */
  function phone() { return V.phone(); }
  function cols() { return V.cols(); }
  function content() { return phone() ? cols() - 2 : cols() - 4; }
  // characters per second so a text of any length is typed within 2 s (issue #43); never slower than the design's rate
  function typingSpeed(text, cps) { return Math.max(cps, Math.ceil(String(text).length / 1.8)); }
  function finishTypers() {
    if (S.readoutTyper && !S.readoutTyper.done) S.readoutTyper.finish();
    if (S.whyTyper && !S.whyTyper.done) S.whyTyper.finish();
  }
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function hms(ms) { const s = Math.floor(ms / 1000); return String(Math.floor(s / 3600)).padStart(2, '0') + ':' + String(Math.floor(s / 60) % 60).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function pad(s, n) { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n) : s.padEnd(n); }
  function keyShort(k) {
    if (!k) return '';
    const m = /^([A-G])\s*(flat|sharp|b|#)?\s*(minor|major|m|maj|min)?/i.exec(k);
    if (!m) return k.slice(0, 4);
    let s = m[1].toUpperCase();
    if (m[2]) s += /flat|b/i.test(m[2]) ? 'b' : '#';
    if (m[3] && /^min|^m$/i.test(m[3])) s += 'm';
    return s;
  }
  function trackUrl(t, kind) {
    const f = t.files || {};
    const rel = f[kind] || (kind === 'mp3' ? t.slug + '/' + t.slug + '.mp3' : kind === 'notes' ? t.slug + '/notes.md' : t.slug + '/recipe.json');
    return CFG.tracksBase + rel;
  }
  // a shared link opens in the look the sharer is seeing: ?theme= is for that visit only (index.html never saves it),
  // so the friend's own saved theme stays theirs. only known-safe flags ride along, never the rest of the query.
  function permalink(slug) {
    const q = new URLSearchParams(location.search), out = new URLSearchParams();
    if (S.theme) out.set('theme', S.theme);
    if (q.get('camplist')) out.set('camplist', q.get('camplist'));
    // ?play= starts the station on that track with the theme on screen; #/track/ would open its info page over everything
    out.set('play', slug);
    return location.origin + location.pathname + '?' + out.toString();
  }
  function findTrack(arg) {
    if (!arg) return S.current ? S.bySlug[S.current] : null;
    const a = String(arg).trim().toLowerCase().replace(/^#/, '');
    if (S.bySlug[a]) return S.bySlug[a];
    if (/^\d+$/.test(a)) { const n = parseInt(a, 10); const t = S.tracks.find(function (x) { return S.num[x.slug] === n; }); if (t) return t; }
    return S.tracks.find(function (t) { return t.slug.indexOf(a) >= 0; }) || null;
  }
  function voiceCount() { return S.tracks.filter(function (t) { return t.voice; }).length; }
  function children(slug) { return S.tracks.filter(function (t) { return t.lineage && t.lineage.parent === slug; }); }
  function roots() { return S.tracks.filter(function (t) { return !(t.lineage && t.lineage.parent && S.bySlug[t.lineage.parent]); }); }
  function copyText(text, label) {
    const done = function () { T.print('copied: ' + (label || text)); };
    const fail = function () { T.print('clipboard refused. here it is: ' + text, 'amber'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail);
    else fail();
  }
  function button(label, cls, onclick) {
    const b = document.createElement('button'); b.className = 'bk' + (cls ? ' ' + cls : ''); b.textContent = label;
    if (onclick) b.addEventListener('click', function (e) { e.stopPropagation(); onclick(e); });
    return b;
  }
  function span(text, cls) { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = text; return s; }
  function div(cls) { const d = document.createElement('div'); if (cls) d.className = cls; return d; }

  /* ---------------- the catalogue (6.1, 6.2) ---------------- */
  function loadIndexJs() {
    return new Promise(function (res) {
      window.NOBODY_INDEX = undefined;
      const s = document.createElement('script');
      s.src = CFG.tracksBase + 'index.js?t=' + Date.now();
      s.onload = function () { res(window.NOBODY_INDEX || null); s.remove(); };
      s.onerror = function () { res(null); s.remove(); };
      document.head.appendChild(s);
    });
  }
  function loadIndex() {
    if (FILE) return loadIndexJs();
    return fetch(CFG.tracksBase + 'index.json', { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return loadIndexJs(); });
  }
  function installIndex(idx) {
    const tracks = (idx && Array.isArray(idx.tracks)) ? idx.tracks.filter(function (t) { return t && t.slug; }) : [];
    // newest on top always (6.2): by rendered_at, then date, then slug; an entry without rendered_at is its date at 00:00:00
    const when = function (t) { const v = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00')); return isNaN(v) ? 0 : v; };
    tracks.sort(function (a, b) { return (when(b) - when(a)) || String(b.date || '').localeCompare(String(a.date || '')) || String(b.slug).localeCompare(String(a.slug)); });
    S.tracks = tracks; S.bySlug = {}; S.num = {};
    tracks.forEach(function (t, i) { S.bySlug[t.slug] = t; S.num[t.slug] = tracks.length - i; });
    installAlbums(idx);
    el.trackCount.textContent = tracks.length + (tracks.length === 1 ? ' track' : ' tracks');
    drawAudition();
    if (TH()) TH().catalogue(tracks);
    return tracks.length;
  }
  function chronological() { return S.tracks.slice().reverse().map(function (t) { return t.slug; }); }
  /* B-sides (issue #111): a track the index marks "side": "b" (gen/b-sides.json) stays on the site, and the listener may pick it, queue
     it or play its album, but nothing automatic ever picks it: every automatic pick, the station's and a theme's (design 12.0), asks
     inRotation first. a catalogue with no A-side at all still plays, all of it, rather than go silent */
  function inRotation(slug) { const t = S.bySlug[slug]; return !!t && t.side !== 'b'; }
  function rotation() { const all = chronological(), on = all.filter(inRotation); return on.length ? on : all; }
  function isBSide(t) { return !!t && t.side === 'b'; }
  /* auditions (issue #148): a track the index tags "audition": true (gen/auditions.json) is new and the owner has not decided it.
     the audition session (`audition`, or the button on the now-playing card) plays only those, newest first, says where each one
     is in the session (3 of 11) and puts an AUDITION badge on the now-playing card; when none are left it says so and the rotation
     picks up. outside the session nothing changes: an auditioning B-side is still a B-side, never picked by anything automatic. */
  function isAudition(t) { return !!t && t.audition === true; }
  function auditions() { return S.tracks.filter(isAudition).map(function (t) { return t.slug; }); }   // S.tracks is newest first
  function inSession(slug) { return !!S.aud && S.aud.list.indexOf(slug) >= 0; }
  function startAudition(list) {
    S.aud = { list: list, heard: {} };
    T.print('audition: ' + list.length + ' undecided track' + (list.length === 1 ? '' : 's') + ', newest first. nothing else until they are done.');
  }
  // the station landed on slug: inside the session it counts as heard; off the list, or the station's own pick after the last
  // audition (S.aud.over, set by the refill), the session is over. a pick by hand (prev, play) inside the list carries on
  function audSync(slug) {
    if (!S.aud) return;
    if (inSession(slug) && (S.picked || !S.aud.over)) { S.aud.heard[slug] = true; S.aud.over = false; return; }
    const a = S.aud, left = a.list.filter(function (s) { return !a.heard[s]; }).length;
    endAudition(left ? 'audition over, ' + left + ' not heard. back to the rotation. audition picks it up again.' : 'no auditions left. back to the rotation.');
  }
  function endAudition(line) {
    const list = S.aud ? S.aud.list : [];
    S.aud = null;
    S.queue = S.queue.filter(function (s) { return list.indexOf(s) < 0; });
    T.print(line, 'mid');
    drawAudition(); drawNextUp(); tellQueue();
  }
  function drawAudition() {
    const n = auditions().length, pos = S.aud ? S.aud.list.indexOf(S.current) : -1;
    el.audBadge.hidden = !(S.current && isAudition(S.bySlug[S.current]));
    el.audRow.hidden = !S.aud && !n;
    el.audBtn.textContent = S.aud ? 'end audition' : 'audition';
    el.audLine.textContent = S.aud ? (pos >= 0 ? pos + 1 + ' of ' + S.aud.list.length : '') : n + ' undecided, newest first';
  }

  /* ---------------- albums (issue #73): the index's `albums`, each track's segments ----------------
     an album is { slug, title, project, cover_400, cover_1400, tracks, description, credits, licence }; its tracks are
     filtered to the ones in the catalogue, in album order. a track belongs to the album that lists it. */
  const PLACEHOLDER = { 400: 'img/nobody-cover-400.webp', 1400: 'img/nobody-cover-1400.webp' };
  function installAlbums(idx) {
    S.albums = []; S.albumBySlug = {}; S.albumOfSlug = {};
    ((idx && Array.isArray(idx.albums)) ? idx.albums : []).forEach(function (a) {
      if (!a || !a.slug || S.albumBySlug[a.slug]) return;
      const tracks = (a.tracks || []).filter(function (s) { return S.bySlug[s] && !S.albumOfSlug[s]; });
      if (!tracks.length) return;
      const al = Object.assign({}, a, { tracks: tracks, credits: Array.isArray(a.credits) ? a.credits : [] });
      S.albums.push(al); S.albumBySlug[al.slug] = al;
      tracks.forEach(function (s) { S.albumOfSlug[s] = al; });
    });
  }
  function albumOf(x) {
    const slug = typeof x === 'string' ? x : x && x.slug;
    return (slug && S.albumOfSlug[slug]) || null;
  }
  function albumTitle(a) { return a ? (a.title || a.slug) : ''; }
  function trackNo(slug) { const a = albumOf(slug); return a ? a.tracks.indexOf(slug) + 1 : null; }
  // an album from an album, a track, or either one's slug (an album's slug first)
  function resolveAlbum(x) {
    if (!x) return null;
    if (typeof x === 'string') return S.albumBySlug[x] || albumOf(x);
    if (Array.isArray(x.tracks) && S.albumBySlug[x.slug]) return S.albumBySlug[x.slug];
    return albumOf(x);
  }
  // a cover's URL: the album's own art at 400 or 1400 px, or the station's placeholder (a single, or an album without art)
  function coverUrl(x, size) {
    size = Number(size) === 1400 ? 1400 : 400;
    const a = resolveAlbum(x);
    const rel = a && (size === 1400 ? (a.cover_1400 || a.cover_400) : (a.cover_400 || a.cover_1400));
    return rel ? CFG.tracksBase + rel : PLACEHOLDER[size];
  }
  function hasArt(x) { return coverUrl(x, 400) !== PLACEHOLDER[400]; }
  function absUrl(u) { try { return new URL(u, location.href).href; } catch (e) { return u; } }
  function albumLink(slug) { return location.href.split('#')[0] + '#/album/' + slug; }
  // play an album: its first track now, the rest next in album order, ahead of whatever was queued
  function playAlbum(slug) {
    const a = S.albumBySlug[slug]; if (!a) return false;
    if (!S.onAir) { S.pendingAlbum = slug; goOnAir(null); return true; }
    if (S.state === 'dead') return false;
    S.queue = a.tracks.slice(1).concat(S.queue.filter(function (s) { return a.tracks.indexOf(s) < 0 && s !== S.current; }));
    T.print('album: ' + albumTitle(a) + '. ' + a.tracks.length + (a.tracks.length === 1 ? ' track' : ' tracks') + ', in order.');
    tuneTo(a.tracks[0]);
    return true;
  }
  // the theme-agnostic album API (the contract on #73): themes build their album views on these
  NOBODY.albums = function () { return S.albums.slice(); };
  NOBODY.album = function (slug) { return S.albumBySlug[slug] || null; };
  NOBODY.albumOf = function (track) { return albumOf(track); };
  NOBODY.cover = function (x, size) { return coverUrl(x, size); };
  NOBODY.playAlbum = function (slug) { return playAlbum(slug); };
  NOBODY.inRotation = function (slug) { return inRotation(slug); };

  /* ---------------- boot (2.1, 7) ---------------- */
  let bootCursor = null, bootTypers = [], bootDone = false, bootIndexPromise = null;
  function bootLineEls(prefix) {
    const line = span('', 'bl'); el.bootLines.appendChild(line); el.bootLines.appendChild(document.createTextNode('\n'));
    return line;
  }
  function moveCursor(target) {
    if (!bootCursor) { bootCursor = span('', 'cursor'); }
    target.appendChild(bootCursor);
  }
  // the eight boot lines: the timing is the station's (section 7), the words are the theme's (12.0)
  function bootLines(n, voices) { return TH().strings.boot(n, voices, phone(), S.localOnly, CFG.backend); }
  function typeLine(lineEl, prefix, answer, cls, pauseMs) {
    const p = span(''), a = span('', cls || '');
    lineEl.appendChild(p); lineEl.appendChild(a); moveCursor(lineEl);
    const t1 = V.type(p, prefix, 400); bootTypers.push(t1);
    return t1.promise.then(function () {
      return new Promise(function (r) { const to = setTimeout(r, pauseMs); bootTypers.push({ finish: function () { clearTimeout(to); r(); }, cancel: function () { clearTimeout(to); r(); } }); });
    }).then(function () { if (!answer) return; const t2 = V.type(a, answer, 400); bootTypers.push(t2); return t2.promise; });
  }
  // a scheduled boot step: finish() runs it now if it has not run yet, never twice
  function at(ms, fn) {
    let fired = false;
    const to = setTimeout(function () { fired = true; fn(); }, ms);
    bootTypers.push({ finish: function () { clearTimeout(to); if (!fired) { fired = true; fn(); } }, cancel: function () { fired = true; clearTimeout(to); } });
  }

  function runBoot(full) {
    S.booted = false; bootDone = false; bootTypers = [];
    el.boot.hidden = false; el.main.hidden = true;
    el.bootLines.textContent = ''; el.banner.textContent = ''; el.bootTagline.textContent = ''; el.bootFreq.textContent = ''; el.bootWait.textContent = '';
    bootIndexPromise = loadIndex().then(installIndex);
    const t0 = performance.now();
    const warm = !full;
    TH().transition('off', 'boot', { warm: warm });
    const cursorHome = bootLineEls();
    setTimeout(function () { moveCursor(cursorHome); }, 380);
    if (warm) {
      // the 900 ms warm start: the same lines without the typing
      at(400, function () {
        bootIndexPromise.then(function (n) {
          const lines = bootLines(n, voiceCount());
          el.bootLines.textContent = '';
          lines.forEach(function (l) { const le = bootLineEls(); le.appendChild(span(l[0])); le.appendChild(span(l[1], l[2] || '')); });
          TH().banner(el.banner, phone(), false);
          el.bootTagline.textContent = TH().strings.tagline;
          el.bootFreq.textContent = phone() ? '' : '88.8 MHz';
          finishBoot();
        });
      });
      return;
    }
    // the five-second rule (7): absolute targets from first paint
    const sched = [550, 700, 950, 1150, 1400, 1600, 1820];
    let lineEls = [];
    at(540, function () { el.bootLines.textContent = ''; });
    bootIndexPromise.then(function () {}); // keep the promise warm
    at(550, function () {
      const linesP = bootIndexPromise.then(function (n) { return bootLines(n, voiceCount()); });
      // lines 1..5 do not need the index; their text is the same whatever the catalogue says
      const staticLines = bootLines(0, 0);
      for (let i = 0; i < 5; i++) {
        at(sched[i] - 550, (function (i) { return function () { const le = bootLineEls(); lineEls[i] = le; typeLine(le, staticLines[i][0], staticLines[i][1], '', i === 0 ? 0 : 120); }; })(i));
      }
      at(sched[5] - 550, function () {
        const le = bootLineEls(); lineEls[5] = le;
        const p = span(''); le.appendChild(p); moveCursor(le);
        const prefix = staticLines[5][0];
        const tp = V.type(p, prefix, 400); bootTypers.push(tp);
        Promise.all([tp.promise, linesP, new Promise(function (r) { setTimeout(r, 250); })]).then(function (res) {
          const l = res[1][5]; const a = span(''); le.appendChild(a); moveCursor(le);
          const ta = V.type(a, l[1], 400); bootTypers.push(ta);
        });
      });
      at(sched[6] - 550, function () {
        const le = bootLineEls(); lineEls[6] = le;
        typeLine(le, staticLines[6][0], staticLines[6][1], '', 120);
      });
      at(2000 - 550, function () { const le2 = bootLineEls(); typeLine(le2, staticLines[7][0], staticLines[7][1], 'amber', 120); });
    });
    at(2200, function () { TH().banner(el.banner, phone(), true); });
    at(3100, function () {
      const t = V.type(el.bootTagline, TH().strings.tagline, 400); bootTypers.push(t);
      el.bootFreq.textContent = phone() ? '' : '88.8 MHz';
    });
    at(3560, finishBoot);
  }
  function finishBoot() {
    if (bootDone) return; bootDone = true;
    bootTypers.forEach(function (t) { if (t.finish) t.finish(); });
    el.bootWait.textContent = TH().strings.wait(phone());
    moveCursor(el.bootWait);
    S.booted = true;
    try { sessionStorage.setItem('nobody.booted', '1'); } catch (e) {}
    if (AUTOSTART) setTimeout(function () { goOnAir(null); }, BOOT_SKIP ? 10 : 200);
  }

  /* ---------------- going on air (4.1) ---------------- */
  function goOnAir(e) {
    if (S.onAir) return;
    if (!S.booted) finishBoot();
    S.onAir = true; S.airSince = Date.now();
    carWake();
    const ok = SY.create(deck, !FILE, MUTE, decks[1]);
    try { const v = parseInt(localStorage.getItem('nobody.vol'), 10); if (!isNaN(v)) SY.volume = v; } catch (err) {}
    SY.setVolume(SY.volume, deck, FILE || !ok);
    if (FILE || !ok) { A.ghost = true; }
    if (bootCursor && bootCursor.parentNode) bootCursor.parentNode.removeChild(bootCursor);
    el.boot.hidden = true; el.main.hidden = false;
    TH().transition('boot', 'air');
    bootIndexPromise.then(function () {
      buildCatalogue();
      if (FILE) T.print('file url: analyser is guessing. serve over http for the real thing.', 'amber');
      else if (!ok) T.print('no audio graph in this browser. the analyser is guessing.', 'amber');
      if (MUTE) T.print('muted by the harness: gain to the speakers is 0. the analyser still reads.', 'amber');
      if (!S.tracks.length) { deadAir(); return; }
      S.queue = rotation();
      // a shared link (?play=<slug>) or the theme's opening track (config themeStart) starts the station, and its album plays on.
      // the opening track is chosen (the listener's link, or the owner's own pick), so a B-side opens too; the album playing on
      // from it is the station's, so it skips the B-sides (issue #111)
      const shared = new URLSearchParams(location.search).get('play');
      const open = shared && S.bySlug[shared] ? shared : (CFG.themeStart || {})[S.theme];
      if (open && S.bySlug[open] && !/^#\/(track|album)\//.test(location.hash)) {
        const alb = S.albumOfSlug[open];
        const run = [open].concat(alb ? alb.tracks.slice(alb.tracks.indexOf(open) + 1).concat(alb.tracks.slice(0, alb.tracks.indexOf(open))).filter(inRotation) : []);
        S.queue = run.concat(S.queue.filter(function (s) { return run.indexOf(s) < 0; }));
      }
      const m = /^#\/track\/([^/?]+)/.exec(location.hash);
      if (m && S.bySlug[decodeURIComponent(m[1])]) {
        const slug = decodeURIComponent(m[1]);
        S.queue = [slug].concat(S.queue.filter(function (s) { return s !== slug; }));
      }
      // an album's link (or playAlbum before the key): the album plays first, in its order (issue #73)
      const ma = /^#\/album\/([^/?]+)/.exec(location.hash);
      const al = S.albumBySlug[S.pendingAlbum] || (ma && S.albumBySlug[decodeURIComponent(ma[1])]);
      S.pendingAlbum = null;
      if (al) S.queue = al.tracks.concat(S.queue.filter(function (s) { return al.tracks.indexOf(s) < 0; }));
      // `audition` before the key (issue #148): the session opens the station
      const aud = S.audStart ? auditions() : [];
      S.audStart = false;
      if (aud.length) { startAudition(aud); S.queue = aud.slice(); }
      setChip('ON AIR');
      tuneTo(S.queue.shift(), !!(m && S.bySlug[decodeURIComponent(m[1])]));
      route();
    });
  }

  function setChip(text, cls) {
    if (!cls && (text === 'PAUSED' || text === 'STANDBY')) cls = 'off';
    [el.chip, el.chip2].forEach(function (c) { c.textContent = '[' + text + ']'; c.className = 'bare chip' + (cls ? ' ' + cls : ''); });
    carSync();
  }

  /* ---------------- the deck, the queue, tuning (2.3, 5.1) ---------------- */
  function markRows() { renderRows(); tellQueue(); markAlbumRows(); carSync(); }
  // the album page's rows follow the deck like the catalogue's (issue #73)
  function markAlbumRows() {
    if (S.view !== 'album') return;
    el.page.querySelectorAll('.album-tracks .cat-row').forEach(function (r) {
      const stt = stateOf(S.bySlug[r.dataset.slug]);
      r.className = 'cat-row ' + stt;
      r.querySelector('.mark').textContent = stt === 'playing' || stt === 'tuning' ? '>' : stt === 'played' ? '.' : ' ';
    });
  }
  // picked: the listener chose this track (enter, a click, play, prev, a permalink), not the station's own rotation (issue #63). a picked
  // track that does not load stays chosen and says why, with [ try again ] and [ next ]; the rotation still skips on, as it always has
  function tuneTo(slug, picked) {
    const t = S.bySlug[slug];
    // a slug that is not in the catalogue is skipped, but never forever (issue #25)
    if (!t) { S.skipped = (S.skipped || 0) + 1; if (S.skipped > S.tracks.length + 1) { S.skipped = 0; T.error('nothing in the queue plays. dead air.'); return; } next(); return; }
    S.skipped = 0;
    const token = ++S.tuningToken;
    // a jump by hand never crossfades (issue #87): whatever was crossing in or fading out stops here, and the tuning plays
    cutFade();
    if (S.current && S.current !== slug) { S.played.add(S.current); S.history.push(S.current); }
    S.current = slug; S.state = 'tuning'; S.picked = !!picked;
    audSync(slug);
    tuningLook(slug, t);
    A.tuning = true;
    // the theme's own switch sound (issue #103), or the station's static when it has none
    // a hidden tab (issue #114) has no dial to watch: no switch sound and no hold, the next track plays as soon as it loads.
    // a tuning that starts while another is still holding stops the old one's sound first
    const away = document.hidden;
    if (S.stopNoise) S.stopNoise();
    const th = TH(), own = away ? null : th.transitionSound && th.transitionSound(1.2, { slug: slug });
    const stopNoise = S.stopNoise = away ? function () {} : typeof own === 'function' ? own : SY.tuning(1.2);
    // the theme's between-tracks move (12.5): in the city, the camera leaves through the tunnel for the next tower
    TH().playing(slug);
    TH().transition('playing', 'tuning', { slug: slug, ms: 1200, picked: !!picked });
    T.print('tuning ... 88.8 ... found: ' + slug);
    document.title = 'nobody fm: tuning';
    markRows();
    const started = performance.now();
    const from = 86.4 + Math.random() * 4.8;
    let ready = false, timeUp = false, failed = false;
    deck.pause();
    // from a file URL the deck is not in the graph (5.1), and a crossorigin element cannot load file-to-file
    if (FILE && deck.hasAttribute('crossorigin')) deck.removeAttribute('crossorigin');
    const src = trackUrl(t, 'mp3');
    deck.src = src;
    deck.load();
    function onReady() { ready = true; cleanup(); go(); }
    function onError() { onFail(null); }
    function onFail(why) {
      if (failed) return;
      failed = true; cleanup(); clearTimeout(failTimer);
      if (token !== S.tuningToken) return;
      stopNoise();
      failReason(src, why).then(function (reason) { if (token === S.tuningToken) tuneFailed(slug, reason, picked); });
    }
    function cleanup() { deck.removeEventListener('canplay', onReady); deck.removeEventListener('error', onError); }
    deck.addEventListener('canplay', onReady);
    deck.addEventListener('error', onError);
    // "locking ..." never sits forever: 8 s after the tuning started it becomes the failure line (issue #63)
    // and the switch sound never outlives it: whatever happened, it stops by then
    const failTimer = setTimeout(function () { stopNoise(); if (!ready && !failed && token === S.tuningToken) { deck.removeAttribute('src'); deck.load(); onFail('no answer in 8 s'); } }, 8000);
    // the hold ends on a timer, not on the dial (issue #114): a background tab runs no animation frames, and a hold that waited
    // for the sweep left the switch sound on, a hum, and the next track waiting until the tab came back
    setTimeout(function () { if (token === S.tuningToken && !timeUp) { timeUp = true; go(); } }, away ? 0 : 1200);
    (function sweep() {
      if (token !== S.tuningToken || timeUp) return;
      const k = Math.min(1, (performance.now() - started) / 1200);
      drawDial(from + (88.8 - from) * (1 - Math.pow(1 - k, 2)));
      if (k < 1) requestAnimationFrame(sweep);
    })();
    function go() {
      if (token !== S.tuningToken || failed) return;
      if (!timeUp || !ready) { if (timeUp && !ready) { drawDial(88.8, true, 'locking ...'); el.readoutCursor.classList.add('dimcur'); } return; }
      clearTimeout(failTimer);
      stopNoise();
      SY.rampIn();
      const p = deck.play();
      if (p && p.catch) p.catch(function () { T.print('the browser wants a key before it plays. press one.', 'amber'); S.state = 'paused'; setChip('PAUSED'); });
      S.state = 'playing';
      nowPlaying(t);
    }
  }
  // what the screen does between two tracks, whether the deck tunes (a jump) or crosses (the end of a track, issue #87)
  function tuningLook(slug, t) {
    el.failRow.hidden = true;
    hideDead();
    drawAudition();
    setChip('TUNING', 'tuning');
    el.txLabel.textContent = 'TUNING';
    el.readout.classList.add('tuning'); el.readout.classList.remove('typing');
    el.transmitter.classList.add('tuning-state');
    document.body.classList.add('amber-cursor');
    if (S.readoutTyper) S.readoutTyper.cancel();
    el.readoutText.textContent = '.'.repeat(Math.max(10, Math.min(47, content() - 20))) + ' locking ...';
    el.readoutCursor.classList.add('dimcur');
    el.npMeta.textContent = metaText(t, true);
    V.scramble(el.npSlug, slug, 1100);
    el.progress.hidden = true; el.dial.hidden = false;
    A.setTrack(slug, t.bpm);
  }
  // the crossfade's half of a track change (issue #87): the next track is already on air on the other deck and the last one is
  // fading under it, so there is no static and no load; the dial still sweeps (for the crossfade's length, at least the 1.2 s
  // of 5.1) and the theme still gets its tuning move, with `crossfade` in the info. the analyser reads the real music throughout.
  function glide(slug, secs) {
    const t = S.bySlug[slug], token = ++S.tuningToken, ms = Math.max(1200, Math.round(secs * 1000));
    if (S.current && S.current !== slug) { S.played.add(S.current); S.history.push(S.current); }
    S.current = slug; S.state = 'tuning'; S.picked = false;
    audSync(slug);
    tuningLook(slug, t);
    TH().playing(slug);
    TH().transition('playing', 'tuning', { slug: slug, ms: ms, crossfade: secs });
    T.print((XF.secs ? 'crossfade ' + secs.toFixed(1) + ' s' : 'gapless') + ' ... 88.8 ... found: ' + slug);
    document.title = 'nobody fm: tuning';
    mediaSession(t);
    markRows();
    const started = performance.now(), from = 88.8 - 0.6 - Math.random() * 1.2;
    let done = false;
    function land() {
      if (done || token !== S.tuningToken) return;
      done = true;
      S.state = deck.paused ? 'paused' : 'playing';
      nowPlaying(t);
      if (deck.paused) setChip('PAUSED');
    }
    (function sweep() {
      if (done || token !== S.tuningToken) return;
      const k = Math.min(1, (performance.now() - started) / ms);
      drawDial(from + (88.8 - from) * (1 - Math.pow(1 - k, 2)));
      if (k < 1) requestAnimationFrame(sweep); else land();
    })();
    setTimeout(land, ms + 50);   // no frames on a locked phone: the clock lands it
  }
  // why a file did not load, in words: over http a HEAD request says whether it is there at all; the media error says the rest
  function failReason(src, why) {
    if (why) return Promise.resolve(why);
    const code = deck.error ? deck.error.code : 0;
    const media = code === 2 ? 'the network dropped it' : code === 3 ? 'it would not decode' : code === 4 ? 'the browser could not read it' : 'it did not load';
    if (FILE) return Promise.resolve(code === 4 ? 'the file is missing or unreadable' : media);
    const ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 3000);
    return fetch(src, { method: 'HEAD', cache: 'no-store', signal: ctl.signal })
      .then(function (r) { clearTimeout(to); return r.ok ? media : 'the file is missing (http ' + r.status + ')'; })
      .catch(function () { clearTimeout(to); return 'the network did not answer'; });
  }
  // a picked track that failed stays the current one, says so in the readout and the log, and offers the two ways on (issue #63);
  // a track of the station's own rotation skips on to the next, as before
  function tuneFailed(slug, reason, picked) {
    const line = 'could not load ' + slug + ': ' + reason + '.';
    A.tuning = false;
    el.dial.hidden = true; el.progress.hidden = false;
    if (!picked) { T.error(line + ' next.'); setTimeout(next, 600); return; }
    S.state = 'failed';
    setChip('NO SIGNAL', 'dead');
    el.txLabel.textContent = 'NO SIGNAL';
    el.readout.classList.add('tuning'); el.readout.classList.remove('typing');
    el.transmitter.classList.remove('tuning-state');
    if (S.readoutTyper) S.readoutTyper.cancel();
    el.readoutText.textContent = line;
    el.readoutCursor.classList.add('dimcur');
    el.failRow.hidden = false;
    T.error(line);
    document.title = 'nobody fm: no signal';
    markRows();
  }
  st.retry = function () { if (S.current) tuneTo(S.current, true); };
  function metaText(t, tuning) {
    const seed = tuning ? 'seed .....' : 'seed ' + (t.seed != null ? t.seed : '-');
    if (phone()) return t.bpm + ' bpm  ' + (t.key || '') + '  ' + fmt(t.duration) + '  ' + seed;
    return t.bpm + ' bpm   ' + (t.key || '') + '   ' + fmt(t.duration) + '   ' + seed;
  }
  function nowPlaying(t) {
    setChip('ON AIR');
    el.txLabel.textContent = 'NOW PLAYING';
    el.readout.classList.remove('tuning');
    el.transmitter.classList.remove('tuning-state');
    document.body.classList.remove('amber-cursor');
    el.readoutCursor.classList.remove('dimcur');
    el.npSlug.textContent = t.slug;
    el.npMeta.textContent = metaText(t, false);
    drawDial(88.8, true);
    el.progress.hidden = false; el.dial.hidden = true;
    A.tuning = false;
    TH().transition('tuning', 'playing', { slug: t.slug, picked: !!S.picked });
    hideHint(t.title || t.slug);
    el.readout.classList.add('typing');
    // the typing finishes within 2 s whatever the prompt's length, or on any key (issue #43)
    S.readoutTyper = V.type(el.readoutText, t.prompt || t.idea || '', typingSpeed(t.prompt || t.idea || '', 60));
    S.readoutTyper.promise.then(function (finished) { if (finished) el.readout.classList.remove('typing'); });
    document.title = 'nobody fm: ' + t.slug;
    // the queue never runs dry while on air, so next up always has an answer (issue #87)
    if (!S.queue.length) refill();
    mediaSession(t);
    markRows();
    clearIdle();
    if (S.pendingPage) { const p = S.pendingPage; S.pendingPage = null; if (p.indexOf('album:') === 0) openAlbum(p.slice(6)); else openTrack(p); }
  }
  // the dial: the theme draws it (text ticks in phosphor, a strip of frequencies in the city)
  function drawDial(f, locked, note) { TH().dial(el.dial, f, !!locked, note || '', content()); }
  function replay(why) {
    deck.currentTime = 0;
    const p = deck.play(); if (p && p.catch) p.catch(function () {});
    S.state = 'playing'; setChip('ON AIR'); markRows();
    T.print(why);
  }
  function next() {
    if (!S.tracks.length) return;
    if (S.repeat && S.current) { S.repeat = false; replay('once more: ' + S.current); return; }
    // one track in the catalogue (issue #25): there is nothing else to tune to, so it plays again and says so
    if (!S.queue.length && !refill() && S.current) { replay('one track. it never stops: ' + S.current + ' again.'); return; }
    tuneTo(S.queue.shift());
  }
  // the queue never runs dry: the rest of the rotation (B-sides never, issue #111), shuffled, an album kept whole and in its
  // order (issue #87). false when there is nothing but the track on air
  function refill() {
    let rest = rotation().filter(function (s) { return s !== S.current; });
    // after the last audition (issue #148) the rotation picks up with a track from outside the session, so the session ends
    if (S.aud && rest.some(function (s) { return !inSession(s); })) rest = rest.filter(function (s) { return !inSession(s); });
    if (!rest.length) return false;
    if (S.aud) S.aud.over = true;
    S.queue = shuffleRuns(rest);
    T.print(S.aud ? 'that is the last audition. the rotation picks up after it.' : 'queue empty. refilled, shuffled. nobody stops.');
    return true;
  }
  // a shuffle that never shuffles inside an album: each album in the list is one run in album order, each single a run of one
  function shuffleRuns(list) { const runs = albumRuns(list); shuffleArray(runs); return [].concat.apply([], runs); }
  // shuffle off: the runs back in the catalogue's order (each by its oldest track), the album on air first so it plays on
  function orderRuns(list) {
    const order = chronological(), cur = S.albumOfSlug[S.current];
    const first = function (r) { return Math.min.apply(null, r.map(function (s) { return order.indexOf(s); })); };
    const runs = albumRuns(list).sort(function (a, b) {
      const ca = cur && S.albumOfSlug[a[0]] === cur ? 0 : 1, cb = cur && S.albumOfSlug[b[0]] === cur ? 0 : 1;
      return (ca - cb) || (first(a) - first(b));
    });
    return [].concat.apply([], runs);
  }
  function albumRuns(list) {
    const runs = [], seen = {};
    list.forEach(function (s) {
      const a = S.albumOfSlug[s];
      if (!a) { runs.push([s]); return; }
      if (seen[a.slug]) return;
      seen[a.slug] = true;
      runs.push(a.tracks.filter(function (x) { return list.indexOf(x) >= 0; }));
    });
    return runs;
  }
  function prev() {
    if (deck.currentTime > 3 || !S.history.length) { deck.currentTime = 0; return; }
    const slug = S.history.pop();
    S.played.delete(slug);
    const cur = S.current;
    S.current = null; // so tuneTo pushes nothing onto the history
    // the track left behind comes back next, unless it is a B-side: then the rotation does (issue #111)
    // in the audition session (issue #148), an audition comes back too
    if (cur && (inRotation(cur) || inSession(cur))) { S.queue.unshift(cur); S.played.delete(cur); }
    tuneTo(slug, true);
  }
  function shuffleArray(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; } }
  function playNow(slug) {
    if (!S.bySlug[slug]) return;
    if (S.current && S.current !== slug && (inRotation(S.current) || (inSession(S.current) && inSession(slug)))) S.queue.unshift(S.current);
    S.queue = S.queue.filter(function (s) { return s !== slug; });
    tuneTo(slug, true);
  }
  function togglePlay() {
    if (!S.onAir) { goOnAir(null); return; }
    if (S.state === 'dead') return;
    if (S.state === 'failed') { st.retry(); return; }
    if (deck.paused) { const p = deck.play(); if (p && p.catch) p.catch(function () {}); S.state = 'playing'; setChip('ON AIR'); clearIdle(); T.print('on air.'); }
    else { cutFade(); deck.pause(); S.state = 'paused'; setChip('PAUSED'); T.print('paused. the transmitter hums.'); armIdle(); }
    markRows();
  }
  // both decks carry the listeners; only the one on air is heard from (the other is loading, or fading out)
  decks.forEach(function (d) {
    d.addEventListener('ended', function () { if (d !== deck) return; S.state = 'ended'; next(); });
    d.addEventListener('timeupdate', function () {
      if (d !== deck || (S.state !== 'playing' && S.state !== 'paused')) return;
      drawProgress();
      positionState();
      continuity();
    });
    ['seeking', 'pause', 'ratechange'].forEach(function (ev) { d.addEventListener(ev, function () { if (d === deck) { clearTimeout(XF.timer); XF.timer = 0; } }); });
    ['play', 'pause'].forEach(function (ev) { d.addEventListener(ev, function () { if (d === deck && 'mediaSession' in navigator) navigator.mediaSession.playbackState = d.paused ? 'paused' : 'playing'; }); });
  });
  function drawProgress() {
    const d = deck.duration || (S.bySlug[S.current] || {}).duration || 0, c = deck.currentTime || 0;
    TH().progress(el.progress, el.hdrBar, c, d, phone(), S.view, content());
    carProgress(c, d);
    if (S.view !== 'home') el.hdrTime.textContent = fmt(c) + ' / ' + fmt(d);
  }
  // the volume fader is shared (volume.js, design 12.0 controls); a theme may only decorate the slot beside it
  function drawVol() {
    NOBODY.volume.draw(SY.volume, SY.muted);
    if (TH() && TH().volume) TH().volume(el.volDeco, SY.volume, SY.muted, phone());
    el.vol.setAttribute('aria-label', 'volume ' + SY.volume + ' of 10' + (SY.muted ? ', muted' : ''));
  }
  // quiet: the fader is being dragged, the gain follows and the line is printed once on release
  function setVol(v, quiet) {
    v = Math.round(Number(v));
    if (isNaN(v) || v < 0 || v > 10) { T.error('vol 0..10'); return; }
    SY.setVolume(v, deck, FILE || !SY.ctx);
    try { localStorage.setItem('nobody.vol', String(v)); } catch (e) {}
    drawVol(); if (!quiet) T.print('vol ' + v + '/10' + (SY.muted ? ' (muted)' : ''));
  }
  function seekTo(frac) { if (deck.duration) deck.currentTime = Math.max(0, Math.min(deck.duration - 0.1, frac * deck.duration)); drawProgress(); }
  function seekBy(s) { if (deck.duration) deck.currentTime = Math.max(0, Math.min(deck.duration - 0.1, deck.currentTime + s)); drawProgress(); }

  function mediaSession(t) {
    if (!('mediaSession' in navigator)) return;
    try {
      // the album's cover (issue #73); a single shows the theme's own picture, or the placeholder cover without one
      const a = albumOf(t);
      let art;
      if (a && hasArt(a)) art = [{ src: absUrl(coverUrl(a, 400)), sizes: '400x400', type: 'image/webp' }, { src: absUrl(coverUrl(a, 1400)), sizes: '1400x1400', type: 'image/webp' }];
      else {
        if (S.artwork === undefined) S.artwork = TH().artwork() || null;
        art = S.artwork ? [{ src: S.artwork, sizes: '512x512', type: 'image/png' }]
          : [{ src: absUrl(PLACEHOLDER[400]), sizes: '400x400', type: 'image/webp' }, { src: absUrl(PLACEHOLDER[1400]), sizes: '1400x1400', type: 'image/webp' }];
      }
      // the car view (issue #220): the title carries the album and the number, and every track has art of its own
      if (CAR.on) art = carArt(t);
      S.mediaArt = art[art.length - 1].src;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: CAR.on ? carLine(t) : t.title || t.slug, artist: 'NOBODY FM', album: a ? albumTitle(a) : '88.8 the transmitter nobody can find', artwork: art
      });
      if (!S.mediaHandlers) { S.mediaHandlers = true; mediaHandlers(); }
      positionState(true);
    } catch (e) {}
  }
  // the lock screen's and the media keys' buttons (issue #87): play and pause say what they mean (a play while playing does not
  // pause), next and previous are the station's, the seeks move the deck on air
  function mediaHandlers() {
    const ms = navigator.mediaSession, set = function (name, fn) { try { ms.setActionHandler(name, fn); } catch (e) {} };
    set('play', function () { if (!S.onAir || deck.paused) togglePlay(); });
    set('pause', function () { if (S.onAir && !deck.paused) togglePlay(); });
    set('stop', function () { if (S.onAir) st.stop(); });
    set('nexttrack', function () { if (S.onAir && S.state !== 'dead') next(); });
    set('previoustrack', function () { if (S.onAir && S.state !== 'dead') prev(); });
    set('seekto', function (d) { if (d && d.seekTime != null && deck.duration) { if (d.fastSeek && deck.fastSeek) deck.fastSeek(d.seekTime); else deck.currentTime = Math.max(0, Math.min(deck.duration - 0.1, d.seekTime)); positionState(true); } });
    set('seekbackward', function (d) { seekBy(-((d && d.seekOffset) || 10)); positionState(true); });
    set('seekforward', function (d) { seekBy((d && d.seekOffset) || 10); positionState(true); });
  }
  // the lock screen's scrubber: where the deck on air is, at most once a second unless something moved it
  function positionState(now) {
    if (!('mediaSession' in navigator) || !navigator.mediaSession.setPositionState) return;
    const d = deck.duration;
    if (!d || !isFinite(d) || (!now && performance.now() - (S.posAt || 0) < 1000)) return;
    S.posAt = performance.now();
    try { navigator.mediaSession.setPositionState({ duration: d, position: Math.min(d, deck.currentTime || 0), playbackRate: deck.playbackRate || 1 }); } catch (e) {}
  }

  /* ---------------- continuity (issue #87): the crossfade, the gapless join, next up ---------------- */
  // XF.secs is the crossfade in seconds: `crossfade` in config.js (4 by default), then this browser's `xfade <s>`, then ?xfade= for
  // one visit; 0 is a gapless join (a 50 ms equal-power cross, so the join does not click). once the track on air is past half way
  // or within 30 s of its end, the next one in the queue loads into the deck off air; XF.secs before the end it starts there at
  // gain 0 and the two channel gains cross (cos and sin, synth.js), then the decks swap ids. a jump by hand (next, prev, a play,
  // an album) never crosses: it tunes as it always did. no preload, so no crossfade, on a reduced-data connection (saveData), and
  // none from a file URL or without the audio graph, where the gains do not exist: the track ends and the next one tunes.
  const XF = { secs: 4, armed: null, timer: 0, fade: null };
  (function () {
    let v = CFG.crossfade;
    try { const k = localStorage.getItem('nobody.xfade'); if (k != null && k !== '') v = k; } catch (e) {}
    if (qs.get('xfade') != null) v = qs.get('xfade');
    v = parseFloat(v); if (!isNaN(v)) XF.secs = Math.max(0, Math.min(12, v));
  })();
  function saveData() { const c = navigator.connection; return !!(c && c.saveData); }
  function offAir() { return deck === decks[0] ? decks[1] : decks[0]; }
  // what plays when this track ends, or null when it is this one again (repeat) or nothing is known yet
  function upNext() { if (S.repeat || !S.queue.length || S.queue[0] === S.current) return null; return S.queue[0]; }
  function joinSecs() { return Math.max(0.05, Math.min(XF.secs, (deck.duration || 0) / 3)); }
  function continuity() {
    if (S.state !== 'playing' || deck.paused || !deck.duration || !isFinite(deck.duration) || saveData()) return;
    const slug = upNext(); if (!slug) return;
    const left = deck.duration - deck.currentTime;
    if ((!XF.armed || XF.armed.slug !== slug) && (deck.currentTime / deck.duration > 0.5 || left < 30)) arm(slug);
    if (!SY.deckConnected || XF.timer || !XF.armed || XF.armed.slug !== slug) return;
    const lead = left - joinSecs();
    if (lead < 1.5) XF.timer = setTimeout(join, Math.max(0, lead * 1000 / (deck.playbackRate || 1) - 20));
  }
  function arm(slug) {
    const d = offAir(), t = S.bySlug[slug]; if (!t) return;
    if (FILE && d.hasAttribute('crossorigin')) d.removeAttribute('crossorigin');
    if (SY.chans) SY.level(d, 0);
    d.pause(); d.preload = 'auto'; d.src = trackUrl(t, 'mp3'); d.load();
    XF.armed = { slug: slug, el: d };
  }
  function join() {
    XF.timer = 0;
    const a = XF.armed, slug = upNext();
    // not loaded in time, or the queue changed under it: the track ends and the next one tunes, as before
    if (!a || a.slug !== slug || a.el !== offAir() || S.state !== 'playing' || deck.paused || a.el.readyState < 3) return;
    const from = deck, to = a.el, secs = Math.max(0.05, Math.min(joinSecs(), from.duration - from.currentTime));
    XF.armed = null;
    S.queue.shift();
    SY.level(to, 0);
    const p = to.play();
    if (p && p.catch) p.catch(function () { if (deck === to && to.paused) { cutFade(); tuneTo(slug); } });
    SY.crossfade(from, to, secs);
    from.id = 'deckB'; to.id = 'deck'; deck = to;
    XF.fade = { from: from, to: to, slug: slug, secs: secs, timer: setTimeout(endFade, secs * 1000 + 150) };
    glide(slug, secs);
  }
  // the fade ran its course: the old deck stops and lets go of its file
  function endFade() {
    const f = XF.fade; if (!f) return;
    XF.fade = null; clearTimeout(f.timer);
    f.from.pause(); SY.level(f.from, 0);
    f.from.removeAttribute('src'); f.from.load();
  }
  // a jump, a pause or a stop: the deck on air is the only one heard, at full channel gain, at once
  function cutFade() {
    clearTimeout(XF.timer); XF.timer = 0;
    if (XF.fade) { const f = XF.fade; XF.fade = null; clearTimeout(f.timer); f.from.pause(); f.from.removeAttribute('src'); f.from.load(); }
    const o = offAir(); if (!o.paused) o.pause();
    if (SY.chans) { SY.level(deck, 1); SY.level(o, 0); }
  }
  // next up (issue #87): the track the queue plays next, for the transmitter's line, a theme's `nextUp(info)` hook and
  // NOBODY.nextUp(). info = { slug, title, album, n, of, in } (album, n and of only on an album; `in` the seconds to the join)
  function nextUpInfo() {
    const slug = upNext(), t = slug && S.bySlug[slug];
    if (!t) return null;
    const a = albumOf(t), d = deck.duration;
    const info = { slug: slug, title: t.title || slug, album: a ? albumTitle(a) : null, n: a ? a.tracks.indexOf(slug) + 1 : null, of: a ? a.tracks.length : null };
    info.in = d && isFinite(d) && S.state === 'playing' ? Math.max(0, +(d - deck.currentTime - (SY.deckConnected && !saveData() ? joinSecs() : 0)).toFixed(1)) : null;
    return info;
  }
  function drawNextUp() {
    const info = S.onAir && S.state !== 'dead' ? nextUpInfo() : null;
    const key = (info ? info.slug : '') + (S.repeat ? ':repeat' : '');
    if (key === S.nextUpKey) return;
    S.nextUpKey = key;
    el.nextUp.textContent = '';
    if (info) {
      el.nextUp.appendChild(span('next up ', 'label'));
      el.nextUp.appendChild(span(info.title));
      if (info.album) el.nextUp.appendChild(span('  ' + info.album + ' ' + info.n + '/' + info.of, 'mid'));
    }
    el.nextUp.hidden = !info;
    const th = TH(); if (th && th.nextUp) th.nextUp(info);
  }
  NOBODY.nextUp = function () { return nextUpInfo(); };
  NOBODY.crossfade = function () { return { secs: XF.secs, saveData: saveData(), graph: !!SY.deckConnected, armed: XF.armed ? XF.armed.slug : null, fading: !!XF.fade, onAir: deck.id }; };
  st.xfade = function (arg) {
    if (arg == null || arg === '') { T.print('crossfade ' + XF.secs + ' s' + (XF.secs ? '' : ' (gapless)') + (saveData() ? '. reduced data is on: no preload, so the next track tunes.' : !SY.deckConnected && S.onAir ? '. no audio graph here: the next track tunes.' : '.') + ' xfade <0..12> sets it, 0 is gapless.'); return; }
    const v = parseFloat(arg);
    if (isNaN(v) || v < 0 || v > 12) { T.error('xfade 0..12 (seconds; 0 is gapless)'); return; }
    XF.secs = v; clearTimeout(XF.timer); XF.timer = 0;
    try { localStorage.setItem('nobody.xfade', String(v)); } catch (e) {}
    T.print(v ? 'crossfade ' + v + ' s between tracks. a jump by hand still tunes.' : 'gapless: the next track starts as this one ends.');
  };

  // installable (issue #87): the manifest is in index.html; the service worker caches the station's shell, never a track
  function registerShell() {
    if (FILE || !('serviceWorker' in navigator) || !window.isSecureContext) return;
    const go = function () { navigator.serviceWorker.register('sw.js').catch(function () {}); };
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
  }

  /* ---------------- dead air (2.4) and the idle tower (5.6) ---------------- */
  function deadAir() {
    S.state = 'dead'; S.current = null;
    setChip('DEAD AIR', 'dead');
    el.txLabel.textContent = ''; el.npSlug.textContent = ''; el.npMeta.textContent = ''; el.readoutText.textContent = '';
    el.readout.hidden = true; el.progress.hidden = true; el.spectrum.hidden = true; el.baseline.hidden = true; el.scope.hidden = true; el.dial.hidden = true;
    el.deadair.hidden = false;
    drawNextUp();
    el.catEmpty.hidden = false; el.catRows.textContent = ''; el.catHead.textContent = '';
    el.hints.textContent = ''; el.hints.appendChild(hintButton('r', 're-read now', function () { rereadNow(); })); el.hints.appendChild(span('   ')); el.hints.appendChild(hintButton('?', 'help', function () { st.help(true); }));
    document.title = 'nobody fm: dead air';
    SY.bedStart();
    TH().transition('home', 'dead');
    startTower();
    S.deadLeft = 60;
    clearInterval(S.deadTimer);
    S.deadTimer = setInterval(function () {
      S.deadLeft--;
      el.reread.textContent = 're-reading index in 00:' + String(Math.max(0, S.deadLeft)).padStart(2, '0');
      el.bed.textContent = '.'.repeat(Math.max(8, content() - 16)) + ' static bed -42';
      if (S.deadLeft <= 0) rereadNow();
    }, 1000);
    el.reread.textContent = 're-reading index in 00:60';
    el.bed.textContent = '.'.repeat(Math.max(8, content() - 16)) + ' static bed -42';
  }
  function rereadNow() {
    S.deadLeft = 60;
    T.print('re-reading tracks/index.json ...', 'mid');
    loadIndex().then(installIndex).then(function (n) {
      if (!n) { T.print('still nothing. nobody is in a hurry.', 'mid'); return; }
      clearInterval(S.deadTimer);
      SY.bedStop();
      stopTower();
      el.deadair.hidden = true;
      el.readout.hidden = false; el.spectrum.hidden = false; el.baseline.hidden = false; el.scope.hidden = false;
      el.catEmpty.hidden = true;
      buildCatalogue();
      T.print('catalogue read. ' + n + ' tracks. ' + voiceCount() + ' has a voice.');
      S.queue = rotation();
      tuneTo(S.queue.shift());
    });
  }
  function hideDead() {
    if (el.deadair.hidden) return;
    clearInterval(S.deadTimer); SY.bedStop(); stopTower();
    el.deadair.hidden = true; el.readout.hidden = false; el.spectrum.hidden = false; el.baseline.hidden = false; el.scope.hidden = false;
    drawHints();
  }
  // dead air: the theme draws the tower (the ASCII one in phosphor, the city's unlit one or a CSS stand-in in city)
  function startTower() { S.towerOn = TH().towerStart(el.tower, el.towerStatic, phone()); }
  function stopTower() { TH().towerStop(); S.towerOn = false; }
  function armIdle() { clearIdle(); S.idleTimer = setTimeout(function () { if (S.state === 'paused') { S.idle = true; el.deadair.hidden = false; el.deadair.querySelector('.deadair-text').textContent = TH().strings.idle; el.deadair.querySelector('.label').textContent = 'IDLE'; TH().transition('home', 'dead'); startTower(); } }, 10 * 60 * 1000); }
  function clearIdle() { clearTimeout(S.idleTimer); if (S.idle) { S.idle = false; stopTower(); TH().transition('dead', 'home', { slug: S.current }); el.deadair.hidden = true; el.deadair.querySelector('.deadair-text').textContent = 'nothing in the catalogue yet. the machine is rendering. nobody is in a hurry.'; el.deadair.querySelector('.label').textContent = 'DEAD AIR'; } }

  /* ---------------- the catalogue band (2.2, 8) ---------------- */
  function displayOrder() {
    let r = roots();
    const by = function (f) { return function (a, b) { return f(a) < f(b) ? -1 : f(a) > f(b) ? 1 : 0; }; };
    if (S.sort === 'oldest') r = r.slice().reverse();
    else if (S.sort === 'bpm') r = r.slice().sort(by(function (t) { return t.bpm || 0; }));
    else if (S.sort === 'key') r = r.slice().sort(by(function (t) { return t.key || ''; }));
    else if (S.sort === 'len') r = r.slice().sort(by(function (t) { return t.duration || 0; }));
    else if (S.sort === 'tier') r = r.slice().sort(by(function (t) { return t.model || ''; }));
    else if (S.sort === 'num') r = r.slice().sort(by(function (t) { return S.num[t.slug]; }));
    else if (S.sort === 'lineage') r = r.slice().sort(by(function (t) { return S.num[t.slug]; }));
    // by album: the albums in the index's order, each in its own order, then the singles newest first
    else if (S.sort === 'album') r = r.slice().sort(by(function (t) { const a = albumOf(t); return a ? String(1e4 + S.albums.indexOf(a)) + String(1e4 + a.tracks.indexOf(t.slug)) : '3' + String(1e6 - S.num[t.slug]); }));
    const out = [];
    (function walk(list, depth) { list.forEach(function (t) { out.push({ t: t, depth: depth }); walk(children(t.slug), depth + 1); }); })(r, 0);
    return out;
  }
  function stateOf(t) {
    // a picked track that failed keeps the amber of a tuning row; its word says what happened (rowText)
    if (t.slug === S.current) return S.state === 'tuning' || S.state === 'failed' ? 'tuning' : 'playing';
    if (S.played.has(t.slug)) return 'played';
    return 'queued';
  }
  function matches(t) {
    if (!S.filter) return true;
    const al = albumOf(t), seg = t.segments || {};
    const hay = [t.slug, t.title, t.idea, t.request, t.prompt, t.lyrics, t.why, t.key, t.mood, t.project, albumTitle(al), seg.submitter].join(' ').toLowerCase();
    // `project:<name>` and `album:<slug>` are exact (a tag a sibling project put on its requests, an album's slug); every
    // other word is a substring of the text
    return S.filter.toLowerCase().split(/\s+/).every(function (w) {
      if (w.indexOf('project:') === 0) return (t.project || '').toLowerCase() === w.slice(8);
      if (w.indexOf('album:') === 0) return !!al && al.slug === w.slice(6);
      return hay.indexOf(w) >= 0;
    });
  }
  function buildCatalogue() {
    el.catEmpty.hidden = S.tracks.length > 0;
    drawCatHead();
    renderRows();
    drawHints();
    el.sortLabel.textContent = phone() ? (S.sort === 'newest' ? 'newest' : S.sort === 'oldest' ? 'oldest' : S.sort) : (S.sort === 'oldest' ? 'oldest first' : S.sort === 'lineage' ? 'by lineage' : S.sort === 'newest' ? 'newest first' : 'by ' + S.sort);
    $('hdrFreq').textContent = phone() ? '88.8' : '88.8 MHz';
    el.shuffleLabel.textContent = S.shuffle ? 'shuffle on' : 'shuffle off';
  }
  function drawCatHead() {
    el.catHead.textContent = '';
    const heads = phone()
      ? [['#', 'num', 4], ['slug', null, 14], ['bpm', 'bpm', 4], ['key', 'key', 4], ['st', null, 4]]
      : [['#', 'num', 4], ['slug', null, 28], ['bpm', 'bpm', 5], ['key', 'key', 6], ['len', 'len', 6], ['tier', 'tier', 7], ['state', null, 11], ['album', 'album', 0]];
    heads.forEach(function (h) {
      const s = span(h[2] ? pad(h[0], h[2]) : h[0], h[1] ? 'sort' : '');
      if (h[1]) s.addEventListener('click', function () { S.sort = h[1]; buildCatalogue(); T.print('sorted by ' + h[0] + '.', 'mid'); });
      el.catHead.appendChild(s);
    });
  }
  function rowText(item) {
    const t = item.t, n = S.num[t.slug], stt = stateOf(t);
    const slug = (item.depth ? '+-- ' : '') + t.slug;
    const lin = t.lineage && t.lineage.parent && S.bySlug[t.lineage.parent] ? 'from ' + S.num[t.lineage.parent] + ': "' + (t.lineage.request || '') + '"' : '';
    const tag = [t.voice ? 'voice' : '', t.project ? 'project:' + t.project : ''].filter(Boolean).join(' ');
    // the last column (issue #73) is the album and the track's place in it; a single shows its lineage or its tags there
    const al = albumOf(t), lw = Math.max(0, content() - 68 - 8);
    const alb = al ? pad(albumTitle(al), Math.max(0, lw - 4)) + String(trackNo(t.slug)).padStart(4) : '';
    // the row ends in `+ remix` (issue #51): 7 columns, taken from the lineage column on desktop; on the phone the row is 35 columns
    // (a 13-character slug), the width the narrowest card gives it (the arena's, 2ch of padding each side). one blank column always
    // stands before the `+`, so a long lineage or the voice mark never runs into it (issue #88)
    // a B-side (issue #111) carries a quiet `b-side` at the end of the row (`b` on the phone), taken from the last column's width
    const bs = isBSide(t);
    if (phone()) {
      const g = stt === 'playing' ? '*' : stt === 'tuning' ? '~' : stt === 'played' ? '.' : 'q';
      return { num: pad(n, 2), slug: pad(slug, bs ? 11 : 13) + ' ', rest: pad(t.bpm, 3) + ' ' + pad(keyShort(t.key), 2) + ' ' + g + (t.voice ? 'v' : ' ') + ' ', bside: bs ? 'b' : '' };
    }
    const bw = bs && lw >= 14 ? 7 : 0;
    return { num: pad(n, 2), slug: pad(slug, 28), rest: String(t.bpm == null ? '' : t.bpm).padStart(3) + '  ' + pad(keyShort(t.key), 4) + '  ' + pad(fmt(t.duration), 4) + '  ' + pad(t.model, 5) + '  ' + pad(t.slug === S.current && S.state === 'failed' ? 'no signal' : stt, 9) + '  ' + pad(alb || lin || tag, lw - bw) + ' ', bside: bw ? 'b-side' : '' };
  }
  // the B-side mark (issue #111): plain text in the theme's own type and its mid tone; a theme may restyle .bside
  function bsideTag(text) { const s = span(text || 'b-side', 'bside mid'); s.title = 'b-side: on the site, never in the rotation'; return s; }
  function renderRows() {
    const items = displayOrder();
    el.catRows.textContent = '';
    S.visible = [];
    items.forEach(function (item) {
      const t = item.t, stt = stateOf(t), r = rowText(item);
      const b = document.createElement('div');
      b.className = 'cat-row ' + stt + (matches(t) ? '' : ' hidden-row');
      b.setAttribute('role', 'button'); b.tabIndex = -1; b.dataset.slug = t.slug;
      b.appendChild(span(r.num));
      // a played row is told by its mark, not by a darker colour (issue #43)
      b.appendChild(span(stt === 'playing' || stt === 'tuning' ? '>' : stt === 'played' ? '.' : ' ', 'mark'));
      b.appendChild(span(' '));
      const sl = span(r.slug, 'slug-link'); sl.title = 'open ' + t.slug;
      sl.addEventListener('click', function (e) { e.stopPropagation(); openTrack(t.slug); });
      b.appendChild(sl);
      b.appendChild(span(r.rest));
      if (r.bside) { b.appendChild(bsideTag(r.bside)); b.appendChild(span(' ')); }
      const plus = span('+', 'plus'); plus.title = 'queue ' + t.slug;
      plus.addEventListener('click', function (e) { e.stopPropagation(); st.queueAdd(t.slug); });
      b.appendChild(plus);
      // remix: the MAKE A TRACK card, prefilled with this row (shown on hover, always on a phone)
      b.appendChild(span(' '));
      const rmx = span('remix', 'rmx'); rmx.title = 'remix ' + t.slug; rmx.setAttribute('role', 'button');
      rmx.addEventListener('click', function (e) { e.stopPropagation(); st.remixThis(t.slug); });
      b.appendChild(rmx);
      b.addEventListener('click', function () { playNow(t.slug); });
      let pressTimer = 0;
      b.addEventListener('touchstart', function () { pressTimer = setTimeout(function () { pressTimer = 0; st.queueAdd(t.slug); }, 500); }, { passive: true });
      b.addEventListener('touchend', function (e) { if (pressTimer) { clearTimeout(pressTimer); } else { e.preventDefault(); } });
      b.addEventListener('touchmove', function () { clearTimeout(pressTimer); pressTimer = 0; }, { passive: true });
      el.catRows.appendChild(b);
      if (matches(t)) S.visible.push(b);
    });
    if (S.hl >= S.visible.length) S.hl = S.visible.length - 1;
    highlight();
  }
  function highlight() {
    S.visible.forEach(function (b, i) { b.classList.toggle('hl', i === S.hl); });
    if (S.hl >= 0 && S.visible[S.hl]) S.visible[S.hl].scrollIntoView({ block: 'nearest' });
    const th = TH(); if (th && th.highlight) th.highlight(hlSlug());
  }
  // what the theme is told on every queue change and every find (12.0, issue #53); a theme without the hook is skipped
  function tellQueue() { const th = TH(); if (th && th.queue) th.queue(S.queue.slice(0, 6), S.current); drawNextUp(); }
  function tellFilter() { const th = TH(); if (th && th.filter) th.filter(S.filter, (S.visible || []).map(function (b) { return b.dataset.slug; })); }
  function hlSlug() { return S.hl >= 0 && S.visible[S.hl] ? S.visible[S.hl].dataset.slug : null; }
  function hintButton(key, label, fn) {
    const b = document.createElement('button'); b.className = 'bare'; b.textContent = key; b.title = label;
    b.addEventListener('click', fn);
    const wrap = span(''); wrap.appendChild(b); wrap.appendChild(span(' ' + label));
    return wrap;
  }
  function drawHints() {
    el.hints.textContent = '';
    if (S.state === 'dead') return;
    const items = [['space', 'play/pause', togglePlay], ['n', 'next', next], ['p', 'prev', prev], ['/', 'find', function () { T.focus('find '); }], ['t', 'themes', function () { st.themePicker(true); }], ['?', 'help', function () { st.help(true); }]];
    items.forEach(function (it, i) { if (i) el.hints.appendChild(span('   ')); el.hints.appendChild(hintButton(it[0], it[1], it[2])); });
  }

  /* ---------------- the router and the pages (2.5, 2.6) ---------------- */
  function route() {
    const h = location.hash || '#/';
    let m;
    if ((m = /^#\/track\/([^/?]+)/.exec(h))) { const slug = decodeURIComponent(m[1]); if (S.bySlug[slug]) { if (S.onAir && S.state !== 'tuning') showTrack(slug); else S.pendingPage = slug; return; } }
    if ((m = /^#\/album\/([^/?]+)/.exec(h))) { const slug = decodeURIComponent(m[1]); if (S.albumBySlug[slug]) { if (S.onAir && S.state !== 'tuning') showAlbum(slug); else S.pendingPage = 'album:' + slug; return; } }
    if (/^#\/guestbook/.test(h)) { showGuestbook(); return; }
    showHome();
  }
  // what a link to this screen should show (Open Graph, issue #73): the page's own title, words and cover. a crawler reads
  // index.html's defaults (a hash never reaches a server); this keeps the tags true for anything that reads the live page
  const SHARE_DEFAULT = {};
  function share(title, desc, image) {
    [['og:title', title], ['og:description', desc], ['og:image', image], ['og:url', location.href], ['twitter:title', title], ['twitter:description', desc], ['twitter:image', image]].forEach(function (kv) {
      const m = document.head.querySelector('meta[property="' + kv[0] + '"], meta[name="' + kv[0] + '"]'); if (!m) return;
      if (!(kv[0] in SHARE_DEFAULT)) SHARE_DEFAULT[kv[0]] = m.getAttribute('content');
      m.setAttribute('content', kv[1] == null ? SHARE_DEFAULT[kv[0]] : kv[1]);
    });
  }
  window.addEventListener('hashchange', route);
  function showHome() {
    const was = S.view;
    S.view = 'home';
    el.page.hidden = true; el.page.textContent = '';
    el.transmitter.hidden = false; el.catalogue.hidden = false; el.make.hidden = false;
    el.headerMain.hidden = false; el.headerPage.hidden = true;
    if (S.whyTyper) { S.whyTyper.cancel(); S.whyTyper = null; }
    share(null, null, null);
    if (was === 'album') document.title = S.state === 'tuning' ? 'nobody fm: tuning' : S.current ? 'nobody fm: ' + S.current : 'nobody fm';
    A.resize();
    // home pulls the camera back up (12.5); an album page is a page to the theme (12.0's transitions)
    if (S.onAir && S.state !== 'dead' && was !== 'home') TH().transition(was === 'track' || was === 'album' ? 'page' : was, 'home', { slug: S.current });
  }
  function openPage(kind, album) {
    S.view = kind;
    // the MAKE A TRACK card lives on the main screen (12.0 controls); a page's remix this goes home to it
    el.transmitter.hidden = true; el.catalogue.hidden = true; el.make.hidden = true;
    el.headerMain.hidden = true; el.headerPage.hidden = false;
    el.hdrSlug.textContent = S.current || '-';
    el.page.hidden = false; el.page.textContent = '';
    el.page.scrollTop = 0;
    drawProgress();
    // the camera flies down to the tower for a track page, up and wide for the guestbook (12.5); an album page is a page,
    // and its info names the album (issue #73)
    if (S.onAir) TH().transition('home', kind === 'guestbook' ? 'guestbook' : 'page', album ? { slug: S.current, album: album } : { slug: S.current });
  }
  function openTrack(slug) { location.hash = '#/track/' + slug; if (location.hash === '#/track/' + slug) route(); }
  function openAlbum(slug) { location.hash = '#/album/' + slug; if (location.hash === '#/album/' + slug) route(); }
  // the cover, the album as a link, the place in it and who asked (issue #73): on the track page under the asked line
  function albumBlock(t) {
    const a = albumOf(t), seg = t.segments || {};
    const box = div('album-block');
    const img = document.createElement('img');
    img.className = 'cover-art' + (hasArt(a) ? '' : ' placeholder');
    img.src = coverUrl(t, 400); img.width = 400; img.height = 400; img.loading = 'lazy'; img.decoding = 'async';
    img.alt = a ? 'cover of ' + albumTitle(a) : 'nobody fm placeholder cover';
    img.addEventListener('error', function () { if (img.src.indexOf(PLACEHOLDER[400]) < 0) { img.src = PLACEHOLDER[400]; img.classList.add('placeholder'); } });
    box.appendChild(img);
    const meta = div('album-meta');
    if (a) {
      const l1 = div('row'); l1.appendChild(span('ALBUM', 'label')); l1.appendChild(span(' track ' + trackNo(t.slug) + ' of ' + a.tracks.length, 'mid')); meta.appendChild(l1);
      const l2 = div(''); l2.appendChild(button(albumTitle(a), 'album-link', function () { openAlbum(a.slug); })); meta.appendChild(l2);
    } else {
      const l1 = div('row'); l1.appendChild(span('SINGLE', 'label')); meta.appendChild(l1);
      meta.appendChild(span('no album. it stands on its own.', 'mid'));
    }
    if (seg.submitter) { const l3 = div(''); l3.appendChild(span('asked by ', 'mid')); l3.appendChild(span(seg.submitter, 'submitter')); meta.appendChild(l3); }
    if (seg.tags && seg.tags.length) meta.appendChild(div('')).appendChild(span('tags: ' + seg.tags.join(' '), 'mid'));
    box.appendChild(meta);
    return box;
  }
  function showAlbum(slug) {
    const a = S.albumBySlug[slug]; if (!a) return;
    openPage('album', slug);
    const p = el.page;
    const copyBtn = button('copy', '', function () { copyText(albumLink(slug), albumLink(slug)); });
    const head = div('row'); head.appendChild(span('ALBUM' + (a.project && !phone() ? '  project:' + a.project : ''), 'label'));
    const hr = span(''); hr.appendChild(span(phone() ? '' : '#/album/' + slug + ' ', 'mid')); hr.appendChild(phone() ? button('< back', '', function () { st.home(); }) : copyBtn);
    head.appendChild(hr); p.appendChild(head);
    p.appendChild(span(albumTitle(a), 'page-title'));
    const total = a.tracks.reduce(function (s, x) { return s + ((S.bySlug[x] || {}).duration || 0); }, 0);
    const box = div('album-block album-hero');
    const img = document.createElement('img');
    img.className = 'cover-art' + (hasArt(a) ? '' : ' placeholder');
    img.src = coverUrl(a, 1400); img.srcset = coverUrl(a, 400) + ' 400w, ' + coverUrl(a, 1400) + ' 1400w'; img.sizes = phone() ? '100vw' : '360px';
    img.width = 1400; img.height = 1400; img.decoding = 'async'; img.alt = 'cover of ' + albumTitle(a);
    img.addEventListener('error', function () { if (img.src.indexOf(PLACEHOLDER[1400]) < 0) { img.removeAttribute('srcset'); img.src = PLACEHOLDER[1400]; img.classList.add('placeholder'); } });
    box.appendChild(img);
    const meta = div('album-meta');
    meta.appendChild(span(a.tracks.length + (a.tracks.length === 1 ? ' track' : ' tracks') + '   ' + fmt(total) + (hasArt(a) ? '' : '   no cover yet'), 'mid'));
    if (phone()) { const pl = div('row'); pl.appendChild(span('#/album/' + slug, 'mid')); pl.appendChild(copyBtn); meta.appendChild(pl); }
    const d = document.createElement('p'); d.className = 'why-text'; d.textContent = a.description || '(nobody wrote about this one yet.)'; meta.appendChild(d);
    box.appendChild(meta);
    p.appendChild(box);
    const buttons = div('buttons primary');
    buttons.appendChild(button('> play all', '', function () { playAlbum(slug); }));
    buttons.appendChild(button('+ queue all', '', function () { st.queueAlbum(slug); }));
    p.appendChild(buttons);
    p.appendChild(h2('TRACKS', phone() ? null : span('list album:' + slug, 'mid')));
    const list = div('album-tracks');
    a.tracks.forEach(function (s, i) {
      const t = S.bySlug[s], stt = stateOf(t);
      const r = div('cat-row ' + stt); r.setAttribute('role', 'button'); r.tabIndex = -1; r.dataset.slug = s;
      r.appendChild(span(pad(i + 1, 3)));
      r.appendChild(span(stt === 'playing' || stt === 'tuning' ? '>' : stt === 'played' ? '.' : ' ', 'mark'));
      r.appendChild(span(' '));
      // a B-side says so beside its time (issue #111), from the title's width (two of the slug's columns on the phone)
      const bs = isBSide(t), tw = Math.max(0, content() - 64);
      const sl = span(pad(s, phone() ? Math.max(12, content() - 12) - (bs ? 2 : 0) : 40), 'slug-link'); sl.title = 'open ' + s;
      sl.addEventListener('click', function (e) { e.stopPropagation(); openTrack(s); });
      r.appendChild(sl);
      r.appendChild(span(' ' + pad(fmt(t.duration), 5) + (phone() ? '' : pad(t.bpm != null ? t.bpm + ' bpm' : '', 9) + pad(t.title || '', bs ? Math.max(0, tw - 7) : tw))));
      if (bs) { if (phone()) r.appendChild(span(' ')); r.appendChild(bsideTag(phone() ? 'b' : 'b-side')); if (!phone()) r.appendChild(span(' ')); }
      r.addEventListener('click', function () { playNow(s); });
      list.appendChild(r);
    });
    p.appendChild(list);
    if (a.credits && a.credits.length) {
      p.appendChild(h2('CREDITS'));
      const cr = div('credits');
      a.credits.forEach(function (c) { const l = div(''); l.appendChild(span(pad(c.role || '', 12), 'mid')); l.appendChild(span(c.name || '')); cr.appendChild(l); });
      p.appendChild(cr);
    }
    const lic = document.createElement('p'); lic.className = 'mid'; lic.textContent = a.licence || 'generated locally from text prompts, no samples or reference audio, no third-party rights claimed.'; p.appendChild(lic);
    document.title = 'nobody fm: ' + albumTitle(a);
    share('nobody fm: ' + albumTitle(a), a.description || null, absUrl(coverUrl(a, 1400)));
    const th = TH(); if (th && th.albumPage) th.albumPage(a, p);
  }
  function h2(label, right) { const h = document.createElement('h2'); h.appendChild(span(label)); if (right) h.appendChild(right); return h; }
  function numbersRow(t) {
    const n = t.numbers || {}, c = t.checks || {};
    const defs = [
      ['tempo', 'tempo_bpm', function (v) { return v + ' bpm' + (t.bpm ? ' (asked ' + t.bpm + ')' : ''); }, 'tempo'],
      ['loudness', 'lufs', function (v) { return v + ' LUFS'; }, 'loudness'],
      ['peak', 'peak_dbfs', function (v) { return v + ' dBFS'; }, 'peak'],
      ['silence', 'silence_s', function (v) { return v + ' s'; }, 'silence'],
      ['brightness', 'brightness_pct', function (v) { return v + ' %'; }, 'brightness'],
      ['boominess', 'boominess_pct', function (v) { return v + ' %'; }, 'boominess'],
      ['onsets', 'onsets_per_s', function (v) { return v + '/s'; }, 'onsets'],
      ['seam', 'seam_db', function (v) { return v + ' dB'; }, 'seam'],
      ['words', 'words_pct', function (v) { return v + ' % read back'; }, 'words']
    ];
    const row = div('numbers');
    defs.forEach(function (d) {
      if (n[d[1]] == null) return;
      const ok = c[d[3]];
      const s = span('');
      s.appendChild(span(phone() ? pad(d[0], 10) : d[0] + ' '));
      s.appendChild(span(d[2](n[d[1]]) + '  '));
      s.appendChild(span(ok === false ? 'FAIL' : ok === true ? 'ok' : '-', ok === false ? 'fail' : 'ok'));
      row.appendChild(s);
    });
    return row;
  }
  function showTrack(slug) {
    const t = S.bySlug[slug]; if (!t) return;
    openPage('track');
    const p = el.page;
    const copyBtn = button('copy', '', function () { copyText(permalink(slug), permalink(slug)); });
    const head = div('row'), hl = span(''); hl.appendChild(span('TRACK ' + S.num[slug] + ' of ' + S.tracks.length, 'label'));
    if (isBSide(t)) { hl.appendChild(span('  ')); hl.appendChild(bsideTag()); }
    head.appendChild(hl);
    const hr = span(''); hr.appendChild(span(phone() ? '' : '#/track/' + slug + ' ', 'mid')); hr.appendChild(phone() ? button('< back', '', function () { st.home(); }) : copyBtn);
    head.appendChild(hr); p.appendChild(head);
    p.appendChild(span(slug, 'page-title'));
    const asked = div('row asked');
    asked.appendChild(span('asked: "' + (t.request || t.idea || '') + '"'));
    asked.appendChild(span([t.date, t.model ? t.model + ' tier' : '', t.bpm + ' bpm', t.key, fmt(t.duration)].filter(Boolean).join('   '), 'mid'));
    p.appendChild(asked);
    if (t.project) { const pr = div('row'); pr.appendChild(span('project:' + t.project + (phone() ? '' : '   list project:' + t.project + ' shows the rest'), 'mid')); p.appendChild(pr); }
    if (phone()) { const pl = div('row'); pl.appendChild(span('#/track/' + slug, 'mid')); pl.appendChild(copyBtn); p.appendChild(pl); }
    p.appendChild(albumBlock(t));
    share('nobody fm: ' + (t.title || slug), t.idea || t.request || null, absUrl(coverUrl(t, 1400)));
    // the action row (issue #51): play, remix this and take it home first and biggest; the copy actions smaller under them
    const buttons = div('buttons primary');
    buttons.appendChild(button('> play', '', function () { playNow(slug); }));
    buttons.appendChild(button('remix this', '', function () { st.remixThis(slug); }));
    buttons.appendChild(button('take it home', '', function () { st.take(slug); }));
    p.appendChild(buttons);
    const more = div('buttons secondary');
    more.appendChild(button('+ queue', '', function () { st.queueAdd(slug); }));
    more.appendChild(button('copy seed', '', function () { st.copySeed(slug); }));
    more.appendChild(button('copy prompt', '', function () { st.copyPrompt(slug); }));
    p.appendChild(more);
    p.appendChild(h2('WHY'));
    const why = document.createElement('p'); why.className = 'why-text';
    const whyText = span(''); why.appendChild(whyText); const wc = span('', 'cursor'); why.appendChild(wc);
    p.appendChild(why);
    if (S.whyTyper) S.whyTyper.cancel();
    S.whyTyper = V.type(whyText, t.why || '(nobody wrote a why for this one.)', typingSpeed(t.why || '', 90));
    S.whyTyper.promise.then(function () { wc.remove(); });
    const seedR = span(''); seedR.appendChild(span('seed ' + (t.seed != null ? t.seed : '-') + '   ', 'mid')); seedR.appendChild(button('copy', '', function () { st.copyPrompt(slug); }));
    p.appendChild(h2('PROMPT', seedR));
    const pr = document.createElement('p'); pr.textContent = t.prompt || '(no prompt recorded)'; p.appendChild(pr);
    p.appendChild(h2('LYRICS'));
    const ly = document.createElement('p'); ly.className = 'lyrics'; ly.textContent = t.lyrics ? t.lyrics : '(instrumental)'; if (!t.lyrics) ly.className += ' mid'; p.appendChild(ly);
    p.appendChild(h2('REJECTED SEEDS'));
    const tbl = document.createElement('table');
    if (!phone()) { const tr = tbl.insertRow(); tr.className = 'mid'; tr.insertCell().textContent = 'seed'; tr.insertCell().textContent = 'reason'; }
    (t.rejected || []).forEach(function (r) {
      const tr = tbl.insertRow(); const c1 = tr.insertCell(); c1.appendChild(span(String(r.seed), 'struck')); const c2 = tr.insertCell(); c2.appendChild(span(r.reason || '', 'mid'));
    });
    (t.takes || []).filter(function (s) { return s !== t.seed; }).forEach(function (s) {
      const tr = tbl.insertRow(); tr.insertCell().appendChild(span(String(s), 'mid')); tr.insertCell().appendChild(span('kept as second take', 'mid'));
    });
    if (!tbl.rows.length || (tbl.rows.length === 1 && !phone())) { const tr = tbl.insertRow(); tr.insertCell().appendChild(span('none. first seed, first take.', 'mid')); }
    p.appendChild(tbl);
    p.appendChild(h2('NUMBERS'));
    p.appendChild(numbersRow(t));
    p.appendChild(h2('LINEAGE'));
    const tree = div('tree');
    const parent = t.lineage && t.lineage.parent && S.bySlug[t.lineage.parent] ? S.bySlug[t.lineage.parent] : null;
    const root = parent || t;
    tree.appendChild(span(pad(root.slug, phone() ? 22 : 24) + ' seed ' + (root.seed != null ? root.seed : '-') + '\n'));
    children(root.slug).forEach(function (ch) {
      const chg = ch.lineage && ch.lineage.changed ? 'changed: "' + ch.lineage.changed.from + '" -> "' + ch.lineage.changed.to + '"' : '';
      tree.appendChild(span('+-- ' + pad(ch.slug, phone() ? 18 : 20) + ' seed ' + (ch.lineage && ch.lineage.seed != null ? ch.lineage.seed : ch.seed) + (phone() ? '\n    ' : '   ') + chg + '\n', ch.slug === slug ? '' : 'mid'));
    });
    if (!children(root.slug).length && !parent) tree.appendChild(span('no variations yet. the seed is on the page; take it.\n', 'mid'));
    // the nudge (issue #51): same seed, one changed clause: remix this.
    const nudge = span('', 'mid'); nudge.appendChild(span('same seed, one changed clause: ')); nudge.appendChild(button('remix this', '', function () { st.remixThis(slug); })); nudge.appendChild(span('.'));
    tree.appendChild(nudge);
    p.appendChild(tree);
    const fileRow = div('row');
    const fl = span(''); fl.appendChild(span('FILE   ', 'label')); fl.appendChild(span((phone() ? '' : 'tracks/') + (t.files && t.files.notes ? t.files.notes : slug + '/notes.md') + '   '));
    fl.appendChild(button('cat', FILE ? 'dimmed' : '', function () { st.cat(slug, p); }));
    fileRow.appendChild(fl); fileRow.appendChild(span('rendered ' + (t.date || ''), 'mid'));
    p.appendChild(fileRow);
    const lic = document.createElement('p'); lic.className = 'mid'; lic.textContent = t.licence || 'generated locally from a text prompt, no samples or reference audio, no third-party rights claimed.'; p.appendChild(lic);
    p.appendChild(h2('TAKE IT HOME'));
    const tk = div('print take-block');
    tk.textContent = 'this is the whole recipe for this take: the words, the seed, the model settings, the\nmastering numbers. same seed, same words, same audio, on your machine. the model is\nfree and runs on one consumer card. no sound in the bag; you make the sound.\n  zip: recipe.json  HOW-TO.md  recipe_render.py  cover.webp';
    p.appendChild(tk);
    const tb = div('buttons'); const takeBtn = button('take it home', '', function () { st.take(slug, takeBtn); }); tb.appendChild(takeBtn); p.appendChild(tb);
    p.appendChild(div('take-links'));
  }

  /* ---------------- the guestbook (2.6, 6.4) ---------------- */
  function gbLocal() { try { return JSON.parse(localStorage.getItem('nobody.guestbook') || '[]'); } catch (e) { return []; } }
  function gbSave(list) { try { localStorage.setItem('nobody.guestbook', JSON.stringify(list.slice(-500))); } catch (e) {} }
  function showGuestbook() {
    openPage('guestbook');
    const p = el.page, local = gbLocal();
    const remote = S.gbRemote || [];
    const all = remote.concat(local).sort(function (a, b) { return (b.at || '').localeCompare(a.at || ''); });
    const head = div('row'); head.appendChild(span('GUESTBOOK', 'label'));
    head.appendChild(span(all.length + (all.length === 1 ? ' entry' : ' entries') + '   local: ' + local.length, 'mid'));
    p.appendChild(head);
    const intro = document.createElement('p'); intro.textContent = 'sign it. one line, no links. nobody reads every entry and keeps all of them.'; p.appendChild(intro);
    const form = div('gb-form');
    const f1 = div('field'); f1.appendChild(span('name > ')); const name = document.createElement('input'); name.maxLength = 24; name.setAttribute('autocapitalize', 'off'); name.setAttribute('autocorrect', 'off'); name.setAttribute('aria-label', 'name'); f1.appendChild(name); form.appendChild(f1);
    const f2 = div('field'); f2.appendChild(span('line > ')); const line = document.createElement('input'); line.maxLength = 140; line.setAttribute('autocapitalize', 'off'); line.setAttribute('aria-label', 'line'); line.setAttribute('enterkeyhint', 'send'); f2.appendChild(line); form.appendChild(f2);
    const bb = div('gb-buttons'); bb.appendChild(button('sign', '', function () { st.sign(name.value, line.value); })); bb.appendChild(button(phone() ? '< back' : 'esc', '', function () { st.home(); })); form.appendChild(bb);
    [name, line].forEach(function (i) { i.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Enter') { e.preventDefault(); if (i === name) line.focus(); else st.sign(name.value, line.value); } if (e.key === 'Escape') { e.preventDefault(); st.home(); } }); });
    try { name.value = localStorage.getItem('nobody.name') || ''; } catch (e) {}
    p.appendChild(form);
    const list = div('gb-list'); p.appendChild(list);
    const per = phone() ? 4 : 6;
    let shown = 0;
    const more = div('gb-more');
    function render() {
      all.slice(shown, shown + per).forEach(function (e) {
        const row = div('gb-entry');
        const at = e.at ? new Date(e.at) : null;
        const stamp = at && !isNaN(at) ? (phone() ? at.toTimeString().slice(0, 5) : at.toISOString().slice(0, 10) + ' ' + at.toTimeString().slice(0, 5)) : '';
        row.appendChild(span(String(e.id || 0).padStart(6, '0'), 'mid'));
        row.appendChild(span(stamp, 'mid'));
        row.appendChild(span(e.mine ? '(you)' : (e.name || 'a stranger')));
        row.appendChild(span(e.line || '', 'gb-line'));
        row.appendChild(span(e.wire === false ? 'not yet on the wire' : '', 'gb-tag'));
        list.appendChild(row);
      });
      shown = Math.min(all.length, shown + per);
      more.textContent = '';
      more.appendChild(span(shown + ' of ' + all.length + '   ', 'mid'));
      if (shown < all.length) more.appendChild(button('more', '', render));
    }
    render();
    p.appendChild(more);
    if (!all.length) { const e = document.createElement('p'); e.className = 'mid'; e.textContent = 'nobody has signed yet. you could be the first stranger.'; list.appendChild(e); }
    if (CFG.backend && local.some(function (e) { return e.wire === false; }) && !S.offeredSend) {
      S.offeredSend = true;
      const off = div('row'); off.appendChild(span(local.length + ' entries waiting for the wire. send them?', 'amber'));
      const yn = span(''); yn.appendChild(button('y', '', function () { sendWaiting(); off.remove(); })); yn.appendChild(span(' ')); yn.appendChild(button('n', '', function () { off.remove(); })); off.appendChild(yn);
      p.insertBefore(off, form);
    }
    setTimeout(function () { if (!phone()) name.focus(); }, 50);
  }
  function sendWaiting() {
    const local = gbLocal();
    const waiting = local.filter(function (e) { return e.wire === false; });
    Promise.all(waiting.map(function (e) { return api('POST', '/guestbook', { name: e.name, line: e.line }).then(function () { e.wire = true; }); }))
      .then(function () { gbSave(local); T.print('sent ' + waiting.length + ' to the wire.'); if (S.view === 'guestbook') showGuestbook(); })
      .catch(function () {});
  }
  function api(method, path, body) {
    if (!CFG.backend || S.wireDown) return Promise.reject(new Error('no wire'));
    const ctl = new AbortController(); const to = setTimeout(function () { ctl.abort(); }, 4000);
    return fetch(CFG.backend.replace(/\/$/, '') + path, { method: method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined, signal: ctl.signal })
      .then(function (r) { clearTimeout(to); if (!r.ok) throw new Error('backend ' + r.status); return r.json(); })
      .catch(function (e) { clearTimeout(to); if (!S.wireDown) { S.wireDown = true; S.localOnly = true; T.print('the wire is down (' + (e && e.message ? e.message : e) + '). local mode for this session.', 'amber'); drawWireTags(); } throw e; });
  }

  /* ---------------- the counter (2.7, 6.4) ---------------- */
  let odo = null;
  function initCounter() {
    odo = V.odometer(el.odometer);
    let n = 0;
    try {
      n = parseInt(localStorage.getItem('nobody.visits') || '0', 10) || 0;
      if (!sessionStorage.getItem('nobody.counted')) { n++; localStorage.setItem('nobody.visits', String(n)); sessionStorage.setItem('nobody.counted', '1'); }
    } catch (e) { n = 1; }
    S.visitor = n;
    odo.set(Math.max(0, n - 1));
    setTimeout(function () { odo.set(n); }, 900);
    el.visitorInline.textContent = String(n).padStart(6, '0');
    drawWireTags();
    if (CFG.backend) {
      const once = (function () { try { return sessionStorage.getItem('nobody.wirecounted'); } catch (e) { return true; } })();
      (once ? api('GET', '/count') : api('POST', '/count', {})).then(function (r) {
        if (r && typeof r.n === 'number') { S.visitor = r.n; S.localOnly = false; odo.set(r.n); el.visitorInline.textContent = String(r.n).padStart(6, '0'); drawWireTags(); try { sessionStorage.setItem('nobody.wirecounted', '1'); } catch (e) {} }
      }).catch(function () {});
      api('GET', '/guestbook?n=20').then(function (r) { if (r && Array.isArray(r.entries)) S.gbRemote = r.entries; }).catch(function () {});
    }
  }
  function drawWireTags() {
    el.countTag.textContent = S.localOnly ? 'local count. not yet on the wire.' : 'on the wire.';
    el.countTag.className = S.localOnly ? 'amber' : 'mid';
    el.wireTag.textContent = S.localOnly ? 'not yet on the wire' : 'on the wire';
    el.wireTag.className = S.localOnly ? 'amber' : 'mid';
  }

  /* ---------------- help (2.8) ---------------- */
  const HELP_KEYS = [
    ['space', 'play / pause'], ['n  p', 'next / previous track'], ['j  k', 'move the highlight'], ['enter', 'play the highlighted'],
    ['q', 'queue the highlighted'], ['s  r', 'shuffle / repeat one'], ['- =  m', 'volume down / up / mute'], ['0..9', 'seek to 0 % .. 90 %'],
    ['left right', 'seek 5 s'], ['i', "this track's page"], ['c', 'copy the permalink'], ['/', 'find'], ['g', 'guestbook'], ['esc', 'back to the transmitter']
  ];
  const HELP_HIDE = ['`', 'hide the interface (v: bars)'];
  HELP_KEYS.push(HELP_HIDE);
  HELP_KEYS.push(['t', 'themes: the looks, one key each']);
  // request first (issue #51): making a track is the first thing the help offers
  const HELP_CMDS = [
    'request <words>   remix [slug] [words]', 'play [slug|#]   pause   stop   next   prev', 'queue [slug]    shuffle   repeat   vol 0..10',
    'list [words]    find <words>   info [slug]', 'cat [slug]      tree   seed [slug]   prompt [slug]', 'take [slug]     guestbook   sign   count',
    'uptime   dial <MHz>   amber   green   help', 'clear   reboot   home   theme [name]   big', 'contrast   album [slug]   xfade [s]', 'audition [off]  the undecided, newest first', '', 'a few others. nobody documents everything.'
  ];
  const HELP_WORDS = ['request', 'remix', 'play', 'pause', 'stop', 'next', 'prev', 'queue', 'shuffle', 'repeat', 'vol 5', 'list', 'find', 'info', 'album', 'cat', 'tree', 'seed', 'prompt', 'take', 'guestbook', 'sign', 'count', 'uptime', 'dial 88.8', 'amber', 'green', 'theme', 'big', 'contrast', 'xfade', 'audition', 'clear', 'reboot', 'home'];
  function helpLines() {
    const out = [];
    const n = Math.max(HELP_KEYS.length, HELP_CMDS.length);
    out.push(pad('keys', 43) + 'typed at nobody>');
    for (let i = 0; i < n; i++) {
      const k = HELP_KEYS[i] ? pad(HELP_KEYS[i][0], 11) + pad(HELP_KEYS[i][1], 32) : pad('', 43);
      out.push(k + (HELP_CMDS[i] || ''));
    }
    // a theme's own keys and commands (12.0, issue #53), after the station's table
    const th = TH(), ext = T.extensions();
    if ((IFACE.kind || ext.length) && th && th.help) {
      out.push('');
      out.push(pad(S.theme + '>', 43) + (ext.length ? ext[0].commands.join('   ') : ''));
      th.help().forEach(function (h) { out.push(pad(h[0], 17) + pad(h[1], 32)); });
      if (IFACE.arrows) out.push('shift+left right   seek 5 s while ' + S.theme + ' holds the arrows');
      if (IFACE.keys.indexOf('s') >= 0) out.push('shift+s            shuffle while ' + S.theme + ' holds s');
    }
    return out;
  }
  function drawHelp() {
    el.helpBody.textContent = '';
    if (phone()) {
      const list = div('help-list');
      HELP_KEYS.forEach(function (k) { const l = div('mid'); l.textContent = pad(k[0], 11) + k[1]; el.helpBody.appendChild(l); });
      el.helpBody.appendChild(span('\n'));
      HELP_WORDS.forEach(function (w) { list.appendChild(button(w, '', function () { st.help(false); T.run(w, true); })); });
      T.extensions().forEach(function (x) { x.commands.forEach(function (w) { list.appendChild(button(w, '', function () { st.help(false); T.run(w, true); })); }); });
      el.helpBody.appendChild(list);
      return;
    }
    const pre = document.createElement('pre'); pre.className = 'print'; pre.textContent = helpLines().join('\n'); el.helpBody.appendChild(pre);
  }

  /* ---------------- the station API the terminal drives (4.4) ---------------- */
  st.cmdPlay = function (a) {
    if (!S.onAir) { goOnAir(null); return; }
    if (!a) { if (deck.paused) togglePlay(); else T.print('already on air.', 'mid'); return; }
    const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '". try list.'); return; }
    playNow(t.slug);
  };
  st.pause = function () { if (!deck.paused) togglePlay(); else T.print('already paused.', 'mid'); };
  st.stop = function () { cutFade(); deck.pause(); deck.currentTime = 0; S.state = 'paused'; setChip('PAUSED'); drawProgress(); T.print('stopped. rewound. the transmitter hums.'); markRows(); armIdle(); };
  st.next = next; st.prev = prev;
  st.queueAdd = function (a) {
    const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; }
    // the whole catalogue is already in the queue; "queue" means next, a second queue takes it out again
    if (S.queue[0] === t.slug) { S.queue.shift(); T.print('unqueued: ' + t.slug); }
    else { S.queue = S.queue.filter(function (s) { return s !== t.slug; }); S.queue.unshift(t.slug); T.print('queued next: ' + t.slug); }
    markRows();
  };
  st.queueList = function () {
    if (!S.queue.length) { T.print('queue empty. it refills itself. nobody stops.', 'mid'); return; }
    T.print('queue: ' + S.queue.slice(0, 6).join(', ') + (S.queue.length > 6 ? ' +' + (S.queue.length - 6) : ''));
  };
  st.toggleShuffle = function () {
    S.shuffle = !S.shuffle;
    S.queue = S.shuffle ? shuffleRuns(S.queue) : orderRuns(S.queue);
    el.shuffleLabel.textContent = S.shuffle ? 'shuffle on' : 'shuffle off';
    T.print('shuffle ' + (S.shuffle ? 'on. the queue is reordered.' : 'off. the queue is in order.'));
    tellQueue();
  };
  // the audition session (issue #148): `audition` starts it (or starts over), `audition off` ends it
  st.audition = function (a) {
    if (/^(off|stop|end|done)$/i.test(String(a || '').trim())) { if (S.aud) endAudition('audition ended. back to the rotation.'); else T.print('no audition on.', 'mid'); return; }
    const list = auditions();
    if (!list.length) { T.print('nothing to audition: every new track is decided. the rotation plays on.', 'mid'); if (S.aud) endAudition('no auditions left. back to the rotation.'); if (!S.onAir) goOnAir(null); return; }
    if (!S.onAir) { S.audStart = true; goOnAir(null); return; }
    startAudition(list);
    S.queue = list.slice(1);
    tuneTo(list[0], true);
  };
  st.auditionState = function () {
    return { on: !!S.aud, list: S.aud ? S.aud.list.slice() : auditions(), pos: S.aud ? S.aud.list.indexOf(S.current) + 1 : 0,
      badge: !el.audBadge.hidden, row: el.audRow.hidden ? '' : el.audBtn.textContent + ' | ' + el.audLine.textContent };
  };
  st.repeatOnce = function () { S.repeat = !S.repeat; T.print(S.repeat ? 'repeat: this one once more.' : 'repeat off.'); drawNextUp(); carSync(); };
  st.setVol = setVol;
  st.volText = function () { T.print('vol ' + SY.volume + '/10' + (SY.muted ? ' (muted)' : '')); };
  st.list = function (words) {
    const saved = S.filter; S.filter = words || '';
    const items = displayOrder().filter(function (it) { return matches(it.t); });
    S.filter = saved;
    if (!items.length) { T.print('nothing matches "' + words + '".', 'mid'); return; }
    items.forEach(function (it) { const t = it.t; T.print(pad(S.num[t.slug], 3) + pad((it.depth ? '+-- ' : '') + t.slug, 28) + ' ' + pad(t.bpm, 4) + pad(keyShort(t.key), 4) + fmt(t.duration) + '  ' + (t.model || '') + (t.voice ? '  voice' : '') + (t.project ? '  project:' + t.project : '') + (albumOf(t) ? '  album:' + albumOf(t).slug : '')); });
  };
  st.setFilter = function (words) {
    S.filter = (words || '').trim(); S.hl = -1; renderRows();
    T.print(S.filter ? 'find: ' + S.visible.length + ' match "' + S.filter + '". find alone clears.' : 'find cleared.', 'mid');
    tellFilter();
  };
  // albums (issue #73): `album` lists them, `album <slug|words>` opens one; `queueAlbum` puts one next, in its order
  function findAlbum(arg) {
    const a = String(arg || '').trim().toLowerCase().replace(/^album:/, '');
    if (!a) { const cur = albumOf(S.current); return cur || null; }
    return S.albumBySlug[a] || S.albums.find(function (x) { return x.slug.indexOf(a) >= 0 || albumTitle(x).toLowerCase().indexOf(a) >= 0; }) || null;
  }
  st.album = function (arg, list) {
    if (list || (!arg && !albumOf(S.current))) {
      if (!S.albums.length) { T.print('no albums yet. every track here is a single.', 'mid'); return; }
      T.printScroll(['albums: ' + S.albums.length + '. album <slug> opens one.'].concat(S.albums.map(function (x) { return pad(x.slug, 28) + ' ' + pad(String(x.tracks.length), 3) + ' ' + pad(hasArt(x) ? 'cover' : '-', 6) + albumTitle(x); })));
      return;
    }
    const a = findAlbum(arg); if (!a) { T.error('nobody knows the album "' + arg + '". album lists them.'); return; }
    openAlbum(a.slug);
  };
  st.playAlbum = function (arg) { const a = findAlbum(arg); if (!a) { T.error('nobody knows the album "' + arg + '".'); return; } playAlbum(a.slug); };
  st.queueAlbum = function (slug) {
    const a = S.albumBySlug[slug]; if (!a) return;
    const rest = a.tracks.filter(function (s) { return s !== S.current; });
    S.queue = rest.concat(S.queue.filter(function (s) { return rest.indexOf(s) < 0; }));
    T.print('queued next: ' + albumTitle(a) + ', ' + rest.length + (rest.length === 1 ? ' track' : ' tracks') + ' in order.');
    markRows();
  };
  st.info = function (a) { const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; } openTrack(t.slug); };
  st.cat = function (a, pageEl) {
    const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; }
    if (FILE) { T.print('cat needs the wire. serve over http and try again.', 'amber'); return; }
    fetch(trackUrl(t, 'notes'), { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (txt) {
      if (pageEl) { let cv = pageEl.querySelector('.catview'); if (!cv) { cv = document.createElement('pre'); cv.className = 'print catview'; pageEl.appendChild(cv); } cv.textContent = txt; cv.scrollIntoView({ block: 'nearest' }); }
      else T.printScroll(txt.split('\n'));
    }).catch(function (e) { T.error('notes.md did not come: ' + e.message); });
  };
  st.tree = function () {
    const lines = [];
    (function walk(list, depth) { list.forEach(function (t) { lines.push('  '.repeat(depth) + (depth ? '+-- ' : '') + t.slug + '  seed ' + t.seed + (t.lineage && t.lineage.changed ? '  "' + t.lineage.changed.from + '" -> "' + t.lineage.changed.to + '"' : '')); walk(children(t.slug), depth + 1); }); })(roots().slice().sort(function (a, b) { return S.num[a.slug] - S.num[b.slug]; }), 0);
    if (!lines.length) lines.push('no trees. no tracks. dead air.');
    T.printScroll(lines);
  };
  st.copySeed = function (a) { const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; } copyText(String(t.seed), 'seed ' + t.seed); };
  st.copyPrompt = function (a) { const t = findTrack(a); if (!t) { T.print('no track called that. to ask for one: request <words>', 'amber'); return; } copyText(t.prompt || '', 'the prompt for ' + t.slug); };
  st.take = function (a, btn) {
    const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; }
    const files = [['recipe.json', trackUrl(t, 'recipe')], ['HOW-TO.md', CFG.tracksBase + 'HOW-TO.md'], ['recipe_render.py', CFG.tracksBase + 'recipe_render.py'], ['cover.webp', coverUrl(t, 1400)]];
    const links = function () {
      T.print('zip needs the wire. the four files, one per line:', 'amber');
      files.forEach(function (f) { T.print('  ' + f[1], 'mid'); });
      const box = el.page.querySelector('.take-links');
      if (box && S.view === 'track') { box.textContent = ''; files.forEach(function (f) { const a2 = document.createElement('a'); a2.href = f[1]; a2.download = f[0]; a2.textContent = '[ ' + f[0] + ' ]'; a2.className = 'mid'; box.appendChild(a2); box.appendChild(span('  ')); }); }
    };
    if (FILE || !window.JSZip) { links(); return; }
    if (btn) btn.textContent = 'packing ...';
    const zip = new window.JSZip();
    // the cover (issue #73: the album's art, or the placeholder) is binary and optional: a cover that does not come leaves the bag whole
    Promise.all(files.map(function (f) {
      const bin = /\.webp$/.test(f[0]);
      return fetch(f[1], { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(f[0] + ' ' + r.status); return bin ? r.arrayBuffer() : r.text(); })
        .then(function (body) { zip.file(f[0], body, bin ? { binary: true } : undefined); }, function (e) { if (!bin) throw e; T.print('no cover in the bag: ' + e.message, 'mid'); });
    }))
      .then(function () { return zip.generateAsync({ type: 'blob' }); })
      .then(function (blob) {
        const name = 'nobody-fm-' + t.slug + '.zip';
        const a2 = document.createElement('a'); a2.href = URL.createObjectURL(blob); a2.download = name; document.body.appendChild(a2); a2.click(); setTimeout(function () { URL.revokeObjectURL(a2.href); a2.remove(); }, 2000);
        T.print('packed: ' + name);
      })
      .catch(function (e) { T.error('the bag tore: ' + e.message); links(); })
      .then(function () { if (btn) btn.textContent = 'take it home'; });
  };
  // remix <slug> <words>: with the station API, a remix request (same seed, one changed clause); remix <slug> alone with the API
  // goes to the MAKE A TRACK card prefilled. without the API (the Discord line, or nothing): the copy-and-open of section 8.
  st.remix = function (a) {
    const m = /^(\S+)\s+(.+)$/.exec((a || '').trim());
    const t = findTrack(m ? m[1] : a); if (!t) { T.error('nobody knows "' + a + '".'); return; }
    if (reqBase()) { if (m) st.request('remix ' + t.slug + ' ' + m[2]); else st.remixThis(t.slug); return; }
    copyText('/remix ' + t.slug + ' ' + (m ? m[2] : ''), '/remix ' + t.slug);
    if (CFG.requestLine) { T.print('request line is open. paste, add a few words, send.'); window.open(CFG.requestLine, '_blank', 'noopener'); }
    else T.print('request line not open yet. the command is on your clipboard for when it is.', 'amber');
  };
  // remix this (issue #51): home, the MAKE A TRACK card prefilled with `remix <slug> `, the input focused
  st.remixThis = function (slug) {
    const t = findTrack(slug); if (!t) { T.error('nobody knows "' + slug + '".'); return; }
    // home first, synchronously: the card must be shown before the input can take focus (the hash change routes later, idempotent)
    if (S.view !== 'home') { showHome(); st.help(false); if (location.hash && location.hash !== '#/') location.hash = '#/'; }
    makePrefill('remix ' + t.slug + ' ');
    T.print('remix ' + t.slug + ': add a few words and send.', 'mid');
  };

  /* ---------------- MAKE A TRACK (issue #51, design 12.0 controls) ----------------
     the card under NOW PLAYING: one input, [ request ], [ remix what's playing ]. submitting runs the terminal's own request
     flow; the card shows the read-back's first line, `watching ...` until done, then the permalink. without a request line
     it says so, offers the Discord link when there is one, and copies the words for pasting there. */
  function makeLine(text, cls, more) {
    el.makeLine.textContent = '';
    el.makeLine.className = 'make-line ' + (cls || 'mid');
    if (text) el.makeLine.appendChild(span(text));
    if (more) el.makeLine.appendChild(more);
  }
  function makeState(text) { el.makeState.textContent = text || ''; }
  function makeIdle() {
    makeState('');
    if (reqBase()) { makeLine('a few of your own words. the machine reads them back, then renders.'); return; }
    if (CFG.requestLine) {
      const open = button('open the request line', '', function () { window.open(CFG.requestLine, '_blank', 'noopener'); T.print('the request line: ' + CFG.requestLine, 'mid'); });
      makeLine('the request line opens soon. ', 'mid', open);
    } else makeLine('the request line opens soon.');
  }
  function makePrefill(text) {
    el.makeWords.value = text;
    el.makeWords.focus();
    try { el.makeWords.setSelectionRange(text.length, text.length); } catch (e) {}
    if (phone()) setTimeout(function () { el.make.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 50);
  }
  function makeSubmit() {
    const words = el.makeWords.value.trim();
    if (!words) { el.makeWords.focus(); return; }
    if (!reqBase()) {
      // no line from here: the words go to the clipboard for the Discord line (a remix becomes the bot's /remix command)
      const m = /^remix\s+(\S+)\s+(.+)$/.exec(words);
      const text = m && S.bySlug[m[1]] ? '/remix ' + m[1] + ' ' + m[2] : words;
      copyText(text, text);
      makeLine(CFG.requestLine ? 'copied. paste it on the request line.' : 'copied. the request line opens soon; nobody is taking requests from here yet.', 'amber',
        CFG.requestLine ? button('open the request line', '', function () { window.open(CFG.requestLine, '_blank', 'noopener'); }) : null);
      return;
    }
    el.makeWords.value = '';
    T.run(/^remix\s+\S+\s+\S/.test(words) ? words : 'request ' + words, true);
    el.makeWords.blur();
  }
  // what the request flow tells the card
  const MAKE = {
    asking: function () { makeState('asking ...'); makeLine('asking the machine ...'); },
    readback: function (line) { makeLine(line); makeState('watching ...'); },
    note: function (text, cls) { if (cls === 'amber') { makeLine(text, 'amber'); makeState(''); } },
    done: function (slug, title) {
      makeState('done');
      const link = button('#/track/' + slug, '', function () { openTrack(slug); });
      makeLine('done: ' + (title || slug) + '  ', '', link);
    },
    queued: function (slug) { makeState('queued next'); },
    lost: function () { makeState(''); makeLine('lost the line. the request carries on without you.', 'amber'); }
  };

  /* ---------------- the request line (issue #26) ----------------
     the station stays read-only: this posts the words to the API (api/README.md) and narrates what comes back. the read-back
     is the machine's own take; the events are the lines the Discord thread shows; the permalink ends it. */
  const REQ = { active: null };
  function reqBase() { return CFG.requestApi ? String(CFG.requestApi).replace(/\/+$/, '') : null; }
  function reqHeaders(json) {
    const h = {};
    if (json) h['Content-Type'] = 'application/json';
    if (CFG.requestKey) h.Authorization = 'Bearer ' + CFG.requestKey;
    return h;
  }
  function fit(text) {
    const n = Math.max(24, content() - 4), t = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
    return t.length > n ? t.slice(0, n - 3) + '...' : t;
  }
  function readBack(rec) {
    const rb = rec.readback || {}, t = rb.take || {};
    T.print('request ' + rec.id, 'mid');
    // a request line at the edge (cloudflare/wire) may answer before a render box has planned it: say what was heard;
    // the take follows as a `planned` progress line
    if (!rb.take) { const l = fit(rb.line || 'heard. the machine reads it back soon.'); T.print(l); MAKE.readback(l); return; }
    const take = fit('take: ' + [t.bpm != null ? t.bpm + ' bpm' : null, t.key, t.voice ? 'a voice' : 'instrumental', t.tier ? t.tier + ' tier' : null,
      t.seeds && t.seeds.length ? t.seeds.length + (t.seeds.length === 1 ? ' seed' : ' seeds') : null].filter(Boolean).join(', '));
    T.print(take);
    MAKE.readback(take);
    if (t.kit) T.print(fit('kit: ' + t.kit));
    if (t.lead) T.print(fit('lead: ' + t.lead));
    if (t.mood) T.print(fit('mood: ' + t.mood));
    if (rb.stripped && rb.stripped.length) T.print(fit('removed: ' + rb.stripped.join(', ')), 'amber');
  }
  function reqNarrate(cur, kind, d) {
    if (cur.stopped) return;
    if (kind === 'state') {
      if (d.state === cur.lastState) return;
      cur.lastState = d.state;
      if (d.state === 'gated') { T.print('waiting at the gate. a person has to say yes.', 'amber'); makeState('at the gate ...'); }
      else if (d.state === 'approved') { T.print('through the gate. in the queue.'); makeState('queued ...'); }
      else if (d.state === 'rendering') { T.print('rendering.'); makeState('rendering ...'); }
      else if (d.state === 'declined') { const l = fit('declined at the gate' + (d.note ? ': ' + d.note : '') + '. nothing was made.'); T.print(l, 'amber'); MAKE.note(l, 'amber'); }
      else if (d.state === 'failed') { const l = fit('failed' + (d.note ? ': ' + d.note : '') + '. nothing was made.'); T.print(l, 'amber'); MAKE.note(l, 'amber'); }
    } else if (kind === 'progress') {
      if (d.text) T.print(fit(d.text), 'mid');
      const take = d.stage === 'planned' && /take: .*/.exec(d.text || '');
      if (take) MAKE.readback(fit(take[0]));
    }
  }
  function reqDone(cur, final) {
    if (cur.stopped) return;
    cur.stopped = true;
    if (REQ.active === cur) REQ.active = null;
    const res = final && final.result;
    if (!final || final.state !== 'done' || !res || !res.slug) {
      if (final && final.state !== 'declined' && final.state !== 'failed') { const l = 'the request ended: ' + (final ? final.state : 'unknown') + '.'; T.print(l, 'amber'); MAKE.note(l, 'amber'); }
      return;
    }
    T.print(fit('done: ' + (res.title || res.slug)));
    T.print(location.origin + location.pathname + '#/track/' + res.slug, 'amber');     // not permalink(): no query string (a test flag may carry a key)
    MAKE.done(res.slug, res.title);
    const tries = [0, 1500, 4000, 8000];
    (function reload(i) {
      loadIndex().then(installIndex).then(function () {
        if (!S.bySlug[res.slug]) throw new Error('not in the index yet');
        buildCatalogue();
        S.queue = S.queue.filter(function (x) { return x !== res.slug; });
        if (S.current !== res.slug) S.queue.unshift(res.slug);
        T.print('queued next: ' + res.slug);
        MAKE.queued(res.slug);
      }).catch(function () {
        if (i + 1 < tries.length) setTimeout(function () { reload(i + 1); }, tries[i + 1]);
        else T.print('the catalogue has not caught up. the permalink will work when it does.', 'mid');
      });
    })(0);
  }
  function reqLost(cur) {
    if (cur.stopped) return;
    cur.stopped = true;
    if (REQ.active === cur) REQ.active = null;
    T.print('lost the line. request ' + cur.id + ' carries on without you.', 'amber');
    MAKE.lost();
  }
  function reqFollow(cur) {
    const base = reqBase(), ctl = new AbortController();
    cur.ctl = ctl;
    const poll = function () {      // the stream dropped: long-poll to the end
      if (cur.stopped) return;
      fetch(base + '/requests/' + encodeURIComponent(cur.id) + '?wait=25', { headers: reqHeaders(false), signal: ctl.signal })
        .then(function (r) { return r.json(); })
        .then(function (rec) {
          reqNarrate(cur, 'state', { state: rec.state, note: '' });
          if (['done', 'failed', 'declined'].indexOf(rec.state) >= 0) reqDone(cur, { state: rec.state, result: rec.result });
          else setTimeout(poll, 1000);
        }).catch(function () { reqLost(cur); });
    };
    let ended = false;
    fetch(base + '/requests/' + encodeURIComponent(cur.id) + '/events', { headers: reqHeaders(false), signal: ctl.signal }).then(function (r) {
      if (!r.ok || !r.body) throw new Error('no stream');
      const reader = r.body.getReader(), dec = new TextDecoder();
      let buf = '';
      return (function pump() {
        return reader.read().then(function (x) {
          if (x.done) return;
          buf += dec.decode(x.value, { stream: true });
          let i;
          while ((i = buf.indexOf('\n\n')) >= 0) {
            const block = buf.slice(0, i); buf = buf.slice(i + 2);
            let ev = null, data = null;
            block.split('\n').forEach(function (l) { if (l.indexOf('event: ') === 0) ev = l.slice(7); else if (l.indexOf('data: ') === 0) { try { data = JSON.parse(l.slice(6)); } catch (e) {} } });
            if (!ev || !data) continue;
            if (ev === 'end') { ended = true; reqDone(cur, data); } else reqNarrate(cur, ev, data);
          }
          return pump();
        });
      })();
    }).then(function () { if (!ended) poll(); }, function (e) { if (!ended && !cur.stopped && !(e && e.name === 'AbortError')) poll(); });
  }
  // the edge's human check (Cloudflare Turnstile, issue #90): with CFG.turnstileSiteKey set, each submission carries a fresh
  // token. the script loads on the first request only; the widget stays out of sight unless Turnstile wants a tap, and is
  // removed once it has answered (a token is good for one check).
  let tsLoad = null;
  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (!tsLoad) tsLoad = new Promise(function (res, rej) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = function () { window.turnstile ? res(window.turnstile) : rej(new Error('no turnstile')); };
      s.onerror = function () { tsLoad = null; rej(new Error('the human check did not load')); };
      document.head.appendChild(s);
    });
    return tsLoad;
  }
  function humanToken() {
    const key = CFG.turnstileSiteKey;
    if (!key) return Promise.resolve(null);
    return loadTurnstile().then(function (ts) {
      return new Promise(function (res, rej) {
        const box = document.createElement('div');
        box.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999';
        document.body.appendChild(box);
        let id = null;
        const t = setTimeout(function () { end(rej, new Error('the human check timed out')); }, 60000);
        function end(f, v) { clearTimeout(t); try { if (id !== null) ts.remove(id); } catch (e) {} box.remove(); f(v); }
        id = ts.render(box, { sitekey: key, appearance: 'interaction-only', action: 'request',
          callback: function (tok) { end(res, tok); },
          'error-callback': function () { end(rej, new Error('the human check failed')); return true; } });
      });
    });
  }
  st.request = function (a) {
    const words = (a || '').trim();
    const base = reqBase();
    if (!base) {
      T.print(CFG.requestLine ? 'request line not open from here yet. the discord line is ' + CFG.requestLine : 'nobody is taking requests yet.', 'amber');
      return;
    }
    if (!words) {
      if (REQ.active) T.print('following ' + REQ.active.id + (REQ.active.lastState ? ': ' + REQ.active.lastState : '') + '.', 'mid');
      else T.print('request <words>. a few of your own, like: request rain on a bus shelter', 'mid');
      return;
    }
    T.print('asking the machine ...', 'mid');
    MAKE.asking();
    // `remix <slug> <words>` is the API's remix of a published track: same seed, one changed clause (api/README.md)
    const rm = /^remix\s+(\S+)\s+(.+)$/.exec(words);
    const call = humanToken().then(function (tok) {
      const extra = tok ? { turnstile: tok } : {};
      return rm && S.bySlug[rm[1]]
        ? fetch(base + '/tracks/' + encodeURIComponent(rm[1]) + '/remix', { method: 'POST', headers: reqHeaders(true), body: JSON.stringify(Object.assign({ words: rm[2] }, extra)) })
        : fetch(base + '/requests', { method: 'POST', headers: reqHeaders(true), body: JSON.stringify(Object.assign({ words: words }, extra)) });
    });
    call
      .then(function (r) { return r.json().catch(function () { return null; }).then(function (j) { return { ok: r.ok, status: r.status, body: j }; }); })
      .then(function (res) {
        if (!res.ok) {
          const e = res.body && res.body.error;
          const l = fit((e && e.message) || ('the line said ' + res.status));
          T.error(l); MAKE.note(l, 'amber');
          return;
        }
        const rec = res.body;
        if (REQ.active) { REQ.active.stopped = true; if (REQ.active.ctl) REQ.active.ctl.abort(); T.print('no longer following ' + REQ.active.id + '.', 'mid'); }
        readBack(rec);
        const cur = REQ.active = { id: rec.id, lastState: null, stopped: false, ctl: null };
        reqFollow(cur);
      }, function (e) {
        const l = e && /human check/.test(e.message) ? e.message + '. try again.' : 'the request line did not answer. try again.';
        T.error(l); MAKE.note(l, 'amber');
      });
  };
  st.openGuestbook = function () { location.hash = '#/guestbook'; if (S.view !== 'guestbook') route(); };
  st.sign = function (name, line) {
    name = (name || '').trim(); line = (line || '').trim();
    if (name.length < 1 || name.length > 24) { T.error('a name, 1 to 24 characters.'); return; }
    if (line.length < 1 || line.length > 140) { T.error('one line, 1 to 140 characters.'); return; }
    if (/https?:\/\/|www\.|\.[a-z]{2,4}\/|\.(com|net|org|io|xyz)\b/i.test(line)) { T.error('no links. nobody follows them.'); return; }
    let last = 0; try { last = parseInt(localStorage.getItem('nobody.lastSign') || '0', 10); } catch (e) {}
    if (Date.now() - last < 60000) { T.error('one line per minute. nobody is in a hurry.'); return; }
    const entry = { id: S.visitor, at: new Date().toISOString(), name: name, line: line, wire: false, mine: true };
    const local = gbLocal(); local.push(entry); gbSave(local);
    try { localStorage.setItem('nobody.lastSign', String(Date.now())); localStorage.setItem('nobody.name', name); } catch (e) {}
    T.print('signed. ' + (S.localOnly ? 'kept here, not yet on the wire.' : 'sending to the wire ...'));
    if (CFG.backend) api('POST', '/guestbook', { name: name, line: line }).then(function () { entry.wire = true; gbSave(local); if (S.view === 'guestbook') showGuestbook(); }).catch(function () {});
    if (S.view === 'guestbook') showGuestbook();
  };
  st.count = function () { T.print('you are visitor ' + String(S.visitor).padStart(6, '0') + '. ' + (S.localOnly ? 'local count, not yet on the wire.' : 'counted on the wire.')); };
  st.uptimeText = function () { return hms(S.airSince ? Date.now() - S.airSince : 0); };
  st.dial = function (a) {
    const f = parseFloat(a);
    if (isNaN(f)) { T.error('dial <MHz>, like dial 91.2'); return; }
    if (S.dialBusy || S.state === 'tuning') { T.print('the dial is busy.', 'mid'); return; }
    if (Math.abs(f - 88.8) < 0.05) { T.print('88.8. you are already here.'); return; }
    S.dialBusy = true;
    const t0 = performance.now(), start = 88.8, target = Math.max(86, Math.min(108, f));
    el.progress.hidden = true; el.dial.hidden = false; A.tuning = true;
    const stopNoise = SY.tuning(3.2);
    if (SY.gain) { SY.gain.gain.setTargetAtTime(0, SY.ctx.currentTime, 0.05); } else deck.volume = 0;
    setChip('TUNING', 'tuning');
    // the sweep draws while the tab is shown; the timers run the dial back either way (issue #114: no frames in a background tab)
    let swept = false;
    (function sweep() {
      if (swept) return;
      const k = Math.min(1, (performance.now() - t0) / 1000);
      drawDial(start + (Math.min(91.6, Math.max(86, target)) - start) * k);
      if (k < 1) requestAnimationFrame(sweep);
    })();
    setTimeout(function () {
        swept = true;
        drawDial(target, false, 'static');
        setTimeout(function () {
          stopNoise(); A.tuning = false; S.dialBusy = false;
          drawDial(88.8, true); setTimeout(function () { el.dial.hidden = true; el.progress.hidden = false; }, 250);
          if (SY.gain && !SY.muted) SY.rampIn(); else if (!SY.gain) SY.setVolume(SY.volume, deck, true);
          setChip(S.state === 'paused' ? 'PAUSED' : 'ON AIR');
          T.print(f >= 108 ? 'end of the band. nobody goes further.' : 'nobody there. back to 88.8.');
        }, 2000);
    }, 1000);
  };
  st.phosphor = function (which) {
    const amber = which === 'amber';
    document.documentElement.dataset.phosphor = amber ? 'amber' : '';
    TH().scheme();
    T.print(amber ? 'phosphor: amber. the warnings went green.' : 'phosphor: green. as stocked.');
    try { sessionStorage.setItem('nobody.phosphor', amber ? 'amber' : 'green'); } catch (e) {}
  };
  st.help = function (open) {
    const show = open == null ? el.help.hidden : open;
    if (show) { st.themePicker(false); drawHelp(); el.help.hidden = false; V.scramble(el.helpTitle, 'HELP', 600); el.help.focus && el.help.focus(); }
    else el.help.hidden = true;
  };
  st.helpScroll = function () {
    const lines = (phone() ? BANNER_PHONE : BANNER).split('\n').concat(['', 'NOBODY FM  88.8  the transmitter nobody can find', '']).concat(helpLines());
    T.printScroll(lines);
  };
  st.home = function () { if (location.hash && location.hash !== '#/') location.hash = '#/'; else showHome(); st.help(false); };
  // esc: the overlay, then a page, then the theme's own paradigm (12.0, the interface hooks, issue #53: the city flies back to its orbit)
  st.escape = function () { if (!el.themes.hidden) { st.themePicker(false); return; } if (!el.help.hidden) { st.help(false); return; } if (S.view !== 'home') { st.home(); return; } if (IFACE.kind && TH() && TH().escape) TH().escape(); };
  st.reboot = function () {
    T.print('power off.', 'mid');
    deck.pause(); S.onAir = false; S.state = 'standby'; S.current = null; S.played = new Set(); S.history = []; S.queue = [];
    if (S.readoutTyper) S.readoutTyper.cancel();
    hideDead(); showHome(); st.help(false);
    T.clear();
    TH().transition('home', 'off').then(function () { setChip('STANDBY'); setTimeout(function () { runBoot(true); }, 200); });
  };
  // what the harness and curious people can read: which theme is on and what its visuals are doing
  st.themeState = function () { const th = TH(); return Object.assign({ theme: S.theme }, th && th.state ? th.state() : {}); };
  /* the theme picker (issue #63, design 12.0): a THEME button in the header and `t` open one swatch per registered theme, in the
     order they registered, so a theme that lands later is listed with nothing else to change. a theme without a swatch gets a plain one */
  function drawThemes() {
    el.themeList.textContent = '';
    Object.keys(THEMES).forEach(function (name, i) {
      const th = THEMES[name], sw = th.swatch || ['#101010', '#a0a0a0', '#e0e0e0'];
      const b = document.createElement('button'); b.type = 'button'; b.className = 'theme-pick' + (name === S.theme ? ' on' : ''); b.dataset.theme = name;
      b.setAttribute('aria-pressed', name === S.theme ? 'true' : 'false');
      const chip = span('', 'tp-swatch'); chip.setAttribute('aria-hidden', 'true');
      chip.style.background = sw[0]; sw.slice(1).forEach(function (c) { const dot = document.createElement('i'); dot.style.background = c; chip.appendChild(dot); });
      b.appendChild(span(String(i + 1), 'tp-key')); b.appendChild(chip); b.appendChild(span(name, 'tp-name'));
      b.appendChild(span(name === S.theme ? 'on' : '', 'tp-on'));
      b.appendChild(span(th.blurb || '', 'tp-blurb mid'));
      b.addEventListener('click', function (e) { e.stopPropagation(); pickTheme(name); });
      el.themeList.appendChild(b);
    });
  }
  function pickTheme(name) { st.themePicker(false); if (name === S.theme) { T.print('theme: ' + name + '. already.', 'mid'); return; } st.theme(name); }
  st.themePicker = function (open) {
    const show = open == null ? el.themes.hidden : !!open;
    if (show) {
      st.help(false); drawThemes(); el.themes.hidden = false; el.themeBtn.setAttribute('aria-expanded', 'true');
      const on = el.themeList.querySelector('.theme-pick.on') || el.themeList.querySelector('.theme-pick'); if (on) on.focus();
    } else if (!el.themes.hidden) { el.themes.hidden = true; el.themeBtn.setAttribute('aria-expanded', 'false'); if (el.themes.contains(document.activeElement)) document.activeElement.blur(); }
  };
  // the picker's keys: a digit picks, the arrows and j / k walk, enter picks the focused one, t or esc closes
  function themesKey(e) {
    const k = e.key, picks = [].slice.call(el.themeList.querySelectorAll('.theme-pick'));
    if (k === 'Escape' || k === 't' || k === 'T') { st.themePicker(false); return true; }
    if (/^[1-9]$/.test(k)) { const b = picks[+k - 1]; if (b) pickTheme(b.dataset.theme); return true; }
    const i = picks.indexOf(document.activeElement);
    if (k === 'ArrowDown' || k === 'ArrowRight' || k === 'j') { (picks[(i + 1) % picks.length] || picks[0]).focus(); return true; }
    if (k === 'ArrowUp' || k === 'ArrowLeft' || k === 'k') { (picks[(i - 1 + picks.length) % picks.length] || picks[0]).focus(); return true; }
    if (k === 'Enter' || k === ' ') { const b = picks[i]; if (b) pickTheme(b.dataset.theme); return true; }
    return k !== 'Tab';
  }
  // `theme` lists the themes; `theme <name>` swaps the stylesheet and the visuals module in place and remembers it (12.0)
  st.theme = function (a) {
    const names = Object.keys(THEMES);
    if (!a) { T.print('themes: ' + names.map(function (n) { return n + (n === S.theme ? ' (on)' : ''); }).join(', ') + '. theme <name> to change.'); return; }
    const name = String(a).trim().toLowerCase();
    if (!THEMES[name]) { T.error('nobody knows the theme "' + a + '". themes: ' + names.join(', ') + '.'); return; }
    if (name === S.theme) { T.print('theme: ' + name + '. already.', 'mid'); return; }
    if (S.themeSwitching) { T.print('the theme is still changing.', 'mid'); return; }
    S.themeSwitching = true;
    if (HIDE.on) st.hideUi(false);
    try { localStorage.setItem('nobody.theme', name); } catch (e) {}
    const link = document.getElementById('themeCss');
    const was = pageKind();
    // leaving a theme's own paradigm for one without (issue #63): say where it went, in the station's voice, after the switch line
    const from = S.theme, nextIface = THEMES[name].interface ? THEMES[name].interface() : null;
    const leaving = IFACE.kind && !nextIface ? (IFACE.kind === 'flythrough' ? 'fly mode' : IFACE.kind) + ' is the ' + from + "'s. " + name + ' keeps the list. theme ' + from + ' flies again.' : null;
    themeRelease();
    if (TH()) TH().dispose();
    const done = function () {
      link.onload = null; link.onerror = null;
      themeInit(name);
      if (S.onAir) TH().transition('switch', was, { slug: S.current });
      if (S.state === 'dead' || S.idle) startTower();
      if (S.state === 'tuning') { el.progress.hidden = true; el.dial.hidden = false; drawDial(88.8, false); }
      drawProgress(); drawCatHead(); renderRows();
      S.themeSwitching = false;
      T.print(THEMES[name].strings.switched);
      if (leaving) T.print(leaving, 'mid');
    };
    link.onload = done; link.onerror = function () { T.error('the theme did not load. staying as we were.'); S.themeSwitching = false; themeInit(S.theme); };
    link.href = 'themes/' + name + '/theme.css';
  };
  st.mute = function () {
    SY.setMuted(!SY.muted, deck, FILE || !SY.ctx); drawVol();
    T.print(SY.muted ? 'muted. the gain to the speakers is 0. the analyser still reads.' : 'unmuted.');
  };
  st.clicks = function () { SY.clicks = !SY.clicks; T.print('key clicks ' + (SY.clicks ? 'on. 6 ms of noise per key.' : 'off.')); };
  st.source = function () {
    if (CFG.source) { window.open(CFG.source, '_blank', 'noopener'); T.print('source: ' + CFG.source); }
    else T.print('source: not on the wire yet. the link goes in config.js when the station is published.', 'mid');
  };
  st.ident = function () {
    if (!SY.ctx) { T.print('nobody fm. the transmitter nobody can find. (the ident needs the key first.)', 'mid'); return; }
    SY.ident(); T.print('nobody fm. the transmitter nobody can find.');
  };
  st.ls = function () {
    if (!S.tracks.length) { T.print('tracks/  (empty)', 'mid'); return; }
    const lines = S.tracks.map(function (t) { const kb = Math.round((t.duration || 100) * 16); return pad(t.slug + '/', 30) + pad(t.slug + '.mp3', 30) + String(kb) + 'K  notes.md  recipe.json'; });
    T.printScroll(['tracks/'].concat(lines));
  };
  st.fortune = function () {
    const whys = S.tracks.map(function (t) { return t.why; }).filter(Boolean);
    if (!whys.length) { T.print('no fortunes yet. the machine is rendering.', 'mid'); return; }
    T.print(whys[Math.floor(Math.random() * whys.length)]);
  };
  st.dance = function () { A.dance(); };
  /* ---------------- legibility (issue #43, design 12.0): `big` and `contrast` ---------------- */
  // `big` adds 2 px to the base size (html[data-big="1"], every theme adds --big to its --fs) and remembers it in this browser
  st.big = function (a) {
    const on = document.documentElement.dataset.big === '1';
    const want = a === 'off' ? false : a === 'on' ? true : !on;
    document.documentElement.dataset.big = want ? '1' : '';
    try { localStorage.setItem('nobody.big', want ? '1' : ''); } catch (e) {}
    relayout();
    T.print(want ? 'big: +2 px. remembered. big again for normal.' + (phone() ? ' the phone clips the end of a long row.' : '') : 'big off. normal size.');
  };
  // `contrast` prints the measured ratio of every text box on this screen against the backgrounds behind it, worst first;
  // an estimate from the page's own colours (the harness measures real pixels), so the viewer can check on their own screen
  st.contrast = function () {
    const rows = V.contrastReport();
    if (!rows.length) { T.print('nothing to measure.', 'mid'); return; }
    const bad = rows.filter(function (r) { return r.ratio < 4.5; });
    const lines = ['contrast: ' + rows.length + ' text boxes on this screen, ' + bad.length + ' under 4.5:1 (an estimate from the page colours; the harness measures pixels).', pad('ratio', 8) + pad('px', 5) + 'text'];
    rows.slice(0, 10).forEach(function (r) { lines.push(pad(r.ratio.toFixed(1) + ':1', 8) + pad(String(Math.round(r.size)), 5) + r.text.slice(0, phone() ? 22 : 60)); });
    if (rows.length > 10) lines.push('... and ' + (rows.length - 10) + ' more, all at ' + rows[10].ratio.toFixed(1) + ':1 or better. clear to dismiss.');
    T.printScroll(lines);
  };

  /* ---------------- hidden mode (issue #52, design 12.0): ` takes the interface away, the scene stays ---------------- */
  // one class on the body (`ui-hidden`) fades #screen; the theme's scene is outside it (or in the glass beside it) and keeps going.
  // `v` toggles the visualizer over the scene (remembered), ` or Escape brings the interface back, the deck is never touched.
  const HIDE = { on: false, viz: true, canvas: null, g: null, raf: 0, title: null, ink: '#ffffff', ink2: '#ffffff', idle: 0, two: null, tapAt: 0 };
  try { HIDE.viz = localStorage.getItem('nobody.hideviz') !== '0'; } catch (e) {}
  function hideEls() {
    if (HIDE.canvas) return;
    HIDE.canvas = document.createElement('canvas'); HIDE.canvas.id = 'hideViz'; HIDE.canvas.setAttribute('aria-hidden', 'true');
    HIDE.title = document.createElement('div'); HIDE.title.id = 'hideTitle'; HIDE.title.setAttribute('aria-hidden', 'true');
    HIDE.g = HIDE.canvas.getContext('2d');
    document.body.appendChild(HIDE.canvas); document.body.appendChild(HIDE.title);
  }
  // the title (or a one-word state) fades in and out over the scene, in the theme's own face, no box
  function hideHint(text) {
    if (!HIDE.on || !HIDE.title) return;
    HIDE.title.textContent = text;
    HIDE.title.classList.remove('show'); void HIDE.title.offsetWidth; HIDE.title.classList.add('show');
  }
  function hideDraw() {
    HIDE.raf = requestAnimationFrame(hideDraw);
    const cv = HIDE.canvas, g = HIDE.g, d = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(innerWidth * d), h = Math.round(innerHeight * d);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    g.clearRect(0, 0, w, h);
    const N = phone() ? 24 : 48, bw = w / N, v = A.v64, top = h * 0.45;
    const gr = g.createLinearGradient(0, h, 0, h - top); gr.addColorStop(0, HIDE.ink2); gr.addColorStop(1, HIDE.ink);
    g.fillStyle = gr; g.globalAlpha = 0.6;
    for (let i = 0; i < N; i++) {
      const raw = v ? v[Math.min(63, Math.floor(Math.pow(i / N, 1.4) * 64))] : 0;
      const bh = Math.max(2, Math.pow(Math.max(0.02, raw), 0.9) * top);
      g.fillRect(i * bw + bw * 0.14, h - bh, bw * 0.72, bh);
    }
    g.globalAlpha = 1;
  }
  function hideVizSync() {
    // a theme with no station visualizer (issue #82) gets no bars over its scene, whatever this browser remembered
    const run = HIDE.on && HIDE.viz && IFACE.viz;
    if (run && !HIDE.raf) HIDE.raf = requestAnimationFrame(hideDraw);
    if (!run && HIDE.raf) { cancelAnimationFrame(HIDE.raf); HIDE.raf = 0; if (HIDE.g) HIDE.g.clearRect(0, 0, HIDE.canvas.width, HIDE.canvas.height); }
    document.body.classList.toggle('no-hideviz', !HIDE.viz || !IFACE.viz);
  }
  function hideCursorWake() {
    if (!HIDE.on) return;
    document.body.classList.remove('cursor-idle');
    clearTimeout(HIDE.idle);
    HIDE.idle = setTimeout(function () { document.body.classList.add('cursor-idle'); }, 2000);
  }
  st.hideUi = function (want) {
    if (!S.onAir) return;
    const on = want == null ? !HIDE.on : !!want;
    if (on === HIDE.on) return;
    hideEls();
    HIDE.on = on;
    document.body.classList.toggle('ui-hidden', on);
    const th = TH();
    if (on) {
      st.help(false);
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      const cs = getComputedStyle(document.documentElement);
      HIDE.ink = cs.getPropertyValue('--hide-ink').trim() || '#ffffff';
      HIDE.ink2 = cs.getPropertyValue('--hide-ink2').trim() || HIDE.ink;
      hideCursorWake();
    } else {
      clearTimeout(HIDE.idle); document.body.classList.remove('cursor-idle');
    }
    hideVizSync();
    if (th && th.hidden) th.hidden(on);
    if (on) { const t = S.tracks.find(function (x) { return x.slug === S.current; }); hideHint(t ? (t.title || t.slug) : 'nobody fm'); }
  };
  st.hideViz = function (want) {
    HIDE.viz = want == null ? !HIDE.viz : !!want;
    try { localStorage.setItem('nobody.hideviz', HIDE.viz ? '1' : '0'); } catch (e) {}
    hideVizSync();
  };
  st.hidden = function () { return HIDE.on; };
  // the keys of this mode; returns true when the key is spent. what opens an input, a page or an overlay is dead while the interface is away
  function hideKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return false;
    const k = e.key;
    if (k === '`' || k === '~') { st.hideUi(); return true; }
    if (!HIDE.on) return false;
    if (k === 'Escape') { st.hideUi(false); return true; }
    if ((k === 'v' || k === 'V') && IFACE.viz) { st.hideViz(); return true; }
    if ('/:?gicqjktT'.indexOf(k) >= 0 || k === 'Tab' || k === 'Enter') return true;
    // play and the volume keep working; with no interface their answer is one word over the scene
    if (k === ' ' || k === '-' || k === '=' || k === '+' || k === 'm') {
      setTimeout(function () { hideHint(k === ' ' ? (deck.paused ? 'paused' : 'on air') : k === 'm' ? (SY.muted ? 'muted' : 'volume ' + SY.volume) : 'volume ' + SY.volume); }, 0);
    }
    return false;
  }
  // a phone has no backtick: two fingers, tapped twice
  function hideTouch() {
    document.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) HIDE.two = { t: e.timeStamp, x: e.touches[0].clientX, y: e.touches[0].clientY };
      else if (e.touches.length > 2) HIDE.two = null;
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (HIDE.two && Math.abs(e.touches[0].clientX - HIDE.two.x) + Math.abs(e.touches[0].clientY - HIDE.two.y) > 30) HIDE.two = null;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (!HIDE.two || e.touches.length) return;
      // the event's own clock, so a busy main thread (a software-rendered scene) cannot turn a quick tap into a slow one
      const now = e.timeStamp, quick = now - HIDE.two.t < 350;
      HIDE.two = null;
      if (!quick) { HIDE.tapAt = 0; return; }
      if (now - HIDE.tapAt < 500) { HIDE.tapAt = 0; st.hideUi(); } else HIDE.tapAt = now;
    }, { passive: true });
    document.addEventListener('mousemove', hideCursorWake, { passive: true });
  }

  /* ---------------- the car view (issue #220): one landscape screen for a car's browser, parked and drive ---------------- */
  // on with a Tesla user agent or ?view=car, off with ?view=desk: decided in the head of the page as html[data-view=car], so the
  // desktop and the phone never run any of this. parked: the bars and the scope, the title, the album and n/m, next up, a prompt
  // line, the bar of thumb-size buttons; MAKE A TRACK and the terminal sit behind [ more ]. drive: a still cover, a huge title, next
  // up, play and next, and nothing moves: every animation frame asked for is parked until the drive ends, and the CSS stops every
  // animation. the browser cannot read the gear or the speed, so drive is a toggle, and the view falls into it after
  // carDriveAfter minutes (config.js, 3 by default) with no touch; ?drive=1 opens in it. the Media Session gets a title that carries
  // the album and the number (the car's now-playing card shows the title and the art, and the site's address where the artist would
  // be), and art for every track: the album's cover, else the theme's own picture. ?carart=viz makes it a still of the visualizer.
  const CAR = { on: document.documentElement.dataset.view === 'car', drive: false, more: false, idle: 0, g: null, ink: null, covers: {}, snap: null, coverSrc: '',
    viz: qs.get('carart') === 'viz', after: Math.max(0.5, Number(CFG.carDriveAfter) || 3) * 60 * 1000 };
  // test-only, with ?mute=1: ?driveafter=<seconds> so the harness can watch the view fall into drive
  if (MUTE && Number(qs.get('driveafter')) > 0) CAR.after = Number(qs.get('driveafter')) * 1000;
  const rafNative = window.requestAnimationFrame.bind(window), cafNative = window.cancelAnimationFrame.bind(window), parked = new Map();
  let parkedId = 0;
  if (CAR.on) {
    window.requestAnimationFrame = function (cb) { if (!CAR.drive) return rafNative(cb); parkedId -= 1; parked.set(parkedId, cb); return parkedId; };
    window.cancelAnimationFrame = function (id) { if (id < 0) parked.delete(id); else cafNative(id); };
  }
  function unpark() { const cbs = Array.from(parked.values()); parked.clear(); cbs.forEach(function (cb) { rafNative(cb); }); }
  function carLine(t) {
    const a = albumOf(t), title = t.title || t.slug;
    return a ? title + ' · ' + albumTitle(a) + ' ' + trackNo(t.slug) + '/' + a.tracks.length : title + ' · ' + S.theme;
  }
  // the cover: the album's own art, else the theme's picture (drawn once per theme), else the station's placeholder
  function carCover(t) {
    const a = t && albumOf(t);
    if (a && hasArt(a)) return absUrl(coverUrl(a, 1400));
    if (!(S.theme in CAR.covers)) CAR.covers[S.theme] = TH().artwork() || absUrl(PLACEHOLDER[1400]);
    return CAR.covers[S.theme];
  }
  function carArt(t) {
    const a = albumOf(t);
    if (a && hasArt(a)) return [{ src: absUrl(coverUrl(a, 400)), sizes: '400x400', type: 'image/webp' }, { src: absUrl(coverUrl(a, 1400)), sizes: '1400x1400', type: 'image/webp' }];
    if (CAR.snap && CAR.snap.slug === t.slug) return [{ src: CAR.snap.src, sizes: '512x512', type: 'image/png' }];
    const src = carCover(t), data = src.indexOf('data:') === 0;
    return [{ src: src, sizes: data ? '512x512' : '1400x1400', type: data ? 'image/png' : 'image/webp' }];
  }
  function carSync() {
    if (!CAR.on) return;
    const t = S.bySlug[S.current], a = t && albumOf(t), info = S.onAir && S.state !== 'dead' ? nextUpInfo() : null;
    el.car.classList.toggle('on-air', !!S.onAir);
    el.carState.textContent = !S.onAir ? 'NOBODY FM  88.8' : S.state === 'dead' ? 'DEAD AIR' : S.state === 'tuning' ? 'TUNING  88.8' : S.state === 'failed' ? 'NO SIGNAL' : deck.paused ? 'PAUSED' : 'NOW PLAYING  88.8';
    el.carTitle.textContent = t ? (t.title || t.slug) : S.state === 'dead' ? 'nothing in the catalogue yet' : 'nobody fm';
    el.carAlbum.textContent = a ? albumTitle(a) + '  ' + trackNo(t.slug) + '/' + a.tracks.length : t ? 'a single  ·  ' + S.theme : '';
    el.carUp.textContent = '';
    if (S.repeat && t) { el.carUp.appendChild(span('NEXT UP', 'car-label')); el.carUp.appendChild(span('this one, once more')); }
    else if (info) {
      el.carUp.appendChild(span('NEXT UP', 'car-label')); el.carUp.appendChild(span(info.title));
      if (info.album) el.carUp.appendChild(span(info.album + ' ' + info.n + '/' + info.of, 'car-up-album'));
    }
    el.carPrompt.textContent = t ? '> ' + (t.prompt || t.idea || '') : '';
    const playing = S.onAir && !deck.paused && S.state !== 'dead' && S.state !== 'failed';
    el.carPlay.classList.toggle('playing', playing);
    el.carPlay.setAttribute('aria-label', playing ? 'pause' : 'play');
    el.carKeep.setAttribute('aria-pressed', S.repeat ? 'true' : 'false');
    el.carDrive.setAttribute('aria-pressed', CAR.drive ? 'true' : 'false');
    el.carDrive.textContent = CAR.drive ? 'PARKED' : 'DRIVE';
    el.carDrive.setAttribute('aria-label', CAR.drive ? 'drive view on: back to the parked view' : 'drive view: audio only, nothing moves');
    el.carMore.setAttribute('aria-pressed', CAR.more ? 'true' : 'false');
    el.carMore.textContent = CAR.more ? 'BACK' : 'MORE';
    const src = t ? carCover(t) : '';
    if (src !== CAR.coverSrc) { CAR.coverSrc = src; if (src) el.carCover.src = src; else el.carCover.removeAttribute('src'); }
  }
  function carProgress(c, d) {
    if (!CAR.on || CAR.drive) return;
    el.carFill.style.width = (d ? Math.min(100, c / d * 100) : 0).toFixed(2) + '%';
    el.carTime.textContent = fmt(c) + ' / ' + fmt(d);
  }
  // once a frame while parked: 32 bars from the analyser's 64 bands in the theme's two inks, the scope under them
  function carDraw() {
    const cv = el.carViz, d = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(cv.clientWidth * d), h = Math.round(cv.clientHeight * d);
    if (!w || !h) return;
    if (!CAR.g) CAR.g = cv.getContext('2d');
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; CAR.ink = null; }
    if (!CAR.ink) {
      const cs = getComputedStyle(document.documentElement);
      CAR.ink = cs.getPropertyValue('--car-accent').trim() || '#ffffff'; CAR.ink2 = cs.getPropertyValue('--car-accent2').trim() || CAR.ink;
      CAR.wave = cs.getPropertyValue('--car-ink').trim() || '#ffffff';
    }
    const g = CAR.g, N = 32, scopeH = Math.round(h * 0.24), barsH = h - scopeH - 10 * d, bw = w / N, v = A.v64;
    g.clearRect(0, 0, w, h);
    const gr = g.createLinearGradient(0, barsH, 0, 0); gr.addColorStop(0, CAR.ink2); gr.addColorStop(1, CAR.ink);
    g.fillStyle = gr;
    for (let i = 0; i < N; i++) {
      const raw = v ? v[Math.min(63, Math.floor(Math.pow(i / N, 1.3) * 64))] : 0;
      const bh = Math.max(3 * d, Math.pow(Math.max(0.02, raw), 0.9) * barsH);
      g.fillRect(Math.round(i * bw + bw * 0.12), Math.round(barsH - bh), Math.max(1, Math.round(bw * 0.76)), Math.round(bh));
    }
    const s = A.samples(160), mid = h - scopeH / 2;
    g.strokeStyle = CAR.wave; g.lineWidth = 2 * d; g.globalAlpha = 0.9; g.beginPath();
    for (let i = 0; i < s.length; i++) { const x = i / (s.length - 1) * w, y = mid - s[i] * scopeH * 0.45; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.globalAlpha = 1;
    // ?carart=viz: 2.5 s into a track, a still of the bars becomes its artwork in the car's now-playing card
    if (CAR.viz && S.state === 'playing' && deck.currentTime > 2.5 && (!CAR.snap || CAR.snap.slug !== S.current) && !hasArt(albumOf(S.current))) {
      try {
        const sq = document.createElement('canvas'); sq.width = sq.height = 512;
        const sg = sq.getContext('2d'); sg.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--car-btn').trim() || '#000'; sg.fillRect(0, 0, 512, 512);
        sg.drawImage(cv, 0, 0, w, h, 0, 512 * (1 - h / w) / 2, 512, 512 * h / w);
        CAR.snap = { slug: S.current, src: sq.toDataURL('image/png') };
        mediaSession(S.bySlug[S.current]);
      } catch (e) { CAR.viz = false; }
    }
  }
  st.drive = function (want) {
    if (!CAR.on) return;
    const on = want == null ? !CAR.drive : !!want;
    if (on === CAR.drive) return;
    CAR.drive = on;
    if (on) st.carMore(false);
    if (on) document.documentElement.dataset.drive = '1'; else delete document.documentElement.dataset.drive;
    // what a theme started with element.animate() (phosphor's afterglow under a tap) is out of the CSS's reach: held, then let go
    if (on) CAR.held = document.getAnimations().filter(function (a) { return a.playState === 'running'; }).map(function (a) { a.pause(); return a; });
    else { (CAR.held || []).forEach(function (a) { try { a.play(); } catch (e) {} }); CAR.held = null; }
    if (!on) { unpark(); drawProgress(); }
    carSync(); carWake();
  };
  st.carMore = function (want) {
    if (!CAR.on) return;
    const on = want == null ? !CAR.more : !!want;
    if (on === CAR.more) return;
    CAR.more = on;
    if (on) { if (CAR.drive) st.drive(false); document.documentElement.dataset.carmore = '1'; relayout(); } else delete document.documentElement.dataset.carmore;
    carSync();
  };
  st.carState = function () { return { on: CAR.on, drive: CAR.drive, more: CAR.more, parked: parked.size, after: CAR.after, cover: CAR.coverSrc.slice(0, 60), snap: !!CAR.snap }; };
  // a touch wakes the timer; no touch for CAR.after while on air and the view falls into drive
  function carWake() {
    clearTimeout(CAR.idle);
    if (CAR.on && !CAR.drive && S.onAir) CAR.idle = setTimeout(function () { st.drive(true); }, CAR.after);
  }
  function carWire() {
    if (!CAR.on) return;
    el.carTapBtn.addEventListener('click', function () { if (!S.onAir) goOnAir(null); });
    el.carPrev.addEventListener('click', function () { if (S.onAir && S.state !== 'dead') prev(); });
    el.carPlay.addEventListener('click', togglePlay);
    el.carNext.addEventListener('click', function () { if (S.onAir && S.state !== 'dead') next(); else if (!S.onAir) goOnAir(null); });
    el.carKeep.addEventListener('click', function () { if (S.current) { st.repeatOnce(); carSync(); } });
    el.carDrive.addEventListener('click', function () { st.drive(); });
    el.carMore.addEventListener('click', function () { st.carMore(); });
    ['pointerdown', 'keydown'].forEach(function (ev) { document.addEventListener(ev, carWake, { capture: true, passive: true }); });
    decks.forEach(function (d) { ['play', 'pause'].forEach(function (ev) { d.addEventListener(ev, function () { if (d === deck) carSync(); }); }); });
    if (qs.get('drive') === '1') st.drive(true);
    carSync();
  }

  /* ---------------- keys (4.2), the cheat code (4.5) ---------------- */
  function inInput(e) { const t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'CapsLock') return;
    if (!S.onAir) { if (S.booted || bootTypers.length) { e.preventDefault(); goOnAir(e); } return; }
    // the cheat code is read everywhere except inside an input
    if (!inInput(e)) {
      S.konami.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      if (S.konami.length > KONAMI.length) S.konami.shift();
      if (S.konami.join(',') === KONAMI.join(',')) { S.konami = []; cheat(); return; }
    }
    if (inInput(e)) return;
    if (hideKey(e)) { e.preventDefault(); return; }
    if (!el.themes.hidden) { if (!e.ctrlKey && !e.metaKey && !e.altKey && themesKey(e)) e.preventDefault(); return; }
    if (!el.help.hidden) { if (e.key === '?' || e.key === 'Escape') { e.preventDefault(); st.help(false); } return; }
    if (e.ctrlKey || e.metaKey) return;
    const k = e.key;
    // a theme's claimed keys go to the theme first (12.0, issue #53); while it holds the arrows the 5 s seek is shift + arrows, and
    // while it holds s (issue #63) the shuffle is shift + s
    if (IFACE.kind && TH() && TH().keys && !e.altKey) {
      const lower = k.length === 1 ? k.toLowerCase() : k;
      const claimed = IFACE.keys.indexOf(k) >= 0 || IFACE.keys.indexOf(lower) >= 0;
      const stationShift = e.shiftKey && (/^Arrow/.test(k) || lower === 's');
      if (claimed && !stationShift) { if (TH().keys(e)) { e.preventDefault(); return; } }
      if (IFACE.arrows && e.shiftKey && (k === 'ArrowLeft' || k === 'ArrowRight')) { seekBy(k === 'ArrowLeft' ? -5 : 5); e.preventDefault(); return; }
      if (stationShift && lower === 's' && IFACE.keys.indexOf('s') >= 0) { st.toggleShuffle(); e.preventDefault(); return; }
    }
    let handled = true;
    switch (k) {
      case ' ': togglePlay(); break;
      case 'n': next(); break;
      case 'p': prev(); break;
      // j and k move the one cursor; a theme with its own order (the city in the air: the next tower) takes the step (12.0, issue #63)
      case 'j': if (!themeStep(1) && S.visible && S.visible.length) { S.hl = (S.hl + 1) % S.visible.length; highlight(); } break;
      case 'k': if (!themeStep(-1) && S.visible && S.visible.length) { S.hl = (S.hl - 1 + S.visible.length) % S.visible.length; highlight(); } break;
      case 't': case 'T': st.themePicker(); break;
      case 'Enter': if (hlSlug()) playNow(hlSlug()); break;
      case 'q': if (hlSlug()) st.queueAdd(hlSlug()); else T.print('highlight a row first: j and k.', 'mid'); break;
      case 's': st.toggleShuffle(); break;
      case 'r': if (S.state === 'dead') rereadNow(); else st.repeatOnce(); break;
      case '-': setVol(SY.volume - 1); break;
      case '=': case '+': setVol(SY.volume + 1); break;
      case 'm': st.mute(); break;
      case 'ArrowLeft': seekBy(-5); break;
      case 'ArrowRight': seekBy(5); break;
      case 'i': openTrack(hlSlug() || S.current); break;
      case 'c': if (S.current) copyText(permalink(S.current), permalink(S.current)); break;
      // focus on the next tick so the key that asked for it is never typed into the terminal
      case '/': setTimeout(function () { T.focus('find '); }, 0); break;
      case ':': case 'Tab': setTimeout(function () { T.focus(''); }, 0); break;
      case '?': if (e.altKey) st.helpScroll(); else st.help(true); break;
      case 'g': st.openGuestbook(); break;
      case 'Escape': st.escape(); break;
      default:
        if (/^[0-9]$/.test(k)) seekTo(parseInt(k, 10) / 10);
        else handled = false;
    }
    if (handled) e.preventDefault();
  });
  function themeStep(dir) { const th = TH(); return !!(IFACE.kind && th && th.step && th.step(dir)); }
  function cheat() {
    const amber = document.documentElement.dataset.phosphor === 'amber';
    document.documentElement.dataset.phosphor = amber ? '' : 'amber';
    TH().scheme();
    T.print(amber ? 'first phosphor restored.' : 'second phosphor unlocked.');
  }

  /* ---------------- clicks and taps (4.3) ---------------- */
  function relayout() { A.resize(); drawCatHead(); renderRows(); drawVol(); drawProgress(); T.maxLines = phone() ? 3 : 6; if (TH() && TH().resize) TH().resize(); }
  function wire() {
    // the glass: a tap goes on air before anything else
    // on the document, not the glass: a theme that owns the pointer (12.0, issue #53) lets it through the glass to its scene
    document.addEventListener('pointerdown', function (e) { if (!S.onAir && (S.booted || bootTypers.length)) { goOnAir(e); } });
    el.stationName.addEventListener('click', function () {
      st.home();
      const now = Date.now(); S.nameTaps = now - S.nameTapAt < 1500 ? S.nameTaps + 1 : 1; S.nameTapAt = now;
      if (S.nameTaps >= 5) { S.nameTaps = 0; cheat(); }
    });
    el.stationName2.addEventListener('click', function () { st.home(); });
    el.chip.addEventListener('click', togglePlay); el.chip2.addEventListener('click', togglePlay);
    el.trackCount.addEventListener('click', function () { el.catalogue.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    el.hdrBack.addEventListener('click', function () { st.home(); });
    el.hdrSlug.addEventListener('click', function () { if (S.current) openTrack(S.current); });
    el.progress.addEventListener('click', function (e) { seekTo(TH().progressHit(el.progress, e.clientX, content())); });
    // the volume fader (volume.js): a drag sets the gain live and prints once on release; the word or glyph mutes
    NOBODY.volume.mount(el.vol, { set: setVol, mute: function () { st.mute(); } });
    // MAKE A TRACK (issue #51)
    el.makeForm.addEventListener('submit', function (e) { e.preventDefault(); makeSubmit(); });
    el.makeRemix.addEventListener('click', function () { if (S.current) st.remixThis(S.current); else T.print('nothing is playing to remix.', 'mid'); });
    el.makeWords.addEventListener('keydown', function (e) { e.stopPropagation(); if (e.key === 'Escape') { e.preventDefault(); if (el.makeWords.value) el.makeWords.value = ''; else el.makeWords.blur(); } });
    el.makeWords.addEventListener('focus', function () { if (phone()) setTimeout(function () { el.makeForm.scrollIntoView({ block: 'center' }); }, 300); });
    makeIdle();
    el.npSlug.addEventListener('click', function () { if (S.current) openTrack(S.current); });
    el.spectrum.addEventListener('click', function () { S.scopeMode = S.scopeMode === 'bars' ? 'scope5' : 'bars'; A.setMode(S.scopeMode); T.print(S.scopeMode === 'scope5' ? 'scope: five rows. the old green screen way.' : 'bars: ' + A.bands + ' bands.', 'mid'); });
    el.promptRow.addEventListener('click', function () { T.focus(); });
    el.sortLabel.addEventListener('click', function () { S.sort = S.sort === 'newest' ? 'oldest' : S.sort === 'oldest' ? 'lineage' : 'newest'; buildCatalogue(); });
    el.shuffleLabel.addEventListener('click', function () { st.toggleShuffle(); });
    el.findBtn.addEventListener('click', function () { T.focus('find '); });
    el.helpClose.addEventListener('click', function () { st.help(false); });
    // the theme picker (issue #63) and the two ways on from a track that did not load
    el.themeBtn.addEventListener('click', function (e) { e.stopPropagation(); st.themePicker(); });
    el.themesClose.addEventListener('click', function () { st.themePicker(false); });
    document.addEventListener('click', function (e) { if (!el.themes.hidden && !el.themes.contains(e.target) && !el.themeBtn.contains(e.target)) st.themePicker(false); });
    el.failRetry.addEventListener('click', function () { st.retry(); });
    el.failNext.addEventListener('click', function () { next(); });
    el.audBtn.addEventListener('click', function () { T.run(S.aud ? 'audition off' : 'audition', true); });
    document.querySelectorAll('[data-cmd]').forEach(function (b) { b.addEventListener('click', function () { T.run(b.dataset.cmd, true); }); });
    el.fatPrev.addEventListener('click', prev); el.fatNext.addEventListener('click', next); el.fatPlay.addEventListener('click', togglePlay);
    el.fatQueue.addEventListener('click', function () { if (hlSlug()) st.queueAdd(hlSlug()); else if (S.queue.length) st.queueList(); else T.print('nothing highlighted.', 'mid'); });
    // swipe on the readout: left is next, right is previous
    let sx = 0, sy = 0;
    el.readout.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    el.readout.addEventListener('touchend', function (e) { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 50 && Math.abs(dy) < 40) { if (dx < 0) next(); else prev(); } });
    el.cmd.addEventListener('focus', function () { if (phone()) setTimeout(function () { el.promptRow.scrollIntoView({ block: 'center' }); }, 300); });
    window.addEventListener('resize', relayout);
    hideTouch();
    carWire();
    // any key finishes a typing effect (issue #43); captured, so a key typed into the terminal counts too
    document.addEventListener('keydown', finishTypers, true);
  }

  /* ---------------- the frame loop, the clock, 2 a.m. ---------------- */
  function loop(now) {
    requestAnimationFrame(loop);
    // the numbers are read every frame (the city reads them too); the card is drawn only when it is on screen
    if (S.onAir) A.update(now, deck);
    if (S.onAir && S.view === 'home' && !el.spectrum.hidden && TH()) TH().frame(A, S, now);
    if (CAR.on && S.onAir && !CAR.more) carDraw();
    if (A.ghost && !S.ghostNoted && S.onAir && !FILE && SY.ctx) { S.ghostNoted = true; T.print('analyser: no signal in the graph. guessing, and saying so.', 'amber'); }
  }
  setInterval(function () {
    const up = st.uptimeText();
    el.uptime.textContent = up; el.uptime2.textContent = up;
    const d = new Date();
    if (d.getHours() === 2 && d.getMinutes() === 0 && S.onAir && S.state !== 'dead') {
      if (!el.chip.classList.contains('twoam')) { el.chip.textContent = '[ON AIR] 2 a.m.'; el.chip.classList.add('twoam', 'tuning'); }
      const day = d.toDateString();
      if (S.twoAmDone !== day) { S.twoAmDone = day; const bus = S.tracks.find(function (t) { return /bus-shelter/.test(t.slug); }); if (bus && bus.slug !== S.current && inRotation(bus.slug)) { S.queue.unshift(bus.slug); T.print('2 a.m. the bus shelter is next.', 'amber'); markRows(); } }
    } else if (el.chip.classList.contains('twoam')) { el.chip.classList.remove('twoam', 'tuning'); setChip(S.state === 'paused' ? 'PAUSED' : 'ON AIR'); }
  }, 1000);

  /* ---------------- start ---------------- */
  function init() {
    try { if (sessionStorage.getItem('nobody.phosphor') === 'amber') document.documentElement.dataset.phosphor = 'amber'; } catch (e) {}
    try { if (localStorage.getItem('nobody.big') === '1') document.documentElement.dataset.big = '1'; } catch (e) {}
    T.init(el.log, el.cmd, el.cmdCursor);
    A.init(el.spectrum, el.baseline, el.scope);
    // the theme was chosen in the head of the page (?theme, then this browser's choice, then config.js)
    if (!themeInit(window.NOBODY_THEME) && !themeInit(CFG.defaultTheme)) themeInit(Object.keys(THEMES)[0]);
    initCounter();
    wire();
    requestAnimationFrame(loop);
    let warm = false;
    try { warm = !!sessionStorage.getItem('nobody.booted'); } catch (e) {}
    if (qs.get('boot') === 'full') warm = false;
    if (qs.get('boot') === 'warm') warm = true;
    runBoot(!warm);
    // over http the mute is the gain node after the analyser (5.1); the element itself stays at 1 so the
    // analyser is fed. from a file URL the element is the volume, so the mute lands on it.
    decks.forEach(function (d) { d.volume = (MUTE && FILE) ? 0 : 1; });
    registerShell();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
