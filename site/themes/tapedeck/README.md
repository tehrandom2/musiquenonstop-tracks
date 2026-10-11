# theme: tapedeck

A cassette on a painting desk at night. One lamp is on, top right; the rest of the room is dark brown.
Ported for issue #28 from the look of an earlier project's soundtrack page (a tabletop game's tape deck);
the palette, the type, the cassette and the shelf came across, nothing else did. The station's voice,
commands and data are untouched.

## The look

- **Palette.** `#120d0a` brown-black, cream `#f1e8d3` and `#d8c9af`, burnt orange `#e2553b` (lifted to
  `#ee6a50` as a text colour), deep red `#6e1c0f`, the lamp `#ffb45f`, a teal accent `#8fd6cf`, a gold
  stripe `#dca834`. The second scheme (`amber`, the cheat code) turns the tape over: side B is the cool
  side, the lamp and the orange go teal.
- **Legibility.** Cards are opaque (no text sits on the moving desk); every text tone measures at least
  4.5:1 against its card (`node site/tools/contrast.mjs` prints the pairs); nothing is under 16 px on
  desktop or 15 on a phone; played rows carry the word `played` as well as the faint tone.
- **Type.** Barlow Condensed (700, 800) for labels, the station name, the now-playing title and the pills;
  Permanent Marker for the cassette's hand-lettered label, the tagline and the page titles; IBM Plex Mono
  for the terminal, the catalogue and everything that lines up in columns.
- **The widget.** The cassette: an inline SVG in the transmitter card (the widget slot of design 12.0),
  tilted on the desk. Its reels turn while the deck plays (the chip says `ON AIR`), the tape moves from the
  left hub to the right with the track, the label carries the title, bpm and key, the side and the track
  number. While tuning it lifts out of the deck; on dead air an empty cassette turns slowly on the shelf.
- **The J-card and the cover (issue #88).** Behind the tape stands its case's paper insert: the playing
  track's cover (#73's `NOBODY.cover`, its placeholder when an album has none) printed on the front panel and,
  small, on the tape's label, both through one SVG filter that makes them a photocopy on card (nearly grey,
  the contrast pushed, the tones stepped, warmed to the cream, a grain, a few pale scuffs), a dashed fold, a
  dog-eared corner. The spine is hand-lettered. An album plays as one tape: the label and the spine read the
  album's title, the first half of its tracks is side A and the rest side B, the number counts within the
  side and the track's own title moves to the small print; a single keeps its own label and its spine says
  `single`. While the cover loads, or when no file can be read, the painted square stays. On a phone the
  J-card and the tape stand side by side. A long title takes two lines on the label instead of an ellipsis.
- **Behind the page.** A canvas of 48 warm bars along the foot of the desk, read from the analyser's 64
  bands, and the lamp breathing with the loudness. It lowers its own resolution on a slow machine.
- **The card.** Rounded bars in orange and lamp with cream peaks; a cream scope line; the dial is a
  strip of frequencies under a red needle; the volume is the shared fader (`volume.js`, design 12.0 controls)
  with the lamp as its fill, and the knob with ten ticks stays beside it as decoration, its pointer following
  the level. The progress bar is a cream rail with a lamp fill.

## Files

`theme.css` (tokens, faces, the shelf, the cassette's colours), `theme.js` (the cassette, the knob, the
bars, the lamp, the strings). The fonts are in `../../vendor/` with their licences in
`../../vendor/LICENSES.md`: Barlow Condensed (SIL Open Font License 1.1) and Permanent Marker (Apache
License 2.0), from the Google Fonts builds via the `@fontsource` 5.2.6 packages.

Nobody who built this can hear. The reels turn on the chip's word, not on sound.
