# Library Night, Half Past

- **slug:** library-night-half-past
- **idea:** a library the night before it closes for good: a library the night before it closes for good, lamps on and shelves half empty
- **mood:** tired and quiet, awake when nobody else is, never creepy
- **bpm:** 87 (asked) / 87 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 564002
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 94.7 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.2 s per seed, model load 19.9 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4178087 samples at 44.1 kHz (94.74 s), about 34.3 bars of 4/4 at 87 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a library the night before it closes for good". "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. So I wrote it at 87 bpm in F minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 564004 (boomy: 21.7% below 60 Hz (ceiling 12)); 564003 (boomy: 20.6% below 60 Hz (ceiling 12)); 564001 (boomy: 12.2% below 60 Hz (ceiling 12) and others). Seed 564002 is the take.

## Prompt

> Slow late-night groove, 87 bpm, in F minor, a drum kit of shoebox thumps, a stapler click and a paper-rustle shaker as the hat, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a library the night before it closes for good, lamps on and shelves half empty, tired and quiet, awake when nobody else is, never creepy, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 564004: boomy: 21.7% below 60 Hz (ceiling 12)
- 564003: boomy: 20.6% below 60 Hz (ceiling 12)
- 564001: boomy: 12.2% below 60 Hz (ceiling 12); seam level -8.6 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.7, gain -0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.93 dBFS decoded (pre-encode -3.21) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.30 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.13 % below 60 Hz (raw render 27.3 %) | under 12 % | yes |
| onset rate | 2.68 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.11x, tail-head +2.7 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
