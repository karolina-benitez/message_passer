describe('My First Test', () => {
    it('Loads the message passer page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#message-box')
        cy.contains('Enter your message')
        cy.get('#generate-button')
    })
})