describe("CreateMenu", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5174");
      cy.get('input[type="email"]').type('amanda@correo.com');
      cy.get('input[type="password"]').type('correo1');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); // Verifica que esté en el dashboard
      cy.wait(1000); // Espera para asegurar que el navbar cargue completamente
      cy.get('a[href="/create-menu"]').first().click({ force: true }); // Usa first() para seleccionar el primer elemento
      cy.url().should('include', '/create-menu'); // Verifica que esté en la página de creación de menú
    });
  
    it("Permite ingresar datos en los campos de texto", () => {
      cy.get('input[placeholder="Nombre"]').type('Nuevo Menú').should('have.value', 'Nuevo Menú');
      cy.get('input[placeholder="Precio"]').type('19.99').should('have.value', '19.99');
      cy.get('textarea[placeholder="Write something..."]').type('Descripción del nuevo menú').should('have.value', 'Descripción del nuevo menú');
    });
  });
  