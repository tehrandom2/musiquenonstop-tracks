# Stones That Remember

- **slug:** stones-that-remember
- **idea:** a short interlude, a sparse piano for builders long gone: an empty stone hall with a long dark reverb, ruins open to the sky
- **mood:** melancholy for something very old and long gone, quiet respect
- **bpm:** 56 (asked) / 109 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 185780
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 75 s rendered, 71.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-11
- **render time:** 55.4 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 6
- **submitter:** the machine
- **tags:** piano, interlude, ancient, arc:wanderers
- **loop:** no, a one-shot
- **length:** 3165822 samples at 44.1 kHz (71.79 s), about 16.8 bars of 4/4 at 56 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a short interlude, a sparse piano for builders long gone". A short breath between wanderers. Piano stands for whoever built the ruins: a few notes and then the hall answers. The silences are the point, so I asked for them twice. So I wrote it at 56 bpm in A minor, 75 seconds, with no voice, under the ambient gates. It has no beat to hold, so 56 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -19 LUFS rather than the station's -16, so it sits quieter beside the rest. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 6 seeds and threw away 4: 185778 (passed, but outranked by the kept takes); 185777 (passed, but outranked by the kept takes); 185776 (passed, but outranked by the kept takes); 185779 (7.7s of near-silence (limit 3.0)). Seed 185780 is the take.

## Prompt

> Sparse ambient piano piece with long silences, free tempo, 56 bpm, in A minor, a felt-damped upright piano, a few notes at a time, slightly out of tune, a little off-kilter, an empty stone hall with a long dark reverb, ruins open to the sky, melancholy for something very old and long gone, quiet respect, a few notes, a long silence, a few more, the room carries the gaps, never builds, ends on a single low note left ringing, instrumental, no vocals, no speech, no drums, no beat, no drops, no strings, no pad, no synth, no melody hooks, no sub bass

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 185778: passed, but outranked by the kept takes
- 185777: passed, but outranked by the kept takes
- 185776: passed, but outranked by the kept takes
- 185779: 7.7s of near-silence (limit 3.0)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 109 bpm vs asked 56 | not applied: no beat was asked for | yes |
| loudness | -19.0 LUFS installed (decoded MP3 -19.4); candidate was -16.6, gain -2.4 dB | -19 LUFS within 1 dB | yes |
| peak after encode | -4.86 dBFS decoded (pre-encode -4.41) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.04 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.01 % below 60 Hz (raw render 0.0 %) | under 8 % | yes |
| onset rate | 2.08 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.36x, tail-head -58.6 dB | not applied: a one-shot, not a loop | yes |

## Second take: seed 185781 (stones-that-remember-take2.mp3)

-19.0 LUFS, peak -5.36 dBFS decoded, 0.27 % >6 kHz, 0.02 % <60 Hz, 3.18 onsets/s, seam 0.88x / -58.5 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 185780 and answered the questions below; this is a check, not the owner's ears.

> A sparse and melancholic piano piece features isolated, muffled notes echoing in a reverberant space. The slow, arrhythmic timing and slightly wavering pitch create an atmosphere of quiet reflection.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Sparse ambient piano piece with long silences, free tempo", with no steady beat? | yes | Sparse piano notes with long pauses and no steady beat throughout. |
| Is the lead what was asked for: "a felt-damped upright piano, a few notes at a time, slightly out of tune, a little off-kilter"? | yes | Soft, muffled piano playing isolated, slightly wobbly notes from 0:00 to 1:11. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | Strictly instrumental with no vocals detected. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a sudden cut-off at the end? | yes | The audio is clean, with the wobbly pitch aligning with the requested style and a natural decay at the end. |

Listen score 100 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0183 USD.

Other takes, as the model heard them: seed 185781: listen score 91; seed 185778: listen score 77; in doubt: lead; seed 185777: listen score 73; seed 185776: listen score 68; in doubt: lead; seed 185779: listen score 91.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
