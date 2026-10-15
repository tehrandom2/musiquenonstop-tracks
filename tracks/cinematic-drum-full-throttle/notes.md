# Cinematic Drum, Full Throttle

- **slug:** cinematic-drum-full-throttle
- **idea:** cinematic drum and bass, 150 bpm, desert canyon at dawn, soaring synth leads, rolling sub, evolving second half, bigger second drop: cinematic drum and bass
- **mood:** 
- **bpm:** 150 (asked) / 74 (measured, folded into 70-140)
- **key:** B minor (the model's choice) / A# minor (estimated)
- **seed:** 230367
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 170 s rendered (the model's choice), 163.5 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 34.8 s per seed, model load 22.7 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 7210419 samples at 44.1 kHz (163.50 s), about 102.2 bars of 4/4 at 150 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "cinematic drum and bass, 150 bpm, desert canyon at dawn, soaring synth leads, rolling sub, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: cinematic drum and bass at 150 bpm, genre first and short; the words lead; the profile adds the half-time drop, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "150 bpm" I took as: 150 bpm, as the words say, in place of the race band. "cinematic drum and bass" I took as: the frame, in the requester's own words, ahead of the tempo. "desert canyon at dawn, soaring synth leads, rolling sub, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 150 bpm in B minor (the model chose the key), 170 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 230365 (passed, but outranked by the kept takes); 230366 (passed, but outranked by the kept takes); 230369 (onset rate 7.1/s outside 1.5-6.5); 230368 (seam level -5.6 dB tail to head). Seed 230367 is the take.

## Prompt

> Cinematic drum and bass, 150 bpm, desert canyon at dawn, soaring synth leads, rolling sub, evolving second half, bigger second drop, half-time drop every 32 bars, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An energetic future bass track with strong chiptune influences. The song opens with a catchy 8-bit arpeggiated synth melody over a driving electronic beat featuring punchy kicks and crisp snaps. A deep sub-bass provides a solid foundation before transitioning into an atmospheric bridge characterized by lush, evolving synth pads that create a spacious soundscape. The energy rebuilds through filter sweeps and risers, leading to powerful drops where layered synths and dynamic drum programming take center stage. The arrangement is purely instrumental, focusing on melodic interplay between its retro video game-style leads and modern rhythmic elements.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 230365: passed, but outranked by the kept takes (no flat stretch (longest still stretch 2 s, from 0:20))
- 230366: passed, but outranked by the kept takes (no flat stretch (longest still stretch 3 s, from 0:39))
- 230369: onset rate 7.1/s outside 1.5-6.5 (no flat stretch)
- 230368: seam level -5.6 dB tail to head (no flat stretch)

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 150 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS installed (decoded MP3 -16.8); candidate was -15.4, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.21 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 1.25 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 44.91 % below 60 Hz (raw render 44.9 %) | under 69 % | yes |
| onset rate | 4.46 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.10x, tail-head +1.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 2 s, from 0:16). Over the longest still stretch: chroma cosine 0.986, 1.0 onsets per second, spectral flux 0.43 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 230364 (cinematic-drum-full-throttle-take2.mp3)

-13.6 LUFS, peak -2.55 dBFS decoded, 2.13 % >6 kHz, 29.32 % <60 Hz, 4.51 onsets/s, seam 0.08x / -4.2 dB, checks: all passed
no flat stretch (longest still stretch 2 s, from 2:32)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
