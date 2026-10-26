"""Re-render one musiquenonstop take from its recipe.json with ACE-Step 1.5. Standalone: one file, no imports from this repo.

  python recipe_render.py recipe.json --ace-dir <your ACE-Step 1.5 checkout> [--out take.wav] [--mp3 take.mp3]

Dependencies: the ACE-Step package (from --ace-dir) with its CUDA torch, plus numpy, scipy and soundfile (all in an ACE-Step
environment). ffmpeg only if you ask for --mp3. The checkout must hold checkpoints/<dit_config> and checkpoints/<lm> named in
the recipe. A recipe with audio codes re-renders bit for bit on the same GPU, driver and ACE checkout (docs/determinism.md):
cuDNN runs its deterministic algorithms, the VAE decodes in fixed tiles, and torch's global generator is seeded before each call.
Takes published before that was in place, or rendered on another card or driver stack, come back close but not identical,
so compare duration and peak rather than bytes.

The post-processing is the recipe's `post` block, applied in this order: resample to 44.1 kHz, trim the silent tail, bake the
loop (equal-power crossfade of the last N seconds onto the first N, then removed), 4th-order 60 Hz high-pass with a soft knee,
one gain in dB, soft limiter. Nothing here plays audio.

A section edit (a recipe with `edits`) renders the base take from the recipe's own fields first, then applies each edit in order
on the music model named in it (no LM): a `repaint` regenerates [start, end] seconds with its own caption and seed and keeps the
rest of the take. The `post` block then runs once, on the edited take.
"""
from __future__ import annotations

import argparse
import json
import math
import os
import subprocess
import sys
import time
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy import signal
from scipy.signal import resample_poly

VAE_DECODE_CHUNK = 128      # latent frames per VAE decode tile; ACE otherwise picks 128 to 512 from the VRAM free at that moment


def deterministic() -> None:
    """Make ACE repeat itself on one card (issue #176). Its diffusion is already repeatable; its VAE decode was not: cuDNN's
    default convolution algorithms differ run to run (-40 dB between decodes of the same latents), and the decode tiles were
    sized from free VRAM. Each edit's VAE encode of its source samples from torch's global generator, seeded in render_edit."""
    os.environ["ACESTEP_VAE_DECODE_CHUNK_SIZE"] = str(VAE_DECODE_CHUNK)
    import torch
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False


def init_handlers(ace_dir: Path, model: dict, need_lm: bool = True):
    deterministic()
    sys.path.insert(0, str(ace_dir))
    from acestep.handler import AceStepHandler
    from acestep.llm_inference import LLMHandler
    from acestep.model_downloader import get_checkpoints_dir

    ckpt = get_checkpoints_dir(custom_dir=str(ace_dir / "checkpoints"))
    off = bool(model.get("offload_to_cpu"))
    dit = AceStepHandler()
    kw = dict(offload_to_cpu=True, offload_dit_to_cpu=True) if off else {}
    status, ok = dit.initialize_service(project_root=str(ace_dir), config_path=model["dit_config"], device="cuda", **kw)
    if not ok:
        raise RuntimeError(f"DiT init failed: {status}")
    tune(dit, model)
    if not need_lm:   # the recipe carries the planner's audio codes: the music model runs alone
        return dit, None
    llm = LLMHandler()
    status, ok = llm.initialize(checkpoint_dir=str(ckpt), lm_model_path=model["lm"], backend=model.get("llm_backend", "pt"),
                                device="cuda", **({"offload_to_cpu": True} if off else {}))
    if not ok:
        raise RuntimeError(f"LM init failed: {status}")
    return dit, llm


def tune(dit, model: dict):
    """The music model as the take's box ran it, from the `model` block's optional keys (absent: as ACE-Step loads it):
    `model_dtype` casts the DiT, its text encoder and its silence latent and sets the handler's dtype so its offload moves keep
    it; `attention` ("sdpa" or "eager") replaces the attention ACE picked for the card; `quantization` applies ACE's own torchao
    weight quantization to the decoder after the cast. The VAE and the planner LM keep their own. Each one changes the bytes."""
    name = model.get("model_dtype")
    if name:
        import torch
        dtype = getattr(torch, name)
        for attr in ("model", "text_encoder"):
            part = getattr(dit, attr, None)
            if part is not None:
                setattr(dit, attr, part.to(dtype=dtype))
        if getattr(dit, "silence_latent", None) is not None:
            dit.silence_latent = dit.silence_latent.to(dtype=dtype)
        dit.dtype = dtype
        print(f"  music model cast to {name}", flush=True)
    attn = model.get("attention")
    if attn:
        # every layer reads its config's _attn_implementation at each forward; the text encoder is another model and keeps its own
        for part in dit.model.modules():
            cfg = getattr(part, "config", None)
            if cfg is not None and hasattr(cfg, "_attn_implementation"):
                cfg._attn_implementation = attn
        print(f"  music model attention: {attn}", flush=True)
    q = model.get("quantization")
    if q:
        dit._apply_dit_quantization(q)
        dit.quantization = q
        print(f"  music model quantized: {q}", flush=True)
    return dit


def render_raw(dit, llm, r: dict, save_dir: Path) -> Path:
    from acestep.inference import GenerationConfig, GenerationParams, generate_music
    import torch
    codes = r.get("audio_codes") or ""
    p = GenerationParams(
        caption=r["caption"], instrumental=r["instrumental"], lyrics=r["lyrics"], bpm=r["bpm"], keyscale=r["keyscale"],
        timesignature=r["timesignature"], duration=float(r["duration"]), seed=int(r["seed"]),
        inference_steps=r["inference_steps"], guidance_scale=r["guidance_scale"], shift=r["shift"],
        enable_normalization=r.get("enable_normalization", True), normalization_db=r.get("normalization_db", -1.0))
    if codes:
        # the published take: the planner LM's audio codes and the caption the music model saw, so no LM runs and the render is deterministic
        p.audio_codes = codes
        p.caption = r.get("dit_caption") or r["caption"]
        p.vocal_language = r.get("vocal_language") or "unknown"
        p.thinking = False
        p.use_cot_metas = p.use_cot_caption = p.use_cot_language = False
    cfg = GenerationConfig(batch_size=1, use_random_seed=False, seeds=[int(r["seed"])], audio_format="wav")
    torch.manual_seed(int(r["seed"]))     # the planner LM samples from torch's global generator; the seed parameter does not reach it
    res = generate_music(dit, llm, p, cfg, save_dir=str(save_dir))
    if not res.success or not res.audios:
        raise RuntimeError(f"generation failed: {res.error}")
    return Path(res.audios[0]["path"])


def render_edit(dit, r: dict, edit: dict, src: Path, save_dir: Path) -> Path:
    """One section edit of the recipe's `edits`: ACE's repaint of [start, end] seconds of `src` (the take before this edit, as
    ACE wrote it: 48 kHz, no post). Outside the range ACE splices `src` back in; the LM is not used."""
    from acestep.inference import GenerationConfig, GenerationParams, generate_music
    import torch
    if edit.get("task") != "repaint":
        raise ValueError(f"unknown edit task {edit.get('task')!r}")
    p = GenerationParams(
        task_type="repaint", src_audio=str(src), repainting_start=float(edit["start"]), repainting_end=float(edit["end"]),
        repaint_mode=edit.get("mode", "balanced"), repaint_strength=float(edit.get("strength", 0.5)),
        caption=edit["caption"], lyrics=r["lyrics"], instrumental=r["instrumental"], bpm=r["bpm"], keyscale=r["keyscale"],
        timesignature=r["timesignature"], duration=float(r["duration"]), seed=int(edit["seed"]),
        inference_steps=edit["inference_steps"], guidance_scale=edit["guidance_scale"], shift=edit["shift"],
        enable_normalization=edit.get("enable_normalization", True), normalization_db=edit.get("normalization_db", -1.0))
    p.vocal_language = r.get("vocal_language") or "unknown"
    p.thinking = False
    p.use_cot_metas = p.use_cot_caption = p.use_cot_language = False
    cfg = GenerationConfig(batch_size=1, use_random_seed=False, seeds=[int(edit["seed"])], audio_format="wav")
    torch.manual_seed(int(edit["seed"]))  # ACE's VAE encode of `src` samples its latents from torch's global generator
    res = generate_music(dit, None, p, cfg, save_dir=str(save_dir))
    if not res.success or not res.audios:
        raise RuntimeError(f"repaint failed: {res.error}")
    return Path(res.audios[0]["path"])


def render_chain(load_dit, r: dict, work: Path, edits: list | None = None) -> Path:
    """The recipe's base render, then each of its `edits` in order (or the `edits` given). `load_dit(model)` returns a music model
    for a recipe `model` block, loaded without the LM. Each edit reads a copy of the take before it, alone in its own folder:
    with an ACE side file beside the source, ACE would use its cached latents instead of encoding the audio."""
    import shutil
    if not r.get("audio_codes"):
        raise ValueError("a recipe without audio codes needs the planner LM: render_raw it with an LM instead")
    work.mkdir(parents=True, exist_ok=True)
    raw = render_raw(load_dit(r["model"]), None, r, work)
    for i, edit in enumerate((r.get("edits") or []) if edits is None else edits):
        src = work / f"src-{i}" / "src.wav"
        src.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(raw, src)
        raw = render_edit(load_dit(edit["model"]), r, edit, src, work)
    return raw


def post(audio: np.ndarray, rate: int, cfg: dict) -> np.ndarray:
    out_rate = cfg["resample_hz"]
    if rate != out_rate:
        g = math.gcd(rate, out_rate)
        audio = np.stack([resample_poly(audio[:, c], out_rate // g, rate // g) for c in range(audio.shape[1])], axis=1).astype(np.float32)
    mono = audio.mean(axis=1)
    above = np.abs(mono) >= 10 ** (cfg["trim_silence_dbfs"] / 20.0)
    if above.any():
        audio = audio[: min(len(audio), int(np.nonzero(above)[0][-1]) + int(cfg["trim_tail_pad_s"] * out_rate))]
    n = int(cfg["loop_crossfade_s"] * out_rate)
    if len(audio) >= 4 * n:
        t = np.linspace(0.0, np.pi / 2, n, dtype=np.float32)[:, None]
        audio = np.concatenate([audio[:n] * np.sin(t) + audio[-n:] * np.cos(t), audio[n:-n]], axis=0).astype(np.float32)
    if cfg.get("chain", "").startswith("peak-normalise"):     # the race chain: the recorded gain is the whole master
        return (audio * 10 ** (cfg["gain_db"] / 20)).astype(np.float32)
    sos = signal.butter(cfg["highpass_order"], cfg["highpass_hz"], "highpass", fs=out_rate, output="sos")
    y = signal.sosfilt(sos, np.concatenate([audio, audio]), axis=0)[len(audio):]   # two copies, keep the second: no start-up step at the loop point
    knee = cfg["master_soft_knee"]
    room = 1.0 - knee
    a = np.abs(y)
    y = np.where(a > knee, np.sign(y) * (knee + room * np.tanh((a - knee) / room)), y)
    y = (y * 10 ** (cfg["gain_db"] / 20)).astype(np.float32)
    ceiling = 10 ** (cfg["limiter_ceiling_dbfs"] / 20)
    k = cfg["limiter_knee_frac"] * ceiling
    room = ceiling - k
    a = np.abs(y)
    return np.where(a > k, np.sign(y) * (k + room * np.tanh((a - k) / room)), y).astype(np.float32)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("recipe")
    ap.add_argument("--ace-dir", required=True, help="your ACE-Step 1.5 checkout (holds acestep/ and checkpoints/)")
    ap.add_argument("--out", default=None, help="output WAV (default: <slug>.wav next to the recipe)")
    ap.add_argument("--mp3", default=None, help="also encode this MP3 with ffmpeg (128k CBR as published)")
    ap.add_argument("--work", default=None, help="folder for ACE's raw render (default: a 'raw' folder next to the output)")
    a = ap.parse_args()
    r = json.loads(Path(a.recipe).read_text(encoding="utf-8"))
    if r.get("reproducible") is False:
        raise SystemExit("this recipe is marked reproducible: false (" + r.get("reproducible_why", "an imported track") + "); nothing was rendered")
    out = Path(a.out) if a.out else Path(a.recipe).resolve().parent / f"{r['slug']}-rerender.wav"
    work = Path(a.work) if a.work else out.parent / "raw"
    work.mkdir(parents=True, exist_ok=True)
    t0 = time.perf_counter()
    if r.get("edits"):      # a section edit: the base take, then each repaint on the music model alone
        loaded = {}

        def load_dit(model: dict):
            if model["dit_config"] not in loaded:
                loaded.clear()      # one music model on the card at a time
                loaded[model["dit_config"]] = init_handlers(Path(a.ace_dir), model, need_lm=False)[0]
            return loaded[model["dit_config"]]
        raw = render_chain(load_dit, r, work)
        print(f"rendered the base and {len(r['edits'])} edit(s) in {time.perf_counter() - t0:.0f}s (model loads included)", flush=True)
        t1 = t0
    else:
        dit, llm = init_handlers(Path(a.ace_dir), r["model"], need_lm=not r.get("audio_codes"))
        print(f"models loaded in {time.perf_counter() - t0:.0f}s", flush=True)
        t1 = time.perf_counter()
        raw = render_raw(dit, llm, r, work)
    audio, rate = sf.read(str(raw), dtype="float32", always_2d=True)
    final = post(audio, rate, r["post"])
    sf.write(str(out), final, r["post"]["resample_hz"], subtype="FLOAT")
    peak = 20 * math.log10(float(np.max(np.abs(final))) + 1e-12)
    exp = r.get("expected", {})
    print(f"rendered in {time.perf_counter() - t1:.0f}s: {len(final) / r['post']['resample_hz']:.2f} s, peak {peak:.2f} dBFS")
    if exp:
        print(f"recipe expects: {exp.get('duration_s')} s, peak {exp.get('peak_dbfs_pre_encode')} dBFS (pre-encode, same post-processing)")
    if a.mp3:
        m = r["post"]["mp3"]
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(out), "-c:a", m["codec"], "-b:a", m["bitrate"], "-ar", str(m["sample_rate"]),
                        "-ac", str(m["channels"]), "-id3v2_version", "0", "-write_id3v1", "0", str(a.mp3)], check=True)
        print("mp3 written")


if __name__ == "__main__":
    main()
