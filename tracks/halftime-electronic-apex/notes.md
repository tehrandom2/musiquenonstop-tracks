# Halftime Electronic, Apex

- **slug:** halftime-electronic-apex
- **idea:** halftime electronic race music, 140 bpm, half-time drop every 32 bars, slow menace before a launch, crushing drop, evolving second half: halftime electronic race music
- **mood:** 
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** F minor (the model's choice) / C# major (estimated)
- **seed:** 805787
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** race   **duration:** 167 s rendered (the model's choice), 159.3 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 109.9 s per seed, model load 71.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 7023587 samples at 44.1 kHz (159.27 s), about 92.9 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "halftime electronic race music, 140 bpm, half-time drop every 32 bars, slow menace before a launch, crushing drop, evolving second half". "the race profile (the requester's key, or the owner's choice)" I took as: halftime electronic race music at 140 bpm, genre first and short; the words lead; the profile adds the bass, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "140 bpm" I took as: 140 bpm, as the words say, in place of the race band. "halftime electronic race music" I took as: the frame, in the requester's own words, ahead of the tempo. "half-time drop every 32 bars, slow menace before a launch, crushing drop, evolving second half" I took as: the colour, in the requester's own words and order. "half-time" I took as: a half-time feel at 140 bpm: a feel, not a halved tempo. So I wrote it at 140 bpm in F minor (the model chose the key), 167 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 805789 (passed, but outranked by the kept takes); 805790 (seam level -7.9 dB tail to head); 805792 (onset rate 7.0/s outside 1.5-6.5); 805788 (1.9s of near-silence (limit 0.5)). Seed 805787 is the take.

## Prompt

> Halftime electronic race music, 140 bpm, half-time drop every 32 bars, slow menace before a launch, crushing drop, evolving second half, a heavy reese sub bass with snarling mid-range growls, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An aggressive, high-energy electronic track that opens with a tense, accelerating synth arpeggio and a driving kick drum, building anticipation before slamming into a powerful drop. The main section is dominated by a heavily distorted, wobbling synth bass that functions as the primary melodic and rhythmic force, characteristic of dubstep or brostep. This is underpinned by a punchy, straightforward electronic drum beat. The track features a brief atmospheric breakdown with melodic synth pads before launching into a second, even more intense drop with varied bass textures and a relentless, head-nodding groove.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 805789: passed, but outranked by the kept takes (no flat stretch (longest still stretch 4 s, from 0:07))
- 805790: seam level -7.9 dB tail to head (no flat stretch (longest still stretch 6 s, from 1:50))
- 805792: onset rate 7.0/s outside 1.5-6.5 (no flat stretch (longest still stretch 11 s, from 0:01))
- 805788: 1.9s of near-silence (limit 0.5) (no flat stretch (longest still stretch 6 s, from 0:07))

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.8 LUFS installed (decoded MP3 -17.2); candidate was -15.8, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.00 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 2.27 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 53.38 % below 60 Hz (raw render 53.4 %) | under 69 % | yes |
| onset rate | 4.53 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.15x, tail-head +0.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 3 s, from 1:26). Over the longest still stretch: chroma cosine 0.997, 0.0 onsets per second, spectral flux 0.29 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 805791 (halftime-electronic-apex-take2.mp3)

-15.6 LUFS, peak -2.73 dBFS decoded, 2.79 % >6 kHz, 43.45 % <60 Hz, 5.10 onsets/s, seam 0.00x / -0.8 dB, checks: all passed
no flat stretch (longest still stretch 7 s, from 0:00)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
