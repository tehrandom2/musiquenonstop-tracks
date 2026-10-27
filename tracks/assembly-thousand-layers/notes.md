# Thousand Layers

- **slug:** assembly-thousand-layers
- **idea:** everything at once, ordered: every part has its own job and the stack never collapses
- **mood:** busy but ordered, euphoric
- **bpm:** 130 (asked) / 128 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 5101001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 240 s rendered, 235.0 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 33.8 s per seed, model load 41.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** The Throne of the Third Heaven of the Nations' Millennium General Assembly, track 10
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 10362494 samples at 44.1 kHz (234.98 s), about 127.3 bars of 4/4 at 130 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "everything at once, ordered: every part has its own job and the stack never collapses". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 130 bpm in E minor, 240 seconds, with no voice, under the mellow gates. It has no beat to hold, so 130 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5101003 (passed, but outranked by the kept takes); 5101002 (boomy: 21.8% below 60 Hz (ceiling 12)). Seed 5101001 is the take.

## Prompt

> instrumental euphoric indie folk electronica for focus, no vocals, a thousand-layered sound with every part in its own lane, booming floor toms and stacked hand percussion, handclaps, droning organ, chiming guitars, violin ostinato, small brass swells, bit-crushed synth blips and arpeggios, lo-fi basement warmth, busy but ordered, steady energy with a long high plateau, one dip and a final lift, lean bass, natural minor

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 5101003: passed, but outranked by the kept takes
- 5101002: boomy: 21.8% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 128 bpm vs asked 130 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.75 dBFS decoded (pre-encode -3.58) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.49 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.77 % below 60 Hz (raw render 12.5 %) | under 12 % | yes |
| onset rate | 2.40 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.09x, tail-head -37.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
