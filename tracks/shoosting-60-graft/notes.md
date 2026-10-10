# Graft

- **slug:** shoosting-60-graft
- **idea:** Dark melodic techno
- **bpm:** 122 (asked) / 121 (measured now, folded into 70-140)
- **key:** F major (estimated now: the source did not record one)
- **seed:** 100060
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 174.5 s as shipped
- **date:** 2026-09-30 (the original render date)
- **rendered_at:** 2026-09-30T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-09-30 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Dark melodic techno": 122 bpm in F major. The prompt describes dark melodic techno with driving four-on-the-floor kick, urgent minor-key analog arpeggio that builds layer by layer and distorted bass pulsing underneath; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Dark melodic techno, 122 bpm, driving four-on-the-floor kick, urgent minor-key analog arpeggio that builds layer by layer, distorted bass pulsing underneath, sharp snare cracks, cold cinematic string pads rising behind it, tense and propulsive, a full drop-out to the arpeggio alone before everything returns, instrumental, no vocals

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 121 bpm vs asked 122 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -14.8 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.53 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 3.52 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 30.21 % below 60 Hz | under 12 % | **NO** |
| onset rate | 6.21 per second | 0.3 to 4.5 | **NO** |
| loop seam | step 0.01x, tail-head -48.8 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, brightness, boominess, onset rate, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
