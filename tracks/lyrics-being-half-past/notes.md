# Lyrics Being, Half Past

- **slug:** lyrics-being-half-past
- **idea:** Make a song with lyrics about being driven around in a self driven car listening to tracks that are created by my request in realtime and delivered right to my dash in minutes. Call it: a corridor light left on in an empty house
- **mood:** unhurried and a little wistful, never bleak
- **bpm:** 88 (asked) / 87 (measured, folded into 70-140)
- **key:** C# major (asked) / F major (estimated)
- **seed:** 305043
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7, shift 3, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 100 s rendered, 92.7 s installed (loop seam baked)
- **date:** 2026-10-24
- **render time:** 20.1 s per seed, model load 46.8 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4086337 samples at 44.1 kHz (92.66 s), about 34.0 bars of 4/4 at 88 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Make a song with lyrics about being driven around in a self driven car listening to tracks that are created by my request in realtime and delivered right to my dash in minutes. Call it". So I wrote it at 88 bpm in C# major, 100 seconds, with a voice, in words I wrote myself, under the mellow gates. I rendered 8 seeds and threw away 6: 305042 (13 of 120 heard words are not ours (11 %; limit 10 %, at least 40 heard): towel breeze gro); 305047 (23 of 120 heard words are not ours (19 %; limit 10 %, at least 40 heard): dyricks key buri); 305045 (1.0s of near-silence (limit 0.5) and others); 305041 (0.6s of near-silence (limit 0.5) and others), and 2 more (all listed below). Seed 305043 is the take, but it did not clear every gate: seam level +17.7 dB tail to head.

## Prompt

> Slow late-night groove, 88 bpm, in C# major, a warm male voice half-spoken close to the microphone, unhurried, with a short echo on the line ends, a drum kit of shoebox thumps, a stapler click and a paper-rustle shaker as the hat, a warm detuned electric piano used as an instrument, a warm sine sub on a half-time pattern, a corridor light left on in an empty house, unhurried and a little wistful, never bleak, an intro of the kit and one chord, then the groove opens up, steady loopable arrangement, no choir, no sung melody, no drops, no wobble bass, no build-ups, no aggressive drums

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the lead instrument alone for two bars, instrumental]

[Verse - unhurried half-spoken delivery over the groove]
lyrics in the night, driven in the light
Wake up slow, with the being down low
All through the town the window comes down
I count the around, I count the kettle, I count them again
lyrics by the door, window on the floor
Hold on tight to the kettle tonight
Nothing to fear when the driven is here
Round and around goes the being sound

[Bridge - the groove thins out, one line, then back in]
One more time for the lyrics

[Hook - sung low and plain, repeated, a small group on the last word]
driven, driven, keep it going on
kettle and around, all night long
window, window, keep it going on
Never mind the dark, the being is gone

[Hook - sung low and plain, repeated, a small group on the last word]
driven, driven, keep it going on
kettle and around, all night long
window, window, keep it going on
Never mind the dark, the being is gone
```

## Request filter

stripped: Norton Shores

## Rejected seeds

- 305042: 13 of 120 heard words are not ours (11 %; limit 10 %, at least 40 heard): towel breeze group stands out cuddling kettling kettling bean thank you tss
- 305047: 23 of 120 heard words are not ours (19 %; limit 10 %, at least 40 heard): dyricks key buries be groove stands out line back bein' a scum
- 305045: 1.0s of near-silence (limit 0.5); seam level +7.5 dB tail to head
- 305041: 0.6s of near-silence (limit 0.5); 16 of 109 heard words are not ours (15 %; limit 10 %, at least 40 heard): oh be auto took a top end end of get a little
- 305048: harsh: 3.1% above 6 kHz (ceiling 2.5); 28 of 140 heard words are not ours (20 %; limit 10 %, at least 40 heard): p a cow terrors be inside groove thins out line then back
- 305046: harsh: 2.8% above 6 kHz (ceiling 2.5); boomy: 12.0% below 60 Hz (ceiling 12); 40 of 337 heard words are not ours (12 %; limit 10 %, at least 40 heard): okay this thank you kettling kettling kettling kettling kettling kettling kettling kettling

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.28 dBFS decoded (pre-encode -3.50) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.21 % below 60 Hz (raw render 21.8 %) | under 12 % | yes |
| onset rate | 3.13 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.05x, tail-head +17.7 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | Dyricks in the night, driven in the light. Wake up slow with the being down low. All through the town, the window comes down again. | I count the around, I count the kettle, I count them again. Lyrics by the door, window on the floor. Hold on tight to the kettle tonight. Nothing to fear when the driven is here. Round and around goes to being sound. | One more time for the lyrics. Driven, driven, keep it going all, kettling around all night long. | Window, window, keep it going on. Never mind the dark, the being is gone. | Diven, driven, keep it going on. Kettling around all night long. Window, window, keep it going on. Never mind the thought, the being is gone. | Thank you.

125 words heard, 7 not in our lyrics: dyricks kettling diven kettling thought thank you (limit 10 % of the words heard, at least 40 heard)

## Second take: seed 305044 (lyrics-being-half-past-take2.mp3)

-16.0 LUFS, peak -3.35 dBFS decoded, 1.22 % >6 kHz, 7.24 % <60 Hz, 2.65 onsets/s, seam 0.17x / -0.2 dB, checks: failed 13 of 126 heard words are not ours (10 %; limit 10 %, at least 40 heard): d download render drizzling kettling dog cattling dog be his bones thank
words: 13 of 126 heard are not ours: d download render drizzling kettling dog cattling dog be his bones thank you

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: seam level +17.7 dB tail to head
