# Euphoric Liquid, Redline, Fuzzy Overdriven Texture

- **slug:** euphoric-liquid-redline-fuzzy-overdriven-texture
- **idea:** euphoric liquid drum and bass, 165 bpm, final lap, anthemic chords, rolling breaks, evolving second half, massive second drop: euphoric liquid drum and bass
- **mood:** 
- **bpm:** 165 (asked) / 74 (measured, folded into 70-140)
- **key:** G major (the model's choice) / G major (estimated)
- **seed:** 283307
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** race   **duration:** 197 s rendered (the model's choice), 194.0 s installed (loop seam baked)
- **date:** 2026-10-16
- **render time:** 127.8 s per seed, model load 58.9 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 8555400 samples at 44.1 kHz (194.00 s), about 133.4 bars of 4/4 at 165 bpm (the MP3 adds encoder padding; the length is of the PCM)
- **parent:** euphoric-liquid-redline (seed 283307 kept)
- **change:** `caption, new clause`: '' -> 'fuzzy overdriven texture, gritty saturation, less polished'
- **inserted:** `fuzzy overdriven texture, gritty saturation, less polished` as a new clause, before `instrumental`

## Why

This is a variation of euphoric-liquid-redline, a track of the station. From it I took the seed (283307), the tempo (165 bpm), the key (G major), its length (a 197.0 s render), the best tier and its prompt, word for word. You asked for "fuzzy overdriven texture, gritty saturation, less polished" and none of its words named a clause of the prompt, so I added them as a new clause of their own, before the ending. "the race profile (the requester's key, or the owner's choice)" I took as: euphoric liquid drum and bass at 165 bpm, genre first and short; the words lead; the profile adds the bass, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "165 bpm" I took as: 165 bpm, as the words say, in place of the race band. "euphoric liquid drum and bass" I took as: the frame, in the requester's own words, ahead of the tempo. "final lap, anthemic chords, rolling breaks, evolving second half, massive second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 165 bpm in G major (the model chose the key), 197 seconds (the model's choice), with no voice, under the race gates. I rendered 1 seed and kept it. Seed 283307 is the take, but it did not clear every gate: tempo 74 vs asked 165.

## Prompt

> Euphoric liquid drum and bass, 165 bpm, final lap, anthemic chords, rolling breaks, evolving second half, massive second drop, a heavy distorted reese bass locked to the kick, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, fuzzy overdriven texture, gritty saturation, less polished, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 165 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | **NO** |
| loudness | -18.6 LUFS installed (decoded MP3 -18.9); candidate was -17.8, gain -0.8 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.26 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 2.06 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 8.67 % below 60 Hz (raw render 8.7 %) | under 69 % | yes |
| onset rate | 3.48 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.01x, tail-head -1.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 5 s, from 3:09). Over the longest still stretch: chroma cosine 0.984, 0.0 onsets per second, spectral flux 0.07 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: tempo 74 vs asked 165
