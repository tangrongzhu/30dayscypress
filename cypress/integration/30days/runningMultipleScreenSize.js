/// <reference types="cypress" />

describe('Website Header tests', () => {
    //HEADER - MOBILE TESTS 
    context('Header - mobile', () => {
      beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
      })

      context('Header - mobile', () => {

        const sizesPhones = ['iphone-6', 'iphone-5']
  
        sizesPhones.forEach((size) => {
          it(`Should display mobile menu on screen size: ${size}`, () => {
            //Change screen size according value from the array. 
            // @ts-ignore
            cy.viewport(size);
            //Check if categories list in menu is not visible 
            cy.get('.sf-menu').should('not.be.visible');
            //Click on "Categories" block
            cy.get('.cat-title').click();
            //Verify if list if categories is presented
            //by clicking on first category. 
            cy.get('.sf-menu').find('li').first().click();
            //Assert new url. 
            cy.url().should('include', 'controller=category');
          })
        })
  
        const sizesTablets = ['ipad-mini', 'ipad-2']
  
        sizesTablets.forEach((size) => {
          it(`Shouldn't display mobile menu on screen size: ${size}`, () => {
            //Change screen size according value from the array. 
            // @ts-ignore
            cy.viewport(size);
            //Check if categories block menu is not visible 
            cy.get('.cat-title').should('not.be.visible');
            //Verify if categories list is visible 
            //by clicking on its firts element.
            cy.get('.sf-with-ul').first().click();
            //Assert new url. 
            cy.url().should('include', 'controller=category');
          })
        })
      })
    })

});