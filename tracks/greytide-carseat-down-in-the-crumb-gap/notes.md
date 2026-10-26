# Down in the Crumb Gap

- **slug:** greytide-carseat-down-in-the-crumb-gap
- **idea:** a grey wobbler takes the slow road down the crack between the seats, gets swallowed by a crumb drift and spat out further along
- **mood:** woozy, funny, unbothered
- **bpm:** 140 (asked) / 138 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 4020400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 164.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.1 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:carseat, pov:wobbler
- **loop:** no, a one-shot
- **length:** 7238643 samples at 44.1 kHz (164.14 s), about 95.7 bars of 4/4 at 140 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a grey wobbler takes the slow road down the crack between the seats, gets swallowed by a crumb drift and spat out further along". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 140 bpm in D minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 140 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4020401 (harsh: 3.1% above 6 kHz (ceiling 2.5)). Seed 4020400 is the take.

## Prompt

> Heavy roots dub, 140 bpm felt in half time, D minor, a dub band with jobs: a one-drop drum kit with rimshots, a round tight lean bass carrying the riddim, bass well under the mids, an offbeat organ skank, a melodica playing the hook, spring-reverb echo throws on the snare, a relaxed warm male lead singing easy and amused, a low harmony on the hook, in D minor, woozy and funny, mid start, a long rolling plateau, a dub dip to bass and echoes, a lifted last chorus, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - melodica and the one drop, echoes]

[Verse 1]
The strap road's quick but the brakes come hard
So I took the crack in the seat, the long way, the yard
Slow down here, everyone walks like me
Sheltered from the sliding, crumbs up to my knee

[Pre-Chorus]
And there's a drift ahead, a soft one, deep
Some of us go under, some of us keep

[Chorus - harmony on the hook]
Down in the crumb gap, gone for a second
Up further along like nothing happened
Down in the crumb gap, swallowed and spat
Further along, now how about that

[Verse 2]
I've got a small base, everyone has said
Tall thin legs and a wobble in my head
But the crumbs don't care if you stand up straight
They take one in three and they spit you out late

[Pre-Chorus]
What falls in comes out further on
Same rule for a wrapper as a grey someone

[Chorus - harmony on the hook]
Down in the crumb gap, gone for a second
Up further along like nothing happened
Down in the crumb gap, swallowed and spat
Further along, now how about that

[Breakdown - dub, bass and echoes only]
Sink, sink, a second and a third
Dark in the biscuit, not a word
Up again, up again, look at me now

[Final Chorus - lifted, the organ and melodica together]
Down in the crumb gap, gone for a second
Up further along like nothing happened
Down in the crumb gap, swallowed and spat
Further along, now how about that

[Outro - the echoes trail off]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4020401: harsh: 3.1% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 138 bpm vs asked 140 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.7, gain -2.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.22 dBFS decoded (pre-encode -3.62) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.19 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 6.18 % below 60 Hz (raw render 14.7 %) | under 12 % | yes |
| onset rate | 3.16 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -60.3 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The | Slow down here every | Everyone walks like me Sheltered from the sliding crumbs up to my knee Then there's a drift ahead, a soft one deep | Some of us go under, some of us keep. Down in the crumb gap, gone for a second, but further along like that. | Nothing happened Down in the crumb gap Swallowed and spat Further along now How about that? I've got a small base Everyone has said | Tall thin legs and a wobble in my head. But the crumbs don't care if you stand up straight. They take | Same rule for a rap | Resurrected someone Down in the crumb gap Gone for a second Up further along like nothing happened Down in the crumb gap Swallowed and spat | further along now how about that sing sing a second and a third dock in the biscuit not a word up again up again look at me now | Down in the crumb gap, gone for a second Up further along like nothing happened Down in the crumb gap, swallowed inside | spat further along now how about that

182 words heard, 8 not in our lyrics: every then rap resurrected sing sing dock inside (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
