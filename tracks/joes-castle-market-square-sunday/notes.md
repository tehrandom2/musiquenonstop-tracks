# Market Square, Sunday

- **slug:** joes-castle-market-square-sunday
- **idea:** the town between waves: the market square in the sun, bricks being clicked back where the horde knocked them loose
- **mood:** cheerful, busy, sunny, intricate
- **bpm:** 112 (asked) / 112 (measured, folded into 70-140)
- **key:** G major (asked) / D major (estimated)
- **seed:** 3380600
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 150 s rendered, 147.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 21.8 s per seed, model load 23.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: joes-castle
- **loop:** no, a one-shot
- **length:** 6517114 samples at 44.1 kHz (147.78 s), about 69.0 bars of 4/4 at 112 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the town between waves: the market square in the sun, bricks being clicked back where the horde knocked them loose". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 112 bpm in G major, 150 seconds, with no voice, under the mellow gates. It has no beat to hold, so 112 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3380601 (0.9s of near-silence (limit 0.5)). Seed 3380600 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5).

## Prompt

> cheerful intricate baroque chamber piece at 112 bpm in G major, a small ensemble in strict order: harpsichord running the bright figures, pizzicato strings plucking the bass line and the off-beats, an alto recorder singing the melody, hand drums and tambourine trotting, a dry woodblock click motif like bricks snapping into place; tight lean bass, no harsh highs; playful, busy, sunny; theme, variation, a pizzicato interlude, the theme returns fuller, ends on three clicks, G major, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3380601: 0.9s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 112 bpm vs asked 112 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.21 dBFS decoded (pre-encode -3.13) | under -1 dBFS | yes |
| silence | longest 0.85 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.14 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.95 % below 60 Hz (raw render 9.7 %) | under 12 % | yes |
| onset rate | 3.14 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -58.7 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5)
