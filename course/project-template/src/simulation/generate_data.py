from __future__ import annotations

from pathlib import Path
import numpy as np
import pandas as pd

SEED = 42
REGIONS = ["Norte", "Sur", "Centro", "Oriente", "Occidente"]


def main() -> None:
    np.random.seed(SEED)
    dates = pd.date_range("2024-01-01", periods=365, freq="D")
    rows = []
    for region in REGIONS:
        base = np.random.randint(8, 20)
        phase = np.random.uniform(0, np.pi)
        for i, date in enumerate(dates):
            seasonality = 6 * np.sin((2 * np.pi * i / 30) + phase)
            mobility = np.clip(np.random.normal(50, 12), 5, 100)
            rain = np.clip(np.random.normal(80, 30), 0, 250)
            temp = np.clip(np.random.normal(24, 4), 8, 38)
            shock = 8 if 160 <= i <= 170 else 0
            cases = max(0, int(base + seasonality + shock + mobility * 0.05 + np.random.normal(0, 2)))
            rows.append(
                {
                    "fecha": date,
                    "region": region,
                    "casos_nuevos": cases,
                    "lluvia_mm": float(rain),
                    "temperatura_c": float(temp),
                    "movilidad_idx": float(mobility),
                }
            )

    df = pd.DataFrame(rows).sort_values(["region", "fecha"])
    output = Path("data/raw")
    output.mkdir(parents=True, exist_ok=True)
    df.to_csv(output / "brotes_simulados.csv", index=False)
    print(f"Dataset generado: {len(df)} filas")


if __name__ == "__main__":
    main()
