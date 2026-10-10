# Condensation

- **slug:** condensation
- **idea:** greenhouse at dawn: its own objects as the kit, a glass harmonica as the lead, 83 bpm
- **mood:** quiet and hopeful, a little damp, good-humoured
- **bpm:** 83 (asked) / 83 (measured, folded into 70-140)
- **key:** E major (asked) / F# minor (estimated)
- **seed:** 237800
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** mellow   **duration:** 100 s rendered, 96.4 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 63.3 s per seed, model load 49.9 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4250300 samples at 44.1 kHz (96.38 s), about 33.3 bars of 4/4 at 83 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for nothing: the choice was mine. "nothing: the machine's own choice" I took as: a room the vocabulary has not used (greenhouse at dawn), its objects as the drum kit, an unusual lead, an odd tempo (83 bpm), E major: first light, but low in the range so it stays soft. So I wrote it at 83 bpm in E major, 100 seconds, with no voice, under the mellow gates. I rendered 3 seeds and threw away 1: 237802 (harsh: 3.2% above 6 kHz (ceiling 2.5) and others). Seed 237800 is the take.

## Prompt

> Warm unhurried downtempo groove, 83 bpm, in E major, a drum kit of watering-can drips, terracotta-pot knocks and a spray-bottle puff as the hat, a glass harmonica used as an instrument, a soft sine sub that rolls under the beat, a greenhouse at dawn with the glass beaded and the first light coming through, quiet and hopeful, a little damp, good-humoured, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 237802: harsh: 3.2% above 6 kHz (ceiling 2.5); seam level +10.9 dB tail to head; crest 18.2 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 83 bpm vs asked 83 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.4, gain +2.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.37 dBFS decoded (pre-encode -3.01) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.29 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.71 % below 60 Hz (raw render 19.3 %) | under 12 % | yes |
| onset rate | 2.50 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head +0.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 237801 (condensation-take2.mp3)

-16.0 LUFS, peak -2.17 dBFS decoded, 0.31 % >6 kHz, 4.25 % <60 Hz, 2.66 onsets/s, seam 0.33x / +1.9 dB, checks: all passed

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
