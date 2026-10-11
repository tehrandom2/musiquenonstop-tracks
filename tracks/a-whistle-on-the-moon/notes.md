# A Whistle on the Moon

- **slug:** a-whistle-on-the-moon
- **idea:** a wanderer whistling on a small grey moon, a quiet guitar under it: a tiny camp on a small grey moon, utterly still air, the microphone very close to the whistler
- **mood:** wry and content, alone and fine with it, a person keeping themselves company
- **bpm:** 84 (asked) / 85 (measured, folded into 70-140)
- **key:** G major (asked) / G major (estimated)
- **seed:** 431668
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 120 s rendered, 117.0 s installed (loop seam baked)
- **date:** 2026-10-11
- **render time:** 72.7 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 5
- **submitter:** the machine
- **tags:** whistling, guitar, solo, wanderer, arc:wanderers
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 5159700 samples at 44.1 kHz (117.00 s), about 41.0 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a wanderer whistling on a small grey moon, a quiet guitar under it". A person whistling, not a flute pretending. The guitar is there so the whistle has somewhere to sit. I asked for the microphone almost touching them: on a moon with no air, the only sound is the one right next to you. So I wrote it at 84 bpm in G major, 120 seconds, with no voice, under the ambient gates. It has no beat to hold, so 84 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. I rendered 6 seeds and threw away 4: 431672 (passed, but outranked by the kept takes); 431667 (passed, but outranked by the kept takes); 431671 (passed, but outranked by the kept takes); 431670 (passed, but outranked by the kept takes). Seed 431668 is the take.

## Prompt

> Solo folk tune, very close and plain, 84 bpm, in G major, a person whistling a simple phrase with their lips, untrained and human, slightly breathy, over a steel-string acoustic guitar fingerpicked very quietly, a tiny camp on a small grey moon, utterly still air, the microphone very close to the whistler, wry and content, alone and fine with it, a person keeping themselves company, the guitar for a bar, then the whistled phrase repeated with small changes, loopable, stays sparse, ends with the guitar alone, instrumental, no singing, no words, no speech, no flute, no drums, no beat, no drops, no synth, no strings, no orchestra, no sub bass

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 431672: passed, but outranked by the kept takes
- 431667: passed, but outranked by the kept takes
- 431671: passed, but outranked by the kept takes
- 431670: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 85 bpm vs asked 84 | not applied: no beat was asked for | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -15.7, gain -2.3 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -3.98 dBFS decoded (pre-encode -3.73) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.00 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.01 % below 60 Hz (raw render 0.0 %) | under 8 % | yes |
| onset rate | 2.75 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.05x, tail-head +1.7 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 431669 (a-whistle-on-the-moon-take2.mp3)

-18.0 LUFS, peak -3.47 dBFS decoded, 0.02 % >6 kHz, 0.02 % <60 Hz, 1.90 onsets/s, seam 0.10x / +0.4 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 431668 and answered the questions below; this is a check, not the owner's ears.

> A close, simple acoustic arrangement featuring a breathy, untrained human whistle over quiet, fingerpicked steel-string guitar. The track remains sparse, repeating variations of a single phrase in a peaceful folk style.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Solo folk tune, very close and plain", with no steady beat? | yes | A close, plain folk tune without a beat. |
| Is the lead what was asked for: "a person whistling a simple phrase with their lips, untrained and human, slightly breathy, over a steel-string acoustic guitar fingerpicked very quietly"? | yes | A whistled melody over a fingerpicked acoustic guitar is clearly heard. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | Only whistling and guitar; no vocals. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a click or jump inside the track? It is a loop: its end is meant to run straight back into its start, so an end that stops without a fade is not a fault. | yes | Audio is clean and loopable without noticeable artifacts. |

Listen score 100 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0092 USD.

Other takes, as the model heard them: seed 431669: listen score 100; seed 431672: listen score 100; seed 431667: listen score 91; seed 431671: listen score 68; in doubt: lead; seed 431670: listen score 36; heard as wrong: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
