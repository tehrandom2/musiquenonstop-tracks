# Everybody Takes the Long Road

- **slug:** greytide-schooldesk-everybody-takes-the-long-road
- **idea:** wave 5: the lesson changes, a hand drags the open textbook across the pencil groove; the groove itself sings as the whole horde turns for the long road under the ruler
- **mood:** dusty, weary, knowing
- **bpm:** 138 (asked) / 136 (measured, folded into 70-140)
- **key:** C minor (asked) / F major (estimated)
- **seed:** 4010600
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 166.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:pencil-groove
- **loop:** no, a one-shot
- **length:** 7362123 samples at 44.1 kHz (166.94 s), about 96.0 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "wave 5: the lesson changes, a hand drags the open textbook across the pencil groove; the groove itself sings as the whole horde turns for the long road under the ruler". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in C minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010601 (19 of 143 heard words are not ours (13 %; limit 10 %, at least 40 heard): so is show liste). Seed 4010600 is the take.

## Prompt

> Dark desert blues rock, 138 bpm, C minor, a lean three-piece and a voice: a twangy baritone guitar on a hypnotic one-chord riff, a slide guitar crying in the gaps, a tight lean bass locked to the kick, bass well under the mids, a driving tom-heavy shuffle, hand claps on the backbeat in the chorus, a weathered low male lead, a dry female harmony on the hook, in C minor, dusty and knowing, mid start, a long high plateau, a dip to riff and voice, a lifted last chorus, warm grit in the mids, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the baritone riff alone, the slide answers]

[Verse 1]
I'm the groove along the back edge of the lid
Everything I carry rolls, whatever it did
Marble every wave, it showed them how to run
Half again as fast in me, and then they're done

[Pre-Chorus]
Then the page turns over, lesson number five
A textbook dragged across me like a lid on a hive

[Chorus - harmony on the hook]
Turn the page and shut the groove
Everybody takes the long road
Under the ruler, round the sharpener
Everybody takes the long road

[Verse 2]
Now they're trudging on the lid where the old rubber sits
The ruler laid across it like a bridge to the pits
The compass gets its circle, the glue gets its line
Slow grey feet and every tower taking its time

[Pre-Chorus]
I lie in the dark under fractions and a map
Listening to all of them walk the long way back

[Chorus - harmony on the hook]
Turn the page and shut the groove
Everybody takes the long road
Under the ruler, round the sharpener
Everybody takes the long road

[Breakdown - riff and voice, claps drop out]
Two waves of quiet in a channel made of pine
Something always opens, something always shuts
Give it a lesson, the textbook moves on

[Final Chorus - lifted, full band, the slide on top]
Turn the page and shut the groove
Everybody takes the long road
Under the ruler, round the sharpener
Everybody takes the long road

[Outro - the riff slows into one ringing chord]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4010601: 19 of 143 heard words are not ours (13 %; limit 10 %, at least 40 heard): so is show listen house that trojan blue it's it's so great

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.8, gain -0.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.03 dBFS decoded (pre-encode -3.17) | under -1 dBFS | yes |
| silence | longest 0.50 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.17 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.18 % below 60 Hz (raw render 9.7 %) | under 12 % | yes |
| onset rate | 2.76 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -64.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | I'm grooved along the back edge of the lid. Everything I carry rolls, whatever it did. Marble every wave, it showed them how to run. Half a Guinness fast in me. | And then the done. Then the page turns over, lesson number five. A textbook dragged across me like a lid on a hide. | Everybody takes the long road under the moon. | Now the trudging on the | The | Turn the page and show. | Everybody takes the long run. Under the ruler, round the shelf. | Everybody takes the long road. Two waves of quiet in a channel made of pine. | Something always open, something always shuts. Give it a lesson, the textbook moves on. Turn the page and shut the groove. | Everybody takes the long road Under the ruler Round the sharpener | is the...

133 words heard, 8 not in our lyrics: grooved guinness hide moon show shelf open is (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
