/* nobody fm: the terminal is the real UI (design 4.4, 4.5). the command table lives here; the station
   (station.js) exposes what the commands drive as NOBODY.st. */
window.NOBODY = window.NOBODY || {};
NOBODY.term = (function () {
  const T = { log: null, input: null, cursor: null, history: [], hIndex: -1, maxLines: 6 };

  T.init = function (logEl, inputEl, cursorEl) {
    T.log = logEl; T.input = inputEl; T.cursor = cursorEl;
    T.maxLines = NOBODY.vis.phone() ? 3 : 6;
    inputEl.addEventListener('input', T.grow);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const line = inputEl.value;
        inputEl.value = ''; T.grow();
        if (line.trim()) { T.history.push(line); if (T.history.length > 50) T.history.shift(); }
        T.hIndex = T.history.length;
        T.run(line, true);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (T.history.length) { T.hIndex = Math.max(0, T.hIndex - 1); inputEl.value = T.history[T.hIndex] || ''; T.grow(); }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        T.hIndex = Math.min(T.history.length, T.hIndex + 1); inputEl.value = T.history[T.hIndex] || ''; T.grow();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (inputEl.value) { inputEl.value = ''; T.grow(); } else { inputEl.blur(); NOBODY.st.escape(); }
      } else if (e.key === 'Tab') {
        e.preventDefault();
      } else if (e.key.length === 1 && NOBODY.synth) {
        NOBODY.synth.click();
      }
      e.stopPropagation();
    });
    inputEl.addEventListener('focus', function () { T.cursor.classList.remove('dimcur'); });
    inputEl.addEventListener('blur', function () { T.cursor.classList.add('dimcur'); });
    T.cursor.classList.add('dimcur');
    T.grow();
  };

  T.grow = function () {
    T.input.style.width = (Math.max(1, T.input.value.length + 1)) + 'ch';
  };

  T.focus = function (prefill) {
    if (prefill != null) T.input.value = prefill;
    T.grow();
    T.input.focus();
    try { T.input.setSelectionRange(T.input.value.length, T.input.value.length); } catch (e) {}
  };

  // prints one line; cls may be 'err' (inverse amber, two blinks, stays amber), 'amber', 'mid', 'print'
  T.print = function (text, cls) {
    const lines = String(text == null ? '' : text).split('\n');
    lines.forEach(function (l) {
      const div = document.createElement('div');
      div.className = 'line' + (cls ? ' ' + cls : '') + (cls === 'err' ? ' blink' : '');
      div.textContent = l;
      T.log.appendChild(div);
    });
    while (T.log.children.length > T.maxLines) T.log.removeChild(T.log.firstChild);
  };
  T.error = function (text) {
    T.print(text, 'err');
    document.body.classList.add('amber-cursor');
    setTimeout(function () { document.body.classList.remove('amber-cursor'); }, 1500);
  };
  T.clear = function () { T.log.textContent = ''; };
  // the log grows past 6 lines for the BBS-style help scroll; it is printed in the printout face
  T.printScroll = function (lines) {
    const keep = T.maxLines;
    T.maxLines = Math.max(keep, lines.length + 2);
    lines.forEach(function (l) { T.print(l, 'print'); });
    T.log.style.height = 'auto';
    T.log.style.maxHeight = 'none';
    T.scrollRestore = function () { T.maxLines = keep; T.log.style.height = ''; T.log.style.maxHeight = ''; while (T.log.children.length > keep) T.log.removeChild(T.log.firstChild); };
  };

  const cmds = {};
  const st = function () { return NOBODY.st; };

  // the commands (4.4)
  cmds.play = function (a) { return st().cmdPlay(a); };
  cmds.pause = function () { return st().pause(); };
  cmds.stop = function () { return st().stop(); };
  cmds.next = function () { return st().next(); };
  cmds.prev = function () { return st().prev(); };
  cmds.queue = function (a) { return a ? st().queueAdd(a) : st().queueList(); };
  cmds.shuffle = function () { return st().toggleShuffle(); };
  cmds.repeat = function () { return st().repeatOnce(); };
  cmds.vol = function (a) { return a === '' ? st().volText() : st().setVol(a); };
  cmds.volume = cmds.vol;
  cmds.list = function (a) { return st().list(a); };
  cmds.find = function (a) { return st().setFilter(a); };
  cmds.info = function (a) { return st().info(a); };
  cmds.cat = function (a) { return st().cat(a); };
  cmds.tree = function () { return st().tree(); };
  cmds.seed = function (a) { return st().copySeed(a); };
  cmds.prompt = function (a) { return st().copyPrompt(a); };
  cmds.take = function (a) { return st().take(a); };
  cmds.remix = function (a) { return st().remix(a); };
  cmds.request = function (a) { return st().request(a); };
  cmds.guestbook = function () { return st().openGuestbook(); };
  cmds.sign = function (a) {
    const m = /^([^:]{1,24}):\s*(.+)$/.exec(a || '');
    if (!m) return T.error('sign <name>: <line>');
    return st().sign(m[1].trim(), m[2].trim());
  };
  cmds.count = function () { return st().count(); };
  cmds.uptime = function () { return T.print('on air ' + st().uptimeText() + '. nobody stops.'); };
  cmds.date = function () { const d = new Date(); return T.print(d.toISOString().slice(0, 10) + ' ' + d.toTimeString().slice(0, 8) + ' local. 2 a.m. is the best hour.'); };
  cmds.dial = function (a) { return st().dial(a); };
  cmds.amber = function () { return st().phosphor('amber'); };
  cmds.green = function () { return st().phosphor('green'); };
  cmds.help = function () { return st().help(true); };
  cmds['?'] = cmds.help;
  cmds.clear = function () { T.clear(); if (T.scrollRestore) { T.scrollRestore(); T.scrollRestore = null; } };
  cmds.cls = cmds.clear;
  cmds.home = function () { return st().home(); };
  cmds.reboot = function () { return st().reboot(); };
  cmds.mute = function () { return st().mute(); };
  cmds.clicks = function () { return st().clicks(); };
  cmds.tower = function () { return T.print('it is a tower. it turns. nobody lives there.'); };
  cmds.theme = function (a) { return st().theme(a); };
  cmds.skin = cmds.theme;
  cmds.source = function () { return st().source(); };
  cmds.big = function (a) { return st().big(a); };
  cmds.contrast = function () { return st().contrast(); };
  cmds.ident = function () { return st().ident(); };
  cmds['88.8'] = function () { return st().ident(); };
  cmds.unmute = function () { return st().mute(); };

  // the jokes (4.4), harmless, one line each
  cmds.who = function () { T.print('nobody.'); };
  cmds.whoami = cmds.who; cmds.finger = cmds.who;
  cmds.hello = function () { T.print('hello. it never stops.'); };
  cmds.hi = cmds.hello;
  cmds.sudo = function (a) { T.print('nobody has permission. everybody has permission. go ahead.'); if (a) T.run(a, false); };
  cmds.rm = function () { T.print('the catalogue is read-only. nice try.'); };
  cmds.format = cmds.rm; cmds.del = cmds.rm; cmds.erase = cmds.rm; cmds.mkfs = cmds.rm;
  cmds.exit = function () { T.print('there is no exit. there is the next track.'); st().next(); };
  cmds.quit = cmds.exit; cmds.logout = cmds.exit;
  cmds.ls = function () { return st().ls(); };
  cmds.dir = cmds.ls;
  cmds.fortune = function () { return st().fortune(); };
  cmds.make = function (a) { T.print('not war. not coffee. music.'); };
  cmds.ping = function () { T.print('pong. 88.8 ms.'); };
  cmds.dance = function () { st().dance(); T.print('bars upside down for ten seconds. nobody is watching.'); };
  cmds.matrix = function () { T.print('green on black is older than that. this one has a modem.'); };
  cmds.nobody = function () { T.print('yes?'); };
  cmds.cd = function () { T.print('there is one folder. you are in it.'); };
  cmds.pwd = function () { T.print('the roof.'); };
  cmds.man = function (a) { T.print('nobody wrote a manual. try help.'); };
  cmds.echo = function (a) { T.print(a || ''); };
  cmds.cat_ = null;

  // runs one typed line. echo=true prints the line into the log like a real prompt would scroll it.
  T.run = function (line, echo) {
    const raw = line.trim();
    if (!raw) return;
    if (echo) T.print('nobody> ' + raw, 'mid');
    const sp = raw.indexOf(' ');
    let word = (sp < 0 ? raw : raw.slice(0, sp)).toLowerCase();
    const arg = sp < 0 ? '' : raw.slice(sp + 1).trim();
    // number alone: 88.8 is the ident, any other frequency is a dial
    if (/^\d+(\.\d+)?$/.test(word) && arg === '') {
      if (word === '88.8') return cmds['88.8']();
      return cmds.dial(word);
    }
    if (word === 'rm' || word === 'del' || word === 'format' || word === 'erase') return cmds.rm();
    if (word === 'make') return cmds.make(arg);
    const fn = cmds[word];
    if (!fn) { T.error('nobody knows "' + word + '". try help.'); return; }
    try { return fn(arg, raw); } catch (e) { T.error('that command fell over: ' + (e && e.message ? e.message : e)); }
  };
  T.commands = cmds;

  // a theme's own commands (design 12.0, the interface hooks, issue #53): merged under the theme's name while it is on,
  // taken out on dispose; a name that collides with a core command is refused and printed once. help lists them.
  const EXT = {};
  T.extend = function (name, table) {
    T.retract(name);
    const names = [], refused = [];
    Object.keys(table || {}).forEach(function (k) {
      if (cmds[k]) { refused.push(k); return; }
      cmds[k] = table[k]; names.push(k);
    });
    EXT[name] = names;
    if (refused.length) T.print(name + ': ' + refused.join(', ') + ' already ' + (refused.length === 1 ? 'means' : 'mean') + ' something. refused.', 'amber');
    return names;
  };
  T.retract = function (name) {
    (EXT[name] || []).forEach(function (k) { delete cmds[k]; });
    delete EXT[name];
  };
  T.extensions = function () { return Object.keys(EXT).map(function (n) { return { name: n, commands: EXT[n].slice() }; }); };
  return T;
})();
