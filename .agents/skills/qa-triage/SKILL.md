---
name: qa-triage
description: Analiza ejecuciones fallidas, inestabilidad y defectos a partir de resultados Allure, JUnit o GitHub Actions. Úsala cuando se necesite un diagnóstico reproducible con evidencias.
---

1. Ubica los resultados de una sola ejecución. Anota commit, ID del caso, entorno, comando y si hubo reintentos.
2. Ejecuta `npm run qa:triage` para obtener recuentos y señales preliminares. Consulta los artefactos originales localmente cuando sean necesarios para confirmar la causa.
3. Compara resultado esperado y observado. Si la evidencia alcanza, reproduce el caso alterando una variable a la vez y comprueba si el problema está en el producto, la prueba, los datos o el entorno.
4. Separa observación e hipótesis. Conserva el fallo original y registra los reintentos por separado. Usa la plantilla de defecto en [la guía de pruebas](../../../docs/qa.md).
5. Minimiza la evidencia que compartes. Confirma qué datos se pueden exponer antes de incluir rastros, logs, capturas o información de usuarios en IA o en incidencias.
