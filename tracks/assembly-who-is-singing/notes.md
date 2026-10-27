# Who Is Singing

- **slug:** assembly-who-is-singing
- **idea:** a choir where half the voices are recordings and nobody will say which; they sing anyway
- **mood:** ecstatic, communal, a final lift
- **bpm:** 136 (asked) / 136 (measured, folded into 70-140)
- **key:** B minor (asked) / D major (estimated)
- **seed:** 5100404
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 220 s rendered, 215.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 30.8 s per seed, model load 26.0 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** Transmissions on a Ghostline, track 4
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 9496490 samples at 44.1 kHz (215.34 s), about 122.0 bars of 4/4 at 136 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a choir where half the voices are recordings and nobody will say which; they sing anyway". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 136 bpm in B minor, 220 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 136 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100406 (boomy: 15.4% below 60 Hz (ceiling 12)); 5100405 (boomy: 12.4% below 60 Hz (ceiling 12) and others). Seed 5100404 is the take.

## Prompt

> ecstatic choral indie folk with electronics, a small choir of friends singing the written words clearly in unison and simple harmony, no ad-libs, no gospel, no preaching, a few vocoder voices blended in, marching floor toms and hand percussion, handclaps and tambourine, a reedy pump organ drone, chiming guitars, glitchy synth arpeggio, lo-fi bedroom-orchestra strings, starts mid and keeps lifting to a final communal shout of the chorus, lean bass, minor

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Verse 1]
Forty of us on the risers, shoulder pressed to shoulder,
half of us are recordings and the hall is getting colder,
nobody will tell us which, the leader shakes his head,
he says the note is all that matters, sing the note instead.

[Chorus]
Sing it, sing it!
If your breath is borrowed,
sing it, sing it!
The note doesn't know!

[Verse 2]
The tenor on my left is warm, I swear I feel him breathe,
the alto on my right has never once been seen to leave,
I put my hand out in the dark to find out if I'm there,
and someone takes it, someone takes it, and I don't care.

[Chorus]
Sing it, sing it!
If your breath is borrowed,
sing it, sing it!
The note doesn't know!

[Bridge]
One voice, forty voices,
none of us can tell,
one voice, forty voices,
ring it like a bell!

[Final Chorus]
Sing it, sing it!
If your breath is borrowed,
sing it, sing it!
The note doesn't know!
The note doesn't know!
```

## Request filter

stripped: nothing

## Rejected seeds

- 5100406: boomy: 15.4% below 60 Hz (ceiling 12)
- 5100405: boomy: 12.4% below 60 Hz (ceiling 12); 232 of 368 heard words are not ours (63 %; limit 10 %, at least 40 heard): oh blue see see no bear hollow no no oh oh oh

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 136 bpm vs asked 136 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.9, gain +0.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.98 dBFS decoded (pre-encode -3.13) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.76 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.82 % below 60 Hz (raw render 31.0 %) | under 12 % | yes |
| onset rate | 2.50 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.49x, tail-head -44.4 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: 40 of a song | Nobody will tell us which | The leader shakes his head. He says the note is all that matters. Sing the note instead. Sing it, sing it. | If your breath is borrowed, sing it, sing it. The note doesn't know. | The tenor on my left is warm, I swear I feel him breathe. The alto on my right has never once been seen to leap. | I put my hand out in the dark to find out if I'm there And someone takes it someone takes it and I don't care | Sing it, sing it. If your breath is borrowed, sing it, sing it. | The note doesn't know. | One voice, forty voices, none of us speak. | One voice, four voices, ring it like a bell. | . | Say it, say it, if your breath is borrowed, say it, say it, the note doesn't know. | The note doesn't know | . | Thank you.

149 words heard, 10 not in our lyrics: song leap speak four say say say say thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
