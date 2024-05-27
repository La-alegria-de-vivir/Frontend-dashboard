describe('DashProfile Page', () => {
    beforeEach(() => {
      // Visitar la URL local donde está alojada la página
      cy.visit('http://localhost:5174');
      
      // Aquí puedes agregar comandos para iniciar sesión si es necesario
      // Por ejemplo:
      // cy.get('input[name="username"]').type('tu_usuario');
      // cy.get('input[name="password"]').type('tu_contraseña');
      // cy.get('button[type="submit"]').click();
    });
  
    it('should update the user profile', () => {
      // Rellenar y enviar el formulario
      cy.get('input#username').clear().type('NuevoNombre');
      cy.get('input#email').clear().type('nuevoemail@example.com');
      cy.get('input#password').clear().type('nuevaContraseña');
      cy.get('button[type="submit"]').click();
  
      // Verificar que la actualización fue exitosa
      cy.contains('User profile updated successfully').should('exist');
    });
  
    it('should show error message if no changes are made', () => {
      // Intentar enviar el formulario sin cambios
      cy.get('button[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de error
      cy.contains('No changes made').should('exist');
    });
  
    it('should show the delete confirmation modal', () => {
      // Hacer clic en "Borrar cuenta"
      cy.contains('Borrar cuenta').click();
  
      // Verificar que el modal de confirmación se muestra
      cy.contains('¿Estás seguro que quieres borrar la cuenta?').should('exist');
    });
  
    it('should handle sign out', () => {
      // Hacer clic en "Salir"
      cy.contains('Salir').click();
  
      // Verificar el comportamiento esperado después de cerrar sesión
      // Por ejemplo, puedes verificar que la página redirige a la página de inicio de sesión
      cy.url().should('include', '/login');
    });
  });
  