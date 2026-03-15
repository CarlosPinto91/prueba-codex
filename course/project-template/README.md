# Plantilla runnable: Predicción de brotes (simulado)

## Quickstart

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make simulate
make features
make train
make test
streamlit run src/dashboard/app.py
```

## Flujo

1. `make simulate` genera `data/raw/brotes_simulados.csv`.
2. `make features` genera `data/processed/features.csv`.
3. `make train` genera métricas en `artifacts/metrics.json` y predicciones en `artifacts/predictions.csv`.
4. `make test` ejecuta tests del pipeline.
