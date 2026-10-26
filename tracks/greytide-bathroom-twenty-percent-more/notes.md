# Twenty Percent More

- **slug:** greytide-bathroom-twenty-percent-more
- **idea:** Wave seven: the bubble bath bottle tips and glugs and a wall of foam heaps up across the last stretch of road for two waves, hiding the grey from the towers and the towers from the grey; the bottle is very proud of its label.
- **mood:** glamorous, giddy, a diva's moment
- **bpm:** 128 (asked) / 127 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 3940700
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 162 s rendered, 156.6 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 23.6 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 7
- **submitter:** the radio, for greytide
- **tags:** table:bathroom, pov:the bubble bath bottle
- **loop:** no, a one-shot
- **length:** 6906559 samples at 44.1 kHz (156.61 s), about 83.5 bars of 4/4 at 128 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave seven: the bubble bath bottle tips and glugs and a wall of foam heaps up across the last stretch of road for two waves, hiding the grey from the towers and the towers from the grey; the bottle is very proud of its label.". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 128 bpm in D minor, 162 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 128 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 3940701 (15 of 89 heard words are not ours (17 %; limit 10 %, at least 40 heard): clock grace fall ). Seed 3940700 is the take.

## Prompt

> Nu-disco, 128 bpm, D minor. The band: a four-on-the-floor kick with open hats on the offbeat, an octave-jumping bass, tight and lean, under the mids; a funky rhythm guitar; lush string stabs and swells; a sparkling electric piano. A glamorous female diva lead with a backing trio echoing the hook. Mood: giddy and glamorous, a diva's moment. Arc: kick, bass and strings, the full band at verse one, a big chorus, a bridge with drums out to strings and voice, the final chorus lifted with the trio and strings soaring. D minor throughout, no harsh highs.

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: kick, octave bass and string stabs]

[Verse 1]
I tip, I glug, I let it go
a pink cascade, a rising snow
the label promised, now it's due
twenty percent more bubbles for you
a wall goes up across the road
the last long stretch, a frothing load
they can't see through, they can't see past
the grey slow down, the foam holds fast

[Pre-Chorus]
Read the label, darling, read it twice

[Chorus]
Now with twenty percent more
more than you were ready for
now with twenty percent more
bubbles, bubbles, that's what I'm for

[Verse 2]
The shower's coming, wave nine
it'll flatten all my lovely line
but for two waves I'm the queen of the tub
a towering froth that the grey can't scrub
the loofah tries, the duck gets lost
I don't count, darling, I don't count the cost
even the towers can't see past my crest
so I hold them slow and I let them guess

[Pre-Chorus]
Read the label, darling, read it twice

[Chorus]
Now with twenty percent more
more than you were ready for
now with twenty percent more
bubbles, bubbles, that's what I'm for

[Bridge: drums out, strings and voice]
Pop, pop, pop
every bubble's a little stop
pop, pop, pop
and I never, never stop

[Final Chorus: lifted, trio and soaring strings]
Now with twenty percent more
more than you were ready for
now with twenty percent more
bubbles, bubbles, that's what I'm for

[Outro: strings and kick]
Twenty percent more.
```

## Request filter

stripped: nothing

## Rejected seeds

- 3940701: 15 of 89 heard words are not ours (17 %; limit 10 %, at least 40 heard): clock grace fall are worried wait at night light tongue tell i'll

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 127 bpm vs asked 128 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -14.6, gain -1.4 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.46 dBFS decoded (pre-encode -3.57) | under -1 dBFS | yes |
| silence | longest 0.40 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.14 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.11 % below 60 Hz (raw render 18.7 %) | under 12 % | yes |
| onset rate | 3.04 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -62.9 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: I took, I gluck, I let it go | Cascade, a rising snow, the label promise now it's due, 20% more bubbles for you, a wall goes up across the road, the | The last long stretch of frothing load. They can't see through, they can't see past. The grave slowed down, the foam holds fast. Read the label, darling, read it twice. | Now it's 20% more, more than you were ready for. Now it's 20% more. | Bubbles, bubbles, that's what I'm for. The shower's coming, wait night, it'll flatten all my lovely line. Run for two waves, I'm the queen of the tunnel. | so i | Now we're 20% more, more than you. | you were ready for now it's 20 percent more bubbles bubbles that's what i'm for | Now it's | 20% more, more than you were ready for, now it's 20% more. Bubbles, bubbles, that's what I'm for. | 20% more

140 words heard, 10 not in our lyrics: took gluck promise grave slowed wait night run tunnel we're (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
