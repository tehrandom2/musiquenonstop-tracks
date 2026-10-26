# No Ticket

- **slug:** greytide-railway-no-ticket
- **idea:** Wave five: the conductor tower checks tickets, holds every dude for a moment and sends the ticketless back down the platform
- **mood:** jovial, officious, swinging
- **bpm:** 156 (asked) / 75 (measured, folded into 70-140)
- **key:** G minor (asked) / G minor (estimated)
- **seed:** 4060501
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 165 s rendered, 160.7 s installed (one-shot, nothing baked)
- **date:** 2026-10-26
- **render time:** 24.0 s per seed, model load 24.6 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: greytide
- **album:** Greytide, track 5
- **submitter:** the radio, for greytide
- **tags:** table:railway, pov:the-conductor
- **loop:** no, a one-shot
- **length:** 7086939 samples at 44.1 kHz (160.70 s), about 104.5 bars of 4/4 at 156 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "Wave five: the conductor tower checks tickets, holds every dude for a moment and sends the ticketless back down the platform". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 156 bpm in G minor, 165 seconds, with a voice, in words I wrote myself, under the mellow gates. It has no beat to hold, so 156 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 2 seeds and threw away 1: 4060500 (12.4s of near-silence (limit 0.5) and others). Seed 4060501 is the take, but it did not clear every gate: harsh: 2.7% above 6 kHz (ceiling 2.5).

## Prompt

> Jump-blues swing, 156 bpm, in G minor, a small hot big band: a brushed swing kit with a shuffle on the ride and rimshots on the backbeat, a tight lean walking upright bass under the mids, a boogie piano, a trumpet and two saxes punching riffs in strict call and response, a whistle blown on the turnarounds, a booming jovial baritone male lead singing as the conductor, officious and twinkling, the band shouting the hook back, the key G minor held; arc: whistle and horn intro, punchy verses, a shout chorus, a stop-time bridge with the punch clicking, a lifted final chorus with the horns screaming, no harsh highs

## Lyrics (original, written for this track by the project; the model was given only these words)

```
[Intro: a whistle blast, the horns kick in]
Tickets, please!

[Verse 1]
Navy coat and buttons made of brass
A peaked cap badge on the wrong way past
A watch chain swinging round a well-fed vest
I'm the man on the platform, I check the rest

[Verse 2]
A grunt walks up with his empty hands
No ticket, no stub, no travel plans
I click my punch and I hold him there
And four in ten get sent back to the stair

[Pre-Chorus]
Click, click, the stub goes flying
No use running and no use crying

[Chorus]
No ticket, no ride, back down the platform
No ticket, no ride, it's in the rule form
Ten centimetres and start again
No ticket, no ride, on this here train

[Verse 3]
I'll leave you alone for a full eight seconds
That's fair, that's kind, that's how a man reckons
But come round twice with that grey old face
And I'll punch the air in the very same place

[Chorus]
No ticket, no ride, back down the platform
No ticket, no ride, it's in the rule form
Ten centimetres and start again
No ticket, no ride, on this here train

[Bridge: stop-time, the punch clicks]
The boss came up, as big as a shed
I held him half a second, that's all I said
I'm small, I'm round, I'm painted with pride
And I've never once let a dodger ride

[Final Chorus: lifted, horns screaming]
No ticket, no ride, back down the platform
No ticket, no ride, it's in the rule form
Ten centimetres and start again
No ticket, no ride, on this here train

[Outro: one last whistle]
All aboard who's paid!
```

## Request filter

stripped: nothing

## Rejected seeds

- 4060500: 12.4s of near-silence (limit 0.5); 24 of 218 heard words are not ours (11 %; limit 10 %, at least 40 heard): baby chains around jeans trouble playing gets stand stuff roof centimeters one

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 75 bpm vs asked 156 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -13.8, gain -2.2 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -3.71 dBFS decoded (pre-encode -3.67) | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 2.74 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 4.15 % below 60 Hz (raw render 13.4 %) | under 12 % | yes |
| onset rate | 3.17 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.00x, tail-head -52.5 dB | not applied: a one-shot, not a loop | yes |

## Words (Demucs voice stem, Whisper large-v3-turbo)

heard: Tickets, please. Navy coating button made of brass, a peak capacity. | on the wrong way past. A watch chain swinging round the welfare vest. I'm the man on the platform. I've checked the rest. A | The Grunt walks up with his empty hands. No ticket, no stop, no travel plans. I click my punch and I hold him there. And four in ten get sent back to the stair. Click, click, the stop goes down. | No taking no rights. Back down the platform. No taking no rights. | No ticket, no ride on this here train, on this train. | I'll leave you alone for a full eight seconds. That's fair, that's kind, that's how a man reckons. But come round twice with that gray old face and I'll punch the air in the very same place. | No chicken, no ride. Back down the platform. No chicken, no ride. It's in the roof. | No ticket, no ride on this here train. On this train. The boss came up as big as a shed. I held him half a second, that's all I | I said, I'm small, I'm round, I'm painted with pride, and I've never once let a daughter ride. No chicken, no ride back down the platform. | No ticket, no ride, it's in the roof. No ticket, no ride on this here train, on this train. | Train All aboard who's paid

230 words heard, 19 not in our lyrics: coating button peak capacity welfare checked stop stop taking rights taking rights gray chicken chicken roof daughter chicken roof (limit 10 % of the words heard, at least 40 heard)

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: harsh: 2.7% above 6 kHz (ceiling 2.5)
