# Rain Shelter, Last Call, Rain Harder Tin

- **slug:** rain-shelter-last-call-rain-harder-tin
- **idea:** rain on a bus shelter at 2 a.m.: a bus shelter after the last bus
- **mood:** damp and tired and quietly good-humoured, never creepy
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** B minor (asked) / A minor (estimated)
- **seed:** 396848
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.0 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 167.7 s per seed, model load 245.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: station
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 3968134 samples at 44.1 kHz (89.98 s), about 27.0 bars of 4/4 at 72 bpm (the MP3 adds encoder padding; the length is of the PCM)
- **parent:** rain-shelter-last-call (seed 396848 kept)
- **change:** `kit`: 'a drum kit of rain-on-tin taps, a dripping-gutter click and a bus-door hiss as the hat' -> 'a drum kit of rain-on-tin taps, a dripping-gutter click and a bus-door hiss as the hat, with the rain much harder and heavier'

## Why

This is a variation of rain-shelter-last-call: the ask was "make it rain harder on the tin", and the seed stayed. "rain" I took as: rain as an instrument: tin taps and a gutter drip as the drum kit, minor key, slow, a damp mood clause. "a bus shelter, public transport" I took as: the hiss of a bus door as the hat, a place clause for a shelter after the last bus. "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. So I wrote it at 72 bpm in B minor, 100 seconds, with no voice, under the mellow gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 1 seed and kept it. Seed 396848 is the take, but it did not clear every gate: seam level +6.1 dB tail to head.

## Prompt

> Slow late-night groove, 72 bpm, in B minor, a drum kit of rain-on-tin taps, a dripping-gutter click and a bus-door hiss as the hat, with the rain much harder and heavier, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a bus shelter after the last bus, damp and tired and quietly good-humoured, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.8, gain +1.8 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.52 dBFS decoded (pre-encode -3.03) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.39 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.68 % below 60 Hz (raw render 20.6 %) | under 12 % | yes |
| onset rate | 2.94 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.30x, tail-head +6.1 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

kept despite failing: seam level +6.1 dB tail to head
