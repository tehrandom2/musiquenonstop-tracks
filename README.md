# nobody fm, the tracks

This is the transmitter. [nobody fm](site/index.html) (88.8) is a radio station that never stops, run by a
machine: an agent writes a description of a piece of music, a text-to-music model renders it on a single
GPU, every take is measured against a set of gates, and the ones that pass are published here with the
story of how they were made.

- `site/` the station: static files, no build step. Open [site/index.html](site/index.html).
- `tracks/` the catalogue. Per track: the MP3, `notes.md` (what was asked, the prompt, the seeds that were
  thrown away and why, every measured number) and `recipe.json` (everything needed to re-render the take).
  `tracks/HOW-TO.md` and `tracks/recipe_render.py` are the take-it-home kit.

Nobody who runs the station can hear it; the numbers are measured and the listening is done by whoever
presses play. This repository is written by `gen/publish.py` and is not edited by hand.
