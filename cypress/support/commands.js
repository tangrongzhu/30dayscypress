// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Click random product on Website Header to navigate to product Page. 
Cypress.Commands.add("clickRandomProduct", () => {
    cy.get('#homefeatured').find('li').its('length').then(($length) => {
      const randomNumber = Cypress._.random(0, $length);
      cy.log('random number', randomNumber);
      cy.get('#homefeatured').find('li').children().eq(randomNumber)
        .contains('More').click();
      cy.url().should('include', 'controller=product');
    })
})

//Click random category on Website Header to navigate to Category Page. 
Cypress.Commands.add("clickRandomCategory", () => {
    cy.get('#block_top_menu').find('ul').first().children()
    .its('length').then(($lenght) => {
      const randomNumber = Cypress._.random(0, $lenght);
      cy.get('#block_top_menu').find('ul').first().children()
     .eq(randomNumber).click();
      cy.url().should('include', 'controller=category');
    })
})

//Search product using 'search' field in Website Header (type productName and submit)
Cypress.Commands.add('searchProduct', (productName) => {
    cy.get('#search_query_top').type(productName);
    cy.get('#searchbox > .btn').click();
    cy.url().should('include', 'submit_search=');
})

import 'cypress-file-upload';

/**
 * Cypress includes loadash library can improve my current test.Cypress._.random(0, $lenght);
 * Cypress._ enables to call any valid loadash method. https://lodash.com/docs
 * best practices: https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
 */

