/* eslint-disable no-undef */

const { baseUrl } = Cypress.config();

describe("Adding item to cart", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
    // Adding first item
    cy.get("[data-testid=add-to-cart]").first().click({ force: true });
  });

  it("Notifies the user with a toast message", () => {
    cy.contains("Livre rajouté").should("be.exist");
  });

  it("Updates the count and cart badge correctly", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("count")
      .should("be.equal", 1);

    cy.get("[data-testid=add-to-cart]").first().click({ force: true });
    cy.get("[data-testid=add-to-cart]").last().click({ force: true });

    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("count")
      .should("be.equal", 3);

    cy.get("[data-testid=cart-badge]").contains(3).should("be.visible");
  });

  it("Resets the count and hides cart badge when clearing cart", () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("count")
      .should("be.equal", 0);
    cy.get("[data-testid=cart-badge]").should("not.exist");
  });

  it("Updates the total price correctly", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("total")
      .should("be.equal", 35);
    cy.get("[data-testid=add-to-cart]").last().click({ force: true });
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("total")
      .should("be.equal", 70);
  });

  it("Persists cart after reloading the page", () => {
    cy.get("[data-testid=add-to-cart]").last().click({ force: true });
    cy.reload();

    cy.get("[data-testid=add-to-cart]").last().click({ force: true });
    cy.window()
      .its("store")
      .invoke("getState")
      .its("cart")
      .its("count")
      .should("be.equal", 3);
  });
});
