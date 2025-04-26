describe("CAC TAT", () => {
  beforeEach(() => cy.visit("../../src/index.html"));

  it("Validate app's title", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Should fill the required fields and send the form", () => {
    cy.typeAndValidate("#firstName", "Bruno", { delay: 0 });

    cy.typeAndValidate("#lastName", "Miguel", { delay: 0 });

    cy.typeAndValidate("#email", "email@email.com", { delay: 0 });

    cy.typeAndValidate("#phone", "5551988334455", { delay: 0 });

    cy.typeAndValidate("#open-text-area", "random text", { delay: 0 });

    cy.contains("Enviar").click();

    cy.get(".success")
      .should("be.visible")
      .and("contain.text", "Mensagem enviada com sucesso.");
  });
});
