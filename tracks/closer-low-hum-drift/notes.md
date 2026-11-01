# Low Hum Drift

- **slug:** closer-low-hum-drift
- **idea:** hazy late-night downtempo, closer to the sound he likes
- **mood:** hazy, dreamy and dark
- **bpm:** 66 (asked) / 132 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 4420043
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 165 s rendered, 163.1 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: closer-preview
- **album:** Closer, track 4
- **submitter:** the owner
- **tags:** downtempo, instrumental, preview
- **loop:** no, a one-shot
- **length:** 7192056 samples at 44.1 kHz (163.09 s), about 44.8 bars of 4/4 at 66 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: five hazy downtempo instrumentals steered toward the owner's favourite reference, for him and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 66 bpm in F minor, 165 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 4420041 (passed, but outranked by the kept takes); 4420042 (4.1s of near-silence (limit 0.5) and others). Seed 4420043 is the take, but it did not clear every gate: 1.2s of near-silence (limit 0.5); boomy: 19.6% below 60 Hz (ceiling 12).

## Prompt

> Hazy late-night downtempo instrumental, slow dreamy half-time groove, soft distant dusty drums tucked far behind the music, a deep warm sub bass felt more than heard, a slow hazy vocoder-like synth hum used as an instrument over blurred chords, one hypnotic two-chord vamp that barely changes, heavily muffled and low-passed as if heard through a wall, warm tape haze, steady and immersive, a long slow fade at the end, no vocals, no singing, no speech, no drops, no trap hi-hats, no bright cymbals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4420041: passed, but outranked by the kept takes
- 4420042: 4.1s of near-silence (limit 0.5); boomy: 13.3% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 132 bpm vs asked 66 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.48 dBFS decoded (pre-encode -3.34) | under -1 dBFS | yes |
| silence | longest 1.25 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 0.23 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 19.62 % below 60 Hz (raw render 56.2 %) | under 12 % | **NO** |
| onset rate | 1.61 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.12x, tail-head -54.0 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.2s of near-silence (limit 0.5); boomy: 19.6% below 60 Hz (ceiling 12)
