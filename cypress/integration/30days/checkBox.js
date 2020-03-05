/// <reference types="cypress" />

context('Testing check box', () => {
    beforeEach(() => {
      cy.visit('http://automationpractice.com/index.php')
    })

    it('Category page - verify if all filter checkboxes can be checked and unchecked', () => {
        //Click first category from menu on main page
        // cy.get('#block_top_menu').find('a.sf-with-ul[title="Women"]').click()
        cy.get('a.sf-with-ul[title="Women"]').click()

        //Verify if User was redirected to the new page
        cy.url().should('include', 'id_category=3')

        //Get all filters checkkoxes.
        //Check all checkboxes. 
        //Get parent of each checkbox. 
        //Verify if parent of each checkbox has class 'checked' which is added when element is checked.
        // cy.get('[type="checkbox"]').check()
        //   .parent().should('have.class', 'checked')
        cy.get('.checkbox').check().parent().should('have.class', 'checked')

        //Get all filters checkkoxes.
        //Uncheck all checkboxes. 
        //Get parent of each checkbox. 
        //Verify if parent of each checkbox doesn't have class 'checked' which is removed when element is unchecked.
        cy.get('.checkbox').uncheck().parent().should('not.have.class', 'checked')
    })

    /**notes:
     * check(), uncheck()
     * parent() returns a parent DOM element for element from previous command.
     * make assertion on parent in very easy way.
     */
})