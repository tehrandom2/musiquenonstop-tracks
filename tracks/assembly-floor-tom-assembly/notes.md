# Floor Tom Assembly

- **slug:** assembly-floor-tom-assembly
- **idea:** one floor-tom pattern, joined part by part until the whole room is playing it
- **mood:** steady, hypnotic, for deep work
- **bpm:** 126 (asked) / 122 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# major (estimated)
- **seed:** 5100501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 240 s rendered, 231.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 33.7 s per seed, model load 41.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** The Throne of the Third Heaven of the Nations' Millennium General Assembly, track 5
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 10219700 samples at 44.1 kHz (231.74 s), about 121.7 bars of 4/4 at 126 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "one floor-tom pattern, joined part by part until the whole room is playing it". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 126 bpm in F# minor, 240 seconds, with no voice, under the mellow gates. It has no beat to hold, so 126 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100503 (0.9s of near-silence (limit 0.5)); 5100502 (0.8s of near-silence (limit 0.5) and others). Seed 5100501 is the take.

## Prompt

> instrumental hypnotic indie folk electronica for focus, no vocals, one steady floor tom pattern that never stops, stacked hand percussion and shakers joining in layers, droning pump organ, a chiming clean guitar ostinato, soft glitchy synth blips, lo-fi basement recording warmth, steady energy that slowly thickens, a long high plateau, one short dip and a final lift, lean bass, dorian minor

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 5100503: 0.9s of near-silence (limit 0.5)
- 5100502: 0.8s of near-silence (limit 0.5); boomy: 15.7% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 122 bpm vs asked 126 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.1, gain +0.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.44 dBFS decoded (pre-encode -3.12) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.49 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.05 % below 60 Hz (raw render 26.4 %) | under 12 % | yes |
| onset rate | 3.20 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.25x, tail-head -27.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
