# Dusty Music Box Organ (wave)

- **slug:** greytide-attic-wave-1
- **idea:** dusty music box and warbling old-tape organ
- **mood:** the wave phase
- **bpm:** 81 (asked) / 80 (measured now, folded into 70-140)
- **key:** D minor (as the source recorded it)
- **seed:** 700715
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 93.9 s as shipped
- **date:** 2026-10-05 (the original render date)
- **rendered_at:** 2026-10-05T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-05 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "dusty music box and warbling old-tape organ" (the wave phase): 81 bpm in D minor. The prompt describes laid back dusty attic groove with warbling old-tape organ, slightly out-of-tune music box and harmonium; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back dusty attic groove, warbling old-tape organ, slightly out-of-tune music box, harmonium, creaky soft drum machine, warm fuzzy bass, cobweb-soft and nostalgic, never creepy, good-humoured, 81 bpm, wobbly toy piano and a slow shaker, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Dusty Music Box Organ

## Rejected seeds

- none recorded by the source

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 81 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.61 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.25 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.34 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 10.46 % below 60 Hz | under 12 % | yes |
| onset rate | 1.78 per second | 0.3 to 4.5 | yes |
| loop seam | step 1.48x, tail-head -1.3 dB | step under 4.0x, level within 5.0 dB | yes |

## Checks

all automatic checks passed. These are numbers, not hearing: nobody on the machine can hear, the owner listens.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
