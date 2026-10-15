# Modern Hard-hitting, Slipstream

- **slug:** modern-hard-hitting-slipstream
- **idea:** modern hard-hitting electronic race music, present-day production, 170 bpm, hypersonic run through a chrome tunnel, tense build into a massive drop, huge punchy drums, deep bass: modern hard-hitting electronic race music, present-day production, 170 bpm, hypersonic run through a chrome tunnel, tense build into a massive drop, huge punchy drums, deep bass
- **mood:** bright and determined, never grim
- **bpm:** 169 (asked) / 84 (measured, folded into 70-140)
- **key:** D minor (asked) / D major (estimated)
- **seed:** 111814
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** jungle   **duration:** 210 s rendered, 205.2 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 151.5 s per seed, model load 116.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 9047961 samples at 44.1 kHz (205.17 s), about 144.5 bars of 4/4 at 169 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "modern hard-hitting electronic race music, present-day production, 170 bpm, hypersonic run through a chrome tunnel, tense build into a massive drop, huge punchy drums, deep bass". "the race profile (set by the requester's key)" I took as: modern, present-day, hard-hitting electronic race music at 169 bpm, a build-up into a big drop, modern, present-day production. So I wrote it at 169 bpm in D minor, 210 seconds, with no voice, under the jungle gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 5: 111813 (tempo 136 vs asked 169); 111810 (boomy: 9.8% below 60 Hz (ceiling 8)); 111815 (boomy: 17.9% below 60 Hz (ceiling 8)); 111811 (harsh: 5.2% above 6 kHz (ceiling 3.5) and others), and 1 more (all listed below). Seed 111814 is the take.

## Prompt

> Present-day hard-hitting electronic race music, 169 bpm, in D minor, modern, clean, wide and punchy present-day production, hard-hitting modern drums: a heavy punchy kick, a snapping layered snare and quick clean hat rolls, a sharp stabbing modern synth chord used as an instrument, a growling mid-range modern bass with a clean sub under it, modern hard-hitting electronic race music, present-day production, 170 bpm, hypersonic run through a chrome tunnel, tense build into a massive drop, huge punchy drums, deep bass, bright and determined, never grim, an intro of filtered drums and a rising pad, a build-up with a snare roll and a riser, then a big drop at around 0:30 to 0:45 into the full hard-hitting drums, then a full-length driving body that keeps developing, with a second build into a bigger drop, loopable, instrumental, no vocals, no singing, no speech, no retro, no vintage, no lo-fi, no tape hiss, no vinyl crackle, no chiptune, no arcade sounds, no nostalgic mood, no old-era jungle, no pirate-radio sound, no big-beat, no chopped vintage funk breaks

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 111813: tempo 136 vs asked 169
- 111810: boomy: 9.8% below 60 Hz (ceiling 8)
- 111815: boomy: 17.9% below 60 Hz (ceiling 8)
- 111811: harsh: 5.2% above 6 kHz (ceiling 3.5); boomy: 10.4% below 60 Hz (ceiling 8)
- 111812: harsh: 6.3% above 6 kHz (ceiling 3.5); seam level -8.1 dB tail to head; crest 19.6 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 169 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.73 dBFS decoded (pre-encode -3.64) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (jungle) | yes |
| brightness | 1.44 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 1.98 % below 60 Hz (raw render 34.9 %) | under 8 % | yes |
| onset rate | 5.01 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.23x, tail-head +0.5 dB | step under 4.0x, level within 5.0 dB | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
