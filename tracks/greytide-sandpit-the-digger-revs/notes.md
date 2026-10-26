# The Digger Revs

- **slug:** greytide-sandpit-the-digger-revs
- **idea:** After wave three: the toy digger revs, trundles out, shoves a tower a centimetre aside and tips out a new mound
- **mood:** heavy, lumbering, gleeful
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 4050400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 137.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 21.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:sandpit, pov:the-digger
- **loop:** no, a one-shot
- **length:** 6074319 samples at 44.1 kHz (137.74 s), about 79.2 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After wave three: the toy digger revs, trundles out, shoves a tower a centimetre aside and tips out a new mound". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in D minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4050401 (0.8s of near-silence (limit 0.5)). Seed 4050400 is the take, but it did not clear every gate: 1.0s of near-silence (limit 0.5).

## Prompt

> Heavy desert stoner-rock groove, 138 bpm, in D minor, a power trio as a yellow toy digger: a fuzz baritone guitar riff that growls like an engine turning over, a tight lean bass under the mids locked to the riff, a big swung kit with a cowbell on the verse groove, a second guitar adding slow bends as the boom swings, the key D minor stated by the riff from the first bar; arc: a revving three-and-a-half-second build of feedback and toms, the full groove trundling forward, a half-time scoop section, a dip to bass and hats as the bucket tips, a final lift, then the groove rolls home and stops, warm saturation, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4050401: 0.8s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.4, gain -0.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.02 dBFS decoded (pre-encode -3.25) | under -1 dBFS | yes |
| silence | longest 0.95 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.41 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.32 % below 60 Hz (raw render 9.7 %) | under 12 % | yes |
| onset rate | 2.89 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -44.7 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.0s of near-silence (limit 0.5)
