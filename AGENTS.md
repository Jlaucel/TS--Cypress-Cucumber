# Automatización con Cypress

- Los escenarios Gherkin viven en `cypress/e2e/` y los pasos en `cypress/support/step_definitions/`.
- Usa la cola de comandos `cy` y sus aserciones reintentables. La configuración está en `cypress.config.ts`. Los hooks de Cucumber están en `cypress/support/step_definitions/hooks.ts`.
- Usa `npm run qa:check` para validar sintaxis y trazabilidad. Ejecuta una prueba contra el sitio externo cuando su comportamiento sea parte de la tarea.
- Consulta [la guía ISTQB](docs/qa.md) para diseñar pruebas y [la skill de diagnóstico](.agents/skills/qa-triage/SKILL.md) para analizar fallos. Conserva los IDs y usa datos sintéticos.
