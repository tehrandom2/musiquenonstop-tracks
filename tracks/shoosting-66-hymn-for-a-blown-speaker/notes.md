# Hymn for a Blown Speaker

- **slug:** shoosting-66-hymn-for-a-blown-speaker
- **idea:** Distorted ambient hymn
- **bpm:** 68 (asked) / 134 (measured now, folded into 70-140)
- **key:** G# major (estimated now: the source did not record one)
- **seed:** 400066
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 180.0 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Distorted ambient hymn": 68 bpm in G# major, one of the tracks the machine chose for itself, on the best tier. The prompt describes distorted ambient hymn; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Distorted ambient hymn, a slow two-part harmony of a man and a woman singing long wordless vowels like a church duet, buried inside a wall of clipped, overdriven, bit-crushed static. The whole mix is brutally sidechained so the noise gulps and ducks on every slow pulse of a huge sub-bass thud, as if the recording is being fed through a blown speaker and a failing compressor. No drum kit, only the pulse. Digital dropouts, tape saturation, a beautiful melody underneath an ugly texture, patient, devastating, tender, enormous.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Blown Speaker

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 134 bpm vs asked 68 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.75 dBFS decoded | under -1 dBFS | yes |
| silence | longest 1.95 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 1.17 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 42.97 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.55 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.80x, tail-head -34.9 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: silence, boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
