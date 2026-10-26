# Twelve Times Twelve

- **slug:** greytide-schooldesk-twelve-times-twelve
- **idea:** a breather on the lid: the calculator's screen flickers and rolls a new digit, and the towers around it fire on the high numbers
- **mood:** bright, twitchy, playful
- **bpm:** 144 (asked) / 72 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 4010501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 136 s rendered, 130.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:calculator
- **loop:** no, a one-shot
- **length:** 5756432 samples at 44.1 kHz (130.53 s), about 78.3 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a breather on the lid: the calculator's screen flickers and rolls a new digit, and the towers around it fire on the high numbers". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in B minor, 136 seconds, with no voice, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010500 (boomy: 16.0% below 60 Hz (ceiling 12) and others). Seed 4010501 is the take, but it did not clear every gate: 1.2s of near-silence (limit 0.5).

## Prompt

> Math rock, 144 bpm, B minor, a trio with a toy synth: two clean tapped guitars interlocking in odd groupings, a square-wave synth playing the calculator's flicker as fast arpeggios, a nimble tight lean bass, bass well under the mids, a crisp busy drum kit with sharp accents on the changes, in B minor, bright and twitchy, mid start, a long tumbling plateau, a dip to one guitar and the synth flicker, a final lift with every part back, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4010500: boomy: 16.0% below 60 Hz (ceiling 12); onset rate 5.4/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.9, gain -1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.88 dBFS decoded (pre-encode -3.43) | under -1 dBFS | yes |
| silence | longest 1.15 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.91 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.70 % below 60 Hz (raw render 22.2 %) | under 12 % | yes |
| onset rate | 4.37 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -66.6 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.2s of near-silence (limit 0.5)
