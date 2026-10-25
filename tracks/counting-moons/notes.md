# Counting Moons

- **slug:** counting-moons
- **idea:** a song about a singer who keeps returning to the same images: moons, the sea, cold, falling, dreams
- **mood:** bittersweet and swooning
- **bpm:** 118 (asked) / 116 (measured, folded into 70-140)
- **key:** E minor (asked) / C major (estimated)
- **seed:** 1181102
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-0.6B
- **tier:** fast   **gate profile:** jungle   **duration:** 150 s rendered, 146.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-25
- **render time:** None s per seed, model load None s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: motifs
- **loop:** no, a one-shot
- **length:** 6444673 samples at 44.1 kHz (146.14 s), about 71.9 bars of 4/4 at 118 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a song for the owner's page on one songwriter's recurring images". The words and the style come from the front desk, for the owner's page; no names, no quoted lines, no banned images. So I wrote it at 118 bpm in E minor, 150 seconds, with a voice, in words I wrote myself, under the jungle gates. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and kept all of them. Seed 1181102 is the take.

## Prompt

> late-1980s gothic post-punk into dream pop, 118 bpm, in E minor, a yearning high male vocal drenched in plate reverb, sung and swooning, a melodic six-string bass carrying the hook up high used as an instrument, chorused and flanged clean guitars ringing in fifths, wide synth-string pads, steady floor-tom-heavy drums with a gated snare, glockenspiel sparkle on the last chorus, a seaside promenade at night under a cold moon, bittersweet and swooning, tender, never gloomy for its own sake, a bass-alone intro, then the guitars swell in, verses, a big chorus, a whispered bridge, a final chorus, the bass fades out alone, no rap, no spoken verses, no EDM drop, no wobble bass, no build-ups

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the six-string bass melody alone, then the chorused guitars swell in, instrumental]

[Verse - the high male vocal, yearning, over steady floor toms]
Somebody counted every moon he ever sang
Somebody counted every time the sea came in
Every night is cold and every kiss is late
Every dream he has is falling, falling in

[Pre-Chorus - the pads open up]
He keeps the same old sky
Like a coat he can't take off

[Chorus - big and swooning, the bass carries the hook]
Counting moons, counting moons
All the oceans in his head
Same dark, same cold, same lovely dread
Counting moons, counting moons
Forty years of falling slow
He only ever sings the things he knows

[Verse - the high male vocal, closer]
Pale hands reaching through a black velvet sleep
A face in the water that he swears he used to keep
Spiders on the ceiling and a cat that won't come home
Every star is crying and he's never quite alone

[Bridge - whispered, close, the drums drop to floor toms]
Night. Never. Always. Dark.
Dream. Drown. Cold. Heart.

[Final Chorus - glockenspiel enters, everything wide]
Counting moons, counting moons
All the oceans in his head
Same dark, same cold, same lovely dread
Counting moons, counting moons
Forty years of falling slow
He only ever sings the things he knows

[Outro - the bass melody fades out alone, instrumental]
```

## Request filter

stripped: nothing

## Rejected seeds

- none

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 116 bpm vs asked 118 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.52 dBFS decoded (pre-encode -3.77) | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s (jungle) | yes |
| brightness | 3.47 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 7.49 % below 60 Hz (raw render 16.4 %) | under 8 % | yes |
| onset rate | 3.09 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.18x, tail-head -81.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Thank you. | Somebody counted | Every moon he ever sang Somebody counted every time the sea came in Every night it's cold and every kiss is late Every dream he has is falling, falling in | He keeps the same old sky like a coal he can't take off. Counting moons, counting moons, all the oceans in | 40 years of falling snow. | He only ever sings the things he knows. Pale hands reaching through a black velvet sleep, a face | Night. Ever. Always. | Counting moons, counting moons, all the oceans in his head, same time. | 40 years of falling slow, he only ever saw. | sings the things he knows.

105 words heard, 6 not in our lyrics: thank you it's coal snow saw (limit 10 % of the words heard, at least 40 heard)

## Second take: seed 1181101 (counting-moons-take2.mp3)

-16.0 LUFS, peak -3.92 dBFS decoded, 2.30 % >6 kHz, 6.97 % <60 Hz, 3.18 onsets/s, seam 0.01x / -71.3 dB, checks: all passed
words: 8 of 139 heard are not ours: coal light song what seems its thing since

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
