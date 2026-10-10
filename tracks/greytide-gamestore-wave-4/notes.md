# Demo Disc Daydream (wave)

- **slug:** greytide-gamestore-wave-4
- **idea:** plastic-toy keyboard funk
- **mood:** the wave phase
- **bpm:** 87 (asked) / 87 (measured now, folded into 70-140)
- **key:** D major (as the source recorded it)
- **seed:** 802445
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 94.6 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "plastic-toy keyboard funk" (the wave phase): 87 bpm in D major. The prompt describes laid back plastic-toy keyboard funk with cheap toy keyboards and music-box plucks, shrinkwrap crackle and jewel-case clacks as a drum kit and sparse kazoo-like lead used as an instrument; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Laid back plastic-toy keyboard funk, cheap toy keyboards and music-box plucks, shrinkwrap crackle and jewel-case clacks as a drum kit, sparse kazoo-like lead used as an instrument, fuzzy round bass, dusty lo-fi drum machine, closing-time game store daydream, sunny childlike melody going a little sour, good-humoured, 87 bpm, chiptune-flavoured toy synth bleeps and a wobbly organ, the same groove with a little more drive and bounce, steady loopable arrangement, instrumental, no vocals, no singing, no speech, no drops, no wobble bass, no build-ups, no aggressive drums, no sub bass, light thin low end, bass in the mid range only

No lyrics recorded: instrumental.

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: Demo Disc Daydream

## Rejected seeds

- 803445: harsh: 2.8% above 6 kHz
- 700445: harsh: 2.6% above 6 kHz; superseded by the #443 render
- 701445: harsh: 2.9% above 6 kHz; superseded by the #443 render
- 702445: crest 18.0 dB, too peaky to match the loudness; superseded by the #443 render
- 800445: harsh: 4.0% above 6 kHz
- 801445: harsh: 3.4% above 6 kHz

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 87 bpm vs asked 87 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.4 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -1.87 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.15 s under -50 dBFS | under 0.5 s | yes |
| brightness | 1.67 % of power above 6 kHz | under 2.5 % (mellow) | yes |
| boominess | 4.38 % below 60 Hz | under 12 % | yes |
| onset rate | 3.46 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.76x, tail-head -20.7 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
