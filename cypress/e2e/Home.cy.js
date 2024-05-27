

describe("Inicio de Sesión", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5174"); 
    });
  
    it("Muestra el formulario de inicio de sesión", () => {
      cy.get('form').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist').contains('Iniciar sesión');
    });
  
    it("Iniciar sesión con credenciales válidas", () => {
      cy.get('input[type="email"]').type('correo@correo.com');
      cy.get('input[type="password"]').type('contraseña');
      cy.get('button[type="submit"]').click();

    });
  
    it("Mostrar mensaje de error al intentar iniciar sesión sin completar campos", () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Please fill all the fields').should('exist');
    });
  });