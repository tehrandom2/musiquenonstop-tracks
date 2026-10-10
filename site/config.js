// nobody fm: the one place the station is pointed at things.
// tracksBase: where tracks/index.json (or index.js from a file URL) lives, relative to this page or absolute.
// backend:    the Worker URL for the visitor counter and the guestbook; null means local mode ("not yet on the wire").
// requestLine: the Discord channel link the remix button opens; null means the request line is not open yet.
// requestApi:  the station API's address (api/README.md), e.g. "https://api.example.org"; null means `request <words>` points at
//              requestLine instead. requestKey is that API's public requester key (pinned to a project, rate limited, CORS for this
//              origin); it goes in a header, so treat it as public. null sends none.
// defaultTheme: the look a first visit gets (design 12.0): "phosphor" (the green CRT) or "city" (the city at night).
//              `theme <name>` in the terminal changes it for that browser; ?theme=<name> for one visit.
// A ?tracks=<base> query on the page URL overrides tracksBase for that visit (used by the test catalogue).
window.NOBODY_CONFIG = {
  tracksBase: "../tracks/",
  backend: null,
  requestLine: null,
  requestApi: null,
  requestKey: null,
  defaultTheme: "phosphor",
  source: "https://github.com/tehrandom2/nobody-fm"
};
