# Dream Static

- **slug:** head-nod-dream-static
- **idea:** slow head-nod boom bap after dark
- **mood:** laid back, dark and warm
- **bpm:** 72 (asked) / 71 (measured, folded into 70-140)
- **key:** Eb minor (asked) / D major (estimated)
- **seed:** 4410192
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM None
- **tier:** fast   **gate profile:** mellow   **duration:** 140 s rendered, 138.0 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: head-nod-preview
- **album:** Head Nod After Dark: B, Woozy Haze, track 9
- **submitter:** the owner
- **tags:** boom bap, instrumental, preview, prompt B
- **loop:** no, a one-shot
- **length:** 6084747 samples at 44.1 kHz (137.98 s), about 41.4 bars of 4/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: forty slow boom bap instrumentals for the owner and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 72 bpm in Eb minor, 140 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4410191 (boomy: 14.5% below 60 Hz (ceiling 12)). Seed 4410192 is the take, but it did not clear every gate: 1.7s of near-silence (limit 0.5).

## Prompt

> Woozy psychedelic hip hop instrumental, slow swung boom bap drums with a roomy snare, shimmering detuned synth chords, a filtered noise sweep now and then, fuzzy saturated bass, wobbly tape wow and flutter, dark low-passed haze, soft vinyl crackle, dreamy and a little strange, laid back, no vocals, no singing, no speech, no drops, no trap hi-hats

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4410191: boomy: 14.5% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 71 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS installed (decoded MP3 -16.8); candidate was -16.0, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.44 dBFS decoded (pre-encode -3.12) | under -1 dBFS | yes |
| silence | longest 1.70 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.73 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.09 % below 60 Hz (raw render 24.0 %) | under 12 % | yes |
| onset rate | 1.95 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.11x, tail-head -33.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.7s of near-silence (limit 0.5)
