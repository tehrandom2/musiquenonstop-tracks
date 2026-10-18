# Frantic Drumstep, Redline

- **slug:** frantic-drumstep-redline
- **idea:** frantic drumstep, 178 bpm, storm at supersonic speed, glitchy fills, evolving second half, bigger second drop: frantic drumstep
- **mood:** 
- **bpm:** 178 (asked) / 88 (measured, folded into 70-140)
- **key:** B♭ minor (the model's choice) / A# minor (estimated)
- **seed:** 704633
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 120 s rendered (the model's 113 s, held to 120 to 240 s), 112.5 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 35.5 s per seed, model load 41.0 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4960503 samples at 44.1 kHz (112.48 s), about 83.4 bars of 4/4 at 178 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "frantic drumstep, 178 bpm, storm at supersonic speed, glitchy fills, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: frantic drumstep at 178 bpm, genre first and short; the words lead; the profile adds the bass, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "178 bpm" I took as: 178 bpm, as the words say, in place of the race band. "frantic drumstep" I took as: the frame, in the requester's own words, ahead of the tempo. "storm at supersonic speed, glitchy fills, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 178 bpm in B♭ minor (the model chose the key), 120 seconds (the model's 113 s, held to 120 to 240 s), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 704629 (0.7s of near-silence (limit 0.5)); 704631 (tempo 72 vs asked 178); 704632 (tempo 120 vs asked 178); 704630 (1.2s of near-silence (limit 0.5) and others). Seed 704633 is the take.

## Prompt

> Frantic drumstep, 178 bpm, storm at supersonic speed, glitchy fills, evolving second half, bigger second drop, a snarling neuro reese bass over a deep clean sub, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An intense, high-energy chiptune track driven by rapid-fire 8-bit arpeggios from square wave synths over a punchy digital drum machine beat. The arrangement is dense with layered synth melodies creating an epic, video-game-like soundscape reminiscent of classic NES-era soundtracks. A brief melodic breakdown around the midpoint introduces atmospheric pads before launching back into complex lead lines and driving rhythms. The second half intensifies further with faster rhythmic patterns mimicking stuttering chops on a synth or sample, culminating in a powerful climax that ends abruptly after a final riser effect.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 704629: 0.7s of near-silence (limit 0.5) (no flat stretch (longest still stretch 8 s, from 0:03))
- 704631: tempo 72 vs asked 178 (no flat stretch (longest still stretch 3 s, from 0:01))
- 704632: tempo 120 vs asked 178 (no flat stretch (longest still stretch 3 s, from 0:23))
- 704630: 1.2s of near-silence (limit 0.5); seam level -30.5 dB tail to head (no flat stretch)

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 88 bpm vs asked 178 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -15.9 LUFS installed (decoded MP3 -16.3); candidate was -14.3, gain -1.5 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.46 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 1.86 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 15.99 % below 60 Hz (raw render 16.0 %) | under 69 % | yes |
| onset rate | 5.13 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.06x, tail-head -0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 2 s, from 1:05). Over the longest still stretch: chroma cosine 0.993, 0.0 onsets per second, spectral flux 0.28 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 704634 (frantic-drumstep-redline-take2.mp3)

-15.1 LUFS, peak -2.47 dBFS decoded, 2.19 % >6 kHz, 43.21 % <60 Hz, 5.47 onsets/s, seam 0.43x / +0.3 dB, checks: all passed
no flat stretch (longest still stretch 3 s, from 1:21)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
