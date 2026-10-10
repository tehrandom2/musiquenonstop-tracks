# Choir in the Compressor

- **slug:** shoosting-72-choir-in-the-compressor
- **idea:** Destroyed gospel
- **bpm:** 100 (asked) / 98 (measured now, folded into 70-140)
- **key:** F minor (estimated now: the source did not record one)
- **seed:** 400072
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 179.0 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Destroyed gospel": 100 bpm in F minor, one of the tracks the machine chose for itself, on the best tier. The prompt describes destroyed gospel; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Destroyed gospel, with no drums at all. An electric guitar chord is gated, clipped and chopped into huge stuttering blocks of white-hot distortion that slam on and off in rhythm, with total silence between them. Over that, two clear unprocessed voices, a man and a woman, sing a simple slow hymn in close harmony, untouched by the noise. The contrast is the point: pristine voices, annihilated instrument. Stark, bright, ecstatic, overwhelming.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 98 bpm vs asked 100 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -19.8 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -3.28 dBFS decoded | under -1 dBFS | yes |
| silence | longest 1.65 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 0.61 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 0.01 % below 60 Hz | under 12 % | yes |
| onset rate | 4.37 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.02x, tail-head -16.8 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, silence, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
