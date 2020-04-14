/// <reference types="cypress" />

describe('Website Header tests', () => {
    //HEADER - MOBILE TESTS 
    context('Header - mobile', () => {
      beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
        cy.viewport('iphone-6');
      })

      it(`Should display mobile menu on mobile resolution`, () => {
        cy.get('.sf-menu').should('not.be.visible');
        cy.get('.cat-title').click();
        cy.get('.sf-menu').should('be.visible');
      })
    })

});