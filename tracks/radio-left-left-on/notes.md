# Radio Left, Left On

- **slug:** radio-left-left-on
- **idea:** a radio left on in an empty flat: a radio left on in an empty flat, one lamp and a quiet street
- **mood:** cosy and absent-minded, nothing to prove
- **bpm:** 80 (asked) / 80 (measured, folded into 70-140)
- **key:** B minor (asked) / C major (estimated)
- **seed:** 193074
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 91.6 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.1 s per seed, model load 20.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4040830 samples at 44.1 kHz (91.63 s), about 30.5 bars of 4/4 at 80 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a radio left on in an empty flat". So I wrote it at 80 bpm in B minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 2: 193075 (3.2s of near-silence and others); 193077 (harsh: 3.5% above 6 kHz (ceiling 2.5) and others). Seed 193074 is the take, but it did not clear every gate: boomy: 12.9% below 60 Hz (ceiling 12).

## Prompt

> Slow late-night groove, 80 bpm, in B minor, a drum kit of radiator knocks, a teaspoon on a mug and a sticky-tape rasp as the hat, a soft music-box celesta used as an instrument, a warm sine sub on a half-time pattern, a radio left on in an empty flat, one lamp and a quiet street, cosy and absent-minded, nothing to prove, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 193075: 3.2s of near-silence; boomy: 30.8% below 60 Hz (ceiling 12)
- 193077: harsh: 3.5% above 6 kHz (ceiling 2.5); boomy: 19.8% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 80 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -18.2, gain +2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -1.95 dBFS decoded (pre-encode -3.02) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.73 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 12.92 % below 60 Hz (raw render 20.0 %) | under 12 % | **NO** |
| onset rate | 4.05 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head +1.8 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 193076 (radio-left-left-on-take2.mp3)

-17.9 LUFS, peak -2.32 dBFS decoded, 2.48 % >6 kHz, 11.84 % <60 Hz, 2.93 onsets/s, seam 0.15x / +6.8 dB, checks: failed seam level +6.8 dB tail to head

## Checks

kept despite failing: boomy: 12.9% below 60 Hz (ceiling 12)
