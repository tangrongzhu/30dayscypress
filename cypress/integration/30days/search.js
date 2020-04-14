/// <reference types="cypress" />
// There's no reason to create something like a cy.search() custom
// command because this behavior is only applicable to a single spec file
//
// Use a regular ol' javascript function folks!
const search = (term, options = {}) => {
    // example massaging to defaults
    _.defaults(options, {
      headers: {},
    })
  
  const { fixture, headers } = options
  
    // return cy chain here so we can
    // chain off this function below
    return cy
      .log(`Searching for: ${term} `)
      .route({
        url: '/search/**',
        response: `fixture:${fixture}`,
        headers: headers,
      })
      .as('getSearchResults')
      .get('#search').type(term)
      .wait('@getSearchResults')
}
  
  it('displays a list of search results', function () {
    cy
      .visit('/page')
      .then(() => {
        search('cypress.io', {
          fixture: 'list',
        })
        .then((reqRes) => {
          // do something with the '@getSearchResults'
          // request such as make assertions on the
          // request body or url params
          // {
          //   url: 'http://app.com/search?cypress.io'
          //   method: 'GET',
          //   duration: 123,
          //   request: {...},
          //   response: {...},
          // }
        })
      })
      .get('#results li').should('have.length', 5)
      .get('#pagination').should('not.exist')
  })
  
  it('displays no search results', function () {
    cy
      .visit('/page')
      .then(() => {
        search('cypress.io', {
          fixture: 'zero',
        })
      })
      .get('#results').should('contain', 'No results found')
  })
  
  it('paginates many search results', function () {
    cy
      .visit('/page')
      .then(() => {
        search('cypress.io', {
          fixture: 'list',
          headers: {
            // trick our app into thinking
            // there's a bunch of pages
            'x-pagination-total': 3,
          }
        })
      })
      .get('#pagination').should(($pagination) => {
        // should offer to goto next page
        expect($pagination).to.contain('Next')
  
        // should have provided 3 page links
        expect($pagination.find('li.page')).to.have.length(3)
      })
  })