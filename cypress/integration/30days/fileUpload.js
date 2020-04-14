/// <reference types="cypress" />

context('File upload in contact form page', () => {
    beforeEach(() => {
      cy.visit('http://automationpractice.com/index.php')
    })

    it('Send message to a fileupload', ()=> {
        cy.contains('Contact us').click();
        cy.url().should('include', 'controller=contact');

        //Fill in all fields. 
        cy.get('#message').type('messsssage');
        cy.get('#id_contact').select('Webmaster');
        cy.get('#email').type('test@test.pl');
        cy.get('#id_order').type('xxxx');

        //Before uploading file assert empty input filed text placeholder. 
        cy.get('.filename').should('contain', 'No file selected');

        //Get file to upload from fixture. 
        //Get file upload input field. 
        //Provide its properties. 
        const yourFixturePath = 'example.txt';
        cy.get('#fileUpload').attachFile(yourFixturePath);

        //Check if file is uploaded by asserting input filed text. 
        cy.get('.filename').should('contain', 'example.txt');
        //Submit form. 
        cy.get("#submitMessage").click();
        //Assert if url is the same 
        cy.url().should('include', 'controller=contact')
        cy.get('.alert').should('contain', 'Your message has been successfully sent to our team.');
    })

})

/* 
Cypress doesn’t provide direct support for file upload yet.
However npm package has been created to make file upload easier:https://github.com/abramenal/cypress-file-upload
As the next step in my test, it would be good for sure, to make assertion by calling the application API and verifying if file is truly uploaded (TODO).
*/