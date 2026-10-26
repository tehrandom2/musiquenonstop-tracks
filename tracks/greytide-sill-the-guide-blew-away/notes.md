# The Guide Blew Away

- **slug:** greytide-sill-the-guide-blew-away
- **idea:** After wave two a gust blows every signpost and tape arrow off the ledge; a primed-only grey dude finds he has to choose his own road
- **mood:** nervy, wry, liberated
- **bpm:** 138 (asked) / 136 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3970200
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 168 s rendered, 163.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 2
- **submitter:** the radio, for greytide
- **tags:** table:sill, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 7219159 samples at 44.1 kHz (163.70 s), about 94.1 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "After wave two a gust blows every signpost and tape arrow off the ledge; a primed-only grey dude finds he has to choose his own road". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in A minor, 168 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3970201 (22 of 204 heard words are not ours (11 %; limit 10 %, at least 40 heard): live sign pinwhe). Seed 3970200 is the take.

## Prompt

> Wiry post-punk, 138 bpm, A minor, nervy and funny: a tight motorik drum kit with a dry snare, a melodic picked bass that leads the song, tight lean bass under the mids, a chorused clean guitar playing jagged A minor arpeggios, a second guitar scratching on the offbeat, a thin organ drone for wind, a deadpan male baritone lead with a female backing voice shouting the answers, in A minor; intro of bass and drums with a gust swelling, verses clipped and dry, the chorus wide and singalong, a half-time bridge on bass alone before the band slams back, the final chorus lifted, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: bass and drums, a gust swells]

[Verse 1]
Wave two was over and the signs stood in a row
Little paper arrows telling grey where grey should go
Then the pinwheel spun up like it knew a thing or two
And the gust came through the gap and took the arrows too

[Pre-Chorus]
Signposts tumbling end on end
Over the lip and round the bend

[Chorus]
The guide blew away, the guide blew away
Nobody tells us where to go today
Groove on the left or the pots on the right
The guide blew away, we're on our own tonight

[Verse 2]
I've been about to be painted since the box was in the sale
Primer on my shoulders and a promise going stale
Now there's no one at the corners, no one pointing at the drop
Just a wet groove running fast and a ledge that doesn't stop

[Pre-Chorus]
Signposts tumbling end on end
Over the lip and round the bend

[Chorus]
The guide blew away, the guide blew away
Nobody tells us where to go today
Groove on the left or the pots on the right
The guide blew away, we're on our own tonight

[Bridge: half-time, bass alone, then the band slams back]
A gust can't tell a grey from grey
It shoves the light ones all one way
Into the groove where the water runs
Faster, faster, the lightest ones
Nobody points, so nobody's wrong
Choose your road and choose your song

[Final Chorus: lifted, the backing voice doubling]
The guide blew away, the guide blew away
Nobody tells us where to go today
Groove on the left or the pots on the right
The guide blew away, we're on our own tonight

[Outro: bass and the gust]
On our own tonight
On our own
```

## Request filter

stripped: nothing

## Rejected seeds

- 3970201: 22 of 204 heard words are not ours (11 %; limit 10 %, at least 40 heard): live sign pinwheels you gush side posts guy guy crew pot's guy

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.4, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.16 dBFS decoded (pre-encode -3.34) | under -1 dBFS | yes |
| silence | longest 0.30 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.98 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.09 % below 60 Hz (raw render 14.3 %) | under 12 % | yes |
| onset rate | 2.97 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -57.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Wave 2 | Signed for | Tumbling and on it over the lip and round the bend the guy blew away the guy blew away Nobody tells us where to go today | The box on the right, the guide blew away. We're on our own tonight. I've been about to be painted since the box was in the seal. Primer on my shoulders and | Signposts tumbling and on in over the lip and | The guy blew away. The guy blew away. Nobody tells us where to go today. Groove on the left or the parts on the right. The guy blew away. We're on our way. | Our own tonight. | But dust can't tell the gray from gray It shoves the light ones all one way Into the groove where the water runs Faster, faster, the lightest ones | Nobody points so nobody's wrong. Choose your road and choose your song. The guide blew away. The guide blew away. Nobody tells us where to go today. Groove on the road. | On our own tonight. | On our own

172 words heard, 13 not in our lyrics: signed for guy guy seal guy guy parts guy but dust gray gray (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
