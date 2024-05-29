describe('Verify text-md class existence', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5174');
    });
  
    it('should find elements with class text-md', () => {
      cy.get('.text-md').should('exist');
    });
  });
  