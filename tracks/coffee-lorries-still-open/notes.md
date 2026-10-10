# Coffee Lorries, Still Open

- **slug:** coffee-lorries-still-open
- **idea:** coffee and lorries at a motorway service station, 3 a.m.: a motorway service station at 3 a.m. with lorries idling and the coffee machine ticking
- **mood:** tired and quiet, awake when nobody else is, never creepy
- **bpm:** 162 (asked) / 80 (measured, folded into 70-140)
- **key:** C minor (asked) / C major (estimated)
- **seed:** 363543
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 100 s rendered, 94.3 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 28.0 s per seed, model load 19.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 4160556 samples at 44.1 kHz (94.34 s), about 63.7 bars of 4/4 at 162 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "coffee and lorries at a motorway service station, 3 a.m.". "the small hours, night" I took as: a minor key, a muted electric piano used as an instrument, a warm tape-saturated sine sub on a half-time pattern, adjectives about the room rather than the music. "a kitchen, coffee, cooking" I took as: found kitchen objects as the drum kit, a warm major key, a morning mood clause. So I wrote it at 162 bpm in C minor, 100 seconds, with a voice, in words I wrote myself, under the jungle gates. I rendered 4 seeds and threw away 2: 363541 (0.6s of near-silence and others); 363544 (0.7s of near-silence and others). Seed 363543 is the take, but it did not clear every gate: boomy: 9.1% below 60 Hz (ceiling 8); 5 of 28 heard words are not ours (18 %; limit 10 %, at least 40 heard): old brew so thank you.

## Prompt

> Pirate-radio jungle, 162 bpm, in C minor, a male ragga-style toast riding the beat, fast and half-sung, with echo throws on the line ends, chopped and time-stretched funk breakbeats with rolling snare fills, dancehall horn stabs and a skanking offbeat organ used as instruments, a huge sine sub-bass on a half-time reggae pattern, a motorway service station at 3 a.m. with lorries idling and the coffee machine ticking, tired and quiet, awake when nobody else is, never creepy, an intro of horns and skank over a half-time beat, then the full breakbeat drop, loopable, only the toast, no choir, no sung melody, no wobble bass, no build-ups

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - dancehall horn stabs and a skanking offbeat organ over a half-time beat, instrumental]

[Verse - fast ragga toast over the beat]
coffee in the night, motorway in the light
Wake up slow, with the lorries down low
All through the town the window comes down
I count the service, I count the kettle, I count them again
coffee by the door, window on the floor
Hold on tight to the kettle tonight
Nothing to fear when the motorway is here
Round and around goes the lorries sound

[Rewind - dub siren and a spin-back, then the full breakbeat drop]
One more time for the coffee

[Hook - chanted by a small group with the lead on top, echo on the line ends]
motorway, motorway, keep it going on
kettle and service, all night long
window, window, keep it going on
Never mind the dark, the lorries is gone

[Hook - chanted by a small group with the lead on top, echo on the line ends]
motorway, motorway, keep it going on
kettle and service, all night long
window, window, keep it going on
Never mind the dark, the lorries is gone
```

## Request filter

stripped: nothing

## Rejected seeds

- 363541: 0.6s of near-silence; boomy: 8.4% below 60 Hz (ceiling 8); 18 of 59 heard words are not ours (31 %; limit 10 %, at least 40 heard): your peace way lorry's okay you can't don't answer it's wimble wimble
- 363544: 0.7s of near-silence; harsh: 3.7% above 6 kHz (ceiling 3.5); boomy: 9.3% below 60 Hz (ceiling 8); 13 of 120 heard words are not ours (11 %; limit 10 %, at least 40 heard): that wish move away lorry got feels found lorry motoplay motoplay motoplay

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 162 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.4, gain +0.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.16 dBFS decoded (pre-encode -3.11) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s | yes |
| brightness | 3.38 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 9.12 % below 60 Hz (raw render 23.3 %) | under 8 % | **NO** |
| onset rate | 3.92 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.81x, tail-head +3.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: ... | ... | Coffee in the night, motorway in the light, wake up slow with the lorries down low, old brew. | the | One more time for the coffee | So. | Thank you.

28 words heard, 5 not in our lyrics: old brew so thank you (limit 10 % of the words heard, at least 40 heard)

## Second take: seed 363542 (coffee-lorries-still-open-take2.mp3)

-16.0 LUFS, peak -2.18 dBFS decoded, 2.94 % >6 kHz, 10.77 % <60 Hz, 3.56 onsets/s, seam 0.00x / -39.4 dB, checks: failed boomy: 10.8% below 60 Hz (ceiling 8); seam level -39.4 dB tail to head; 14 of 58 heard words are not ours (24 %; limit 10 %, at least 40 heard): what we'll be right back dawn are stone can't dawn lord we
words: 14 of 58 heard are not ours: what we'll be right back dawn are stone can't dawn lord we just come

## Checks

kept despite failing: boomy: 9.1% below 60 Hz (ceiling 8); 5 of 28 heard words are not ours (18 %; limit 10 %, at least 40 heard): old brew so thank you
