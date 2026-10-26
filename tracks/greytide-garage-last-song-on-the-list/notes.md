# Last Song on the List

- **slug:** greytide-garage-last-song-on-the-list
- **idea:** Wave ten, the boss: the box nobody opened cracks and pours out grunts; the grey dude from song one, still unpainted, sings the closer and hopes to be the one picked for primer
- **mood:** tired, huge, hopeful
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 3991000
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 180 s rendered, 172.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 26.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 10
- **submitter:** the radio, for greytide
- **tags:** table:garage, pov:grey dude
- **loop:** no, a one-shot
- **length:** 7600391 samples at 44.1 kHz (172.34 s), about 99.1 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave ten, the boss: the box nobody opened cracks and pours out grunts; the grey dude from song one, still unpainted, sings the closer and hopes to be the one picked for primer". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 180 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3991001 (1.1s of near-silence (limit 0.5)). Seed 3991000 is the take, but it did not clear every gate: 1.6s of near-silence (limit 0.5).

## Prompt

> Anthemic slow-building rock, 138 bpm, E minor: a lone clean guitar strumming eighths, a tight lean bass, bass under the mids, entering at the first chorus, a drummer building from floor tom to full kit, a big chorused lead guitar line after the bridge, a gravelly male lead and a gang chorus of tired voices; warm saturation, no harsh highs; starts quiet and close, builds verse by verse into a long high plateau, one dip to guitar and voice, a final lifted chorus with the gang, E minor, ends on one ringing chord

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: one clean guitar]
Cross it off, cross it off

[Verse 1]
The set list's down to the bottom line
Nine songs crossed in a shaky biro sign
The box comes out that nobody opened
Shrink wrap squeaking and the corners broken

[Verse 2]
And I'm the grey dude from the start of the night
I walked every lead, I was never in the fight
The Tangled Cable caught me twice by the knee
I'm still unpainted, but the road knows me

[Pre-Chorus]
I don't need a colour to be part of the sound
I just need a jack and a reason to be found

[Chorus]
Last song on the list
Play it like you mean it
Last song on the list
Grey or gold, we've been it

[Verse 3]
The ballista holds and the cannon calls
The kick drum shoves him up against the walls
The lid cracks open and the grunts pour out
And the whole garage gives one big shout

[Chorus]
Last song on the list
Play it like you mean it
Last song on the list
Grey or gold, we've been it

[Bridge: guitar and voice only]
In the morning they'll sweep up the sprue
The hand will pick one grey dude out of a few
Prime him in white and give him something to do
And that one is me, if I'm lucky, it's true

[Final Chorus: lifted, the gang roaring, lead guitar soaring]
Last song on the list
Play it like you mean it
Last song on the list
Grey or gold, we've been it

[Outro: one ringing chord]
Cross it off
```

## Request filter

stripped: nothing

## Rejected seeds

- 3991001: 1.1s of near-silence (limit 0.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.7, gain -1.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.38 dBFS decoded (pre-encode -3.30) | under -1 dBFS | yes |
| silence | longest 1.60 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 1.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.33 % below 60 Hz (raw render 19.0 %) | under 12 % | yes |
| onset rate | 3.19 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -15.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Cross it off. Cross it off. | Dead list down to the bottom line. Nine songs crossed in a shaky bottle sign. The box comes out that nobody opened. Shrinkwrap squeaking and the corner is broken. | And I'm the great dude from the start of the night. I walked every lead. I was never in the fight. The tangled cable caught me twice by the knee. I'm still unpainted, but the road | I just need a jack and a reason to be found. Last song on the list. Like you mean it. | Last song on the list. Grey or gold, we've been in. The baliester holds and the cannon. | Last song on the lid | Play it like you mean it. Last song on the list. Gray or gold, we've been in. | . | In the morning they'll sweep up the sprue The hand will pick one gray dude out of a few | Crown him in white and give him something to do And that one is me, if I'm lucky it's true | Last song on the left, play it like you mean it. Last song on the left, gray or gold we've been in. | Cross it on.

194 words heard, 12 not in our lyrics: dead bottle shrinkwrap corner great baliester gray gray crown left left gray (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 1.6s of near-silence (limit 0.5)
