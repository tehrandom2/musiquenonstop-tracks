# Who Wants To Be A Painter

- **slug:** greytide-couch-who-wants-to-be-a-painter
- **idea:** The quiz show on the screen opens the night: three one-way roads, the pot, the hearts, and a grey crowd that wants to win; told by the show itself.
- **mood:** cheeky, driving, showbiz
- **bpm:** 138 (asked) / 134 (measured, folded into 70-140)
- **key:** E minor (asked) / A minor (estimated)
- **seed:** 4030101
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 172 s rendered, 167.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.9 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 1
- **submitter:** the radio, for greytide
- **tags:** table:couch, pov:the quiz show
- **loop:** no, a one-shot
- **length:** 7378005 samples at 44.1 kHz (167.30 s), about 96.2 bars of 4/4 at 138 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "The quiz show on the screen opens the night: three one-way roads, the pot, the hearts, and a grey crowd that wants to win; told by the show itself.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 138 bpm in E minor, 172 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 138 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4030100 (25 of 235 heard words are not ours (11 %; limit 10 %, at least 40 heard): host cops band r). Seed 4030101 is the take, but it did not clear every gate: 0.7s of near-silence (limit 0.5); harsh: 3.3% above 6 kHz (ceiling 2.5).

## Prompt

> Late-night game-show funk rock, 138 bpm, E minor, driving and cheeky. A tight five-piece studio band: clipped funk guitar on the offbeat, a brass section of trumpet and two saxes firing quiz-show stingers between lines, a busy electric piano comping, tight lean bass well under the mids, crisp four-on-the-floor drums with tom fills. A smooth, grinning baritone male host on lead, a gang chorus answering the hook. Arc: brass fanfare intro, verses at mid energy, a long high chorus plateau, a dip to bass and claps for the whispered bridge, a lifted final chorus with the brass on top, a stinger ending. Still E minor, warm, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: brass fanfare and a drum roll, the host counts the band in]
Good evening, plastic people
Welcome to the show

[Verse 1]
Three roads come down the staircase
From the seam along the back
The high road, the middle, the low road
And not one of them climbs back
Grey dudes tumble from the gap
Like a studio crowd let in
Nobody painted, nobody primed
Everybody wants to win

[Pre-Chorus]
The pot is glowing on the screen
The hearts are in the corner
Twenty lives and ten long rounds
And the remote is getting warmer

[Chorus]
Who wants to be a painter?
Ten, the remote is flashing
Who wants to be a painter?
Final answer, hold the line

[Verse 2]
The ballista on the ledge
Says the answer's always B
For bolt, the cannon swears it's C
For crowd, and fires three
The grey ones never phone a friend
They never ask the room
They walk the welted edge in line
And slide down into gloom

[Pre-Chorus]
The pot is glowing on the screen
The hearts are in the corner
Twenty lives and ten long rounds
And the remote is getting warmer

[Chorus]
Who wants to be a painter?
Ten, the remote is flashing
Who wants to be a painter?
Final answer, hold the line

[Bridge: the band drops to bass and claps, the host whispers close]
Is that your final answer?
Is that your final coat?
Grey is not a colour, friend
It's a promise no one wrote

[Final Chorus: lifted, the gang chorus and the full brass on top]
Who wants to be a painter?
Ten, the remote is flashing
Who wants to be a painter?
Final answer, hold the line
Who wants to be a painter?
Final answer, hold the line

[Outro: one brass stinger]
That is correct
Next question in ten
```

## Request filter

stripped: nothing

## Rejected seeds

- 4030100: 25 of 235 heard words are not ours (11 %; limit 10 %, at least 40 heard): host cops band rows row gray thought going overline least both cannons

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 138 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -15.4, gain -0.6 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.73 dBFS decoded (pre-encode -3.29) | under -1 dBFS | yes |
| silence | longest 0.65 s under -50 dBFS | under 0.5 s (mellow) | **NO** |
| brightness | 3.27 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 7.73 % below 60 Hz (raw render 23.2 %) | under 12 % | yes |
| onset rate | 3.96 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.04x, tail-head -55.2 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: The host counts the bandier. | Three roads come down the staircase from the seam along the back. The high road | The middle of the low road and not one of them climbs back. Gray dudes tumble from the gap like a studio crowd let in. Nobody painted, nobody primed, everybody wants to win. The pot is glowing on the screen, the hearts are in the corner, 20 lives in 10 long rounds and | The remote is getting warmer. Who wants to be a painter? Tender mode is flashing. Who wants to be a painter? Final answer. | The ballista on the ledge says the answer's always B For both the cannon swears at sea for crowd and fires three The grey ones never phone a friend, they never ask the room | They walk the welted engine line and slide down into gloom. The pot is glowing on the screen, the hearts are in the corner. Twenty lives and ten long rounds and the remote is getting full. Who wants to be a patron? | Timber and mold is flashing Who wants to be a painter Final answer, hold the line | Thank you. | Is that your final answer? Is that your final coat? Clay is not a color friend, it's a promise. No one wrong! Who wants to be a painter? General Moon! | Who wants to be a painter? Final answer, hold the line. Who wants to be a painter? | Final answer, hold the line. That is correct. Next question in ten. | Thank you.

249 words heard, 23 not in our lyrics: host counts bandier gray tender mode both at sea engine full patron timber mold thank you clay color wrong general moon thank you (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.7s of near-silence (limit 0.5); harsh: 3.3% above 6 kHz (ceiling 2.5)
