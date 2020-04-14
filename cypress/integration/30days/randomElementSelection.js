/// <reference types="cypress" />

context('Testing check box', () => {
    beforeEach(() => {
      cy.visit('http://automationpractice.com/index.php')
    })

    // random checkbox checking and unchecking
    it.only('Category page - random checkbox checking and unchecking', () => {

        var x = Math.floor(Math.floor(Math.random() * 18))
        cy.get('a.sf-with-ul[title="Women"]').click()

        cy.get('.checkbox').its(x).check().parent().should('have.class','checked')

        // get the length property of a DOM element
        cy.get('.checkbox').its('length').should('be.gt', 1) // ensure the lenght is grater than 2

        // Function to generate random number
        const randomGenerator = (number) => {
            return Math.round(Math.random() * (number -1))
        }

        cy.get('.checkbox').its('length').then(ele => {
            const listElementNumber = randomGenerator(ele)

            cy.get('.checkbox').eq(listElementNumber).check().parent().should('have.class','checked').then(($checkbox) => {
                cy.get($checkbox).find('.checkbox').uncheck().parent().should('not.have.class', 'checked')
            })

        })

    })

    /**
     * its() gets requested property of previous element
     * its() gets array length
     * eq() takes index and gives element which is located at this sepcifix index in array of elements
     */

     /**
      * cyspress asynchronicity and how then() helps to deal with it.
      * according Cypress documentation”Cypress commands don’t do anything at the moment they are invoked, but rather enqueue themselves to be run later”.
      */

})
