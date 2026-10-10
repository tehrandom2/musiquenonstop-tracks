# The Station Never Stops

- **slug:** the-station-never-stops
- **idea:** a tower block roof, the aerial nobody can find: a tower-block roof at night with a coat-hanger aerial, tape hiss and heavy radio compression, a dub siren rewind at the drop
- **mood:** mischievous and good-humoured, never menacing
- **bpm:** 162 (asked) / 80 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 182410
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 60 s rendered, 57.0 s installed (loop seam baked)
- **date:** 2026-10-10
- **render time:** 17.4 s per seed, model load 19.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- **loop:** yes, the last 3 s are crossfaded onto the first 3 s and removed
- **length:** 2513700 samples at 44.1 kHz (57.00 s), about 38.5 bars of 4/4 at 162 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a tower block roof, the aerial nobody can find". "pirate radio, a station that never stops" I took as: 1990s pirate-radio jungle: chopped breakbeats, a sine sub on a half-time reggae pattern, horn stabs, a dub siren rewind, tape hiss and heavy radio compression. So I wrote it at 162 bpm in F minor, 60 seconds, with a voice, in words I wrote myself, under the jungle gates. I rendered 4 seeds and threw away 2: 182408 (harsh: 4.1% above 6 kHz (ceiling 3.5) and others); 182409 (harsh: 3.5% above 6 kHz (ceiling 3.5) and others). Seed 182410 is the take, but it did not clear every gate: boomy: 10.7% below 60 Hz (ceiling 8).

## Prompt

> Pirate-radio jungle, 162 bpm, in F minor, a male ragga-style toast riding the beat, fast and half-sung, with echo throws on the line ends, chopped funk breakbeats with rolling snare fills, a cassette-deck thump as the kick, dancehall horn stabs and a skanking offbeat organ used as instruments, a huge sine sub-bass on a half-time reggae pattern, a tower-block roof at night with a coat-hanger aerial, tape hiss and heavy radio compression, a dub siren rewind at the drop, mischievous and good-humoured, never menacing, an intro of horns and skank over a half-time beat, then the full breakbeat drop, loopable, only the toast, no choir, no sung melody, no wobble bass, no build-ups

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - dancehall horn stabs and a skanking offbeat organ over a half-time beat, instrumental]

[Verse - fast ragga toast over the beat]
Static on the dial, signal on the climb
Tower block roof, hiding all the time
Cassette in the deck, press record, don't stop
Spool spins round and the tape won't drop
Man on the street, looking up at the sky
Can't see the mast, but the beat floats by
Forty-two floors and a fire door locked
Whole city tuned in, still nobody's clocked

[Rewind - dub siren and a spin-back, then the full breakbeat drop]
Wind it back, wind it back, to the roof

[Hook - chanted by a small group with the lead on top, echo on the line ends]
Pirate on the air and it never stops
Up on the roof where the signal drops
Turn the dial, turn it up, it never stops
Night and day, the station never stops

[Hook - chanted by a small group with the lead on top, echo on the line ends]
Pirate on the air and it never stops
Up on the roof where the signal drops
Turn the dial, turn it up, it never stops
Night and day, the station never stops
```

## Request filter

stripped: nothing

## Rejected seeds

- 182408: harsh: 4.1% above 6 kHz (ceiling 3.5); seam level -7.0 dB tail to head; 13 of 129 heard words are not ours (10 %; limit 10 %, at least 40 heard): spools turns mask moon clock clock out dying then byway hold with
- 182409: harsh: 3.5% above 6 kHz (ceiling 3.5); seam level -7.7 dB tail to head; 15 of 91 heard words are not ours (16 %; limit 10 %, at least 40 heard): that's gone i'm going die towered like truth passette spoo closed clock

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 162 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.9, gain -1.1 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.81 dBFS decoded (pre-encode -3.25) | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 3.48 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 10.66 % below 60 Hz (raw render 28.7 %) | under 8 % | **NO** |
| onset rate | 3.60 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.64x, tail-head +2.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Static on the dial, signal on the clown | Power block roof, fighting all the time. Because in the deck press record don't stop. School spins round and the day won't drop. Man on the street looking up at the sky. Can't see the mask, but the beat floats by. | 42 floors and a fire door locked, whole city tuned in still nobody's clock. Powered on the air and it never stopped. | Up on the roof where the signal drops. Turn the dial, turn it up, it never stops. The station never stops. Pirate on the air and it never stops.

99 words heard, 9 not in our lyrics: clown power fighting because school mask clock powered stopped (limit 10 % of the words heard, at least 40 heard)

## Second take: seed 182407 (the-station-never-stops-take2.mp3)

-16.0 LUFS, peak -2.87 dBFS decoded, 4.00 % >6 kHz, 2.70 % <60 Hz, 3.28 onsets/s, seam 0.54x / -3.9 dB, checks: failed harsh: 4.0% above 6 kHz (ceiling 3.5); 9 of 21 heard words are not ours (43 %; limit 10 %, at least 40 heard): flash okay end it's splendid bad part when you
words: 9 of 21 heard are not ours: flash okay end it's splendid bad part when you

## Checks

kept despite failing: boomy: 10.7% below 60 Hz (ceiling 8)
