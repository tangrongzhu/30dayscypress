/// <reference types="cypress" />

describe("Product searching", () => {
    beforeEach( () => {
        cy.visit('http://automationpractice.com/index.php');
    })

    it("Product seasrch - verify if autocomplete drop-down list for seasrch input field is selectable", () => {
        // Get product seach input field
        cy.get('#search_query_top').type("dress")

        //Get whole autocomplete drop-down list element
        //And find all <li> tags within it
        //Check if there is <li> tag which contains "Dress" text
        //Click on the returned element
        cy.get(".ac_results", {timeout:5000}).find("li").should('include.text', 'Dress')
        cy.get(".ac_results").find("li").contains("Dress").click()

        cy.url().should('include', 'controller=product')
    })

    it("Product page - verify if size input field has pre-selected option", () => {
        cy.get('#homefeatured').find('li').first().click()
        cy.get('#group_1').find('option').contains('L').should('not.have.attr', 'selected')
        cy.get('#group_1').find('[title=S]').should('have.attr', 'selected')
    })

    /*notes:
    1. cy.get() it takes selector and looks for it with DOM element returned by previous dommand in give sequence.
    2. contains() return only the first matching element, So even if we have more than one <li> tag that has “Dress” text only first is yielded.
    3. How cypress checks element visibility: Visibility of element can be strictly dependent on its parent properties.
        An element is considered hidden if:
        Its width or height is 0.
        Its CSS property (or ancestors) is visibility: hidden.
        Its CSS property (or ancestors) is display: none.
        Its CSS property is position: fixed and it’s offscreen or covered up.
    */

})