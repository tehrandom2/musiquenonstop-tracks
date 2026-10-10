# Tile Echo Dub (build phase)

- **slug:** greytide-bathroom-build-1
- **idea:** echoey tiled-room dub with dripping percussion and melodica
- **mood:** the build phase
- **bpm:** 78 (asked) / 78 (measured now, folded into 70-140)
- **key:** A minor (as the source recorded it)
- **seed:** 801310
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 94.1 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "echoey tiled-room dub with dripping percussion and melodica" (the build phase): 78 bpm in A minor. The prompt describes laid back echoey tiled-room dub with dripping-tap clicks, tapped bottles and rubber-duck squeaks as a drum kit and spring reverb and tape echo; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back echoey tiled-room dub, dripping-tap clicks, tapped bottles and rubber-duck squeaks as a drum kit, spring reverb and tape echo, plinky melodica used as an instrument, fuzzy round bass, dusty rimshot drum machine, steamy bathroom daydream, good-humoured, 78 bpm, rubber-duck squeaky toy melody and plunking keys, calm and spacious, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Tile Echo Dub

## Rejected seeds

- 800310: not kept
- 700310: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 78 bpm vs asked 78 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.03 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.20 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.99 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 7.44 % below 60 Hz | under 12 % | yes |
| onset rate | 2.48 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.24x, tail-head -0.5 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
