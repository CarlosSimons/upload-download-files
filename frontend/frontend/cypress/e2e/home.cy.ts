describe('Página inicial', () => {
    it('Deve carregar a página inicial', () => {
  cy.visit('/')
  cy.contains('Upload e Download de Arquivos').should('exist')
    })
})