# Telephone Exchange, Still Open

- **slug:** telephone-exchange-still-open
- **idea:** a telephone exchange in 1994, relays clicking: a telephone exchange in 1994 with relays clicking along the racks
- **mood:** unhurried and a little wistful, never bleak
- **bpm:** 160 (asked) / 80 (measured, folded into 70-140)
- **key:** C minor (asked) / A minor (estimated)
- **seed:** 322114
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 100 s rendered, 90.0 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.5 s per seed, model load 21.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 3966586 samples at 44.1 kHz (89.95 s), about 60.0 bars of 4/4 at 160 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a telephone exchange in 1994, relays clicking". So I wrote it at 160 bpm in C minor, 100 seconds, with no voice, under the jungle gates. I rendered 4 seeds and threw away 2: 322116 (harsh: 6.3% above 6 kHz (ceiling 3.5) and others); 322115 (harsh: 7.1% above 6 kHz (ceiling 3.5) and others). Seed 322114 is the take, but it did not clear every gate: harsh: 6.0% above 6 kHz (ceiling 3.5); boomy: 17.9% below 60 Hz (ceiling 8).

## Prompt

> Pirate-radio jungle, 160 bpm, in C minor, chopped and time-stretched funk breakbeats with rolling snare fills, relay-click stabs and a skanking offbeat organ used as instruments, a huge sine sub-bass on a half-time reggae pattern, a telephone exchange in 1994 with relays clicking along the racks, unhurried and a little wistful, never bleak, an intro of horns and skank over a half-time beat, then the full breakbeat drop, loopable, instrumental, no vocals, no singing, no speech, no wobble bass, no build-ups

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 322116: harsh: 6.3% above 6 kHz (ceiling 3.5); boomy: 14.9% below 60 Hz (ceiling 8); seam level +14.2 dB tail to head
- 322115: harsh: 7.1% above 6 kHz (ceiling 3.5); boomy: 8.9% below 60 Hz (ceiling 8); seam level +12.8 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 160 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.5, gain +0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.06 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 6.03 % of power above 6 kHz | under 3.5 % (jungle) | **NO** |
| boominess | 17.94 % below 60 Hz (raw render 42.9 %) | under 8 % | **NO** |
| onset rate | 5.10 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.61x, tail-head -4.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 322117 (telephone-exchange-still-open-take2.mp3)

-16.0 LUFS, peak -1.88 dBFS decoded, 3.94 % >6 kHz, 19.80 % <60 Hz, 5.31 onsets/s, seam 0.04x / +10.2 dB, checks: failed harsh: 3.9% above 6 kHz (ceiling 3.5); boomy: 19.8% below 60 Hz (ceiling 8); seam level +10.2 dB tail to head

## Checks

kept despite failing: harsh: 6.0% above 6 kHz (ceiling 3.5); boomy: 17.9% below 60 Hz (ceiling 8)
