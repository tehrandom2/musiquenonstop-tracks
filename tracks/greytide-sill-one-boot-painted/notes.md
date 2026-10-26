# One Boot Painted

- **slug:** greytide-sill-one-boot-painted
- **idea:** The half-painted mini left to dry at the edge of the ledge, one boot painted and one still grey, belongs to neither side of the fight
- **mood:** tender, lonely, wry
- **bpm:** 88 (asked) / 87 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 3970600
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 168.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.7 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 6
- **submitter:** the radio, for greytide
- **tags:** table:sill, pov:half-painted-mini
- **loop:** no, a one-shot
- **length:** 7445106 samples at 44.1 kHz (168.82 s), about 61.9 bars of 4/4 at 88 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The half-painted mini left to dry at the edge of the ledge, one boot painted and one still grey, belongs to neither side of the fight". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 88 bpm in B minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 88 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3970601 (0.8s of near-silence (limit 0.5)). Seed 3970600 is the take.

## Prompt

> Intimate indie folk, 88 bpm, B minor, tender and lonely: a fingerpicked steel-string acoustic guitar carries a B minor pattern, a warm upright bass kept lean and under the mids, soft brushed snare, a cello taking the counter-melody in the choruses, a high airy harmonium drone like wind at height, a warm female alto lead, close and unhurried, with a second voice joining in harmony on the last chorus, in B minor; intro of guitar alone, verses close, the chorus opens up with cello, a bridge of cello and voice, the final chorus lifted with harmonies and the full band, the outro back to guitar, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: fingerpicked guitar alone]

[Verse 1]
They set me down to dry beside the little pot of paint
One boot is oxblood, glossy, and the other's grey and faint
The hand went off to answer something buzzing in the room
And left me at the edge of it, half finished, half in bloom

[Pre-Chorus]
The grey ones walk right past me and they nod
The painted on the pots can't tell what I am

[Chorus]
One boot painted, one boot grey
I can't march with them and I can't walk away
Half of me was cared for, half of me's the tide
One boot painted, and I'm on both sides

[Verse 2]
A grey one stopped beside me with a seam across his face
He looked down at the oxblood like it was a holy place
He asked me does it feel different, and I couldn't find the words
I said it feels like someone noticed, that is all it's worth

[Pre-Chorus]
The grey ones walk right past me and they nod
The painted on the pots can't tell what I am

[Chorus]
One boot painted, one boot grey
I can't march with them and I can't walk away
Half of me was cared for, half of me's the tide
One boot painted, and I'm on both sides

[Bridge: cello and voice]
If the brush comes back I'll be whole by the dawn
If the brush forgets, I'm a grey one with one shoe on
Either way I'm standing where the concrete meets the drop
Either way I'll tell them both that wanting doesn't stop

[Final Chorus: lifted, harmonies and the full band]
One boot painted, one boot grey
I can't march with them and I can't walk away
Half of me was cared for, half of me's the tide
One boot painted, and I'm on both sides

[Outro: guitar alone]
One boot painted
And I'm on both sides
```

## Request filter

stripped: nothing

## Rejected seeds

- 3970601: 0.8s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 88 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.6, gain -2.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.85 dBFS decoded (pre-encode -3.64) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.92 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.53 % below 60 Hz (raw render 12.7 %) | under 12 % | yes |
| onset rate | 3.50 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.10x, tail-head -47.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: They set me down to dry beside a little part of pain One boot is up split glossy and the others gray and faint | The hand went off to answer something buzzing in the room And left me at the edge of it half-finished, half-in-bloom The grey ones walk right past me and they nod | The painted on the pots can't tell what I am one boot painted one boot great I can't march with them and I know | I can't walk away Half of me was cared for Half of me's the tide One boot played it And I'm on both sides Look | I | I said it feels like someone noticed that it's all it's worth The gray ones walk right past me and they nod They're painted on the pots, can't tell what I ever | One boot painted, one boot gray. I can't march with them and I can't walk away. Half of me was cared for. | Half of me is the tide One boot painted And I'm on both sides If the brush comes back I'll be whole by the dark | Is the brush forgets I'm a great one with one shoe either way I'm standing where the concrete meets the drop Either way, I'll tell them both | That wanting doesn't stop I can't march with them and I can't walk away | One boot. | Fade, and I'm on both sides

236 words heard, 17 not in our lyrics: part pain up split others gray great know played look gray they're ever gray dark great fade (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
