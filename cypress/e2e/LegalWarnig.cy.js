describe("Aviso Legal", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/legal-warning");
    });
  
    it("Muestra el título correctamente", () => {
      cy.contains("AVISO LEGAL").should("exist");
    });
  
    it("Contiene secciones relevantes", () => {
      cy.contains("DATOS IDENTIFICATIVOS").should("exist");
      cy.contains("USUARIOS").should("exist");
      cy.contains("USO DEL PORTAL").should("exist");
      cy.contains("PROTECCIÓN DE DATOS").should("exist");
      cy.contains("PROPIEDAD INTELECTUAL E INDUSTRIAL").should("exist");
      cy.contains("EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD").should("exist");
      cy.contains("MODIFICACIONES").should("exist");
      cy.contains("ENLACES").should("exist");
      cy.contains("DERECHO DE EXCLUSIÓN").should("exist");
      cy.contains("GENERALIDADES").should("exist");
      cy.contains("MODIFICACIÓN DE LAS PRESENTES CONDICIONES Y DURACIÓN").should("exist");
      cy.contains("LEGISLACIÓN APLICABLE Y JURISDICCIÓN").should("exist");
    });
  
    it("Contiene enlaces a recursos externos", () => {
      cy.contains("Google Chrome").should("have.attr", "href").and("include", "https://www.google.com/intl/en/policies/technologies/managing/");
      cy.contains("Mozilla Firefox").should("have.attr", "href").and("include", "http://support.mozilla.com/en-GB/kb/Cookies#w_cookie-settings");
      cy.contains("Microsoft Edge").should("have.attr", "href").and("include", "http://windows.microsoft.com/en-GB/windows-vista/Block-or-allow-cookies");
      cy.contains("Apple Safari").should("have.attr", "href").and("include", "http://www.apple.com/safari/features.html#security");
    });
  });
  