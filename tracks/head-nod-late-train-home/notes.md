# Late Train Home

- **slug:** head-nod-late-train-home
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 67 (asked) / 132 (measured, folded into 70-140)
- **key:** C minor (asked) / G major (estimated)
- **seed:** 4410272
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 150 s rendered, 147.6 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: C, Jazz Crate, track 7
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt C
- **loop:** no, a one-shot
- **length:** 6507896 samples at 44.1 kHz (147.57 s), about 41.2 bars of 4/4 at 67 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 67 bpm in C minor, 150 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410271 (0.6s of near-silence (limit 0.5)). Seed 4410272 is the take.

## Prompt

> Dusty jazz-sample boom bap, chopped soul-jazz electric piano phrases, soft brushed cymbals, a mellow vibraphone line, upright-style round bass, lazy swung drums with a big reverb tail on the snare, crackly old-record texture, a breakdown without drums near the end, warm, dark and nostalgic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410271: 0.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 132 bpm vs asked 67 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.6, gain +0.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.67 dBFS decoded (pre-encode -3.09) | under -1 dBFS | yes |
| silence | longest 0.50 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.54 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.73 % below 60 Hz (raw render 7.3 %) | under 12 % | yes |
| onset rate | 2.17 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.92x, tail-head -72.9 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
