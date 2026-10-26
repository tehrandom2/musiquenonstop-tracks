# A Branch Cracked Outside

- **slug:** greytide-treehouse-a-branch-cracked-outside
- **idea:** Wave five: a branch cracks outside, leaves blow in and the plank nailed over a seam drops away, opening a new gap on the wall road; the table's point of view.
- **mood:** alarmed, nimble, breakneck
- **bpm:** 150 (asked) / 74 (measured, folded into 70-140)
- **key:** B minor (asked) / F major (estimated)
- **seed:** 4040701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 128 s rendered, 123.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:the table
- **loop:** no, a one-shot
- **length:** 5423487 samples at 44.1 kHz (122.98 s), about 76.9 bars of 4/4 at 150 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five: a branch cracks outside, leaves blow in and the plank nailed over a seam drops away, opening a new gap on the wall road; the table's point of view.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 150 bpm in B minor, 128 seconds, with no voice, under the mellow gates. It has no beat to hold, so 150 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4040700 (2.1s of near-silence (limit 0.5)). Seed 4040701 is the take, but it did not clear every gate: 1.0s of near-silence (limit 0.5).

## Prompt

> Breakneck minor bluegrass, 150 bpm, B minor, alarmed and nimble. A string band with every part in its lane: a banjo rolling fast picking patterns, a fiddle sawing the urgent tune, a flatpicked acoustic guitar on the chop, a mandolin chopping the offbeat, tight lean upright bass under the mids. Arc: one sharp crack then banjo alone, the band joins at mid energy, a long high plateau of fiddle and banjo trading, a dip where it all stops for a falling plank and the bass walks down, a lifted final run, a stop. B minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4040700: 2.1s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 150 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.2, gain -2.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.65 dBFS decoded (pre-encode -3.74) | under -1 dBFS | yes |
| silence | longest 1.00 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.46 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.55 % below 60 Hz (raw render 23.7 %) | under 12 % | yes |
| onset rate | 3.30 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -6.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.0s of near-silence (limit 0.5)
