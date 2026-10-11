# A Lantern Nobody Lit

- **slug:** a-lantern-nobody-lit
- **idea:** the dark comes in: a gliding singing lead, something unknown: a dim wooden hall inside something enormous and hidden, a lantern humming, long dark reverb
- **mood:** unsettling and beautiful, curiosity turning into unease, a slow dread, never violent
- **bpm:** 66 (asked) / 120 (measured, folded into 70-140)
- **key:** D minor (asked) / D major (estimated)
- **seed:** 661241
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** ambient   **duration:** 160 s rendered, 158.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-11
- **render time:** 81.9 s per seed, model load 93.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **album:** interloper ai, track 11
- **submitter:** the machine
- **tags:** slide guitar, analog synth, dark, arc:darker
- **loop:** no, a one-shot
- **length:** 6982670 samples at 44.1 kHz (158.34 s), about 43.5 bars of 4/4 at 66 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the dark comes in: a gliding singing lead, something unknown". The turn. A new voice that slides between notes, half machine and half slide guitar, so you cannot tell if a person is playing it. Everything stays slow and quiet: the dread should come from not knowing, not from noise. So I wrote it at 66 bpm in D minor, 160 seconds, with no voice, under the ambient gates. It has no beat to hold, so 66 bpm is only the grid I gave the model and the tempo gate is not applied. I set it to -17 LUFS rather than the station's -16, so it sits quieter beside the rest. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 6 seeds and threw away 5: 661239 (crest 19.0 dB, too peaky to reach -17 LUFS); 661243 (11.8s of near-silence (limit 3.0)); 661240 (4.8s of near-silence (limit 3.0) and others); 661242 (boomy: 37.6% below 60 Hz (ceiling 8) and others), and 1 more (all listed below). Seed 661241 is the take.

## Prompt

> Dark ambient folk soundscape, slow, no steady beat, 66 bpm, in D minor, a gliding monophonic analog synth lead doubled by a slide guitar, wavering pitch, singing, eerie and human, over a low warm drone, a dim wooden hall inside something enormous and hidden, a lantern humming, long dark reverb, unsettling and beautiful, curiosity turning into unease, a slow dread, never violent, the drone alone, the gliding lead enters and wanders, long pauses, never resolves, thins back to the drone, instrumental, no vocals, no speech, no beat, no drums, no drops, no horror stingers, no screaming, no harsh noise wall, no sub bass rumble

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 661239: crest 19.0 dB, too peaky to reach -17 LUFS
- 661243: 11.8s of near-silence (limit 3.0)
- 661240: 4.8s of near-silence (limit 3.0); crest 19.0 dB, too peaky to reach -17 LUFS
- 661242: boomy: 37.6% below 60 Hz (ceiling 8); crest 22.0 dB, too peaky to reach -17 LUFS
- 661238: 5.2s of near-silence (limit 3.0); boomy: 13.4% below 60 Hz (ceiling 8); crest 22.0 dB, too peaky to reach -17 LUFS

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 120 bpm vs asked 66 | not applied: no beat was asked for | yes |
| loudness | -17.0 LUFS installed (decoded MP3 -17.4); candidate was -11.7, gain -5.3 dB | -17 LUFS within 1 dB | yes |
| peak after encode | -5.93 dBFS decoded (pre-encode -5.62) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 3.0 s (ambient) | yes |
| brightness | 0.59 % of power above 6 kHz | under 5.5 % (ambient) | yes |
| boominess | 0.04 % below 60 Hz (raw render 0.2 %) | under 8 % | yes |
| onset rate | 2.31 per second | 0.02 to 3.5 | yes |
| loop seam | step 0.01x, tail-head -28.2 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Nobody on the machine can hear. gemini-3.1-pro-preview listened to seed 661241 and answered the questions below; this is a check, not the owner's ears.

> A very fast, glitchy sequence repeats constantly with harsh, rhythmic clicking. It sounds heavily degraded and ends with an abrupt synthetic tone.

| question | answer | what it heard |
|---|---|---|
| Does it match this frame: "Dark ambient folk soundscape, slow, no steady beat", with no steady beat? | **no** | It is not a folk soundscape; it is a fast, aggressive sequence (e.g., at 0:10). |
| Is the lead what was asked for: "a gliding monophonic analog synth lead doubled by a slide guitar, wavering pitch, singing, eerie and human, over a low warm drone"? | **no** | There is no gliding synth lead or drone; it is a repetitive staccato pattern throughout. |
| Is it instrumental: no singing, rapping, humming or speech anywhere? | yes | No voices are heard at any point. |
| Is it free of faults: clipping or distortion that is not part of the style, warble or smeared pitch, a dropout, a sudden cut-off at the end? | **no** | The audio consists of a severely degraded, glitchy loop with extreme artifacting. |

Listen score 36 of 100 (weighted share of good answers; it breaks ties between takes, the gates decide). Cost 0.0113 USD.

The gates passed this take, but the model heard it as wrong on: lead.

Other takes, as the model heard them: seed 661239: listen score 55; heard as wrong: lead; seed 661243: listen score 45; heard as wrong: lead; seed 661240: listen score 77; in doubt: lead; seed 661242: listen score 55; heard as wrong: lead; seed 661238: listen score 45; heard as wrong: lead.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
