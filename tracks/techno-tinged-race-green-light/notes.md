# Techno-tinged Race, Green Light

- **slug:** techno-tinged-race-green-light
- **idea:** techno-tinged race music, 176 bpm, industrial foundry full of sparks, pounding drums, evolving second half, bigger second drop: techno-tinged race music
- **mood:** 
- **bpm:** 176 (asked) / 87 (measured, folded into 70-140)
- **key:** G# minor (the model's choice) / A minor (estimated)
- **seed:** 647852
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** race   **duration:** 240 s rendered (the model's choice), 232.9 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 225.8 s per seed, model load 270.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 10272994 samples at 44.1 kHz (232.95 s), about 170.8 bars of 4/4 at 176 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "techno-tinged race music, 176 bpm, industrial foundry full of sparks, pounding drums, evolving second half, bigger second drop". "the race profile (the requester's key, or the owner's choice)" I took as: techno-tinged race music at 176 bpm, genre first and short; the words lead; the profile adds the bass, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "176 bpm" I took as: 176 bpm, as the words say, in place of the race band. "techno-tinged race music" I took as: the frame, in the requester's own words, ahead of the tempo. "industrial foundry full of sparks, pounding drums, evolving second half, bigger second drop" I took as: the colour, in the requester's own words and order. So I wrote it at 176 bpm in G# minor (the model chose the key), 240 seconds (the model's choice), with no voice, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 5: 647855 (boomy: 71.4% below 60 Hz (ceiling 69)); 647857 (tempo 139 vs asked 176); 647854 (onset rate 6.6/s outside 1.5-6.5); 647856 (1.4s of near-silence (limit 0.5) and others), and 1 more (all listed below). Seed 647852 is the take.

## Prompt

> Techno-tinged race music, 176 bpm, industrial foundry full of sparks, pounding drums, evolving second half, bigger second drop, a heavy distorted reese bass locked to the kick, aggressive but readable arrangement with clear build and drop sections, instrumental, no vocals

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An intense, high-energy neurofunk track driven by rapid-fire breakbeats and an aggressive, modulating synth bassline that growls with complex filter movements. The arrangement opens with shimmering arpeggiated synths before slamming into its main groove. A powerful female vocal enters midway through, delivering soaring melodic lines drenched in spacious reverb and delay over atmospheric pads during a brief breakdown. This builds tension again towards a climactic drop featuring intricate lead synths and chopped vocal samples used as rhythmic accents. The production is polished and futuristic, characterized by sharp transients, heavy compression, and dynamic shifts between full-throttle sections and ambient interludes.

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 647855: boomy: 71.4% below 60 Hz (ceiling 69) (no flat stretch (longest still stretch 19 s, from 0:22))
- 647857: tempo 139 vs asked 176 (no flat stretch)
- 647854: onset rate 6.6/s outside 1.5-6.5 (no flat stretch (longest still stretch 2 s, from 2:18))
- 647856: 1.4s of near-silence (limit 0.5); seam level -6.6 dB tail to head (no flat stretch)
- 647853: onset rate 6.6/s outside 1.5-6.5; seam level -11.7 dB tail to head (no flat stretch (longest still stretch 2 s, from 0:02))

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 176 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -18.2 LUFS installed (decoded MP3 -18.6); candidate was -17.1, gain -1.1 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.23 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 1.50 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 33.87 % below 60 Hz (raw render 33.9 %) | under 69 % | yes |
| onset rate | 3.93 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.01x, tail-head -1.2 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 17 s, from 1:30). Over the longest still stretch: chroma cosine 0.992, 0.0 onsets per second, spectral flux 0.27 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
