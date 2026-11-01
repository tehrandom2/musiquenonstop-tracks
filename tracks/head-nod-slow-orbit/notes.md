# Slow Orbit

- **slug:** head-nod-slow-orbit
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 69 (asked) / 137 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 4410131
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 120 s rendered, 118.5 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 3
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 5224084 samples at 44.1 kHz (118.46 s), about 34.1 bars of 4/4 at 69 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 69 bpm in B minor, 120 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410132 (4.2s of near-silence (limit 0.5) and others). Seed 4410131 is the take.

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, warm detuned analog pads swelling slowly, a fuzzy little synth arpeggio, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410132: 4.2s of near-silence (limit 0.5); boomy: 16.3% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 137 bpm vs asked 69 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.0, gain +0.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.42 dBFS decoded (pre-encode -3.09) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.24 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.61 % below 60 Hz (raw render 26.5 %) | under 12 % | yes |
| onset rate | 2.13 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -62.2 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
