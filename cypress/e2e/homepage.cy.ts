// in cypress/support/index.ts
// load type definitions that come with Cypress module

/// <reference types="cypress" />
describe("Home Page Tests", () => {
  it("Check the Links in the Navbar", () => {
    cy.visit({
      url: `${Cypress.config("baseUrl")}`,
    }).then((resp) => {
      cy.get("ul.custom-container > li:nth-child(2) ")
        .children()
        .should("have.length", 3);
      cy.get("ul.custom-container > li:nth-child(2) ")
        .children()
        .each((el) => {
          expect(el.text()).to.be.oneOf([
            "DATASETS",
            "ORGANIZATIONS",
            "GROUPS",
          ]);
          if (el.text() === "DATASETS") {
            expect(el).to.have.attr("href", "/search");
            expect(el).not.to.have.attr("href", "/organizations");
            expect(el).not.to.have.attr("href", "/groups");
          }

          if (el.text() === "ORGANIZATIONS") {
            expect(el).to.have.attr("href", "/organizations");
          }
          if (el.text() === "GROUPS") {
            expect(el).to.have.attr("href", "/groups");
          }
        });
      cy.get("#search2").type("testing");
      cy.get('button[class*="text-lg uppercase"]').contains("Search").click();
      cy.url().should("include", `search?q=testing`);
    });
  });
});

export {};
