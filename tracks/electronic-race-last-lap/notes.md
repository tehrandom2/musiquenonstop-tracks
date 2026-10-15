# Electronic Race, Last Lap

- **slug:** electronic-race-last-lap
- **idea:** vocal electronic race music, 170 bpm, soaring female vocal hook, chasing the sound barrier, evolving second half: vocal electronic race music
- **mood:** 
- **bpm:** 170 (asked) / 139 (measured, folded into 70-140)
- **key:** F minor (the model's choice) / F major (estimated)
- **seed:** 581067
- **model:** ACE-Step 1.5, acestep-v15-xl-sft, 50 steps, guidance 7.0, shift 1.0, LM acestep-5Hz-lm-4B
- **tier:** best   **gate profile:** race   **duration:** 169 s rendered (the model's choice), 162.6 s installed (loop seam baked)
- **date:** 2026-10-15
- **render time:** 125.2 s per seed, model load 42.9 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: fastaf
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 7168360 samples at 44.1 kHz (162.55 s), about 115.1 bars of 4/4 at 170 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "vocal electronic race music, 170 bpm, soaring female vocal hook, chasing the sound barrier, evolving second half". "the race profile (the requester's key, or the owner's choice)" I took as: vocal electronic race music at 170 bpm, genre first and short; the words lead; the profile adds the bass, the kick, the arrangement; the key and the length (the model's choice, 120 to 240 s) left to the model. "170 bpm" I took as: 170 bpm, as the words say, in place of the race band. "vocal electronic race music" I took as: the frame, in the requester's own words, ahead of the tempo. "soaring female vocal hook, chasing the sound barrier, evolving second half" I took as: the colour, in the requester's own words and order. So I wrote it at 170 bpm in F minor (the model chose the key), 169 seconds (the model's choice), with a voice, in words I wrote myself, under the race gates. It is meant to loop: the last 3 seconds are crossfaded onto the first 3 and removed. I rendered 6 seeds and threw away 4: 581071 (2.2s of near-silence (limit 0.5) and others); 581068 (tempo 138 vs asked 170 and others); 581072 (tempo 138 vs asked 170 and others); 581070 (tempo 139 vs asked 170 and others). Seed 581067 is the take, but it did not clear every gate: tempo 139 vs asked 170.

## Prompt

> Vocal electronic race music, 170 bpm, soaring female vocal hook, chasing the sound barrier, evolving second half, a clean, powerful lead vocal riding the beat, confident, close and dry with a short delay on the line ends, a snarling neuro reese bass over a deep clean sub, punchy sidechained kick, aggressive but readable arrangement with clear build and drop sections, no choir

The planner model rewrites the caption before the music model sees it; what the music model was given for this take:

> An intense drum and bass intro with driving breakbeats and atmospheric synth pads quickly gives way to an aggressive neurofunk drop. The track is dominated by a complex, heavily modulated growl bass that serves as both rhythmic and melodic driver, characteristic of complextro or dubstep. A powerful female vocal cuts through during the verses and choruses, delivering lyrics about urban nightlife over a more restrained half-time groove before soaring into layered harmonies for the high-energy hooks. The arrangement features dramatic build-ups using filtered drums and rising arpeggiated synths, leading back into explosive drops where the intricate bass sound design takes center stage alongside shouted ad-libs and processed vocals.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - filtered drums and a rising pad, instrumental]

[Verse - a confident modern vocal over the driving beat]
electronic in the night, soaring in the light
Wake up slow, with the race down low
All through the town the window comes down
I count the female, I count the kettle, I count them again
electronic by the door, window on the floor
Hold on tight to the kettle tonight
Nothing to fear when the soaring is here
Round and around goes the race sound

[Build - a snare roll and a riser, the vocal climbs, then the big drop]
One more time for the electronic

[Hook - big and chantable over the full drums, a small group on the last word]
soaring, soaring, keep it going on
kettle and female, all night long
window, window, keep it going on
Never mind the dark, the race is gone

[Hook - big and chantable over the full drums, a small group on the last word]
soaring, soaring, keep it going on
kettle and female, all night long
window, window, keep it going on
Never mind the dark, the race is gone
```

## Request filter

stripped: nothing

## Rejected seeds

- 581071: 2.2s of near-silence (limit 0.5); seam level -5.4 dB tail to head (no flat stretch (longest still stretch 3 s, from 0:06))
- 581068: tempo 138 vs asked 170; 14 of 104 heard words are not ours (13 %; limit 10 %, at least 40 heard): hmm sky make make make chance i've been egg tronic can you (no flat stretch (longest still stretch 4 s, from 0:10))
- 581072: tempo 138 vs asked 170; 17 of 156 heard words are not ours (11 %; limit 10 %, at least 40 heard): oh oh tune story cattle oh my god ah ah ah cattle (no flat stretch (longest still stretch 3 s, from 1:23))
- 581070: tempo 139 vs asked 170; 2.5s of near-silence (limit 0.5); 12 of 112 heard words are not ours (11 %; limit 10 %, at least 40 heard): thank you quiet oh my god oh my god cattle thank you (no flat stretch (longest still stretch 4 s, from 0:15))

## Measured (the kept take, post: peak-normalise -1 dBFS: no high-pass, no limiter, no LUFS target; before the gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 139 bpm vs asked 170 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | **NO** |
| loudness | -15.6 LUFS installed (decoded MP3 -15.9); candidate was -14.7, gain -0.9 dB | not a gate: peak-normalised, the LUFS is only recorded (race) | - |
| peak after encode | -2.41 dBFS decoded (pre-encode -2.00) | under -1 dBFS | yes |
| silence | longest 0.00 s under -50 dBFS | under 0.5 s (race) | yes |
| brightness | 4.35 % of power above 6 kHz | under 6.5 % (race) | yes |
| boominess | 37.92 % below 60 Hz (raw render 37.9 %) | under 69 % | yes |
| onset rate | 3.70 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.02x, tail-head -0.9 dB | step under 4.0x, level within 5.0 dB | yes |

## Drone (a flag for the owner's ears, never a gate: no take is dropped for it)

no flat stretch (longest still stretch 5 s, from 0:15). Over the longest still stretch: chroma cosine 0.988, 0.8 onsets per second, spectral flux 0.45 of the track's median. A stretch is still where the 1 s chroma, the onsets and the spectral movement are all static at once; the flag is raised at 30 s.
Numbers only: nobody here heard it.

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The race is gone. | . | . | Electronic in the night, soaring in the light, wake up slow. | With the race down low All through the town The window comes down I count the female I count the kettle I count them again Electronic by the door Window on the floor Hold on tight to the | The Kettle Tonight | One more time for the electronic. | Soaring, soaring, keep it going on. Cattle and female all night long. Window, window, keep it going on. | Never mind the dark, the race is gone. | Oh, my God. | Soaring, soaring, keep it going on Kettle and female all night long Window, window, keep it going on Never mind the dark

113 words heard, 4 not in our lyrics: cattle oh my god (limit 10 % of the words heard, at least 40 heard)

## Second take: seed 581069 (electronic-race-last-lap-take2.mp3)

-14.8 LUFS, peak -2.17 dBFS decoded, 2.64 % >6 kHz, 35.99 % <60 Hz, 3.27 onsets/s, seam 0.36x / -0.4 dB, checks: failed tempo 139 vs asked 170
words: 8 of 90 heard are not ours: sorry sorry cattle we know dindo widow widow
no flat stretch (longest still stretch 4 s, from 0:17)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: tempo 139 vs asked 170
