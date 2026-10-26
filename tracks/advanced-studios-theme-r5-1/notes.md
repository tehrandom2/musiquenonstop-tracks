# Advanced Studios Theme R5.1: Clockwork

- **slug:** advanced-studios-theme-r5-1
- **idea:** a theme for the Advanced Studios game built from measured traits only (tempo, mode, bass weight, density, development, arc): Clockwork
- **mood:** busy but ordered
- **bpm:** 136 (asked) / 136 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3370101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 175.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: bench
- **loop:** no, a one-shot
- **length:** 7739463 samples at 44.1 kHz (175.50 s), about 99.4 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's theme for the Advanced Studios game, round 5: measured traits of his Suno themes, no audio reference". The style line and structure come from the front desk's round 5 brief, word for word; built from measured traits only, never his melodies or audio. So I wrote it at 136 bpm in E minor, 180 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 1 seed and kept it. Seed 3370101 is the take.

## Prompt

> sleek modern electro-swing and nu-jazz, 136 bpm, E minor, a precise piano-and-bass ostinato ticking like a well oiled machine, tight lean bass, crisp drums with a soft swing, muted trumpet and clarinet trading clipped phrases in strict order, a tenor sax melody that develops and climbs, starts at medium energy and builds patiently to a long confident plateau, one short breakdown, then a final lift, glossy clean mix, busy but ordered, purposeful, instrumental

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 136 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.2, gain +1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.24 dBFS decoded (pre-encode -3.07) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.38 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.22 % below 60 Hz (raw render 13.7 %) | under 12 % | yes |
| onset rate | 2.48 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -58.9 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
