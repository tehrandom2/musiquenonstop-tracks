# Advanced Studios Theme (E)

- **slug:** advanced-studios-theme-e
- **idea:** a steady production line played by a small acoustic combo: everyone busy, the work going well
- **mood:** busy and purposeful but relaxed and friendly
- **bpm:** 120 (asked) / 119 (measured, folded into 70-140)
- **key:** C major (asked) / C major (estimated)
- **seed:** 3360101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 95.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: bench
- **loop:** no, a one-shot
- **length:** 4204464 samples at 44.1 kHz (95.34 s), about 47.7 bars of 4/4 at 120 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's theme for the Advanced Studios game, round 4: less marimba, a small combo on a steady line". The style and structure come from the front desk's round 4 brief, word for word: the feeling of a steady production line, no reference named, no mallets. So I wrote it at 120 bpm in C major, 100 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 1 seed and kept it. Seed 3360101 is the take.

## Prompt

> modern take on 1930s descriptive small-combo jazz, a steady assembly-line groove at the heart: a chugging low ostinato on upright bass and left-hand piano that keeps cycling like a conveyor belt, brushed drums ticking like clockwork, clarinet and muted trumpet trading short busy figures over it, a warm tenor sax line on top, quick scalar flourishes from the horns at phrase ends like workers zipping past, subtle modern production with a soft sub bass and gentle tape warmth, no marimba, no mallets, busy and purposeful but relaxed and friendly, a feeling of steady progress, instrumental, C major, 120 bpm

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 119 bpm vs asked 120 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.62 dBFS decoded (pre-encode -3.09) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.61 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.97 % below 60 Hz (raw render 14.1 %) | under 12 % | yes |
| onset rate | 2.40 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head -67.9 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
