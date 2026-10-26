# Closing Time in the Case

- **slug:** greytide-gamestore-closing-time-in-the-case
- **idea:** Wave seven, closing time: the shop goes to half light and the display minis in the cabinet, too perfect ever to be played, become the light the towers fight by
- **mood:** tender, luminous, bittersweet
- **bpm:** 92 (asked) / 92 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 3950800
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 165.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 25.4 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 8
- **submitter:** the radio, for greytide
- **tags:** table:gamestore, pov:display-minis
- **loop:** no, a one-shot
- **length:** 7305476 samples at 44.1 kHz (165.66 s), about 63.5 bars of 4/4 at 92 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven, closing time: the shop goes to half light and the display minis in the cabinet, too perfect ever to be played, become the light the towers fight by". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 92 bpm in A minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 92 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3950801 (passed, but outranked by the kept takes). Seed 3950800 is the take.

## Prompt

> Tender dream-pop at 92 bpm in A minor, a hushed four-piece: a soft lean bass guitar holding long roots, bass under the mids, brushed drums, a shimmering clean guitar with slow chorus, a glassy celesta motif as the strip light, a warm string pad swelling under the chorus; a breathy, close female lead with soft wordless harmonies; starts quiet, grows through two choruses, a near-silent bridge, a lifted last chorus, A minor, gentle, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - celesta and guitar]

[Verse 1]
We stand in the case in the aisle, the best of the best
Every eye a perfect dot, a highlight on every crest
We were painted for the photograph, we were painted to be seen
We have never left the shelf, we have never touched the green
We watch the little ones out there, chipped and wonky proud
Holding the road for twenty stamps against a grey crowd

[Pre-Chorus]
The lights stutter once, twice, three times
(And the shade swings low)

[Chorus]
Closing time, the shop goes dim
And the light in the case is the light for them
We can't step down, we can't go out
But we can shine, we can shine

[Verse 2]
The hanging shade swings off to the side and the shadows grow
Long as the road, longer than the towers ever know
The only light that's left is ours, the strip along our shelf
And every gunner on the green can see the road itself
We were made too good to play with, that was our mistake
Tonight we're the key light, and it's ours to make

[Pre-Chorus]
The lights stutter once, twice, three times
(And the shade swings low)

[Chorus]
Closing time, the shop goes dim
And the light in the case is the light for them
We can't step down, we can't go out
But we can shine, we can shine

[Bridge - near silence, voice and celesta]
Nobody plays with the perfect ones
Nobody risks us on the felt
So we do the one thing we were made for
We hold still, and we glow

[Final Chorus - lifted, strings in full]
Closing time, the shop goes dim
And the light in the case is the light for them
We can't step down, we can't go out
But we can shine, we can shine

[Outro - celesta alone]
Shine.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3950801: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 92 bpm vs asked 92 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.48 dBFS decoded (pre-encode -3.56) | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 1.07 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 3.68 % below 60 Hz (raw render 12.8 %) | under 12 % | yes |
| onset rate | 2.79 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -55.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: We stand in the case in the aisle, the best of the best. | Every eye, a perfect art, a highlight on every crest. We were painted for the photograph, we were painted to be seen. We have never left the shelf, we have never touched the green. | We watch the little ones out there Chipped and wonky proud Holding the road for 20 stamps against a grey crowd The lights stutter once, twice, three times | We can't step down we can't | We can shine. We can shine. The hanging shade swings off to the side and the shadows grow. Long as the road, longer than the | The only light that's left is ours The strip along our shelf And every gone the green Can see the road itself We were made too good to play with | That was our mistake Tonight we're the key light And it's ours to make the light stutter Once, twice, three times Close in time | The shop goes dim and the light in the case is the light for them. We can't step down. We can't go out where we can shine. | We can shine. Nobody plays with the perfect ones. Nobody risks us on the felt. So we do the one thing we want. | We were made for, we hold still and we glow. Closing time, the shop goes dim and the light in the | We can't step down, we can't go out, but we can shine, we can shine. | No.

246 words heard, 6 not in our lyrics: art gone close where want no (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
