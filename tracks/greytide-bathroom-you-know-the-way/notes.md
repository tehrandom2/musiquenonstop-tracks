# You Know the Way

- **slug:** greytide-bathroom-you-know-the-way
- **idea:** The first time the hot tap runs, its wash lifts the little signposts that taught the road and floats them all down to the plug hole; they sing as they go, like every guide that has to leave once the learning is done.
- **mood:** tender, bittersweet, floating
- **bpm:** 126 (asked) / 125 (measured, folded into 70-140)
- **key:** C# minor (asked) / C# minor (estimated)
- **seed:** 3940501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 157.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.2 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the signposts
- **loop:** no, a one-shot
- **length:** 6933454 samples at 44.1 kHz (157.22 s), about 82.5 bars of 4/4 at 126 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The first time the hot tap runs, its wash lifts the little signposts that taught the road and floats them all down to the plug hole; they sing as they go, like every guide that has to leave once the learning is done.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 126 bpm in C# minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 126 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3940500 (0.7s of near-silence (limit 0.5)). Seed 3940501 is the take.

## Prompt

> Indie folk, 126 bpm, C# minor. The band: a fingerpicked acoustic guitar carrying a rolling figure, a soft brushed kit with a steady kick, a lean upright bass under the mids, a small string quartet rising on the chorus, a glockenspiel answering the hook. A soft, close male lead with a gentle female harmony on the chorus. Mood: tender and bittersweet, floating away. Arc: guitar alone, the band in at verse one, the chorus lifting with strings, a quiet bridge, the final chorus lifted with full strings and both voices. C# minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: fingerpicked guitar]

[Verse 1]
We were the arrows on the road
the little flags that said this way
we pointed where the grey would walk
so you could learn it on the first day
then the red handle turned a quarter round
the pipe knocked twice, the steam came through
and the water lifted every one of us
and carried us away from you

[Pre-Chorus]
Don't look for us, don't look back

[Chorus]
You know the way now
we float on, we float on
you know the way now
the arrows fade, the road goes on

[Verse 2]
I bumped the whale, I passed the boat
still wound up, going nowhere fast
I saw the towers turn to watch us go
the ones we taught are the ones who'll last
and every guide and every hand
sooner or later goes downstream
you learn the road by walking it
we were the start, and not the dream

[Pre-Chorus]
Don't look for us, don't look back

[Chorus]
You know the way now
we float on, we float on
you know the way now
the arrows fade, the road goes on

[Bridge: quiet, guitar and voice]
Plink, and we're gone
(you know the way)
plink, and we're gone
(you know the way)

[Final Chorus: lifted, full strings, both voices]
You know the way now
we float on, we float on
you know the way now
the arrows fade, the road goes on

[Outro: guitar alone]
The road goes on.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3940500: 0.7s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 125 bpm vs asked 126 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.44 dBFS decoded (pre-encode -3.30) | under -1 dBFS | yes |
| silence | longest 0.45 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.81 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 1.79 % below 60 Hz (raw render 5.7 %) | under 12 % | yes |
| onset rate | 2.96 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -49.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: We were the arrows on the road, the little flags that set this way. We | It pointed where the gray would walk so you could learn it on the first day. Then the red handle turned a quarter round, the pipe knocked twice, the steam came through. | Don't look for us, don't look back | We float on, we float on. You know the way now, the arrows fade, the road goes on. | I bumped the whale, I passed the boat Still wound up going nowhere fast I saw the towers turn to watch us go The ones we taught are the ones | We were the star | We | You know the way now the arrows fade, the road goes on. | And we're gone. We... And we're gone. You know the way now. | We slowed on, we slowed on You know the way now The arrows fade, the road goes on | Thank you.

151 words heard, 6 not in our lyrics: set gray star slowed slowed thank (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
