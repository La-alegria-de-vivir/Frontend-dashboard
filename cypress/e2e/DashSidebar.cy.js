describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174');

    cy.get('input[type="email"]').type('maremotosutnami@gmail.com');
    cy.get('input[type="password"]').type('Maremoto123');
    cy.get('button[type="submit"]').click();

    // Esperar a que la página se cargue completamente
    cy.wait(2000); // Ajusta según sea necesario

    cy.url().should('include', '/dashboard');
  });

  it('should navigate to Menu tab when clicked (if user is admin)', () => {
    // Alias para el usuario actual
    cy.window().its('store').then(store => {
      const user = store.getState().user.currentUser;
      cy.wrap(user).as('currentUser');
    });

    cy.get('@currentUser').then(currentUser => {
      if (currentUser.isAdmin) {
        // Verifica que el enlace al menú esté presente y haz clic en él
        cy.get('a[href="/dashboard?tab=menu"]').click();

        // Verifica que el menú esté resaltado
        cy.contains('Menu').should('have.css', 'background-color', 'rgb(187, 188, 78)');
      } else {
        // Agrega una aserción para el caso en que el usuario no sea administrador
        cy.log('El usuario no es administrador');
      }
    });
  });
});
