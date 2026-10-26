# theme: campfire

Night on a small wooded planet (issue #64, design 12.18). You sit on a log by a fire at the edge of a clearing, a little
cabin behind you, pines round about and a ridge on the left, the ground curving away close enough to see. Overhead a deep
blue sky turns slowly, and every track in the catalogue is a signal out there among the stars and the worlds. Raise the
scope and sweep the sky on a frequency: the track itself fades in, low-passed and distant, clearer as you home in; hold
steady, or press `l`, and it locks on, plays, and goes into the camp journal. And there are marshmallows.

campfire: a tribute to quiet space adventures, made from scratch here. Nothing in it is anyone else's.

## What is ours

Everything. The scene is three.js primitives (an icosahedron for the planet, cones and cylinders for the pines and the
logs, a lathe for the marshmallow), our own shaders (the sky, the flames, the worlds, the marshmallow's toast), our own Web
Audio synthesis (the fire's crackle and breath, the wind, the scope's static, the lock chime, a short plucked-and-reed
ident in our own phrase). No art, models, textures, screenshots, music, sounds, logo, fonts, names or terms of anyone
else's work are used, traced or referenced as images. No game, studio or character is named anywhere in the theme; the
credit line above is shown in the theme's footer and under the camp (issue #116).

## The interface (issue #240)

Not boards: three materials of the camp's own. Night glass (deep indigo, a starlit edge, a small constellation in the corner, the
hand for labels) for what the station says; paper in pencil for what you keep (the journal, the MAKE A TRACK slip, the torn slip
by the reticle); and the receiver for what plays: a round handheld set in a brass rim at the top right, a green trace on its face,
the frequency and `locked` under it, the transport as brass knobs and the time on a stitched strap.

The camp journal at the lower left is the one view: the left page is the signal (what plays, or what you are looking at, with five
ribbon bookmarks: story, prompt, words, takes, lineage), the right page is the route (yours, in your order: drag by the notch, up,
down, cross out, rub out mine; then the rotation in faint pencil). The fire joins the sky as the visualizer: taller flames on the
low end, sparks on the kick, the light on the trees with the loudness. Design 12.18 has the details.

## The visualiser module (issue #247)

`site/vis/campfire.js` is the camp as a flat 2D painting for the studio game's building (`info = {context: '2d', w: 512, h: 288}`;
`create(opts)` gives `draw(ctx, freqBytes, timeBytes, t)`, `setTrack`, `resize`, `destroy`; the caller owns the loop). It is the
same camp as the 3D scene: a deep blue sky over the curve of a small planet, the low sun's glow, pines, and a fire in the middle.
The low end warms the dust band and stands the flames taller, the middle lifts the curtains of light, the highs ripple them and
quicken the stars, a kick throws sparks and makes the playing signal breathe, the light on the trees swells with the loudness.
All-zero bytes are the radio off: the fire burns low on its own. Options: `caption: false` (no title in the corner),
`reduced: true`. The theme draws its no-WebGL stand-in with it (over http; a file URL keeps the painted night), never in the car view.

## The worlds

Each was designed from a one-line concept, in our own shapes and palette (warm firelight against a deep blue night), on its
own orbit round a big low sun, lit by it, with its own period and spin. None has a name.

- **The home world.** The small wooded planet you sit on: dark green turf, a dirt clearing, a ridge of grey rock, low-poly pines.
- **The pair.** Two rose-and-ochre dune worlds turning round each other, one pouring a thin golden stream of sand to the other.
- **The sea.** A deep teal ocean world with three storms turning in its white cloud.
- **The thorns.** A dark plum world bristling with crooked thorns, wrapped in a pale lilac fog that drifts.
- **The ice.** A small rough lump of pale-blue ice on a long, eccentric orbit, with a straight blue tail and a curved warm one, longer near the sun.
- **The moon.** A small grey pocked moon circling high over the home world.
- **The shell.** A dark cracked world with a hole in its crust, cool light in the cracks, shedding pieces down into a black core.
- **The sun.** Big and low on the horizon; over a long, slow loop it swells a little and reddens, then comes back. Nothing more.
- **The platform.** A little ring-and-panels station close to the sun, a light blinking on its hub.

## The constellation (issue #84)

The tracks are the sky's stars, on spiral arms that run out from one bright centre called home: an album is an arm, in its
own order; each frequency's tracks on no album make one more. It is a map: zoom from the whole sky round home down to one
arm, where the stars stand apart with their titles. A reticle stays in the middle and the sky moves under it; the star in it
is the one you have. A track's story opens in the camp journal (issue #240); its full page, reached by `info <slug>`, is still a reel thrown by a
projector on a stump onto a sheet between two trees. `?camplist=list` gives the camp the right-hand column instead, and then a frequency lives round a world: its signals
sit in a loose spiral round it and travel the orbit with it.

## Using it

| | desktop | phone |
|---|---|---|
| move the sky | drag, or walk an arm with the arrows (left and right along it, up and down to the next) | drag |
| zoom | the wheel, `+` `-`, or the buttons on the right; `Home` (or `home`) flies back to the whole sky | pinch, or the buttons |
| the star in the reticle | `enter` plays it, `q` queues it; its slip has play, next, queue and its story (in the journal); a click on a star brings it in | tap a star, then the slip |
| what the sky shows | `w` `e`, `freq <name>`, `freq all`, or a row of the board: the whole sky, an album, a feel | the list under the header |
| the scope | `z` (tap to toggle, hold to peek), the right button held, or `[ scope ]`; it zooms too | `[ scope ]`, pinch to zoom it |
| lock on | hold steady, `l`, `enter`, or a click in the scope | hold steady or tap |
| marshmallow | `h` skewers one; hold `h` to toast; tap `h` (or `x`) to eat | `[ marshmallow ]`: tap, hold, tap |
| the deck | `f` | `[ deck ]` in the catalogue |
| hide | `` ` `` | two fingers, twice |
| the sky with the music | `v` (on by default) | |
| the camp's sounds | `[ sounds on ]` and the slider by the fire, or in the help | the same in the dash |

The station's own keys are unchanged (12.0): `space` plays and pauses, `q` queues the locked signal onto the route (drawn
as a dotted line between the signals), `/` finds (the matching signals blaze, the rest go quiet) and then `j` and `k`
swing the scope onto each match, `m` mutes, `tab` and `:` open the terminal. Commands: `scope`, `freq [name]`, `lock`,
`toast`, `tally`, `camp`, `camp sounds off|on|0..100`, `camp sky off|on`.

There is no station visualizer here, in any view (issue #82): the sky is the visualizer. The playing track, read from the
analyser's numbers, gently widens and warms the dust band (the low end), stirs it and lifts the curtains of light (the middle),
ripples and shimmers the curtains and quickens the stars' twinkle (the highs), and the playing signal breathes on the kick.
Paused, it settles back to the sky's own slow breathing; with reduced motion it moves much less; `v` lets the sky keep its own
time and brings the music back (remembered in this browser). Behind the hidden interface the view looks up into the sky.

The marshmallow toasts through raw, warm, golden, brown, black and charred, swells, bubbles, steams, and catches fire if
you leave it in; pulled back, a burning one burns on a moment and goes out smoking. Eating one takes two bites and a puff
of sugar. A golden one is carved into the log across the fire (a tally kept in this browser, `localStorage
["nobody.campfire.golden"]`); a burnt one gets a dry line.

Sound: the preview is the track's own file through a lowpass, a pan and a gain into the station's gain (the mute), never
into the analyser; the deck ducks under the scope. The camp's own sounds (the fire, the wind, the static, the chime, the
ident, the bite) share one gain that `[ sounds on ]`, its slider and `camp sounds` set, remembered in this browser
(`localStorage["nobody.campfire.sounds"]`); the station's volume is not touched. All of it is quiet and all of it is muted by
`?mute=1`. Nobody who built this heard any of it.

## Files and fonts

`theme.css`, `theme.js`. Fonts: Barlow Condensed (display), JetBrains Mono (data), both SIL Open Font License 1.1, and
Patrick Hand (the camp journal's hand), SIL Open Font License 1.1, all in `../../vendor/` with their licences in
`../../vendor/LICENSES.md`. Without the CDN there is no scene: the body says `nocamp`, a painted night and a CSS fire
stand in, and the list is the sky. The harness runs this theme's Chrome on ANGLE (SwiftShader by default, `--angle d3d11`
for the real card) and its own scenarios are `--only camp` (the camp with its column, `?camplist=list`) and `--only camplist`
(the constellation, the scope's helpers and the projector; `--camp-tracks` a catalogue with albums for the album arms and covers).
The boards' frames are dark card (`?campframe=canvas` and `?campframe=wood` show the other two).
