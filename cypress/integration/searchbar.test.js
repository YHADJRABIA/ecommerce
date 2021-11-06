/* eslint-disable no-undef */

const titles = [
  "Henri Potier",
  "et",
  "Azkaban",
  "Henri Potier et la Chambre des secrets",
  "012345",
];

describe("Filtering data based on search input", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
    //Clearing input field every time
    cy.get("[data-testid=search-value]").clear();
  });

  it("Displays all books when nothing is typed", () => {
    cy.get("[data-testid=search-value]");
    cy.get(".book").should("have.length", 7);
  });

  it("Displays all books when a shared value is typed", () => {
    cy.get("[data-testid=search-value]").type(titles[0]).wait(500);
    cy.get(".book").should("have.length", 7);
  });

  it("Displays 6 books when a shared value is typed", () => {
    cy.get("[data-testid=search-value]").type(titles[1]).wait(500);
    cy.get(".book").should("have.length", 6);
  });

  it("Displays a specific book matching the typed value", () => {
    cy.get("[data-testid=search-value]").type(titles[2]).wait(500);
    cy.get(".book").should("have.length", 1);
    cy.get("[data-testid=search-value]").clear();
    cy.get("[data-testid=search-value]").type(titles[3]).wait(500);
    cy.get(".book").should("have.length", 1);
  });

  it("Displays a not-found message when no match is found.", () => {
    cy.get("[data-testid=search-value]").type(titles[4]).wait(500);
    cy.get(".book-not-found").should("be.visible");
  });
});
