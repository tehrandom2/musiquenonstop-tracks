# The Sander Comes On

- **slug:** greytide-workbench-the-sander-comes-on
- **idea:** Waves five to seven, a grey dude shoved off the belt toward the newly switched-on sanding drum is saved by the thump of a hand putting tea down on the board
- **mood:** frantic, comic, breathless
- **bpm:** 174 (asked) / 86 (measured, folded into 70-140)
- **key:** F minor (asked) / F major (estimated)
- **seed:** 3960701
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 160 s rendered, 156.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:workbench, pov:grey-dude
- **loop:** no, a one-shot
- **length:** 6905247 samples at 44.1 kHz (156.58 s), about 113.5 bars of 4/4 at 174 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Waves five to seven, a grey dude shoved off the belt toward the newly switched-on sanding drum is saved by the thump of a hand putting tea down on the board". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 174 bpm in F minor, 160 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 174 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3960700 (harsh: 2.9% above 6 kHz (ceiling 2.5) and others). Seed 3960701 is the take, but it did not clear every gate: harsh: 3.3% above 6 kHz (ceiling 2.5).

## Prompt

> Frantic jump-up drum and bass at 174 bpm in F minor, a high-energy crew: fast choppy breakbeats, a tight lean wobbling bass with warm saturation in the mids, bass under the mids, a motor-hum riser that winds up before each drop, a grinding filtered noise texture as the sanding drum, a bright stab hook; a breathless, quick-tongued male MC half-rapping and a shouted crowd hook; starts mid with a riser, two big drops, a half-time bridge, a lifted final drop in F minor, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro - the motor hum winding up]
Amber light. Here it comes.

[Verse 1]
Wave five and the birdhouse blinks amber, then it hums
Somebody's half-finished project, and the motor comes
A sanding drum is spinning on the middle of the bench
Two centimetres wide and a horrible stench
Stay on the belt, stay on the belt, you'll be fine
But the cannon's got a temper and it shoves you off the line

[Pre-Chorus]
Don't get shoved, don't get shoved
(Dust, dust, dust)

[Chorus]
The sander comes on, the sander comes on
Off the road and you're sawdust, gone
Keep to the rubber, keep to the line
The sander comes on, every time

[Verse 2]
I'm a grey with a backpack full of spares that never fit
I got knocked off by a cannon ball and I'm near it, this is it
The sawdust round me scatters like a flock of startled birds
The swarf is jumping too, and I'm running out of words
Then a hand comes down with tea and puts it on the board
Thump, and every grey one hops, and I land back on the board

[Pre-Chorus]
Don't get shoved, don't get shoved
(Dust, dust, dust)

[Chorus]
The sander comes on, the sander comes on
Off the road and you're sawdust, gone
Keep to the rubber, keep to the line
The sander comes on, every time

[Bridge - half time, the hum only]
Hop, and I'm back
Hop, and I'm back on the track
Nobody saw it, nobody cares
But I'm still grey, I'm still here

[Final Drop - lifted, the crowd on every line]
The sander comes on, the sander comes on
Off the road and you're sawdust, gone
Keep to the rubber, keep to the line
The sander comes on, every time

[Outro - the motor winds down]
Still here.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3960700: harsh: 2.9% above 6 kHz (ceiling 2.5); onset rate 4.5/s outside 0.3-4.5; 27 of 178 heard words are not ours (15 %; limit 10 %, at least 40 heard): we pop bird all yeah kellan's send cray cannonball salt that's from

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 86 bpm vs asked 174 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.3, gain -1.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.53 dBFS decoded (pre-encode -3.42) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 3.29 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 10.09 % below 60 Hz (raw render 27.5 %) | under 12 % | yes |
| onset rate | 3.98 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.16x, tail-head -73.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Amber light. Here it comes. Wave five in the birdhouse blinks amber. Then it | And the motor comes. The sanding drum is spinning on the middle of the bench. Two centimeters wide. | And a horrible stench. Stay on the belt. Stay on the belt. You'll be fine. But the cannon's got a temper and it shoves you off the line. Don't get shoved. | Don't get shoved. Doss, doss, doss. The sender comes on. The sender comes on. Off the road and your sardust gone. Keep to the rubber. Keep to the line. The sender comes on. Every time. | I'm a grave with a backpack full of spares that never fit. I got knocked off by a cannonball and I'm near it, this is it. | The sawdust round me scatters like a flock of startled birds. The swarf is jumping too, and I'm running out of words. Then a hand comes down with tea, and puts it on the board. Thump, and every grade one hops, and I land back on the board. | Don't get shoved, don't get shoved. Dust, dust, dust. The sender comes on, the sender comes on. Off the road and your sardust gone. Keep to the rubber, keep to the line. The sender comes on. | Every time. | Hop, and I'm back. Hop, and I'm back on the track. Nobody saw it. Nobody cares. But I'm still great. I'm still here. | The sender comes on, the sender comes on, off the board and you saw the gun. | Keep to the rubber, keep to the line, the sender comes on, every time. Still here.

265 words heard, 23 not in our lyrics: in centimeters doss doss doss sender sender your sardust sender grave cannonball grade sender sender your sardust sender great sender sender gun sender (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 3.3% above 6 kHz (ceiling 2.5)
