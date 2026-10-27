# Signal and Tambourine

- **slug:** assembly-signal-and-tambourine
- **idea:** a looping radio-signal arpeggio and a tambourine that keeps perfect time beside it
- **mood:** bright, driving, steady
- **bpm:** 132 (asked) / 132 (measured, folded into 70-140)
- **key:** A minor (asked) / A minor (estimated)
- **seed:** 5100704
- **model:** ACE-Step 1.5, acestep-v15-turbo, 8 steps, guidance 7.0, shift 3.0, LM acestep-5Hz-lm-1.7B
- **tier:** fast   **gate profile:** jungle   **duration:** 240 s rendered, 235.3 s installed (one-shot, nothing baked)
- **date:** 2026-10-27
- **render time:** 33.8 s per seed, model load 27.2 s
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed
- project: assembly-sessions
- **album:** Transmissions on a Ghostline, track 7
- **submitter:** the owner's ask
- **loop:** no, a one-shot
- **length:** 10378323 samples at 44.1 kHz (235.34 s), about 129.4 bars of 4/4 at 132 bpm (the MP3 adds encoder padding; the length is of the PCM)

## Why

You asked for "a looping radio-signal arpeggio and a tambourine that keeps perfect time beside it". The words and the style were written for this song by the station's writers and reviewed by the conductor. So I wrote it at 132 bpm in A minor, 240 seconds, with no voice, under the jungle gates. It has no beat to hold, so 132 bpm is only the grid I gave the model and the tempo gate is not applied. It is a one-shot: nothing is baked and the ending is the model's own. I rendered 3 seeds and threw away 2: 5100705 (boomy: 10.8% below 60 Hz (ceiling 8)); 5100706 (boomy: 15.2% below 60 Hz (ceiling 8)). Seed 5100704 is the take, but it did not clear every gate: 0.9s of near-silence (limit 0.5).

## Prompt

> instrumental glitch folk electronica for focus, no vocals, a looping blip-synth arpeggio like a distant signal, tambourine and shaker in steady sixteenths, tight dry drum machine with a small kick, chiming twelve-string guitar, warm organ pad in the mid range, light bass, no sub bass, steady driving energy built in layers, a long high plateau, one dip and a final lift, aeolian minor

No lyrics: instrumental.

## Request filter

stripped: nothing

## Rejected seeds

- 5100705: boomy: 10.8% below 60 Hz (ceiling 8)
- 5100706: boomy: 15.2% below 60 Hz (ceiling 8)

## Measured (the kept take, after the 60 Hz high-pass, before the loudness gain unless noted)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 132 bpm vs asked 132 | not applied: no beat was asked for | yes |
| loudness | -16.5 LUFS installed (decoded MP3 -16.9); candidate was -16.2, gain -0.3 dB | -16 LUFS within 1 dB | yes |
| peak after encode | -2.52 dBFS decoded (pre-encode -3.25) | under -1 dBFS | yes |
| silence | longest 0.85 s under -50 dBFS | under 0.5 s (jungle) | **NO** |
| brightness | 3.04 % of power above 6 kHz | under 3.5 % (jungle) | yes |
| boominess | 5.55 % below 60 Hz (raw render 13.3 %) | under 8 % | yes |
| onset rate | 4.42 per second | 1.5 to 6.5 | yes |
| loop seam | step 0.12x, tail-head -71.3 dB | not applied: a one-shot, not a loop | yes |

## Heard by a model, not a person

Not listened to: listening is off, or there is no GEMINI_API_KEY in the environment. Nobody on the machine can hear.

## Checks

kept despite failing: 0.9s of near-silence (limit 0.5)
