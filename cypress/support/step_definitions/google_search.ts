import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que abro la página de Google", () => {
  cy.visit("https://www.google.com");

  // Aceptar cookies si aparece el dialogo (opcional pero util para evitar que tape el buscador)
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Rechazar todo"), button:contains("Aceptar todo"), button:contains("Accept all")').length > 0) {
      cy.get('button').contains(/Rechazar todo|Aceptar todo|Accept all/i).click({ force: true });
    }
  });
});

When("busco {string}", (searchTerm: string) => {
  cy.get('textarea[name="q"], input[name="q"]').first().should('be.visible').clear().type(`${searchTerm}{enter}`);
});

Then("los resultados deben mostrarse", () => {
  cy.title().should('include', 'Cypress');
});
