# language: es
Característica: Búsqueda en Google

  @QA-CYP-001 @risk-low @external
  Escenario: Buscar en Google.com
    Dado que abro la página de Google
    Cuando busco "Cypress Cucumber Allure"
    Entonces los resultados deben mostrarse
