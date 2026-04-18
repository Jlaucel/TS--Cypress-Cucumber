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
