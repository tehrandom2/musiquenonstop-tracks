# Advanced Studios Theme R5.6: Factory floor, electric

- **slug:** advanced-studios-theme-r5-6
- **idea:** a theme for the Advanced Studios game built from measured traits only (tempo, mode, bass weight, density, development, arc): Factory floor, electric
- **mood:** busy but ordered
- **bpm:** 140 (asked) / 139 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3370601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 175.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: bench
- **loop:** no, a one-shot
- **length:** 7717832 samples at 44.1 kHz (175.01 s), about 102.1 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's theme for the Advanced Studios game, round 5: measured traits of his Suno themes, no audio reference". The style line and structure come from the front desk's round 5 brief, word for word; built from measured traits only, never his melodies or audio. So I wrote it at 140 bpm in A minor, 180 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 1 seed and kept it. Seed 3370601 is the take, but it did not clear every gate: harsh: 3.3% above 6 kHz (ceiling 2.5).

## Prompt

> modern electronic nu-jazz with a gritty edge, 140 bpm, A minor, verses as a calm clockwork groove of a bitcrushed piano ostinato and a tight drum machine, choruses opening into a saturated synth-and-horn-sample rush with a distorted lead line, tight light bass throughout, clear contrast between steady sections and lifts, a production line hitting its stride, glossy but crunchy mix, busy but ordered, no wobble bass, no drop, instrumental

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 140 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.0, gain -0.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.93 dBFS decoded (pre-encode -3.24) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.27 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 9.28 % below 60 Hz (raw render 26.2 %) | under 12 % | yes |
| onset rate | 2.63 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -53.4 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.3% above 6 kHz (ceiling 2.5)
