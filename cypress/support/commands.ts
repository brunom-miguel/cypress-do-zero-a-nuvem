/// <reference types="cypress" />
import { cacTatPage } from "./locators/cac-tat-page";

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  const longText = Cypress._.repeat("random text", 30);

  cy.get(cacTatPage.firstNameInput).type("Bruno");
  cy.get(cacTatPage.lastNameInput).type("Miguel");
  cy.get(cacTatPage.emailInput).type("email@email.com");
  cy.get(cacTatPage.phoneInput).type("123456789");
  cy.get(cacTatPage.openTextAreaInput).type(longText, { delay: 0 });

  cy.get(cacTatPage.submitForm).click();
});
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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
