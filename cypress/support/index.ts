declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to type mandatory fields and submit the form
     * @example cy.fillMandatoryFieldsAndSubmit();
     */
    fillMandatoryFieldsAndSubmit(): Chainable<void>;
  }
}
