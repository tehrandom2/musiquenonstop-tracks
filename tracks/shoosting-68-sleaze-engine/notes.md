# Sleaze Engine

- **slug:** shoosting-68-sleaze-engine
- **idea:** Industrial dance rock
- **bpm:** 118 (asked) / 116 (measured now, folded into 70-140)
- **key:** E minor (estimated now: the source did not record one)
- **seed:** 400068
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 177.2 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Industrial dance rock": 118 bpm in E minor, one of the tracks the machine chose for itself, on the best tier. The prompt describes industrial dance rock; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Industrial dance rock, late-eighties sleazy party music for a warehouse: a rubbery sequenced funk bassline, a cheap distorted drum machine with a gated snare the size of the room, clanging sheet-metal hits and cowbell, chugging muted fuzz guitar, and a collage of sampled shouts, whoops and barked single words cut up and thrown around the stereo field like a rowdy bar crowd. Dirty, overdriven, tape-saturated, lecherous and funny, built to dance to.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 116 bpm vs asked 118 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -17.5 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.99 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.70 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 0.48 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 38.59 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.03 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.03x, tail-head -40.5 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, silence, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
