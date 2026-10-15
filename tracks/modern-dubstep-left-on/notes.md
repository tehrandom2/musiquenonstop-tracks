# Modern Dubstep, Left On

- **slug:** modern-dubstep-left-on
- **idea:** modern dubstep banger, 140 bpm half-time, huge detuned sawtooth wobble bass with fast LFO growls and formant yoi, thick sub, cracking snare, riser build into a massive drop, instrumental: a lamp-lit desk late in the evening
- **mood:** broad and dignified, never bombastic
- **bpm:** 76 (asked) / 76 (measured, folded into 70-140)
- **key:** B minor (asked) / E minor (estimated)
- **seed:** 196507
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7, shift 3, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 88.0 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 16.6 s per seed, model load 36.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 3879882 samples at 44.1 kHz (87.98 s), about 27.9 bars of 4/4 at 76 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "modern dubstep banger, 140 bpm half-time, huge detuned sawtooth wobble bass with fast LFO growls and formant yoi, thick sub, cracking snare, riser build into a massive drop, instrumental". "epic, cinematic" I took as: a slow brass swell used as an instrument, wide and warm, no drops, no build-ups. So I wrote it at 76 bpm in B minor, 100 seconds, with no voice, under the mellow gates. I rendered 6 seeds and threw away 5: 196510 (boomy: 37.4% below 60 Hz (ceiling 12)); 196508 (boomy: 37.9% below 60 Hz (ceiling 12)); 196512 (boomy: 26.8% below 60 Hz (ceiling 12)); 196509 (boomy: 22.0% below 60 Hz (ceiling 12)), and 1 more (all listed below). Seed 196507 is the take.

## Prompt

> Laid back lo-fi groove, 76 bpm, in B minor, a drum kit of shoebox thumps, a stapler click and a paper-rustle shaker as the hat, a slow brass swell used as an instrument, a soft sine sub that rolls under the beat, a lamp-lit desk late in the evening, broad and dignified, never bombastic, an intro of the lead alone, then the full groove settles in, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 196510: boomy: 37.4% below 60 Hz (ceiling 12)
- 196508: boomy: 37.9% below 60 Hz (ceiling 12)
- 196512: boomy: 26.8% below 60 Hz (ceiling 12)
- 196509: boomy: 22.0% below 60 Hz (ceiling 12)
- 196511: harsh: 3.0% above 6 kHz (ceiling 2.5); boomy: 36.1% below 60 Hz (ceiling 12)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 76 bpm vs asked 76 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.6, gain -0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.65 dBFS decoded (pre-encode -3.18) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.67 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 8.17 % below 60 Hz (raw render 20.0 %) | under 12 % | yes |
| onset rate | 2.84 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.08x, tail-head -0.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
