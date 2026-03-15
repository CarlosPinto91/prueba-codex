from __future__ import annotations

from pathlib import Path
import pandas as pd


def main() -> None:
    src = Path("data/raw/brotes_simulados.csv")
    if not src.exists():
        raise FileNotFoundError("Falta data/raw/brotes_simulados.csv. Ejecuta make simulate")

    df = pd.read_csv(src, parse_dates=["fecha"]).sort_values(["region", "fecha"])
    grouped = df.groupby("region")

    for lag in (1, 7, 14):
        df[f"lag_{lag}"] = grouped["casos_nuevos"].shift(lag)

    for window in (7, 14):
        df[f"ma_{window}"] = grouped["casos_nuevos"].transform(lambda s: s.rolling(window).mean())

    df["dia_semana"] = df["fecha"].dt.dayofweek
    df["mes"] = df["fecha"].dt.month
    df["semana_epi"] = df["fecha"].dt.isocalendar().week.astype(int)

    df = df.dropna().reset_index(drop=True)
    output = Path("data/processed")
    output.mkdir(parents=True, exist_ok=True)
    df.to_csv(output / "features.csv", index=False)
    print(f"Features generadas: {len(df)} filas")


if __name__ == "__main__":
    main()
