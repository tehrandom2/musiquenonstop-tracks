# PIRATE 94.3 FM (second take)

- **slug:** greytide-bootleg-jungle-b
- **idea:** mid-nineties UK jungle with a ragga toast (original words)
- **mood:** the title tune
- **bpm:** 162 (asked) / 80 (measured now, folded into 70-140)
- **key:** F minor (as the source recorded it)
- **seed:** 576007
- **model:** ACE-Step 1.5 (acestep-v15-turbo, LM acestep-5Hz-lm-1.7B)
- **tier:** fast   **duration:** 96.2 s as shipped
- **date:** 2026-10-06 (the original render date)
- **rendered_at:** 2026-10-06T12:00:00-04:00 (that date at 12:00 local: no time of day was recorded)
- **project:** greytide
- **backfill:** true (imported from an earlier soundtrack; it is never new)
- **licence:** generated locally from a text prompt, no samples or reference audio, no third-party rights claimed

## Why

I did not render this one for the station: it was made on 2026-10-06 for an earlier tabletop game soundtrack, and I have brought it in under that date, so it is not new. The ask was "mid-nineties UK jungle with a ragga toast (original words)" (the title tune): 162 bpm in F minor, with a voice singing words written for it. The prompt describes pirate-radio jungle with chopped and time-stretched funk breakbeats with rolling snare fills, a huge sine sub-bass on a half-time reggae pattern and dancehall horn stabs and a skanking offbeat organ; I have not heard it, and the numbers below were measured now, on the file as it shipped.

## Prompt

> Pirate-radio jungle, 162 bpm, chopped and time-stretched funk breakbeats with rolling snare fills, a huge sine sub-bass on a half-time reggae pattern, dancehall horn stabs and a skanking offbeat organ, dub siren and a spin-back rewind at the drop, tape hiss and heavy radio compression, a male ragga-style toast riding the beat: fast, rhythmic and half-sung, with echo throws on the line ends, an intro of horns and skank over a half-time beat, then the full breakbeat drop, loopable

## Lyrics (original, written for this track by the project; the model was given only these words)

1 name(s) of invented characters from the earlier game are shown as [name]; the model was given them.

```
[Intro - dancehall horn stabs and a skanking offbeat organ over a half-time beat, instrumental]

[Verse - fast ragga toast over the beat]
Grey plastic coming down the road tonight
Unpainted army and they looking for a fight
Me got a ballista and a cannon on the right
[name] hold them till the morning light

[Rewind - dub siren and a spin-back, then the full breakbeat drop]
Selector! Rewind the sprue
Painted mini massive, we a-come for you
Spray can, wash and the gloss coat too
Every grey dude get a brand new hue

[Chorus - chanted, echo on the line ends]
Hold the line, hold the line, from the kitchen to the sill
Hold the line, hold the line, tiny soldiers never still
```

## Request filter

run on import over the title, idea, prompt and every lyric line; the text above is as the source wrote it
would strip: nothing; lyrics: 1 name(s) elided, shown as [name]

## Rejected seeds

- 576001: thrown away at the time (no reason recorded)
- 576002: thrown away at the time (no reason recorded)
- 576003: thrown away at the time (no reason recorded)
- 576005: thrown away at the time (no reason recorded)
- 576006: thrown away at the time (no reason recorded)
- 576008: thrown away at the time (no reason recorded)

## Measured now, on the shipped file (gate profile mellow: the station's default, not what this track was made against)

| gate | measured | limit | passed |
|---|---|---|---|
| tempo | 80 bpm vs asked 162 | within 4 bpm, folds 0.5 / 2 / 4:3 / 3:4 allowed | yes |
| loudness | -16.9 LUFS as shipped | -16 LUFS within 1 dB | yes |
| peak | -2.43 dBFS decoded | under -1 dBFS | yes |
| silence | longest 0.55 s under -50 dBFS | under 0.5 s | **NO** |
| brightness | 2.76 % of power above 6 kHz | under 2.5 % (mellow) | **NO** |
| boominess | 7.13 % below 60 Hz | under 12 % | yes |
| onset rate | 3.77 per second | 0.3 to 4.5 | yes |
| loop seam | step 0.56x, tail-head +8.7 dB | step under 4.0x, level within 5.0 dB | **NO** |

## Checks

not passed against the station's profile: silence, brightness, loop seam. Reported, not a reason to leave it out: this track shipped before the station existed.

## Backfill

- audio: stream-copied (already 128 kbps CBR), tags stripped
- recipe: `reproducible: false`. The seed and the prompt are recorded; the planner model's audio codes were never kept, so a re-render from them may differ. `recipe_render.py` refuses it.
