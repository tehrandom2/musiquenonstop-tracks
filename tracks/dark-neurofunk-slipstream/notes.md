# Dark Neurofunk, Slipstream

- **slug:** dark-neurofunk-slipstream
- **idea:** dark neurofunk, 160 bpm, bioluminescent underwater tunnel, snarling reese bass, tight drums, evolving second half, bigger second drop: dark neurofunk
- **mood:** 
- **bpm:** 160 (asked) / 80 (measured, folded into 70-140)
- **key:** B major (the model's choice) / A# minor (estimated)
- **seed:** 622359
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 170 s rendered (the model's choice), 161.8 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 45.5 s per seed, model load 24.3 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 7136469 samples at 44.1 kHz (161.82 s), about 107.9 bars of 4/4 at 160 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "dark neurofunk, 160 bpm, bioluminescent underwater tunnel, snarling reese bass, tight drums, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: dark neurofunk at 160 bpm, genre first and short; the words lead; the profile adds the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "160 bpm" I took as: 160 bpm, as the words say, in place of the race band. "dark neurofunk" I took as: the frame, in the requester's own words, ahead of the tempo. "bioluminescent underwater tunnel, snarling reese bass, tight drums, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 160 bpm in B major (the model chose the key), 170 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 5: 622360 (seam level -6.7 dB tail to head); 622363 (seam level -8.3 dB tail to head); 622361 (seam level -5.5 dB tail to head); 622362 (tempo 127 vs asked 160 and others), and 1 more (all listed below). Seed 622359 is the take.

## Prompt

> Dark neurofunk, 160 bpm, bioluminescent underwater tunnel, snarling reese bass, tight drums, evolving second half, bigger second drop, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An intense, high-energy electronic track that fuses chiptune aesthetics with aggressive neurofunk production. The piece opens with shimmering synth arpeggios over atmospheric pads before erupting into a driving drum and bass rhythm section characterized by rapid-fire snares and intricate hi-hat patterns. A powerful, distorted reese-style synth lead carries the main melodic theme, punctuated by glitchy fills and risers. The structure features several dynamic shifts, including an atmospheric breakdown centered around evolving chord progressions which builds tension towards a second drop. This final climax reintroduces all elements with heightened intensity before fading out on lingering synth textures.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 622360: seam level -6.7 dB tail to head (no flat stretch (longest still stretch 7 s, from 0:04))
- 622363: seam level -8.3 dB tail to head (no flat stretch (longest still stretch 4 s, from 0:07))
- 622361: seam level -5.5 dB tail to head (no flat stretch (longest still stretch 7 s, from 1:39))
- 622362: tempo 127 vs asked 160; seam level -7.3 dB tail to head (no flat stretch)
- 622364: tempo 127 vs asked 160; onset rate 6.9/s outside 1.5-6.5 (no flat stretch (longest still stretch 3 s, from 0:06))

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 160 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -14.4 LUFS installed (decoded MP3 -14.8); candidate was -13.3, gain -1.1 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.13 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 1.01 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 46.09 % below 60 Hz (raw render 46.1 %) | under 69 % | yes |
| onset rate | 4.42 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.10x, tail-head +0.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 4 s, from 1:48). Over the longest still stretch: chroma cosine 0.998, 0.0 onsets per second, spectral flux 0.18 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
