declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get element, type specific text and validate
     * it was written correctly
     * @example cy.typeAndValidate("#firstname", "John");
     */
    typeAndValidate(
      selector: string,
      text: string,
      typeOptions?: object
    ): Chainable<void>;
  }
}
