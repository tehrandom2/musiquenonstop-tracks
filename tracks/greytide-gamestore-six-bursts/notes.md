# Six Bursts

- **slug:** greytide-gamestore-six-bursts
- **idea:** A breather: the Dice Tower at work, every throw a roll for damage, a six that bursts, nobody asking about the ones
- **mood:** bright, tumbling, intricate
- **bpm:** 144 (asked) / 72 (measured, folded into 70-140)
- **key:** B minor (asked) / F# minor (estimated)
- **seed:** 3950500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 133.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.8 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:dice-tower
- **loop:** no, a one-shot
- **length:** 5892711 samples at 44.1 kHz (133.62 s), about 80.2 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A breather: the Dice Tower at work, every throw a roll for damage, a six that bursts, nobody asking about the ones". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in B minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950501 (harsh: 2.6% above 6 kHz (ceiling 2.5)). Seed 3950500 is the take.

## Prompt

> Instrumental math-rock at 144 bpm in B minor, a trio with clear lanes: two clean tapped guitars in interlocking odd-grouped patterns like dice tumbling, a tight lean picked bass locking the downbeats, bass under the mids, a crisp kit with stop-start fills and a crash burst on every sixth bar; starts mid with one guitar, the second joins for a long bright plateau, a dip to a single guitar and bass, then a lifted full-band finale, B minor, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: Dice Tower

## Rejected seeds

- 3950501: harsh: 2.6% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.0, gain -2.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.10 dBFS decoded (pre-encode -3.48) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.20 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.94 % below 60 Hz (raw render 19.4 %) | under 12 % | yes |
| onset rate | 3.80 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -66.6 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
