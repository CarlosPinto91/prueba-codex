from pathlib import Path
import json
import subprocess
import sys


def run(cmd: list[str]) -> None:
    subprocess.run([sys.executable, *cmd], check=True)


def test_pipeline_end_to_end() -> None:
    run(["src/simulation/generate_data.py"])
    assert Path("data/raw/brotes_simulados.csv").exists()

    run(["src/features/build_features.py"])
    assert Path("data/processed/features.csv").exists()

    run(["src/models/train_baseline.py"])
    metrics_path = Path("artifacts/metrics.json")
    assert metrics_path.exists()

    metrics = json.loads(metrics_path.read_text(encoding="utf-8"))
    assert metrics["mae"] >= 0
    assert metrics["rmse"] >= 0
