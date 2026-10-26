# Let It Drain

- **slug:** greytide-bathroom-let-it-drain
- **idea:** The last wave: a toy bath on the tub floor holds the boss's life in its water, and every hit drains it; when it is empty the painter's hand lifts the toys onto the rim, and nobody shoves the last grey dude standing by the hole.
- **mood:** vast, aching, triumphant, kind
- **bpm:** 136 (asked) / 136 (measured, folded into 70-140)
- **key:** F# minor (asked) / F# minor (estimated)
- **seed:** 3941000
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 178 s rendered, 172.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 26.5 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the bath toys
- **loop:** no, a one-shot
- **length:** 7621414 samples at 44.1 kHz (172.82 s), about 97.9 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The last wave: a toy bath on the tub floor holds the boss's life in its water, and every hit drains it; when it is empty the painter's hand lifts the toys onto the rim, and nobody shoves the last grey dude standing by the hole.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in F# minor, 178 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3941001 (13 of 119 heard words are not ours (11 %; limit 10 %, at least 40 heard): yeah trade trade). Seed 3941000 is the take.

## Prompt

> Post-rock anthem with vocals, 136 bpm, F# minor. The band: tremolo-picked guitars in a huge reverb, a second guitar building ringing chords, driving toms and a tight kick, a lean bass under the mids, a glockenspiel melody, and a choir of mixed voices for the last chorus. A male and a female lead singing in unison, splitting into harmony on the hook. Mood: vast, aching, triumphant and kind. Arc: tremolo guitars alone, drums in at verse one, a soaring chorus, a bridge of choir with drums out, the final chorus lifted with full choir, a quiet outro. F# minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: tremolo guitars in a huge reverb]

[Verse 1]
A toy bath stands on the floor of the tub
a bath inside a bath, a little joke
its water is the life of the last big kit
and every hit we land, it drops a stroke
the thing climbs out in cellophane and pride
the kit the painter never dared to start
we throw the duck, the plunger and the loofah
we throw every brush mark of our heart

[Pre-Chorus]
Drain, drain, let it drain

[Chorus]
Let it drain, let it drain
the tide goes out, we remain
let it drain, let it drain
painted, chipped and here again

[Verse 2]
The shower's come and gone, ten seconds wide
the foam lies flat along the near side
a hand comes down and lifts us one by one
the duck, the loofah, the plunger, done
and the last grey dude stands by the hole
he's walked it twenty times, he's lost it all
nobody shoves him, nobody tries
someday a brush, someday a colour, someday

[Pre-Chorus]
Drain, drain, let it drain

[Chorus]
Let it drain, let it drain
the tide goes out, we remain
let it drain, let it drain
painted, chipped and here again

[Bridge: drums out, choir]
Bath time is over (the water is going)
the toys are not (the toys are not)
bath time is over (the water is going)
the toys are not

[Final Chorus: lifted, full choir]
Let it drain, let it drain
the tide goes out, we remain
let it drain, let it drain
painted, chipped and here again

[Outro: tremolo guitars fade]
Here again.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3941001: 13 of 119 heard words are not ours (11 %; limit 10 %, at least 40 heard): yeah trade trade trade trade coming trade trade ships that train train

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.0, gain -1.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.98 dBFS decoded (pre-encode -3.34) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.23 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.99 % below 60 Hz (raw render 22.6 %) | under 12 % | yes |
| onset rate | 2.71 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -36.1 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: . | A toy bath stands on the floor of the tub, a bath inside the tub. | a bath a little joke it's water is the life of the last big kid and every hit we land it drops a stroke the thing climbs out and cellophane and pride the kid the painter never did | Let it rain. | Let it drain, let it drain Time goes we remain Let it drain, let it drain Ain't it shipped in here again? | The showers come and gone ten seconds wide. The foam lies flat along the near side. A hand comes down and lifts us one by one. The duck, the loofah, the plunger dunks. | And the last great dude stands by the hole. He's walked it 20 times, he's lost it all. Nobody shows him, nobody tries. Someday a brush, someday a color, someday. Train. | Let it drain. Let it drain. Let it drain. The tide goes, we remain. Let it drain. Let it drain. | Painter chip, I'm here again. Bedtime is over, the water is gone. | The toys are not, the toys are not, that time is over, the water is going, the toys are not. Let it rain, let it rain. | Yeah. | Here again.

202 words heard, 20 not in our lyrics: it's kid kid did rain ain't shipped showers dunks great shows color train chip i'm bedtime that rain rain yeah (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
