from __future__ import annotations

import json
from pathlib import Path
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error

FEATURES = [
    "lluvia_mm",
    "temperatura_c",
    "movilidad_idx",
    "lag_1",
    "lag_7",
    "lag_14",
    "ma_7",
    "ma_14",
    "dia_semana",
    "mes",
    "semana_epi",
]


def main() -> None:
    src = Path("data/processed/features.csv")
    if not src.exists():
        raise FileNotFoundError("Falta data/processed/features.csv. Ejecuta make features")

    df = pd.read_csv(src, parse_dates=["fecha"]).sort_values("fecha")
    split_date = df["fecha"].quantile(0.8)

    train = df[df["fecha"] <= split_date]
    test = df[df["fecha"] > split_date]

    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(train[FEATURES], train["casos_nuevos"])
    preds = model.predict(test[FEATURES])

    mae = mean_absolute_error(test["casos_nuevos"], preds)
    rmse = root_mean_squared_error(test["casos_nuevos"], preds)

    artifacts = Path("artifacts")
    artifacts.mkdir(parents=True, exist_ok=True)

    metrics = {"mae": round(float(mae), 4), "rmse": round(float(rmse), 4), "n_test": int(len(test))}
    (artifacts / "metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")

    out = test[["fecha", "region", "casos_nuevos"]].copy()
    out["prediccion"] = preds
    out.to_csv(artifacts / "predictions.csv", index=False)

    print("Entrenamiento completado", metrics)


if __name__ == "__main__":
    main()
