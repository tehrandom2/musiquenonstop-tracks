# Bubblegum Fog

- **slug:** head-nod-bubblegum-fog
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 73 (asked) / 72 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 4410152
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 125 s rendered, 120.7 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 5
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 5324120 samples at 44.1 kHz (120.73 s), about 36.7 bars of 4/4 at 73 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 73 bpm in A minor, 125 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410151 (1.4s of near-silence (limit 0.5)). Seed 4410152 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5).

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, a sweet wobbly synth melody over warbly chords, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410151: 1.4s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 73 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.48 dBFS decoded (pre-encode -3.17) | under -1 dBFS | yes |
| silence | longest 0.65 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.09 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.01 % below 60 Hz (raw render 7.2 %) | under 12 % | yes |
| onset rate | 1.87 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.51x, tail-head -69.5 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5)
