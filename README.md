# Cypress + Cucumber + Allure Reports

Este proyecto es una inicialización base que integra Cypress con BDD (Cucumber) y reportes de Allure.

## Requisitos

- Node.js (v18+)

## Instalación

Las dependencias ya fueron instaladas durante la inicialización, pero si necesitas reinstalarlas:
```bash
npm install
```

## Estructura del Proyecto

- `cypress/e2e/*.feature`: Aquí se encuentran los archivos de Gherkin con los escenarios de prueba.
- `cypress/support/step_definitions/*.ts`: Aquí se implementan los pasos definidos en los archivos `.feature` utilizando TypeScript.
- `cypress.config.ts`: Archivo de configuración principal donde se integran los plugins de Cucumber (con esbuild) y Allure.

## Scripts Disponibles

Puedes ejecutar las pruebas y generar los reportes utilizando los siguientes comandos definidos en `package.json`:

- **Ejecutar pruebas (Modo Consola):**
  ```bash
  npm test
  ```
  *Esto ejecutará Cypress en segundo plano y generará los resultados en la carpeta `allure-results`.*

- **Abrir Cypress (Modo Interactivo):**
  ```bash
  npm run cypress:open
  ```

- **Ver el Reporte de Allure:**
  ```bash
  npm run report
  ```
  *Esto procesará los archivos de `allure-results` y abrirá tu navegador con el reporte detallado.*

## Caso de Prueba Incluido

El proyecto incluye un caso de prueba en español para validar la funcionalidad de búsqueda en Google.

**cypress/e2e/google_search.feature**
```gherkin
# language: es
Característica: Búsqueda en Google

  Escenario: Buscar en Google.com
    Dado que abro la página de Google
    Cuando busco "Cypress Cucumber Allure"
    Entonces los resultados deben mostrarse
```

---

## Project Description: E2E Testing Framework with Cypress, Cucumber, and Allure

This project is a modern, robust End-to-End (E2E) testing automation framework built around **Cypress**, integrated with **Cucumber** for Behavior-Driven Development (BDD), and utilizing **Allure** for advanced test reporting. The framework is written in **TypeScript** and leverages **esbuild** for lightning-fast test bundling.

### Advantages of this Tech Stack

Combining these specific technologies creates a highly efficient, scalable, and maintainable testing environment. Here is why they work so well together:

**1. Cypress (The Core E2E Engine)**
*   **Advantage:** Cypress operates directly within the browser, providing native access to everything (DOM, network requests, local storage, etc.). This eliminates the flakiness commonly associated with WebDriver-based tools, resulting in faster, more reliable, and consistent test executions. It also features automatic waiting, meaning you rarely have to add explicit `sleep` or `wait` commands.

**2. Cucumber / Gherkin (Behavior-Driven Development)**
*   **Advantage:** By using the `@badeball/cypress-cucumber-preprocessor`, test scenarios are written in plain-text Gherkin syntax (`.feature` files) using Given/When/Then steps.
*   **Business Alignment:** This serves as "living documentation" that is easily readable by non-technical stakeholders (Product Managers, Business Analysts, QA, and Developers). It bridges the communication gap between business requirements and technical implementation.

**3. TypeScript (Type Safety & Developer Experience)**
*   **Advantage:** Writing the step definitions and Cypress configurations in TypeScript catches errors at compile-time rather than run-time. It provides excellent IDE support (like rich autocomplete and inline documentation), making the test codebase easier to refactor and scale securely as the project grows.

**4. esbuild (Extremely Fast Bundling)**
*   **Advantage:** Cypress needs to bundle the test files (compiling TypeScript and Cucumber steps into browser-compatible JavaScript) before running them. By using `@bahmutov/cypress-esbuild-preprocessor`, the bundling process is outsourced to `esbuild`, which is written in Go and is orders of magnitude faster than traditional bundlers like Webpack or Browserify. This drastically reduces the startup time of the test runner.

**5. Allure Report (Advanced Test Reporting)**
*   **Advantage:** Standard test outputs can be hard to interpret, especially when a suite grows. `allure-cypress` generates highly visual, detailed, and interactive HTML reports.
*   **Visibility:** It provides a clear dashboard showing test pass rates, execution times, and historical trends. When a test fails, Allure can easily attach screenshots, videos, and detailed logs directly to the specific failed step in the report, making debugging significantly easier.
