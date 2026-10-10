# One Machine Still Turning

- **slug:** one-machine-still-turning
- **idea:** laundrette at closing time: its own objects as the kit, a bowed musical saw as the lead, 87 bpm
- **mood:** warm and tired, the kind of tired that is nearly content, never creepy
- **bpm:** 87 (asked) / 86 (measured, folded into 70-140)
- **key:** Bb major (asked) / C major (estimated)
- **seed:** 577570
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** mellow   **duration:** 100 s rendered, 89.8 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 67.1 s per seed, model load 52.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

You asked for nothing: the choice was mine. "nothing: the machine's own choice" I took as: a room the vocabulary has not used (laundrette at closing time), its objects as the drum kit, an unusual lead, an odd tempo (87 bpm), Bb major: the warmth of a lit room at the end of a long day, without the sugar of a bright key. So I wrote it at 87 bpm in Bb major, 100 seconds, with no voice, under the mellow gates. I rendered 3 seeds and threw away 2: 577572 (2.5s of near-silence and others); 577571 (0.6s of near-silence and others). Seed 577570 is the take.

## Prompt

> Warm unhurried downtempo groove, 87 bpm, in Bb major, a drum kit of dryer-drum thumps, a coin-slot click and a folding-table slap, with a spin-cycle rattle as the hat, a bowed musical saw used as an instrument, a soft sine sub that breathes slowly like a dryer fan, a laundrette at closing time with one machine still turning and the strip light buzzing, warm and tired, the kind of tired that is nearly content, never creepy, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 577572: 2.5s of near-silence; crest 19.3 dB, too peaky to reach -16 LUFS
- 577571: 0.6s of near-silence; harsh: 3.0% above 6 kHz (ceiling 2.5); crest 23.4 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 86 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.5 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.03 dBFS decoded (pre-encode -3.07) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.66 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.29 % below 60 Hz (raw render 10.4 %) | under 12 % | yes |
| onset rate | 2.82 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.36x, tail-head +0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
