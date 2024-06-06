// cypress/integration/report_pdf_spec.js
describe('ReportPDF', () => {
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

  it('Generates the ReportPDF', () => {
    // Verificar que el botón de descarga de informe PDF esté presente
    cy.contains('Descargar informe PDF').click();

    // Esperar a que el informe esté listo para descargar
    cy.contains('Descargar informe PDF').should('be.visible');
  
  });
});
