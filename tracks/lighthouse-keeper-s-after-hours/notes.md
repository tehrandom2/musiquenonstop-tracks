# Lighthouse Keeper's, After Hours

- **slug:** lighthouse-keeper-s-after-hours
- **idea:** a lighthouse keeper's kitchen at dawn: a lighthouse keeper's kitchen at dawn with the first grey light on the window
- **mood:** warm and a little sleepy, good-humoured
- **bpm:** 88 (asked) / 87 (measured, folded into 70-140)
- **key:** Bb major (asked) / D minor (estimated)
- **seed:** 222457
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 92.5 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 29.9 s per seed, model load 23.3 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "a lighthouse keeper's kitchen at dawn". "a kitchen, coffee, cooking" I took as: found kitchen objects as the drum kit, a warm major key, a morning mood clause. So I wrote it at 88 bpm in Bb major, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 222455 (boomy: 20.7% below 60 Hz (ceiling 12)); 222454 (boomy: 14.6% below 60 Hz (ceiling 12)). Seed 222457 is the take, but it did not clear every gate: boomy: 16.7% below 60 Hz (ceiling 12).

## Prompt

> Slow late-night groove, 88 bpm, in Bb major, a drum kit of spoon taps, pan lid clinks and a kettle-whistle blip, a soft music-box celesta used as an instrument, a soft sine sub that rolls under the beat, a lighthouse keeper's kitchen at dawn with the first grey light on the window, warm and a little sleepy, good-humoured, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 222455: boomy: 20.7% below 60 Hz (ceiling 12)
- 222454: boomy: 14.6% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.2, gain +1.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.05 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.57 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 16.70 % below 60 Hz (raw render 38.7 %) | under 12 % | **NO** |
| onset rate | 2.48 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.84x, tail-head -1.4 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 222456 (lighthouse-keeper-s-after-hours-take2.mp3)

-16.0 LUFS, peak -2.26 dBFS decoded, 0.96 % >6 kHz, 11.72 % <60 Hz, 2.69 onsets/s, seam 0.00x / +10.0 dB, checks: failed seam level +10.0 dB tail to head

## Checks

kept despite failing: boomy: 16.7% below 60 Hz (ceiling 12)
