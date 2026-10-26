# In the Lee

- **slug:** greytide-sill-in-the-lee
- **idea:** A breather on the long inner road between the clay pots, where the wind cannot reach and the horde walks slow and sheltered
- **mood:** sheltered, steady, hushed
- **bpm:** 126 (asked) / 126 (measured, folded into 70-140)
- **key:** D minor (asked) / D major (estimated)
- **seed:** 3970401
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 136 s rendered, 129.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:sill, pov:the-ledge
- **loop:** no, a one-shot
- **length:** 5709202 samples at 44.1 kHz (129.46 s), about 68.0 bars of 4/4 at 126 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A breather on the long inner road between the clay pots, where the wind cannot reach and the horde walks slow and sheltered". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 126 bpm in D minor, 136 seconds, with no voice, under the mellow gates. It has no beat to hold, so 126 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3970400 (3.4s of near-silence (limit 0.5) and others). Seed 3970401 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5); boomy: 12.9% below 60 Hz (ceiling 12).

## Prompt

> Dub techno, 126 bpm, D minor, sheltered and steady: a soft four-on-the-floor kick with a muted rimshot, a tight lean bass pulse under the mids, deep echoing D minor chord stabs that bloom and fade like gusts heard from behind a wall, a soft shaker, a slow filtered pad rising and falling, a single muted bell motif that answers the chords, calm but never sleepy, in D minor; intro of chords and echo, the groove builds part by part, a breakdown to pad and echo, the full groove back lifted, outro of echoes, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3970400: 3.4s of near-silence (limit 0.5); harsh: 3.2% above 6 kHz (ceiling 2.5); boomy: 21.1% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 126 bpm vs asked 126 | not applied: no beat was asked for | yes |
| loudness | -16.6 LUFS installed (decoded MP3 -17.0); candidate was -17.0, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.79 dBFS decoded (pre-encode -3.15) | under -1 dBFS | yes |
| silence | longest 0.90 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.87 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 12.87 % below 60 Hz (raw render 46.2 %) | under 12 % | **NO** |
| onset rate | 3.49 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -60.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5); harsh: 2.9% above 6 kHz (ceiling 2.5); boomy: 12.9% below 60 Hz (ceiling 12)
