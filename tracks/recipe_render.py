"""Re-render one musiquenonstop take from its recipe.json with ACE-Step 1.5. Standalone: one file, no imports from this repo.

  python recipe_render.py recipe.json --ace-dir <your ACE-Step 1.5 checkout> [--out take.wav] [--mp3 take.mp3]

Dependencies: the ACE-Step package (from --ace-dir) with its CUDA torch, plus numpy, scipy and soundfile (all in an ACE-Step
environment). ffmpeg only if you ask for --mp3. The checkout must hold checkpoints/<dit_config> and checkpoints/<lm> named in
the recipe. The same seed, caption, lyrics and settings on the same model give the same audio on the same kind of GPU; different
GPUs and driver stacks can drift a little, so compare duration and peak rather than expecting identical bytes.

The post-processing is the recipe's `post` block, applied in this order: resample to 44.1 kHz, trim the silent tail, bake the
loop (equal-power crossfade of the last N seconds onto the first N, then removed), 4th-order 60 Hz high-pass with a soft knee,
one gain in dB, soft limiter. Nothing here plays audio.
"""
from __future__ import annotations

import argparse
import json
import math
import subprocess
import sys
import time
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy import signal
from scipy.signal import resample_poly


def init_handlers(ace_dir: Path, model: dict, need_lm: bool = True):
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
    if not need_lm:   # the recipe carries the planner's audio codes: the music model runs alone
        return dit, None
    llm = LLMHandler()
    status, ok = llm.initialize(checkpoint_dir=str(ckpt), lm_model_path=model["lm"], backend=model.get("llm_backend", "pt"),
                                device="cuda", **({"offload_to_cpu": True} if off else {}))
    if not ok:
        raise RuntimeError(f"LM init failed: {status}")
    return dit, llm


def render_raw(dit, llm, r: dict, save_dir: Path) -> Path:
    from acestep.inference import GenerationConfig, GenerationParams, generate_music
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
    res = generate_music(dit, llm, p, cfg, save_dir=str(save_dir))
    if not res.success or not res.audios:
        raise RuntimeError(f"generation failed: {res.error}")
    return Path(res.audios[0]["path"])


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
