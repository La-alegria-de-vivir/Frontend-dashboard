// Definición de la función createPDF
Cypress.Commands.add('createPDF', ({ reservations, startDate, endDate }) => {
  // Lógica para generar el PDF
  // Esta función debería devolver el PDF generado
  return 'PDF generado';
});

// Pruebas para el generador de informes en formato PDF
describe("Generador de Informes PDF", () => {
  beforeEach(() => {
    // Iniciar sesión antes de cada prueba
    cy.visit("http://localhost:5174");
    cy.get('input[type="email"]').type('natalia@correo.com');
    cy.get('input[type="password"]').type('natalia123');
    cy.get('button[type="submit"]').click();

    cy.visit("http://localhost:5174/reservations");
  });

  it("Genera un informe PDF con los datos de las reservas", () => {
    const reservations = [
      { _id: 1, name: "Cliente 1", phoneNumber: "123456789", people: 2, place: "Mesa 1", completed: true },
      { _id: 2, name: "Cliente 2", phoneNumber: "987654321", people: 4, place: "Mesa 2", completed: false }
    ];
    const startDate = "01/05/2024";
    const endDate = "31/05/2024";

    cy.createPDF({ reservations, startDate, endDate }).then((pdf) => {
      expect(pdf).to.exist;
      expect(pdf).to.contain("Informe de Reservas");
      expect(pdf).to.contain(`Fecha del informe: ${startDate} - ${endDate}`);
      expect(pdf).to.contain("Nombre");
      expect(pdf).to.contain("Teléfono");
      expect(pdf).to.contain("Comensales");
      expect(pdf).to.contain("Lugar");
      expect(pdf).to.contain("Estado");
      expect(pdf).to.contain("Cliente 1");
      expect(pdf).to.contain("Cliente 2");
      expect(pdf).to.contain("Total de comensales: 6");
      expect(pdf).to.contain("Reservas completadas: 1");
      expect(pdf).to.contain("Reservas abiertas: 1");
      expect(pdf).to.contain("Total de reservas: 2");
    });
  });
});