# Every Shadow Turns

- **slug:** greytide-desk-every-shadow-turns
- **idea:** Instrumental breather, wave 5: the painter's arm nudges the light and every shadow on the desk swings to a new angle for the rest of the night.
- **mood:** cinematic, uneasy, sweeping
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 3910600
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 135.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:desk, pov:the desk
- **loop:** no, a one-shot
- **length:** 5968510 samples at 44.1 kHz (135.34 s), about 74.4 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Instrumental breather, wave 5: the painter's arm nudges the light and every shadow on the desk swings to a new angle for the rest of the night.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in C minor, 140 seconds, with no voice, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3910601 (harsh: 2.7% above 6 kHz (ceiling 2.5)). Seed 3910600 is the take, but it did not clear every gate: harsh: 2.8% above 6 kHz (ceiling 2.5).

## Prompt

> Cinematic synthwave, 132 bpm, C minor. An analog ensemble: a pulsing sequenced bass in sixteenths, tight and lean, well under the mids; a gated-reverb drum machine; a slow-filter pad that sweeps open like light swinging round a room; a bright lead synth with long glides carrying the melody; a plucked arpeggio answering it. Uneasy and sweeping. Starts mid on bass and drums, a long high lead plateau, one dip to the pad alone, a lifted final section. C minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3910601: harsh: 2.7% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.34 dBFS decoded (pre-encode -3.56) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.75 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 9.07 % below 60 Hz (raw render 30.0 %) | under 12 % | yes |
| onset rate | 3.53 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -53.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.8% above 6 kHz (ceiling 2.5)
