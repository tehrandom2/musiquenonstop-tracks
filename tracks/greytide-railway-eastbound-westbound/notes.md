# Eastbound, Westbound

- **slug:** greytide-railway-eastbound-westbound
- **idea:** Waves four and five: the green goods train with its coal wagon, van and brake van runs tunnel to tunnel, eastbound then westbound
- **mood:** relentless, hypnotic, proud
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 4060401
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 145 s rendered, 141.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 21.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:the-goods-train
- **loop:** no, a one-shot
- **length:** 6231399 samples at 44.1 kHz (141.30 s), about 81.2 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Waves four and five: the green goods train with its coal wagon, van and brake van runs tunnel to tunnel, eastbound then westbound". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 145 seconds, with no voice, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060400 (harsh: 2.6% above 6 kHz (ceiling 2.5)). Seed 4060401 is the take.

## Prompt

> Motorik krautrock instrumental, 138 bpm, in E minor, a tight machine quartet as the goods train: a locked motorik kit with a steady eighth-note hat and a snare like rail joints, a tight lean bass under the mids driving repeated eighths on the root, a chugging muted guitar figure with a phaser, a synth lead playing a simple whistle-like melody that answers itself, a low choir pad as the tunnel, the key E minor held by the bass from the first bar; arc: a distant hum building out of the dark, the full groove at mid level, a long high plateau with the lead in harmony, a dip to a filtered pulse inside the far tunnel, a final lift as the train comes back the other way, a fading hum, no harsh highs, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4060400: harsh: 2.6% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.89 dBFS decoded (pre-encode -3.25) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.84 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.91 % below 60 Hz (raw render 32.0 %) | under 12 % | yes |
| onset rate | 3.60 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.17x, tail-head -63.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
