# Lift Only, Half Past

- **slug:** lift-only-half-past
- **idea:** a lift that only goes down: a lift that only goes down, the cable humming in the shaft
- **mood:** warm and tired and good-humoured, never creepy
- **bpm:** 87 (asked) / 85 (measured, folded into 70-140)
- **key:** Bb minor (asked) / A# minor (estimated)
- **seed:** 411025
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.2 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.1 s per seed, model load 20.5 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 3976077 samples at 44.1 kHz (90.16 s), about 32.7 bars of 4/4 at 87 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a lift that only goes down". So I wrote it at 87 bpm in Bb minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 411028 (0.7s of near-silence and others); 411027 (harsh: 2.8% above 6 kHz (ceiling 2.5) and others). Seed 411025 is the take, but it did not clear every gate: boomy: 21.1% below 60 Hz (ceiling 12).

## Prompt

> Dusty half-time groove, 87 bpm, in Bb minor, a drum kit of cardboard-tube thumps, a pencil-tin rattle and a zip-pull tick as the hat, a warm detuned electric piano used as an instrument, a warm sine sub on a half-time pattern, a lift that only goes down, the cable humming in the shaft, warm and tired and good-humoured, never creepy, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 411028: 0.7s of near-silence; boomy: 19.0% below 60 Hz (ceiling 12)
- 411027: harsh: 2.8% above 6 kHz (ceiling 2.5); boomy: 22.5% below 60 Hz (ceiling 12); seam level +5.5 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 85 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.5, gain +1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.78 dBFS decoded (pre-encode -3.05) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 21.11 % below 60 Hz (raw render 45.5 %) | under 12 % | **NO** |
| onset rate | 2.86 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head +2.4 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 411026 (lift-only-half-past-take2.mp3)

-16.4 LUFS, peak -1.91 dBFS decoded, 1.97 % >6 kHz, 25.29 % <60 Hz, 2.55 onsets/s, seam 0.12x / +1.9 dB, checks: failed boomy: 25.3% below 60 Hz (ceiling 12)

## Checks

kept despite failing: boomy: 21.1% below 60 Hz (ceiling 12)
