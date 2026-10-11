# theme: campfire

Night on a small wooded planet (issue #64, design 12.18). You sit on a log by a fire at the edge of a clearing, a little
cabin behind you, pines round about and a ridge on the left, the ground curving away close enough to see. Overhead a deep
blue sky turns slowly, and every track in the catalogue is a signal out there among the stars and the worlds. Raise the
scope and sweep the sky on a frequency: the track itself fades in, low-passed and distant, clearer as you home in; hold
steady, or press `l`, and it locks on, plays, and goes into the camp journal. And there are marshmallows.

campfire is a fan tribute inspired by Outer Wilds (Mobius Digital). Not affiliated with or endorsed by its makers. Nothing here is theirs; everything was made from scratch.

## What is ours

Everything. The scene is three.js primitives (an icosahedron for the planet, cones and cylinders for the pines and the
logs, a lathe for the marshmallow), our own shaders (the sky, the flames, the worlds, the marshmallow's toast), our own Web
Audio synthesis (the fire's crackle and breath, the wind, the scope's static, the lock chime, a short plucked-and-reed
ident in our own phrase). No art, models, textures, screenshots, music, sounds, logo, fonts, names or terms of the game
are used, traced or referenced as images. The game's name appears in the credit line above and in the same line in the
theme's footer, nowhere else.

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

A frequency lives round a world: its signals sit in a loose spiral round it and travel the orbit with it, so the scope
finds a group's signals clustered round its world.

## Using it

| | desktop | phone |
|---|---|---|
| look | move the mouse (a gentle gaze), drag to turn, or the arrows | drag |
| the scope | `z` (tap to toggle, hold to peek), the right button held, or `[ scope ]` | `[ scope ]`, pinch to zoom it |
| frequency | `w` and `e`, the wheel, or click the frequency chip or a legend row | tap the frequency chip |
| lock on | hold steady, `l`, `enter`, or a click in the scope | hold steady or tap |
| marshmallow | `h` skewers one; hold `h` to toast; tap `h` (or `x`) to eat | `[ marshmallow ]`: tap, hold, tap |
| the deck | `f` | `[ deck ]` in the catalogue |
| hide | `` ` `` | two fingers, twice |

The station's own keys are unchanged (12.0): `space` plays and pauses, `q` queues the locked signal onto the route (drawn
as a dotted line between the signals), `/` finds (the matching signals blaze, the rest go quiet) and then `j` and `k`
swing the scope onto each match, `m` mutes, `tab` and `:` open the terminal. Commands: `scope`, `freq [name]`, `lock`,
`toast`, `tally`, `camp`.

The marshmallow toasts through raw, warm, golden, brown, black and charred, swells, bubbles, steams, and catches fire if
you leave it in; pulled back, a burning one burns on a moment and goes out smoking. Eating one takes two bites and a puff
of sugar. A golden one is carved into the log across the fire (a tally kept in this browser, `localStorage
["nobody.campfire.golden"]`); a burnt one gets a dry line.

Sound: the preview is the track's own file through a lowpass, a pan and a gain into the station's gain (the mute), never
into the analyser; the deck ducks under the scope. All of it is quiet and all of it is muted by `?mute=1`. Nobody who
built this heard any of it.

## Files and fonts

`theme.css`, `theme.js`. Fonts: Barlow Condensed (display), JetBrains Mono (data), both SIL Open Font License 1.1, and
Patrick Hand (the camp journal's hand), SIL Open Font License 1.1, all in `../../vendor/` with their licences in
`../../vendor/LICENSES.md`. Without the CDN there is no scene: the body says `nocamp`, a painted night and a CSS fire
stand in, and the list is the sky. The harness runs this theme's Chrome on ANGLE (SwiftShader by default, `--angle d3d11`
for the real card) and its own scenario is `--only camp`.
