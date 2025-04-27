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
    const finalFields: MandatoryFieldsValue = {
      firstName: fields?.firstName || "John",
      lastName: fields?.lastName || "Doe",
      emailInput: fields?.emailInput || "johndoe@email.com",
      phoneInput: fields?.phoneInput || "123456789",
      openTextAreaInput: fields?.openTextAreaInput || "random text",
    };

    cy.get(cacTatPage.firstNameInput).type(finalFields.firstName);
    cy.get(cacTatPage.lastNameInput).type(finalFields.lastName);
    cy.get(cacTatPage.emailInput).type(finalFields.emailInput);
    cy.get(cacTatPage.phoneInput).type(finalFields.phoneInput);
    cy.get(cacTatPage.openTextAreaInput).type(finalFields.openTextAreaInput, {
      delay: 0,
    });

    cy.contains("button", "Enviar").click();
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
