# Curso práctico: Codex aplicado a predicción de brotes (4 horas)

> Formato: explicación + taller por módulos + ejercicios guiados + retos + checklist de producción.
> Nivel: cero (sin experiencia previa en programación o Git).
> Idioma: español.

## 1) Objetivo general

Al finalizar, tendrás un proyecto funcional de **predicción de brotes epidemiológicos con datos simulados**, desarrollado con Codex de punta a punta, incluyendo:

- trabajo local,
- flujo con Git/GitHub (branch, commit, push, PR),
- uso de comandos rápidos con `/`,
- automatizaciones (validaciones y reportes),
- introducción a trabajo multiagente,
- opción de conexión en nube.

---

## 2) Estructura recomendada del repo del curso

```text
codex-epi-course/
├── README.md
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
├── src/
│   ├── simulation/
│   ├── features/
│   ├── models/
│   └── dashboard/
├── tests/
├── .github/workflows/
├── prompts/
├── skills/
│   └── epi-brote-forecast/
│       └── SKILL.md
└── docs/
```

---

## 3) Ruta de 4 horas (hands-on)

## Módulo 0 (15 min): Setup mínimo

### Contenido

- Qué es Codex y cuándo usarlo.
- Diferencia entre operar en local, GitHub y nube.
- “Regla de oro”: pedir siempre a Codex pasos verificables y comandos ejecutables.

### Ejercicio guiado

1. Crear repo local.
2. Inicializar Git y primer commit.
3. Crear estructura de carpetas base.

### Reto

- Escribir un `README.md` inicial con objetivo, stack y pasos de ejecución.

---

## Módulo 1 (40 min): Dataset sintético de vigilancia epidemiológica

### Contenido

- Variables clave para brotes:
  - `fecha`, `region`, `casos_nuevos`, `lluvia_mm`, `temperatura_c`, `movilidad_idx`.
- Diseño de supuestos simples para simulación.

### Ejercicio guiado

- Pedir a Codex generar un script de simulación para 12 meses y 5 regiones.
- Guardar dataset en `data/raw/brotes_simulados.csv`.

### Reto

- Añadir evento puntual (p. ej. festividad local) que incremente movilidad y casos.

---

## Módulo 2 (45 min): Feature engineering + baseline

### Contenido

- Variables rezagadas (lags), medias móviles y estacionalidad.
- Separación train/test por fecha (no aleatoria).

### Ejercicio guiado

- Crear pipeline que genere features y entrene un baseline (`LinearRegression` o `RandomForest`).
- Métricas: MAE y RMSE.

### Reto

- Comparar dos modelos y escribir conclusiones en `docs/model-comparison.md`.

---

## Módulo 3 (35 min): Dashboard simple para toma de decisiones

### Contenido

- Dashboard en Streamlit:
  - gráfico temporal,
  - región seleccionable,
  - alerta si predicción supera umbral.

### Ejercicio guiado

- Crear `src/dashboard/app.py` con selector por región.

### Reto

- Añadir “semáforo epidemiológico” (verde/amarillo/rojo).

---

## Módulo 4 (35 min): Skills de Codex

### Contenido

- Qué es una skill.
- Cuándo conviene crear skill propia de dominio.
- Estructura mínima de una skill:
  - frontmatter,
  - instrucciones accionables,
  - disparadores claros.

### Ejercicio guiado

- Crear skill `epi-brote-forecast` para estandarizar:
  - limpieza,
  - features,
  - entrenamiento,
  - reporte.

### Reto

- Mejorar la skill con validaciones de calidad de datos.

---

## Módulo 5 (35 min): Automatizaciones + GitHub Actions + push/PR

### Contenido

- Flujo de ramas:
  - `main`,
  - `feature/...`.
- Commits claros y PR con plantilla.
- Workflow de CI para:
  - lint,
  - tests,
  - smoke run del pipeline.

### Ejercicio guiado

- Configurar workflow que corra en push y pull request.

### Reto

- Agregar badge de estado de CI en README.

---

## Módulo 6 (30 min): Atajos con `/` + multiagente + nube

### Contenido

- Biblioteca de comandos rápidos con `/` para tareas recurrentes.
- Patrón multiagente (secuencial):
  - agente 1: datos,
  - agente 2: modelado,
  - agente 3: dashboard,
  - agente 4: QA/PR.
- Estrategia local primero, nube después.

### Ejercicio guiado

- Ejecutar una corrida completa con tareas separadas por agente.

### Reto

- Migrar el pipeline a ejecución programada (cron en GitHub Actions).

---

## 4) Stack recomendado para nivel cero

- **Python** (más simple para datos y epidemiología).
- Librerías:
  - `pandas`, `numpy`, `scikit-learn`, `streamlit`, `matplotlib`.
- Control de versiones:
  - Git + GitHub.
- Editor y terminal local.

---

## 5) Guía de prompts operativos para Codex

Usa prompts con estructura fija: **contexto + tarea + restricciones + criterio de éxito**.

Ejemplo:

```text
Contexto: repo de predicción de brotes con datos simulados.
Tarea: crea script Python en src/simulation/generate_data.py.
Restricciones: sin datos personales, semilla fija, 5 regiones, 365 días.
Éxito: exporta CSV en data/raw y agrega docstring con uso.
```

---

## 6) Atajos útiles con `/` (plantilla de uso)

> Los nombres exactos pueden variar por entorno, pero esta es la intención operativa.

- `/plan`: pedir plan paso a paso antes de tocar archivos.
- `/edit`: solicitar cambio puntual de archivo.
- `/run`: ejecutar pruebas o scripts.
- `/review`: revisión rápida de calidad y riesgos.
- `/commit`: sugerir mensaje de commit.
- `/pr`: redactar título/cuerpo de PR.

Sugerencia didáctica: en cada módulo, arrancar con `/plan`, cerrar con `/review`.

---

## 7) Multiagente (modelo simple para aprender)

### Agent roles

1. **Data Agent**
   - genera dataset,
   - valida nulos y rangos.
2. **Model Agent**
   - crea features,
   - entrena y evalúa.
3. **App Agent**
   - crea dashboard y alertas.
4. **Ops Agent**
   - testea, prepara CI y PR.

### Protocolo de handoff

- Cada agente deja:
  - resumen de cambios,
  - comandos ejecutados,
  - riesgos pendientes.

---

## 8) Local vs nube (sin proveedor actual)

### Camino recomendado

1. **Semana 1 (local)**: construir todo y validar reproducibilidad.
2. **Semana 2 (nube ligera)**:
   - conectar repo,
   - ejecutar CI en GitHub,
   - activar job programado.
3. **Escalado**:
   - mover dashboard a servicio gestionado,
   - separar secretos y configuración.

---

## 9) Checklist de “producción” del proyecto del curso

- [ ] Dataset reproducible con semilla fija.
- [ ] Script de entrenamiento idempotente.
- [ ] Métricas guardadas en artefacto (`metrics.json`).
- [ ] Dashboard funcional con al menos 1 filtro.
- [ ] Tests mínimos (carga de datos + shape + predicción no vacía).
- [ ] CI ejecutando en push/PR.
- [ ] README con quickstart.
- [ ] Skill de dominio incluida y documentada.
- [ ] Plantilla de PR usada en cambios relevantes.

---

## 10) Entregables del curso (día 1)

1. Repo inicial con estructura completa.
2. Script de simulación + pipeline base.
3. Dashboard funcionando local.
4. Workflow de GitHub Actions.
5. Skill `epi-brote-forecast` operativa.
6. Carpeta `prompts/` con atajos y recetas.

---

## 11) Plan express (arrancar hoy)

- **Bloque A (60 min):** setup + dataset.
- **Bloque B (75 min):** features + modelo baseline.
- **Bloque C (45 min):** dashboard.
- **Bloque D (60 min):** skill + automatizaciones + PR.

Con esto ya tienes un MVP real y extensible.



## 12) Implementación inmediata (hecha en este repo)

Ya quedó incluida una base **runnable** en `course/project-template/`:

- `src/simulation/generate_data.py`: genera datos sintéticos de brotes.
- `src/features/build_features.py`: crea lags, medias móviles y variables de calendario.
- `src/models/train_baseline.py`: entrena baseline y exporta métricas/predicciones.
- `src/dashboard/app.py`: visualiza reales vs predicción + alerta por umbral.
- `tests/test_pipeline.py`: prueba end-to-end del pipeline.
- `Makefile`: comandos `simulate`, `features`, `train`, `test`.

Ejecuta:

```bash
cd course/project-template
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make simulate
make features
make train
make test
streamlit run src/dashboard/app.py
```
