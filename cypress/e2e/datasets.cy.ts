// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
describe("Dataset Page Tests", () => {
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

  it("check filters in the sidebar", () => {
    cy.visit({
      url: `${Cypress.config("baseUrl")}/search?q=`,
    }).then(() => {
      cy.contains("Refine by Organization");
      cy.get('[type="checkbox"]').eq(0).check();

      // Verify the API Call
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
    selected_org = "";

    cy.get('[type="checkbox"]')
      .eq(0)
      .invoke("val")
      .then((selected) => {
        const selected_org = selected;
        // Validate the next steps when datasets exists on list
        if (count > 0) {
          cy.get("div.place-content-start > a").first().click();
          cy.url().should("include", `@${selected_org}`);

          // Check the dataset Metadata
          cy.wait("@dataset_metadata").then((interception) => {
            cy.wait(2000);
            cy.get("h4.tracking-wider")
              .first()
              .next()
              .invoke("text")
              .then((text) => {
                expect(text.toString()).to.contain(
                  `${interception.response?.body?.pageProps?.dataset?.author}`
                );
              });

            cy.get("h4.tracking-wider")
              .first()
              .next()
              .invoke("text")
              .then((text) => {
                expect(text.toString()).to.contain(
                  `${interception.response?.body?.pageProps?.dataset?.author}`
                );
              });
            cy.get("h4.tracking-wider")
              .eq(1)
              .next()
              .invoke("text")
              .then((text) => {
                expect(text.toString()).to.contain(
                  `${interception.response?.body?.pageProps?.dataset?.author_email}`
                );
              });
            cy.get("h4.tracking-wider")
              .first()
              .next()
              .invoke("text")
              .then((text) => {
                expect(text.toString()).to.contain(
                  `${interception.response?.body?.pageProps?.dataset?.author}`
                );
              });
            cy.get("h4.tracking-wider")
              .first()
              .next()
              .invoke("text")
              .then((text) => {
                expect(text.toString()).to.contain(
                  `${interception.response?.body?.pageProps?.dataset?.author}`
                );
              });
          });

          // Nav buttons Click for the Information Tab
          cy.wait(1000);
          cy.get("header.scroll-snap-x > nav > a")
            .first()
            .click()
            .then(() => {
              cy.url().should("include", "#resources");
            });

          // Nav buttons Click for the Resources Tab
          cy.wait(1000);
          cy.get("header.scroll-snap-x > nav > a")
            .eq(1)
            .click()
            .then(() => {
              cy.url().should("include", "#information");
            });

          // Nav buttons Click for the Activity Stream Tab
          cy.get("header.scroll-snap-x > nav > a")
            .eq(2)
            .click()
            .then(() => {
              cy.url().should("include", "#activity-stream");
            });
        }
      });
  });

  // Validate the Download functionlity;
  it("check download in the resources", () => {
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
        const selected_org = "";

        cy.get('[type="checkbox"]')
          .eq(0)
          .invoke("val")
          .then((selected) => {
            const selected_org = selected;
            if (count > 0) {
              cy.get("div.place-content-start > a").first().click();
              cy.url().should("include", `@${selected_org}`);
              //Check download in resources
              cy.wait(1000);
              cy.get("header.scroll-snap-x > nav > a")
                .eq(0)
                .click()
                .then(() => {
                  cy.url().should("include", "#resources");
                  cy.get("div.justify-start > a")
                    .first()
                    .contains("Download")
                    .click();
                  cy.readFile("cypress/downloads/updated_file.csv");

                  cy.url().should("include", "#resources");

                  // timeout issue will come due to the cypress problem (https://github.com/cypress-io/cypress/issues/14857)
                });
            }
          });
      });
    });
  });

  // Preview
  it("check preview in the resources", () => {
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
        const selected_org = "";

        cy.get('[type="checkbox"]')
          .eq(0)
          .invoke("val")
          .then((selected) => {
            const selected_org = selected;
            if (count > 0) {
              cy.get("div.place-content-start > a").first().click();
              cy.url().should("include", `@${selected_org}`);
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
                    cy.wait(4000);
                    cy.url().should(
                      "include",
                      `${interception.response?.body?.pageProps?.dataset?.resources[0].id}`
                    );
                    // TODO - Preview is not visible yet so next tests are pending.
                  });
              });
            }
          });
      });
    });
  });
});

export {};
