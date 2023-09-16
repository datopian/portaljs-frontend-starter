// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

describe("Search Tests", () => {
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
      )}/api/3/action/package_search?start=5&rows=5&q=test`,
    }).as("search_text");
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=0&rows=5`,
    }).as("page_load");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=organization:*`,
    }).as("filter_by_org");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=groups:*`,
    }).as("filter_by_groups");
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=tags:*`,
    }).as("filter_by_keyword");
    // Combined filters with org and groups
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=groups:*+organization:*`,
    }).as("filter_by_org_groups");
    // Combined filters with org and tags
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=5&rows=5&fq=organization:*+tags:*`,
    }).as("filter_by_org_tags");
    // Combined filters with org, groups and tags
    cy.intercept({
      method: "GET",
      url: `${Cypress.env(
        "backendBaseUrl"
      )}/api/3/action/package_search?start=0&rows=5&fq=groups:*+organization:*+tags:*`,
    }).as("filter_by_org_groups_tags");
  });

  it("Check search in the searchbar", () => {
    cy.visit({
      url: `${Cypress.config("baseUrl")}/search?q=`,
    }).then((resp) => {
      cy.wait("@page_load").then((interception) => {
        cy.wait(1000);
        cy.get("div.grid.grid-cols-1.gap-4.homepage-padding > h2")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception?.response?.body?.result?.count} datasets`
            );
          });
      });
      cy.get('input[name="query"]').type("test");
      cy.get('button[class*="rounded-lg bg-accent"]')
        .contains("SEARCH")
        .click()
        .then(() => {
          cy.wait("@search_text").then((interception) => {
            cy.wait(1000);
            cy.get("div.grid.grid-cols-1.gap-4.homepage-padding > h2")
              .invoke("text")
              .then((text) => {
                expect(text.toString().toLowerCase()).to.contain(
                  `${interception?.response?.body?.result?.count} datasets`
                );
              });
          });
        });
    });
  });

  it("Check filters in the sidebar", () => {
    cy.visit({
      url: "http://localhost:3000/search?q=",
    }).then(() => {
      cy.contains("Refine by Organization");
      cy.get('[type="checkbox"]').first().check();
      cy.wait("@filter_by_org").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );
            cy.get('[type="checkbox"]').first().uncheck();
          });
      });

      cy.wait(1000);
      cy.contains("Refine by Group");
      cy.get('[type="checkbox"]').first().uncheck();
      cy.get('input[name="groups"]').first().check();

      cy.wait("@filter_by_groups").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );

            cy.get('input[name="groups"]').first().uncheck();
          });
      });

      cy.wait(1000);
      cy.get('input[name="tags"]').first().check({ force: true });

      cy.wait("@filter_by_keyword").then((interception) => {
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );
            cy.get('input[name="tags"]').first().uncheck({ force: true });
          });
      });

      // Combined org & group
      cy.wait(100);
      cy.get('input[name="groups"]').first().check();
      cy.get('input[name="orgs"]').first().check();

      cy.wait("@filter_by_org_groups").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );

            cy.get('input[name="groups"]').first().uncheck();
            cy.get('input[name="orgs"]').first().uncheck();
          });
      });

      // Combined org & tags
      cy.wait(100);
      cy.get('input[name="orgs"]').first().check();
      cy.get('input[name="tags"]').first().check({ force: true });

      cy.wait("@filter_by_org_tags").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );

            cy.get('input[name="orgs"]').first().uncheck();
            cy.get('input[name="tags"]').first().uncheck({ force: true });
          });
      });

      // Combined org, groups & tags
      cy.wait(100);
      cy.get('input[name="orgs"]').first().check();
      cy.get('input[name="groups"]').first().check();
      cy.get('input[name="tags"]').first().check({ force: true });
      cy.wait("@filter_by_org_groups_tags").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );

            cy.get('input[name="orgs"]').first().uncheck();
            cy.get('input[name="groups"]').first().uncheck();
            cy.get('input[name="tags"]').first().uncheck({ force: true });
          });
      });
      // Click on dataset
      cy.contains("Refine by Organization");
      cy.get('[type="checkbox"]').first().check();
      cy.wait("@filter_by_org").then((interception) => {
        console.log(interception);
        cy.wait(1000);
        cy.get("h2.text-4xl.capitalize.font-bold.text-zinc-900")
          .invoke("text")
          .then((text) => {
            expect(text.toString().toLowerCase()).to.contain(
              `${interception.response?.body?.result?.count} datasets`
            );
          });
        let selected_org = "";

        cy.get('[type="checkbox"]')
          .first()
          .invoke("val")
          .then((selected) => {
            selected_org =
              selected && typeof selected === "string"
                ? selected
                : "No org found";
            if (count > 0) {
              cy.get("div.place-content-start > a").first().click();
              cy.url().should("include", selected_org);
            }
          });
      });
    });
  });
});

export {};
