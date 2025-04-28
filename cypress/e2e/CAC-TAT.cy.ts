import { cacTatPage } from "../support/locators/cac-tat-page";

describe("CAC TAT", () => {
  beforeEach(() => cy.visit("../../src/index.html"));

  it("Validate app's title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  context("Mandatory fields", () => {
    it("Should fill the required fields and send the form", () => {
      const longText = Cypress._.repeat("random text", 30);

      cy.get(cacTatPage.firstNameInput).type("Bruno");
      cy.get(cacTatPage.lastNameInput).type("Miguel");
      cy.get(cacTatPage.emailInput).type("email@email.com");
      cy.get(cacTatPage.openTextAreaInput).type(longText, { delay: 0 });

      cy.contains("button", "Enviar").click();
      cy.get(cacTatPage.successMessage)
        .should("be.visible")
        .and("contain.text", "Mensagem enviada com sucesso.");
    });

    it("Should display error message when provided email is invalid", () => {
      cy.get(cacTatPage.emailInput).type("email.com");

      cy.contains("button", "Enviar").click();

      cy.get(cacTatPage.errorMessage)
        .should("be.visible")
        .and("contain.text", "Valide os campos obrigatórios!");
    });

    it("Should display error message when phone input is not numbers", () => {
      cy.get(cacTatPage.phoneInput).type("invalidNumber");
      cy.get(cacTatPage.phoneInput).should("have.value", "");
    });

    it("Should display error message when phone input is required but not provided", () => {
      cy.get(cacTatPage.firstNameInput).type("Bruno");
      cy.get(cacTatPage.lastNameInput).type("Miguel");
      cy.get(cacTatPage.emailInput).type("email@email.com");
      cy.get(cacTatPage.openTextAreaInput).type("random text");

      cy.get(cacTatPage.phoneCheckbox).check();

      cy.contains("button", "Enviar").click();

      cy.get(cacTatPage.errorMessage)
        .should("be.visible")
        .and("contain.text", "Valide os campos obrigatórios!");
    });

    it("Should be able clear input text fields", () => {
      cy.get(cacTatPage.firstNameInput)
        .type("Bruno")
        .should("have.value", "Bruno");
      cy.get(cacTatPage.firstNameInput).clear().should("have.value", "");

      cy.get(cacTatPage.lastNameInput)
        .type("Miguel")
        .should("have.value", "Miguel");
      cy.get(cacTatPage.lastNameInput).clear().should("have.value", "");

      cy.get(cacTatPage.emailInput)
        .type("email@email.com")
        .should("have.value", "email@email.com");
      cy.get(cacTatPage.emailInput).clear().should("have.value", "");

      cy.get(cacTatPage.phoneInput)
        .type("5551988112233")
        .should("have.value", "5551988112233");
      cy.get(cacTatPage.phoneInput).clear().should("have.value", "");

      cy.get(cacTatPage.openTextAreaInput)
        .type("random text")
        .should("have.value", "random text");
      cy.get(cacTatPage.openTextAreaInput).clear().should("have.value", "");
    });

    it("Should display error message when required fields are not typed", () => {
      cy.contains("button", "Enviar").click();

      cy.get(cacTatPage.errorMessage)
        .should("be.visible")
        .and("contain.text", "Valide os campos obrigatórios!");
    });

    it("Should submit the form successfully using a custom command", () => {
      cy.fillMandatoryFieldsAndSubmit();

      cy.get(cacTatPage.successMessage)
        .should("be.visible")
        .and("contain.text", "Mensagem enviada com sucesso.");
    });
  });

  context("Select field tests", () => {
    const selectValues = ["blog", "cursos", "mentoria", "youtube"];

    selectValues.forEach((value) => {
      it(`Should select value '${value}' accordingly`, () => {
        cy.get(cacTatPage.selectField)
          .select(value)
          .should("have.value", value);
      });
    });

    it("Should not be able to select 'Selecione' after have already selected an option", () => {
      cy.get(cacTatPage.selectField)
        .should("not.have.value")
        .select(selectValues[0]);

      cy.get(cacTatPage.selectField)
        .find("option")
        .contains("Selecione")
        .should("be.disabled");
    });

    it("Should select a product (youtube) by the text", () => {
      cy.get(cacTatPage.selectField)
        .select("YouTube")
        .should("have.value", "youtube");
    });

    it("Should select a product (mentoria) by the value", () => {
      cy.get(cacTatPage.selectField)
        .select("mentoria")
        .should("have.value", "mentoria");
    });

    it("Should select a product (blog) by the index", () => {
      cy.get(cacTatPage.selectField).select(1).should("have.value", "blog");
    });
  });

  context.only("Radio input tests", () => {
    it("Should check 'feedback' option", () => {
      cy.get(cacTatPage.radioSupportType)
        .find("input[value='feedback']")
        .check()
        .should("be.checked");
    });
  });
});
