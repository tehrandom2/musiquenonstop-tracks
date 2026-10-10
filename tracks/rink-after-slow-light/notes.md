# Rink After, Slow Light

- **slug:** rink-after-slow-light
- **idea:** the ice rink after the zamboni: an ice rink after the zamboni, glassy and quiet
- **mood:** cosy and absent-minded, nothing to prove
- **bpm:** 86 (asked) / 86 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 327068
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 95.3 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 27.8 s per seed, model load 19.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4202715 samples at 44.1 kHz (95.30 s), about 34.1 bars of 4/4 at 86 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the ice rink after the zamboni". So I wrote it at 86 bpm in E minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 327071 (boomy: 18.8% below 60 Hz (ceiling 12)); 327070 (boomy: 13.2% below 60 Hz (ceiling 12)). Seed 327068 is the take.

## Prompt

> Dusty half-time groove, 86 bpm, in E minor, a drum kit of brush-handle taps, jar-lid clinks and cutting-mat ticks as the hat, a muted nylon guitar used as an instrument, a warm sine sub on a half-time pattern, an ice rink after the zamboni, glassy and quiet, cosy and absent-minded, nothing to prove, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 327071: boomy: 18.8% below 60 Hz (ceiling 12)
- 327070: boomy: 13.2% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 86 bpm vs asked 86 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.76 dBFS decoded (pre-encode -3.07) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.58 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.04 % below 60 Hz (raw render 16.5 %) | under 12 % | yes |
| onset rate | 2.75 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.29x, tail-head -1.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 327069 (rink-after-slow-light-take2.mp3)

-16.0 LUFS, peak -2.01 dBFS decoded, 1.33 % >6 kHz, 10.08 % <60 Hz, 3.05 onsets/s, seam 0.10x / +5.0 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
