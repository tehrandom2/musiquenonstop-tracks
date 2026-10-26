# theme: city

A city of data at night, seen from the air: the second look (design 12.1 to 12.13, ADR 0008), and since issue #53
the fly-through (`docs/city-flythrough.md`, design 12.0 "the interface paradigm", 12.17): the catalogue is a street
city built from the index's measured numbers and the camera is the cursor. Towers of glowing translucent blocks on a
street grid, one per track, the camera flying the streets between them. Since issue #240 the playing tower is the meter, a track's story is a dossier
in the home view, and the queue is a flight plan.

- **Palette.** Cyan `#19F0FF`, magenta `#FF2BD6`, violet `#8B5CF6`, a green beacon `#B4FF39`, amber
  `#FFB020` for warnings, ink `#E8F1FF` on `#020309`. The second scheme (`amber`, the cheat code) makes it a
  sunset and the warnings go cyan.
- **Type.** Orbitron (variable) as the display face; IBM Plex Mono as the data face.
- **The widget.** None in the transmitter card: the city's signature is the scene behind the page (the
  playing tower as the meter, its searchlights, the ring of 64 bars and the ribbon around it). `widget()` answers `null`. The progress bar is
  a rail with a glowing head, the dial a strip of frequencies, the volume the shared fader (`volume.js`,
  design 12.0 controls) with the deep gradient as its fill and a cyan handle; the HUD ring stays on the counter.
- **Behind the page.** The three.js scene with bloom and chromatic fringing, on `NOBODY.libs` from the
  CDN; without it the body says `nocity` and a CSS perspective grid stands in.
- **Dead air.** The scene's unlit tower building block by block, or a CSS tower in the card without the
  scene.
- **The fly-through.** Two layouts of the home view: the air (the cards folded to the edges, the city in hand) and
  the deck (the cards in their column). Tempo is a tower's height, duration its width, loudness its glow, brightness
  its crown, boominess its base, the tier its hue, a voice its beacon, age its edge light; `project` or a mood family
  is its district, the date its street. In the air it is free flight (issue #110, `docs/city-flythrough.md` section 21):
  a drag aims the view and it stays aimed, `w`/`s` or `up`/`down` fly forward and back along the view, `a`/`d` or
  `left`/`right` slide sideways, `e` rises and `shift` sinks, `z`/`x` turn, the wheel moves along the view; nothing else
  moves the camera, and a track change moves only the beam and the edge marker. A click on a tower reads its dossier and a second click glides there and
  plays it (the pointer is a hand there and the tower lifts), `j`/`k` glide to the next tower, `enter` plays the cursor tower,
  `q` queues it, `f` or `esc` the list view (the deck), `h` the hint bar, `t` the themes, `shift`+`left`/`right` the 5 s
  seek, `shift`+`s` the shuffle; space stays the station's pause. On a phone one finger aims, two fingers fly, a tap is
  the hover, a second tap plays. Commands: `fly [slug]`, `deck`, `route`, `cruise`, `land`, `district [name]`, `where`.
  The hidden mode is the auto-fly: a slow glide on a smooth curve round the playing tower, taken back by any camera key
  and picked up again after 20 s without input. Without the scene, or when it stops drawing, the air says so and `f` is
  the list.

- **One view (issue #240, design 12.23).** No track page and no escape back from it: the city answers the core's `story()` hook.
  The playing track's story folds into the NOW PLAYING card as HUD tabs (STORY: asked, album and place, date, tier, project, why;
  LYRICS; NUMBERS; TAKES: the seed, the kept takes, the rejected seeds; LINEAGE; FILE: `cat`, the licence, take it home). The
  numbers are gauges, each named for the part of its tower it built (tempo the height, loudness the glow, brightness the crown,
  boominess the base) with the gate's `ok` or `FAIL`. In the air the tabs stay folded until one is clicked (or `i`), so the city
  keeps its room; in the deck they are open. A click on a tower, a click on a row, `i` on a highlighted row or a `#/track/` link
  *inspects*: the music carries on and a floating dossier opens (INSPECTING, the title, `> play`, `next`, `+ plan`, `remix`, the
  same tabs). In the air it stands beside its tower with a leader line to the crown (anchored lower down the tower's axis when the
  crown is under the header), the camera glides to face it, and a second click on the same tower plays it; in the deck it is a
  card under NOW PLAYING. `esc` goes back to what plays.
- **The flight plan (issue #240).** The queue as the route's waypoints: the listener's own picks numbered `01 02 ...` in green
  (the same green as the light pillars over their towers and the pins on the street), dragged to reorder (a lifted waypoint and a
  magenta insertion line), `x` to drop, `clear` for all of yours; then `THEN AUTO` with the core's context line and the next six of
  the rotation in the dim ink, each with `+` to make it yours. A focused waypoint takes the arrows (move), `x`, delete or backspace
  (drop) and enter (read it). `u`, `d` and `x` move or drop the highlighted waypoint in the deck; in the air `d` and `x` fly, so
  there `u` alone. In the air the plan stands beside NOW PLAYING with the catalogue rail above it; in the deck it is a card above
  the catalogue, its waypoints in columns. The route ribbon runs magenta to violet through yours and goes the dim ink where the
  rotation takes over.
- **The meter (issue #240).** The playing tower is the visualiser: each floor reads the analyser band at its height (lows at the
  foot, highs at the crown) and burns toward white at the top of its range; the crown flares and lifts on a kick (the bass rising
  over its own running mean); three searchlights on the crown, cyan, magenta, cyan, sweep the sky and flare on an onset (the
  spectral flux over its mean), sweeping faster for a big one; the towers within 16 units shimmer their window grids with the
  highs. The ring of 64 bars stays, thinner and lower. In the deck the card's analyser is a skyline: each band a building with its
  windows lit up to the level and a beacon on the roof at the held peak. `prefers-reduced-motion` keeps the floors and the
  searchlights standing still, and drops the kick, the window shimmer, the sweep and the skyline's changing windows. The car view (#220) keeps the city it had: the meter, the searchlights and
  the shimmer are off under `html[data-view=car]`. `state().meter` reports the bands, the kick and onset envelopes and counts, the
  searchlights and the waypoint pillars; `state().dossier` the inspected slug, the docked and floating state, the leader, the plan.
  Nobody who built this heard it: every line here is about pictures driven by the analyser's numbers.

Files: `theme.css`, `theme.js`. Fonts: Orbitron and IBM Plex Mono, both SIL Open Font License 1.1, in
`../../vendor/` with the licences in `../../vendor/LICENSES.md`. The harness runs this theme's Chrome on
ANGLE over SwiftShader (software WebGL).
