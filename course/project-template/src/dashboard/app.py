from __future__ import annotations

from pathlib import Path
import pandas as pd
import streamlit as st

st.set_page_config(page_title="Epi Forecast", layout="wide")
st.title("Predicción de brotes (simulado)")

pred_path = Path("artifacts/predictions.csv")
if not pred_path.exists():
    st.warning("No existe artifacts/predictions.csv. Ejecuta: make simulate && make features && make train")
    st.stop()

preds = pd.read_csv(pred_path, parse_dates=["fecha"])
regions = sorted(preds["region"].unique().tolist())
region = st.selectbox("Región", regions)
threshold = st.slider("Umbral de alerta", min_value=10, max_value=80, value=30)

view = preds[preds["region"] == region].sort_values("fecha")
st.line_chart(view.set_index("fecha")[["casos_nuevos", "prediccion"]])
latest = float(view["prediccion"].iloc[-1])

if latest >= threshold:
    st.error(f"🔴 Alerta: predicción actual {latest:.1f} ≥ umbral {threshold}")
else:
    st.success(f"🟢 Sin alerta: predicción actual {latest:.1f} < umbral {threshold}")
