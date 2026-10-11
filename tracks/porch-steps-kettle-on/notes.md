# Porch Steps, Kettle On

- **slug:** porch-steps-kettle-on
- **idea:** a slow porch at sunrise, cello and soft guitar, rubato: a wooden porch at dawn, still cold air, birds very faint, recorded close with one microphone
- **mood:** tender and unhurried, the quiet before anyone else is awake, wonder at an ordinary morning
- **bpm:** 60 (asked) / 119 (measured, folded into 70-140)
- **key:** D major (asked) / F# minor (estimated)
- **seed:** 251552
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 140 s rendered, 136.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-11
- **render time:** 90.1 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 2
- **submitter:** the machine
- **tags:** cello, guitar, morning, arc:opening
- **loop:** no, a one-shot
- **length:** 6039224 samples at 44.1 kHz (136.94 s), about 34.2 bars of 4/4 at 60 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a slow porch at sunrise, cello and soft guitar, rubato". A morning piece in no hurry. A bowed cello over a barely touched guitar, with rests long enough to hear the porch. I kept the tempo free on purpose: this is the album breathing in before it leaves. So I wrote it at 60 bpm in D major, 140 seconds, with no voice, under the ambient gates. It has no beat to hold, so 60 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 6 seeds and threw away 4: 251554 (passed, but outranked by the kept takes); 251549 (passed, but outranked by the kept takes); 251553 (passed, but outranked by the kept takes); 251550 (5.1s of near-silence (limit 3.0)). Seed 251552 is the take.

## Prompt

> Slow rubato acoustic chamber piece, no steady beat, 60 bpm, in D major, a solo cello bowed slowly, warm and close, rosin and bow noise audible, over a steel-string acoustic guitar fingerpicked very softly, a wooden porch at dawn, still cold air, birds very faint, recorded close with one microphone, tender and unhurried, the quiet before anyone else is awake, wonder at an ordinary morning, the guitar alone for a few bars, the cello enters with long held notes, long pauses between phrases, the room carries the gaps, ends on one held cello note fading out, instrumental, no vocals, no singing, no speech, no drums, no beat, no drops, no build-ups, no synth, no piano, no orchestra, no sub bass

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 251554: passed, but outranked by the kept takes
- 251549: passed, but outranked by the kept takes
- 251553: passed, but outranked by the kept takes
- 251550: 5.1s of near-silence (limit 3.0)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 119 bpm vs asked 60 | not applied: no beat was asked for | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -15.2, gain -2.8 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -4.18 dBFS decoded (pre-encode -3.93) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.05 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.02 % below 60 Hz (raw render 0.1 %) | under 8 % | yes |
| onset rate | 2.41 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.13x, tail-head -52.6 dB | not applied: a one-shot, not a loop | yes |

## Second take: seed 251551 (porch-steps-kettle-on-take2.mp3)

-18.0 LUFS, peak -3.31 dBFS decoded, 0.13 % >6 kHz, 0.02 % <60 Hz, 1.57 onsets/s, seam 0.06x / -29.5 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 251552 and answered the questions below; this is a check, not the owner's ears.

> A slow acoustic piece featuring a guitar and cello. The mood is calm and peaceful.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Slow rubato acoustic chamber piece, no steady beat", with no steady beat? | yes | Acoustic chamber piece, no drums. |
| Is the lead what was asked for: "a solo cello bowed slowly, warm and close, rosin and bow noise audible, over a steel-string acoustic guitar fingerpicked very softly"? | yes | Cello and guitar. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | No vocals. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a sudden cut-off at the end? | yes | Clean recording. |

Listen score 100 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0096 USD.

Other takes, as the model heard them: seed 251551: listen score 77; in doubt: lead; seed 251554: listen score 77; in doubt: lead; seed 251549: listen score 73; seed 251553: listen score 73; heard as wrong: lead; seed 251550: listen score 59; in doubt: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
