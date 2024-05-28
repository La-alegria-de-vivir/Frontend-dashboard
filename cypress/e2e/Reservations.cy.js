describe('Reservation Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5174/reservation'); // Asegúrate de que esta URL sea correcta
        cy.wait(2000); // Espera 2 segundos para asegurarte de que la página se cargue completamente
    });

    it('should display the reservation page with reservations', () => {
        // Verifica si la página de reservas se carga correctamente
        cy.url().should('include', '/reservation');

        // Verifica si se muestran las reservas
        cy.get('table').should('exist'); // Verifica si existe una tabla de reservas
        cy.get('tr').its('length').should('be.gt', 1); // Verifica si hay más de una fila de reserva
    });
});
