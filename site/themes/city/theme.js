/* nobody fm, theme "city": the cyberspace look (design 12.1 to 12.11). the page background is a three.js scene:
   an endless grid, towers of glowing translucent blocks (one per track, the rest anonymous), a ring of bars and
   a ribbon around the playing tower, a wireframe tunnel for the flights, bloom and chromatic fringing on top;
   glass cards, a display face, HUD rings and a strip of frequencies in front of it. a classic script on purpose
   (design 5.7): the one inline module in index.html imports three.js and its passes from the CDN into
   NOBODY.libs; makeScene below is plain code against them. without the CDN there is no scene and the page runs
   on the CSS gradient (12.11). nobody who built this can hear; nothing here listens, it only reads numbers. */
window.NOBODY = window.NOBODY || {};
NOBODY.themes = NOBODY.themes || {};
function makeCityScene(THREE, P) {
  const C = {
    ok: true, running: false, bloomOn: true, chromaOn: true, frames: 0, ms: 0, view: 'standby', playing: null,
    phone: false, reduced: false, probed: false, tunnelOn: false, flying: false, levels: null
  };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  C.reduced = reduced;
  const qs = new URLSearchParams(location.search);
  const NOPROBE = qs.get('probe') === '0'; // harness only: keep the designed look whatever the frame time

  /* ---- tokens: the scene reads the same custom properties as the CSS (12.1) ---- */
  const tok = {};
  function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    ['cyan', 'magenta', 'violet', 'green', 'amber', 'bg-0', 'bg-1', 'haze', 'ink-dim'].forEach(function (k) {
      const v = cs.getPropertyValue('--' + k).trim() || '#ffffff';
      tok[k] = new THREE.Color(v);
    });
  }
  readTokens();

  /* ---- the renderer, the scene, the camera ---- */
  let renderer, scene, camera, composer, bloom, chroma, canvas, W = 2, H = 2, pr = 1;
  const clock = { last: 0, t: 0 };
  // bloom far lower than 12.1 wrote (1.15 / .55 / .12) and lower again after issue #43: on a real GPU the playing tower's bloom at
  // 1.0 / .5 / .18 was a white-magenta glare the size of a card behind the catalogue and the terminal (the software renderer of
  // the harness never showed it). .55 / .4 / .5 keeps a halo on the bright blocks and nothing else lights up (departure, 12.13)
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

  /* ---- the block shader (12.3): translucent body, bright edges, instanced, rising and pulsing ---- */
  const BLOCK_VERT = [
    'attribute float aRise; attribute float aTower; attribute float aTop;',
    'uniform float uRise, uTime, uFog, uPlaying, uPulse;',
    'varying vec2 vUv; varying vec3 vCol; varying float vFade;',
    'void main(){',
    '  vUv = uv;',
    '  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);',
    '  float s = clamp((uRise - aRise * 0.6) / 0.4, 0.0, 1.0);',
    '  s = s * s * (3.0 - 2.0 * s);',
    '  wp.y *= s;',
    '  vec4 mv = viewMatrix * wp;',
    '  float d = length(mv.xyz);',
    '  float fog = exp(-pow(d * uFog, 2.0)) * smoothstep(1.2, 4.5, d);',
    '  float playing = step(abs(aTower - uPlaying), 0.5);',
    '  float top = step(0.5, aTop) * step(aTop, 1.5);',
    '  float gain = 1.0 + playing * uPulse * 0.7 * (1.0 + top);',
    '  float blink = mix(1.0, 0.5 + 0.5 * sin(uTime * 3.14159), step(1.5, aTop));',
    '  vCol = instanceColor * gain * blink;',
    '  vFade = fog * s;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');
  const BLOCK_FRAG = [
    'varying vec2 vUv; varying vec3 vCol; varying float vFade; uniform float uGain;',
    'void main(){',
    '  vec2 e = min(vUv, 1.0 - vUv);',
    '  float edge = 1.0 - smoothstep(0.0, 0.05, min(e.x, e.y));',
    '  vec3 c = vCol * (0.07 + 1.3 * edge) * vFade * uGain;',
    '  gl_FragColor = vec4(c, 1.0);',
    '}'
  ].join('\n');
  const blockUniforms = { uRise: { value: 0 }, uTime: { value: 0 }, uFog: { value: settings.fog }, uPlaying: { value: -99 }, uPulse: { value: 0 }, uGain: { value: 1 } };
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

  /* ---- state ---- */
  let grid, sky, filler, cat, dead, bars, barsMirror, ribbon, tunnel, horizon;
  const towers = []; // {slug, x, z, blocks, kind}
  let barCount = 64, barColors = [];
  const ribbonN = 160, ribbonWave = new Float32Array(ribbonN);
  // side: how far the camera pans sideways so the playing tower sits beside the card column, not behind it (issue #43); 0 on the phone
  const cam = { target: new THREE.Vector3(0, 2, 0), r: 24, h: 18, speed: 0.02, angle: 0.6, side: 0, sideNow: 0 };
  const pose = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
  let flight = null, tunnelUntil = 0, tunnelFade = 0, parallax = { x: 0, y: 0, tx: 0, ty: 0 };
  let bootT = null, deadBlocks = 0, deadAt = 0, pulse = 0, bass = 0, chromaAmt = 0.0022;

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  function kindColour(kind) {
    switch (kind) {
      case 'fast': return tok.cyan.clone().multiplyScalar(1.0);
      case 'best': return tok.magenta.clone().multiplyScalar(1.0);
      case 'beacon': return tok.green.clone().multiplyScalar(1.4);
      case 'filler-c': return tok.cyan.clone().multiplyScalar(0.4);
      case 'filler-v': return tok.violet.clone().multiplyScalar(0.45);
      case 'dead': return tok['ink-dim'].clone().multiplyScalar(1.3);
      default: return tok.violet.clone().multiplyScalar(1.0);
    }
  }

  // builds one InstancedMesh from a list of towers; each block carries its rise delay, its tower id and whether it is the top
  function buildBlocks(list, camXZ) {
    let n = 0; list.forEach(function (t) { n += t.blocks + (t.voice ? 1 : 0); });
    const mesh = new THREE.InstancedMesh(blockGeo, blockMaterial(), Math.max(1, n));
    const rise = new Float32Array(Math.max(1, n)), tid = new Float32Array(Math.max(1, n)), top = new Float32Array(Math.max(1, n));
    const m = new THREE.Matrix4();
    let i = 0, maxD = 1;
    list.forEach(function (t) { maxD = Math.max(maxD, Math.hypot(t.x - camXZ.x, t.z - camXZ.y)); });
    list.forEach(function (t) {
      const d = Math.hypot(t.x - camXZ.x, t.z - camXZ.y) / maxD;
      const col = kindColour(t.kind);
      for (let k = 0; k < t.blocks; k++) {
        m.makeTranslation(t.x, 0.25 + k * 0.5, t.z);
        mesh.setMatrixAt(i, m); mesh.setColorAt(i, col);
        rise[i] = d; tid[i] = t.id; top[i] = k === t.blocks - 1 ? 1 : 0; i++;
      }
      if (t.voice) { m.makeTranslation(t.x, 0.25 + t.blocks * 0.5, t.z); mesh.setMatrixAt(i, m); mesh.setColorAt(i, kindColour('beacon')); rise[i] = d; tid[i] = t.id; top[i] = 2; i++; }
    });
    mesh.count = n;
    if (!mesh.instanceColor) mesh.setColorAt(0, new THREE.Color(0, 0, 0)); // an empty catalogue still needs the colour attribute the shader reads
    mesh.geometry = blockGeo.clone();
    mesh.geometry.setAttribute('aRise', new THREE.InstancedBufferAttribute(rise, 1));
    mesh.geometry.setAttribute('aTower', new THREE.InstancedBufferAttribute(tid, 1));
    mesh.geometry.setAttribute('aTop', new THREE.InstancedBufferAttribute(top, 1));
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
    mesh.userData.list = list;
    return mesh;
  }
  function recolour(mesh) {
    if (!mesh || !mesh.instanceColor) return;
    let i = 0;
    mesh.userData.list.forEach(function (t) {
      const col = kindColour(t.kind);
      for (let k = 0; k < t.blocks; k++) mesh.setColorAt(i++, col);
      if (t.voice) mesh.setColorAt(i++, kindColour('beacon'));
    });
    mesh.instanceColor.needsUpdate = true;
  }
  function buildFiller(count) {
    const r = rng(888), list = [];
    let tries = 0;
    while (list.length < count && tries++ < count * 10) {
      const rad = 14 + 76 * Math.sqrt(r()), a = r() * Math.PI * 2;
      const x = Math.round(Math.cos(a) * rad), z = Math.round(Math.sin(a) * rad);
      if (towers.some(function (t) { return Math.hypot(t.x - x, t.z - z) < 3; })) continue;
      list.push({ id: -1, x: x, z: z, blocks: 2 + Math.floor(r() * 13), kind: r() < 0.5 ? 'filler-c' : 'filler-v', voice: false });
    }
    return buildBlocks(list, new THREE.Vector2(0, 0));
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

  /* ---- the camera (12.3, 12.5) ---- */
  function orbitPose(pos, look) {
    pos.set(cam.target.x + Math.cos(cam.angle) * cam.r, cam.target.y + cam.h, cam.target.z + Math.sin(cam.angle) * cam.r);
    look.copy(cam.target);
  }
  function fly(ms, bump) {
    if (reduced) { ms = 0; }
    if (ms <= 0) { flight = null; return; }
    flight = { from: { pos: pose.pos.clone(), look: pose.look.clone() }, t0: performance.now(), ms: ms, bump: bump || 0 };
    C.flying = true;
  }
  function towerOf(slug) { return towers.find(function (t) { return t.slug === slug; }) || null; }
  function targetFor(slug) {
    const t = towerOf(slug);
    if (!t) return new THREE.Vector3(0, 2, 0);
    return new THREE.Vector3(t.x, Math.max(1.5, t.blocks * 0.25), t.z);
  }
  // orbits wider than 12.3 wrote (9 / 4.5 and 5.5 / 2.2): at those radii the neighbouring towers' blocks filled the frame;
  // 13 / 6.5 and 7.5 / 3 keep the playing tower large and the city readable around it (departure, noted in 12.13)
  const VIEWS = { standby: { r: 26, h: 19, speed: 0.02 }, home: { r: 13, h: 6.5, speed: 0.045 }, page: { r: 7.5, h: 3, speed: 0.045 }, guestbook: { r: 15, h: 8, speed: 0.03 }, dead: { r: 12, h: 5, speed: 0.04 } };
  function applyView(view, ms) {
    const v = VIEWS[view] || VIEWS.home;
    C.view = view;
    cam.r = v.r; cam.h = v.h; cam.speed = reduced ? 0 : v.speed;
    // on air the tower is panned to about 87 % of the width on desktop: the halo lands beside the cards, the cards' panels carry the rest
    cam.side = (view === 'home' || view === 'page' || view === 'guestbook') && !C.phone ? v.r * 0.7 : 0;
    cam.target.copy(view === 'standby' || view === 'dead' ? new THREE.Vector3(0, 2, 0) : targetFor(C.playing));
    dead.visible = view === 'dead';
    filler.visible = view !== 'dead';
    cat.visible = view !== 'dead';
    fly(ms, view === 'page' ? 0 : 1.5);
  }

  /* ---- the public face: what station.js drives ---- */
  C.start = function (el, opts) {
    opts = opts || {};
    if (renderer) return true;
    try {
      canvas = el; C.phone = !!opts.phone;
      if (C.phone) Object.assign(settings, PHONE);
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(tok['bg-0'].getHex(), 1);
      sizeUp();
      build();
      sizeUp();
      window.addEventListener('resize', sizeUp);
      if (!reduced) {
        window.addEventListener('pointermove', function (e) { parallax.tx = (e.clientX / innerWidth - 0.5) * 1.6; parallax.ty = -(e.clientY / innerHeight - 0.5) * 0.8; }, { passive: true });
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
    pr = C.phone ? Math.max(1, dpr / 2) : dpr;
    renderer.setPixelRatio(pr);
    renderer.setSize(W, H, false);
    if (camera) { camera.aspect = W / H; camera.updateProjectionMatrix(); }
    if (composer) { composer.setSize(W, H); }
    if (bloom) bloom.resolution.set(Math.max(1, W / 2), Math.max(1, H / 2));
  }
  C.stop = function () { C.running = false; };
  C.resume = function () { if (renderer && !C.running) { C.running = true; clock.last = 0; requestAnimationFrame(frame); } };
  // the catalogue, newest first: one tower each (12.3)
  C.setCatalogue = function (tracks) {
    towers.length = 0;
    (tracks || []).forEach(function (t, i) {
      const a = i * 137.5 * Math.PI / 180, r = 6 + 1.8 * Math.sqrt(i);
      const blocks = Math.max(6, Math.min(40, Math.round((t.duration || 100) / 6)));
      towers.push({ id: i, slug: t.slug, x: Math.cos(a) * r, z: Math.sin(a) * r, blocks: blocks, kind: t.model === 'fast' ? 'fast' : t.model === 'best' ? 'best' : 'other', voice: !!t.voice });
    });
    if (!scene) return;
    scene.remove(cat); cat.geometry.dispose();
    const camXZ = new THREE.Vector2(pose.pos.x, pose.pos.z);
    cat = buildBlocks(towers, camXZ);
    cat.visible = C.view !== 'dead';
    scene.add(cat);
    if (C.playing) { const t = towerOf(C.playing); blockUniforms.uPlaying.value = t ? t.id : -99; cam.target.copy(targetFor(C.playing)); }
  };
  // the playing tower: the camera orbits it; ms > 0 flies there (through the tunnel when asked)
  C.setPlaying = function (slug, ms, withTunnel) {
    C.playing = slug;
    const t = towerOf(slug);
    blockUniforms.uPlaying.value = t ? t.id : -99;
    if (!scene) return;
    cam.target.copy(targetFor(slug));
    if (ms > 0) { fly(ms, 3); if (withTunnel && !reduced) C.tunnel(ms); }
  };
  C.tunnel = function (ms) { tunnelUntil = performance.now() + (ms || 1200); C.tunnelOn = true; };
  C.setView = function (view, ms) { if (!scene) { C.view = view; return; } applyView(view, ms == null ? settings.flight : ms); };
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
    horizon.material.color = tok.magenta;
    buildBars();
  };
  C.deadBuild = function (n) { deadBlocks = n; };
  C.postOff = function () {
    C.bloomOn = false; C.chromaOn = false;
    if (bloom) bloom.enabled = false; if (chroma) chroma.enabled = false;
  };

  /* ---- the frame ---- */
  const tmpV = new THREE.Vector3(), tmpR = new THREE.Vector3(), tmpU = new THREE.Vector3(0, 1, 0), tmpM = new THREE.Matrix4(), tmpS = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpP = new THREE.Vector3();
  function ease(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function frame(now) {
    if (!C.running) return;
    requestAnimationFrame(frame);
    if (document.hidden) { clock.last = 0; return; }
    const dt = clock.last ? Math.min(0.1, (now - clock.last) / 1000) : 0.016;
    clock.last = now; clock.t += dt;
    const t0 = performance.now();
    const A = NOBODY.vis && NOBODY.vis.analyser;

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

    // the camera
    cam.angle += cam.speed * dt;
    orbitPose(tmpV, tmpP);
    if (flight) {
      const k = Math.min(1, (now - flight.t0) / flight.ms), e = ease(k);
      pose.pos.lerpVectors(flight.from.pos, tmpV, e); pose.pos.y += Math.sin(Math.PI * k) * flight.bump;
      pose.look.lerpVectors(flight.from.look, tmpP, e);
      if (k >= 1) { flight = null; C.flying = false; }
    } else { pose.pos.copy(tmpV); pose.look.copy(tmpP); }
    parallax.x += (parallax.tx - parallax.x) * 0.08; parallax.y += (parallax.ty - parallax.y) * 0.08;
    cam.sideNow += (cam.side - cam.sideNow) * (dt / 0.6);
    camera.position.copy(pose.pos);
    camera.lookAt(pose.look);
    tmpR.set(1, 0, 0).applyQuaternion(camera.quaternion);
    // the pan: camera and look-at move together along the camera's right axis, so the tower slides to the side of the frame
    camera.position.addScaledVector(tmpR, parallax.x - cam.sideNow).addScaledVector(tmpU, parallax.y);
    camera.lookAt(tmpP.copy(pose.look).addScaledVector(tmpR, -cam.sideNow));
    sky.position.copy(camera.position);
    gridUniforms.uCam.value.set(camera.position.x, camera.position.z);

    // the tunnel (12.5)
    if (tunnelUntil > now) { tunnelFade = Math.min(1, tunnelFade + dt / 0.15); } else { tunnelFade = Math.max(0, tunnelFade - dt / 0.25); if (tunnelFade === 0) C.tunnelOn = false; }
    tunnel.visible = tunnelFade > 0;
    if (tunnel.visible) { tunnel.material.opacity = tunnelFade * 0.9; tunnel.position.z += 40 * dt; if (tunnel.position.z > -22) tunnel.position.z -= 3; }
    const wantChroma = C.phone ? 0 : (0.0022 + tunnelFade * (0.012 - 0.0022));
    chromaAmt += (wantChroma - chromaAmt) * 0.2;
    if (chroma) chroma.uniforms.uAmount.value = chromaAmt;

    // the ring of bars and the ribbon around the playing tower (12.4); hidden in standby and dead air
    const onAir = C.view !== 'standby' && C.view !== 'dead' && C.playing;
    bars.visible = barsMirror.visible = ribbon.visible = !!onAir;
    if (onAir) {
      const tg = cam.target, base = Math.max(0, tg.y - Math.max(1.5, tg.y));
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
    C.frames++;
    const ms = performance.now() - t0;
    C.ms += (ms - C.ms) * 0.1;
    // the probe (12.3): twelve frames in, a slow machine gets the phone settings, a very slow one loses the bloom
    if (!C.probed && C.frames === 12) {
      C.probed = true;
      if (!NOPROBE) {
        if (C.ms > 120) { C.postOff(); if (NOBODY.term && NOBODY.term.log) NOBODY.term.print('city: bloom off. this machine is slow. nobody minds.', 'mid'); }
        else if (C.ms > 50 && !C.phone) { Object.assign(settings, PHONE); bloom.strength = settings.bloom[0]; bloom.radius = settings.bloom[1]; bloom.threshold = settings.bloom[2]; pr = Math.max(1, pr / 2); renderer.setPixelRatio(pr); composer.setPixelRatio(pr); }
      }
    }
  }

  C.dispose = function () {
    C.running = false;
    window.removeEventListener('resize', sizeUp);
    try { if (composer) composer.dispose(); if (renderer) renderer.dispose(); } catch (e) {}
  };
  return C;
}

NOBODY.themes.city = (function () {
  const TH = { name: 'city', blurb: 'a city of data at night. neon, glass, bloom.' };
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx = null, V = null, A = null, glass = null, power = null, S = null;
  let scene = null, canvas = null, cssgrid = null, horizon = null, scanrect = null, odoRing = null, nocityTimer = 0;
  let scopeCanvas = null, scopeCtx = null, volRing = null, dialStrip = null, pendingView = null;
  let gainHold = 1;
  function el(id) { return ctx.el[id] || document.getElementById(id); }
  function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

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
    switched: 'theme: city. the glass goes flat and the city comes up.',
    idle: 'idle. paused for ten minutes. the city turns anyway.'
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
    sceneUp();
    // without the CDN there is no scene within two seconds; the body says so and the CSS gradient carries the page (12.11)
    nocityTimer = setTimeout(function () { if (!scene) document.body.classList.add('nocity'); }, 2000);
    if (window.NOBODY_NOCDN) document.body.classList.add('nocity');
    TH.resize();
  };
  TH.dispose = function () {
    clearTimeout(nocityTimer);
    if (scene) { scene.dispose(); scene = null; }
    [canvas, cssgrid, horizon, scanrect, odoRing].forEach(function (n) { if (n) n.remove(); });
    canvas = cssgrid = horizon = scanrect = odoRing = null;
    el('scope').textContent = ''; scopeCanvas = null; scopeCtx = null;
    el('progress').textContent = ''; el('hdrBar').className = 'dim'; el('hdrBar').textContent = '............';
    el('dial').textContent = ''; dialStrip = null; volRing = null;
    el('readout').classList.remove('typing'); el('transmitter').classList.remove('tuning-state');
    document.body.classList.remove('nocity');
    glass.classList.remove('closing', 'bloom-on');
    el('towerStatic').textContent = ''; el('towerStatic').hidden = true;
  };
  function sceneUp() {
    const L = ctx.libs();
    if (scene || !L || !L.THREE || !L.passes) return;
    try {
      scene = makeCityScene(L.THREE, L.passes);
      if (!scene.start(canvas, { phone: V.phone() })) { scene = null; document.body.classList.add('nocity'); return; }
      document.body.classList.remove('nocity');
      scene.setCatalogue(S.tracks);
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
      return new Promise(function (res) { glass.classList.add('closing'); setTimeout(function () { glass.classList.add('off'); glass.classList.remove('closing'); res(); }, 380); });
    }
    if (to === 'air') {
      flash();
      glass.classList.add('bloom-on'); setTimeout(function () { glass.classList.remove('bloom-on'); }, 300);
      if (scene) scene.setView('home', 0); else pendingView = { view: 'home' };
      return Promise.resolve();
    }
    if (to === 'tuning') {
      if (scene) scene.setPlaying(info.slug, info.ms || 1200, true); else pendingView = { view: 'home', playing: info.slug };
      return Promise.resolve();
    }
    if (to === 'playing') { if (scene) scene.setPlaying(info.slug, 0); return Promise.resolve(); }
    if (to === 'page' || to === 'guestbook' || to === 'home' || to === 'dead') {
      if (scene) { if (info.slug) scene.setPlaying(info.slug, 0); scene.setView(viewOf(to), from === 'switch' ? 0 : flightMs); } else pendingView = { view: viewOf(to), playing: info.slug };
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  function flash() {
    power.classList.remove('fade'); power.classList.add('on');
    setTimeout(function () { power.classList.add('fade'); setTimeout(function () { power.classList.remove('on', 'fade'); }, 140); }, 20);
  }

  /* ---- scene hooks ---- */
  TH.catalogue = function (tracks) { if (scene) scene.setCatalogue(tracks); };
  TH.playing = function (slug) { if (scene) scene.setPlaying(slug, 0); };
  TH.scheme = function () { if (scene) scene.scheme(); };
  TH.state = function () {
    return scene ? { running: scene.running, frames: scene.frames, ms: +scene.ms.toFixed(1), bloom: scene.bloomOn, chroma: scene.chromaOn, view: scene.view, playing: scene.playing, flying: scene.flying, tunnel: scene.tunnelOn, phone: scene.phone, nocity: false }
      : { running: false, nocity: document.body.classList.contains('nocity') };
  };

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
  // the volume is a HUD ring (12.4, 12.7): ten ticks, the number in the middle; a click by angle, the centre mutes
  TH.volume = function (volEl, v, muted, phone) {
    if (!volRing) volRing = ring(volEl, { ticks: 10 });
    volRing.set(v, muted);
    return { hit: function (x, y) { return volRing.hit(x, y); } };
  };
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
