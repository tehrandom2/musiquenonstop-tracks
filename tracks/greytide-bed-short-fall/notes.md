# Short Fall

- **slug:** greytide-bed-short-fall
- **idea:** The spring sergeant boings the nearest grey dude straight up, and the landing flattens the bunch around it; on a springy mattress nothing dies from a short fall, so he keeps them bouncing.
- **mood:** rowdy, cheeky, bouncing
- **bpm:** 144 (asked) / 73 (measured, folded into 70-140)
- **key:** G minor (asked) / D minor (estimated)
- **seed:** 3930500
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 154.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:bed, pov:the spring sergeant
- **loop:** no, a one-shot
- **length:** 6818811 samples at 44.1 kHz (154.62 s), about 92.8 bars of 4/4 at 144 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The spring sergeant boings the nearest grey dude straight up, and the landing flattens the bunch around it; on a springy mattress nothing dies from a short fall, so he keeps them bouncing.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 144 bpm in G minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 144 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3930501 (2.3s of near-silence (limit 0.5) and others). Seed 3930500 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5); harsh: 2.5% above 6 kHz (ceiling 2.5).

## Prompt

> Ska-punk, 144 bpm, G minor. The band: offbeat skanking guitar upstrokes, a driving punk drum kit with fast hi-hats, a lean, busy bass under the mids, a tight two-piece horn section (trumpet and trombone) punching stabs between the lines and playing the riff. A shouty, cheeky male lead and a gang chorus that shouts back. Mood: rowdy, bouncing, cheeky. Arc: a horn fanfare intro, verses on the skank, full-band chorus, a breakdown to claps and gang chant, the final chorus lifted with horns doubled. G minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: horn fanfare]

[Verse 1]
Sergeant on the high ground, painted khaki green
a coil for a backbone, the springiest routine
the nearest dude gets lifted, straight up to the sky
the landing takes his mates out when he's coming down from high
everything bounces further here, a quarter more and then some
nothing dies from a short fall, so I bounce them till they're done

[Pre-Chorus]
Put me where they bunch up
put me where they crowd

[Chorus]
Boing! Up you go!
land on all your friends below
Boing! Up you go!
short fall, hard landing, there you go

[Verse 2]
The cat came through on schedule and she shoved me off my mark
three centimetres sideways and I'm sproinging in the dark
the corner folds, the road gets short, the grey come double time
I'm counting every coil I've got, I'm counting every climb
there's a gap behind the bed where nothing ever climbs back out
I'd rather send them skyward, that's what springs are all about

[Pre-Chorus]
Put me where they bunch up
put me where they crowd

[Chorus]
Boing! Up you go!
land on all your friends below
Boing! Up you go!
short fall, hard landing, there you go

[Breakdown: claps and gang chant]
Coil! (Coil!) Load! (Load!) Boing! (Boing!)
Coil! (Coil!) Load! (Load!) Boing! (Boing!)

[Final Chorus: lifted, horns doubled]
Boing! Up you go!
land on all your friends below
Boing! Up you go!
short fall, hard landing, there you go

[Outro: horn stab]
Boing.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3930501: 2.3s of near-silence (limit 0.5); 23 of 203 heard words are not ours (11 %; limit 10 %, at least 40 heard): shortfall until cry boy boy shots heart centimeters strolling falls gray nothing's

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 73 bpm vs asked 144 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.4, gain -2.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.76 dBFS decoded (pre-encode -3.87) | under -1 dBFS | yes |
| silence | longest 0.70 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 2.51 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 5.14 % below 60 Hz (raw render 14.9 %) | under 12 % | yes |
| onset rate | 3.54 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.01x, tail-head -59.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Sergeant on the high ground, painted khaki green, a quail for a backbone, the springiest routine, the nearest dude gets lifted, straight. | Oh | Short for | Hard landing. There you go. Call your friends. We go. Short fall. Hard landing. There you go. | The cat came through on schedule and she shoved me off my mark. Three centimeters sideways and I'm sprung in in the dark. The corner falls, the road gets short, the gray come double time. I'm counting every coil I've got, I'm counting every climb. There's a gap behind the bed. | When nothing ever climbs back out I'd rather send them skyward That's what springs are all about From me where they punch them From me where they crown For you | All your friends below. Boy, up you go. Short for hard landing. There you go. All your friends below. | Short fall, hard landing, there you go. Boil. Load. Boing. Boing. | Coil! Load! Boing! Boing! Boing! Boing! Boing! Boing! | Shortfall hard landing there | There you go.

168 words heard, 13 not in our lyrics: quail oh call we centimeters sprung falls gray punch crown boy boil shortfall (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5); harsh: 2.5% above 6 kHz (ceiling 2.5)
