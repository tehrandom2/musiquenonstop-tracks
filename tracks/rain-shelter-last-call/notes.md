# Rain Shelter, Last Call

- **slug:** rain-shelter-last-call
- **idea:** rain on a bus shelter at 2 a.m.: a bus shelter after the last bus
- **mood:** damp and tired and quietly good-humoured, never creepy
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** B minor (asked) / F major (estimated)
- **seed:** 396848
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 89.7 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.9 s per seed, model load 29.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "rain on a bus shelter at 2 a.m.". "rain" I took as: rain as an instrument: tin taps and a gutter drip as the drum kit, minor key, slow, a damp mood clause. "a bus shelter, public transport" I took as: the hiss of a bus door as the hat, a place clause for a shelter after the last bus. "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. So I wrote it at 72 bpm in B minor, 100 seconds, with no voice, under the mellow gates. I rendered 12 seeds and threw away 10: 396851 (passed, but outranked by the kept takes); 396850 (boomy: 18.7% below 60 Hz (ceiling 12)); 396853 (boomy: 13.8% below 60 Hz (ceiling 12)); 396852 (boomy: 17.7% below 60 Hz (ceiling 12)), and 6 more (all listed below). Seed 396848 is the take.

## Prompt

> Slow late-night groove, 72 bpm, in B minor, a drum kit of rain-on-tin taps, a dripping-gutter click and a bus-door hiss as the hat, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a bus shelter after the last bus, damp and tired and quietly good-humoured, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 396851: passed, but outranked by the kept takes
- 396850: boomy: 18.7% below 60 Hz (ceiling 12)
- 396853: boomy: 13.8% below 60 Hz (ceiling 12)
- 396852: boomy: 17.7% below 60 Hz (ceiling 12)
- 396844: boomy: 20.6% below 60 Hz (ceiling 12)
- 396846: boomy: 23.0% below 60 Hz (ceiling 12)
- 396849: boomy: 16.6% below 60 Hz (ceiling 12)
- 396845: boomy: 21.6% below 60 Hz (ceiling 12)
- 396854: boomy: 36.0% below 60 Hz (ceiling 12); seam level -10.4 dB tail to head
- 396843: boomy: 27.3% below 60 Hz (ceiling 12); seam step 7.3x; seam level -6.7 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.54 dBFS decoded (pre-encode -3.07) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.76 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.32 % below 60 Hz (raw render 14.2 %) | under 12 % | yes |
| onset rate | 2.73 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.06x, tail-head -0.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 396847 (rain-shelter-last-call-take2.mp3)

-16.0 LUFS, peak -2.61 dBFS decoded, 0.84 % >6 kHz, 9.65 % <60 Hz, 2.91 onsets/s, seam 0.03x / -0.5 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
