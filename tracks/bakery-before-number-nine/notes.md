# Bakery Before, Number Nine

- **slug:** bakery-before-number-nine
- **idea:** a bakery before the town wakes up: a bakery before the town wakes up, ovens ticking and trays cooling
- **mood:** warm and a little sleepy, good-humoured
- **bpm:** 88 (asked) / 87 (measured, folded into 70-140)
- **key:** E major (asked) / A minor (estimated)
- **seed:** 767415
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 91.6 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.8 s per seed, model load 21.3 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4040022 samples at 44.1 kHz (91.61 s), about 33.6 bars of 4/4 at 88 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a bakery before the town wakes up". "a kitchen, coffee, cooking" I took as: found kitchen objects as the drum kit, a warm major key, a morning mood clause. So I wrote it at 88 bpm in E major, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 767413 (seam level -29.4 dB tail to head); 767414 (boomy: 13.9% below 60 Hz (ceiling 12) and others). Seed 767415 is the take.

## Prompt

> Dusty half-time groove, 88 bpm, in E major, a drum kit of spoon taps, pan lid clinks and a kettle-whistle blip, a melodica used as an instrument that wanders off the tune, a warm sine sub on a half-time pattern, a bakery before the town wakes up, ovens ticking and trays cooling, warm and a little sleepy, good-humoured, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 767413: seam level -29.4 dB tail to head
- 767414: boomy: 13.9% below 60 Hz (ceiling 12); seam level +13.0 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.2, gain +2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.91 dBFS decoded (pre-encode -3.02) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.48 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 9.59 % below 60 Hz (raw render 26.6 %) | under 12 % | yes |
| onset rate | 2.63 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head +2.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 767416 (bakery-before-number-nine-take2.mp3)

-16.0 LUFS, peak -2.54 dBFS decoded, 2.39 % >6 kHz, 6.17 % <60 Hz, 3.58 onsets/s, seam 0.12x / -0.4 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
