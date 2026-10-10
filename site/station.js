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
    try { if (/^(127\.0\.0\.1|localhost|\[::1\])$/.test(new URL(qa).hostname)) { CFG.requestApi = qa; CFG.requestKey = qs.get('requestKey') || null; } } catch (e) {}
  })();
  if (!/\/$/.test(CFG.tracksBase)) CFG.tracksBase += '/';

  const st = NOBODY.st = {};
  // S is the station's state. it is exposed read-only as NOBODY.state for the screenshot and test harness.
  const S = NOBODY.state = {
    tracks: [], bySlug: {}, num: {}, queue: [], current: null, history: [], played: new Set(),
    state: 'standby', shuffle: false, repeat: false, hl: -1, filter: '', sort: 'newest',
    onAir: false, airSince: 0, visitor: 0, view: 'home', readoutTyper: null, whyTyper: null,
    deadTimer: 0, deadLeft: 60, idleTimer: 0, tuningToken: 0, scopeMode: 'bars', booted: false,
    konami: [], nameTaps: 0, nameTapAt: 0, twoAmDone: '', preloader: null, dialBusy: false, localOnly: !CFG.backend
  };
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const deck = $('deck'), glass = $('glass'), power = $('power');
  const el = {};
  ['boot', 'bootLines', 'banner', 'bootTagline', 'bootFreq', 'bootWait', 'main', 'headerMain', 'headerPage', 'chip', 'chip2', 'uptime', 'uptime2',
    'trackCount', 'hdrSlug', 'hdrTime', 'hdrBar', 'hdrBack', 'txLabel', 'vol', 'npSlug', 'npMeta', 'readout', 'readoutText', 'readoutCursor',
    'progress', 'progressTime', 'dial', 'spectrum', 'baseline', 'scope', 'deadair', 'tower', 'towerStatic', 'reread', 'bed', 'fat', 'fatPrev', 'fatPlay', 'fatNext', 'fatQueue', 'licence',
    'catalogue', 'sortLabel', 'shuffleLabel', 'findBtn', 'catHead', 'catRows', 'catEmpty', 'page', 'terminal', 'log', 'cmd', 'cmdCursor', 'promptRow', 'hints',
    'visitorInline', 'wireTag', 'footer', 'odometer', 'countTag', 'help', 'helpTitle', 'helpBody', 'helpClose', 'stationName', 'stationName2', 'transmitter']
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
  let volWidget = null;
  function TH() { return NOBODY.theme.current; }
  function themeCtx() {
    return { el: el, glass: glass, power: power, S: S, deck: deck, V: V, A: A, T: T, fmt: fmt, phone: phone, cols: cols, content: content,
      libs: function () { return NOBODY.libs || null; }, wantsTower: function () { return S.state === 'dead' || !!S.idle; }, print: T.print };
  }
  function themeInit(name) {
    const th = THEMES[name]; if (!th) return false;
    NOBODY.theme.current = th; NOBODY.theme.name = name; S.theme = name;
    document.documentElement.dataset.theme = name;
    th.init(themeCtx());
    th.stationName(el.stationName); th.stationName(el.stationName2);
    th.catalogue(S.tracks);
    if (S.current) th.playing(S.current);
    volWidget = null; drawVol();
    A.resize();
    return true;
  }
  function pageKind() { return S.state === 'dead' ? 'dead' : S.view === 'track' ? 'page' : S.view === 'guestbook' ? 'guestbook' : 'home'; }
  document.addEventListener('libs-ready', function () { const th = TH(); if (th && th.libsReady) th.libsReady(); });

  /* ---------------- helpers ---------------- */
  function phone() { return V.phone(); }
  function cols() { return V.cols(); }
  function content() { return phone() ? cols() - 2 : cols() - 4; }
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
  function permalink(slug) { return location.href.split('#')[0] + '#/track/' + slug; }
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
    S.tracks = tracks; S.bySlug = {}; S.num = {};
    tracks.forEach(function (t, i) { S.bySlug[t.slug] = t; S.num[t.slug] = tracks.length - i; });
    el.trackCount.textContent = tracks.length + (tracks.length === 1 ? ' track' : ' tracks');
    if (TH()) TH().catalogue(tracks);
    return tracks.length;
  }
  function chronological() { return S.tracks.slice().reverse().map(function (t) { return t.slug; }); }

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
    const ok = SY.create(deck, !FILE, MUTE);
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
      S.queue = chronological();
      const m = /^#\/track\/([^/?]+)/.exec(location.hash);
      if (m && S.bySlug[decodeURIComponent(m[1])]) {
        const slug = decodeURIComponent(m[1]);
        S.queue = [slug].concat(S.queue.filter(function (s) { return s !== slug; }));
      }
      setChip('ON AIR');
      tuneTo(S.queue.shift());
      route();
    });
  }

  function setChip(text, cls) {
    if (!cls && (text === 'PAUSED' || text === 'STANDBY')) cls = 'off';
    [el.chip, el.chip2].forEach(function (c) { c.textContent = '[' + text + ']'; c.className = 'bare chip' + (cls ? ' ' + cls : ''); });
  }

  /* ---------------- the deck, the queue, tuning (2.3, 5.1) ---------------- */
  function markRows() { renderRows(); }
  function tuneTo(slug) {
    const t = S.bySlug[slug];
    // a slug that is not in the catalogue is skipped, but never forever (issue #25)
    if (!t) { S.skipped = (S.skipped || 0) + 1; if (S.skipped > S.tracks.length + 1) { S.skipped = 0; T.error('nothing in the queue plays. dead air.'); return; } next(); return; }
    S.skipped = 0;
    const token = ++S.tuningToken;
    if (S.current && S.current !== slug) { S.played.add(S.current); S.history.push(S.current); }
    S.current = slug; S.state = 'tuning';
    hideDead();
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
    A.tuning = true; A.setTrack(slug, t.bpm);
    const stopNoise = SY.tuning(1.2);
    // the theme's between-tracks move (12.5): in the city, the camera leaves through the tunnel for the next tower
    TH().playing(slug);
    TH().transition('playing', 'tuning', { slug: slug, ms: 1200 });
    T.print('tuning ... 88.8 ... found: ' + slug);
    document.title = 'nobody fm: tuning';
    markRows();
    const started = performance.now();
    const from = 86.4 + Math.random() * 4.8;
    let ready = false, timeUp = false, failed = false;
    deck.pause();
    // from a file URL the deck is not in the graph (5.1), and a crossorigin element cannot load file-to-file
    if (FILE && deck.hasAttribute('crossorigin')) deck.removeAttribute('crossorigin');
    deck.src = trackUrl(t, 'mp3');
    deck.load();
    function onReady() { ready = true; cleanup(); go(); }
    function onFail() { failed = true; cleanup(); if (token !== S.tuningToken) return; stopNoise(); T.error('the file for ' + slug + ' did not load. next.'); setTimeout(next, 600); }
    function cleanup() { deck.removeEventListener('canplay', onReady); deck.removeEventListener('error', onFail); }
    deck.addEventListener('canplay', onReady);
    deck.addEventListener('error', onFail);
    const failTimer = setTimeout(function () { if (!ready && !failed && token === S.tuningToken) onFail(); }, 15000);
    (function sweep() {
      if (token !== S.tuningToken) return;
      const k = Math.min(1, (performance.now() - started) / 1200);
      const f = from + (88.8 - from) * (1 - Math.pow(1 - k, 2));
      drawDial(f);
      if (k < 1) requestAnimationFrame(sweep); else { timeUp = true; go(); }
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
    TH().transition('tuning', 'playing', { slug: t.slug });
    el.readout.classList.add('typing');
    S.readoutTyper = V.type(el.readoutText, t.prompt || t.idea || '', 60);
    S.readoutTyper.promise.then(function (finished) { if (finished) el.readout.classList.remove('typing'); });
    document.title = 'nobody fm: ' + t.slug;
    mediaSession(t);
    markRows();
    S.preloaded = false;
    clearIdle();
    if (S.pendingPage) { const p = S.pendingPage; S.pendingPage = null; openTrack(p); }
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
    if (!S.queue.length) {
      const rest = chronological().filter(function (s) { return s !== S.current; });
      // one track in the catalogue (issue #25): there is nothing else to tune to, so it plays again and says so
      if (!rest.length && S.current) { replay('one track. it never stops: ' + S.current + ' again.'); return; }
      S.queue = rest;
      shuffleArray(S.queue);
      T.print('queue empty. refilled, shuffled. nobody stops.');
    }
    tuneTo(S.queue.shift());
  }
  function prev() {
    if (deck.currentTime > 3 || !S.history.length) { deck.currentTime = 0; return; }
    const slug = S.history.pop();
    S.played.delete(slug);
    const cur = S.current;
    S.current = null; // so tuneTo pushes nothing onto the history
    if (cur) { S.queue.unshift(cur); S.played.delete(cur); }
    tuneTo(slug);
  }
  function shuffleArray(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; } }
  function playNow(slug) {
    if (!S.bySlug[slug]) return;
    if (S.current && S.current !== slug) S.queue.unshift(S.current);
    S.queue = S.queue.filter(function (s) { return s !== slug; });
    tuneTo(slug);
  }
  function togglePlay() {
    if (!S.onAir) { goOnAir(null); return; }
    if (S.state === 'dead') return;
    if (deck.paused) { const p = deck.play(); if (p && p.catch) p.catch(function () {}); S.state = 'playing'; setChip('ON AIR'); clearIdle(); T.print('on air.'); }
    else { deck.pause(); S.state = 'paused'; setChip('PAUSED'); T.print('paused. the transmitter hums.'); armIdle(); }
    markRows();
  }
  deck.addEventListener('ended', function () { S.state = 'ended'; next(); });
  deck.addEventListener('timeupdate', function () {
    if (S.state !== 'playing' && S.state !== 'paused') return;
    drawProgress();
    if (!S.preloaded && deck.duration && deck.currentTime / deck.duration > 0.5 && S.queue.length) {
      S.preloaded = true;
      const nt = S.bySlug[S.queue[0]];
      if (nt) { S.preloader = new Audio(); S.preloader.preload = 'auto'; S.preloader.crossOrigin = 'anonymous'; S.preloader.src = trackUrl(nt, 'mp3'); S.preloader.load(); }
    }
  });
  function drawProgress() {
    const d = deck.duration || (S.bySlug[S.current] || {}).duration || 0, c = deck.currentTime || 0;
    TH().progress(el.progress, el.hdrBar, c, d, phone(), S.view, content());
    if (S.view !== 'home') el.hdrTime.textContent = fmt(c) + ' / ' + fmt(d);
  }
  // the volume widget is the theme's (text bars in phosphor, a HUD ring in the city); it answers clicks by position
  function drawVol() {
    volWidget = TH().volume(el.vol, SY.volume, SY.muted, phone());
    el.vol.setAttribute('aria-label', 'volume ' + SY.volume + ' of 10' + (SY.muted ? ', muted' : ''));
  }
  function setVol(v) {
    v = Math.round(Number(v));
    if (isNaN(v) || v < 0 || v > 10) { T.error('vol 0..10'); return; }
    SY.setVolume(v, deck, FILE || !SY.ctx);
    drawVol(); T.print('vol ' + v + '/10' + (SY.muted ? ' (muted)' : ''));
  }
  function seekTo(frac) { if (deck.duration) deck.currentTime = Math.max(0, Math.min(deck.duration - 0.1, frac * deck.duration)); drawProgress(); }
  function seekBy(s) { if (deck.duration) deck.currentTime = Math.max(0, Math.min(deck.duration - 0.1, deck.currentTime + s)); drawProgress(); }

  function mediaSession(t) {
    if (!('mediaSession' in navigator)) return;
    try {
      if (!S.artwork) S.artwork = TH().artwork();
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title || t.slug, artist: 'nobody fm', album: '88.8 the transmitter nobody can find',
        artwork: S.artwork ? [{ src: S.artwork, sizes: '512x512', type: 'image/png' }] : []
      });
      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('nexttrack', next);
      navigator.mediaSession.setActionHandler('previoustrack', prev);
      navigator.mediaSession.setActionHandler('seekto', function (d) { if (d && d.seekTime != null) { deck.currentTime = d.seekTime; } });
    } catch (e) {}
  }

  /* ---------------- dead air (2.4) and the idle tower (5.6) ---------------- */
  function deadAir() {
    S.state = 'dead'; S.current = null;
    setChip('DEAD AIR', 'dead');
    el.txLabel.textContent = ''; el.npSlug.textContent = ''; el.npMeta.textContent = ''; el.readoutText.textContent = '';
    el.readout.hidden = true; el.progress.hidden = true; el.spectrum.hidden = true; el.baseline.hidden = true; el.scope.hidden = true; el.dial.hidden = true;
    el.deadair.hidden = false;
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
      S.queue = chronological();
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
    const out = [];
    (function walk(list, depth) { list.forEach(function (t) { out.push({ t: t, depth: depth }); walk(children(t.slug), depth + 1); }); })(r, 0);
    return out;
  }
  function stateOf(t) {
    if (t.slug === S.current) return S.state === 'tuning' ? 'tuning' : 'playing';
    if (S.played.has(t.slug)) return 'played';
    return 'queued';
  }
  function matches(t) {
    if (!S.filter) return true;
    const hay = [t.slug, t.title, t.idea, t.request, t.prompt, t.lyrics, t.why, t.key, t.mood, t.project].join(' ').toLowerCase();
    // `project:<name>` is exact (a tag a sibling project put on its requests); every other word is a substring of the text
    return S.filter.toLowerCase().split(/\s+/).every(function (w) {
      if (w.indexOf('project:') === 0) return (t.project || '').toLowerCase() === w.slice(8);
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
      ? [['#', 'num', 4], ['slug', null, 20], ['bpm', 'bpm', 5], ['key', 'key', 4], ['st', null, 4]]
      : [['#', 'num', 4], ['slug', null, 32], ['bpm', 'bpm', 5], ['key', 'key', 6], ['len', 'len', 6], ['tier', 'tier', 7], ['state', null, 11], ['lineage', null, 0]];
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
    if (phone()) {
      const g = stt === 'playing' ? '*' : stt === 'tuning' ? '~' : stt === 'played' ? '.' : 'q';
      return { num: pad(n, 2), slug: pad(slug, 18) + '  ', rest: pad(t.bpm, 3) + '  ' + pad(keyShort(t.key), 2) + '  ' + g + (t.voice ? ' v' : '  ') };
    }
    return { num: pad(n, 2), slug: pad(slug, 32), rest: String(t.bpm == null ? '' : t.bpm).padStart(3) + '  ' + pad(keyShort(t.key), 4) + '  ' + pad(fmt(t.duration), 4) + '  ' + pad(t.model, 5) + '  ' + pad(stt, 9) + '  ' + pad(lin || tag, Math.max(0, content() - 72 - 1)) };
  }
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
      b.appendChild(span(stt === 'playing' || stt === 'tuning' ? '>' : ' ', 'mark'));
      b.appendChild(span(' '));
      const sl = span(r.slug, 'slug-link'); sl.title = 'open ' + t.slug;
      sl.addEventListener('click', function (e) { e.stopPropagation(); openTrack(t.slug); });
      b.appendChild(sl);
      b.appendChild(span(r.rest));
      const plus = span('+', 'plus'); plus.title = 'queue ' + t.slug;
      plus.addEventListener('click', function (e) { e.stopPropagation(); st.queueAdd(t.slug); });
      b.appendChild(plus);
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
  }
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
    const items = [['space', 'play/pause', togglePlay], ['n', 'next', next], ['p', 'prev', prev], ['/', 'find', function () { T.focus('find '); }], ['?', 'help', function () { st.help(true); }]];
    items.forEach(function (it, i) { if (i) el.hints.appendChild(span('   ')); el.hints.appendChild(hintButton(it[0], it[1], it[2])); });
  }

  /* ---------------- the router and the pages (2.5, 2.6) ---------------- */
  function route() {
    const h = location.hash || '#/';
    let m;
    if ((m = /^#\/track\/([^/?]+)/.exec(h))) { const slug = decodeURIComponent(m[1]); if (S.bySlug[slug]) { if (S.onAir && S.state !== 'tuning') showTrack(slug); else S.pendingPage = slug; return; } }
    if (/^#\/guestbook/.test(h)) { showGuestbook(); return; }
    showHome();
  }
  window.addEventListener('hashchange', route);
  function showHome() {
    const was = S.view;
    S.view = 'home';
    el.page.hidden = true; el.page.textContent = '';
    el.transmitter.hidden = false; el.catalogue.hidden = false;
    el.headerMain.hidden = false; el.headerPage.hidden = true;
    if (S.whyTyper) { S.whyTyper.cancel(); S.whyTyper = null; }
    A.resize();
    // home pulls the camera back up (12.5)
    if (S.onAir && S.state !== 'dead' && was !== 'home') TH().transition(was === 'track' ? 'page' : was, 'home', { slug: S.current });
  }
  function openPage(kind) {
    S.view = kind;
    el.transmitter.hidden = true; el.catalogue.hidden = true;
    el.headerMain.hidden = true; el.headerPage.hidden = false;
    el.hdrSlug.textContent = S.current || '-';
    el.page.hidden = false; el.page.textContent = '';
    el.page.scrollTop = 0;
    drawProgress();
    // the camera flies down to the tower for a track page, up and wide for the guestbook (12.5)
    if (S.onAir) TH().transition('home', kind === 'track' ? 'page' : 'guestbook', { slug: S.current });
  }
  function openTrack(slug) { location.hash = '#/track/' + slug; if (location.hash === '#/track/' + slug) route(); }
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
    const head = div('row'); head.appendChild(span('TRACK ' + S.num[slug] + ' of ' + S.tracks.length, 'label'));
    const hr = span(''); hr.appendChild(span(phone() ? '' : '#/track/' + slug + ' ', 'mid')); hr.appendChild(phone() ? button('< back', '', function () { st.home(); }) : copyBtn);
    head.appendChild(hr); p.appendChild(head);
    p.appendChild(span(slug, 'page-title'));
    const asked = div('row');
    asked.appendChild(span('asked: "' + (t.request || t.idea || '') + '"'));
    asked.appendChild(span([t.date, t.model ? t.model + ' tier' : '', t.bpm + ' bpm', t.key, fmt(t.duration)].filter(Boolean).join('   '), 'mid'));
    p.appendChild(asked);
    if (t.project) { const pr = div('row'); pr.appendChild(span('project:' + t.project + (phone() ? '' : '   list project:' + t.project + ' shows the rest'), 'mid')); p.appendChild(pr); }
    if (phone()) { const pl = div('row'); pl.appendChild(span('#/track/' + slug, 'mid')); pl.appendChild(copyBtn); p.appendChild(pl); }
    const buttons = div('buttons');
    buttons.appendChild(button('> play', '', function () { playNow(slug); }));
    buttons.appendChild(button('+ queue', '', function () { st.queueAdd(slug); }));
    buttons.appendChild(button('take it home', '', function () { st.take(slug); }));
    buttons.appendChild(button('copy seed', '', function () { st.copySeed(slug); }));
    buttons.appendChild(button('copy prompt', '', function () { st.copyPrompt(slug); }));
    buttons.appendChild(button(phone() ? 'remix on the request line' : 'remix on request line', CFG.requestLine ? '' : 'dimmed', function () { st.remix(slug); }));
    p.appendChild(buttons);
    const rc = div('print remix-copy'); rc.textContent = 'same seed, one changed clause, is a variation. the seed is the take. take it.'; p.appendChild(rc);
    p.appendChild(h2('WHY'));
    const why = document.createElement('p'); why.className = 'why-text';
    const whyText = span(''); why.appendChild(whyText); const wc = span('', 'cursor'); why.appendChild(wc);
    p.appendChild(why);
    if (S.whyTyper) S.whyTyper.cancel();
    S.whyTyper = V.type(whyText, t.why || '(nobody wrote a why for this one.)', 90);
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
    p.appendChild(tree);
    const fileRow = div('row');
    const fl = span(''); fl.appendChild(span('FILE   ', 'label')); fl.appendChild(span((phone() ? '' : 'tracks/') + (t.files && t.files.notes ? t.files.notes : slug + '/notes.md') + '   '));
    fl.appendChild(button('cat', FILE ? 'dimmed' : '', function () { st.cat(slug, p); }));
    fileRow.appendChild(fl); fileRow.appendChild(span('rendered ' + (t.date || ''), 'mid'));
    p.appendChild(fileRow);
    const lic = document.createElement('p'); lic.className = 'mid'; lic.textContent = t.licence || 'generated locally from a text prompt, no samples or reference audio, no third-party rights claimed.'; p.appendChild(lic);
    p.appendChild(h2('TAKE IT HOME'));
    const tk = div('print take-block');
    tk.textContent = 'this is the whole recipe for this take: the words, the seed, the model settings, the\nmastering numbers. same seed, same words, same audio, on your machine. the model is\nfree and runs on one consumer card. no sound in the bag; you make the sound.\n  zip: recipe.json  HOW-TO.md  recipe_render.py        about 9 KB';
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
  const HELP_CMDS = [
    'play [slug|#]   pause   stop   next   prev', 'queue [slug]    shuffle   repeat   vol 0..10', 'list [words]    find <words>   info [slug]',
    'cat [slug]      tree   seed [slug]   prompt [slug]', 'take [slug]     remix [slug]   request <words>', 'guestbook   sign   count   uptime   dial <MHz>',
    'amber   green   help   clear   reboot   home', 'theme [name]', '', 'a few others. nobody documents everything.'
  ];
  const HELP_WORDS = ['play', 'pause', 'stop', 'next', 'prev', 'queue', 'shuffle', 'repeat', 'vol 5', 'list', 'find', 'info', 'cat', 'tree', 'seed', 'prompt', 'take', 'remix', 'request', 'guestbook', 'sign', 'count', 'uptime', 'dial 88.8', 'amber', 'green', 'theme', 'clear', 'reboot', 'home'];
  function helpLines() {
    const out = [];
    const n = Math.max(HELP_KEYS.length, HELP_CMDS.length);
    out.push(pad('keys', 43) + 'typed at nobody>');
    for (let i = 0; i < n; i++) {
      const k = HELP_KEYS[i] ? pad(HELP_KEYS[i][0], 11) + pad(HELP_KEYS[i][1], 32) : pad('', 43);
      out.push(k + (HELP_CMDS[i] || ''));
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
  st.stop = function () { deck.pause(); deck.currentTime = 0; S.state = 'paused'; setChip('PAUSED'); drawProgress(); T.print('stopped. rewound. the transmitter hums.'); markRows(); armIdle(); };
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
    if (S.shuffle) shuffleArray(S.queue); else S.queue = chronological().filter(function (s) { return S.queue.indexOf(s) >= 0; });
    el.shuffleLabel.textContent = S.shuffle ? 'shuffle on' : 'shuffle off';
    T.print('shuffle ' + (S.shuffle ? 'on. the queue is reordered.' : 'off. the queue is in order.'));
  };
  st.repeatOnce = function () { S.repeat = !S.repeat; T.print(S.repeat ? 'repeat: this one once more.' : 'repeat off.'); };
  st.setVol = setVol;
  st.volText = function () { T.print('vol ' + SY.volume + '/10' + (SY.muted ? ' (muted)' : '')); };
  st.list = function (words) {
    const saved = S.filter; S.filter = words || '';
    const items = displayOrder().filter(function (it) { return matches(it.t); });
    S.filter = saved;
    if (!items.length) { T.print('nothing matches "' + words + '".', 'mid'); return; }
    items.forEach(function (it) { const t = it.t; T.print(pad(S.num[t.slug], 3) + pad((it.depth ? '+-- ' : '') + t.slug, 28) + ' ' + pad(t.bpm, 4) + pad(keyShort(t.key), 4) + fmt(t.duration) + '  ' + (t.model || '') + (t.voice ? '  voice' : '') + (t.project ? '  project:' + t.project : '')); });
  };
  st.setFilter = function (words) {
    S.filter = (words || '').trim(); S.hl = -1; renderRows();
    T.print(S.filter ? 'find: ' + S.visible.length + ' match "' + S.filter + '". find alone clears.' : 'find cleared.', 'mid');
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
    const files = [['recipe.json', trackUrl(t, 'recipe')], ['HOW-TO.md', CFG.tracksBase + 'HOW-TO.md'], ['recipe_render.py', CFG.tracksBase + 'recipe_render.py']];
    const links = function () {
      T.print('zip needs the wire. the three files, one per line:', 'amber');
      files.forEach(function (f) { T.print('  ' + f[1], 'mid'); });
      const box = el.page.querySelector('.take-links');
      if (box && S.view === 'track') { box.textContent = ''; files.forEach(function (f) { const a2 = document.createElement('a'); a2.href = f[1]; a2.download = f[0]; a2.textContent = '[ ' + f[0] + ' ]'; a2.className = 'mid'; box.appendChild(a2); box.appendChild(span('  ')); }); }
    };
    if (FILE || !window.JSZip) { links(); return; }
    if (btn) btn.textContent = 'packing ...';
    const zip = new window.JSZip();
    Promise.all(files.map(function (f) { return fetch(f[1], { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(f[0] + ' ' + r.status); return r.text(); }).then(function (txt) { zip.file(f[0], txt); }); }))
      .then(function () { return zip.generateAsync({ type: 'blob' }); })
      .then(function (blob) {
        const name = 'nobody-fm-' + t.slug + '.zip';
        const a2 = document.createElement('a'); a2.href = URL.createObjectURL(blob); a2.download = name; document.body.appendChild(a2); a2.click(); setTimeout(function () { URL.revokeObjectURL(a2.href); a2.remove(); }, 2000);
        T.print('packed: ' + name);
      })
      .catch(function (e) { T.error('the bag tore: ' + e.message); links(); })
      .then(function () { if (btn) btn.textContent = 'take it home'; });
  };
  st.remix = function (a) {
    const t = findTrack(a); if (!t) { T.error('nobody knows "' + a + '".'); return; }
    copyText('/remix ' + t.slug + ' ', '/remix ' + t.slug);
    if (CFG.requestLine) { T.print('request line is open. paste, add a few words, send.'); window.open(CFG.requestLine, '_blank', 'noopener'); }
    else T.print('request line not open yet. the command is on your clipboard for when it is.', 'amber');
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
    T.print(fit('take: ' + [t.bpm != null ? t.bpm + ' bpm' : null, t.key, t.voice ? 'a voice' : 'instrumental', t.tier ? t.tier + ' tier' : null,
      t.seeds && t.seeds.length ? t.seeds.length + (t.seeds.length === 1 ? ' seed' : ' seeds') : null].filter(Boolean).join(', ')));
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
      if (d.state === 'gated') T.print('waiting at the gate. a person has to say yes.', 'amber');
      else if (d.state === 'approved') T.print('through the gate. in the queue.');
      else if (d.state === 'rendering') T.print('rendering.');
      else if (d.state === 'declined') T.print(fit('declined at the gate' + (d.note ? ': ' + d.note : '') + '. nothing was made.'), 'amber');
      else if (d.state === 'failed') T.print(fit('failed' + (d.note ? ': ' + d.note : '') + '. nothing was made.'), 'amber');
    } else if (kind === 'progress') {
      if (d.text) T.print(fit(d.text), 'mid');
    }
  }
  function reqDone(cur, final) {
    if (cur.stopped) return;
    cur.stopped = true;
    if (REQ.active === cur) REQ.active = null;
    const res = final && final.result;
    if (!final || final.state !== 'done' || !res || !res.slug) {
      if (final && final.state !== 'declined' && final.state !== 'failed') T.print('the request ended: ' + (final ? final.state : 'unknown') + '.', 'amber');
      return;
    }
    T.print(fit('done: ' + (res.title || res.slug)));
    T.print(location.origin + location.pathname + '#/track/' + res.slug, 'amber');     // not permalink(): no query string (a test flag may carry a key)
    const tries = [0, 1500, 4000, 8000];
    (function reload(i) {
      loadIndex().then(installIndex).then(function () {
        if (!S.bySlug[res.slug]) throw new Error('not in the index yet');
        buildCatalogue();
        S.queue = S.queue.filter(function (x) { return x !== res.slug; });
        if (S.current !== res.slug) S.queue.unshift(res.slug);
        T.print('queued next: ' + res.slug);
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
    fetch(base + '/requests', { method: 'POST', headers: reqHeaders(true), body: JSON.stringify({ words: words }) })
      .then(function (r) { return r.json().catch(function () { return null; }).then(function (j) { return { ok: r.ok, status: r.status, body: j }; }); })
      .then(function (res) {
        if (!res.ok) {
          const e = res.body && res.body.error;
          T.error(fit((e && e.message) || ('the line said ' + res.status)));
          return;
        }
        const rec = res.body;
        if (REQ.active) { REQ.active.stopped = true; if (REQ.active.ctl) REQ.active.ctl.abort(); T.print('no longer following ' + REQ.active.id + '.', 'mid'); }
        readBack(rec);
        const cur = REQ.active = { id: rec.id, lastState: null, stopped: false, ctl: null };
        reqFollow(cur);
      }, function () { T.error('the request line did not answer. try again.'); });
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
    (function sweep() {
      const k = Math.min(1, (performance.now() - t0) / 1000);
      drawDial(start + (Math.min(91.6, Math.max(86, target)) - start) * k);
      if (k < 1) requestAnimationFrame(sweep);
      else {
        drawDial(target, false, 'static');
        setTimeout(function () {
          stopNoise(); A.tuning = false; S.dialBusy = false;
          drawDial(88.8, true); setTimeout(function () { el.dial.hidden = true; el.progress.hidden = false; }, 250);
          if (SY.gain && !SY.muted) SY.rampIn(); else if (!SY.gain) SY.setVolume(SY.volume, deck, true);
          setChip(S.state === 'paused' ? 'PAUSED' : 'ON AIR');
          T.print(f >= 108 ? 'end of the band. nobody goes further.' : 'nobody there. back to 88.8.');
        }, 2000);
      }
    })();
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
    if (show) { drawHelp(); el.help.hidden = false; V.scramble(el.helpTitle, 'HELP', 600); el.help.focus && el.help.focus(); }
    else el.help.hidden = true;
  };
  st.helpScroll = function () {
    const lines = (phone() ? BANNER_PHONE : BANNER).split('\n').concat(['', 'NOBODY FM  88.8  the transmitter nobody can find', '']).concat(helpLines());
    T.printScroll(lines);
  };
  st.home = function () { if (location.hash && location.hash !== '#/') location.hash = '#/'; else showHome(); st.help(false); };
  st.escape = function () { if (!el.help.hidden) { st.help(false); return; } if (S.view !== 'home') { st.home(); return; } };
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
  // `theme` lists the themes; `theme <name>` swaps the stylesheet and the visuals module in place and remembers it (12.0)
  st.theme = function (a) {
    const names = Object.keys(THEMES);
    if (!a) { T.print('themes: ' + names.map(function (n) { return n + (n === S.theme ? ' (on)' : ''); }).join(', ') + '. theme <name> to change.'); return; }
    const name = String(a).trim().toLowerCase();
    if (!THEMES[name]) { T.error('nobody knows the theme "' + a + '". themes: ' + names.join(', ') + '.'); return; }
    if (name === S.theme) { T.print('theme: ' + name + '. already.', 'mid'); return; }
    if (S.themeSwitching) { T.print('the theme is still changing.', 'mid'); return; }
    S.themeSwitching = true;
    try { localStorage.setItem('nobody.theme', name); } catch (e) {}
    const link = document.getElementById('themeCss');
    const was = pageKind();
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
    if (!el.help.hidden) { if (e.key === '?' || e.key === 'Escape') { e.preventDefault(); st.help(false); } return; }
    if (e.ctrlKey || e.metaKey) return;
    const k = e.key;
    let handled = true;
    switch (k) {
      case ' ': togglePlay(); break;
      case 'n': next(); break;
      case 'p': prev(); break;
      case 'j': if (S.visible && S.visible.length) { S.hl = (S.hl + 1) % S.visible.length; highlight(); } break;
      case 'k': if (S.visible && S.visible.length) { S.hl = (S.hl - 1 + S.visible.length) % S.visible.length; highlight(); } break;
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
  function cheat() {
    const amber = document.documentElement.dataset.phosphor === 'amber';
    document.documentElement.dataset.phosphor = amber ? '' : 'amber';
    TH().scheme();
    T.print(amber ? 'first phosphor restored.' : 'second phosphor unlocked.');
  }

  /* ---------------- clicks and taps (4.3) ---------------- */
  function wire() {
    // the glass: a tap goes on air before anything else
    glass.addEventListener('pointerdown', function (e) { if (!S.onAir && (S.booted || bootTypers.length)) { goOnAir(e); } });
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
    // the volume widget answers the click: 1..10 sets it, 0 is the mute
    el.vol.addEventListener('click', function (e) {
      const k = volWidget ? volWidget.hit(e.clientX, e.clientY) : 0;
      if (k > 0) setVol(k); else st.mute();
    });
    el.npSlug.addEventListener('click', function () { if (S.current) openTrack(S.current); });
    el.spectrum.addEventListener('click', function () { S.scopeMode = S.scopeMode === 'bars' ? 'scope5' : 'bars'; A.setMode(S.scopeMode); T.print(S.scopeMode === 'scope5' ? 'scope: five rows. the old green screen way.' : 'bars: ' + A.bands + ' bands.', 'mid'); });
    el.promptRow.addEventListener('click', function () { T.focus(); });
    el.sortLabel.addEventListener('click', function () { S.sort = S.sort === 'newest' ? 'oldest' : S.sort === 'oldest' ? 'lineage' : 'newest'; buildCatalogue(); });
    el.shuffleLabel.addEventListener('click', function () { st.toggleShuffle(); });
    el.findBtn.addEventListener('click', function () { T.focus('find '); });
    el.helpClose.addEventListener('click', function () { st.help(false); });
    document.querySelectorAll('[data-cmd]').forEach(function (b) { b.addEventListener('click', function () { T.run(b.dataset.cmd, true); }); });
    el.fatPrev.addEventListener('click', prev); el.fatNext.addEventListener('click', next); el.fatPlay.addEventListener('click', togglePlay);
    el.fatQueue.addEventListener('click', function () { if (hlSlug()) st.queueAdd(hlSlug()); else if (S.queue.length) st.queueList(); else T.print('nothing highlighted.', 'mid'); });
    // swipe on the readout: left is next, right is previous
    let sx = 0, sy = 0;
    el.readout.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    el.readout.addEventListener('touchend', function (e) { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > 50 && Math.abs(dy) < 40) { if (dx < 0) next(); else prev(); } });
    el.cmd.addEventListener('focus', function () { if (phone()) setTimeout(function () { el.promptRow.scrollIntoView({ block: 'center' }); }, 300); });
    window.addEventListener('resize', function () { A.resize(); drawCatHead(); renderRows(); drawVol(); drawProgress(); T.maxLines = phone() ? 3 : 6; });
  }

  /* ---------------- the frame loop, the clock, 2 a.m. ---------------- */
  function loop(now) {
    requestAnimationFrame(loop);
    // the numbers are read every frame (the city reads them too); the card is drawn only when it is on screen
    if (S.onAir) A.update(now, deck);
    if (S.onAir && S.view === 'home' && !el.spectrum.hidden && TH()) TH().frame(A, S, now);
    if (A.ghost && !S.ghostNoted && S.onAir && !FILE && SY.ctx) { S.ghostNoted = true; T.print('analyser: no signal in the graph. guessing, and saying so.', 'amber'); }
  }
  setInterval(function () {
    const up = st.uptimeText();
    el.uptime.textContent = up; el.uptime2.textContent = up;
    const d = new Date();
    if (d.getHours() === 2 && d.getMinutes() === 0 && S.onAir && S.state !== 'dead') {
      if (!el.chip.classList.contains('twoam')) { el.chip.textContent = '[ON AIR] 2 a.m.'; el.chip.classList.add('twoam', 'tuning'); }
      const day = d.toDateString();
      if (S.twoAmDone !== day) { S.twoAmDone = day; const bus = S.tracks.find(function (t) { return /bus-shelter/.test(t.slug); }); if (bus && bus.slug !== S.current) { S.queue.unshift(bus.slug); T.print('2 a.m. the bus shelter is next.', 'amber'); markRows(); } }
    } else if (el.chip.classList.contains('twoam')) { el.chip.classList.remove('twoam', 'tuning'); setChip(S.state === 'paused' ? 'PAUSED' : 'ON AIR'); }
  }, 1000);

  /* ---------------- start ---------------- */
  function init() {
    try { if (sessionStorage.getItem('nobody.phosphor') === 'amber') document.documentElement.dataset.phosphor = 'amber'; } catch (e) {}
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
    deck.volume = (MUTE && FILE) ? 0 : 1;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
