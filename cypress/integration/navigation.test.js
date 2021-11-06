/* eslint-disable no-undef */
const { baseUrl } = Cypress.config();

describe("Links redirection", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
  });

  it("Routes to the right page upon clicking navbar links", () => {
    // Homepage
    cy.get("nav").get("[data-testid=logo]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce`);

    // Back to Homepage with link
    cy.get("nav").get("[data-testid=catalog]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce`);
  });

  it("Routes to the cart page when clicking navbar link, or pressing previous button", () => {
    cy.get("nav").get("[data-testid=cart]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce/cart`);

    // Back to Homepage with ◄
    cy.go("back");
    cy.url().should("eq", `${baseUrl}/ecommerce`);
  });
});
