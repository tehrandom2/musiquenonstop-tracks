# Melodic Dubstep, Apex

- **slug:** melodic-dubstep-apex
- **idea:** melodic dubstep, 175 bpm, tropical bay at sunset, bright leads, huge half-time drop, evolving second half, bigger second drop: melodic dubstep
- **mood:** 
- **bpm:** 175 (asked) / 85 (measured, folded into 70-140)
- **key:** E♭ major (the model's choice) / A# major (estimated)
- **seed:** 129316
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 120 s rendered (the model's 28 s, held to 120 to 240 s), 112.5 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 48.4 s per seed, model load 41.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4963083 samples at 44.1 kHz (112.54 s), about 82.1 bars of 4/4 at 175 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "melodic dubstep, 175 bpm, tropical bay at sunset, bright leads, huge half-time drop, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: melodic dubstep at 175 bpm, genre first and short; the words lead; the profile adds the bass, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "175 bpm" I took as: 175 bpm, as the words say, in place of the race band. "melodic dubstep" I took as: the frame, in the requester's own words, ahead of the tempo. "tropical bay at sunset, bright leads, huge half-time drop, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. "half-time" I took as: a half-time feel at 175 bpm: a feel, not a halved tempo. So I wrote it at 175 bpm in E♭ major (the model chose the key), 120 seconds (the model's 28 s, held to 120 to 240 s), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 129313 (passed, but outranked by the kept takes); 129315 (passed, but outranked by the kept takes); 129312 (seam level +5.8 dB tail to head); 129311 (seam level +7.2 dB tail to head). Seed 129316 is the take.

## Prompt

> Melodic dubstep, 175 bpm, tropical bay at sunset, bright leads, huge half-time drop, evolving second half, bigger second drop, a rolling reese sub bass with a growling mid-range, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An explosive burst of high-energy J-core or happy hardcore, driven by a relentless four-on-the-floor kick drum and crisp digital snares at an extremely fast tempo. The track is dominated by bright, layered supersaw synth leads playing catchy, arpeggiated melodies reminiscent of Japanese video game music. A driving saw-wave bassline underpins the harmony, while atmospheric pads fill out the background during brief transitional sections which use classic riser effects to build tension before slamming back into the main energetic theme. The entire piece is instrumental, focusing purely on its euphoric and frantic melodic content.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 129313: passed, but outranked by the kept takes (no flat stretch (longest still stretch 4 s, from 0:03))
- 129315: passed, but outranked by the kept takes (no flat stretch (longest still stretch 3 s, from 0:02))
- 129312: seam level +5.8 dB tail to head (no flat stretch)
- 129311: seam level +7.2 dB tail to head (no flat stretch (longest still stretch 6 s, from 1:39))

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 85 bpm vs asked 175 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -13.6 LUFS installed (decoded MP3 -14.0); candidate was -12.6, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.64 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 1.11 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 35.97 % below 60 Hz (raw render 36.0 %) | under 69 % | yes |
| onset rate | 5.71 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.15x, tail-head +1.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch. Over the longest still stretch: chroma cosine 0.000, 0.0 onsets per second, spectral flux 0.00 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 129314 (melodic-dubstep-apex-take2.mp3)

-15.3 LUFS, peak -2.44 dBFS decoded, 1.63 % >6 kHz, 43.23 % <60 Hz, 5.14 onsets/s, seam 0.10x / +3.7 dB, checks: all passed
no flat stretch (longest still stretch 2 s, from 1:36)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
