# Aggressive Jump-up, Slipstream

- **slug:** aggressive-jump-up-slipstream
- **idea:** aggressive jump-up, 168 bpm, engine about to overheat, distorted wobble bass, evolving second half, bigger second drop: aggressive jump-up
- **mood:** 
- **bpm:** 168 (asked) / 82 (measured, folded into 70-140)
- **key:** F# minor (the model's choice) / F# minor (estimated)
- **seed:** 489416
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 120 s rendered (the model's choice), 111.1 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 29.6 s per seed, model load 22.4 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4897731 samples at 44.1 kHz (111.06 s), about 77.7 bars of 4/4 at 168 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "aggressive jump-up, 168 bpm, engine about to overheat, distorted wobble bass, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: aggressive jump-up at 168 bpm, genre first and short; the words lead; the profile adds the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "168 bpm" I took as: 168 bpm, as the words say, in place of the race band. "aggressive jump-up" I took as: the frame, in the requester's own words, ahead of the tempo. "engine about to overheat, distorted wobble bass, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. "wobble bass" I took as: a wobble bass, in the requester's own words. So I wrote it at 168 bpm in F# minor (the model chose the key), 120 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 489417 (passed, but outranked by the kept takes); 489418 (tempo 134 vs asked 168); 489415 (tempo 134 vs asked 168); 489420 (seam level +11.0 dB tail to head). Seed 489416 is the take.

## Prompt

> Aggressive jump-up, 168 bpm, engine about to overheat, distorted wobble bass, evolving second half, bigger second drop, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An aggressive hardstyle track driven by a powerful, distorted kick drum with a prominent tonal tail that doubles as the bassline. The arrangement opens with an anthemic synth lead playing arpeggiated melodies over atmospheric pads before slamming into a high-energy drop characterized by its relentless four-on-the-floor rhythm and sharp, saw-wave lead synths drenched in reverb. A brief breakdown reintroduces the main melodic theme on softer pads, providing momentary contrast before building tension again for a second, equally intense drop. The production is loud, compressed, and designed for maximum impact, typical of modern hard dance music.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 489417: passed, but outranked by the kept takes (no flat stretch (longest still stretch 3 s, from 1:15))
- 489418: tempo 134 vs asked 168 (no flat stretch (longest still stretch 5 s, from 2:18))
- 489415: tempo 134 vs asked 168 (no flat stretch (longest still stretch 8 s, from 0:37))
- 489420: seam level +11.0 dB tail to head (no flat stretch)

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 82 bpm vs asked 168 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -14.2 LUFS installed (decoded MP3 -14.6); candidate was -13.2, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.69 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 2.52 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 36.14 % below 60 Hz (raw render 36.1 %) | under 69 % | yes |
| onset rate | 4.95 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.08x, tail-head -0.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 3 s, from 0:26). Over the longest still stretch: chroma cosine 0.996, 0.0 onsets per second, spectral flux 0.20 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 489419 (aggressive-jump-up-slipstream-take2.mp3)

-14.5 LUFS, peak -2.30 dBFS decoded, 2.63 % >6 kHz, 29.87 % <60 Hz, 5.10 onsets/s, seam 0.04x / +3.1 dB, checks: all passed
no flat stretch (longest still stretch 5 s, from 3:23)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
