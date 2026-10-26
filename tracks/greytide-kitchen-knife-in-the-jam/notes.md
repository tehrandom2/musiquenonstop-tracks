# Knife in the Jam

- **slug:** greytide-kitchen-knife-in-the-jam
- **idea:** A still-on-sprue dude, dragging his frame, wades into the jam patch at a third of his speed under the knife standing in the jar like a flag, and keeps going.
- **mood:** heavy, stubborn, wry
- **bpm:** 112 (asked) / 112 (measured, folded into 70-140)
- **key:** E minor (asked) / E major (estimated)
- **seed:** 3920601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 167.4 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:kitchen, pov:a still-on-sprue dude
- **loop:** no, a one-shot
- **length:** 7381545 samples at 44.1 kHz (167.38 s), about 78.1 bars of 4/4 at 112 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "A still-on-sprue dude, dragging his frame, wades into the jam patch at a third of his speed under the knife standing in the jar like a flag, and keeps going.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 112 bpm in E minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 112 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3920600 (0.7s of near-silence (limit 0.5) and others). Seed 3920601 is the take, but it did not clear every gate: 0.8s of near-silence (limit 0.5).

## Prompt

> Swampy blues-rock stomp, 112 bpm, E minor. A four-piece: a fuzzed slide guitar playing the hook low in the mids, a second guitar on a chugging riff, a tight lean bass locked to the kick well under the mids, a heavy stomping kit with a big floor tom, a harmonica wailing between lines. A gravelly, weary male lead with a low gang chorus. Stubborn and wry. Starts mid, a long heavy chorus plateau, one dip to slide guitar and voice, a lifted final chorus. E minor, grit in the mids, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: slide guitar over the stomp]

[Verse 1]
Still on the sprue and I'm dragging the frame
Every step costs me a step and a half
I walked into the red shine, I walked into the jam
Now I go at a third of the pace that I had

[Pre-Chorus]
Up on the jar there's a knife standing straight
Like a flag on a mountain nobody climbed

[Chorus]
Knife in the jam, knife in the jam
Sprue on my ankle and I'm stuck where I am
Knife in the jam, knife in the jam
Slow as a Sunday, but I'm still who I am

[Verse 2]
The pepper comes down and I sneeze till I sway
The cannon is counting the crowd that I make
No seeds and no sprue, says the label on the jar
Well here I am, sprue and all, every step I take

[Pre-Chorus]
Up on the jar there's a knife standing straight
Like a flag on a mountain nobody climbed

[Chorus]
Knife in the jam, knife in the jam
Sprue on my ankle and I'm stuck where I am
Knife in the jam, knife in the jam
Slow as a Sunday, but I'm still who I am

[Bridge: slide guitar and voice only]
I'm not trying to win, I'm trying to arrive
Somewhere a little bit further along
There's a hob ring glowing at the end of the road
And I'd like to see it before I am gone

[Final Chorus: lifted, the gang on every line]
Knife in the jam, knife in the jam
Sprue on my ankle and I'm stuck where I am
Knife in the jam, knife in the jam
Slow as a Sunday, but I'm still who I am

[Outro: harmonica and stomp]
Still who I am
```

## Request filter

stripped: nothing

## Rejected seeds

- 3920600: 0.7s of near-silence (limit 0.5); 21 of 190 heard words are not ours (11 %; limit 10 %, at least 40 heard): spoo cost chart chain chain screw chair chair paper seats sprues job

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 112 bpm vs asked 112 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.85 dBFS decoded (pre-encode -3.41) | under -1 dBFS | yes |
| silence | longest 0.75 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.79 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.66 % below 60 Hz (raw render 17.2 %) | under 12 % | yes |
| onset rate | 2.67 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.00x, tail-head -70.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Still on Spruce, man I'm drinking. | Oh | Up on the jaw, there's a knife standing straight Like a flag on a mountain, nobody climbed Knife in the jam, knife in the jam, sprue on my hand | And I'm stuck where I am. Knife in the jam. Knife in the jam. Slow as a Sunday. But I'm still who I am. | The pepper comes down and I sneeze till I sway. The cannon is counting, the crowd that I make. No seeds and no spruce, says the label on the jaw. | Here I am sprouting all, every step I take. Up on the jaw, there's a knife standing straight. Like a flag on a mountain, nobody climbs. Knife in the jail. | Knife in the Jam. Screw on my ankle and I'm stuck where I am. Knife in the Jam. Knife in the Jam. Slow as the sundae. | I'm not sure | Before | I am gone. The gang on every line. Knife in the jam. Knife in the jam. Screw on my ankle and I'm stuck where I am. Knife in the jam. | I'm still who I am. | Still who I am.

189 words heard, 18 not in our lyrics: spruce man drinking oh jaw hand spruce jaw sprouting jaw climbs jail screw sundae sure gang line screw (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.8s of near-silence (limit 0.5)
