# The Pot Pays Double

- **slug:** greytide-couch-the-pot-pays-double
- **idea:** Wave nine: the room dims to the screen, every bounty pays double and a boss in shrink-wrap walks on with a tube of crisps for a health bar; the horde's own chant.
- **mood:** urgent, bittersweet, defiant
- **bpm:** 172 (asked) / 85 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 4030910
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 170 s rendered, 168.2 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 26.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 9
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:the horde
- **loop:** no, a one-shot
- **length:** 7416823 samples at 44.1 kHz (168.18 s), about 120.5 bars of 4/4 at 172 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave nine: the room dims to the screen, every bounty pays double and a boss in shrink-wrap walks on with a tube of crisps for a health bar; the horde's own chant.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 172 bpm in F minor, 170 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 172 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030911 (harsh: 3.6% above 6 kHz (ceiling 2.5) and others). Seed 4030910 is the take, but it did not clear every gate: harsh: 3.0% above 6 kHz (ceiling 2.5).

## Prompt

> Dark rolling drum and bass, 172 bpm, F minor, urgent and bittersweet. A tight crew: chopped breakbeats rolling with ghost snares, a reese bass with grit in the mids kept lean under the mids, a sustained string section carrying the minor theme, a stabbed brass hit at each phrase end like a quiz-show sting, a rising pad. A raw, chanting female lead and a gang chorus of grey dudes on the hook. Arc: strings and a ticking hat, a riser into the drop at mid-high energy, a long high plateau, a breakdown where the beat cuts to strings and voice, a final drop lifted with the gang, a hard stop. F minor, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: strings and a ticking hi-hat, the room goes dark to the screen]
Final round

[Verse 1]
Room goes dark to the screen now
Only the glow of the gap
Ten rounds deep in a long night
And nobody's sending us back
Bounty doubled on every head
Bless us, we're a prize at last
Never worth a thing in the box
Worth a fortune falling fast

[Pre-Chorus]
Down the high road, down the low
Every road just one way, go

[Chorus]
Final round, the pot pays double
Never worth this much before
Final round, the pot pays double
Every one of us is worth more

[Verse 2]
Something big at the back seam
Shrink-wrap still on its skin
A tube of crisps stands up for it
Twenty high and thinning
Every hit takes one from the top
Crumbs spill out on the pad
We march behind it, grey and proud
It's the only boss we've had

[Pre-Chorus]
Down the high road, down the low
Every road just one way, go

[Chorus]
Final round, the pot pays double
Never worth this much before
Final round, the pot pays double
Every one of us is worth more

[Breakdown: the beat cuts out, strings and voice]
If I fall, I fall forward
If I fall, I fall in gold
Tell the shelf we nearly made it
Tell the box we weren't cold

[Final Chorus: the drop returns lifted, the whole grey gang]
Final round, the pot pays double
Never worth this much before
Final round, the pot pays double
Every one of us is worth more
Final round, the pot pays double
Every one of us is worth more

[Outro: one brass sting, a hard stop]
```

## Request filter

stripped: nothing

## Rejected seeds

- 4030911: harsh: 3.6% above 6 kHz (ceiling 2.5); 25 of 222 heard words are not ours (11 %; limit 10 %, at least 40 heard): oh nobody sent jumbled where through pop days heard pop days his

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 85 bpm vs asked 172 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.1, gain -1.9 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.40 dBFS decoded (pre-encode -3.45) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.96 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 6.96 % below 60 Hz (raw render 21.8 %) | under 12 % | yes |
| onset rate | 2.97 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.36x, tail-head -72.0 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Room goes dark to the screen now only the glow of the | The | the fortune falling fast down the high road down the low every road just one way go | Something big at the back. | Seam shrink wrap still on its skin A tube of crisp stands up for it 20 high and thinning Every hit takes one from the top Crumbs fill out on the pad We march behind | It's the only loss we've had Down the high road Down the low Every road Just one way | Bye. | If I fall, I fall forward If I fall, I fall in gold To the shelf we need | We nearly made it, till the box we weren't closed | Thank you. | This much before I take it up. | I taste double, every one of us's is worth more

135 words heard, 12 not in our lyrics: crisp fill loss bye need till closed thank you take taste us's (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.0% above 6 kHz (ceiling 2.5)
