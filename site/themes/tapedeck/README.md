# theme: tapedeck

A portable cassette player of the 1980s, face-on, on a workbench in daylight (issue #240). It is an original object:
no maker's name, no logo, no model name, no copy of any real product's shape, proportions, colours or key layout. The
first tape deck (issue #28, a cassette on a painting desk at night) became too close to the campfire; this one is the
opposite of the campfire: day, metal, plastic, machined, flat on a bench. The station's voice, commands and data are
untouched.

## The look

- **The bench.** A pale pegboard under a cool overhead light (CSS; a canvas behind the page adds the light pool,
  a touch brighter with the loudness). The second scheme (`amber`, the cheat code) turns the tape over: side B goes cool,
  the orange stripe and the cue key go cobalt.
- **The player** is the transmitter card: a brushed plate (fine horizontal grain, a soft sheen) in a 14 px graphite
  body, one stripe of signal orange across its foot.
  - **Six piano keys** on the top edge, tall blocks with their sides showing: `REC` (a red dot; inert, this player only
    plays), `REW`, `PLAY`, `FF`, `STOP`, and an orange `CUE`. REW, PLAY, FF and CUE *are* the station's four fat buttons
    (`#fatPrev`, `#fatPlay`, `#fatNext`, `#fatQueue`), placed and drawn here, their handlers untouched; STOP is the
    station's `stop`. A key goes down by its depth; PLAY stays down (latched) while the chip says `ON AIR`. Every press
    shakes the body by 2 px: the clack, drawn.
  - **The window**: smoked plastic over the cassette of 12.14 (the hand-lettered label, the photocopied cover, the reels
    turning on the chip's word, the tape packs moving hub to hub with the track).
  - **The counter**: three white drums on black, the seconds on the tape.
  - **The battery door**, left open on two big D cells: plain bands, `1.5V` and `D`, no maker. Four little bars beside it
    run down over four hours of listening; a reload puts fresh cells in.
  - **The VU meter**: a cream face, -20 to +3 with a red zone, a needle driven by the loudness through a damped spring
    (it swings past and settles), a lamp behind it while playing.
  - **The level meter**: the card's analyser, a ladder of LEDs per band (green, amber, red at the top) in a black window;
    the scope is a green trace beside its legend.
  - **The belt clip**, plated steel seen from the side, on the right edge; the **headphone jack** on the top edge with
    its cable running off the bench.
  - The shared fader (`volume.js`) is a recessed slot with a ribbed slider cap; beside it a thumbwheel whose ribs roll
    with the level (decoration, it takes no click).
- **One view (design 12.23).** The J-card lies open to the left of the player and is the story: the cover photocopied on
  its front panel, the spine hand-lettered, then the facts and paper tabs (`STORY`, `PROMPT`, `LYRICS` when there are
  words, `TAKES`, `NUMBERS`, `LINEAGE` when it has one). It follows what plays; a click on a title anywhere (the rack, the
  running order, a lineage link) *inspects* that track instead: the card says `LOOKING AT`, takes an orange edge, and offers
  `play now`, `play next`, `add to queue`, `remix` and `back to the tape`; the music does not change. On what plays it offers
  `remix this`, `take it home`, `copy seed`, `copy prompt`. `i` folds it.
- **The running order** is an index card to the right (red margin, blue rules): what is `ON`, then `SIDE A` (yours, in your
  order: drag a line by its number, or `↑` `↓`, and `x` to drop it; `clear yours`), then `SIDE B` (the next twelve of the
  rotation, each with `+` to put it next).
- **The rack.** The catalogue is a row of cassette spines in a graphite rack, a coloured band on each; a click on a spine
  plays it, a click on its title inspects it.
- **Hidden mode.** The canvas draws the player's face through `site/vis/tapedeck.js` (issue #247), the same module the studio
  game projects: the window with the reels, the VU needle on a spring, a scope strip and a ladder of level LEDs, fed the analyser's
  numbers as an AnalyserNode's bytes. All-zero bytes are the radio off: the needle rests, the reels stop, one lamp walks the ladder.
  A file URL cannot import the module; there the canvas's own close-up stands in.
- **Legibility.** Every word is on an opaque surface: dark ink on the plate, the paper and the card; pale ink on the
  graphite. Data text is 16 px (15 on a phone); legends are 12 px or more.
- **The car view (#220)** is unchanged: its tokens are the first tape deck's values written out, its face is still Barlow
  Condensed, and the bench, the canvas and the player never show behind it.

## Type

Michroma (wide, extended) for the silk-screened legends on the metal and the plastic; IBM Plex Mono for everything that
lines up, and for the buttons; Permanent Marker for the hand-lettered titles (the tape's label, the J-card's spine, the
title on the plate and the story). Barlow Condensed stays only for the car view.

## Files

`theme.css` (tokens, faces, the bench, the player, the J-card, the index card, the rack), `theme.js` (the cassette, the
keys, the VU meter, the counter, the cells, the clip, the story, the running order, the level meter, the canvas, the
strings). The fonts are in `../../vendor/` with their licences in `../../vendor/LICENSES.md`: Michroma and Barlow Condensed
(SIL Open Font License 1.1), Permanent Marker (Apache License 2.0), IBM Plex Mono (SIL Open Font License 1.1).

Nobody who built this can hear. The reels turn on the chip's word, the needle on the analyser's numbers, not on sound.
