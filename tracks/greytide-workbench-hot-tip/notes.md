# Hot Tip

- **slug:** greytide-workbench-hot-tip
- **idea:** The soldering iron on the upper shelf, a tower who barely reaches the road, sings about the burn, the sparks and the solder blobs that cool from orange to silver
- **mood:** hot, grinning, swaggering
- **bpm:** 136 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / E minor (estimated)
- **seed:** 3960400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 152.5 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:soldering-iron
- **loop:** no, a one-shot
- **length:** 6727030 samples at 44.1 kHz (152.54 s), about 86.4 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The soldering iron on the upper shelf, a tower who barely reaches the road, sings about the burn, the sparks and the solder blobs that cool from orange to silver". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in E minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960401 (27 of 211 heard words are not ours (13 %; limit 10 %, at least 40 heard): room armor hop o). Seed 3960400 is the take.

## Prompt

> Dirty swamp boogie rock at 136 bpm in E minor, a sweaty three-piece: a fuzzy slide guitar with warm saturation in the mids, a tight lean shuffling bass, bass under the mids, a stomping kit with a hissing hat like solder smoke, a harmonica answering the hook; a gravelly, grinning male lead and a rough gang chorus; starts mid on the riff, a long hot plateau, a stripped bridge on slide and stomp, a lifted final chorus, E minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the slide riff, a hiss]
Mind the tip.

[Verse 1]
I barely reach the road, they tell me every night
Stand me on the upper shelf and I can't win a fight
But whatever I touch, it catches, and its armour falls away
I'm a small hot point of honesty at the end of a long day
Fourteen seconds, cold, then grey to red to gold
Smoke comes off me curling and the hiss is getting old

[Pre-Chorus]
Heat it up, heat it up
(Three centimetres of the sun)

[Chorus]
Hot tip, hot tip, I don't need to reach
Walk beneath me, that's a lesson I can teach
Hot tip, hot tip, orange then to grey
Everything I touch, I mend or melt away

[Verse 2]
I drop a blob of solder at the start of every heat
It's orange when it lands and silver when it's cooled and neat
Nine blobs on the shelf and every one's a little moon
The owner never cleans them, says he'll do it soon
I was made to join the wires in a thing that played a song
Tonight I'm joining up the grey with something they did wrong

[Pre-Chorus]
Heat it up, heat it up
(Three centimetres of the sun)

[Chorus]
Hot tip, hot tip, I don't need to reach
Walk beneath me, that's a lesson I can teach
Hot tip, hot tip, orange then to grey
Everything I touch, I mend or melt away

[Bridge - slide and stomp only]
Sparks come off me, bounce along the shelf
Little stars that light the road themselves
I never asked for range, I never asked for more
I just want them under me, that's what I'm for

[Final Chorus - lifted, harmonica and gang chorus]
Hot tip, hot tip, I don't need to reach
Walk beneath me, that's a lesson I can teach
Hot tip, hot tip, orange then to grey
Everything I touch, I mend or melt away

[Outro - the hiss fades]
Cooling. Silver.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3960401: 27 of 211 heard words are not ours (13 %; limit 10 %, at least 40 heard): room armor hop one elongate great erected hisses all heated heated centimeters

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.3, gain -0.7 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.24 dBFS decoded (pre-encode -3.28) | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.38 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 2.27 % below 60 Hz (raw render 11.2 %) | under 12 % | yes |
| onset rate | 2.83 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -52.4 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Mind the chip. | I barely reach the road, they tell me every night. Stand me on the upper shelf and I can't win a fight. But whatever I touch, it catches everything. | It's armor falls away. I'm a small hot point of honesty at the end of a long day. 14 seconds cold and greater red to gold. Smoke comes off me curling and the hisses getting old. Heat it up. | Heat it up. Please send a mattress of the sun. Hot tip, hot tip. I don't need to reach. What beneath me, that's a lesson I can teach. Hot tip, hot tip. For extended comfort. | Everything I touch I mend or melt away I chop a blob of soda at the start of every heat It's orange when it lands in silver when it's cold and neat | Nine blobs on the shelf and everyone's a little moon. The owner never cleans them, says he'll do it soon. I was made to join the wires in a thing that played a song. Tonight I'm joining up the gray with something they did wrong. | Hot tip, hot tip. | Sparks come off me, bounce along the shelf. Little stars that lie. | I don't | I need to reach. Walk beneath me, that's a lesson I can teach. Hot tip, hot tip, orange and a gray. Everything I touch, I mend or melt away. | Cooling silver.

231 words heard, 15 not in our lyrics: chip armor greater hisses please send mattress extended comfort chop soda everyone's gray lie gray (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
