# Blue Hour Crate

- **slug:** head-nod-blue-hour-crate
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 71 (asked) / 70 (measured, folded into 70-140)
- **key:** A minor (asked) / D major (estimated)
- **seed:** 4410242
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 131.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: C, Jazz Crate, track 4
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt C
- **loop:** no, a one-shot
- **length:** 5784830 samples at 44.1 kHz (131.18 s), about 38.8 bars of 4/4 at 71 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 71 bpm in A minor, 135 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410241 (0.7s of near-silence (limit 0.5)). Seed 4410242 is the take, but it did not clear every gate: 0.6s of near-silence (limit 0.5).

## Prompt

> Dusty jazz-sample boom bap, chopped jazz guitar chords, a soft flute melody, upright-style round bass, lazy swung drums with a big reverb tail on the snare, crackly old-record texture, a breakdown without drums near the end, warm, dark and nostalgic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410241: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 70 bpm vs asked 71 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.81 dBFS decoded (pre-encode -3.11) | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 0.40 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.49 % below 60 Hz (raw render 19.0 %) | under 12 % | yes |
| onset rate | 2.13 per second | 0.3 to 4.5 | yes |
| loop seam | step 5.99x, tail-head -55.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.6s of near-silence (limit 0.5)
