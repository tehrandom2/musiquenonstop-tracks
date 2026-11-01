# Closing Time Keys

- **slug:** head-nod-closing-time-keys
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 65 (asked) / 129 (measured, folded into 70-140)
- **key:** B minor (asked) / F# minor (estimated)
- **seed:** 4410301
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 145 s rendered, 140.4 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: C, Jazz Crate, track 10
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt C
- **loop:** no, a one-shot
- **length:** 6191314 samples at 44.1 kHz (140.39 s), about 38.0 bars of 4/4 at 65 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 65 bpm in B minor, 145 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410302 (0.8s of near-silence (limit 0.5) and others). Seed 4410301 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5).

## Prompt

> Dusty jazz-sample boom bap, chopped jazz piano chords played softly, a lonely muted trumpet, upright-style round bass, lazy swung drums with a big reverb tail on the snare, crackly old-record texture, a breakdown without drums near the end, warm, dark and nostalgic, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410302: 0.8s of near-silence (limit 0.5); boomy: 16.2% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 129 bpm vs asked 65 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.2, gain -1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.69 dBFS decoded (pre-encode -3.53) | under -1 dBFS | yes |
| silence | longest 0.75 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 0.12 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.61 % below 60 Hz (raw render 18.7 %) | under 12 % | yes |
| onset rate | 2.12 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -61.0 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5)
