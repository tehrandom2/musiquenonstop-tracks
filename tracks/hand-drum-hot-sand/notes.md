# Hand Drum, Hot Sand

- **slug:** hand-drum-hot-sand
- **idea:** a wanderer playing hand drum under a hot sky, with a low drone: a desert camp under a hot white sky, sand pouring somewhere far off, dry open air
- **mood:** patient and grounded, keeping time for nobody
- **bpm:** 84 (asked) / 84 (measured, folded into 70-140)
- **key:** G major (asked) / G major (estimated)
- **seed:** 318385
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** acoustic   **duration:** 120 s rendered, 117.0 s installed (loop seam baked)
- **date:** 2026-10-11
- **render time:** 69.0 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 8
- **submitter:** the machine
- **tags:** hand drum, drone, solo, wanderer, arc:wanderers
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 5159700 samples at 44.1 kHz (117.00 s), about 41.0 bars of 4/4 at 84 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a wanderer playing hand drum under a hot sky, with a low drone". The wanderer with no tune, just time. A hand drum, fingers and palm, over a drone low enough to feel rather than follow. It is the only solo with a pulse, and it is in the gathering's tempo so the others can lock to it. So I wrote it at 84 bpm in G major, 120 seconds, with no voice, under the acoustic gates. I set it to -18 LUFS rather than the station's -16, so it sits quieter beside the rest. I rendered 6 seeds and threw away 4: 318387 (tempo 76 vs asked 84 and others); 318388 (3.1s of near-silence (limit 1.0) and others); 318390 (tempo 134 vs asked 84 and others); 318386 (tempo 98 vs asked 84 and others). Seed 318385 is the take.

## Prompt

> Solo hand drum folk piece over a drone, 84 bpm, in G major, a hand drum played with fingers and palm, soft and steady, no drum kit, a low hummed drone held underneath, very quiet, like warm wind, a desert camp under a hot white sky, sand pouring somewhere far off, dry open air, patient and grounded, keeping time for nobody, the hand drum alone for several bars, the drone fades in, a short pattern repeated with small changes, loopable, no build-up, ends with the drum alone, instrumental, no vocals, no singing, no words, no speech, no drum kit, no snare, no cymbals, no electronic beat, no drops, no synth lead, no orchestra, no sub bass

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 318387: tempo 76 vs asked 84; 4.4s of near-silence (limit 1.0)
- 318388: 3.1s of near-silence (limit 1.0); seam level -10.8 dB tail to head
- 318390: tempo 134 vs asked 84; seam level -17.7 dB tail to head
- 318386: tempo 98 vs asked 84; onset rate 5.1/s outside 0.1-5.0; seam level +11.7 dB tail to head; crest 20.6 dB, too peaky to reach -18 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 84 bpm vs asked 84 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -18.0 LUFS installed (decoded MP3 -18.4); candidate was -14.2, gain -3.8 dB | -18 LUFS within 1 dB | yes |
| peak after encode | -5.06 dBFS decoded (pre-encode -4.56) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 1.0 s (acoustic) | yes |
| brightness | 2.13 % of power above 6 kHz | under 5.5 % (acoustic) | yes |
| boominess | 0.01 % below 60 Hz (raw render 0.0 %) | under 8 % | yes |
| onset rate | 2.52 per second | 0.1 to 5.0 | yes |
| loop seam | step 0.53x, tail-head +0.4 dB | step under 4.0x, level within 5.0 dB | yes |

## Second take: seed 318389 (hand-drum-hot-sand-take2.mp3)

-18.0 LUFS, peak -3.15 dBFS decoded, 0.10 % >6 kHz, 2.34 % <60 Hz, 1.62 onsets/s, seam 0.14x / -0.9 dB, checks: all passed

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 318385 and answered the questions below; this is a check, not the owner's ears.

> A steady hand drum and shaker provide a rhythmic bed for a repetitive, cascading melody played on a plucked string instrument like a zither or harp. The mood is meditative and rhythmic, maintaining a constant energy throughout.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Solo hand drum folk piece over a drone", with a tempo feel of about 84 bpm (half or double time counts)? | partly | The tempo matches approximately 84 BPM, but the track contains elements far beyond a solo hand drum and drone, specifically a prominent string instrument (like a harp or zither). |
| Are these audible as the percussion, or as its textures: "a hand drum played with fingers and palm, soft and steady, no drum kit"? | partly | A hand drum is present and steady, but there is also a prominent shaker/tambourine and other percussion elements not described. |
| Is the lead what was asked for: "a low hummed drone held underneath, very quiet, like warm wind"? | **no** | The lead is a plucked string instrument playing a distinct melodic pattern, not a low hummed drone as requested. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | No vocals are heard in this track. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a click or jump inside the track? It is a loop: its end is meant to run straight back into its start, so an end that stops without a fade is not a fault. | yes | The track sounds clean with no obvious technical flaws. |

Listen score 62 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0103 USD.

The gates passed this take, but the model heard it as wrong on: lead.

Other takes, as the model heard them: seed 318389: listen score 54; in doubt: lead, voice; seed 318387: listen score 50; heard as wrong: lead; seed 318388: listen score 50; heard as wrong: lead; seed 318390: listen score 42; heard as wrong: lead; seed 318386: listen score 54; in doubt: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
