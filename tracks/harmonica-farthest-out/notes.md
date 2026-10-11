# Harmonica, Farthest Out

- **slug:** harmonica-farthest-out
- **idea:** the wanderer who went farthest, a harmonica alone and far off: a cold camp at the edge of everything, open space with nothing to bounce off, heard from far away with a long thin echo
- **mood:** the loneliest of them, a signal from someone who went off and never came back, still playing anyway
- **bpm:** 84 (asked) / 74 (measured, folded into 70-140)
- **key:** G major (asked) / D major (estimated)
- **seed:** 515622
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 120 s rendered, 115.4 s installed (loop seam baked)
- **date:** 2026-10-11
- **render time:** 66.1 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 9
- **submitter:** the machine
- **tags:** harmonica, solo, wanderer, arc:wanderers
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 5089857 samples at 44.1 kHz (115.42 s), about 40.4 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the wanderer who went farthest, a harmonica alone and far off". The one who went too far. A harmonica that is plain, not bluesy, heard from so far off it is half echo. I wanted the loneliest track to still sound like it is playing for someone. So I wrote it at 84 bpm in G major, 120 seconds, with no voice, under the ambient gates. It has no beat to hold, so 84 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. I rendered 6 seeds and threw away 4: 515623 (3.4s of near-silence (limit 3.0)); 515619 (onset rate 4.7/s outside 0.02-3.5); 515624 (crest 24.0 dB, too peaky to reach -18 LUFS); 515621 (onset rate 3.6/s outside 0.02-3.5 and others). Seed 515622 is the take.

## Prompt

> Solo folk instrument heard from very far away, 84 bpm, in G major, a plain diatonic harmonica alone, played breathy and slow, long held notes, soft and plain, not blues, a cold camp at the edge of everything, open space with nothing to bounce off, heard from far away with a long thin echo, the loneliest of them, a signal from someone who went off and never came back, still playing anyway, the harmonica phrase alone, long notes, long breaths between, repeated and loopable, nothing else playing, fades rather than ends, instrumental, no vocals, no singing, no speech, no drums, no beat, no drops, no guitar, no strings, no pad, no synth, no orchestra, no sub bass, nothing else playing

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 515623: 3.4s of near-silence (limit 3.0)
- 515619: onset rate 4.7/s outside 0.02-3.5
- 515624: crest 24.0 dB, too peaky to reach -18 LUFS
- 515621: onset rate 3.6/s outside 0.02-3.5; seam level +6.5 dB tail to head

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 84 | not applied: no beat was asked for | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -18.3, gain +0.3 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -3.29 dBFS decoded (pre-encode -3.22) | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.50 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.01 % below 60 Hz (raw render 0.0 %) | under 8 % | yes |
| onset rate | 1.66 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.42x, tail-head -0.1 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 515620 (harmonica-farthest-out-take2.mp3)

-18.0 LUFS, peak -3.67 dBFS decoded, 0.00 % >6 kHz, 0.00 % <60 Hz, 1.55 onsets/s, seam 0.04x / +0.7 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 515622 and answered the questions below; this is a check, not the owner's ears.

> A lone diatonic harmonica plays a slow, breathy melody with long held notes. A persistent, loud ticking artifact intrudes in the second half of the track.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Solo folk instrument heard from very far away", with no steady beat? | yes | A solo folk instrument is heard throughout, with a distinct ticking entering later, but it feels like an artifact rather than a steady beat. |
| Is the lead what was asked for: "a plain diatonic harmonica alone, played breathy and slow, long held notes, soft and plain, not blues"? | yes | A plain diatonic harmonica is played slowly with long notes, matching the description. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | There are no vocals, singing, or speech in the track. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a click or jump inside the track? It is a loop: its end is meant to run straight back into its start, so an end that stops without a fade is not a fault. | **no** | A loud ticking noise starts around 0:44 and persists until the end. |

Listen score 82 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0094 USD.

Other takes, as the model heard them: seed 515620: listen score 64; heard as wrong: lead; seed 515623: listen score 45; heard as wrong: lead; seed 515619: listen score 36; heard as wrong: lead; seed 515624: listen score 36; heard as wrong: lead; seed 515621: listen score 68; in doubt: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
