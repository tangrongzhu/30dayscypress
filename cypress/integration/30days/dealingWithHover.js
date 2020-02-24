/// <reference types="cypress" />

describe("Product searching", () => {
    beforeEach( () => {
        cy.visit('http://automationpractice.com/index.php');
    })

    it.only('Main page - verify if "View my shopping cart" drop-down is displayed on hover and "Check out" button can be clicked' , () => {
        //Get all "Add to cart buttons" from main page
       //and click on firts button to add product to cart.
       cy.get('.ajax_add_to_cart_button').first().click();
       //Close modal which confirms that product has been added.
       cy.get('.cross').click();

       //Get drop-down cart block and verify if by default it is hidden.
       //Force the drop-down block to be visible by invoke('show').
        cy.get('.cart_block')
            .should('be.hidden')
            .invoke('show')

        // click on checkout button
        cy.get('#button_order_cart').click()

        //Assert redirection to new url.
        cy.url().should('include', 'controller=order');

    })

    /**
    1. found suggested workarounds and use one of it for hover(): https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__hover-hidden-elements/cypress/integration/hover-hidden-elements-spec.js
    2. invoke() commad:
        -invoke() enables us to call a function on element returned by previous command,
        -I invoked ‘show’ which is jQuery function,
        -‘show’ simply enables us to display given element (which was hidden by default in this case),
        -this way I could interact with “hover” element without direct usage hover() command.
     */



})    