# Snow Falling, Number Nine

- **slug:** snow-falling-number-nine
- **idea:** snow falling on a petrol station forecourt: snow falling on a petrol station forecourt under buzzing lights
- **mood:** cosy and absent-minded, nothing to prove
- **bpm:** 82 (asked) / 82 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# minor (estimated)
- **seed:** 201972
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.9 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 27.9 s per seed, model load 20.4 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4010418 samples at 44.1 kHz (90.94 s), about 31.1 bars of 4/4 at 82 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "snow falling on a petrol station forecourt". So I wrote it at 82 bpm in F# minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 201969 (seam level +6.3 dB tail to head); 201971 (harsh: 3.9% above 6 kHz (ceiling 2.5) and others). Seed 201972 is the take.

## Prompt

> Warm unhurried downtempo groove, 82 bpm, in F# minor, a drum kit of radiator knocks, a teaspoon on a mug and a sticky-tape rasp as the hat, a soft music-box celesta used as an instrument, a warm sine sub on a half-time pattern, snow falling on a petrol station forecourt under buzzing lights, cosy and absent-minded, nothing to prove, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 201969: seam level +6.3 dB tail to head
- 201971: harsh: 3.9% above 6 kHz (ceiling 2.5); onset rate 4.6/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 82 bpm vs asked 82 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.96 dBFS decoded (pre-encode -3.15) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.55 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.20 % below 60 Hz (raw render 10.6 %) | under 12 % | yes |
| onset rate | 2.24 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -2.9 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 201970 (snow-falling-number-nine-take2.mp3)

-16.0 LUFS, peak -2.53 dBFS decoded, 1.68 % >6 kHz, 6.96 % <60 Hz, 2.74 onsets/s, seam 0.01x / +2.2 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
