# Downriver, Single Note

- **slug:** downriver-single-note
- **idea:** a boat on dark water, a single plucked note driving it, bittersweet and fast: a small boat moving quickly down a dark river under a false painted sky, water rushing past
- **mood:** bittersweet and urgent, carried along, beautiful and a little afraid
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** E minor (asked) / B major (estimated)
- **seed:** 835710
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** acoustic   **duration:** 150 s rendered, 143.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-11
- **render time:** 86.4 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 12
- **submitter:** the machine
- **tags:** guitar, pulse, river, arc:darker
- **loop:** no, a one-shot
- **length:** 6321884 samples at 44.1 kHz (143.35 s), about 76.5 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a boat on dark water, a single plucked note driving it, bittersweet and fast". The only fast track. One plucked note does the work a drum would, and the river does the rest. I asked for it bittersweet rather than exciting: it is a ride you are not sure you wanted. So I wrote it at 128 bpm in E minor, 150 seconds, with no voice, under the acoustic gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 6 seeds and threw away 4: 835707 (passed, but outranked by the kept takes); 835708 (passed, but outranked by the kept takes); 835709 (boomy: 9.6% below 60 Hz (ceiling 8)); 835711 (boomy: 23.1% below 60 Hz (ceiling 8) and others). Seed 835710 is the take.

## Prompt

> Bittersweet driving instrumental, a single repeating plucked note as the engine, 128 bpm, in E minor, a single plucked note repeating fast as a pulse, a picked clean guitar melody over it, a warm analog pad far behind, a soft bass guitar holding long notes, a small boat moving quickly down a dark river under a false painted sky, water rushing past, bittersweet and urgent, carried along, beautiful and a little afraid, the single note alone, the guitar joins, the pad rises, a steady drive with no break, then the note alone again and a sudden quiet end, instrumental, no vocals, no singing, no speech, no drum kit, no snare, no drops, no wobble bass, no EDM build, no distortion, no sub bass

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 835707: passed, but outranked by the kept takes
- 835708: passed, but outranked by the kept takes
- 835709: boomy: 9.6% below 60 Hz (ceiling 8)
- 835711: boomy: 23.1% below 60 Hz (ceiling 8); crest 19.9 dB, too peaky to reach -16 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.06 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 1.0 s (acoustic) | yes |
| brightness | 1.94 % of power above 6 kHz | under 5.5 % (acoustic) | yes |
| boominess | 1.73 % below 60 Hz (raw render 5.1 %) | under 8 % | yes |
| onset rate | 3.45 per second | 0.1 to 5.0 | yes |
| loop seam | step 0.29x, tail-head -48.9 dB | not applied: a one-shot, not a loop | yes |

## Second take: seed 835706 (downriver-single-note-take2.mp3)

-16.0 LUFS, peak -2.72 dBFS decoded, 0.09 % >6 kHz, 0.24 % <60 Hz, 2.29 onsets/s, seam 6.97x / -64.5 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 835710 and answered the questions below; this is a check, not the owner's ears.

> A rapid, rhythmic plucked string creates a constant underlying pulse while a clean guitar plays a melancholy melody over soft chord swells. The piece maintains a steady, driving momentum throughout before fading away quietly.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Bittersweet driving instrumental, a single repeating plucked note as the engine", with a tempo feel of about 128 bpm (half or double time counts)? | yes | A fast repeating plucked note drives the track from the start with a tempo around 128 bpm. |
| Is the lead what was asked for: "a single plucked note repeating fast as a pulse, a picked clean guitar melody over it, a warm analog pad far behind"? | yes | The fast plucked note acts as a pulse, joined by a clean guitar melody around 0:15 and a warm background pad. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | There are no vocals, humming, or speech anywhere in the track. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a sudden cut-off at the end? | yes | The track is free of obvious distortion and fades out smoothly at the end. |

Listen score 100 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0179 USD.

Other takes, as the model heard them: seed 835706: listen score 91; seed 835707: listen score 77; in doubt: lead; seed 835708: listen score 59; in doubt: lead; seed 835709: listen score 100; seed 835711: listen score 91.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
