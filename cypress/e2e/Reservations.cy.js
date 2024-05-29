describe("Reservation Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5174");
      cy.get('input[type="email"]').type('amanda@correo.com');
      cy.get('input[type="password"]').type('correo1');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
      cy.wait(1000);
      cy.get('a[href="/reservations"]').first().click({ force: true });
      cy.url().should('include', '/reservations');
    });
  
    it("Verifica que los campos de búsqueda y filtros funcionen correctamente", () => {
      cy.get('input[placeholder="Buscar por nombre"]').type('Mar').should('have.value', 'Mar');
      cy.get('input[placeholder="Fechas"]').click();
      cy.get('.react-datepicker__day--030').first().click();
      cy.get('.react-datepicker__day--010').first().click();
    });
  
    it("Verifica que al menos una reserva tenga la hora esperada en la tabla", () => {
      const expectedReservationHour = '21:30';
      let found = false;
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('td:nth-child(3)').invoke('text').then((text) => {
          const reservationHour = text.trim();
          if (reservationHour === expectedReservationHour) {
            found = true;
          }
        });
      }).then(() => {
        expect(found).to.be.true;
      });
    });
  
    it("Verifica que al menos una reserva tenga el teléfono esperado en la tabla", () => {
      const expectedReservationPhone = '915698958';
      let found = false;
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('td:nth-child(2)').invoke('text').then((text) => {
          const reservationPhone = text.trim();
          if (reservationPhone === expectedReservationPhone) {
            found = true;
          }
        });
      }).then(() => {
        expect(found).to.be.true;
      });
    });
  });
  