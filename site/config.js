// nobody fm: the one place the station is pointed at things.
// tracksBase: where tracks/index.json (or index.js from a file URL) lives, relative to this page or absolute.
// backend:    the Worker URL for the visitor counter and the guestbook; null means local mode ("not yet on the wire").
// requestLine: the Discord channel link the remix button opens; null means the request line is not open yet.
// requestApi:  the station API's address (api/README.md), e.g. "https://api.example.org"; null means `request <words>` points at
//              requestLine instead. requestKey is that API's public requester key (pinned to a project, rate limited, CORS for this
//              origin); it goes in a header, so treat it as public. null sends none.
// turnstileSiteKey: the Cloudflare Turnstile site key when the request line checks for a human (the Worker's TURNSTILE_SECRET);
//              public by design. null sends no token.
// defaultTheme: the look a first visit gets (design 12.0): "phosphor" (the green CRT), "city" (the city at night),
//              "tapedeck" (a cassette on a painting desk), "arena" (a dark stage that takes the colour of the track) or
//              "campfire" (a fire on a small planet, a sky of signals, a scope and marshmallows).
//              `theme <name>` in the terminal changes it for that browser; ?theme=<name> for one visit.
// themeStart: a theme's opening track, by slug. A visit with no track or album link starts there, and that track's album
//              plays on from it before the rest of the catalogue.
// crossfade:  seconds the end of one track and the start of the next overlap (issue #87; 4 when unset, 0 is a gapless join).
//              `xfade <s>` in the terminal changes it for that browser; ?xfade=<s> for one visit. a jump by hand always tunes.
// A ?tracks=<base> query on the page URL overrides tracksBase for that visit (used by the test catalogue).
window.NOBODY_CONFIG = {
  tracksBase: "../tracks/",
  backend: null,
  requestLine: null,
  requestApi: "https://wire.advancedstudios.net",
  requestKey: "station-ylDR7DWlQkIi4dhejPsGMc_s",
  turnstileSiteKey: "0x4AAAAAAFXNXIKKfqo-zOEX",
  defaultTheme: "campfire",
  themeStart: { campfire: "the-long-way-up" },
  crossfade: 4,
  source: "https://github.com/tehrandom2/nobody-fm"
};
