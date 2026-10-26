# The Lounger's Shadow

- **slug:** greytide-sandpit-the-lounger-shadow
- **idea:** Wave seven: the sun drops low and red, the sun lounger's long shadow crosses half the board and slows everyone in it; the lounger's shadow sings
- **mood:** spellbound, dusky, ominous
- **bpm:** 126 (asked) / 125 (measured, folded into 70-140)
- **key:** C minor (asked) / G minor (estimated)
- **seed:** 4050700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 175 s rendered, 171.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:sandpit, pov:the-shadow
- **loop:** no, a one-shot
- **length:** 7543735 samples at 44.1 kHz (171.06 s), about 89.8 bars of 4/4 at 126 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: the sun drops low and red, the sun lounger's long shadow crosses half the board and slows everyone in it; the lounger's shadow sings". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 126 bpm in C minor, 175 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 126 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4050701 (2.6s of near-silence (limit 0.5)). Seed 4050700 is the take.

## Prompt

> Cinematic desert-western noir, 126 bpm, in C minor, a dusk ensemble: a baritone twang guitar with long tremolo chords, a tight lean upright bass under the mids playing a slow walking pulse, brushed snare and a low tom heartbeat, a lone muted trumpet answering each vocal line, a whistled countermelody, a smoky low female lead, slow and spellbound, with a wordless choir under the chorus, the key C minor stated in the frame and held; arc: tremolo intro like the sun going down, quiet verses, a widening chorus, a bridge where everything drops to bass and voice, a final chorus lifted with the choir and trumpet together, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: tremolo guitar, the sun goes down]

[Verse 1]
The sun slides down to the end of the lawn
The orange gets older, the noon is gone
The fence goes amber, the hedge goes red
And the striped lounger lays its long shadow ahead

[Verse 2]
It crawls on the sand like a slow grey tide
It covers the trench and the dune's warm side
And every small soldier who walks in the shade
Goes heavy and dreamy and half afraid

[Pre-Chorus]
Seventy-two in a hundred, the pace of the dark
The cold comes early to the back of the park

[Chorus]
The lounger's shadow, the lounger's shadow
Half of the sandpit gone violet and slow
You walk in the dusk and the dusk walks you
The lounger's shadow is coming through

[Verse 3]
A mage on the keep feels the warmth leave the stone
A spade in the hollow is suddenly alone
But the grey in the shadow can't hurry the night
And the towers keep firing at the last of the light

[Chorus]
The lounger's shadow, the lounger's shadow
Half of the sandpit gone violet and slow
You walk in the dusk and the dusk walks you
The lounger's shadow is coming through

[Bridge: bass and voice only]
I was a giant's chair all afternoon
Now I'm a country the size of the moon
Nobody sits here, nobody sees
The shade of a lounger can bring armies to their knees

[Final Chorus: lifted, choir and trumpet]
The lounger's shadow, the lounger's shadow
Half of the sandpit gone violet and slow
You walk in the dusk and the dusk walks you
The lounger's shadow is coming through

[Outro: whistle and tremolo fade]
Coming through.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4050701: 2.6s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 125 bpm vs asked 126 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.0, gain -3.0 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.93 dBFS decoded (pre-encode -3.91) | under -1 dBFS | yes |
| silence | longest 0.45 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.73 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.23 % below 60 Hz (raw render 12.8 %) | under 12 % | yes |
| onset rate | 2.84 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -58.7 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The sun slides down to the end alone The orange gets older, the noon is gone | The fence goes amber, the hedge goes red, and the striped lounger lays its long shadow ahead. It crawls on the sand like a slow grey tide. | It covers the trench and the dunes warm side And every small soldier who walks in the shade Goes heavy and dreamy and half a frame | 72 in a hundred, the pace of the dark, the cold comes early to the back of the pod. The lounge of shadow, the | The Lounger's Shadow | Is coming through A mage on the keep feels the warmth leave the stone The spade in the hollow is suddenly alone But the grey in the shadow | Can't hurry the night and the towers keep firing at the last of the light. The lounger's shadow, the lounger's shadow, half of the sky. | And pick on violet and slow You walk in the dusk And the dust walks you The lounger's shadow Is coming through | I was a giant's chair all afternoon. Now I'm a country the size of the moon. Nobody sits here. Nobody sees the shade. | Shadow | The Loungeer's Shadow | .

197 words heard, 8 not in our lyrics: dunes frame pod lounge sky pick dust loungeer's (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
