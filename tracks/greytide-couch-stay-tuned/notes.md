# Stay Tuned

- **slug:** greytide-couch-stay-tuned
- **idea:** Wave five: the advert break comes on and the horde stands there watching; the remote-control tower changes the channel and every tower hits harder; told by the adverts and the remote.
- **mood:** glossy, sly, satirical
- **bpm:** 144 (asked) / 71 (measured, folded into 70-140)
- **key:** B minor (asked) / A major (estimated)
- **seed:** 4030511
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 156.1 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:remote control tower
- **loop:** no, a one-shot
- **length:** 6884079 samples at 44.1 kHz (156.10 s), about 93.7 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five: the advert break comes on and the horde stands there watching; the remote-control tower changes the channel and every tower hits harder; told by the adverts and the remote.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in B minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030510 (1.2s of near-silence (limit 0.5) and others). Seed 4030511 is the take, but it did not clear every gate: harsh: 2.9% above 6 kHz (ceiling 2.5).

## Prompt

> Satirical advert-break electropop, 144 bpm, B minor, glossy and sly. A bright jingle machine with every part in its lane: a bouncing synth-bass riff, tight lean bass under the mids, a glassy bell lead playing the jingle, stabbing chord synths on the offbeat, punchy electronic drums with handclaps, a little channel-hop static between sections. A bright, sugary female lead singing the adverts and a deadpan spoken male voice for the remote's lines. Arc: jingle intro, verse mid, a high chorus plateau, a breakdown of static and a lone kick, a lifted final chorus, a hard cut. B minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a jingle on bells, static, the beat drops in]
We'll be right back after this

[Verse 1: the bright female lead, selling]
New, from the people who brought you primer
Grey-Away, now available in beige
Brushes, three for the price of two
Open till four, ask for extra sauce
Hide the plastic, nobody needs to know
Stack it on a shelf where it cannot go

[Pre-Chorus]
Little grey ones sit right down
Hands in laps on the welted ground

[Chorus]
Stay tuned, little grey ones
Don't you touch that dial
Stay tuned, little grey ones
Hold still for a while

[Verse 2: the deadpan male voice, the remote tower speaking]
I'm the remote. I don't fire. I change the channel.
Static on the crowd, and the crowd tunes in.
They stand there smiling at the adverts.
And every tower on the board hits harder.
The painter's hand could press mute for a prize.
I'd leave it on. Look at their faces.

[Pre-Chorus]
Little grey ones sit right down
Hands in laps on the welted ground

[Chorus]
Stay tuned, little grey ones
Don't you touch that dial
Stay tuned, little grey ones
Hold still for a while

[Breakdown: channel static and a lone kick drum]
And now a word from our sponsors
And now a word from the cannon

[Final Chorus: lifted, harmonies stacked]
Stay tuned, little grey ones
Don't you touch that dial
Stay tuned, little grey ones
Hold still for a while
Stay tuned, little grey ones
Hold still for a while

[Outro: the jingle, then a hard cut]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4030510: 1.2s of near-silence (limit 0.5); harsh: 3.1% above 6 kHz (ceiling 2.5)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 71 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.40 dBFS decoded (pre-encode -3.75) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.92 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 10.94 % below 60 Hz (raw render 23.0 %) | under 12 % | yes |
| onset rate | 3.73 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -58.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Making alone battle static will be right back after this New from the people who brought you back | No. | Nobody needs to know Stack it on a shelf where it cannot go Little grey ones sit right down Hands and laps on the welded ground | Stay tuned, little gray ones, don't you touch that dial. Stay tuned, little gray ones, hold still for a while. | I'm the remote idle fire, I change the channel Static on the crowd and the crowd turns in They stand there smiling at the end | And every tower on the board hits harder. The painter's hand could press mute for a price. I'd leave it on. Look at their faces. | Little grey ones sit right down, hands in laps on the welted ground. Stay tuned, little grey ones, don't you | Touch that dial Stay tuned Little gray ones Hold still for a while | And now a word from our sponsors. And now a word from Canon. Stay tuned. | Stay tuned. | Hold still for a while.

170 words heard, 13 not in our lyrics: making alone battle will no welded gray gray idle turns end gray canon (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.9% above 6 kHz (ceiling 2.5)
