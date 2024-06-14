describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174');

    cy.get('input[type="email"]').type('maremotosutnami@gmail.com');
    cy.get('input[type="password"]').type('Maremoto123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    cy.visit('http://localhost:5174/dashboard?tab=profile');
  });

  it('should have an h1 element with text "Perfil"', () => {
    
    cy.get('h1').should('be.visible').and('contain.text', 'Perfil');
  });
});
