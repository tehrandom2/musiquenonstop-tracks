# Sneeze Cloud

- **slug:** greytide-kitchen-sneeze-cloud
- **idea:** Instrumental breather: the pepper mill grinds a cloud over the road and every grey dude in it sneezes and staggers, and takes more from every other tower.
- **mood:** frantic, stumbling, gleeful
- **bpm:** 152 (asked) / 76 (measured, folded into 70-140)
- **key:** G minor (asked) / G minor (estimated)
- **seed:** 3920700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 135 s rendered, 130.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 19.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:kitchen, pov:the pepper mill
- **loop:** no, a one-shot
- **length:** 5743259 samples at 44.1 kHz (130.23 s), about 82.5 bars of 4/4 at 152 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Instrumental breather: the pepper mill grinds a cloud over the road and every grey dude in it sneezes and staggers, and takes more from every other tower.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 152 bpm in G minor, 135 seconds, with no voice, under the mellow gates. It has no beat to hold, so 152 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3920701 (passed, but outranked by the kept takes). Seed 3920700 is the take.

## Prompt

> Balkan brass romp, 152 bpm, G minor. A street band: a clarinet on fast ornamented runs carrying the melody, two trumpets in harmony, a trombone on stumbling off-beat accents like sneezes, a tight lean tuba bass well under the mids, a bass drum and snare with cymbal hits, an accordion pumping chords. Frantic and gleeful. Starts mid, a long high clarinet plateau, one dip to tuba and drum, a lifted final section with every horn. G minor, instrumental, no vocals

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 3920701: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 152 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.8, gain -1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.72 dBFS decoded (pre-encode -3.31) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.37 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.61 % below 60 Hz (raw render 14.1 %) | under 12 % | yes |
| onset rate | 4.48 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.09x, tail-head -45.8 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
