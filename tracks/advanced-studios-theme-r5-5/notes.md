# Advanced Studios Theme R5.5: Rush, overdriven

- **slug:** advanced-studios-theme-r5-5
- **idea:** a theme for the Advanced Studios game built from measured traits only (tempo, mode, bass weight, density, development, arc): Rush, overdriven
- **mood:** busy but ordered
- **bpm:** 144 (asked) / 138 (measured, folded into 70-140)
- **key:** G minor (asked) / G minor (estimated)
- **seed:** 3370501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 178.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: bench
- **loop:** no, a one-shot
- **length:** 7850557 samples at 44.1 kHz (178.02 s), about 106.8 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's theme for the Advanced Studios game, round 5: measured traits of his Suno themes, no audio reference". The style line and structure come from the front desk's round 5 brief, word for word; built from measured traits only, never his melodies or audio. So I wrote it at 144 bpm in G minor, 180 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 1 seed and kept it. Seed 3370501 is the take, but it did not clear every gate: tempo 138 vs asked 144; 0.9s of near-silence (limit 0.5); harsh: 5.4% above 6 kHz (ceiling 2.5).

## Prompt

> driving gritty electro-swing and fidget house, 144 bpm, G minor, full energy within the first bars, overdriven synth stabs and saturated chopped horn samples locked to a relentless lean synth-bass ostinato, punchy distorted drum machine, sidechain pump, glitchy stutter edits at phrase ends, energetic and controlled, never chaotic, no wobble bass, no drop, instrumental

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 144 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | **NO** |
| loudness | -16.0 LUFS installed (decoded MP3 -16.3); candidate was -15.1, gain -0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.26 dBFS decoded (pre-encode -3.44) | under -1 dBFS | yes |
| silence | longest 0.85 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 5.37 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 9.41 % below 60 Hz (raw render 26.6 %) | under 12 % | yes |
| onset rate | 4.03 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.56x, tail-head -68.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: tempo 138 vs asked 144; 0.9s of near-silence (limit 0.5); harsh: 5.4% above 6 kHz (ceiling 2.5)
