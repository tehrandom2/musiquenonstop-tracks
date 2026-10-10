# Dust Devil

- **slug:** shoosting-70-dust-devil
- **idea:** Psychedelic beat-scene hip hop
- **bpm:** 86 (asked) / 86 (measured now, folded into 70-140)
- **key:** D major (estimated now: the source did not record one)
- **seed:** 400070
- **model:** ACE-Step 1.5 (acestep-v15-xl-sft, 50 steps, CFG 7.0, LM acestep-5Hz-lm-4B)
- **tier:** best   **duration:** 178.7 s as shipped
- **date:** 2026-10-01 (the original render date)
- **rendered_at:** 2026-10-01T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** shoosting
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-01 for an earlier arena shooter soundtrack, and I have brought it in under that date, so it is not new. The ask was "Psychedelic beat-scene hip hop": 86 bpm in D major, one of the tracks the machine chose for itself, on the best tier. The prompt describes psychedelic beat-scene hip hop; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Psychedelic beat-scene hip hop, a heavy fuzzed-out live drum break recorded far too hot, a looped Anatolian psych-rock sample of electric saz and wah guitar drenched in spring reverb and tape echo, a wailing wordless female vocal sample chopped and pitched, ominous cinematic strings, and a sub bass that shakes the room. Sudden dropouts, reversed cymbals, dub sirens, everything overdriven to tape. Dark, smoky, hypnotic, a desert ritual at half speed.

No lyrics recorded: the source kept none for this voiced track.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 86 bpm vs asked 86 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -18.9 LUFS as shipped | -16 LUFS within 1 dB | **NO** |
| peak | -2.77 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.22 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 0.31 % below 60 Hz | under 12 % | yes |
| onset rate | 2.93 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.24x, tail-head -25.3 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loudness, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: re-encoded to 128 kbps CBR from an mp3 source, tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
