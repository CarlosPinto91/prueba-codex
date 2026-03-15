# Atajos y prompts reutilizables para Codex (curso epidemiología)

## 1. Planificación

```text
/plan
Objetivo: implementar [módulo].
Devuélveme: pasos, archivos a tocar, riesgos y validaciones.
```

## 2. Edición controlada

```text
/edit
Archivo: [ruta].
Cambio: [cambio específico].
No rompas compatibilidad con [X].
```

## 3. Ejecución y verificación

```text
/run
Comandos: [pytest, script, lint].
Reporta: salida breve + errores accionables.
```

## 4. Revisión técnica

```text
/review
Revisa: calidad de código, posibles bugs, deuda técnica y seguridad.
Dame severidad por cada hallazgo.
```

## 5. Commit

```text
/commit
Genera mensaje estilo Conventional Commits en español.
Incluye scope del módulo.
```

## 6. Pull Request

```text
/pr
Crea título y cuerpo con: contexto, cambios, validación, riesgos y siguientes pasos.
```
