import { page, data } from "../../../shared-data/head-function-export.js"

Cypress.on("uncaught:exception", err => {
  if (
    (err.message.includes("Minified React error #418") ||
      err.message.includes("Minified React error #423") ||
      err.message.includes("Minified React error #425")) &&
    Cypress.env(`TEST_PLUGIN_OFFLINE`)
  ) {
    return false
  }
})

describe(`Head function export html insertion`, () => {
  it(`should work with static data`, () => {
    cy.visit(page.basic).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.static.base)
    cy.getTestElement(`title`).should(`have.text`, data.static.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.static.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.static.noscript)
    cy.getTestElement(`style`).should(`contain`, data.static.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.static.link)
    cy.getTestElement(`jsonLD`).should(`have.text`, data.static.jsonLD)
  })

  it(`should work with data from a page query`, () => {
    cy.visit(page.pageQuery).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.queried.base)
    cy.getTestElement(`title`).should(`have.text`, data.queried.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.queried.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.queried.noscript)
    cy.getTestElement(`style`).should(`contain`, data.queried.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.queried.link)
  })

  it(`should work when a Head function with static data is re-exported from the page`, () => {
    cy.visit(page.reExport).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.static.base)
    cy.getTestElement(`title`).should(`have.text`, data.static.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.static.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.static.noscript)
    cy.getTestElement(`style`).should(`contain`, data.static.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.static.link)
    cy.getTestElement(`jsonLD`).should(`have.text`, data.static.jsonLD)
  })

  it(`should work when an imported Head component with queried data is used`, () => {
    cy.visit(page.staticQuery).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.queried.base)
    cy.getTestElement(`title`).should(`have.text`, data.queried.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.queried.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.queried.noscript)
    cy.getTestElement(`style`).should(`contain`, data.queried.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.queried.link)
  })

  it(`should work in a DSG page (exporting function named config)`, () => {
    cy.visit(page.dsg).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.dsg.base)
    cy.getTestElement(`title`).should(`have.text`, data.dsg.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.dsg.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.dsg.noscript)
    cy.getTestElement(`style`).should(`contain`, data.dsg.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.dsg.link)
  })

  it(`should work in an SSR page (exporting function named getServerData)`, () => {
    cy.visit(page.ssr).waitForRouteChange()
    cy.getTestElement(`base`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.ssr.base)
    cy.getTestElement(`title`).should(`have.text`, data.ssr.title)
    cy.getTestElement(`meta`)
      .invoke(`attr`, `content`)
      .should(`equal`, data.ssr.meta)
    cy.getTestElement(`noscript`).should(`have.text`, data.ssr.noscript)
    cy.getTestElement(`style`).should(`contain`, data.ssr.style)
    cy.getTestElement(`link`)
      .invoke(`attr`, `href`)
      .should(`equal`, data.ssr.link)
    cy.getTestElement(`server-data`)
      .invoke(`attr`, `content`)
      .should(`equal`, JSON.stringify(data.ssr.serverData))
  })
})