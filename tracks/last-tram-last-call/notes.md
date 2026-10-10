# Last Tram, Last Call

- **slug:** last-tram-last-call
- **idea:** the last tram, rain on the roof, nobody else aboard: the last tram at night with rain on the roof and nobody else aboard
- **mood:** damp and tired and quietly good-humoured, never creepy
- **bpm:** 72 (asked) / 72 (measured, folded into 70-140)
- **key:** C# minor (asked) / F# minor (estimated)
- **seed:** 798336
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.5 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 31.3 s per seed, model load 24.3 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "the last tram, rain on the roof, nobody else aboard". "rain" I took as: rain as an instrument: tin taps and a gutter drip as the drum kit, minor key, slow, a damp mood clause. "a bus shelter, public transport" I took as: the hiss of a bus door as the hat, a place clause for a shelter after the last bus. So I wrote it at 72 bpm in C# minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 798338 (0.6s of near-silence); 798337 (seam level -5.8 dB tail to head). Seed 798336 is the take.

## Prompt

> Slow late-night groove, 72 bpm, in C# minor, a drum kit of rain-on-tin taps, a dripping-gutter click and a bus-door hiss as the hat, a soft music-box celesta used as an instrument, a soft sine sub that rolls under the beat, the last tram at night with rain on the roof and nobody else aboard, damp and tired and quietly good-humoured, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 798338: 0.6s of near-silence
- 798337: seam level -5.8 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 72 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.73 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.85 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.95 % below 60 Hz (raw render 22.5 %) | under 12 % | yes |
| onset rate | 2.77 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.10x, tail-head -2.4 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 798339 (last-tram-last-call-take2.mp3)

-16.0 LUFS, peak -2.08 dBFS decoded, 1.08 % >6 kHz, 11.87 % <60 Hz, 3.20 onsets/s, seam 0.02x / -0.3 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
