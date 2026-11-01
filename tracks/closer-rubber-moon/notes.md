# Rubber Moon

- **slug:** closer-rubber-moon
- **idea:** hazy late-night downtempo, closer to the sound he likes
- **mood:** hazy, dreamy and dark
- **bpm:** 68 (asked) / 136 (measured, folded into 70-140)
- **key:** Eb minor (asked) / A# minor (estimated)
- **seed:** 4420051
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM None
- **tier:** best   **gate profile:** mellow   **duration:** 160 s rendered, 158.2 s installed (one-shot, nothing baked)
- **date:** 2026-11-01
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: closer-preview
- **album:** Closer, track 5
- **submitter:** the owner
- **tags:** downtempo, instrumental, preview
- **loop:** no, a one-shot
- **length:** 6978111 samples at 44.1 kHz (158.23 s), about 44.8 bars of 4/4 at 68 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the owner's preview: five hazy downtempo instrumentals steered toward the owner's favourite reference, for him and a friend". The style was written by the station's writers from the owner's ask, in sound words only. So I wrote it at 68 bpm in Eb minor, 160 seconds, with no voice, under the mellow gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 4420053 (0.8s of near-silence (limit 0.5)); 4420052 (1.2s of near-silence (limit 0.5) and others). Seed 4420051 is the take, but it did not clear every gate: 1.6s of near-silence (limit 0.5).

## Prompt

> Hazy late-night downtempo instrumental, slow dreamy half-time groove, soft distant dusty drums tucked far behind the music, a deep warm sub bass felt more than heard, warm analog synth chords, a lazy rubbery bass line, a faint drifting synth lead, one hypnotic two-chord vamp that barely changes, heavily muffled and low-passed as if heard through a wall, warm tape haze, steady and immersive, a long slow fade at the end, no vocals, no singing, no speech, no drops, no trap hi-hats, no bright cymbals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4420053: 0.8s of near-silence (limit 0.5)
- 4420052: 1.2s of near-silence (limit 0.5); boomy: 19.7% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 68 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.65 dBFS decoded (pre-encode -3.86) | under -1 dBFS | yes |
| silence | longest 1.55 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.16 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.57 % below 60 Hz (raw render 35.5 %) | under 12 % | yes |
| onset rate | 3.24 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.60x, tail-head -58.4 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.6s of near-silence (limit 0.5)
