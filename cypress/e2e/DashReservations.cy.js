describe('Profile Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5174');
  
      cy.get('input[type="email"]').type('maremotosutnami@gmail.com');
      cy.get('input[type="password"]').type('Maremoto123');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/dashboard');

      cy.visit('http://localhost:5174/dashboard?tab=reservations');
    });
  
    it('should display the message "Aún no tienes ninguna reserva!" when there are no reservations', () => {
      
      cy.contains('Aún no tienes ninguna reserva!').should('be.visible');
    });
  });
  