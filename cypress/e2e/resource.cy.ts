// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
describe("Resource Tests", () => {
  let selected_org: any;
  let count: any;

  // Trigger before Each Test
  beforeEach(() => {
    count = 0;
    selected_org = "";
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=organization:*`,
    }).as("filter_by_org");
    cy.intercept({
      method: "GET",
      url: `${Cypress.config(
        "baseUrl"
      )}/_next/data/development/en/%40*/*.json?org=%40*&dataset=*`,
    }).as("dataset_metadata");
  });

  it("Check filters in the sidebar", () => {
    cy.visit({
      url: `${Cypress.config("baseUrl")}/search?q=`,
    }).then(() => {
      cy.contains("Refine by Organization");
      cy.get('[type="checkbox"]').eq(0).check();
      cy.wait("@filter_by_org").then((interception) => {
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );
            count = interception.response?.body?.result?.count;
          });
      });
    });
    const selected_org = "";

    cy.get('[type="checkbox"]')
      .eq(0)
      .invoke("val")
      .then((selected) => {
        const selected_org = selected;
        if (count > 0) {
          cy.get("div.place-content-start > a").first().click();
          cy.url().should("include", `${selected_org}`);
        }
      });

    cy.wait(2000);
  });

  // Preview
  it("Check preview in the resources", () => {
    cy.visit({
      url: `${Cypress.config("baseUrl")}/search?q=`,
    }).then(() => {
      cy.contains("Refine by Organization");
      cy.get('[type="checkbox"]').first().check();
      cy.wait("@filter_by_org").then((interception) => {
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );
            count = interception.response?.body?.result?.count;
          });
        const selected_org = "";

        cy.get('[type="checkbox"]')
          .first()
          .invoke("val")
          .then((selected) => {
            const selected_org = selected;
            if (count > 0) {
              cy.get("div.place-content-start > a").first().click();
              cy.url().should("include", `${selected_org}`);
              // Check preview link for a resource
              cy.wait("@dataset_metadata").then((interception) => {
                cy.wait(2000);
                cy.get("header.scroll-snap-x > nav > a")
                  .eq(0)
                  .click()
                  .then(() => {
                    cy.url().should("include", "#resources");
                    cy.get("div.justify-start > a")
                      .eq(1)
                      .contains("Preview")
                      .click();
                    cy.wait(1000);
                    cy.url().should(
                      "include",
                      `${interception.response?.body?.pageProps?.dataset?.resources[0].id}`
                    );
                  });
                cy.get("div.inline-flex > button")
                  .click()
                  .then(() => {
                    console.log("Clicked");
                  });
              });
              // TODO - Preview is not visible yet so next tests are pending.
            }
          });
      });
    });
  });
});

export {};
