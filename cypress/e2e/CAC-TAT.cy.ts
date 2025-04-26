import { cacTatPage } from "../support/locators/cac-tat-page";

describe("CAC TAT", () => {
  beforeEach(() => cy.visit("../../src/index.html"));

  it("Validate app's title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Should fill the required fields and send the form", () => {
    cy.typeAndValidate(cacTatPage.firstNameInput, "Bruno", { delay: 0 });

    cy.typeAndValidate(cacTatPage.lastNameInput, "Miguel", { delay: 0 });

    cy.typeAndValidate(cacTatPage.emailInput, "email@email.com", { delay: 0 });

    cy.typeAndValidate(cacTatPage.phoneInput, "5551988334455", { delay: 0 });

    cy.typeAndValidate(cacTatPage.openTextAreaInput, "random text", {
      delay: 0,
    });

    cy.contains("Enviar").click();

    cy.get(cacTatPage.successMessage)
      .should("be.visible")
      .and("contain.text", "Mensagem enviada com sucesso.");
  });

  it("Should display error message when provided email is invalid", () => {
    cy.typeAndValidate(cacTatPage.firstNameInput, "Bruno", { delay: 0 });

    cy.typeAndValidate(cacTatPage.lastNameInput, "Miguel", { delay: 0 });

    cy.typeAndValidate(cacTatPage.emailInput, "email.com", { delay: 0 });

    cy.typeAndValidate(cacTatPage.phoneInput, "5551988334455", { delay: 0 });

    cy.typeAndValidate(cacTatPage.openTextAreaInput, "random text", {
      delay: 0,
    });
    cy.contains("Enviar").click();

    cy.get(cacTatPage.errorMessage)
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!");
  });
});
