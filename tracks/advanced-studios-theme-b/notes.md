# Advanced Studios Theme (B)

- **slug:** advanced-studios-theme-b
- **idea:** a golden-age studio fanfare that has been through the future: orchestra, harp and celesta over a soft electronic pulse
- **mood:** warm and confident
- **bpm:** 104 (asked) / 139 (measured, folded into 70-140)
- **key:** D major (asked) / A major (estimated)
- **seed:** 3340104
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 96.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: bench
- **loop:** no, a one-shot
- **length:** 4266198 samples at 44.1 kHz (96.74 s), about 41.9 bars of 4/4 at 104 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's theme for the Advanced Studios game (round two)". The style and structure come from the front desk's brief for the game's theme: instrumental, about 100 s, a loop body marked for the game. So I wrote it at 104 bpm in D major, 100 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 1 seed and kept it. Seed 3340104 is the take, but it did not clear every gate: 2.5s of near-silence (limit 0.5).

## Prompt

> cinematic golden-age Hollywood orchestral theme reimagined with warm modern electronics, triumphant brass fanfare opening, lush sweeping strings, harp glissandi, celesta and glockenspiel sparkle, timpani swells, under it a soft analog synth pulse and gentle side-chained electronic beat, tasteful glitch accents: tape stutters, short bit-crushed echoes and vinyl crackle on phrase endings only, bright, optimistic, memorable hummable melody, polished and approachable, not abrasive, instrumental, D major, 104 bpm

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 104 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.31 dBFS decoded (pre-encode -3.38) | under -1 dBFS | yes |
| silence | longest 2.45 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.08 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.21 % below 60 Hz (raw render 25.9 %) | under 12 % | yes |
| onset rate | 2.29 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -64.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 2.5s of near-silence (limit 0.5)
