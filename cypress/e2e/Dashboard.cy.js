// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
    cy.visit("http://localhost:5174"); // URL de inicio de sesión
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard'); // Asegúrate de que redirige al dashboard
  });
  
  // cypress/integration/dashboard.spec.js
  describe("Dashboard", () => {
    beforeEach(() => {
      cy.login('amanda@correo.com', 'correo1');
    });
  
    it("Muestra el componente DashSidebar", () => {
      cy.visit("http://localhost:5174/dashboard");
    });
  
    it("Muestra el componente DashProfile cuando la pestaña es 'profile'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=profile");
    });
  
    it("Muestra el componente DashMenu cuando la pestaña es 'menu'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=menu");
    });
  
    it("Muestra el componente DashReservations cuando la pestaña es 'reservations'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=reservations");
    });
  
    it("Muestra el componente DashUsers cuando la pestaña es 'users'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=users");
    });
  
    it("No muestra ningún componente específico cuando la pestaña no está definida", () => {
      cy.visit("http://localhost:5174/dashboard");
      cy.get('.DashProfile').should('not.exist');
      cy.get('.DashMenu').should('not.exist');
      cy.get('.DashReservations').should('not.exist');
      cy.get('.DashUsers').should('not.exist');
    });
  });
  