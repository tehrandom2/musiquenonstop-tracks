# Practice Amp Hum (wave)

- **slug:** greytide-garage-wave-1
- **idea:** slacker garage-band groove with fuzzy bass, wobbly organ and tremolo guitar
- **mood:** the wave phase
- **bpm:** 87 (asked) / 87 (measured now, folded into 70-140)
- **key:** E minor (as the source recorded it)
- **seed:** 802115
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 90.5 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "slacker garage-band groove with fuzzy bass, wobbly organ and tremolo guitar" (the wave phase): 87 bpm in E minor. The prompt describes laid back slacker garage-band groove with cardboard-box kick, tambourine and cowbell as a drum kit and wobbly cheap organ and tremolo guitar through a small amp used as instruments; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back slacker garage-band groove, cardboard-box kick, tambourine and cowbell as a drum kit, wobbly cheap organ and tremolo guitar through a small amp used as instruments, fuzzy round bass, dusty drum machine played behind the beat, charmingly not very good, friendly, no shredding, good-humoured, 87 bpm, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Practice Amp Hum

## Rejected seeds

- 801115: not kept
- 701115: superseded by the #443 render

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.40 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.05 s under -50 dBFS | under 0.5 s | yes |
| brightness | 0.56 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 21.31 % below 60 Hz | under 12 % | **NO** |
| onset rate | 2.90 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.27x, tail-head -17.3 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: boominess, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
