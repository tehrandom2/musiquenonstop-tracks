# Darksynth Neon, Last Lap

- **slug:** darksynth-neon-last-lap
- **idea:** darksynth, 155 bpm, neon towers blurring past, glassy arpeggios, driving drums, evolving second half, bigger second drop: darksynth
- **mood:** 
- **bpm:** 155 (asked) / 74 (measured, folded into 70-140)
- **key:** E♭ minor (the model's choice) / A major (estimated)
- **seed:** 136588
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** race   **duration:** 144 s rendered (the model's choice), 138.3 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 135.3 s per seed, model load 47.8 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 6100336 samples at 44.1 kHz (138.33 s), about 89.3 bars of 4/4 at 155 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "darksynth, 155 bpm, neon towers blurring past, glassy arpeggios, driving drums, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: darksynth at 155 bpm, genre first and short; the words lead; the profile adds the bass, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "155 bpm" I took as: 155 bpm, as the words say, in place of the race band. "darksynth" I took as: the frame, in the requester's own words, ahead of the tempo. "neon towers blurring past, glassy arpeggios, driving drums, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 155 bpm in E♭ minor (the model chose the key), 144 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 136593 (passed, but outranked by the kept takes); 136592 (passed, but outranked by the kept takes); 136590 (boomy: 75.6% below 60 Hz (ceiling 69)); 136591 (tempo 102 vs asked 155). Seed 136588 is the take.

## Prompt

> Darksynth, 155 bpm, neon towers blurring past, glassy arpeggios, driving drums, evolving second half, bigger second drop, a growling reese sub bass with a snarling mid-range, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An aggressive hardstyle track driven by a relentless four-on-the-floor kick drum with heavy sidechain compression that makes the entire mix pump. The song opens with a tense arpeggiated synth sequence before slamming into its main section, dominated by an anthemic supersaw lead melody playing over distorted basslines and atmospheric pads. A brief breakdown offers a moment of melodic respite before launching back into a high-energy drop featuring intense snare rolls, risers, and powerful synth stabs. The production is loud, crisp, and designed for maximum impact on a large sound system.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 136593: passed, but outranked by the kept takes (no flat stretch (longest still stretch 2 s, from 0:04))
- 136592: passed, but outranked by the kept takes (no flat stretch (longest still stretch 5 s, from 0:52))
- 136590: boomy: 75.6% below 60 Hz (ceiling 69) (no flat stretch (longest still stretch 8 s, from 0:00))
- 136591: tempo 102 vs asked 155 (no flat stretch)

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 155 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.3 LUFS installed (decoded MP3 -17.8); candidate was -16.3, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.33 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 0.36 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 15.26 % below 60 Hz (raw render 15.3 %) | under 69 % | yes |
| onset rate | 4.05 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.17x, tail-head -2.9 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 4 s, from 0:02). Over the longest still stretch: chroma cosine 0.989, 0.3 onsets per second, spectral flux 0.34 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 136589 (darksynth-neon-last-lap-take2.mp3)

-15.7 LUFS, peak -2.63 dBFS decoded, 0.39 % >6 kHz, 28.03 % <60 Hz, 2.46 onsets/s, seam 0.68x / -0.1 dB, checks: all passed
no flat stretch (longest still stretch 6 s, from 0:07)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
