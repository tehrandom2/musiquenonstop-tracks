# Since Ninety-Eight

- **slug:** greytide-attic-since-ninety-eight
- **idea:** A breather while the dust settles on the kit-box labels; nobody has dusted up here for decades and the god-hand wipes the scoreboard clean
- **mood:** dusty, hypnotic, wide
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3980400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 134 s rendered, 131.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.8 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:the-loft
- **loop:** no, a one-shot
- **length:** 5799112 samples at 44.1 kHz (131.50 s), about 70.1 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A breather while the dust settles on the kit-box labels; nobody has dusted up here for decades and the god-hand wipes the scoreboard clean". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in A minor, 134 seconds, with no voice, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980401 (2.1s of near-silence (limit 0.5)). Seed 3980400 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5).

## Prompt

> Hypnotic desert blues, 128 bpm, A minor, dusty and wide: two interlocking electric guitars trading a looping A minor riff and bright answering lines in the mids, a tight lean bass walking under the mids, hand drums and a dry kick, handclaps on the offbeat, a low drone like dust settling, a calloused rolling groove that never hurries, in A minor; intro of one guitar alone, the band joins part by part, a long high groove, a dip to hand drums and drone, a final lift with both guitars soaring, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3980401: 2.1s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.2, gain +2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.61 dBFS decoded (pre-encode -3.02) | under -1 dBFS | yes |
| silence | longest 0.80 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 0.51 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.70 % below 60 Hz (raw render 27.6 %) | under 12 % | yes |
| onset rate | 2.43 per second | 0.3 to 4.5 | yes |
| loop seam | step 2.00x, tail-head -73.4 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5)
