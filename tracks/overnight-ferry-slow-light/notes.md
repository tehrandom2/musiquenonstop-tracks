# Overnight Ferry, Slow Light

- **slug:** overnight-ferry-slow-light
- **idea:** the overnight ferry, engines through the hull: the overnight ferry with engines felt through the hull
- **mood:** unhurried and a little wistful, never bleak
- **bpm:** 80 (asked) / 80 (measured, folded into 70-140)
- **key:** C# minor (asked) / C# major (estimated)
- **seed:** 721001
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 92.7 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.0 s per seed, model load 20.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4089789 samples at 44.1 kHz (92.74 s), about 30.9 bars of 4/4 at 80 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the overnight ferry, engines through the hull". So I wrote it at 80 bpm in C# minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 721002 (boomy: 27.2% below 60 Hz (ceiling 12)); 721000 (onset rate 4.8/s outside 0.3-4.5); 720999 (tempo 127 vs asked 80 and others). Seed 721001 is the take.

## Prompt

> Slow late-night groove, 80 bpm, in C# minor, a drum kit of brush-handle taps, jar-lid clinks and cutting-mat ticks as the hat, a muted nylon guitar used as an instrument, a round, tape-saturated bass in the mid range, played sparsely, the overnight ferry with engines felt through the hull, unhurried and a little wistful, never bleak, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 721002: boomy: 27.2% below 60 Hz (ceiling 12)
- 721000: onset rate 4.8/s outside 0.3-4.5
- 720999: tempo 127 vs asked 80; boomy: 24.8% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 80 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.7, gain +0.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.42 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.97 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.61 % below 60 Hz (raw render 14.7 %) | under 12 % | yes |
| onset rate | 2.89 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.21x, tail-head -0.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
