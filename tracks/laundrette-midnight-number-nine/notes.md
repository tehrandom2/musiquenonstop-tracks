# Laundrette Midnight, Number Nine

- **slug:** laundrette-midnight-number-nine
- **idea:** a laundrette at midnight, the dryers still turning: a laundrette at midnight with the dryers still turning and the strip light buzzing
- **mood:** tired and quiet, awake when nobody else is, never creepy
- **bpm:** 76 (asked) / 76 (measured, folded into 70-140)
- **key:** Bb minor (asked) / F# minor (estimated)
- **seed:** 881938
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 88.9 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 37.5 s per seed, model load 35.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "a laundrette at midnight, the dryers still turning". "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. So I wrote it at 76 bpm in Bb minor, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 881936 (boomy: 15.9% below 60 Hz (ceiling 12)); 881939 (harsh: 3.4% above 6 kHz (ceiling 2.5) and others); 881937 (harsh: 5.2% above 6 kHz (ceiling 2.5) and others). Seed 881938 is the take.

## Prompt

> Slow late-night groove, 76 bpm, in Bb minor, a drum kit of shoebox thumps, a stapler click and a paper-rustle shaker as the hat, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, a laundrette at midnight with the dryers still turning and the strip light buzzing, tired and quiet, awake when nobody else is, never creepy, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 881936: boomy: 15.9% below 60 Hz (ceiling 12)
- 881939: harsh: 3.4% above 6 kHz (ceiling 2.5); boomy: 19.4% below 60 Hz (ceiling 12)
- 881937: harsh: 5.2% above 6 kHz (ceiling 2.5); boomy: 24.5% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 76 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.1 LUFS installed (decoded MP3 -16.5); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.29 dBFS decoded (pre-encode -3.03) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.29 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.33 % below 60 Hz (raw render 24.1 %) | under 12 % | yes |
| onset rate | 2.51 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -1.0 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
