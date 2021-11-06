/* eslint-disable no-undef */
describe("Switching the language", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
    cy.clearLocalStorage();
  });

  it("Updates the view and local storage when changing the language", () => {
    cy.contains("Boutique de livres").should("be.visible");

    cy.get("[data-testid=switch-lang]")
      .click()
      .should(() => {
        expect(localStorage.getItem("lang")).to.eq('"en"');
      });
    cy.contains("Book store").should("exist");
    cy.clearLocalStorage("lang").should((ls) => {
      expect(ls.getItem("lang")).to.be.null;
    });
  });

  it("Persists language when reloading the page", () => {
    cy.get("[data-testid=switch-lang]")
      .click()
      .should(() => {
        expect(localStorage.getItem("lang")).to.eq('"en"');
      });

    cy.reload();

    cy.get("[data-testid=switch-lang]")
      .click()
      .should(() => {
        expect(localStorage.getItem("lang")).to.eq('"fr"');
      });
  });
});
