---
name: epi-brote-forecast
description: Usa esta skill cuando se trabaje en proyectos de predicción de brotes con datos epidemiológicos simulados, para estandarizar limpieza, features temporales, entrenamiento baseline, evaluación y reporte reproducible.
---

# EPI Brote Forecast

## Cuándo usarla

Activa esta skill si el usuario pide tareas de:

- simulación o limpieza de datos de vigilancia,
- ingeniería de características temporales,
- entrenamiento de modelos de predicción de casos,
- evaluación y generación de reportes operativos.

## Flujo recomendado

1. **Validar datos**
   - revisar columnas requeridas: `fecha`, `region`, `casos_nuevos`.
   - ordenar por fecha.
   - verificar nulos, duplicados y valores negativos en casos.

2. **Feature engineering mínimo**
   - lags: `lag_1`, `lag_7`, `lag_14` de `casos_nuevos` por región.
   - medias móviles: `ma_7`, `ma_14`.
   - calendario: día de semana, semana epidemiológica, mes.

3. **Split temporal**
   - nunca usar split aleatorio.
   - entrenar con ventana histórica y validar en fechas posteriores.

4. **Modelo baseline**
   - iniciar con un modelo simple (`LinearRegression` o `RandomForestRegressor`).
   - calcular `MAE` y `RMSE`.

5. **Reporte mínimo**
   - tabla de métricas,
   - gráfico de reales vs predicción,
   - top regiones con mayor error.

## Criterios de calidad

- Reproducibilidad con semilla fija.
- Sin uso de datos personales.
- Scripts idempotentes (ejecutables múltiples veces sin romper estados).
- Logs claros de entradas/salidas.

## Formato de salida esperado

Siempre devolver:

- resumen de cambios,
- archivos tocados,
- comandos sugeridos para validar,
- siguientes 3 pasos concretos.
