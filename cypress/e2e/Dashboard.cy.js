// Pruebas para la página Dashboard

describe("Dashboard", () => {
    beforeEach(() => {
      // Iniciar sesión antes de cada prueba
      cy.visit("http://localhost:5174");
      cy.get('input[type="email"]').type('natalia@correo.com');
      cy.get('input[type="password"]').type('natalia123');
      cy.get('button[type="submit"]').click();
  
      // Navegar a la página Dashboard
      cy.visit("http://localhost:5174/dashboard");
    });
  
    it("Muestra el componente DashSidebar", () => {
      cy.get('DashSidebar').should('exist');
    });
  
    it("Muestra el componente DashProfile cuando la pestaña es 'profile'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=profile");
      cy.get('.DashProfile').should('exist');
    });
  
    it("Muestra el componente DashMenu cuando la pestaña es 'menu'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=menu");
      cy.get('.DashMenu').should('exist');
    });
  
    it("Muestra el componente DashReservations cuando la pestaña es 'reservations'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=reservations");
      cy.get('.DashReservations').should('exist');
    });
  
    it("Muestra el componente DashUsers cuando la pestaña es 'users'", () => {
      cy.visit("http://localhost:5174/dashboard?tab=users");
      cy.get('.DashUsers').should('exist');
    });
  
    it("No muestra ningún componente cuando la pestaña no está definida", () => {
      cy.visit("http://localhost:5174/dashboard");
      cy.get('.DashProfile').should('not.exist');
      cy.get('.DashMenu').should('not.exist');
      cy.get('.DashReservations').should('not.exist');
      cy.get('.DashUsers').should('not.exist');
    });
  });