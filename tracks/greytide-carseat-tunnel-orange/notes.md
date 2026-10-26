# Tunnel Orange

- **slug:** greytide-carseat-tunnel-orange
- **idea:** waves 7 and 8: a motorway tunnel; the passing light stops, everything is a steady orange, and nothing on the seat is lit
- **mood:** hypnotic, sealed, uneasy
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 4020801
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 144 s rendered, 141.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 20.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:carseat, pov:the-tunnel
- **loop:** no, a one-shot
- **length:** 6222294 samples at 44.1 kHz (141.10 s), about 75.3 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "waves 7 and 8: a motorway tunnel; the passing light stops, everything is a steady orange, and nothing on the seat is lit". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in C minor, 144 seconds, with no voice, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4020800 (1.4s of near-silence (limit 0.5)). Seed 4020801 is the take.

## Prompt

> Dark minimal techno, 128 bpm, C minor, a machine ensemble with fixed jobs: a dry four-on-the-floor kick, a rolling tight lean bassline under a filter, bass well under the mids, a ticking hi-hat pattern, a droning orange-toned synth pad that never changes chord, a sparse dub chord stab with echo, a slow filter sweep as the long build, in C minor, hypnotic and uneasy, mid start, a long sealed plateau, a dip to the pad alone, a final lift as the tunnel ends, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4020800: 1.4s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.8, gain +0.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.35 dBFS decoded (pre-encode -3.07) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.54 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.06 % below 60 Hz (raw render 25.8 %) | under 12 % | yes |
| onset rate | 2.62 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -71.2 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
