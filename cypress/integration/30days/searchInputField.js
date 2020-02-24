/// <reference types="cypress" />

describe("Product searching", () => {
    beforeEach( () => {
        cy.visit('http://automationpractice.com/index.php');
    })

    it("Searching products - valid and invalid input",  () => {
        const inputs = [
            {product: 'dress', returned_info: 'Sort by'},
            {product: 'xxxTT^&LL', returned_info: 'No results'},
            {product: ' ', returned_info: 'No results'}
        ]

        inputs.forEach(input => {
            const {product, returned_info} = input
            cy.get('#search_query_top').type(product)
            cy.get('.button-search').click()
            cy.url().should('include', 'submit_search=')
            cy.contains(returned_info).should('be.visible')
            cy.get('.search_query').clear()
        })

        // click search when there is no input
        cy.get('.button-search').click()
        cy.contains('Please enter a search keyword').should('be.visible')
    })
})