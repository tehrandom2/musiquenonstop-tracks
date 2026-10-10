# Greenhouse Thunderstorm, After Hours

- **slug:** greenhouse-thunderstorm-after-hours
- **idea:** a greenhouse in a thunderstorm: a greenhouse in a thunderstorm with rain loud on the glass
- **mood:** damp and tired and quietly good-humoured, never creepy
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** C# minor (asked) / C# major (estimated)
- **seed:** 226459
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 95.9 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 29.7 s per seed, model load 22.8 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "a greenhouse in a thunderstorm". "rain" I took as: rain as an instrument: tin taps and a gutter drip as the drum kit, minor key, slow, a damp mood clause. So I wrote it at 72 bpm in C# minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 226460 (boomy: 27.6% below 60 Hz (ceiling 12)); 226458 (boomy: 16.0% below 60 Hz (ceiling 12) and others). Seed 226459 is the take.

## Prompt

> Dusty half-time groove, 72 bpm, in C# minor, a drum kit of rain-on-tin taps and a dripping-gutter click, a muted nylon guitar used as an instrument, a round, tape-saturated bass in the mid range, played sparsely, a greenhouse in a thunderstorm with rain loud on the glass, damp and tired and quietly good-humoured, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 226460: boomy: 27.6% below 60 Hz (ceiling 12)
- 226458: boomy: 16.0% below 60 Hz (ceiling 12); seam level +10.9 dB tail to head; crest 18.1 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.55 dBFS decoded (pre-encode -3.13) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.72 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.54 % below 60 Hz (raw render 17.4 %) | under 12 % | yes |
| onset rate | 2.54 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -0.7 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 226461 (greenhouse-thunderstorm-after-hours-take2.mp3)

-16.8 LUFS, peak -1.32 dBFS decoded, 1.21 % >6 kHz, 8.56 % <60 Hz, 2.46 onsets/s, seam 0.42x / +0.6 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
