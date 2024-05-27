// Pruebas para la página DashUsers

describe("DashUsers", () => {
    beforeEach(() => {
      // Iniciar sesión como usuario admin antes de cada prueba
      cy.visit("http://localhost:5174");
        cy.get('input[type="email"]').type('natalia@correo.com');
        cy.get('input[type="password"]').type('natalia123');
        cy.get('button[type="submit"]').click();
      cy.visit("http://localhost:5174/dashboard?tab=users");
    });
  
    it("Muestra la tabla de usuarios", () => {
      cy.get('table').should('exist');
      cy.get('thead th').should('have.length', 5);
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  
    it("Muestra el botón 'Mostrar más' si hay más usuarios", () => {
      cy.get('button').contains('Mostrar más').should('exist');
    });
  
    it("Carga más usuarios al hacer clic en 'Mostrar más'", () => {
        cy.get('tbody tr').then(($rows) => {
          const initialUserCount = $rows.length;
          cy.get('button').contains('Mostrar más').click();
          cy.get('tbody tr').should('have.length.greaterThan', initialUserCount);
        });
      });
  
    it("Muestra el modal de confirmación al hacer clic en 'Borrar'", () => {
      cy.get('td span').contains('Borrar').first().click();
      cy.get('.modal').should('exist');
    });
  
    it("No elimina un usuario al confirmar en el modal", () => {
      const userToDelete = Cypress.$('tbody tr').first();
      const userId = userToDelete.data('user-id');
      cy.get('td span').contains('Borrar').first().click();
      cy.server();
      cy.route({
        method: 'DELETE',
        url: `/api/user/delete/${userId}`,
        status: 200,
        response: {}
      }).as('deleteUser');
      cy.get('.modal button').contains('Yes, I\'m sure').click();
      cy.wait('@deleteUser');
      cy.get(`tbody tr[data-user-id="${userId}"]`).should('exist');
    });
  
    it("No muestra la tabla si no hay usuarios", () => {
      // Eliminar todos los usuarios de prueba
      cy.deleteTestUsers();
      cy.visit("http://localhost:5174/dashboard?tab=users");
      cy.get('table').should('not.exist');
      cy.contains('You have no users yet!').should('exist');
    });
  });