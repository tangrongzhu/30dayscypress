describe("Product searching", () => {
    beforeEach( () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.fixture('inputData.json').as('inputs');
    })

    it("Searching products - valid and invalid input",  () => {
        // const products02 = [
        //     {product: 'dress', returned_info: 'Sort by'},
        //     {product: 'xxxTT^&LL', returned_info: 'No results'},
        //     {product: ' ', returned_info: 'No results'}
        // ]

        cy.get('@inputs').then((inputs) => {
            const products02 = inputs.products02;
            products02.forEach(ele => {
                const {product, returned_info} = ele
                cy.get('#search_query_top').type(product)
                cy.get('.button-search').click()
                cy.url().should('include', 'submit_search=')
                cy.contains(returned_info).should('be.visible')
                cy.get('.search_query').clear()
                });

        // const products01 = {
        //     "product": [
        //         "dress",
        //         "xxxTT^&LL",
        //         " "
        //     ],
        //     "returned_info": [
        //         "Sort by",
        //         "No results",
        //         "No results"
        //     ]
        // }
        
            const products01 = inputs.products01;
            for(let i in products01.product){
                const product = products01.product[i]
                const returned_info = products01.returned_info[i]
                cy.get('#search_query_top').type(product)
                cy.get('.button-search').click()
                cy.url().should('include', 'submit_search=')
                cy.contains(returned_info).should('be.visible')
                cy.get('.search_query').clear()
            }

        })

        // click search when there is no input
        cy.get('.button-search').click()
        cy.contains('Please enter a search keyword').should('be.visible')
    })
})

/**
 * using fixture to load a test data file;
 * We need to use then() callback function, which takes element yielded by previous Cypress command and enables us to work with it.
 * assigned particular data from the input file (array of products) to the variable: const input = inputData.products; and iterated over it.
 */