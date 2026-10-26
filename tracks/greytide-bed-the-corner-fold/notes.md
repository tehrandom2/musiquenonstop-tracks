# The Corner Fold

- **slug:** greytide-bed-the-corner-fold
- **idea:** Between waves the god-hand lifts the corner of the bed's cover and folds it back, and a 45 cm shortcut opens through the valley: a breather that is also a decision.
- **mood:** sweeping, deliberate, a held breath
- **bpm:** 140 (asked) / 139 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3930300
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 124.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:bed, pov:the god-hand
- **loop:** no, a one-shot
- **length:** 5479759 samples at 44.1 kHz (124.26 s), about 72.5 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Between waves the god-hand lifts the corner of the bed's cover and folds it back, and a 45 cm shortcut opens through the valley: a breather that is also a decision.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in D minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3930301 (passed, but outranked by the kept takes). Seed 3930300 is the take.

## Prompt

> Outrun synthwave, 140 bpm, D minor. The ensemble: a tight, lean arpeggiated synth bass on sixteenths, bass under the mids; a punchy gated drum machine; a soaring saw lead carrying the theme; a slow brass-like synth answering it in long notes; a warm pad holding the minor chords. Mood: sweeping and deliberate, a held breath before a decision. Arc: pad and arpeggio, the drums build in, the theme at full height, a breakdown to pad and a single lead line, the final theme lifted a step with both leads together, a short outro. D minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3930301: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.5, gain -1.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.87 dBFS decoded (pre-encode -3.65) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.92 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.44 % below 60 Hz (raw render 28.2 %) | under 12 % | yes |
| onset rate | 3.86 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.05x, tail-head -62.7 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
