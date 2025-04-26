import { cacTatPage } from "../support/locators/cac-tat-page";

describe("CAC TAT", () => {
  beforeEach(() => cy.visit("../../src/index.html"));

  it("Validate app's title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Should fill the required fields and send the form", () => {
    const longText = Cypress._.repeat("random text", 30);

    cy.get(cacTatPage.firstNameInput).type("Bruno");
    cy.get(cacTatPage.lastNameInput).type("Miguel");
    cy.get(cacTatPage.emailInput).type("email@email.com");
    cy.get(cacTatPage.openTextAreaInput).type(longText, { delay: 0 });

    cy.get(cacTatPage.submitForm).click();
    cy.get(cacTatPage.successMessage)
      .should("be.visible")
      .and("contain.text", "Mensagem enviada com sucesso.");
  });

  it("Should display error message when provided email is invalid", () => {
    cy.get(cacTatPage.emailInput).type("email.com");

    cy.get(cacTatPage.submitForm).click();

    cy.get(cacTatPage.errorMessage)
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!");
  });

  it("Should display error message when phone input is not numbers", () => {
    cy.get(cacTatPage.phoneInput).type("invalidNumber");
    cy.get(cacTatPage.phoneInput).should("be.empty");
  });

  it("Should display error message when phone input is required but not provided", () => {
    cy.get(cacTatPage.firstNameInput).type("Bruno");
    cy.get(cacTatPage.lastNameInput).type("Miguel");
    cy.get(cacTatPage.emailInput).type("email@email.com");
    cy.get(cacTatPage.openTextAreaInput).type("random text");

    cy.get(cacTatPage.phoneCheckbox).check();

    cy.get(cacTatPage.submitForm).click();

    cy.get(cacTatPage.errorMessage)
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!");
  });

  it("Should be able clear input text fields", () => {
    cy.get(cacTatPage.firstNameInput)
      .type("Bruno")
      .should("have.value", "Bruno");
    cy.get(cacTatPage.firstNameInput).clear().should("be.empty");

    cy.get(cacTatPage.lastNameInput)
      .type("Miguel")
      .should("have.value", "Miguel");
    cy.get(cacTatPage.lastNameInput).clear().should("be.empty");

    cy.get(cacTatPage.emailInput)
      .type("email@email.com")
      .should("have.value", "email@email.com");
    cy.get(cacTatPage.emailInput).clear().should("be.empty");

    cy.get(cacTatPage.phoneInput)
      .type("5551988112233")
      .should("have.value", "5551988112233");
    cy.get(cacTatPage.phoneInput).clear().should("be.empty");

    cy.get(cacTatPage.openTextAreaInput)
      .type("random text")
      .should("have.value", "random text");
    cy.get(cacTatPage.openTextAreaInput).clear().should("be.empty");
  });

  it("Should display error message when required fields are not typed", () => {
    cy.contains("Enviar").click();

    cy.get(cacTatPage.errorMessage)
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!");
  });
});
