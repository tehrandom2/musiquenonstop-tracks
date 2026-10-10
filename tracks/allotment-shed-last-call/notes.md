# Allotment Shed, Last Call

- **slug:** allotment-shed-last-call
- **idea:** the allotment shed, kettle on a camping stove: an allotment shed with a kettle on a camping stove
- **mood:** warm and a little sleepy, good-humoured
- **bpm:** 88 (asked) / 87 (measured, folded into 70-140)
- **key:** D major (asked) / A major (estimated)
- **seed:** 357624
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 91.5 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.0 s per seed, model load 19.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4034985 samples at 44.1 kHz (91.50 s), about 33.5 bars of 4/4 at 88 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the allotment shed, kettle on a camping stove". "a kitchen, coffee, cooking" I took as: found kitchen objects as the drum kit, a warm major key, a morning mood clause. So I wrote it at 88 bpm in D major, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 357621 (boomy: 12.4% below 60 Hz (ceiling 12)); 357622 (0.6s of near-silence and others); 357623 (harsh: 2.9% above 6 kHz (ceiling 2.5) and others). Seed 357624 is the take.

## Prompt

> Slow late-night groove, 88 bpm, in D major, a drum kit of spoon taps, pan lid clinks and a kettle-whistle blip, a muted nylon guitar used as an instrument, a warm sine sub on a half-time pattern, an allotment shed with a kettle on a camping stove, warm and a little sleepy, good-humoured, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 357621: boomy: 12.4% below 60 Hz (ceiling 12)
- 357622: 0.6s of near-silence; harsh: 2.9% above 6 kHz (ceiling 2.5)
- 357623: harsh: 2.9% above 6 kHz (ceiling 2.5); boomy: 15.5% below 60 Hz (ceiling 12); seam level -6.5 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -17.5, gain +1.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.50 dBFS decoded (pre-encode -3.05) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.13 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.57 % below 60 Hz (raw render 24.5 %) | under 12 % | yes |
| onset rate | 3.65 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.19x, tail-head +2.9 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
