/// <reference types="cypress" />

context('Cart state persistence check', () => {
    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
      })

    it('compare element’s state “after action” with state “after reloading”', () => {
        //Function which asserts state of the Cart containing 1 product.
        const testCartState = () => {
            cy.url().should('include', 'controller=product')
            cy.get('.ajax_cart_quantity').first().invoke('text').should('equal', '1')
        }

        console.log(testCartState);

        //Invoke custom command which navigates to random product page.
        cy.clickRandomProduct();
        //Add selected product to cart
        cy.get('#add_to_cart').click();
        //Select 'to continue shopping' on modal.
        //Assert state of cart (if it presents correct number).
        cy.get('.continue.btn').click().then(testCartState);
        cy.log('test cart state', testCartState);
        //Reload page 
        //and assert the Cart's state (should keep previous number of products
        cy.reload().then(testCartState);
    })
})

/**
 * How to organize test flow to compare element’s state “after action” with state “after reloading”.
 * That reload() command yields window object and I can attach then() callback function to it and perform element state assertion.
 */