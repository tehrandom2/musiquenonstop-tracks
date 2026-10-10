# Night Airport, After Hours

- **slug:** night-airport-after-hours
- **idea:** the night bus to the airport, everyone asleep: a night bus to the airport with everyone asleep and the road lights sliding past
- **mood:** tired and quiet, awake when nobody else is, never creepy
- **bpm:** 70 (asked) / 139 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 346209
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 91.6 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 29.1 s per seed, model load 22.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "the night bus to the airport, everyone asleep". "a bus shelter, public transport" I took as: the hiss of a bus door as the hat, a place clause for a shelter after the last bus. "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. "chill, lo-fi, study" I took as: a laid-back loopable groove around 70 bpm, nothing that grabs the ear. So I wrote it at 70 bpm in C minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 346208 (seam level -5.5 dB tail to head); 346206 (harsh: 3.7% above 6 kHz (ceiling 2.5) and others). Seed 346209 is the take.

## Prompt

> Slow late-night groove, 70 bpm, in C minor, a drum kit of brush-handle taps, jar-lid clinks and a bus-door hiss as the hat, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a night bus to the airport with everyone asleep and the road lights sliding past, tired and quiet, awake when nobody else is, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 346208: seam level -5.5 dB tail to head
- 346206: harsh: 3.7% above 6 kHz (ceiling 2.5); onset rate 5.1/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 70 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.6, gain +2.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.05 dBFS decoded (pre-encode -3.01) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.24 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.19 % below 60 Hz (raw render 21.9 %) | under 12 % | yes |
| onset rate | 3.30 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head +0.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 346207 (night-airport-after-hours-take2.mp3)

-16.6 LUFS, peak -1.33 dBFS decoded, 2.40 % >6 kHz, 10.45 % <60 Hz, 2.91 onsets/s, seam 0.31x / -0.2 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
