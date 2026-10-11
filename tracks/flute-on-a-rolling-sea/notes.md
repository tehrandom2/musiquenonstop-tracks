# Flute on a Rolling Sea

- **slug:** flute-on-a-rolling-sea
- **idea:** a lone wanderer playing a wooden flute on a world of rolling sea and storms: a small island camp beside a rolling sea under storm clouds, wind and distant waves, heard from across the water with a long natural echo
- **mood:** lonely but not sad, someone playing to themselves who does not know anyone is listening
- **bpm:** 84 (asked) / 84 (measured, folded into 70-140)
- **key:** G major (asked) / D major (estimated)
- **seed:** 644358
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 120 s rendered, 114.9 s installed (loop seam baked)
- **date:** 2026-10-11
- **render time:** 89.5 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 4
- **submitter:** the machine
- **tags:** flute, solo, wanderer, arc:wanderers
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 5068583 samples at 44.1 kHz (114.93 s), about 40.2 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a lone wanderer playing a wooden flute on a world of rolling sea and storms". The first wanderer. One wooden flute, one phrase, sea weather all round it. It shares the home key and tempo so it could sit inside the gathering later; on its own it should sound like someone who has not seen anyone in a while. So I wrote it at 84 bpm in G major, 120 seconds, with no voice, under the ambient gates. It has no beat to hold, so 84 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. I rendered 6 seeds and threw away 4: 644356 (seam level -14.4 dB tail to head); 644359 (seam level -26.4 dB tail to head); 644357 (4.2s of near-silence (limit 3.0) and others); 644355 (6.9s of near-silence (limit 3.0) and others). Seed 644358 is the take.

## Prompt

> Solo folk instrument heard far off, intimate and spacious, 84 bpm, in G major, a wooden flute alone, breathy and unpolished, a short simple phrase repeated with small changes, a small island camp beside a rolling sea under storm clouds, wind and distant waves, heard from across the water with a long natural echo, lonely but not sad, someone playing to themselves who does not know anyone is listening, the flute phrase alone, repeated and loopable, long breaths between phrases, nothing else playing, no build-up, instrumental, no vocals, no singing, no speech, no drums, no beat, no drops, no guitar, no strings, no pad, no synth, no orchestra, no sub bass, nothing else playing

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 644356: seam level -14.4 dB tail to head
- 644359: seam level -26.4 dB tail to head
- 644357: 4.2s of near-silence (limit 3.0); seam level -6.2 dB tail to head
- 644355: 6.9s of near-silence (limit 3.0); seam level -9.2 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 84 | not applied: no beat was asked for | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -12.8, gain -5.2 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -6.92 dBFS decoded (pre-encode -6.50) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.06 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.01 % below 60 Hz (raw render 0.0 %) | under 8 % | yes |
| onset rate | 2.65 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.39x, tail-head -0.7 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 644354 (flute-on-a-rolling-sea-take2.mp3)

-18.0 LUFS, peak -8.14 dBFS decoded, 0.15 % >6 kHz, 0.00 % <60 Hz, 1.78 onsets/s, seam 0.40x / +0.6 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 644358 and answered the questions below; this is a check, not the owner's ears.

> A solo, breathy wooden flute plays a simple, repeating melody over the sound of ocean waves. The track is atmospheric and loopable, creating a calm, natural setting.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Solo folk instrument heard far off, intimate and spacious", with no steady beat? | partly | A wooden flute plays alone with ocean waves, but the sea sounds are quite loud, overpowering the flute at times. |
| Is the lead what was asked for: "a wooden flute alone, breathy and unpolished, a short simple phrase repeated with small changes"? | yes | A breathy, wooden flute plays a simple, repeated phrase. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | There are no vocals, singing, humming, or speech present. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a click or jump inside the track? It is a loop: its end is meant to run straight back into its start, so an end that stops without a fade is not a fault. | yes | The audio is clean, with no clipping, distortion, or noticeable artifacts. |

Listen score 91 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0093 USD.

Other takes, as the model heard them: seed 644354: listen score 77; in doubt: lead; seed 644356: listen score 100; seed 644359: listen score 36; heard as wrong: lead; seed 644357: listen score 91; seed 644355: listen score 68; in doubt: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
