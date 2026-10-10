# Shrinkwrap Funk (build phase)

- **slug:** greytide-gamestore-build-2
- **idea:** plastic-toy keyboard funk
- **mood:** the build phase
- **bpm:** 80 (asked) / 78 (measured now, folded into 70-140)
- **key:** G major (as the source recorded it)
- **seed:** 800420
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 91.6 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "plastic-toy keyboard funk" (the build phase): 80 bpm in G major. The prompt describes laid back plastic-toy keyboard funk with cheap toy keyboards and music-box plucks, shrinkwrap crackle and jewel-case clacks as a drum kit and sparse kazoo-like lead used as an instrument; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back plastic-toy keyboard funk, cheap toy keyboards and music-box plucks, shrinkwrap crackle and jewel-case clacks as a drum kit, sparse kazoo-like lead used as an instrument, fuzzy round bass, dusty lo-fi drum machine, closing-time game store daydream, sunny childlike melody going a little sour, good-humoured, 80 bpm, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Shrinkwrap Funk

## Rejected seeds

- 801420: not kept
- 650002: harsh: 3.6% above 6 kHz; superseded by the #443 render
- 651002: harsh: 2.5% above 6 kHz; superseded by the #443 render
- 652002: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 78 bpm vs asked 80 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.32 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.35 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.89 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 14.61 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.69 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.07x, tail-head +3.6 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

not passed against the station's profile: boominess. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
