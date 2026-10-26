# The Mouse in the Carton

- **slug:** greytide-attic-the-mouse-in-the-carton
- **idea:** After wave two the mouse in the carton drags the guide's signposts into its hole one by one, and hints at something painted it has kept in the back
- **mood:** sly, playful, secretive
- **bpm:** 144 (asked) / 72 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3980200
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 166 s rendered, 165.9 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:attic, pov:mouse
- **loop:** no, a one-shot
- **length:** 7317830 samples at 44.1 kHz (165.94 s), about 99.6 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After wave two the mouse in the carton drags the guide's signposts into its hole one by one, and hints at something painted it has kept in the back". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in A minor, 166 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3980201 (0.9s of near-silence (limit 0.5) and others). Seed 3980200 is the take, but it did not clear every gate: 1.5s of near-silence (limit 0.5).

## Prompt

> Sly gypsy jazz, 144 bpm, A minor, playful and secretive: a pumping acoustic rhythm guitar on every beat, a nimble lead acoustic guitar answering the vocal with quick runs, a walking upright bass kept tight and lean under the mids, brushed snare, a clarinet weaving a sneaky A minor melody, a light female lead, sly and quick, with a small whispered chorus on the hook, in A minor; intro of rhythm guitar and clarinet, tiptoeing verses, a bouncing chorus, a slow bridge of clarinet and voice, the final chorus lifted and faster in feel, the outro a last clarinet run, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: rhythm guitar and clarinet]

[Verse 1]
A hole in the foot of a carton
A plank leaning down to the board
Two eyes in the dark keep on blinking
At every grey dude on the road
Wave two is over, I'm coming
And nobody's minding the signs

[Pre-Chorus]
Tiptoe, tiptoe
Over the tape, tiptoe

[Chorus]
One signpost, two signpost, into the hole
Paper makes a nest and a nest makes a home
Nobody's pointing where the grey should go
One signpost, two signpost, into the hole

[Verse 2]
They think I'm a pest in the cartons
I think I'm the keeper of things
The bead off the cord and lost pieces
The tape ends and wool ends and strings
The bits that you swore you would find
Are folded up warm in my keep

[Pre-Chorus]
Tiptoe, tiptoe
Over the tape, tiptoe

[Chorus]
One signpost, two signpost, into the hole
Paper makes a nest and a nest makes a home
Nobody's pointing where the grey should go
One signpost, two signpost, into the hole

[Bridge: slow, clarinet and voice]
Way in the back of the carton
Something is painted and small
I'm keeping it safe for wave nine
I'm keeping it safe for you all

[Final Chorus: lifted, the whispered chorus doubled]
One signpost, two signpost, into the hole
Paper makes a nest and a nest makes a home
Nobody's pointing where the grey should go
One signpost, two signpost, into the hole

[Outro: a last clarinet run]
Into the hole
```

## Request filter

stripped: nothing

## Rejected seeds

- 3980201: 0.9s of near-silence (limit 0.5); 20 of 195 heard words are not ours (10 %; limit 10 %, at least 40 heard): cotton pen tip signposts grave signposts beat tip toe tip toe tip

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 72 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.67 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 1.45 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.42 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.06 % below 60 Hz (raw render 19.1 %) | under 12 % | yes |
| onset rate | 2.92 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -47.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: A hole in the foot of the carton, a plank leaning down to the board. | Two eyes in the dark keep on blinking at every gray dude on the road. Wave two is over, I'm coming. And nobody's minding the signs. Tiptoe. | Over the tape, tiptoe. One signpost, two signposts into the hole. Paper makes a nest and a nest makes a hole. Nobody's pointing where the gray should go. | I'm signposting, signposting to the hole. They think I'm a pest in the cartons. I think I'm the keeper of things. The beat off the cord and | The tape ends in wool ends and strings. The bits that you swore you would find are folded up warm in my key. Tiptoe, tiptoe, over the tape, tiptoe. | One signpost, two signposts into the hole. Paper makes a nest and a nest makes a hole. Nobody's pointing where the gray should go. One signpost, two signposts. | I'm pushing to the hole. | Way in the back of the carton Something is painted and small I'm keeping it safe for wave news | I'm keeping it safe for you One signpost, two signposts into the hole Paper makes a nest and a nest | makes a hole. Nobody's pointing where the prey should go. One signpost, two signposts into the hole. Into the hole. | Thank you. | Thank you.

222 words heard, 17 not in our lyrics: gray signposts gray signposting signposting beat key signposts gray signposts pushing news signposts prey signposts thank thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.5s of near-silence (limit 0.5)
