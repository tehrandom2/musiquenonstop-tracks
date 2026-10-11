# Banjo on Falling Ground

- **slug:** banjo-on-falling-ground
- **idea:** a wanderer's banjo on a world falling apart, slower and sadder: a camp on a crumbling world, rocks shifting and falling far off, a cave mouth behind, short dry echo
- **mood:** steady in a place that is coming apart, brave and a little sad
- **bpm:** 84 (asked) / 84 (measured, folded into 70-140)
- **key:** G major (asked) / G major (estimated)
- **seed:** 487999
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** acoustic   **duration:** 120 s rendered, 115.4 s installed (loop seam baked)
- **date:** 2026-10-11
- **render time:** 68.5 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 7
- **submitter:** the machine
- **tags:** banjo, solo, wanderer, arc:wanderers
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 5090528 samples at 44.1 kHz (115.43 s), about 40.4 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a wanderer's banjo on a world falling apart, slower and sadder". The banjo again, but alone and further from home, on ground that will not stay put. The same key as the first track, played slower, so it sounds like the same song remembered badly. So I wrote it at 84 bpm in G major, 120 seconds, with no voice, under the acoustic gates. It has no beat to hold, so 84 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. I rendered 6 seeds and threw away 4: 487995 (5.7s of near-silence (limit 1.0)); 487998 (1.9s of near-silence (limit 1.0) and others); 487996 (3.1s of near-silence (limit 1.0) and others); 487994 (4.2s of near-silence (limit 1.0) and others). Seed 487999 is the take.

## Prompt

> Solo folk instrument, slow and close, 84 bpm, in G major, an old five-string banjo alone, fingerpicked slowly and gently, a short phrase repeated, some notes left to ring, not bluegrass, not country, a camp on a crumbling world, rocks shifting and falling far off, a cave mouth behind, short dry echo, steady in a place that is coming apart, brave and a little sad, the banjo phrase alone, repeated and loopable, a little slower each pass, nothing else playing, ends on an open string, instrumental, no vocals, no singing, no speech, no drums, no beat, no drops, no guitar, no strings, no pad, no synth, no orchestra, no sub bass, nothing else playing

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 487995: 5.7s of near-silence (limit 1.0)
- 487998: 1.9s of near-silence (limit 1.0); seam level -10.8 dB tail to head
- 487996: 3.1s of near-silence (limit 1.0); seam level -14.7 dB tail to head
- 487994: 4.2s of near-silence (limit 1.0); seam level -22.0 dB tail to head; crest 21.9 dB, too peaky to reach -18 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 84 | not applied: no beat was asked for | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -17.1, gain -0.9 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -3.39 dBFS decoded (pre-encode -3.27) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 1.0 s (acoustic) | yes |
| brightness | 0.07 % of power above 6 kHz | under 5.5 % (acoustic) | yes |
| boominess | 0.23 % below 60 Hz (raw render 1.4 %) | under 8 % | yes |
| onset rate | 2.23 per second | 0.1 to 5.0 | yes |
| loop seam | step 0.02x, tail-head +0.8 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 487997 (banjo-on-falling-ground-take2.mp3)

-18.0 LUFS, peak -3.87 dBFS decoded, 0.36 % >6 kHz, 0.00 % <60 Hz, 1.38 onsets/s, seam 1.22x / +1.4 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 487999 and answered the questions below; this is a check, not the owner's ears.

> A solitary banjo plays a slow and gently repeating fingerpicked phrase. The acoustic loop remains steady and unadorned by any other instruments.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Solo folk instrument, slow and close", with no steady beat? | yes | slow folk instrument with no steady beat from start to finish. |
| Is the lead what was asked for: "an old five-string banjo alone, fingerpicked slowly and gently, a short phrase repeated, some notes left to ring, not bluegrass, not country"? | yes | solo fingerpicked banjo plays a repeating phrase continuously. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | completely instrumental with no vocals. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a click or jump inside the track? It is a loop: its end is meant to run straight back into its start, so an end that stops without a fade is not a fault. | partly | slight digital warble on ringing notes near the end. |

Listen score 91 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0197 USD.

Other takes, as the model heard them: seed 487997: listen score 59; in doubt: lead; seed 487995: listen score 55; heard as wrong: lead; seed 487998: listen score 100; seed 487996: listen score 77; in doubt: lead; seed 487994: listen score 55; heard as wrong: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
