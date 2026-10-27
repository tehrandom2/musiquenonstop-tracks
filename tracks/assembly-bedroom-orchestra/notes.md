# Bedroom Orchestra

- **slug:** assembly-bedroom-orchestra
- **idea:** a whole orchestra squeezed into a bedroom, each instrument with one small job, looping
- **mood:** warm, focused, gently glowing
- **bpm:** 120 (asked) / 120 (measured, folded into 70-140)
- **key:** D minor (asked) / D minor (estimated)
- **seed:** 5100601
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** mellow   **duration:** 240 s rendered, 235.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 33.5 s per seed, model load 41.1 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** The Throne of the Third Heaven of the Nations' Millennium General Assembly, track 6
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 10376696 samples at 44.1 kHz (235.30 s), about 117.6 bars of 4/4 at 120 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a whole orchestra squeezed into a bedroom, each instrument with one small job, looping". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 120 bpm in D minor, 240 seconds, with no voice, under the mellow gates. It has no beat to hold, so 120 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100603 (passed, but outranked by the kept takes); 5100602 (passed, but outranked by the kept takes). Seed 5100601 is the take.

## Prompt

> instrumental lo-fi bedroom orchestra for focus, no vocals, toy piano and glockenspiel loop, pizzicato violin ostinato, harmonium drone, brushed snare and soft kick, muted trumpet holding long notes, little 8-bit synth line, tape warmth, one idea built in layers with steady energy, long plateau and a final lift, lean bass, dorian minor

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 5100603: passed, but outranked by the kept takes
- 5100602: passed, but outranked by the kept takes

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 120 bpm vs asked 120 | not applied: no beat was asked for | yes |
| loudness | -16.0 LUFS installed (decoded MP3 -16.4); candidate was -16.3, gain +0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.77 dBFS decoded (pre-encode -3.34) | under -1 dBFS | yes |
| silence | longest 0.10 s under -50 dBFS | under 0.5 s (mellow) | yes |
| brightness | 0.48 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 5.45 % below 60 Hz (raw render 12.9 %) | under 12 % | yes |
| onset rate | 2.22 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -53.6 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.
