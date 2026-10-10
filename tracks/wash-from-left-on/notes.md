# Wash From, Left On

- **slug:** wash-from-left-on
- **idea:** a car wash from inside the car: a car wash seen from inside the car, brushes and water drumming on the roof
- **mood:** unhurried and a little wistful, never bleak
- **bpm:** 75 (asked) / 74 (measured, folded into 70-140)
- **key:** F# minor (asked) / A major (estimated)
- **seed:** 557312
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 92.9 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.2 s per seed, model load 20.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4098634 samples at 44.1 kHz (92.94 s), about 29.0 bars of 4/4 at 75 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a car wash from inside the car". So I wrote it at 75 bpm in F# minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 557313 (boomy: 26.2% below 60 Hz (ceiling 12)); 557314 (boomy: 13.0% below 60 Hz (ceiling 12)); 557315 (boomy: 20.9% below 60 Hz (ceiling 12)). Seed 557312 is the take.

## Prompt

> Dusty half-time groove, 75 bpm, in F# minor, a drum kit of brush-handle taps, jar-lid clinks and cutting-mat ticks as the hat, a soft music-box celesta used as an instrument, a warm sine sub on a half-time pattern, a car wash seen from inside the car, brushes and water drumming on the roof, unhurried and a little wistful, never bleak, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 557313: boomy: 26.2% below 60 Hz (ceiling 12)
- 557314: boomy: 13.0% below 60 Hz (ceiling 12)
- 557315: boomy: 20.9% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 75 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.44 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.44 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.26 % below 60 Hz (raw render 26.3 %) | under 12 % | yes |
| onset rate | 3.69 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -4.0 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
