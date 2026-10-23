# Maximal Over-the-top, Apex

- **slug:** maximal-over-the-top-apex
- **idea:** 150 bpm, a maximal, over-the-top brostep and riddim banger that tries far too hard: screeching formant bass, growling bass, metallic riddim wobbles, brutal half-time drops, comic excess, out-dubstepping the king of dubstep: a maximal
- **mood:** 
- **bpm:** 150 (asked) / 74 (measured, folded into 70-140)
- **key:** G minor (the model's choice) / G minor (estimated)
- **seed:** 480700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7, shift 3, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** race   **duration:** 215 s rendered (the model's choice), 208.3 s installed (loop seam baked)
- **date:** 2026-10-23
- **render time:** 169.8 s per seed, model load 361.8 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 9186051 samples at 44.1 kHz (208.30 s), about 130.2 bars of 4/4 at 150 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "150 bpm, a maximal, over-the-top brostep and riddim banger that tries far too hard: screeching formant bass, growling bass, metallic riddim wobbles, brutal half-time drops, comic excess, out-dubstepping the king of dubstep". "the race profile (the requester's key, or the owner's choice)" I took as: a maximal at 150 bpm, genre first and short; the words lead; the profile adds the kick, the arrangement, the evolving second half; the key and the length (the model's choice, 120 to 240 s) left to the model. "150 bpm" I took as: 150 bpm, as the words say, in place of the race band. "a maximal" I took as: the frame, in the requester's own words, ahead of the tempo. "over-the-top brostep and riddim banger that tries far too hard: screeching formant bass, growling bass, metallic riddim wobbles, brutal half-time drops, comic excess, out-dubstepping the king of dubstep" I took as: the colour, in the requester's own words and order. "half-time" I took as: a half-time feel at 150 bpm: a feel, not a halved tempo. "wobble bass" I took as: a wobble bass, in the requester's own words. So I wrote it at 150 bpm in G minor (the model chose the key), 215 seconds (the model's choice), with no voice, under the race gates. I rendered 4 seeds and threw away 2: 480701 (seam level +6.8 dB tail to head); 480699 (seam level -6.8 dB tail to head). Seed 480700 is the take.

## Prompt

> A maximal, 150 bpm, over-the-top brostep and riddim banger that tries far too hard: screeching formant bass, growling bass, metallic riddim wobbles, brutal half-time drops, comic excess, out-dubstepping the king of dubstep, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, an evolving second half with new chords, a moving bassline and a second, bigger drop, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An explosive fusion of speedcore and chiptune, this instrumental track launches with soaring trance-style synth pads before slamming into an extreme tempo driven by relentless blast beats and heavily distorted kick drums that function like a rhythmic bassline. The soundscape is saturated with layers of frantic square wave arpeggios, aggressive sawtooth leads, and glitchy edits characteristic of breakcore. The structure shifts between full-throttle assaults and brief melodic interludes featuring cleaner piano-like synths and atmospheric pads, only to build back up with even greater intensity. The production creates a feeling of controlled chaos, akin to a video game boss battle's final turncoaster music sequence, concluding with a fade-out on ambient synth textures.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 480701: seam level +6.8 dB tail to head (no flat stretch (longest still stretch 4 s, from 0:02))
- 480699: seam level -6.8 dB tail to head (no flat stretch)

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 74 bpm vs asked 150 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -15.5 LUFS installed (decoded MP3 -15.9); candidate was -14.5, gain -1.0 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.25 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 2.61 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 30.32 % below 60 Hz (raw render 30.3 %) | under 69 % | yes |
| onset rate | 3.57 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.49x, tail-head -1.5 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch. Over the longest still stretch: chroma cosine 0.000, 0.0 onsets per second, spectral flux 0.00 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Second take: seed 480698 (maximal-over-the-top-apex-take2.mp3)

-17.6 LUFS, peak -2.38 dBFS decoded, 2.66 % >6 kHz, 46.74 % <60 Hz, 4.19 onsets/s, seam 1.10x / -1.2 dB, checks: all passed
no flat stretch (longest still stretch 4 s, from 0:40)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
