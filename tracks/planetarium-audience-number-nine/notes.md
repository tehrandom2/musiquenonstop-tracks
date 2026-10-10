# Planetarium Audience, Number Nine

- **slug:** planetarium-audience-number-nine
- **idea:** a planetarium with no audience: a planetarium with no audience, the projector turning the stars
- **mood:** calm and a little awed
- **bpm:** 84 (asked) / 83 (measured, folded into 70-140)
- **key:** Bb minor (asked) / A# minor (estimated)
- **seed:** 781791
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 90.5 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.1 s per seed, model load 19.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 3992649 samples at 44.1 kHz (90.54 s), about 31.7 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a planetarium with no audience". "space, the stars" I took as: a vocoder lead used as an instrument, slow tempo, a minor key, a quiet-room clause. So I wrote it at 84 bpm in Bb minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 781790 (seam level +16.0 dB tail to head); 781792 (boomy: 20.6% below 60 Hz (ceiling 12) and others). Seed 781791 is the take, but it did not clear every gate: boomy: 17.8% below 60 Hz (ceiling 12).

## Prompt

> Slow late-night groove, 84 bpm, in Bb minor, a drum kit of cardboard-tube thumps, a pencil-tin rattle and a zip-pull tick as the hat, a vocoder lead used as an instrument, a warm sine sub on a half-time pattern, a planetarium with no audience, the projector turning the stars, calm and a little awed, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 781790: seam level +16.0 dB tail to head
- 781792: boomy: 20.6% below 60 Hz (ceiling 12); onset rate 4.5/s outside 0.3-4.5

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 83 bpm vs asked 84 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.5, gain +2.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.70 dBFS decoded (pre-encode -3.02) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.46 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 17.82 % below 60 Hz (raw render 39.5 %) | under 12 % | **NO** |
| onset rate | 3.38 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.21x, tail-head +0.5 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 781789 (planetarium-audience-number-nine-take2.mp3)

-16.0 LUFS, peak -1.92 dBFS decoded, 1.81 % >6 kHz, 20.73 % <60 Hz, 4.38 onsets/s, seam 0.92x / -2.8 dB, checks: failed boomy: 20.7% below 60 Hz (ceiling 12)

## Checks

kept despite failing: boomy: 17.8% below 60 Hz (ceiling 12)
