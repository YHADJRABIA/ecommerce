/* eslint-disable no-undef */

const { baseUrl } = Cypress.config();

describe("Homepage rendering", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
  });

  it("Loads the layout correctly", () => {
    cy.get("nav").should("exist");
    cy.get(".hero-container").get("[data-testid=switch-lang]").should("exist");
    cy.get(".search-bar").get("[data-testid=search-value]").should("exist");
    cy.get("footer").should("exist");
  });

  it("Ensures that the navbar is always visible and contains two links and a logo", () => {
    cy.get("nav").get("[data-testid=logo]").should("be.visible");
    cy.get(".nav-menu li").should("have.length", 2);
    cy.get("nav").get("[data-testid=catalog]").should("be.visible");
    cy.get("nav").get("[data-testid=cart]").should("be.visible");
    cy.get("nav").get("[data-testid=burger-menu]").should("not.be.visible");
  });

  it("Changes the navbar's colour after scrolling down", () => {
    cy.scrollTo(0, 80);
    cy.get("nav").should("have.class", "active");
  });

  it("Leads to the right page after clicking the navbar links", () => {
    // Homepage
    cy.get("nav").get("[data-testid=logo]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce`);

    // Cart
    cy.get("nav").get("[data-testid=cart]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce/cart`);

    // Back to Homepage
    cy.get("nav").get("[data-testid=catalog]").click();
    cy.url().should("eq", `${baseUrl}/ecommerce`);
  });

  it("Loads the API's data correctly", () => {
    cy.get(".book").should("have.length", 7);
  });
});

describe("Reponsive mobile layout rendering", () => {
  beforeEach(() => {
    cy.visit("/ecommerce");
  });

  it("Shows nabar correctly with logo only", () => {
    cy.viewport(320, 480);
    cy.get("nav").get("[data-testid=burger-menu]").should("be.visible");
    cy.get("nav").get("[data-testid=logo]").should("be.visible");
    cy.get(".nav-menu li").should("have.length", 2);
    cy.get("nav").get("[data-testid=catalog]").should("not.be.visible");
    cy.get("nav").get("[data-testid=cart]").should("not.be.visible");
  });

  it("Shows navigation menu only when burger icon is clicked", () => {
    cy.viewport(320, 480);
    cy.get("nav").get("[data-testid=burger-menu]").click();
    cy.get("nav").get("[data-testid=catalog]").should("be.visible");
    cy.get("nav").get("[data-testid=cart]").should("be.visible");
  });
});

describe("Cart rendering", () => {
  beforeEach(() => {
    cy.visit("/ecommerce/cart");
  });

  it("Loads the layout correctly", () => {
    cy.get("nav").should("exist");
    cy.get("footer").should("exist");
  });

  it("Shows added books if cart has them", () => {});

  it("Shows SVG is cart is empty", () => {});
});
