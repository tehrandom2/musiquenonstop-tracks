# Chalk Tally

- **slug:** greytide-treehouse-chalk-tally
- **idea:** The night is over: the chalk tally on the leaning board counts what lives are left, the biscuit tin still shut, the tree asleep; the table at rest.
- **mood:** tired, proud, glowing
- **bpm:** 120 (asked) / 120 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 4041001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 145 s rendered, 138.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 21.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:treehouse, pov:the table
- **loop:** no, a one-shot
- **length:** 6107919 samples at 44.1 kHz (138.50 s), about 69.3 bars of 4/4 at 120 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The night is over: the chalk tally on the leaning board counts what lives are left, the biscuit tin still shut, the tree asleep; the table at rest.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 120 bpm in E minor, 145 seconds, with no voice, under the mellow gates. It has no beat to hold, so 120 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4041000 (0.8s of near-silence (limit 0.5)). Seed 4041001 is the take.

## Prompt

> Glowing chamber folk finale, 120 bpm, E minor, tired and proud. A small ensemble with every part in its lane: a fingerpicked acoustic guitar ostinato, a string quartet carrying the theme of the night, a soft clarinet taking the melody in the middle, tight lean upright bass under the mids, a tin-can tap and soft kick for the pulse, a wound alarm-bell tick in the gaps. Arc: guitar and a quiet tick alone, strings enter at mid energy, a long high plateau with the clarinet singing, a dip to guitar and cello, a final lift with everything, a slow fade to one plucked note. E minor, no harsh highs, instrumental, no vocals.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 4041000: 0.8s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 120 bpm vs asked 120 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.1, gain -2.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -4.03 dBFS decoded (pre-encode -3.89) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.19 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.44 % below 60 Hz (raw render 12.0 %) | under 12 % | yes |
| onset rate | 2.25 per second | 0.3 to 4.5 | yes |
| loop seam | step 8.06x, tail-head -68.4 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
