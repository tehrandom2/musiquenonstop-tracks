# Arcade After, Slow Light

- **slug:** arcade-after-slow-light
- **idea:** an arcade after closing, one machine still attracting moths: an arcade after closing with one machine still glowing and moths around it
- **mood:** playful and a little nostalgic
- **bpm:** 100 (asked) / 98 (measured, folded into 70-140)
- **key:** A major (asked) / A major (estimated)
- **seed:** 447801
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 93.3 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 30.5 s per seed, model load 23.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for "an arcade after closing, one machine still attracting moths". "games, arcade, retro" I took as: coin-slot ticks and joystick clicks as the kit, a chip-synth arpeggio used as an instrument. So I wrote it at 100 bpm in A major, 100 seconds, with no voice, under the mellow gates. I rendered 4 seeds and threw away 3: 447798 (boomy: 24.1% below 60 Hz (ceiling 12) and others); 447799 (harsh: 2.8% above 6 kHz (ceiling 2.5) and others); 447800 (harsh: 3.1% above 6 kHz (ceiling 2.5) and others). Seed 447801 is the take.

## Prompt

> Warm unhurried downtempo groove, 100 bpm, in A major, a drum kit of coin-slot ticks, joystick clicks and a button-mash flutter as the hat, a chip-synth arpeggio used as an instrument, a soft sine sub that rolls under the beat, an arcade after closing with one machine still glowing and moths around it, playful and a little nostalgic, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 447798: boomy: 24.1% below 60 Hz (ceiling 12); onset rate 4.7/s outside 0.3-4.5
- 447799: harsh: 2.8% above 6 kHz (ceiling 2.5); seam level +8.9 dB tail to head
- 447800: harsh: 3.1% above 6 kHz (ceiling 2.5); boomy: 22.8% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 98 bpm vs asked 100 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.9, gain -1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.55 dBFS decoded (pre-encode -3.33) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 2.31 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 11.45 % below 60 Hz (raw render 24.9 %) | under 12 % | yes |
| onset rate | 3.46 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.15x, tail-head +0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
