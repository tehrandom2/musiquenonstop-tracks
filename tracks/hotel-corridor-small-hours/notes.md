# Hotel Corridor, Small Hours

- **slug:** hotel-corridor-small-hours
- **idea:** a hotel corridor at 4 a.m., ice machine humming: a hotel corridor at four in the morning with an ice machine humming at the far end
- **mood:** tired and quiet, awake when nobody else is, never creepy
- **bpm:** 75 (asked) / 74 (measured, folded into 70-140)
- **key:** Eb minor (asked) / F major (estimated)
- **seed:** 694392
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.7 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 29.0 s per seed, model load 24.9 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "a hotel corridor at 4 a.m., ice machine humming". "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. So I wrote it at 75 bpm in Eb minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 694394 (boomy: 14.9% below 60 Hz (ceiling 12) and others); 694391 (boomy: 18.6% below 60 Hz (ceiling 12) and others). Seed 694392 is the take, but it did not clear every gate: boomy: 29.3% below 60 Hz (ceiling 12).

## Prompt

> Slow late-night groove, 75 bpm, in Eb minor, a drum kit of radiator knocks, a teaspoon on a mug and a sticky-tape rasp as the hat, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a hotel corridor at four in the morning with an ice machine humming at the far end, tired and quiet, awake when nobody else is, never creepy, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 694394: boomy: 14.9% below 60 Hz (ceiling 12); seam level -5.6 dB tail to head
- 694391: boomy: 18.6% below 60 Hz (ceiling 12); onset rate 5.0/s outside 0.3-4.5; seam level -8.5 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 75 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.36 dBFS decoded (pre-encode -3.45) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.33 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 29.34 % below 60 Hz (raw render 46.5 %) | under 12 % | **NO** |
| onset rate | 3.76 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.25x, tail-head +0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 694393 (hotel-corridor-small-hours-take2.mp3)

-16.0 LUFS, peak -2.60 dBFS decoded, 0.86 % >6 kHz, 17.69 % <60 Hz, 3.12 onsets/s, seam 0.18x / +1.6 dB, checks: failed boomy: 17.7% below 60 Hz (ceiling 12)

## Checks

kept despite failing: boomy: 29.3% below 60 Hz (ceiling 12)
