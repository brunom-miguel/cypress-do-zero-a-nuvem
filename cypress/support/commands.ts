/// <reference types="cypress" />
import { cacTatPage } from "./locators/cac-tat-page";

export interface MandatoryFieldsValue {
  firstName?: string;
  lastName?: string;
  emailInput?: string;
  phoneInput?: string;
  openTextAreaInput?: string;
}

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (fields?: MandatoryFieldsValue) => {
    const longText = Cypress._.repeat("random text", 30);

    cy.get(cacTatPage.firstNameInput).type(fields?.firstName || "FirstName");
    cy.get(cacTatPage.lastNameInput).type(fields?.lastName || "LastName");
    cy.get(cacTatPage.emailInput).type(fields?.emailInput || "email@email.com");
    cy.get(cacTatPage.phoneInput).type(fields?.phoneInput || "123456789");
    cy.get(cacTatPage.openTextAreaInput).type(
      fields?.openTextAreaInput || longText,
      { delay: 0 }
    );

    cy.get(cacTatPage.submitForm).click();
  }
);
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      fillMandatoryFieldsAndSubmit(
        fields?: MandatoryFieldsValue
      ): Chainable<void>;
    }
  }
}
