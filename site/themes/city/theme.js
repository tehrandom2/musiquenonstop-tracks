/* nobody fm, theme "city": the cyberspace look (design 12.1 to 12.13) and, since issue #53, the fly-through
   (docs/city-flythrough.md): the catalogue is a street city built from the index's measured numbers, the camera is the
   cursor. the page background is a three.js scene: a street grid, towers of glowing translucent blocks (one per track,
   the rest anonymous filler), a ring of bars and a ribbon around the playing tower, a beam over it, the queue drawn as
   a route on the street, a wireframe tunnel for the long jumps, bloom and chromatic fringing on top; glass cards, a
   display face, HUD rings and a strip of frequencies in front of it. a classic script on purpose (design 5.7): the one
   inline module in index.html imports three.js and its passes from the CDN into NOBODY.libs; makeCityScene below is
   plain code against them. without the CDN there is no scene and the page runs on the CSS gradient (12.11), the list is
   the city. the theme owns the browsing paradigm through the hooks of 12.0 (interface, keys, commands, highlight, queue,
   filter, hidden, layout) and asks the station for everything through ctx; it never writes the station's state.
   nobody who built this can hear; nothing here listens, it only reads numbers. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
function makeCityScene(THREE, P) {
  const C = {
    ok: true, running: false, bloomOn: true, chromaOn: true, frames: 0, ms: 0, view: 'standby', playing: null,
    phone: false, reduced: false, probed: false, tunnelOn: false, flying: false, levels: null, layout: 'deck', ladder: 0
  };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  C.reduced = reduced;
  const qs = new URLSearchParams(location.search);
  const NOPROBE = qs.get('probe') === '0'; // harness only: keep the designed look whatever the frame time

  /* ---- tokens: the scene reads the same custom properties as the CSS (12.1) ---- */
  const tok = {};
  function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    ['cyan', 'magenta', 'violet', 'green', 'amber', 'bg-0', 'bg-1', 'haze', 'ink-dim', 'ink'].forEach(function (k) {
      const v = cs.getPropertyValue('--' + k).trim() || '#ffffff';
      tok[k] = new THREE.Color(v);
    });
  }
  readTokens();

  /* ---- the renderer, the scene, the camera ---- */
  let renderer, scene, camera, composer, bloom, chroma, canvas, W = 2, H = 2, pr = 1, prBase = 1;
  const clock = { last: 0, t: 0 };
  const settings = { fillers: 360, fog: 0.02, bloom: [0.55, 0.4, 0.5], bars: 64, flight: 900 };
  const PHONE = { fillers: 120, fog: 0.03, bloom: [0.5, 0.35, 0.5], bars: 32, flight: 500 };

  const CHROMA = {
    uniforms: { tDiffuse: { value: null }, uAmount: { value: 0.0022 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'uniform sampler2D tDiffuse; uniform float uAmount; varying vec2 vUv;',
      'void main(){',
      '  vec2 d = vUv - 0.5; float r2 = dot(d, d);',
      '  vec2 off = d * (uAmount * (0.4 + 2.0 * r2));',
      '  float r = texture2D(tDiffuse, vUv + off).r;',
      '  float g = texture2D(tDiffuse, vUv).g;',
      '  float b = texture2D(tDiffuse, vUv - off).b;',
      '  float vig = 1.0 - r2 * 0.55;',
      '  gl_FragColor = vec4(vec3(r, g, b) * vig, 1.0);',
      '}'
    ].join('\n')
  };

  /* ---- the block shader (12.3): translucent body, bright edges, instanced, rising and pulsing; aLit is a find (12.0, #53) ---- */
  // the hovered tower (issue #63) lifts by uLift and burns brighter: the pointer is on it
  const BLOCK_VERT = [
    'attribute float aRise; attribute float aTower; attribute float aTop; attribute float aLit;',
    'uniform float uRise, uTime, uFog, uPlaying, uPulse, uFilter, uHover, uLift;',
    'varying vec2 vUv; varying vec3 vCol; varying float vFade; varying float vLit;',
    'void main(){',
    '  vUv = uv;',
    '  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);',
    '  float s = clamp((uRise - aRise * 0.6) / 0.4, 0.0, 1.0);',
    '  s = s * s * (3.0 - 2.0 * s);',
    '  wp.y *= s;',
    '  float hov = step(abs(aTower - uHover), 0.5) * uLift;',
    '  wp.y += hov * 0.7;',
    '  vec4 mv = viewMatrix * wp;',
    '  float d = length(mv.xyz);',
    '  float fog = exp(-pow(d * uFog, 2.0)) * smoothstep(1.2, 4.5, d);',
    '  float playing = step(abs(aTower - uPlaying), 0.5);',
    '  float top = step(0.5, aTop) * step(aTop, 1.5);',
    // a tower close to the camera fades its glow so the hover, a fly-in and the zoom never stack it to white (issue #66, the glare)
    '  float near = mix(0.55, 1.0, smoothstep(2.5, 9.0, d));',
    '  float gain = (1.0 + playing * uPulse * 0.7 * (1.0 + top)) * (1.0 + hov * 0.45) * near;',
    '  float blink = mix(1.0, 0.5 + 0.5 * sin(uTime * 3.14159), step(1.5, aTop));',
    '  vCol = instanceColor * gain * blink;',
    '  vLit = mix(1.0, aLit, uFilter);',
    '  vFade = fog * s;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');
  const BLOCK_FRAG = [
    'varying vec2 vUv; varying vec3 vCol; varying float vFade; varying float vLit; uniform float uGain;',
    'void main(){',
    '  vec2 e = min(vUv, 1.0 - vUv);',
    '  float edge = 1.0 - smoothstep(0.0, 0.05, min(e.x, e.y));',
    '  vec3 c = vCol * (0.07 + 1.3 * edge * vLit) * vFade * uGain * vLit;',
    // the emissive ceiling: no block fragment adds more than this, however many blocks overlap a near view
    '  gl_FragColor = vec4(min(c, vec3(1.25)), 1.0);',
    '}'
  ].join('\n');
  const blockUniforms = { uRise: { value: 0 }, uTime: { value: 0 }, uFog: { value: settings.fog }, uPlaying: { value: -99 }, uPulse: { value: 0 }, uGain: { value: 1 }, uFilter: { value: 0 }, uHover: { value: -99 }, uLift: { value: 0 } };
  function blockMaterial() {
    return new THREE.ShaderMaterial({ uniforms: blockUniforms, vertexShader: BLOCK_VERT, fragmentShader: BLOCK_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  }
  const blockGeo = new THREE.BoxGeometry(0.94, 0.44, 0.94);

  /* ---- the grid (12.3): lines every 2 units in cyan, every 10 in violet, drawn outward from the camera ---- */
  const gridUniforms = { uCyan: { value: tok.cyan }, uViolet: { value: tok.violet }, uDraw: { value: 0 }, uFog: { value: settings.fog }, uCam: { value: new THREE.Vector2() } };
  const GRID_VERT = 'varying vec3 vW; varying float vD; void main(){ vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz; vec4 mv = viewMatrix * wp; vD = length(mv.xyz); gl_Position = projectionMatrix * mv; }';
  const GRID_FRAG = [
    'uniform vec3 uCyan, uViolet; uniform float uDraw, uFog; uniform vec2 uCam; varying vec3 vW; varying float vD;',
    'float gridLine(vec2 p, float size){ vec2 q = p / size; vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q); return 1.0 - min(min(g.x, g.y), 1.0); }',
    'void main(){',
    '  float minor = gridLine(vW.xz, 2.0), major = gridLine(vW.xz, 10.0);',
    '  float fog = exp(-pow(vD * uFog, 2.0));',
    '  float reach = uDraw * 240.0;',
    '  float dd = length(vW.xz - uCam);',
    '  float drawn = 1.0 - smoothstep(reach - 3.0, reach, dd);',
    '  float front = exp(-abs(dd - reach) * 0.6) * step(uDraw, 0.999);',
    '  vec3 c = (uCyan * minor * 0.5 + uViolet * major * 0.85 + uViolet * 0.04) * fog * drawn + uCyan * front * 0.9 * fog;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');

  /* ---- the sky (12.3): the gradient of 12.1 as a dome, with the horizon pulsing on the bass ---- */
  const skyUniforms = { uBg0: { value: tok['bg-0'] }, uBg1: { value: tok['bg-1'] }, uHaze: { value: tok.haze }, uMagenta: { value: tok.magenta }, uBass: { value: 0 } };
  const SKY_VERT = 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
  const SKY_FRAG = [
    'uniform vec3 uBg0, uBg1, uHaze, uMagenta; uniform float uBass; varying vec3 vDir;',
    'void main(){',
    '  float y = vDir.y;',
    '  vec3 c = mix(uBg0, uBg1, smoothstep(-0.1, 0.6, y));',
    '  float hz = exp(-abs(y) * 24.0);',
    '  c += uMagenta * hz * (0.05 + 0.16 * uBass);',
    '  float haze = pow(max(0.0, dot(vDir, normalize(vec3(0.6, 0.35, -0.7)))), 3.0);',
    '  c += uHaze * haze * 0.9;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');

  /* ---- the route (city-flythrough 6): a flat ribbon on the street with chevrons running toward the next stop ---- */
  const routeUniforms = { uTime: { value: 0 }, uFog: { value: settings.fog }, uStill: { value: reduced ? 1 : 0 } };
  const ROUTE_VERT = 'attribute float aT; attribute vec3 aCol; varying float vT; varying vec3 vC; varying float vD; void main(){ vT = aT; vC = aCol; vec4 wp = modelMatrix * vec4(position, 1.0); vec4 mv = viewMatrix * wp; vD = length(mv.xyz); gl_Position = projectionMatrix * mv; }';
  const ROUTE_FRAG = [
    'uniform float uTime, uFog, uStill; varying float vT; varying vec3 vC; varying float vD;',
    'void main(){',
    '  float fog = exp(-pow(vD * uFog, 2.0));',
    '  float k = fract((vT - uTime * 4.0 * (1.0 - uStill)) / 2.0);',
    '  float chev = 0.45 + 0.55 * step(k, 0.4);',
    '  gl_FragColor = vec4(vC * chev * fog, 1.0);',
    '}'
  ].join('\n');
  /* ---- the beam (city-flythrough 8): the landmark over the playing tower, no fog, fading up ---- */
  const beamUniforms = { uColor: { value: tok.magenta }, uPulse: { value: 0 } };
  const BEAM_VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
  const BEAM_FRAG = 'uniform vec3 uColor; uniform float uPulse; varying vec2 vUv; void main(){ float a = pow(1.0 - vUv.y, 2.2) * (0.35 + 0.25 * uPulse); gl_FragColor = vec4(uColor * a, 1.0); }';

  /* ---- state ---- */
  let grid, sky, filler, cat, dead, bars, barsMirror, ribbon, tunnel, horizon, route, beam, bridges;
  const towers = []; // {id, slug, x, z, blocks, kind, voice, foot, gain, crown, base, age, fails, cx, cz, district, day, street}
  const city = { cells: {}, walk: {}, signs: [], districts: [], days: [], bounds: { cx0: 0, cx1: 0, cz0: 0, cz1: 0 }, newest: 0 };
  let barCount = 64, barColors = [];
  const ribbonN = 160, ribbonWave = new Float32Array(ribbonN);
  // side: how far the camera pans sideways so the playing tower sits beside the card column, not behind it (issue #43); 0 on the phone
  // zoom scales the orbit (the wheel), tilt raises it (a vertical drag), userAt pauses the orbit's own turn after a drag (issue #63)
  const cam = { target: new THREE.Vector3(0, 2, 0), r: 24, h: 18, speed: 0.02, angle: 0.6, side: 0, sideNow: 0, zoom: 1, zoomT: 1, tilt: 0, userAt: -1e9 };
  const pose = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
  let ticking = false, flight = null, tunnelUntil = 0, tunnelFade = 0, parallax = { x: 0, y: 0, tx: 0, ty: 0 };
  let bootT = null, deadBlocks = 0, deadAt = 0, pulse = 0, bass = 0, chromaAmt = 0.0022, filterK = 0, filterOn = 0, liftK = 0, liftT = 0;
  // the camera's mode: orbit (the deck, the page, standby), or in the air (issue #110) free, glide (an explicit request easing it to a
  // tower) or auto (the hidden mode's auto-fly). focus is the tower the last glide went to; airPose where the listener left the air
  const NAV = { mode: 'orbit', lastInput: -1e9, lastAim: -1e9, focus: null, glideSlug: null, onLand: null, auto: false, autoNow: false, autoSaid: false, airPose: null };
  const routeState = { stops: [], points: [], len: 0, list: [] };
  const perf = { ring: new Float32Array(120), n: 0, at: 0, p50: 0, p95: 0, checkedAt: 0, over: 0, under: 0 };
  let cursor = null; // the cursor tower (a tower object) or null
  let say = function () {}; // the terminal, handed in by the theme
  const TC = 0.22; // the spring's time constant
  function spring(dt) { return 1 - Math.exp(-dt / TC); }

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function kindColour(kind) {
    switch (kind) {
      case 'fast': return tok.cyan.clone().multiplyScalar(1.0);
      case 'best': return tok.magenta.clone().multiplyScalar(1.0);
      case 'beacon': return tok.green.clone().multiplyScalar(1.4);
      case 'filler-c': return tok.cyan.clone().multiplyScalar(0.4);
      case 'filler-v': return tok.violet.clone().multiplyScalar(0.45);
      case 'dead': return tok['ink-dim'].clone().multiplyScalar(1.3);
      case 'fail': return tok.amber.clone().multiplyScalar(1.2);
      default: return tok.violet.clone().multiplyScalar(1.0);
    }
  }
  // the colour of one block of a tower (city-flythrough 2): the tier's hue, the loudness gain, the age, the crown, the base, a failed gate
  function blockColour(t, k) {
    if (t.fails && t.fails.indexOf(k) >= 0) return kindColour('fail');
    const c = kindColour(t.kind).multiplyScalar((t.gain || 1) * (t.age || 1));
    if (t.crown && k >= t.blocks - t.crown) c.lerp(tok.ink, 0.45);
    if (t.base && k < t.base) { c.lerp(tok.violet, 0.6); c.multiplyScalar(0.7); }
    return c;
  }

  /* ---- the city from the numbers (city-flythrough 2) ---- */
  const FAMILIES = [
    ['night', /night|tired|sleepy|awake|late|2 a\.m/i], ['fair', /playful|mischievous|good-humoured|fun|cheeky/i],
    ['quiet', /quiet|calm|hopeful|wistful|awed|unhurried|absent-minded/i], ['wave', /wave phase/i], ['build', /build phase/i], ['title', /title tune/i]
  ];
  const FAMILY_ORDER = { night: 0, fair: 1, quiet: 2, build: 3, wave: 4, title: 5, other: 6 };
  function familyOf(t) { const m = String(t.mood || ''); for (let i = 0; i < FAMILIES.length; i++) if (FAMILIES[i][1].test(m)) return FAMILIES[i][0]; return 'other'; }
  function districtOf(t) { if (t.project) return String(t.project); const f = familyOf(t); return f === 'other' ? 'downtown' : f; }
  function num(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
  function measure(t, newestMs) {
    const n = t.numbers || {}, ch = t.checks || {};
    const tempo = num(n.tempo_bpm, num(t.bpm, 90));
    const blocks = clamp(Math.round(6 + (tempo - 60) * 0.3), 6, 36);
    const bright = num(n.brightness_pct, 1), boom = num(n.boominess_pct, 10), lufs = num(n.lufs, -16.5);
    const when = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00'));
    const days = isNaN(when) ? 90 : Math.max(0, (newestMs - when) / 86400000);
    let age = clamp(0.55 + 0.45 * (1 - days / 90), 0.55, 1); if (t.backfill) age *= 0.85;
    const fails = [];
    const mid = Math.floor(blocks / 2);
    if (ch.tempo === false) fails.push(blocks - 1);
    if (ch.loudness === false || ch.peak === false) fails.push(mid);
    if (ch.boominess === false) fails.push(0);
    ['silence', 'brightness', 'onsets', 'seam', 'words'].forEach(function (g, i) { if (ch[g] === false) fails.push(clamp(mid + 1 + i, 0, blocks - 1)); });
    return {
      blocks: blocks, foot: clamp(num(t.duration, 100) / 100, 0.7, 1.6), gain: clamp(0.6 + (lufs + 21) / 6 * 0.8, 0.5, 1.5),
      crown: Math.round(blocks * clamp(Math.log10(1 + bright) / Math.log10(9), 0, 1) * 0.4), base: Math.round(blocks * clamp(boom / 70, 0, 1) * 0.5),
      age: age, fails: fails
    };
  }
  const BW = 8; // cells per block, east to west
  function key(cx, cz) { return cx + ',' + cz; }
  function wx(cx) { return cx * 2 + 1; }
  function wz(cz) { return cz * 2 + 1; }
  // the street grid: districts as strips either side of the avenue, days as rows of blocks, newest at the south (city-flythrough 2)
  function layoutCity(tracks) {
    towers.length = 0; city.cells = {}; city.walk = {}; city.signs = []; city.districts = []; city.days = [];
    const byD = {};
    tracks.forEach(function (t) { const d = districtOf(t); (byD[d] = byD[d] || []).push(t); });
    const dnames = Object.keys(byD).sort(function (a, b) { return byD[b].length - byD[a].length || a.localeCompare(b); });
    const strips = dnames.map(function (name, k) {
      const order = Math.floor(k / 2), east = k % 2 === 0;
      const cx0 = east ? 2 + order * (BW + 1) : -3 - order * (BW + 1) - (BW - 1);
      return { name: name, east: east, cx0: cx0, cx1: cx0 + BW - 1, count: byD[name].length, cz: 0 };
    });
    let newest = 0;
    tracks.forEach(function (t) { const w = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00')); if (!isNaN(w) && w > newest) newest = w; });
    city.newest = newest || Date.now();
    const when = function (t) { const v = Date.parse(t.rendered_at || ((t.date || '') + 'T00:00:00')); return isNaN(v) ? 0 : v; };
    const days = Array.from(new Set(tracks.map(function (t) { return t.date || 'undated'; }))).sort().reverse();
    let cz = 1, id = 0;
    const minCx = strips.length ? Math.min.apply(null, strips.map(function (s) { return s.cx0; })) - 1 : -2;
    const maxCx = strips.length ? Math.max.apply(null, strips.map(function (s) { return s.cx1; })) + 1 : 1;
    days.forEach(function (day) {
      let depth = 1;
      const perStrip = strips.map(function (s) {
        const list = byD[s.name].filter(function (t) { return (t.date || 'undated') === day; });
        list.sort(function (a, b) { return (when(b) - when(a)) || ((FAMILY_ORDER[familyOf(a)] || 0) - (FAMILY_ORDER[familyOf(b)] || 0)) || String(a.slug).localeCompare(String(b.slug)); });
        depth = Math.max(depth, Math.ceil(list.length / BW));
        return list;
      });
      strips.forEach(function (s, si) {
        perStrip[si].forEach(function (t, i) {
          const col = i % BW, row = Math.floor(i / BW);
          const cx = s.east ? s.cx0 + col : s.cx1 - col, tz = cz + row;
          const m = measure(t, city.newest);
          const tw = { id: id++, slug: t.slug, x: wx(cx), z: wz(tz), cx: cx, cz: tz, kind: t.model === 'fast' ? 'fast' : t.model === 'best' ? 'best' : 'other', voice: !!t.voice,
            blocks: m.blocks, foot: m.foot, gain: m.gain, crown: m.crown, base: m.base, age: m.age, fails: m.fails, district: s.name, day: day, parent: t.lineage && t.lineage.parent || null };
          towers.push(tw); city.cells[key(cx, tz)] = tw;
        });
      });
      city.days.push({ day: day, cz0: cz, cz1: cz + depth - 1 });
      city.signs.push({ x: wx(0) + 2.2, z: wz(cz - 1), text: day, kind: 'day' });
      cz += depth + 1;
    });
    const cz1 = cz - 1; // the north street
    city.bounds = { cx0: minCx, cx1: maxCx, cz0: 0, cz1: cz1 };
    // the walkable cells: the avenue (cx 0, cx -1 kept empty beside it), every day street, every strip boundary street
    for (let z = 0; z <= cz1; z++) city.walk[key(0, z)] = true;
    city.days.forEach(function (d) { for (let x = minCx; x <= maxCx; x++) { city.walk[key(x, d.cz0 - 1)] = true; } });
    for (let x = minCx; x <= maxCx; x++) city.walk[key(x, cz1)] = true;
    strips.forEach(function (s) { for (let z = 0; z <= cz1; z++) { city.walk[key(s.cx0 - 1, z)] = true; city.walk[key(s.cx1 + 1, z)] = true; } });
    strips.forEach(function (s) { city.signs.push({ x: wx(s.east ? s.cx0 : s.cx1) + (s.east ? 1 : -1) * 2, z: wz(0), text: s.name, kind: 'district' }); });
    city.districts = strips;
    // a tower's street-side cell: the nearest walkable cell, ring by ring
    towers.forEach(function (t) {
      let best = null, bd = 99;
      for (let r = 1; r <= 4 && !best; r++) for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const k = key(t.cx + dx, t.cz + dz);
        if (city.walk[k]) { const d = Math.abs(dx) + Math.abs(dz); if (d < bd) { bd = d; best = { cx: t.cx + dx, cz: t.cz + dz }; } }
      }
      t.street = best || { cx: 0, cz: 0 };
    });
  }
  function towerOf(slug) { return towers.find(function (t) { return t.slug === slug; }) || null; }
  function cellOf(x, z) { return { cx: Math.floor(x / 2), cz: Math.floor(z / 2) }; }
  function walkable(cx, cz) { return !!city.walk[key(cx, cz)]; }
  function nearestWalk(x, z) {
    const c = cellOf(x, z);
    if (walkable(c.cx, c.cz)) return c;
    let best = null, bd = 1e9;
    for (let r = 1; r <= 6 && !best; r++) for (let dx = -r; dx <= r; dx++) for (let dz = -r; dz <= r; dz++) {
      if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
      if (walkable(c.cx + dx, c.cz + dz)) { const d = dx * dx + dz * dz; if (d < bd) { bd = d; best = { cx: c.cx + dx, cz: c.cz + dz }; } }
    }
    return best || { cx: 0, cz: 0 };
  }
  // the Manhattan route along the streets, breadth first; returns the cells
  function routeCells(a, b) {
    if (a.cx === b.cx && a.cz === b.cz) return [a];
    const prev = {}, q = [a]; prev[key(a.cx, a.cz)] = null;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let found = false;
    for (let qi = 0; qi < q.length && !found; qi++) {
      const c = q[qi];
      for (let i = 0; i < 4; i++) {
        const nx = c.cx + dirs[i][0], nz = c.cz + dirs[i][1], k = key(nx, nz);
        if (!walkable(nx, nz) || k in prev) continue;
        prev[k] = c; const n = { cx: nx, cz: nz }; q.push(n);
        if (nx === b.cx && nz === b.cz) { found = true; break; }
      }
    }
    if (!found) return [a, b];
    const out = []; let c = b;
    while (c) { out.unshift(c); c = prev[key(c.cx, c.cz)]; }
    return out;
  }
  function corners(cells) {
    const pts = [];
    cells.forEach(function (c, i) {
      if (i > 0 && i < cells.length - 1) { const p = cells[i - 1], n = cells[i + 1]; if ((p.cx === n.cx) || (p.cz === n.cz)) return; }
      pts.push(new THREE.Vector3(wx(c.cx), 0, wz(c.cz)));
    });
    return pts;
  }
  function polyLen(pts) { let l = 0; for (let i = 1; i < pts.length; i++) l += pts[i].distanceTo(pts[i - 1]); return l; }
  function pointAlong(pts, d, out, dir) {
    let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const seg = pts[i].distanceTo(pts[i - 1]);
      if (acc + seg >= d || i === pts.length - 1) {
        const k = seg > 0 ? clamp((d - acc) / seg, 0, 1) : 1;
        out.lerpVectors(pts[i - 1], pts[i], k);
        if (dir) dir.subVectors(pts[i], pts[i - 1]).normalize();
        return out;
      }
      acc += seg;
    }
    out.copy(pts[0]); if (dir) dir.set(0, 0, 1); return out;
  }
  function blocksBetween(a, b) { return Math.abs(a.cx - b.cx) + Math.abs(a.cz - b.cz); }
  function legWords(a, b) {
    const dx = b.cx - a.cx, dz = b.cz - a.cz, parts = [];
    if (dz) parts.push(Math.abs(dz) + (Math.abs(dz) === 1 ? ' block ' : ' blocks ') + (dz > 0 ? 'north' : 'south'));
    if (dx) parts.push(Math.abs(dx) + (Math.abs(dx) === 1 ? ' block ' : ' blocks ') + (dx > 0 ? 'east' : 'west'));
    return parts.length ? parts.join(', ') : 'here';
  }

  // builds one InstancedMesh from a list of towers; each block carries its rise delay, its tower id and whether it is the top
  function buildBlocks(list, camXZ) {
    let n = 0; list.forEach(function (t) { n += t.blocks + (t.voice ? 1 : 0); });
    const mesh = new THREE.InstancedMesh(blockGeo, blockMaterial(), Math.max(1, n));
    const rise = new Float32Array(Math.max(1, n)), tid = new Float32Array(Math.max(1, n)), top = new Float32Array(Math.max(1, n)), lit = new Float32Array(Math.max(1, n)).fill(1);
    const m = new THREE.Matrix4(), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
    let i = 0, maxD = 1;
    list.forEach(function (t) { maxD = Math.max(maxD, Math.hypot(t.x - camXZ.x, t.z - camXZ.y)); });
    list.forEach(function (t) {
      const d = Math.hypot(t.x - camXZ.x, t.z - camXZ.y) / maxD;
      const f = t.foot || 1;
      for (let k = 0; k < t.blocks; k++) {
        p.set(t.x, 0.25 + k * 0.5, t.z); s.set(f, 1, f); m.compose(p, q, s);
        mesh.setMatrixAt(i, m); mesh.setColorAt(i, t.id >= 0 ? blockColour(t, k) : kindColour(t.kind));
        rise[i] = d; tid[i] = t.id; top[i] = k === t.blocks - 1 ? 1 : 0; i++;
      }
      if (t.voice) { p.set(t.x, 0.25 + t.blocks * 0.5, t.z); s.set(f, 1, f); m.compose(p, q, s); mesh.setMatrixAt(i, m); mesh.setColorAt(i, kindColour('beacon')); rise[i] = d; tid[i] = t.id; top[i] = 2; i++; }
    });
    mesh.count = n;
    if (!mesh.instanceColor) mesh.setColorAt(0, new THREE.Color(0, 0, 0)); // an empty catalogue still needs the colour attribute the shader reads
    mesh.geometry = blockGeo.clone();
    mesh.geometry.setAttribute('aRise', new THREE.InstancedBufferAttribute(rise, 1));
    mesh.geometry.setAttribute('aTower', new THREE.InstancedBufferAttribute(tid, 1));
    mesh.geometry.setAttribute('aTop', new THREE.InstancedBufferAttribute(top, 1));
    mesh.geometry.setAttribute('aLit', new THREE.InstancedBufferAttribute(lit, 1));
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
    mesh.userData.list = list;
    return mesh;
  }
  function recolour(mesh) {
    if (!mesh || !mesh.instanceColor) return;
    let i = 0;
    mesh.userData.list.forEach(function (t) {
      for (let k = 0; k < t.blocks; k++) mesh.setColorAt(i++, t.id >= 0 ? blockColour(t, k) : kindColour(t.kind));
      if (t.voice) mesh.setColorAt(i++, kindColour('beacon'));
    });
    mesh.instanceColor.needsUpdate = true;
  }
  // filler (12.3, city-flythrough 2): the empty lots inside the city and the dark beyond it, never on a street, never in a track's cell
  function buildFiller(count) {
    const r = rng(888), list = [];
    const b = city.bounds, lots = [];
    for (let x = b.cx0; x <= b.cx1; x++) for (let z = b.cz0; z <= b.cz1; z++) if (!walkable(x, z) && !city.cells[key(x, z)] && x !== -1) lots.push({ cx: x, cz: z });
    lots.forEach(function (c) { if (r() < 0.55 && list.length < count * 0.6) list.push({ id: -1, x: wx(c.cx), z: wz(c.cz), blocks: 2 + Math.floor(r() * 13), kind: r() < 0.5 ? 'filler-c' : 'filler-v', voice: false, foot: 0.8 + r() * 0.5 }); });
    let tries = 0;
    const midZ = (b.cz0 + b.cz1) / 2;
    while (list.length < count && tries++ < count * 20) {
      const rad = 14 + 76 * Math.sqrt(r()), a = r() * Math.PI * 2;
      const cx = Math.round(Math.cos(a) * rad / 2), cz = Math.round(midZ + Math.sin(a) * rad / 2);
      if (cx >= b.cx0 && cx <= b.cx1 && cz >= b.cz0 && cz <= b.cz1) continue;
      if (list.some(function (t) { return t.x === wx(cx) && t.z === wz(cz); })) continue;
      list.push({ id: -1, x: wx(cx), z: wz(cz), blocks: 2 + Math.floor(r() * 13), kind: r() < 0.5 ? 'filler-c' : 'filler-v', voice: false, foot: 0.8 + r() * 0.5 });
    }
    return buildBlocks(list, new THREE.Vector2(0, 0));
  }
  // lineage bridges (city-flythrough 2): a thin violet line from a child tower to its parent at the parent's half height
  function buildBridges() {
    if (bridges) { scene.remove(bridges); bridges.geometry.dispose(); bridges = null; }
    const pts = [];
    towers.forEach(function (t) { if (!t.parent) return; const p = towerOf(t.parent); if (!p) return; pts.push(t.x, p.blocks * 0.25, t.z, p.x, p.blocks * 0.25, p.z); });
    if (!pts.length) return;
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
    bridges = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: tok.violet, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    bridges.frustumCulled = false; scene.add(bridges);
  }

  function build() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(tok['bg-1'].getHex(), settings.fog);
    camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 400);
    scene.add(camera);
    sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({ uniforms: skyUniforms, vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthWrite: false, fog: false }));
    scene.add(sky);
    grid = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShaderMaterial({ uniforms: gridUniforms, vertexShader: GRID_VERT, fragmentShader: GRID_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    grid.rotation.x = -Math.PI / 2;
    grid.frustumCulled = false;
    scene.add(grid);
    // the horizon strip (12.3): a far flat ring in magenta that the bass lights
    horizon = new THREE.Mesh(new THREE.RingGeometry(60, 90, 64), new THREE.MeshBasicMaterial({ color: tok.magenta, transparent: true, opacity: 0.04, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    horizon.rotation.x = -Math.PI / 2; horizon.position.y = 0.02;
    scene.add(horizon);
    filler = buildFiller(settings.fillers);
    scene.add(filler);
    cat = buildBlocks([], new THREE.Vector2()); scene.add(cat);
    dead = buildBlocks([{ id: -1, x: 0, z: 0, blocks: 18, kind: 'dead', voice: false }], new THREE.Vector2()); dead.count = 0; dead.visible = false; scene.add(dead);
    // the ring of bars (12.4) and its mirror under the floor
    buildBars();
    // the ribbon (12.4)
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(ribbonN * 3), 3));
    rg.setAttribute('color', new THREE.BufferAttribute(new Float32Array(ribbonN * 3), 3));
    ribbon = new THREE.Line(rg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    ribbon.frustumCulled = false;
    scene.add(ribbon);
    // the route (city-flythrough 6): an empty ribbon until the queue arrives
    route = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ uniforms: routeUniforms, vertexShader: ROUTE_VERT, fragmentShader: ROUTE_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    route.frustumCulled = false; route.visible = false;
    scene.add(route);
    // the beam (city-flythrough 8)
    const bg = new THREE.CylinderGeometry(0.2, 0.2, 60, 12, 1, true); bg.translate(0, 30, 0);
    beam = new THREE.Mesh(bg, new THREE.ShaderMaterial({ uniforms: beamUniforms, vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
    beam.frustumCulled = false; beam.visible = false;
    scene.add(beam);
    // the tunnel (12.5), parented to the camera along its forward axis
    const tg = new THREE.WireframeGeometry(new THREE.CylinderGeometry(3, 3, 60, 24, 20, true));
    const tc = new Float32Array(tg.attributes.position.count * 3);
    for (let i = 0; i < tg.attributes.position.count; i++) {
      const y = tg.attributes.position.getY(i); const band = Math.floor((y + 30) / 3) % 2;
      const c = band ? tok.cyan : tok.violet; tc[i * 3] = c.r; tc[i * 3 + 1] = c.g; tc[i * 3 + 2] = c.b;
    }
    tg.setAttribute('color', new THREE.BufferAttribute(tc, 3));
    tunnel = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    tunnel.rotation.x = Math.PI / 2; tunnel.position.z = -25; tunnel.visible = false; tunnel.frustumCulled = false;
    camera.add(tunnel);
    // post: render, bloom (half resolution), fringing, output
    composer = new P.EffectComposer(renderer);
    composer.addPass(new P.RenderPass(scene, camera));
    bloom = new P.UnrealBloomPass(new THREE.Vector2(Math.max(1, W / 2), Math.max(1, H / 2)), settings.bloom[0], settings.bloom[1], settings.bloom[2]);
    composer.addPass(bloom);
    chroma = new P.ShaderPass(CHROMA);
    composer.addPass(chroma);
    composer.addPass(new P.OutputPass());
    C.bloom = bloom; C.chroma = chroma;
    applyView('standby', 0);
    orbitPose(pose.pos, pose.look);
  }
  function buildBars() {
    if (bars) { scene.remove(bars); scene.remove(barsMirror); }
    barCount = settings.bars;
    const g = new THREE.BoxGeometry(0.12, 1, 0.12); g.translate(0, 0.5, 0);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    bars = new THREE.InstancedMesh(g, mat, barCount);
    barsMirror = new THREE.InstancedMesh(g, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }), barCount);
    barColors = [];
    for (let i = 0; i < barCount; i++) {
      const k = i / (barCount - 1);
      const c = k < 0.5 ? tok.cyan.clone().lerp(tok.violet, k * 2) : tok.violet.clone().lerp(tok.magenta, (k - 0.5) * 2);
      c.multiplyScalar(1.4); barColors.push(c);
      bars.setColorAt(i, c); barsMirror.setColorAt(i, c);
    }
    bars.frustumCulled = false; barsMirror.frustumCulled = false;
    scene.add(bars); scene.add(barsMirror);
  }
  // the route ribbon from the queue (city-flythrough 6)
  function buildRoute(list, current) {
    routeState.list = list.slice(); routeState.stops = []; routeState.points = []; routeState.len = 0;
    const from = towerOf(current);
    if (!from || !list.length) { route.visible = false; return; }
    let at = from.street;
    const pts = [new THREE.Vector3(wx(at.cx), 0, wz(at.cz))], colsAt = [0];
    list.forEach(function (slug, i) {
      const t = towerOf(slug); if (!t) return;
      const cells = routeCells(at, t.street);
      const seg = corners(cells);
      for (let k = 1; k < seg.length; k++) { pts.push(seg[k]); colsAt.push(i + 1); }
      routeState.stops.push({ slug: slug, n: i + 1, x: wx(t.street.cx), z: wz(t.street.cz), tower: t, blocks: blocksBetween(at, t.street), words: legWords(at, t.street) });
      at = t.street;
    });
    routeState.points = pts; routeState.len = polyLen(pts);
    // a flat ribbon 0.3 wide, a quad per segment, colour from magenta at the head to violet by the last stop, aT the distance along it
    const pos = [], col = [], aT = [], idx = [];
    let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], d = b.distanceTo(a);
      const dir = new THREE.Vector3().subVectors(b, a).normalize(), n = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(0.15);
      const base = pos.length / 3;
      [a.clone().add(n), a.clone().sub(n), b.clone().add(n), b.clone().sub(n)].forEach(function (p, j) {
        pos.push(p.x, 0.03, p.z);
        const k = Math.min(1, (colsAt[j < 2 ? i - 1 : i]) / Math.max(1, list.length));
        const c = tok.magenta.clone().lerp(tok.violet, k).multiplyScalar(1.3);
        col.push(c.r, c.g, c.b); aT.push(acc + (j < 2 ? 0 : d));
      });
      idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      acc += d;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    g.setAttribute('aCol', new THREE.BufferAttribute(new Float32Array(col), 3));
    g.setAttribute('aT', new THREE.BufferAttribute(new Float32Array(aT), 1));
    g.setIndex(idx);
    route.geometry.dispose(); route.geometry = g; route.visible = pts.length > 1;
  }

  /* ---- the camera (12.3, 12.5, city-flythrough 4 and 21) ---- */
  function orbitPose(pos, look) {
    const r = cam.r * cam.zoom, h = clamp(cam.h * cam.zoom + cam.tilt, 0.6, 24);
    pos.set(cam.target.x + Math.cos(cam.angle) * r, cam.target.y + h, cam.target.z + Math.sin(cam.angle) * r);
    look.copy(cam.target);
  }
  // free flight in the air (issue #110, city-flythrough 21): the camera goes where it is pointed. a position, a yaw and a pitch; a held
  // key sets the velocity the camera eases toward, a tap or a wheel notch owes a short distance, a drag aims. nothing else moves it
  const FREE = { pos: new THREE.Vector3(1, 5, -10), yaw: 0, pitch: -0.15, vel: new THREE.Vector3(), want: { f: 0, s: 0, u: 0, turn: 0 }, touch: { f: 0, s: 0 }, held: 0, turnV: 0, owe: new THREE.Vector3(), oweYaw: 0, bank: 0 };
  const FLY_SPEED = 3.5, DASH_SPEED = 9, PITCH_MAX = 1.35;
  const viewDir = new THREE.Vector3(), flatR = new THREE.Vector3(), tmpW = new THREE.Vector3(), tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3(), tmpC = new THREE.Vector3(), tmpT = new THREE.Vector3();
  function dirOf(yaw, pitch, out) { const c = Math.cos(pitch); return out.set(Math.sin(yaw) * c, Math.sin(pitch), Math.cos(yaw) * c); }
  // the screen's right for a yaw (three.js looks down -z with y up, so fwd x up)
  function rightOf(yaw, out) { return out.set(-Math.cos(yaw), 0, Math.sin(yaw)); }
  function smooth(a, b, v) { const k = clamp((v - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); }
  function freePose(pos, look) { pos.copy(FREE.pos); look.copy(FREE.pos).addScaledVector(dirOf(FREE.yaw, FREE.pitch, viewDir), 10); }
  function airMode() { return NAV.mode === 'free' || NAV.mode === 'glide' || NAV.mode === 'auto'; }
  function wantedPose(pos, look) { if (airMode()) freePose(pos, look); else orbitPose(pos, look); }
  // the scene's clock: real time, or the harness's stepped clock (a GIF frame per tick, whatever the capture costs)
  let manual = false, vnow = null;
  function tnow() { return vnow != null ? vnow : performance.now(); }
  function fly(ms, bump) {
    if (reduced) { ms = 0; }
    if (ms <= 0) { flight = null; return; }
    flight = { from: { pos: pose.pos.clone(), look: pose.look.clone() }, t0: tnow(), ms: ms, bump: bump || 0 };
    C.flying = true;
  }
  function targetFor(slug) {
    const t = towerOf(slug);
    if (!t) return new THREE.Vector3(0, 2, 0);
    return new THREE.Vector3(t.x, Math.max(1.5, t.blocks * 0.25), t.z);
  }
  // orbits wider than 12.3 wrote (9 / 4.5 and 5.5 / 2.2): at those radii the neighbouring towers' blocks filled the frame;
  // 13 / 6.5 and 7.5 / 3 keep the playing tower large and the city readable around it (departure, noted in 12.13). the air has no
  // orbit since issue #110: it is free flight, and a glide lands on a vantage over the tower (vantage below)
  const VIEWS = { standby: { r: 26, h: 19, speed: 0.02 }, home: { r: 13, h: 6.5, speed: 0.045 }, air: { r: 7.5, h: 3, speed: 0 }, page: { r: 7.5, h: 3, speed: 0.045 }, guestbook: { r: 15, h: 8, speed: 0.03 }, dead: { r: 12, h: 5, speed: 0.04 } };
  function homeView() { return C.layout === 'air' ? 'air' : 'home'; }
  function applyView(view, ms) {
    if (view === 'home') view = homeView();
    const v = VIEWS[view] || VIEWS.home;
    const wasAir = C.view === 'air' && airMode();
    // leaving the air keeps where the listener left the camera: coming back (f, the page closed) glides back there
    if (wasAir && view !== 'air') { NAV.airPose = { pos: FREE.pos.clone(), yaw: FREE.yaw, pitch: FREE.pitch }; AUTO.on = false; }
    C.view = view;
    cam.r = v.r; cam.h = v.h; cam.speed = reduced ? 0 : v.speed;
    // on air the tower is panned to about 87 % of the width on desktop: the halo lands beside the cards, the cards' panels carry the rest
    cam.side = C.phone ? 0 : (view === 'home' || view === 'page' || view === 'guestbook') ? v.r * 0.7 : 0;
    cam.target.copy(view === 'standby' || view === 'dead' ? new THREE.Vector3(0, 2, 0) : targetFor(C.playing));
    dead.visible = view === 'dead';
    filler.visible = view !== 'dead';
    cat.visible = view !== 'dead';
    if (view === 'air') {
      if (wasAir) return; // already flying: nothing moves
      const ap = NAV.airPose, t = towerOf(C.playing);
      let dest = null;
      if (ap) dest = { pos: ap.pos, look: ap.pos.clone().addScaledVector(dirOf(ap.yaw, ap.pitch, tmpW), 10) };
      else if (t) dest = vantage(t, pose.pos);
      else dest = { pos: new THREE.Vector3(1, 6, -12), look: new THREE.Vector3(1, 2, 8) };
      NAV.focus = ap ? null : C.playing;
      glide(dest.pos, dest.look, { ms: ms, bump: 0.5 });
      return;
    }
    NAV.focus = C.playing;
    if (NAV.mode !== 'orbit') { NAV.mode = 'orbit'; AUTO.on = false; NAV.glideSlug = null; NAV.onLand = null; }
    fly(ms, view === 'page' ? 0 : 1.5);
  }
  function inAir() { return C.layout === 'air' && C.view === 'air'; }
  // the orbit's current angle, so leaving or entering it never jumps
  function angleFrom(px, pz) { cam.angle = Math.atan2(pz - cam.target.z, px - cam.target.x); }
  function wrapAngle(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }
  function bounds() {
    const b = city.bounds || { cx0: -2, cx1: 1, cz0: 0, cz1: 4 };
    return { x0: wx(b.cx0) - 8, x1: wx(b.cx1) + 8, z0: -10, z1: wz(b.cz1) + 8, y0: 0.9, y1: 30 };
  }
  // one frame of free flight: the wanted velocity from the held keys (and the phone's two fingers), eased in over about 200 ms and out
  // over about 300; held, it builds from a slow cruise to a quick dash over a few seconds. then what a tap or a notch owes, the keyboard's
  // turn, and the soft bounds. a still camera is exactly still: every small remainder is put to zero
  function stepFree(dt) {
    const w = FREE.want;
    const f = clamp(w.f + FREE.touch.f, -1, 1), s = clamp(w.s + FREE.touch.s, -1, 1), u = clamp(w.u, -1, 1);
    const moving = !!(f || s || u);
    FREE.held = moving ? FREE.held + dt : 0;
    const top = FLY_SPEED + (DASH_SPEED - FLY_SPEED) * smooth(0.8, 3.5, FREE.held);
    dirOf(FREE.yaw, FREE.pitch, viewDir); rightOf(FREE.yaw, flatR);
    tmpW.set(0, 0, 0).addScaledVector(viewDir, f).addScaledVector(flatR, s);
    if (tmpW.lengthSq() > 1) tmpW.normalize();
    tmpW.multiplyScalar(top); tmpW.y += u * top * 0.7;
    FREE.vel.lerp(tmpW, 1 - Math.exp(-dt / (moving ? 0.2 : 0.3)));
    if (!moving && FREE.vel.lengthSq() < 1e-6) FREE.vel.set(0, 0, 0);
    FREE.pos.addScaledVector(FREE.vel, dt);
    if (FREE.owe.lengthSq() > 0) {
      const ko = 1 - Math.exp(-dt / 0.15);
      if (FREE.owe.lengthSq() < 1e-8) { FREE.pos.add(FREE.owe); FREE.owe.set(0, 0, 0); } else { FREE.pos.addScaledVector(FREE.owe, ko); FREE.owe.multiplyScalar(1 - ko); }
    }
    // z / x: held, a turn rate; tapped, a short turn owed (a positive yaw turns left)
    const tk = 1 - Math.exp(-dt / 0.15);
    FREE.turnV += (-w.turn * 1.4 - FREE.turnV) * tk;
    if (!w.turn && Math.abs(FREE.turnV) < 1e-4) FREE.turnV = 0;
    FREE.yaw = wrapAngle(FREE.yaw + FREE.turnV * dt);
    if (FREE.oweYaw) { if (Math.abs(FREE.oweYaw) < 1e-4) { FREE.yaw += FREE.oweYaw; FREE.oweYaw = 0; } else { const d = FREE.oweYaw * tk; FREE.yaw = wrapAngle(FREE.yaw + d); FREE.oweYaw -= d; } }
    // above the street, under a ceiling, inside the city's edge: a soft push back, not a wall; glass is no obstacle
    const b = bounds(), kb = 1 - Math.exp(-dt / 0.35), P = FREE.pos;
    const push = function (axis, lo, hi) {
      const v = P[axis], ex = v < lo ? v - lo : v > hi ? v - hi : 0;
      if (!ex) return;
      if (Math.abs(ex) < 1e-4) P[axis] -= ex; else P[axis] -= ex * kb;
      if (ex * FREE.vel[axis] > 0) FREE.vel[axis] *= 1 - kb;
    };
    push('x', b.x0, b.x1); push('z', b.z0, b.z1); push('y', b.y0, b.y1);
    if (P.y < 0.4) P.y = 0.4;
    // the roll the auto-fly banked with levels out
    if (FREE.bank) { FREE.bank -= FREE.bank * Math.min(1, dt / 0.5); if (Math.abs(FREE.bank) < 1e-4) FREE.bank = 0; }
  }
  // a vantage over a tower, on the side the camera comes from, facing it; on desktop the tower sits a little left of centre, beside the rail
  function vantage(t, from) {
    const top = t.blocks * 0.5;
    let dx = from.x - t.x, dz = from.z - t.z; const d = Math.hypot(dx, dz);
    if (d < 0.5) { dx = 0; dz = -1; } else { dx /= d; dz /= d; }
    const r = Math.max(7.5, top * 0.9 + 4), b = bounds();
    const pos = new THREE.Vector3(clamp(t.x + dx * r, b.x0, b.x1), clamp(top * 0.55 + 1.5, 3, 14), clamp(t.z + dz * r, b.z0, b.z1));
    const fx = t.x - pos.x, fz = t.z - pos.z, fl = Math.hypot(fx, fz) || 1, side = C.phone ? 0 : 1.6;
    const look = new THREE.Vector3(t.x - fz / fl * side, Math.max(1.2, top * 0.45), t.z + fx / fl * side);
    return { pos: pos, look: look };
  }
  function setFreeFrom(pos, look) {
    FREE.pos.copy(pos);
    const dx = look.x - pos.x, dy = look.y - pos.y, dz = look.z - pos.z;
    FREE.yaw = Math.atan2(dx, dz); FREE.pitch = clamp(Math.atan2(dy, Math.hypot(dx, dz)), -PITCH_MAX, PITCH_MAX);
  }
  function stillFree() { FREE.vel.set(0, 0, 0); FREE.owe.set(0, 0, 0); FREE.oweYaw = 0; FREE.turnV = 0; FREE.held = 0; }
  // the camera exactly as it is on screen (the deck's side pan and the parallax baked in), as the free camera's pose
  const camDir = new THREE.Vector3();
  function snapCamera() {
    if (!camera) return;
    camera.getWorldDirection(camDir);
    pose.pos.copy(camera.position); pose.look.copy(camera.position).addScaledVector(camDir, 10);
    cam.sideNow = 0; parallax.x = parallax.tx = parallax.y = parallax.ty = 0;
    setFreeFrom(pose.pos, pose.look);
  }
  // a glide (issue #110): an explicit request (a click on a tower, j / k, fly <slug>, the edge marker, district) eases the camera from
  // exactly where it is to a pose, and lands in free flight
  function glide(pos, look, opts) {
    opts = opts || {};
    snapCamera();
    const d = FREE.pos.distanceTo(pos);
    setFreeFrom(pos, look); stillFree(); FREE.bank = 0;
    AUTO.on = false;
    NAV.mode = 'glide'; NAV.glideSlug = opts.slug || null; NAV.onLand = opts.land || null; C.flying = true;
    const ms = opts.ms != null ? opts.ms : clamp(d / 12, 1.2, 2.4) * 1000;
    fly(ms, opts.bump != null ? opts.bump : d > 30 ? 2.5 : 0.5);
    if (!flight) landGlide();
    return d;
  }
  function landGlide() {
    const slug = NAV.glideSlug, land = NAV.onLand;
    NAV.mode = 'free'; NAV.glideSlug = null; NAV.onLand = null; C.flying = false; flight = null;
    if (slug && C.onLand) C.onLand(slug, land);
  }
  function glideToTower(slug, land) {
    const t = towerOf(slug); if (!t) return -1;
    const v = vantage(t, camera ? camera.position : pose.pos);
    NAV.focus = slug;
    return glide(v.pos, v.look, { slug: slug, land: land });
  }

  /* the auto-fly (issue #110, the hidden mode): a slow continuous glide on a centripetal Catmull-Rom curve through waypoints that circle
     the playing tower, between low streets and the roofs; the view leans toward the tower, the camera banks gently into the curves. it
     starts exactly where the camera is, heading where it looks, and eases up to a drift; a track change sends the next waypoints toward
     the new tower, so the curve carries the camera there over several seconds */
  const AUTO = { on: false, pts: [], u: 0, speed: 0, vel: new THREE.Vector3(), acc: new THREE.Vector3(), look1: new THREE.Vector3(), look2: new THREE.Vector3(), ang: 0, sign: 1, high: false, bank: 0,
    T: new THREE.Vector3(), a: 0, r: 10, h: 5, rng: rng(110) };
  function crPoint(p, u, out) {
    const p0 = p[0], p1 = p[1], p2 = p[2], p3 = p[3];
    const t1 = Math.max(1e-4, Math.sqrt(p0.distanceTo(p1))), t2 = t1 + Math.max(1e-4, Math.sqrt(p1.distanceTo(p2))), t3 = t2 + Math.max(1e-4, Math.sqrt(p2.distanceTo(p3)));
    const t = t1 + u * (t2 - t1);
    const ax = function (k) {
      const a1 = ((t1 - t) * p0[k] + t * p1[k]) / t1, a2 = ((t2 - t) * p1[k] + (t - t1) * p2[k]) / (t2 - t1), a3 = ((t3 - t) * p2[k] + (t - t2) * p3[k]) / (t3 - t2);
      const b1 = ((t2 - t) * a1 + t * a2) / t2, b2 = ((t3 - t) * a2 + (t - t1) * a3) / (t3 - t1);
      return ((t2 - t) * b1 + (t - t1) * b2) / (t2 - t1);
    };
    return out.set(ax('x'), ax('y'), ax('z'));
  }
  // how many units the curve covers per unit of its parameter, at u (a short chord either side)
  const crA = new THREE.Vector3(), crB = new THREE.Vector3();
  function crRate(p, u) { const a = Math.max(0, u - 0.002), b = Math.min(1, u + 0.002); return Math.max(1e-3, crPoint(p, b, crB).distanceTo(crPoint(p, a, crA)) / (b - a)); }
  function focusTower() { return towerOf(C.playing); }
  // the next waypoint; one that lands within 3 units of the last (the city's edge clamps both to a corner) is tried again further round
  function nextWaypoint(prev, tries) {
    const w = nextPoint(prev);
    if ((tries || 0) < 4 && Math.hypot(w.x - prev.x, w.z - prev.z) < 3) { AUTO.ang += AUTO.sign * 0.9; return nextWaypoint(prev, (tries || 0) + 1); }
    return w;
  }
  function nextPoint(prev) {
    const t = focusTower(), R = AUTO.rng, b = bounds();
    let x, y, z;
    if (!t) {
      AUTO.ang += AUTO.sign * (0.7 + R() * 0.4);
      const r = 10 + R() * 8;
      x = (b.x0 + b.x1) / 2 + Math.cos(AUTO.ang) * r; z = (b.z0 + b.z1) / 2 + Math.sin(AUTO.ang) * r; y = 3 + R() * 5;
    } else {
      const top = t.blocks * 0.5, d = Math.hypot(prev.x - t.x, prev.z - t.z);
      if (d > 20) {
        // far from the playing tower: the next point is a leg toward it, over the roofs
        const nx = (t.x - prev.x) / d, nz = (t.z - prev.z) / d, step = Math.min(12, d - 12), side = (R() - 0.5) * 4;
        x = prev.x + nx * step - nz * side; z = prev.z + nz * step + nx * side;
        y = clamp(top + 1.5 + R() * 3, 4, 14);
        AUTO.ang = Math.atan2(z - t.z, x - t.x);
      } else {
        AUTO.ang += AUTO.sign * (0.75 + R() * 0.45);
        const r = Math.max(6.5, top * 0.6 + 4) + R() * 5;
        if (R() < 0.5) AUTO.high = !AUTO.high;
        y = AUTO.high ? clamp(top + 1.2 + R() * 2.5, 3.5, 16) : 1.6 + R() * 1.2;
        x = t.x + Math.cos(AUTO.ang) * r; z = t.z + Math.sin(AUTO.ang) * r;
      }
    }
    // the altitude drifts: never more than 3.5 units up or down between two waypoints
    y = clamp(y, prev.y - 3.5, prev.y + 3.5);
    return new THREE.Vector3(clamp(x, b.x0 + 2, b.x1 - 2), clamp(y, 1.4, 20), clamp(z, b.z0 + 2, b.z1 - 2));
  }
  function autoStart() {
    if (!inAir() || !camera) return;
    snapCamera();
    const p = FREE.pos.clone(), d = dirOf(FREE.yaw, clamp(FREE.pitch, -0.3, 0.3), new THREE.Vector3());
    const ahead = p.clone().addScaledVector(d, 5); ahead.y = Math.max(1.4, ahead.y);
    AUTO.pts = [p.clone().addScaledVector(d, -4), p.clone(), ahead];
    const t = focusTower();
    AUTO.ang = t ? Math.atan2(p.z - t.z, p.x - t.x) : 0; AUTO.sign = AUTO.rng() < 0.5 ? 1 : -1; AUTO.high = p.y > 4;
    while (AUTO.pts.length < 5) AUTO.pts.push(nextWaypoint(AUTO.pts[AUTO.pts.length - 1]));
    AUTO.u = 0; AUTO.vel.copy(FREE.vel); AUTO.speed = Math.min(1.3, FREE.vel.length()); AUTO.acc.set(0, 0, 0);
    AUTO.look1.copy(pose.look); AUTO.look2.copy(pose.look); AUTO.bank = FREE.bank;
    // prefers-reduced-motion: a very slow orbit of the playing tower, from where the camera is
    const T = t ? tmpT.set(t.x, Math.max(1.2, t.blocks * 0.45), t.z) : tmpT.set(p.x + d.x * 10, 2, p.z + d.z * 10);
    AUTO.T.copy(T); AUTO.a = Math.atan2(p.z - T.z, p.x - T.x); AUTO.r = Math.hypot(p.x - T.x, p.z - T.z); AUTO.h = p.y;
    stillFree(); flight = null; C.flying = false; NAV.glideSlug = null; NAV.onLand = null;
    AUTO.on = true; NAV.mode = 'auto'; NAV.autoNow = false;
    if (!NAV.autoSaid) { NAV.autoSaid = true; say('cruise. nobody is flying this.', 'mid'); }
  }
  function stepAuto(dt) {
    const t = focusTower();
    const T = t ? tmpT.set(t.x, Math.max(1.2, t.blocks * 0.45), t.z) : tmpT.copy(AUTO.T);
    const kl = 1 - Math.exp(-dt / (reduced ? 3 : 1.4));
    if (reduced) {
      // the tower the orbit circles moves at most a unit a second, eased
      tmpC.subVectors(T, AUTO.T); const L = tmpC.length();
      if (L > 1e-4) AUTO.T.addScaledVector(tmpC, Math.min(L * (1 - Math.exp(-dt / 4)), dt) / L);
      AUTO.a += 0.02 * dt;
      AUTO.r += (clamp(AUTO.r, 8, 16) - AUTO.r) * (1 - Math.exp(-dt / 6)); AUTO.h += (clamp(AUTO.h, 3, 10) - AUTO.h) * (1 - Math.exp(-dt / 6));
      tmpB.set(AUTO.T.x + Math.cos(AUTO.a) * AUTO.r, AUTO.h, AUTO.T.z + Math.sin(AUTO.a) * AUTO.r);
      AUTO.vel.subVectors(tmpB, FREE.pos).divideScalar(Math.max(dt, 1e-3));
      FREE.pos.copy(tmpB);
      AUTO.look1.lerp(AUTO.T, kl); AUTO.look2.lerp(AUTO.look1, kl);
      setFreeFrom(FREE.pos, AUTO.look2);
      return;
    }
    const p = AUTO.pts, dist = Math.hypot(FREE.pos.x - T.x, FREE.pos.z - T.z);
    AUTO.speed += ((t && dist > 22 ? 2.4 : 1.3) - AUTO.speed) * (1 - Math.exp(-dt / 2.5));
    // along the curve by distance, not by its parameter: what is left at the end of a segment is carried into the next one as
    // distance, so a short segment never throws the camera along a long one
    let left = AUTO.speed * dt;
    for (let k = 0; k < 8 && left > 1e-7; k++) {
      const rate = crRate(p, AUTO.u), du = left / rate;
      if (AUTO.u + du < 1) { AUTO.u += du; left = 0; }
      else { left -= (1 - AUTO.u) * rate; p.shift(); p.push(nextWaypoint(p[p.length - 1])); AUTO.u = 0; }
    }
    crPoint(p, AUTO.u, tmpB);
    if (AUTO.u < 0.996) crPoint(p, AUTO.u + 0.004, tmpA).sub(tmpB); else tmpA.copy(tmpB).sub(crPoint(p, AUTO.u - 0.004, tmpA));
    const tan = tmpA.normalize();
    tmpC.subVectors(tmpB, FREE.pos).divideScalar(Math.max(dt, 1e-3));
    AUTO.acc.lerp(tmpW.subVectors(tmpC, AUTO.vel).divideScalar(Math.max(dt, 1e-3)), 1 - Math.exp(-dt / 0.6));
    AUTO.vel.copy(tmpC);
    FREE.pos.copy(tmpB);
    // where it looks: ahead along the curve, leaning toward the playing tower as it comes near; two easings, so a track change turns the
    // view over a few seconds without a kink
    const w = 0.25 + 0.45 * smooth(40, 12, dist);
    tmpW.copy(FREE.pos).addScaledVector(tan, 8); tmpW.y -= 1;
    tmpW.lerp(T, w);
    AUTO.look1.lerp(tmpW, kl); AUTO.look2.lerp(AUTO.look1, kl);
    setFreeFrom(FREE.pos, AUTO.look2);
    // the bank: into the curve, from the sideways acceleration, at most about 8 degrees
    const lat = AUTO.acc.dot(rightOf(FREE.yaw, flatR));
    AUTO.bank += (clamp(lat * 0.6, -0.14, 0.14) - AUTO.bank) * (1 - Math.exp(-dt / 0.8));
    FREE.bank = AUTO.bank;
  }
  // any input takes the camera at once, from exactly where it is: a glide stops, the auto-fly hands over (its drift eases out)
  function takeHand(said) {
    if (!airMode() || NAV.mode === 'free') return;
    const wasAuto = NAV.mode === 'auto', v = wasAuto ? AUTO.vel.clone() : null;
    snapCamera(); stillFree();
    if (v && v.length() < 4) FREE.vel.copy(v);
    flight = null; C.flying = false; NAV.glideSlug = null; NAV.onLand = null; AUTO.on = false;
    NAV.mode = 'free';
    if (wasAuto && said) say('landed. your hands.', 'mid');
  }
  // the hidden mode (or `cruise`) asks for the auto-fly: at once, then again after 20 s without input
  function autoTick() {
    if (!NAV.auto || !inAir() || NAV.mode !== 'free' || flight) return;
    if (NAV.autoNow || tnow() - NAV.lastInput > 20000) autoStart();
  }

  /* ---- the public face: what the theme drives ---- */
  C.start = function (el, opts) {
    opts = opts || {};
    if (renderer) return true;
    try {
      canvas = el; C.phone = !!opts.phone; say = opts.say || say;
      if (C.phone) Object.assign(settings, PHONE);
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(tok['bg-0'].getHex(), 1);
      renderer.info.autoReset = false; // the counters are read once a frame after every pass (city-flythrough 13), reset by hand
      sizeUp();
      build();
      sizeUp();
      window.addEventListener('resize', sizeUp);
      if (!reduced) {
        // no parallax in the air (issue #63): the pointer points and drags there, and a camera that chased it moved the tower under it
        window.addEventListener('pointermove', function (e) { if (airMode()) return; const k = inAir() ? 0 : 1; parallax.tx = (e.clientX / innerWidth - 0.5) * 1.6 * k; parallax.ty = -(e.clientY / innerHeight - 0.5) * 0.8 * k; }, { passive: true });
        if (C.phone) window.addEventListener('deviceorientation', function (e) { if (e.gamma == null) return; parallax.tx = Math.max(-1, Math.min(1, e.gamma / 30)) * 0.8; parallax.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.4; }, { passive: true });
      }
      C.running = true;
      requestAnimationFrame(frame);
      return true;
    } catch (e) {
      C.ok = false; C.running = false; C.error = String(e && e.message || e);
      return false;
    }
  };
  function sizeUp() {
    if (!renderer) return;
    W = Math.max(2, innerWidth); H = Math.max(2, innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    prBase = C.phone ? Math.max(1, dpr / 2) : dpr;
    pr = Math.max(1, prBase * (C.ladder >= 1 ? 0.75 : 1));
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    if (camera) { camera.aspect = W / H; camera.updateProjectionMatrix(); }
    if (composer) { composer.setPixelRatio(pr); composer.setSize(W, H); }
    if (bloom) bloom.resolution.set(Math.max(1, W / (C.ladder >= 2 ? 4 : 2)), Math.max(1, H / (C.ladder >= 2 ? 4 : 2)));
  }
  C.stop = function () { C.running = false; };
  C.resume = function () { if (renderer && !C.running) { C.running = true; clock.last = 0; requestAnimationFrame(frame); } };
  // the catalogue: the city laid out from the index (city-flythrough 2); the camera keeps its street cell across a rebuild
  C.setCatalogue = function (tracks) {
    layoutCity(tracks || []);
    if (!scene) return;
    scene.remove(cat); cat.geometry.dispose();
    const camXZ = new THREE.Vector2(pose.pos.x, pose.pos.z);
    cat = buildBlocks(towers, camXZ);
    cat.visible = C.view !== 'dead';
    scene.add(cat);
    scene.remove(filler); filler.geometry.dispose(); filler = buildFiller(settings.fillers); filler.visible = C.view !== 'dead'; scene.add(filler);
    buildBridges();
    if (C.playing) { const t = towerOf(C.playing); blockUniforms.uPlaying.value = t ? t.id : -99; cam.target.copy(targetFor(C.playing)); placeBeam(); }
    if (cursor) cursor = towerOf(cursor.slug);
    if (routeState.list.length) buildRoute(routeState.list, C.playing);
    if (C.filterSlugs) C.setFilter(C.filterWords, C.filterSlugs);
  };
  function placeBeam() {
    const t = towerOf(C.playing);
    beam.visible = !!t && C.view !== 'standby' && C.view !== 'dead';
    if (t) beam.position.set(t.x, t.blocks * 0.5, t.z);
  }
  // the playing tower: the camera orbits it; ms > 0 flies there: along the streets when the tower is near, through the tunnel beyond 60
  // units. follow false moves the beam and leaves the camera where the listener put it (issue #63: the station's own rotation never
  // yanks a camera somebody is flying)
  C.setPlaying = function (slug, ms, withTunnel, follow) {
    C.playing = slug;
    const t = towerOf(slug);
    blockUniforms.uPlaying.value = t ? t.id : -99;
    if (!scene) return;
    placeBeam();
    if (follow === false) return;
    cam.target.copy(targetFor(slug));
    // in the air the camera moves for a track only when the listener picked it (follow), by a glide; never in the auto-fly, which drifts there
    if (airMode()) {
      if (ms > 0 && t && inAir() && NAV.mode !== 'auto') {
        const d = glideToTower(slug, 'play');
        if (d > 60) { say('flying across town to ' + slug + '.', 'mid'); if (withTunnel && !reduced) C.tunnel(1800); } else say('flying to ' + slug + '.', 'mid');
      }
      return;
    }
    NAV.focus = slug;
    if (ms > 0) { fly(ms, 3); if (withTunnel && !reduced) C.tunnel(ms); }
  };
  C.tunnel = function (ms) { tunnelUntil = performance.now() + (ms || 1200); C.tunnelOn = true; };
  C.setView = function (view, ms) { if (!scene) { C.view = view; return; } applyView(view, ms == null ? settings.flight : ms); };
  C.setLayout = function (name, ms) {
    C.layout = name;
    cam.zoomT = 1; cam.tilt = 0; C.release();
    if (!scene) return;
    if (C.view === 'home' || C.view === 'air') applyView('home', ms == null ? settings.flight : ms);
  };
  // the boot (12.5, 12.10): the grid draws itself, the towers rise. warm is the 900 ms warm start.
  C.boot = function (warm) {
    bootT = { t0: performance.now(), warm: !!warm };
    gridUniforms.uDraw.value = 0; blockUniforms.uRise.value = 0;
  };
  C.scheme = function () {
    readTokens();
    if (!scene) return;
    recolour(filler); recolour(cat); recolour(dead);
    gridUniforms.uCyan.value = tok.cyan; gridUniforms.uViolet.value = tok.violet;
    skyUniforms.uMagenta.value = tok.magenta; skyUniforms.uHaze.value = tok.haze;
    horizon.material.color = tok.magenta; beamUniforms.uColor.value = tok.magenta;
    if (bridges) bridges.material.color = tok.violet;
    buildBars();
    if (routeState.list.length) buildRoute(routeState.list, C.playing);
  };
  C.deadBuild = function (n) { deadBlocks = n; };
  C.postOff = function () {
    C.bloomOn = false; C.chromaOn = false;
    if (bloom) bloom.enabled = false; if (chroma) chroma.enabled = false;
  };
  // the queue as a route (city-flythrough 6)
  C.setQueue = function (list, current) { if (!scene) { routeState.list = list.slice(); return; } buildRoute(list, current || C.playing); };
  C.route = function () { return routeState; };
  // a find lights the matching towers and dims the rest (city-flythrough 7)
  C.setFilter = function (words, slugs) {
    C.filterWords = words; C.filterSlugs = words ? slugs : null;
    if (!scene || !cat.geometry.attributes.aLit) return;
    const a = cat.geometry.attributes.aLit, set = {};
    (slugs || []).forEach(function (s) { set[s] = true; });
    let i = 0;
    cat.userData.list.forEach(function (t) { const v = set[t.slug] ? 1 : 0.25; for (let k = 0; k < t.blocks; k++) a.array[i++] = v; if (t.voice) a.array[i++] = v; });
    a.needsUpdate = true;
    filterOn = words ? 1 : 0;
  };
  C.litCount = function () { return C.filterSlugs ? C.filterSlugs.length : null; };
  // the cursor tower (city-flythrough 5): from the pointer or from the station's highlight
  C.setCursor = function (slug) { cursor = slug ? towerOf(slug) : null; };
  C.cursor = function () { return cursor; };
  C.towers = function () { return towers; };
  C.city = function () { return city; };
  C.nav = function () { return NAV; };
  // steering (city-flythrough 21): the station's keys, the wheel and the pointer come through these; every one takes the camera at once
  C.input = function () { NAV.lastInput = tnow(); NAV.autoNow = false; takeHand(true); };
  // the listener is flying when they steered or aimed the pointer at the city lately
  C.recentInput = function (ms) { return tnow() - Math.max(NAV.lastInput, NAV.lastAim || -1e9) < ms; };
  /* free flight (issue #110): w s / up down along the view, a d / left right strafe, e rises and shift sinks, z x turn; a key held eases
     in and builds speed, a tap moves a little; the wheel moves along the view; a drag aims. the aim stays where the listener leaves it */
  C.move = function (axis, dir, on) {
    if (!inAir()) return false;
    const w = FREE.want;
    if (!on) { if (w[axis] === dir) w[axis] = 0; return true; }
    C.input(); NAV.focus = null;
    if (w[axis] !== dir) {
      w[axis] = dir;
      // a tap still moves: a short distance (or a short turn) owed that way
      if (axis === 'turn') FREE.oweYaw -= dir * 0.12;
      else if (axis === 'f') FREE.owe.addScaledVector(dirOf(FREE.yaw, FREE.pitch, viewDir), dir * 0.6);
      else if (axis === 's') FREE.owe.addScaledVector(rightOf(FREE.yaw, flatR), dir * 0.6);
      else FREE.owe.y += dir * 0.6;
    }
    return true;
  };
  C.release = function () { FREE.want.f = FREE.want.s = FREE.want.u = FREE.want.turn = 0; FREE.touch.f = FREE.touch.s = 0; };
  // the phone's two fingers: forward and sideways, each -1..1, held while the fingers are down
  C.touchMove = function (f, s) { if (!inAir()) return false; if (f || s) C.input(); FREE.touch.f = clamp(f, -1, 1); FREE.touch.s = clamp(s, -1, 1); return true; };
  C.wheel = function (deltaY) {
    if (!inAir()) return false;
    C.input(); NAV.focus = null;
    FREE.owe.addScaledVector(dirOf(FREE.yaw, FREE.pitch, viewDir), -clamp(deltaY / 100, -3, 3) * 1.6);
    return 'move';
  };
  // a drag aims: x is the yaw, y the pitch (clamped short of straight up and down); nothing springs back
  C.look = function (dx, dy) {
    if (!inAir()) return false;
    C.input();
    // the aim is the drag's alone: a turn still owed from a tapped z or x, or easing out of a held one, ends here
    FREE.oweYaw = 0; FREE.turnV = 0;
    FREE.yaw = wrapAngle(FREE.yaw - dx * 0.0045); FREE.pitch = clamp(FREE.pitch - dy * 0.0045, -PITCH_MAX, PITCH_MAX);
    return true;
  };
  // j / k in the air: the camera glides to the tower and faces it, without playing it
  C.visit = function (slug) { if (!inAir() || !towerOf(slug)) return false; C.input(); glideToTower(slug, 'look'); return true; };
  C.focus = function () { return NAV.focus; };
  C.hold = function () { NAV.lastAim = tnow(); };
  // the hovered tower lifts and brightens (issue #63); the bracket and the readout are the theme's
  C.setHover = function (slug) { const t = slug ? towerOf(slug) : null, id = t ? t.id : -99; if (blockUniforms.uHover.value !== id) { blockUniforms.uHover.value = id; liftK = 0; } liftT = t ? 1 : 0; };
  // fly <slug>: glide to the tower without playing it; beyond 60 units through the tunnel
  C.flyTo = function (slug) {
    if (!inAir()) return 'deck';
    if (!towerOf(slug)) return 'unknown';
    C.input();
    const d = glideToTower(slug, 'look');
    if (d > 60 && !reduced) { C.tunnel(1800); return 'tunnel'; }
    return 'near';
  };
  C.flyToCell = function (cx, cz) {
    if (!inAir()) return false;
    C.input();
    const x = wx(cx), z = wz(cz);
    glide(new THREE.Vector3(x, 6, z - 6), new THREE.Vector3(x, 2, z + 10), {});
    return true;
  };
  // the edge marker: back to the playing tower, still in the air
  C.back = function () { if (!inAir()) return false; C.input(); glideToTower(C.playing, 'look'); return true; };
  // the auto-fly (city-flythrough 21): the hidden mode asks for it, and `cruise`; off, it stops where it is
  C.cruise = function (on) { NAV.auto = !!on; NAV.autoNow = !!on; if (!on) takeHand(false); };
  C.cruising = function () { return NAV.mode === 'auto'; };
  C.speed = function () { return airMode() ? (NAV.mode === 'auto' ? AUTO.vel.length() : FREE.vel.length()) : 0; };
  // the stepped clock (the harness's GIFs) and the per-frame trace (its smoothness rows)
  C.manual = function (on) { manual = !!on; vnow = on ? performance.now() : null; clock.last = 0; };
  C.tick = function (ms) { if (!manual) return; vnow += ms; ticking = true; try { frame(vnow); } finally { ticking = false; } };
  C.trace = function (on) { const out = C.traceLog || null; C.traceLog = on ? [] : null; return out; };
  C.where = function () {
    const x = camera ? camera.position.x : 0, z = camera ? camera.position.z : 0, c = cellOf(x, z);
    let day = null; city.days.forEach(function (d) { if (c.cz >= d.cz0 - 1 && c.cz <= d.cz1) day = d.day; });
    let district = null; city.districts.forEach(function (s) { if (c.cx >= s.cx0 - 1 && c.cx <= s.cx1 + 1) district = s.name; });
    if (camera) camera.getWorldDirection(camDir); else camDir.set(0, 0, 1);
    const q = Math.round(Math.atan2(camDir.x, camDir.z) / (Math.PI / 2)) & 3, heading = ['north', 'east', 'south', 'west'][q];
    const off = c.cx === 0 ? 'on the avenue' : Math.abs(c.cx) + (Math.abs(c.cx) === 1 ? ' block ' : ' blocks ') + (c.cx > 0 ? 'east' : 'west') + ' of the avenue';
    return { day: day, district: district, heading: heading, mode: NAV.mode, cell: c, text: (day || 'the edge') + (district ? ' and ' + district : ''), off: off };
  };
  // the screen position of a world point, for the readout, the brackets, the pins and the signs
  const tmpProj = new THREE.Vector3();
  C.project = function (x, y, z) {
    tmpProj.set(x, y, z).project(camera);
    return { x: (tmpProj.x + 1) / 2 * W, y: (1 - tmpProj.y) / 2 * H, behind: tmpProj.z > 1 || tmpProj.z < -1, d: Math.hypot(x - camera.position.x, z - camera.position.z) };
  };
  C.cameraXZ = function () { return { x: camera ? camera.position.x : 0, z: camera ? camera.position.z : 0 }; };
  // where the camera is and what it looks at, for the harness's "every input moves the picture" rows
  C.cameraPose = function () { const r = function (v) { return +v.toFixed(3); }; return camera ? { x: r(camera.position.x), y: r(camera.position.y), z: r(camera.position.z), lx: r(pose.look.x), ly: r(pose.look.y), lz: r(pose.look.z), zoom: r(cam.zoom), yaw: +FREE.yaw.toFixed(6), pitch: +FREE.pitch.toFixed(6), bank: r(FREE.bank) } : null; };
  // picking (city-flythrough 5, sharpened by issue #63): the pointer against each tower's own screen shape (its axis from foot to top,
  // its projected half width), within a margin and 60 units; where shapes overlap, the one whose axis the pointer is closest to (relative
  // to its width) wins, so a near tower's wide glass never swallows the tower the pointer is on
  C.pick = function (px, py, radius, all) {
    let best = null, bs = Infinity;
    const seen = all ? [] : null;
    const scale = H / (2 * Math.tan((camera ? camera.fov : 55) * Math.PI / 360));
    for (let i = 0; i < towers.length; i++) {
      const t = towers[i];
      if (C.filterSlugs && C.filterSlugs.indexOf(t.slug) < 0) continue;
      const a = C.project(t.x, 0, t.z), b = C.project(t.x, t.blocks * 0.5 + (blockUniforms.uHover.value === t.id ? 0.7 * liftK : 0), t.z);
      if (a.behind || b.behind || a.d > 60) continue;
      const vx = b.x - a.x, vy = b.y - a.y, len2 = vx * vx + vy * vy || 1;
      const k = clamp(((px - a.x) * vx + (py - a.y) * vy) / len2, 0, 1);
      const dist = Math.hypot(px - (a.x + vx * k), py - (a.y + vy * k));
      const half = 0.47 * (t.foot || 1) * scale / Math.max(1, a.d);
      const out = dist - half;
      if (seen) seen.push({ slug: t.slug, foot: [Math.round(a.x), Math.round(a.y)], top: [Math.round(b.x), Math.round(b.y)], dist: Math.round(dist), half: Math.round(half), d: +a.d.toFixed(1) });
      if (out > radius) continue;
      const score = out <= 0 ? dist / Math.max(1, half) + a.d * 0.001 : 100 + out;
      if (score < bs) { bs = score; best = t; }
    }
    return seen || best;
  };
  C.perf = function () { return { p50: +perf.p50.toFixed(1), p95: +perf.p95.toFixed(1), calls: perf.calls || 0, triangles: perf.tris || 0, instances: cat ? cat.count + filler.count : 0, pixelRatio: +pr.toFixed(2), ladder: C.ladder }; };

  /* ---- the frame ---- */
  const tmpV = new THREE.Vector3(), tmpR = new THREE.Vector3(), tmpU = new THREE.Vector3(0, 1, 0), tmpM = new THREE.Matrix4(), tmpS = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpP = new THREE.Vector3();
  function ease(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function frame(now) {
    if (!C.running) return;
    if (!ticking) { requestAnimationFrame(frame); if (manual) return; }
    if (document.hidden && !ticking) { clock.last = 0; return; }
    const dt = clock.last ? Math.min(0.1, (now - clock.last) / 1000) : 0.016;
    clock.last = now; clock.t += dt;
    const t0 = performance.now();
    const A = NOBODY.vis && NOBODY.vis.analyser;
    if (renderer.info) renderer.info.reset();

    // the boot tweens
    if (bootT) {
      const s = (now - bootT.t0) / 1000;
      if (bootT.warm) { gridUniforms.uDraw.value = Math.min(1, s / 0.9); blockUniforms.uRise.value = Math.min(1, s / 0.9); }
      else { gridUniforms.uDraw.value = Math.max(0, Math.min(1, (s - 0.4) / 1.4)); blockUniforms.uRise.value = Math.max(0, Math.min(1, (s - 1.0) / 1.6)); }
      if (s > 3) bootT = null;
    } else if (gridUniforms.uDraw.value < 1) { gridUniforms.uDraw.value = 1; blockUniforms.uRise.value = 1; }

    // the numbers: levels, loudness, bass (from the analyser or the ghost, 12.4)
    let lv = null, loud = 0, wave = 0;
    if (A && A.v64) { lv = A.v64; loud = A.loud || 0; bass = A.bass || 0; wave = A.waveHead || 0; }
    pulse += ((loud || 0) - pulse) * 0.25;
    blockUniforms.uPulse.value = pulse;
    blockUniforms.uTime.value = clock.t;
    skyUniforms.uBass.value = bass;
    horizon.material.opacity = 0.02 + 0.08 * bass;
    filterK += (filterOn - filterK) * Math.min(1, dt / 0.3);
    blockUniforms.uFilter.value = filterK;
    routeUniforms.uTime.value = clock.t;
    beamUniforms.uPulse.value = reduced ? 0 : pulse;
    beam.scale.set(1 + 0.5 * pulse, 1, 1 + 0.5 * pulse);

    // the camera: the orbit turns on its own (never in the air), the free camera flies, the auto-fly glides on its curve
    if (NAV.mode === 'orbit') cam.angle += cam.speed * dt;
    if (NAV.mode === 'free') stepFree(dt); else if (NAV.mode === 'auto') stepAuto(dt);
    autoTick();
    const kq = Math.min(1, dt / 0.12);
    cam.zoom += (cam.zoomT - cam.zoom) * kq;
    liftK += (liftT - liftK) * Math.min(1, dt / 0.12);
    blockUniforms.uLift.value = reduced ? liftT : liftK;
    wantedPose(tmpV, tmpP);
    if (flight) {
      const k = Math.min(1, (now - flight.t0) / flight.ms), e = ease(k);
      pose.pos.lerpVectors(flight.from.pos, tmpV, e); pose.pos.y += Math.sin(Math.PI * k) * flight.bump;
      pose.look.lerpVectors(flight.from.look, tmpP, e);
      if (k >= 1) { flight = null; if (NAV.mode === 'glide') landGlide(); else C.flying = false; }
    } else { pose.pos.copy(tmpV); pose.look.copy(tmpP); }
    camera.position.copy(pose.pos);
    camera.lookAt(pose.look);
    if (airMode()) {
      // in the air the camera is exactly the free pose: no side pan, no parallax; the auto-fly's bank rolls it round its view
      if (FREE.bank) camera.rotateZ(-FREE.bank);
    } else {
      parallax.x += (parallax.tx - parallax.x) * 0.08; parallax.y += (parallax.ty - parallax.y) * 0.08;
      cam.sideNow += (cam.side - cam.sideNow) * Math.min(1, dt / 0.6);
      tmpR.set(1, 0, 0).applyQuaternion(camera.quaternion);
      // the pan: camera and look-at move together along the camera's right axis, so the tower slides to the side of the frame
      camera.position.addScaledVector(tmpR, parallax.x - cam.sideNow).addScaledVector(tmpU, parallax.y);
      camera.lookAt(tmpP.copy(pose.look).addScaledVector(tmpR, -cam.sideNow));
    }
    if (C.traceLog && C.traceLog.length < 20000) { camera.getWorldDirection(camDir); C.traceLog.push({ t: +now.toFixed(1), dt: +dt.toFixed(4), mode: NAV.mode, x: camera.position.x, y: camera.position.y, z: camera.position.z, dx: camDir.x, dy: camDir.y, dz: camDir.z }); }
    sky.position.copy(camera.position);
    gridUniforms.uCam.value.set(camera.position.x, camera.position.z);

    // the tunnel (12.5)
    if (tunnelUntil > now) { tunnelFade = Math.min(1, tunnelFade + dt / 0.15); } else { tunnelFade = Math.max(0, tunnelFade - dt / 0.25); if (tunnelFade === 0) C.tunnelOn = false; }
    tunnel.visible = tunnelFade > 0;
    if (tunnel.visible) { tunnel.material.opacity = tunnelFade * 0.9; tunnel.position.z += 40 * dt; if (tunnel.position.z > -22) tunnel.position.z -= 3; }
    const wantChroma = (C.phone || reduced || C.ladder >= 3) ? 0 : (0.0022 + tunnelFade * (0.012 - 0.0022));
    chromaAmt += (wantChroma - chromaAmt) * 0.2;
    if (chroma) chroma.uniforms.uAmount.value = chromaAmt;

    // the ring of bars and the ribbon around the playing tower (12.4); hidden in standby and dead air, and when the hidden interface says no visualiser
    const onAir = C.view !== 'standby' && C.view !== 'dead' && C.playing && !(C.noViz && C.noViz());
    bars.visible = barsMirror.visible = ribbon.visible = !!onAir;
    if (onAir) {
      const tg = targetFor(C.playing), base = 0;
      for (let i = 0; i < barCount; i++) {
        const li = lv ? lv[Math.floor(i / barCount * lv.length)] : 0;
        const h = 0.1 + 3.2 * Math.pow(li, 1.2), a = i / barCount * Math.PI * 2 + clock.t * 0.05;
        tmpP.set(tg.x + Math.cos(a) * 2.4, base, tg.z + Math.sin(a) * 2.4);
        tmpS.set(1, h, 1); tmpM.compose(tmpP, tmpQ, tmpS); bars.setMatrixAt(i, tmpM);
        tmpS.set(1, -h * 0.8, 1); tmpM.compose(tmpP, tmpQ, tmpS); barsMirror.setMatrixAt(i, tmpM);
      }
      bars.instanceMatrix.needsUpdate = true; barsMirror.instanceMatrix.needsUpdate = true;
      for (let i = ribbonN - 1; i > 0; i--) ribbonWave[i] = ribbonWave[i - 1];
      ribbonWave[0] = wave;
      const pa = ribbon.geometry.attributes.position, ca = ribbon.geometry.attributes.color;
      for (let i = 0; i < ribbonN; i++) {
        const a = cam.angle - i * (Math.PI * 2 / ribbonN) * 0.9;
        pa.setXYZ(i, tg.x + Math.cos(a) * 3.4, 1.2 + ribbonWave[i] * 1.0, tg.z + Math.sin(a) * 3.4);
        const f = Math.pow(1 - i / ribbonN, 1.5) * 1.6;
        ca.setXYZ(i, tok.magenta.r * f, tok.magenta.g * f, tok.magenta.b * f);
      }
      pa.needsUpdate = true; ca.needsUpdate = true;
    }

    // dead air: the unlit tower builds block by block (12.3)
    if (C.view === 'dead') {
      if (now - deadAt > 1200) { deadAt = now; deadBlocks = deadBlocks >= 18 ? 0 : deadBlocks + 1; }
      dead.count = deadBlocks;
    }

    composer.render();
    if (renderer.info && renderer.info.render) { perf.calls = renderer.info.render.calls; perf.tris = renderer.info.render.triangles; }
    C.frames++;
    if (C.onFrame) C.onFrame(now);
    const ms = performance.now() - t0;
    C.ms += (ms - C.ms) * 0.1;
    // the running probe (city-flythrough 13, a ladder): the 95th percentile of the last 120 frames, checked every 2 s
    perf.ring[perf.n % 120] = ms; perf.n++;
    if (now - perf.checkedAt > 2000 && perf.n >= 60) {
      perf.checkedAt = now;
      const arr = Array.from(perf.ring.subarray(0, Math.min(120, perf.n))).sort(function (a, b) { return a - b; });
      perf.p50 = arr[Math.floor(arr.length * 0.5)]; perf.p95 = arr[Math.min(arr.length - 1, Math.floor(arr.length * 0.95))];
      if (!NOPROBE) {
        if (perf.p95 > 18) { perf.over++; perf.under = 0; if (perf.over >= 2) { perf.over = 0; ladderStep(1); } }
        else if (perf.p95 < 10) { perf.under++; perf.over = 0; if (perf.under >= 5) { perf.under = 0; ladderStep(-1); } }
        else { perf.over = 0; perf.under = 0; }
      }
    }
  }
  // the ladder: 1 pixel ratio x .75, 2 the bloom at a quarter, 3 the bloom and the fringing off (printed once), 4 the filler halved and the chevrons still
  function ladderStep(dir) {
    const next = clamp(C.ladder + dir, 0, 4);
    if (next === C.ladder) return;
    C.ladder = next;
    sizeUp();
    if (bloom) bloom.enabled = next < 3; if (chroma) chroma.enabled = next < 3;
    C.bloomOn = next < 3; C.chromaOn = next < 3;
    if (next === 3 && dir > 0) say('city: bloom off. this machine is slow. nobody minds.', 'mid');
    routeUniforms.uStill.value = (next >= 4 || reduced) ? 1 : 0;
    if (filler) { const all = filler.userData.list.reduce(function (n, t) { return n + t.blocks; }, 0); filler.count = next >= 4 ? Math.floor(all / 2) : all; }
  }

  C.dispose = function () {
    C.running = false;
    window.removeEventListener('resize', sizeUp);
    try { if (composer) composer.dispose(); if (renderer) renderer.dispose(); } catch (e) {}
  };
  return C;
}

NOBODY.themes.city = (function () {
  const TH = { name: 'city', blurb: 'a city of data at night. neon, glass, bloom. fly it.' };
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let scene = null, canvas = null, cssgrid = null, horizon = null, scanrect = null, odoRing = null, nocityTimer = 0;
  let scopeCanvas = null, scopeCtx = null, dialStrip = null, pendingView = null;
  let gainHold = 1;
  // the fly-through's own elements (city-flythrough 5, 6, 8): one readout, one bracket, one edge marker, a few HUD chips
  const UI = { readout: null, bracket: null, marker: null, hud: null, chips: [], pins: [], flyBtn: null, cursorSlug: null, readoutSlug: null, readoutAt: 0, readoutSettle: 0, readoutAtCursor: null, hover: null, pointerAt: 0, px: null, py: null, edgeAt: 0, edgeDir: 0, hint: 0, layout: 'deck', tap: null, fingers: new Map(), two: null };
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function say(text, cls) { if (ctx && ctx.T) ctx.T.print(text, cls); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---- strings (12.10): the connect sequence, the same eight lines at the same times as the BIOS ---- */
  TH.strings = {
    boot: function (n, voices, phone, localOnly, backend) {
      const vtxt = voices === 1 ? '1 with a voice' : voices + ' with a voice';
      const ttxt = n === 1 ? '1 tower' : n + ' towers';
      if (phone) return [
        ['NOBODY NET  88.8', ''], ['link ........ ', 'dialling ... ok'], ['handshake ... ', 'ok'], ['grid ........ ', 'drawn'],
        ['aerial ...... ', 'found'], ['catalogue ... ', ttxt + ', ' + voices + ' voice'], ['backend ..... ', localOnly ? 'not on the wire' : 'on the wire'], ['audio ....... ', 'waiting for a human', 'amber']
      ];
      return [
        ['NOBODY NET  carrier 88.8', ''], ['link ............... ', 'dialling ... 2400 baud ok'], ['handshake .......... ', 'ok'],
        ['grid ............... ', 'drawn'], ['aerial ............. ', 'found'],
        ['catalogue .......... tracks/index.json .... ', ttxt + ', ' + vtxt], ['backend ............ ', localOnly ? 'not on the wire (local mode)' : backend],
        ['audio .............. ', 'waiting for a human', 'amber']
      ];
    },
    wait: function (phone) { return phone ? '[ tap the glass to go on air ]' : '[ press any key, or tap the glass, to go on air ]'; },
    tagline: 'the transmitter nobody can find.',
    licence: 'nobody fm. every track generated locally from a text prompt. no samples, no reference audio, no third-party rights claimed. best watched from the air at night.',
    switched: 'theme: city. the glass goes flat and the city comes up. f flies.',
    idle: 'idle. paused for ten minutes. the city turns anyway.'
  };

  /* ---- the interface paradigm (12.0, the hooks; city-flythrough 14) ---- */
  // the movement keys (issue #63): the arrows and w a s d together; while the city holds s, shift+s is the shuffle
  TH.interface = function () { return { kind: 'flythrough', keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'e', 'f', 'h', 'z', 'x'], layouts: V && V.phone() ? ['deck', 'air'] : ['air', 'deck'] }; };
  // TH.swatch: the picker's little square (station 12.0, the theme picker): the ground and two lights
  TH.swatch = ['#020309', '#19F0FF', '#FF2BD6'];
  TH.help = function () {
    return [['drag', 'aim the view'], ['wheel', 'along the view'], ['w s  up down', 'fly forward, back (hold)'], ['a d  left right', 'slide sideways'], ['e  shift', 'rise, sink'], ['z x', 'turn left, right'],
      ['click a tower', 'fly there and play it'], ['j k', 'glide to the next tower'], ['f  esc', 'the list view (the deck)'], ['h', 'the hint bar']];
  };
  TH.commands = function () {
    return {
      fly: function (a) {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        if (!a) { ctx.setLayout('air'); return; }
        const t = ctx.tracks().find(function (x) { return x.slug === a; }) || ctx.tracks().find(function (x) { return x.slug.indexOf(a) >= 0; });
        if (!t) { say('nobody knows "' + a + '".', 'err'); return; }
        if (UI.layout !== 'air') ctx.setLayout('air');
        const how = scene.flyTo(t.slug);
        if (how === 'tunnel') say('flying across town to ' + t.slug + '.', 'mid'); else if (how === 'near') say('flying to ' + t.slug + '.', 'mid');
      },
      deck: function () { ctx.setLayout('deck'); },
      route: function () {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const r = scene.route();
        if (!r.stops.length) { say('no route. the queue refills itself. nobody stops.', 'mid'); return; }
        const total = r.stops.reduce(function (n, s) { return n + s.blocks; }, 0);
        const lines = ['route: ' + r.stops.length + (r.stops.length === 1 ? ' stop, ' : ' stops, ') + total + ' blocks.'];
        r.stops.forEach(function (s) { lines.push('  ' + s.n + '  ' + s.slug.padEnd(30).slice(0, 30) + ' ' + s.words); });
        ctx.T.printScroll(lines);
      },
      cruise: function () { if (!scene) { say('no city here. the list is the city.', 'mid'); return; } if (UI.layout !== 'air') ctx.setLayout('air'); scene.cruise(true); },
      land: function () { if (!scene) return; if (scene.cruising()) { scene.cruise(false); say('landed. your hands.', 'mid'); } else say('your hands already.', 'mid'); },
      district: function (a) {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const d = scene.city().districts;
        if (!a) { say('districts: ' + d.map(function (s) { return s.name + ' ' + s.count; }).join(', ') + '. district <name> flies there.', 'mid'); return; }
        const s = d.find(function (x) { return x.name === a.toLowerCase(); }) || d.find(function (x) { return x.name.indexOf(a.toLowerCase()) >= 0; });
        if (!s) { say('no district called "' + a + '".', 'err'); return; }
        if (UI.layout !== 'air') ctx.setLayout('air');
        scene.flyToCell(s.east ? s.cx0 - 1 : s.cx1 + 1, 0); say('flying to ' + s.name + '.', 'mid');
      },
      where: function () {
        if (!scene) { say('no city here. the list is the city.', 'mid'); return; }
        const w = scene.where();
        say(w.text + ', ' + w.off + ', heading ' + w.heading + (w.mode === 'auto' ? ', on the auto-fly.' : '.'));
      }
    };
  };
  /* ---- input (issue #63): the keys, the keyups, the pointer and the wheel reach the camera through these; #62 builds on them ---- */
  // free flight (issue #110): each movement key is an axis and a way. w / up forward, s / down back, a / left and d / right sideways,
  // e up (shift down, read by the theme's own listener: the station leaves modifiers alone), z / x turn. space stays the station's pause
  const MOVE = { ArrowUp: ['f', 1], w: ['f', 1], W: ['f', 1], ArrowDown: ['f', -1], s: ['f', -1], S: ['f', -1], ArrowLeft: ['s', -1], a: ['s', -1], A: ['s', -1], ArrowRight: ['s', 1], d: ['s', 1], D: ['s', 1],
    e: ['u', 1], E: ['u', 1], Shift: ['u', -1], z: ['turn', -1], Z: ['turn', -1], x: ['turn', 1], X: ['turn', 1] };
  TH.keys = function (e) {
    const k = e.key;
    // f works with or without the scene: without it the air says so and f is the way to the list (issue #63)
    if (UI.layout !== 'air') { if (k === 'f' || k === 'F') { ctx.setLayout('air'); return true; } return false; }
    if (k === 'f' || k === 'F') { ctx.setLayout('deck'); return true; }
    if (k === 'h' || k === 'H') { setHints(!UI.hintsOpen, true); return true; }
    if (!scene) return false;
    const mv = MOVE[k];
    if (mv) { if (!e.repeat) { scene.move(mv[0], mv[1], true); used(mv[0] === 'turn' ? 'look' : mv[0] === 'u' ? 'rise' : 'move'); } return true; }
    return false;
  };
  // a key's way ends on its keyup, whatever case it came up in (shift changes w to W); both ways of the axis are let go
  function onKeyUp(e) { const mv = MOVE[e.key] || MOVE[String(e.key).toLowerCase()]; if (scene && mv) { scene.move(mv[0], 1, false); scene.move(mv[0], -1, false); } }
  function releaseKeys() { if (scene) scene.release(); }
  // shift held sinks: the station never sees modifiers, so the theme listens for it itself, in the air, outside an input
  function onShiftDown(e) { if (e.key !== 'Shift' || e.repeat || !scene || UI.layout !== 'air' || /^(INPUT|TEXTAREA)$/.test((e.target || {}).tagName || '')) return; scene.move('u', -1, true); used('rise'); }
  TH.layout = function (name) {
    UI.layout = name;
    if (UI.flyBtn) { UI.flyBtn.textContent = name === 'air' ? 'list view  F' : 'fly the city  F'; UI.flyBtn.title = name === 'air' ? 'F: the list view, the cards back in their column' : 'F: fly the city; click a tower to play it'; }
    syncHints(); watchdog();
    if (!scene) return;
    scene.setLayout(name, V.phone() ? 500 : 700);
    if (name !== 'air') { hideReadout(); releaseKeys(); }
  };
  TH.highlight = function (slug) { if (!scene) return; if (slug !== UI.cursorSlug) { UI.cursorSlug = slug; scene.setCursor(slug); if (UI.hover && UI.hover.slug !== slug) UI.hover = null; } };
  // j / k in the air (12.0, the step hook; issue #63): the next tower in the city's own order (by street, south to north, west to
  // east), among the lit ones when a find is on; the camera glides to it and circles it, the rail's row follows. elsewhere, the list
  function stepOrder() {
    if (!scene) return [];
    const lit = ctx.visible(), ok = {}; lit.forEach(function (s) { ok[s] = true; });
    return scene.towers().filter(function (t) { return ok[t.slug]; }).sort(function (a, b) { return a.cz - b.cz || a.cx - b.cx; }).map(function (t) { return t.slug; });
  }
  TH.stepOrder = stepOrder;
  TH.step = function (dir) {
    if (!scene || UI.layout !== 'air' || scene.view !== 'air') return false;
    const order = stepOrder(); if (!order.length) return false;
    // from the cursor tower; with none, the first step lands on the tower nearest the camera
    const i = order.indexOf(UI.cursorSlug);
    let slug = null;
    if (i >= 0) slug = order[((i + dir) % order.length + order.length) % order.length];
    else { const c = scene.cameraXZ(); let bd = 1e9; scene.towers().forEach(function (t) { const d = Math.hypot(t.x - c.x, t.z - c.z); if (order.indexOf(t.slug) >= 0 && d < bd) { bd = d; slug = t.slug; } }); }
    // the key moved the cursor last: a resting pointer does not take it back until it moves again
    UI.hover = null; UI.cursorSlug = slug; scene.setCursor(slug); UI.keyAt = performance.now();
    ctx.setHighlight(slug);
    scene.visit(slug);
    used('step');
    return true;
  };
  TH.queue = function (list, current) { if (scene) scene.setQueue(list, current); };
  TH.filter = function (words, slugs) {
    if (!scene) return;
    scene.setFilter(words, slugs);
    if (words) say('find: ' + slugs.length + (slugs.length === 1 ? ' tower lit.' : ' towers lit.') + ' the rest went dark.', 'mid'); else say('find cleared. the city is back.', 'mid');
  };
  // the hidden interface (#52) is the auto-fly (city-flythrough 21); leaving it stops the camera where it is
  TH.hidden = function (on) {
    if (!scene) return;
    if (on) { if (UI.layout !== 'air') ctx.setLayout('air'); scene.cruise(true); }
    else { scene.cruise(false); hideReadout(); }
    document.body.classList.toggle('city-cruise', !!on);
  };

  /* ---- lifecycle ---- */
  TH.init = function (c) {
    ctx = c; V = c.V; A = c.A; glass = c.glass; power = c.power; S = c.S;
    canvas = document.createElement('canvas'); canvas.id = 'cityCanvas'; canvas.className = 'city'; canvas.setAttribute('aria-hidden', 'true');
    cssgrid = document.createElement('div'); cssgrid.className = 'cssgrid'; cssgrid.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cssgrid, document.body.firstChild);
    document.body.insertBefore(canvas, document.body.firstChild);
    horizon = document.createElement('div'); horizon.className = 'horizon'; horizon.setAttribute('aria-hidden', 'true'); el('header').appendChild(horizon);
    scanrect = document.createElement('i'); scanrect.className = 'scanrect'; scanrect.setAttribute('aria-hidden', 'true'); el('readout').appendChild(scanrect);
    odoRing = document.createElement('span'); odoRing.className = 'odo-ring'; ring(odoRing, { ticks: 0 }); el('odometer').appendChild(odoRing);
    el('scope').textContent = '';
    scopeCanvas = document.createElement('canvas'); scopeCanvas.setAttribute('aria-label', 'oscilloscope'); el('scope').appendChild(scopeCanvas);
    const lab = document.createElement('span'); lab.className = 'dim scope-label'; lab.textContent = 'scope'; el('scope').appendChild(lab);
    scopeCtx = scopeCanvas.getContext('2d');
    el('licence').textContent = TH.strings.licence;
    el('progress').innerHTML = '<span class="rail"><i class="fill"></i><b class="head"></b></span><span class="time mid"></span>';
    el('hdrBar').textContent = ''; el('hdrBar').className = 'hdr-rail'; el('hdrBar').appendChild(document.createElement('i'));
    dialStrip = makeDialStrip(el('dial'));
    UI.layout = V.phone() ? 'deck' : 'air';
    buildUi();
    sceneUp();
    // without the CDN there is no scene within two seconds; the body says so and the CSS gradient carries the page (12.11)
    nocityTimer = setTimeout(function () { if (!scene) document.body.classList.add('nocity'); watchdog(); }, 2000);
    if (window.NOBODY_NOCDN) document.body.classList.add('nocity');
    // the honest air (issue #63): a scene that has not drawn for 2 s while the page is visible, or no scene at all, says so
    UI.visibleAt = document.hidden ? 0 : performance.now(); UI.initAt = performance.now(); UI.frameAt = 0;
    UI.watch = setInterval(watchdog, 500);
    TH.resize();
  };
  TH.dispose = function () {
    clearTimeout(nocityTimer); clearInterval(UI.watch);
    if (scene) { scene.dispose(); scene = null; }
    [canvas, cssgrid, horizon, scanrect, odoRing, UI.readout, UI.bracket, UI.marker, UI.hud, UI.flyWrap, UI.hints, UI.fallback].forEach(function (n) { if (n) n.remove(); });
    canvas = cssgrid = horizon = scanrect = odoRing = null; UI.readout = UI.bracket = UI.marker = UI.hud = UI.flyBtn = UI.flyWrap = UI.hints = UI.fallback = null; UI.chips = []; UI.pins = [];
    window.removeEventListener('keyup', onKeyUp); window.removeEventListener('keydown', onShiftDown); window.removeEventListener('blur', releaseKeys); document.removeEventListener('visibilitychange', onVisibility);
    document.body.classList.remove('city-hints-open', 'city-hints-shut', 'city-down');
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null;
    el('readout').classList.remove('typing'); el('transmitter').classList.remove('tuning-state');
    document.body.classList.remove('nocity', 'city-cruise');
    glass.classList.remove('closing', 'bloom-on');
    el('towerStatic').textContent = ''; el('towerStatic').hidden = true;
    const hints = el('hints'); if (hints) delete hints.dataset.hover;
    window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onAnyKey, true); window.removeEventListener('pointermove', onWindowMove);
  };
  function sceneUp() {
    const L = ctx.libs();
    if (scene || !L || !L.THREE || !L.passes) return;
    try {
      scene = makeCityScene(L.THREE, L.passes);
      if (!scene.start(canvas, { phone: V.phone(), say: say })) { scene = null; document.body.classList.add('nocity'); return; }
      document.body.classList.remove('nocity');
      scene.onFrame = uiFrame;
      scene.onLand = onLand;
      scene.noViz = function () { return document.body.classList.contains('ui-hidden') && document.body.classList.contains('no-hideviz'); };
      scene.setCatalogue(S.tracks);
      scene.setLayout(UI.layout, 0);
      scene.setQueue(ctx.queueList().slice(0, 6), ctx.current());
      if (ctx.filter()) scene.setFilter(ctx.filter(), ctx.visible());
      if (pendingView) { applyPending(); }
    } catch (e) { scene = null; document.body.classList.add('nocity'); }
  }
  function applyPending() {
    const p = pendingView; pendingView = null;
    if (!scene) return;
    if (p.boot) scene.boot(p.warm);
    if (p.playing) scene.setPlaying(p.playing, 0);
    scene.setView(p.view, 0);
  }
  TH.libsReady = function () { sceneUp(); };
  TH.resize = function () {
    if (scopeCanvas && scopeCtx) {
      const dpr = window.devicePixelRatio || 1, sw = scopeCanvas.clientWidth || 500, sh = scopeCanvas.clientHeight || V.rowPx();
      scopeCanvas.width = Math.round(sw * dpr); scopeCanvas.height = Math.round(sh * dpr); scopeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scopeCanvas.dataset.w = sw; scopeCanvas.dataset.h = sh;
    }
    if (dialStrip && S && S.state === 'tuning') dialStrip.set(88.8, false, '');
  };

  /* ---- the switch sound (issue #103): the flight heard from the camera. a soft filtered whoosh that swells to the middle of
     the flight and passes left to right, and three data chirps falling in pitch as the camera goes by them ---- */
  TH.transitionSound = function (seconds) {
    return NOBODY.synth.sound(seconds, function (c, out, t0, dur, k) {
      const pan = c.createStereoPanner(); pan.pan.setValueAtTime(-0.6, t0); pan.pan.linearRampToValueAtTime(0.6, t0 + dur);
      pan.connect(out);
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(220, t0); bp.frequency.exponentialRampToValueAtTime(1600, t0 + 0.55); bp.frequency.exponentialRampToValueAtTime(380, t0 + dur);
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
      const ng = c.createGain(); k.env(ng.gain, [[0, 0], [0.55, 0.05], [dur, 0.006]]);
      k.noise().connect(bp); bp.connect(lp); lp.connect(ng); ng.connect(pan);
      const ch = k.osc('sine'), cg = c.createGain(), pts = [[0, 0]];
      [[0.42, 2400], [0.52, 2150], [0.62, 1900]].forEach(function (b) {
        ch.frequency.setValueAtTime(b[1], t0 + b[0]);
        pts.push([b[0], 0], [b[0] + 0.01, 0.004], [b[0] + 0.03, 0.004], [b[0] + 0.045, 0]);
      });
      k.env(cg.gain, pts); ch.connect(cg); cg.connect(pan);
    });
  };

  /* ---- transitions (12.5): what the camera does when the station changes state ---- */
  function viewOf(to) { return to === 'page' ? 'page' : to === 'guestbook' ? 'guestbook' : to === 'dead' ? 'dead' : to === 'boot' || to === 'off' ? 'standby' : 'home'; }
  TH.transition = function (from, to, info) {
    info = info || {};
    const flightMs = V.phone() ? 500 : (to === 'home' ? 700 : 900);
    if (to === 'boot') {
      glass.classList.remove('closing');
      if (scene) { scene.boot(info.warm); scene.setView('standby', 0); } else pendingView = { boot: true, warm: info.warm, view: 'standby' };
      return new Promise(function (res) { setTimeout(function () { glass.classList.remove('off'); setTimeout(res, 320); }, 100); });
    }
    if (to === 'off') {
      hideReadout();
      return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
    }
    if (to === 'air') {
      flash();
      glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300);
      if (scene) scene.setView('home', 0); else pendingView = { view: 'home' };
      if (UI.layout === 'air' && scene) say('on air over the city. drag to look, w a s d to fly, e and shift up and down, click a tower to play it. f for the list.', 'mid');
      return Promise.resolve();
    }
    if (to === 'tuning') {
      hideReadout();
      // the camera follows the music, except the station's own rotation while the listener is flying (issue #63): then only the beam
      // moves, and the edge marker shows the way
      UI.follow = !(UI.layout === 'air' && (!info.picked || document.body.classList.contains('ui-hidden')));
      if (scene) scene.setPlaying(info.slug, info.ms || 1200, true, UI.follow); else pendingView = { view: 'home', playing: info.slug };
      return Promise.resolve();
    }
    if (to === 'playing') {
      if (scene) { scene.setPlaying(info.slug, 0, false, UI.follow !== false); if (document.body.classList.contains('ui-hidden')) hintReadout(info.slug); }
      if (info.picked) rememberHints();
      return Promise.resolve();
    }
    if (to === 'page' || to === 'guestbook' || to === 'home' || to === 'dead') {
      hideReadout();
      if (scene) { if (info.slug) scene.setPlaying(info.slug, 0); scene.setView(viewOf(to), from === 'switch' ? 0 : flightMs); } else pendingView = { view: viewOf(to), playing: info.slug };
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  function flash() {
    power.classList.remove('fade'); power.classList.add('on');
    setTimeout(function () { power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); }, 140); }, 20);
  }
  function onLand(slug, how) {
    if (!slug || how !== 'play') return;
    const t = trackOf(slug), w = scene.where();
    say('landed. ' + slug + '. ' + (t && t.project ? t.project : (w.district || 'downtown')) + (t && t.date ? ', ' + t.date : '') + '.', 'mid');
  }

  /* ---- scene hooks ---- */
  TH.catalogue = function (tracks) { if (scene) scene.setCatalogue(tracks); };
  // the beam moves at once; whether the camera follows is the transition's to say
  TH.playing = function (slug) { if (scene) scene.setPlaying(slug, 0, false, false); };
  TH.scheme = function () { if (scene) scene.scheme(); };
  // the widget slot (12.0, issue #28): the city mounts nothing in the transmitter card; its signature is the scene behind it
  TH.widget = function () { return null; };
  TH.state = function () {
    const ui = { hints: UI.hints ? (UI.hints.hidden ? 'none' : UI.hintsOpen ? 'open' : 'shut') : 'none', fallback: UI.fallback && !UI.fallback.hidden ? UI.fallback.querySelector('.fb-line').textContent : null, hoverCursor: canvas ? canvas.style.cursor || '' : '' };
    if (!scene) return Object.assign({ widget: null, running: false, nocity: document.body.classList.contains('nocity'), layout: UI.layout }, ui);
    const nav = scene.nav(), w = scene.where(), r = scene.route();
    return Object.assign({ widget: null, running: scene.running, frames: scene.frames, ms: +scene.ms.toFixed(1), bloom: scene.bloomOn, chroma: scene.chromaOn, view: scene.view, playing: scene.playing, flying: scene.flying, tunnel: scene.tunnelOn, phone: scene.phone, nocity: false,
      layout: UI.layout, camera: { mode: nav.mode, street: w.text, along: w.off, heading: w.heading, speed: +scene.speed().toFixed(2), cell: w.cell, focus: scene.focus(), pose: scene.cameraPose() },
      cursor: UI.cursorSlug, hover: UI.hover ? UI.hover.slug : null, readout: UI.readout && !UI.readout.hidden ? UI.readoutSlug : null, route: r.stops.map(function (s) { return s.slug; }), routeAsked: r.list.slice(), lit: scene.litCount(), cruise: scene.cruising(), perf: scene.perf(), towers: scene.towers().length }, ui);
  };

  // esc (12.0, the interface hooks; issue #63): in the air, always the list view (the deck), in one press, and the camera goes home to
  // the playing tower with it; the edge marker is the way back to the orbit without leaving the air. elsewhere, not ours
  TH.escape = function () {
    if (UI.layout !== 'air') return false;
    ctx.setLayout('deck'); return true;
  };
  // the harness: the scene's stepped clock (GIF frames) and its per-frame camera trace (the smoothness rows)
  TH.sceneApi = function () { return { manual: function (on) { if (scene) scene.manual(on); }, tick: function (ms) { if (scene) scene.tick(ms); } }; };
  TH.trace = function (on) { return scene ? scene.trace(on) : null; };
  TH.pickAt = function (x, y) { const t = scene ? scene.pick(x, y, pickRadius()) : null; return t ? t.slug : null; };
  // the margin around a tower's own screen shape that still counts as pointing at it: a finger is wider than a pointer
  function pickRadius() { return V.phone() ? 36 : 14; }
  TH.debug = function () { const over = document.elementFromPoint(UI.px || 0, UI.py || 0); return { frames: UI.frames, lastNow: Math.round(UI.lastNow || 0), now: Math.round(performance.now()), pointerAt: Math.round(UI.pointerAt), phone: V.phone(), px: UI.px, py: UI.py, since: Math.round(performance.now() - UI.pointerAt), hover: UI.hover ? UI.hover.slug : null, cursor: UI.cursorSlug, readout: UI.readoutSlug, over: over ? (over.id || over.className || over.tagName) : null, view: scene ? scene.view : null, mode: scene ? scene.nav().mode : null, pick: scene && UI.px != null ? (scene.pick(UI.px, UI.py, pickRadius()) || {}).slug : null, shapes: scene && UI.px != null ? scene.pick(UI.px, UI.py, pickRadius(), true) : null, over2: (function () { const o = UI.px != null ? document.elementFromPoint(UI.px, UI.py) : null; return o ? (o.id || o.className) : null; })() }; };
  // what the harness reads to aim its pointer: every tower on screen within reach, with its screen position
  TH.screenTowers = function (all) {
    if (!scene) return [];
    // clear: pointing at the tower's centre picks this tower, not a nearer one standing in front of it
    return scene.towers().map(function (t) { const p = scene.project(t.x, t.blocks * 0.25, t.z), k = scene.pick(p.x, p.y, pickRadius()); return { slug: t.slug, x: Math.round(p.x), y: Math.round(p.y), d: +p.d.toFixed(1), behind: p.behind, playing: t.slug === scene.playing, clear: !!k && k.slug === t.slug }; })
      .filter(function (p) { return all || (!p.behind && p.d <= 40 && p.x > 0 && p.x < innerWidth && p.y > 0 && p.y < innerHeight && document.elementFromPoint(p.x, p.y) === canvas); });
  };

  /* ---- the fly-through's own elements: the readout, the bracket, the marker, the HUD chips, the fly bracket (city-flythrough 3, 5, 8) ---- */
  function buildUi() {
    const ro = document.createElement('div'); ro.id = 'cityReadout'; ro.className = 'card city-readout'; ro.hidden = true;
    ro.innerHTML = '<div class="ro-slug"></div><div class="ro-meta mid"></div><div class="ro-prompt"><span class="mid mark">&gt; </span><span class="ro-line"></span></div><div class="ro-buttons"></div>';
    const bb = ro.querySelector('.ro-buttons');
    const mk = function (label, fn) { const b = document.createElement('button'); b.className = 'bk'; b.textContent = label; b.addEventListener('click', function (e) { e.stopPropagation(); e.preventDefault(); fn(); }); bb.appendChild(b); bb.appendChild(document.createTextNode('  ')); };
    // the verbs say what they do (issue #63): play it, queue it, remix it; flying there is how play looks in the city
    mk('> play', function () { if (UI.readoutSlug) ctx.play(UI.readoutSlug); });
    mk('+ queue', function () { if (UI.readoutSlug) ctx.queue(UI.readoutSlug); });
    mk('remix', function () { if (UI.readoutSlug) ctx.remix(UI.readoutSlug); });
    document.body.appendChild(ro); UI.readout = ro;
    const br = document.createElement('i'); br.id = 'cityBracket'; br.className = 'city-bracket'; br.setAttribute('aria-hidden', 'true'); br.hidden = true; document.body.appendChild(br); UI.bracket = br;
    const mk2 = document.createElement('button'); mk2.id = 'cityMarker'; mk2.className = 'bare city-marker'; mk2.hidden = true; mk2.addEventListener('click', function () { if (scene) { scene.back(); } }); document.body.appendChild(mk2); UI.marker = mk2;
    const hud = document.createElement('div'); hud.id = 'cityHud'; hud.className = 'city-hud'; hud.setAttribute('aria-hidden', 'true'); document.body.appendChild(hud); UI.hud = hud;
    for (let i = 0; i < 6; i++) { const p = document.createElement('span'); p.className = 'city-pin'; p.hidden = true; hud.appendChild(p); UI.pins.push(p); }
    for (let i = 0; i < 4; i++) { const p = document.createElement('span'); p.className = 'city-sign'; p.hidden = true; hud.appendChild(p); UI.chips.push(p); }
    // the [ fly the city  F ] / [ list view  F ] button in the catalogue's control row: a real button, with its key and a tooltip (issue #63)
    const wrap = document.createElement('span'); wrap.className = 'city-fly-wrap';
    const fb = document.createElement('button'); fb.className = 'bk city-fly'; fb.id = 'cityFly'; fb.type = 'button'; fb.setAttribute('aria-label', 'fly the city, or the list view');
    fb.addEventListener('click', function () { ctx.setLayout(UI.layout === 'air' ? 'deck' : 'air'); });
    wrap.appendChild(fb); wrap.appendChild(document.createTextNode('   '));
    const controls = document.querySelector('#catalogue .cat-controls');
    if (controls) controls.insertBefore(wrap, controls.firstChild);
    UI.flyBtn = fb; UI.flyWrap = wrap;
    fb.textContent = UI.layout === 'air' ? 'list view  F' : 'fly the city  F';
    buildHints();
    buildFallback();
    // the pointer on the scene: a drag swings the camera (shift pans), a click on a tower plays it, a phone's finger flies; the wheel zooms
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', function (e) { UI.fingers.delete(e.pointerId); UI.two = null; if (scene) scene.touchMove(0, 0); UI.tap = null; dragCursor(false); });
    canvas.addEventListener('lostpointercapture', function () { if (UI.tap && !UI.tap.touch) { UI.tap = null; dragCursor(false); } });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onAnyKey, true);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onShiftDown);
    window.addEventListener('blur', releaseKeys);
    window.addEventListener('pointermove', onWindowMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
  }
  /* ---- the hint bar (issue #63): pinned at the bottom of the air, the controls a first-time player needs, each lighting up when used ---- */
  const HINTS_DESK = [['look', 'drag', 'look'], ['move', 'WASD', 'fly'], ['rise', 'E shift', 'up down'], ['play', 'click a tower', 'to play'], ['list', 'F', 'list view', 'list'], ['themes', 'T', 'themes', 'themes'], ['help', '?', 'help', 'help']];
  const HINTS_PHONE = [['look', 'drag', 'to look'], ['move', 'two fingers', 'to fly'], ['tap', 'tap', 'a tower'], ['play', 'two taps', 'to play'], ['list', 'list', '', 'list']];
  function hintsKey() { try { return localStorage.getItem('nobody.cityhints'); } catch (e) { return null; } }
  function hintsSave(v) { try { localStorage.setItem('nobody.cityhints', v); } catch (e) {} }
  function buildHints() {
    const bar = document.createElement('div'); bar.id = 'cityHints'; bar.className = 'card city-hints'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'how to fly the city');
    const items = document.createElement('div'); items.className = 'ch-items';
    (V.phone() ? HINTS_PHONE : HINTS_DESK).forEach(function (h) {
      const it = document.createElement(h[3] ? 'button' : 'span'); it.className = 'ch-item' + (h[3] ? ' ch-btn' : ''); it.dataset.hint = h[0];
      if (h[3]) { it.type = 'button'; it.addEventListener('click', function (e) { e.stopPropagation(); hintAct(h[3]); }); }
      const key = document.createElement('span'); key.className = 'ch-key'; key.textContent = h[1]; it.appendChild(key);
      if (h[2]) { it.appendChild(document.createTextNode(' ')); const w = document.createElement('span'); w.className = 'ch-word'; w.textContent = h[2]; it.appendChild(w); }
      items.appendChild(it);
    });
    const shut = document.createElement('button'); shut.type = 'button'; shut.className = 'ch-shut'; shut.title = 'h: hide or show the controls';
    shut.addEventListener('click', function (e) { e.stopPropagation(); setHints(!UI.hintsOpen, true); });
    bar.appendChild(items); bar.appendChild(shut);
    const main = el('main'); main.appendChild(bar);
    UI.hints = bar; UI.hintShut = shut;
    // first visit: open; after the first track the listener chose has played (or h), it starts shut, one chip with the way back
    UI.hintsOpen = hintsKey() !== 'shut' && hintsKey() !== 'seen';
    syncHints();
  }
  function hintAct(what) {
    if (what === 'list') ctx.setLayout(UI.layout === 'air' ? 'deck' : 'air');
    else if (what === 'themes') { if (NOBODY.st.themePicker) NOBODY.st.themePicker(true); }
    else if (what === 'help') NOBODY.st.help(true);
  }
  function setHints(open, remember) {
    UI.hintsOpen = !!open;
    if (remember) hintsSave(open ? 'open' : 'shut');
    syncHints();
  }
  // after the first track the listener picked has played, the bar starts shut on the next visit (this one keeps it as it is)
  function rememberHints() { if (!hintsKey()) hintsSave('seen'); }
  function syncHints() {
    if (!UI.hints) return;
    UI.hints.hidden = UI.layout !== 'air';
    UI.hints.classList.toggle('shut', !UI.hintsOpen);
    UI.hintShut.textContent = UI.hintsOpen ? (V.phone() ? 'x' : 'h  hide') : (V.phone() ? 'how to fly' : 'h  how to fly');
    UI.hintShut.setAttribute('aria-expanded', UI.hintsOpen ? 'true' : 'false');
    document.body.classList.toggle('city-hints-open', UI.layout === 'air' && UI.hintsOpen);
  }
  // an input that the bar teaches lights its item for a moment: the bar answers the player
  function used(what) {
    if (!UI.hints) return;
    const it = UI.hints.querySelector('[data-hint="' + what + '"]'); if (!it) return;
    it.classList.remove('used'); void it.offsetWidth; it.classList.add('used');
  }
  /* ---- the honest air (issue #63): a scene that does not draw says so, with the way to the list ---- */
  function buildFallback() {
    const fb = document.createElement('div'); fb.id = 'cityFallback'; fb.className = 'card city-fallback'; fb.hidden = true; fb.setAttribute('role', 'status');
    fb.innerHTML = '<div class="label">THE CITY</div><p class="fb-line"></p>';
    const b = document.createElement('button'); b.type = 'button'; b.className = 'bk'; b.textContent = 'list view  F';
    b.addEventListener('click', function (e) { e.stopPropagation(); ctx.setLayout('deck'); });
    fb.appendChild(b);
    el('main').appendChild(fb); UI.fallback = fb;
  }
  function onVisibility() { UI.visibleAt = document.hidden ? 0 : performance.now(); watchdog(); }
  // twice a second, and on every visibility change and layout: in the air, on air, is the city drawing? hidden tab: paused; no scene, or no
  // frame for 2 s while the page is visible: did not come up. the line clears itself when the frames come back
  function watchdog() {
    if (!UI.fallback) return;
    const now = performance.now(), air = UI.layout === 'air' && ctx.S.onAir;
    let line = null;
    if (air) {
      if (document.hidden) line = 'the city is paused: this tab is in the background. F for the list view.';
      else if (!scene && (document.body.classList.contains('nocity') || now - (UI.initAt || now) > 2000)) line = 'the city did not come up on this screen. F for the list view.';
      else if (scene && UI.visibleAt && now - UI.visibleAt > 2000 && now - (UI.frameAt || 0) > 2000) line = 'the city did not come up on this screen. F for the list view.';
    }
    if (line) { if (UI.fallback.querySelector('.fb-line').textContent !== line) UI.fallback.querySelector('.fb-line').textContent = line; UI.fallback.hidden = false; }
    else if (!UI.fallback.hidden) UI.fallback.hidden = true;
    document.body.classList.toggle('city-down', !!line);
  }
  // a pointer moving over the open city is aiming: the orbit holds still under it (it turns again 3 s after the pointer rests)
  function onWindowMove(e) { UI.pointerAt = performance.now(); UI.px = e.clientX; UI.py = e.clientY; if (scene && e.target === canvas && UI.layout === 'air') scene.hold(); }
  // a camera key takes the camera from the auto-fly; the station's own keys (play, skip, volume, v) leave it flying
  function onAnyKey(e) { if (scene && scene.cruising() && (MOVE[e.key] || /^[jkJK]$/.test(e.key))) scene.input(); }
  // the wheel over the scene (not a card): the orbit zooms, the street moves; a trackpad's small deltas add up the same way
  function onWheel(e) {
    if (!scene || UI.layout !== 'air') return;
    if (e.target !== canvas) return;
    e.preventDefault();
    if (scene.wheel(e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY)) used('zoom');
  }
  function dragCursor(on) { if (canvas) canvas.style.cursor = on ? 'grabbing' : (UI.layout === 'air' && !V.phone() ? 'grab' : ''); }
  function onPointerDown(e) {
    if (!scene || UI.layout !== 'air') return;
    if (e.pointerType !== 'touch' && e.button !== 0) return;
    if (e.pointerType === 'touch') { UI.fingers.set(e.pointerId, { x: e.clientX, y: e.clientY }); UI.two = null; if (UI.fingers.size > 1 && UI.tap) { UI.tap.moved = true; return; } }
    UI.tap = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: false, touch: e.pointerType === 'touch', shift: e.shiftKey };
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onPointerMove(e) {
    if (UI.fingers.has(e.pointerId)) UI.fingers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!UI.tap || !scene) return;
    const dx = e.clientX - UI.tap.x, dy = e.clientY - UI.tap.y;
    if (!UI.tap.moved && Math.abs(dx) + Math.abs(dy) > (UI.tap.touch ? 8 : 5)) { UI.tap.moved = true; if (!UI.tap.touch) { dragCursor(true); hideReadout(); } }
    // a drag aims (issue #110): the mouse, or one finger on a phone; two fingers fly, from where they first came down
    if (UI.tap.touch && UI.fingers.size >= 2) {
      const ps = Array.from(UI.fingers.values()), mx = (ps[0].x + ps[1].x) / 2, my = (ps[0].y + ps[1].y) / 2;
      if (!UI.two) UI.two = { x: mx, y: my };
      const k = Math.min(innerWidth, innerHeight) / 4;
      scene.touchMove(clamp(-(my - UI.two.y) / k, -1, 1), clamp((mx - UI.two.x) / k, -1, 1)); used('move');
      UI.tap.moved = true;
      return;
    }
    if (UI.tap.moved) {
      const mx = e.clientX - UI.tap.lx, my = e.clientY - UI.tap.ly; UI.tap.lx = e.clientX; UI.tap.ly = e.clientY;
      scene.look(mx, my); used('look');
    }
  }
  function onPointerUp(e) {
    const two = UI.fingers.size > 1 || UI.two; UI.fingers.delete(e.pointerId);
    if (two) { if (scene) scene.touchMove(0, 0); UI.two = null; if (UI.fingers.size) return; }
    const tap = UI.tap; UI.tap = null;
    if (!tap || !scene || UI.layout !== 'air') return;
    try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    if (tap.moved) { dragCursor(false); return; }
    scene.input();
    const t = scene.pick(e.clientX, e.clientY, pickRadius());
    if (!t) { if (tap.touch) hideReadout(); return; }
    // a click on a tower flies there and plays it; on a phone the first tap is the hover, the second flies
    if (tap.touch && UI.readoutSlug !== t.slug) { ctx.setHighlight(t.slug); UI.cursorSlug = t.slug; scene.setCursor(t.slug); scene.setHover(t.slug); UI.hover = t; showReadout(t); used('look'); return; }
    used('play');
    // the tower that is already playing is not started again: the camera goes back to circling it
    if (t.slug === ctx.current() && ctx.S.state === 'playing') { scene.back(); return; }
    ctx.play(t.slug);
  }
  function trackOf(slug) { return ctx.tracks().find(function (x) { return x.slug === slug; }) || null; }
  function showReadout(t) {
    const ro = UI.readout, tr = trackOf(t.slug); if (!ro || !tr) return;
    if (UI.readoutSlug !== t.slug) {
      ro.querySelector('.ro-slug').textContent = t.slug;
      ro.querySelector('.ro-meta').textContent = [tr.bpm != null ? tr.bpm + ' bpm' : null, tr.key, ctx.fmt(tr.duration), tr.model, (tr.date || '').slice(5)].filter(Boolean).join('  ');
      const line = String(tr.prompt || tr.idea || '').replace(/\s+/g, ' ');
      const n = V.phone() ? 44 : 60;
      ro.querySelector('.ro-line').textContent = line.length > n ? line.slice(0, n - 1) + ' ...' : line;
      UI.readoutSlug = t.slug; UI.readoutAt = performance.now();
      const hints = el('hints'); if (hints && !V.phone() && !document.body.classList.contains('ui-hidden')) hints.dataset.hover = 'hover: ' + t.slug + '. a click plays it.';
    }
    ro.hidden = false; ro.classList.remove('hint');
  }
  function hideReadout() { if (UI.readout) { UI.readout.hidden = true; UI.readout.classList.remove('hint'); } UI.readoutSlug = null; UI.hover = null; UI.readoutAtCursor = null; if (UI.bracket) UI.bracket.hidden = true; if (ctx) { const hints = el('hints'); if (hints) delete hints.dataset.hover; } }
  // the title hint in the hidden interface (city-flythrough 10): the readout rises from the tower and fades
  function hintReadout(slug) {
    const t = scene.towers().find(function (x) { return x.slug === slug; }); if (!t) return;
    showReadout(t);
    UI.readout.classList.add('hint'); UI.hint = performance.now() + 3000;
  }
  // the open part of the frame in the air: under the header, left of the rail, above the dash
  function sceneArea() {
    const hd = el('header').getBoundingClientRect(), tx = el('transmitter').getBoundingClientRect(), cat = el('catalogue').getBoundingClientRect();
    const hidden = document.body.classList.contains('ui-hidden');
    const hb = UI.hints && !UI.hints.hidden ? UI.hints.getBoundingClientRect() : null;
    return { left: 8, top: hidden ? 8 : hd.bottom + 8, right: hidden || V.phone() || cat.width === 0 ? innerWidth - 8 : cat.left - 8, bottom: hidden ? innerHeight - 8 : Math.min(tx.top, hb && hb.height ? hb.top : 1e9) - 8 };
  }
  function place(elm, x, y) { elm.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)'; }
  // every frame after the render: the cursor from the pointer, the readout, the bracket, the marker, the pins, the signs, the cruise
  function uiFrame(now) {
    if (!scene) return;
    UI.frames = (UI.frames || 0) + 1; UI.lastNow = now; UI.frameAt = performance.now();
    if (UI.fallback && !UI.fallback.hidden) watchdog();
    const air = UI.layout === 'air', hidden = document.body.classList.contains('ui-hidden');
    if (!air && !hidden) { if (!UI.readout.hidden) hideReadout(); UI.marker.hidden = true; UI.pins.forEach(function (p) { p.hidden = true; }); UI.chips.forEach(function (p) { p.hidden = true; }); if (canvas.style.cursor) canvas.style.cursor = ''; scene.setHover(null); return; }
    const nav = scene.nav();
    // the cursor follows the pointer when the pointer moves (the keys move it through highlight); not while a drag swings the camera
    const dragging = UI.tap && UI.tap.moved && !UI.tap.touch;
    if (!V.phone() && !hidden && !dragging && now - UI.pointerAt < 3000 && UI.pointerAt > (UI.keyAt || 0) && UI.px != null && scene.view === 'air' && nav.mode !== 'glide') {
      const over = document.elementFromPoint(UI.px, UI.py);
      if (over === canvas) {
        const t = scene.pick(UI.px, UI.py, pickRadius());
        if (t && t !== UI.hover) { UI.hover = t; UI.cursorSlug = t.slug; scene.setCursor(t.slug); ctx.setHighlight(t.slug); }
        else if (!t && UI.hover) { UI.hover = null; }
        // the hand over a tower (a click plays it), the open hand over the rest of the city (a drag swings it)
        const want = UI.hover ? 'pointer' : 'grab';
        if (canvas.style.cursor !== want) canvas.style.cursor = want;
      }
    }
    if (UI.hover && !hidden) scene.hold();
    if (!V.phone()) scene.setHover(UI.hover && !hidden ? UI.hover.slug : null);
    else scene.setHover(UI.readoutSlug && !UI.readout.hidden && !hidden ? UI.readoutSlug : null);
    const cur = scene.cursor();
    // the readout anchored to the cursor tower, 120 ms after it settles; the hint variant fades on its own
    if (UI.readout.classList.contains('hint')) {
      if (now > UI.hint) hideReadout();
    } else if (cur && !hidden && (UI.hover === cur || UI.cursorSlug === cur.slug)) {
      const top = scene.project(cur.x, cur.blocks * 0.5, cur.z);
      if (top.behind || top.d > 120) { if (!UI.readout.hidden) hideReadout(); }
      else if (UI.readoutSlug !== cur.slug) {
        if (UI.readoutAtCursor !== cur.slug) { UI.readoutAtCursor = cur.slug; UI.readoutSettle = now; }
        if (now - UI.readoutSettle >= 120) showReadout(cur);
      }
    } else if (!UI.readout.hidden) hideReadout();
    if (!UI.readout.hidden) {
      const t = scene.towers().find(function (x) { return x.slug === UI.readoutSlug; });
      if (t) {
        const top = scene.project(t.x, t.blocks * 0.5, t.z), foot = scene.project(t.x, 0, t.z);
        const w = UI.readout.offsetWidth || 320, h = UI.readout.offsetHeight || 120;
        const leftSide = V.phone() ? false : (UI.px != null ? UI.px > top.x : top.x > innerWidth / 2);
        let x = V.phone() ? top.x - w / 2 : (leftSide ? top.x - w - 24 : top.x + 24);
        let y = V.phone() ? (top.y - h - 16 > 8 ? top.y - h - 16 : foot.y + 16) : top.y - 12;
        // under the header, never over it; sideways it stays beside the tower, away from the pointer, so it never covers the tower
        // the pointer is about to click
        const top0 = V.phone() || hidden ? 8 : sceneArea().top;
        x = clamp(x, 8, innerWidth - w - 8); y = clamp(y, top0, Math.max(top0, innerHeight - h - 8));
        place(UI.readout, x, y);
        // the bracket around the tower's screen box
        const bw = Math.max(18, Math.abs(foot.y - top.y) * 0.25 + 12), bh = Math.max(24, foot.y - top.y + 8);
        UI.bracket.hidden = top.behind; place(UI.bracket, top.x - bw / 2, top.y - 4); UI.bracket.style.width = bw + 'px'; UI.bracket.style.height = bh + 'px';
      }
    } else UI.bracket.hidden = true;
    // the edge marker when the playing tower is off screen (city-flythrough 8)
    const pt = scene.playing ? scene.towers().find(function (x) { return x.slug === scene.playing; }) : null;
    if (pt && !hidden && (nav.mode !== 'orbit' || scene.focus() !== scene.playing)) {
      const p = scene.project(pt.x, pt.blocks * 0.5, pt.z);
      const off = p.behind || p.x < 0 || p.x > innerWidth || p.y < 0 || p.y > innerHeight;
      if (off) {
        // the marker stays inside the scene area: under the header, left of the rail, above the dash (the cards keep their words)
        const sa = sceneArea();
        const cx = (sa.left + sa.right) / 2, cy = (sa.top + sa.bottom) / 2;
        let dx = p.x - cx, dy = p.y - cy; if (p.behind) { dx = -dx; dy = -dy; }
        const ang = Math.atan2(dy, dx), m = UI.marker, mw = m.offsetWidth || 220, mh = m.offsetHeight || 28;
        const rx = Math.max(10, (sa.right - sa.left - mw) / 2 - 12), ry = Math.max(10, (sa.bottom - sa.top - mh) / 2 - 12);
        const sx = Math.cos(ang), sy = Math.sin(ang), k = Math.min(rx / Math.max(1e-6, Math.abs(sx)), ry / Math.max(1e-6, Math.abs(sy)));
        const cxz = scene.cameraXZ(), blocks = Math.round(Math.hypot(pt.x - cxz.x, pt.z - cxz.z) / 2);
        const horiz = Math.abs(sx) > Math.abs(sy);
        m.textContent = (horiz && sx < 0 ? '< ' : !horiz && sy < 0 ? '^ ' : '') + scene.playing + '  ' + blocks + (blocks === 1 ? ' block' : ' blocks') + (horiz && sx > 0 ? ' >' : !horiz && sy > 0 ? ' v' : '');
        m.hidden = false; place(m, cx + sx * k - mw / 2, cy + sy * k - mh / 2);
      } else UI.marker.hidden = true;
    } else UI.marker.hidden = true;
    // the pins on the route's stops and the street signs, within 40 units, with an opaque chip each (12.0, legibility)
    const r = scene.route();
    UI.pins.forEach(function (p, i) {
      const s = r.stops[i];
      if (!s || hidden) { p.hidden = true; return; }
      const q = scene.project(s.x, 0.4, s.z);
      if (q.behind || q.d > 40 || q.x < 0 || q.x > innerWidth || q.y < 0 || q.y > innerHeight) { p.hidden = true; return; }
      p.textContent = String(s.n); p.hidden = false; place(p, q.x - 10, q.y - 10);
    });
    const signs = scene.city().signs, shown = [];
    for (let i = 0; i < signs.length && shown.length < 4; i++) {
      const s = signs[i], q = scene.project(s.x, 0.1, s.z);
      if (hidden || q.behind || q.d > 40 || q.x < 20 || q.x > innerWidth - 20 || q.y < 20 || q.y > innerHeight - 20) continue;
      shown.push({ s: s, q: q });
    }
    UI.chips.forEach(function (c, i) {
      const sh = shown[i];
      if (!sh) { c.hidden = true; return; }
      c.textContent = sh.s.text; c.className = 'city-sign ' + sh.s.kind; c.hidden = false; place(c, sh.q.x - 40, sh.q.y - 10);
    });
  }

  /* ---- widgets ---- */
  // the station name as a 3D object (12.2): fourteen layers, the front with the gradient fill; returns the front layer
  function name3d(host, text, layers) {
    layers = layers || 14;
    host.textContent = '';
    host.classList.add('name3d');
    const g = document.createElement('span'); g.className = 'n3';
    let front = null;
    for (let i = layers - 1; i >= 0; i--) {
      const s = document.createElement('span'); s.textContent = text; s.style.setProperty('--i', String(i));
      if (i === 0) { s.className = 'front'; front = s; } else s.setAttribute('aria-hidden', 'true'); // the depth layers are decoration, not text
      g.appendChild(s);
    }
    host.appendChild(g);
    return front;
  }
  TH.stationName = function (button) { name3d(button, 'NOBODY FM'); };
  TH.banner = function (bannerEl, phone, scramble) {
    bannerEl.classList.remove('in');
    const front = name3d(bannerEl, 'NOBODY FM');
    bannerEl.classList.add('in');
    if (scramble) { front.textContent = V.scrambled('NOBODY FM'); V.scramble(front, 'NOBODY FM', 900); }
  };
  TH.progress = function (progressEl, hdrBarEl, c, d, phone, view) {
    const fmt = ctx.fmt, pct = d ? Math.max(0, Math.min(100, c / d * 100)) : 0;
    const fill = progressEl.querySelector('.fill'), head = progressEl.querySelector('.head'), time = progressEl.querySelector('.time');
    if (fill) fill.style.width = pct.toFixed(2) + '%';
    if (head) head.style.left = pct.toFixed(2) + '%';
    if (time) time.textContent = phone ? fmt(c) + '/' + fmt(d) : fmt(c) + ' / ' + fmt(d);
    if (view !== 'home') { const bar = hdrBarEl.querySelector('i'); if (bar) bar.style.width = pct.toFixed(2) + '%'; }
  };
  TH.progressHit = function (progressEl, x) { const rail = progressEl.querySelector('.rail') || progressEl, r = rail.getBoundingClientRect(); return Math.max(0, Math.min(1, (x - r.left) / r.width)); };
  // the dial is a strip of frequencies flying past a centre marker (12.4)
  function makeDialStrip(host) {
    host.textContent = '';
    const strip = document.createElement('div'); strip.className = 'dial-strip';
    let ticks = '', labels = '';
    for (let i = 0; i <= 110; i++) ticks += (i % 5 === 0) ? '|' : '.';
    for (let k = 0; k <= 22; k++) labels += (86 + k).toFixed(1) + ' ';
    const t = document.createElement('pre'); t.textContent = ticks; strip.appendChild(t);
    const l = document.createElement('pre'); l.className = 'labels'; l.textContent = labels; strip.appendChild(l);
    host.appendChild(strip);
    const read = document.createElement('span'); read.className = 'dial-read'; host.appendChild(read);
    return {
      set: function (f, locked, note) {
        const ch = V.fontPx() * 0.6, w = host.clientWidth || 600;
        strip.style.transform = 'translateX(' + (w / 2 - (f - 86) / 0.2 * ch - ch / 2).toFixed(1) + 'px)';
        read.textContent = f.toFixed(1) + (note ? '  ' + note : '');
        host.classList.toggle('locked', !!locked);
      }
    };
  }
  TH.dial = function (dialEl, f, locked, note) { if (!dialStrip) dialStrip = makeDialStrip(dialEl); dialStrip.set(f, locked, note); };
  // the volume is the shared fader (volume.js, 12.0 controls) in the city's tokens; the HUD ring of 12.4 stays on the counter only
  TH.volume = function () {};
  function svgEl(name, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', name); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function ring(host, opts) {
    const cx = 50, cy = 50, ticks = opts.ticks == null ? 10 : opts.ticks;
    host.textContent = '';
    const svg = svgEl('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' });
    const outer = svgEl('g', { class: 'ring-outer' });
    outer.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 46, fill: 'none', stroke: 'currentColor', 'stroke-opacity': '.5', 'stroke-width': '1' }));
    for (let i = 0; i < 60; i++) {
      const a = i / 60 * Math.PI * 2, r1 = i % 5 === 0 ? 41 : 43.5;
      outer.appendChild(svgEl('line', { x1: cx + Math.cos(a) * r1, y1: cy + Math.sin(a) * r1, x2: cx + Math.cos(a) * 46, y2: cy + Math.sin(a) * 46, stroke: 'currentColor', 'stroke-opacity': i % 5 === 0 ? '.8' : '.4', 'stroke-width': '1' }));
    }
    svg.appendChild(outer);
    const inner = svgEl('g', { class: 'ring-inner' });
    inner.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 34, fill: 'none', stroke: 'currentColor', 'stroke-opacity': '.35', 'stroke-width': '1', 'stroke-dasharray': '6 4' }));
    svg.appendChild(inner);
    const tickEls = [];
    for (let i = 0; i < ticks; i++) {
      const a = -Math.PI * 1.25 + (i + 0.5) / ticks * Math.PI * 1.5;
      const l = svgEl('line', { class: 'tick', x1: cx + Math.cos(a) * 26, y1: cy + Math.sin(a) * 26, x2: cx + Math.cos(a) * 36, y2: cy + Math.sin(a) * 36 });
      svg.appendChild(l); tickEls.push(l);
    }
    const num = svgEl('text', { class: 'num', x: cx, y: cy + 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
    svg.appendChild(num);
    host.appendChild(svg);
    return {
      set: function (v, muted) { tickEls.forEach(function (t, i) { t.classList.toggle('lit', i < v); }); num.textContent = muted ? 'm' : String(v); host.classList.toggle('muted', !!muted); },
      hit: function (x, y) {
        const r = host.getBoundingClientRect(), px = (x - r.left) / r.width * 100, py = (y - r.top) / r.height * 100;
        const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy);
        if (d < 18) return 0;
        if (d > 52) return 0;
        let k = (Math.atan2(dy, dx) + Math.PI * 1.25) / (Math.PI * 1.5);
        if (k < 0) k += 2 * Math.PI / (Math.PI * 1.5);
        return Math.max(1, Math.min(ticks, Math.ceil(k * ticks)));
      }
    };
  }
  // dead air: the scene builds its unlit tower (12.3); without the scene a CSS tower appears block by block (12.11)
  TH.towerStart = function (hostEl, staticEl, phone) {
    if (scene && scene.running) { staticEl.hidden = true; return 'city'; }
    if (!staticEl.children.length) for (let i = 0; i < 18; i++) { const b = document.createElement('i'); b.style.setProperty('--i', String(i)); staticEl.appendChild(b); }
    staticEl.hidden = false; return 'css';
  };
  TH.towerStop = function () { el('towerStatic').hidden = true; };
  TH.towerState = function () { return scene && scene.running ? 'the city in its dead-air view' : 'the CSS tower in the card'; };

  /* ---- the card's analyser (12.4): rounded neon bars with a cyan to magenta gradient, peak dots; the ribbon under it ---- */
  function colours() {
    return { cyan: token('--cyan'), magenta: token('--magenta'), violet: token('--violet'), dim: token('--ink-dim'), cyanRgb: token('--cyan-rgb'), magRgb: token('--magenta-rgb') };
  }
  function roundRect(g, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    g.beginPath(); g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h); g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
  }
  function autoGain(s) {
    let m = 0; for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
    const want = m > 0.02 ? Math.min(12, 0.8 / m) : gainHold;
    gainHold += (want - gainHold) * 0.05;
    return gainHold;
  }
  TH.frame = function (A_, S_, now) {
    if (!A.ctx2d) return;
    const c = colours(), g = A.ctx2d, W = A.W, H = A.H;
    if (!c.cyan || !c.magenta) return; // the stylesheet is being swapped for another theme's: no tokens, no frame
    g.clearRect(0, 0, W, H);
    const phone = V.phone();
    const cellW = V.fontPx() * 0.6, totalCols = Math.floor(W / cellW);
    A.totalCols = totalCols;
    const labelCols = phone ? 10 : 24;
    const areaCols = Math.max(A.bands, totalCols - 2 - labelCols);
    const areaW = areaCols * cellW, x0 = 2 * cellW;
    g.fillStyle = c.dim; g.fillRect(0, 0, 1, H);
    if (A.mode === 'scope5') { drawScope5(g, c, x0, areaW, H); return; }
    const per = areaW / A.bands, bw = Math.max(2, per * 0.62);
    const grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, c.cyan); grad.addColorStop(0.55, c.violet); grad.addColorStop(1, c.magenta);
    const rows = A.rows, cellH = H / rows;
    for (let b = 0; b < A.bands; b++) {
      const v = A.vals[b];
      const cells = Math.min(rows, Math.floor(Math.pow(v, 0.8) * (rows + 0.99)));
      const hgt = Math.max(0, Math.pow(v, 0.8) * H);
      if (cells > A.peaks[b]) { A.peaks[b] = cells; A.peakAt[b] = now; }
      else if (now - A.peakAt[b] > 150 && A.peaks[b] > 0) { A.peaks[b]--; A.peakAt[b] = now; }
      const x = x0 + b * per + (per - bw) / 2;
      g.shadowColor = 'rgb(' + c.cyanRgb.replace(/ /g, ',') + ',0.7)'; g.shadowBlur = 10;
      g.fillStyle = grad;
      if (hgt > 1) { if (A.flip) roundRect(g, x, 0, bw, hgt, 2); else roundRect(g, x, H - hgt, bw, hgt, 2); g.fill(); }
      const pk = A.peaks[b];
      if (pk > cells && pk <= rows) {
        const y = A.flip ? pk * cellH - 2 : H - pk * cellH;
        g.shadowColor = 'rgb(' + c.magRgb.replace(/ /g, ',') + ',0.9)'; g.shadowBlur = 8; g.fillStyle = c.magenta;
        g.fillRect(x, y, bw, 2);
      }
    }
    g.shadowBlur = 0;
    A.baselineText(A.live);
    scopeRibbon(c);
  };
  function scopeRibbon(c) {
    if (!scopeCtx) return;
    const W = +scopeCanvas.dataset.w || 500, H = +scopeCanvas.dataset.h || 20, n = Math.max(32, Math.floor(W / 3));
    const s = A.samples(n), gn = autoGain(s), g = scopeCtx;
    g.clearRect(0, 0, W, H);
    g.lineWidth = 1.2; g.strokeStyle = c.magenta; g.shadowColor = c.magenta; g.shadowBlur = 6;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = i / (n - 1) * W, y = H / 2 - s[i] * gn * (H / 2 - 1); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
  }
  function drawScope5(g, c, x0, areaW, H) {
    const n = Math.max(32, Math.floor(areaW / 2)), s = A.samples(n), gn = autoGain(s);
    g.lineWidth = 1.5; g.strokeStyle = c.cyan; g.shadowColor = c.cyan; g.shadowBlur = 10;
    g.beginPath();
    for (let i = 0; i < n; i++) { const x = x0 + i / (n - 1) * areaW, y = H / 2 - s[i] * gn * (H / 2 - 2); if (i) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke(); g.shadowBlur = 0;
    A.baselineText(true);
    if (scopeCtx) scopeCtx.clearRect(0, 0, +scopeCanvas.dataset.w || 500, +scopeCanvas.dataset.h || 20);
  }

  /* ---- the artwork for the media session (4.2): the name on the night ---- */
  TH.artwork = function () {
    try {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
      const g = cv.getContext('2d');
      const bg = g.createLinearGradient(0, 0, 0, 512); bg.addColorStop(0, '#070A1C'); bg.addColorStop(1, '#020309');
      g.fillStyle = bg; g.fillRect(0, 0, 512, 512);
      g.strokeStyle = 'rgba(25,240,255,.25)'; g.lineWidth = 1;
      for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(256 + (i - 6) * 20, 300); g.lineTo(256 + (i - 6) * 90, 512); g.stroke(); }
      for (let y = 300; y < 512; y += 18 + (y - 300) * 0.25) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke(); }
      const tg = g.createLinearGradient(60, 0, 452, 0); tg.addColorStop(0, '#19F0FF'); tg.addColorStop(1, '#FF2BD6');
      g.fillStyle = tg; g.font = '800 54px "Orbitron", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.shadowColor = 'rgba(255,43,214,.6)'; g.shadowBlur = 24;
      g.fillText('NOBODY FM', 256, 200);
      g.font = '500 20px "Orbitron", sans-serif'; g.fillStyle = '#9FB3D9'; g.shadowBlur = 0;
      g.fillText('88.8  the transmitter nobody can find', 256, 250);
      return cv.toDataURL('image/png');
    } catch (e) { return null; }
  };
  return TH;
})();
