# Tape Arrows

- **slug:** greytide-couch-tape-arrows
- **idea:** Waves one and two: the painter's tape arrows and little signposts slip one by one down the seam and are gone for good; the roads must be read by heart.
- **mood:** sly, busy, slipping
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** D minor (asked) / A minor (estimated)
- **seed:** 4030300
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 138 s rendered, 133.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 3
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:the table
- **loop:** no, a one-shot
- **length:** 5885566 samples at 44.1 kHz (133.46 s), about 73.4 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Waves one and two: the painter's tape arrows and little signposts slip one by one down the seam and are gone for good; the roads must be read by heart.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in D minor, 138 seconds, with no voice, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030301 (6.9s of near-silence (limit 0.5)). Seed 4030300 is the take, but it did not clear every gate: 1.1s of near-silence (limit 0.5).

## Prompt

> Late-night library funk, 132 bpm, D minor, sly and busy. A tight studio combo with every part in its lane: a clavinet ostinato, a muted trumpet and a flute trading short clipped phrases in strict turn, wah guitar scratching sixteenths, tight lean bass under the mids with octave pops, crisp breakbeat drums with a shaker. Arc: clavinet and shaker alone, the band locks in at mid energy, a long high plateau with the trumpet and flute in unison, a dip where the drums drop out and the bass slides down, a final lift with everything, a clean stop. Still D minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4030301: 6.9s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.9, gain -0.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.73 dBFS decoded (pre-encode -3.17) | under -1 dBFS | yes |
| silence | longest 1.10 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.59 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.27 % below 60 Hz (raw render 24.7 %) | under 12 % | yes |
| onset rate | 3.76 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -57.1 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.1s of near-silence (limit 0.5)
