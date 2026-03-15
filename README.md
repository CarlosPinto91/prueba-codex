# Curso Codex Salud Pública (base)

Este repositorio incluye una base visual y materiales para un curso práctico de 4 horas sobre Codex aplicado a predicción de brotes epidemiológicos con datos simulados.

## Material del curso

- Guía principal: `course/CURSO-CODEX-SALUD-PUBLICA.md`
- Atajos/prompts: `course/templates/prompts/atajos-codex.md`
- Skill de ejemplo: `course/templates/skills/epi-brote-forecast/SKILL.md`
- Workflow CI: `.github/workflows/epi-ci.yml`

## Ejecutar presentación local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```


## Plantilla runnable del curso

Además de la presentación, ya tienes una plantilla ejecutable en `course/project-template/` con scripts de simulación, features, entrenamiento, dashboard y tests.

```bash
cd course/project-template
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make simulate && make features && make train && make test
```
