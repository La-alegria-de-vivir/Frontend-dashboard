describe('Sidebar Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174');

    // Log in
    cy.get('input[type="email"]').type('maremotosutnami@gmail.com');
    cy.get('input[type="password"]').type('Maremoto123');
    cy.get('button[type="submit"]').click();

    // Wait for the dashboard to load
    cy.wait(2000); // Adjust according to your application's loading time

    cy.url().should('include', '/dashboard');
  });

  it('should navigate to Profile tab and highlight it', () => {
    cy.get('a[href="/dashboard?tab=profile"]').click();
    cy.url().should('include', 'tab=profile');
    cy.get('div').contains('Perfil').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
  });

  context('when user is admin', () => {
    beforeEach(() => {
      // Check if the user is admin
      cy.get('input[type="email"]').then($emailInput => {
        const email = $emailInput.val();
        // Assume maremotosutnami@gmail.com is admin
        if (email === 'maremotosutnami@gmail.com') {
          cy.wrap({ isAdmin: true }).as('adminUser');
        } else {
          cy.wrap({ isAdmin: false }).as('adminUser');
        }
      });
    });

    it('should navigate to Menu tab and highlight it', function () {
      if (this.adminUser.isAdmin) {
        cy.get('a[href="/dashboard?tab=menu"]').click();
        cy.url().should('include', 'tab=menu');
        cy.get('div').contains('Menu').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      } else {
        cy.log('El usuario no es administrador');
      }
    });

    it('should navigate to Reservations tab and highlight it', function () {
      if (this.adminUser.isAdmin) {
        cy.get('a[href="/dashboard?tab=reservations"]').click();
        cy.url().should('include', 'tab=reservations');
        cy.get('div').contains('Reservas').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      } else {
        cy.log('El usuario no es administrador');
      }
    });

    it('should navigate to Users tab and highlight it', function () {
      if (this.adminUser.isAdmin) {
        cy.get('a[href="/dashboard?tab=users"]').click();
        cy.url().should('include', 'tab=users');
        cy.get('div').contains('Usuarios').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      } else {
        cy.log('El usuario no es administrador');
      }
    });
  });

  it('should sign out when clicking on the sign out button', () => {
    cy.get('div').contains('Salir').click();
    cy.url().should('eq', 'http://localhost:5174/');
  });
});