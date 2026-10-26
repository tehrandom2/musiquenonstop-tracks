# Look Busy

- **slug:** greytide-schooldesk-look-busy
- **idea:** the teacher's patrol: footsteps and a shadow five seconds out, then every tower ducks and freezes; the one caught mid-shot is confiscated, and the hall monitor comes back for a second look
- **mood:** tense, sly, funny
- **bpm:** 132 (asked) / 131 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 4010400
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 166 s rendered, 159.8 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.3 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 4
- **submitter:** the radio, for greytide
- **tags:** table:schooldesk, pov:towers
- **loop:** no, a one-shot
- **length:** 7046502 samples at 44.1 kHz (159.78 s), about 87.9 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "the teacher's patrol: footsteps and a shadow five seconds out, then every tower ducks and freezes; the one caught mid-shot is confiscated, and the hall monitor comes back for a second look". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in D minor, 166 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4010401 (1.6s of near-silence (limit 0.5) and others). Seed 4010400 is the take.

## Prompt

> Tense spy funk, 132 bpm, D minor, a tight band: a muted wah guitar scratching sixteenths, a clavinet answering in short stabs, a dry tight lean bass with a creeping chromatic line, bass well under the mids, a crisp ghost-noted drum kit, a low baritone sax honking on the footsteps, a whispered-then-sung male lead, a hushed gang of backing voices going shhh, in D minor, sly and funny, mid start, stop-time freezes in every chorus, a long high plateau, a dip to a near silence, a lifted last chorus, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - wah guitar and the creeping bass, a sax honk like a footstep]

[Verse 1]
Five seconds of footsteps, a shadow on the lid
A mustard cardigan coming, so we do what we always did
Ballista lowers its arm, the cannon looks at the floor
The grey ones stop in the middle like they've never walked before

[Pre-Chorus - whispered]
Shhh. Shhh. She's at the second row.
Shhh. Shhh. Nobody let it show.

[Chorus - stop-time, the band freezes on every line]
Shhh, look busy
Guns down, heads down
Shhh, look busy
We're only toys around

[Verse 2]
The glue stick was halfway through a swipe across the road
The rubber band was stretched and it was ready to unload
And she saw a little twitch and her hand came down like weather
Confiscated till the end of the wave, the band and the pin together

[Pre-Chorus - whispered]
Shhh. Shhh. Then she walks away.
Shhh. Shhh. But that's not how she plays.

[Chorus - stop-time, the band freezes on every line]
Shhh, look busy
Guns down, heads down
Shhh, look busy
We're only toys around

[Breakdown - near silence, one bass note, the sax counts nine]
Nine seconds later, the hall monitor
Comes back for a second look, a short one, at the door
Two seconds, hold it, hold it, hold it

[Final Chorus - lifted, full band, the gang louder]
Shhh, look busy
Guns down, heads down
Shhh, look busy
We're only toys around

[Outro - the guitar unfreezes, the bass walks off]
She's gone. Carry on.
```

## Request filter

stripped: nothing

## Rejected seeds

- 4010401: 1.6s of near-silence (limit 0.5); 18 of 141 heard words are not ours (13 %; limit 10 %, at least 40 heard): least low canon gray won't freezes every line goes played freezes every

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 131 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.6, gain +0.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.53 dBFS decoded (pre-encode -3.08) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.49 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.47 % below 60 Hz (raw render 11.2 %) | under 12 % | yes |
| onset rate | 2.95 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.17x, tail-head -60.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Five seconds. | Shhh | She's at the second row. Nobody let it show. Look busy. Guns down. Heads down. | Look busy. We're only toys around. The glue stick was halfway through a swipe of | Then she walks away. | But that's not how she plays Look busy Guns down, heads down | Look busy. We're only toys around. | The sex counts nine. Nine seconds later, the hall monitor comes back for a second. Look, a short one at the door. Two seconds. Hold it. Hold it. Hold it. Shh. | Look busy. Guns down. Heads down. Look busy. We're | She's gone. | Thank you.

99 words heard, 5 not in our lyrics: sex counts shh thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
