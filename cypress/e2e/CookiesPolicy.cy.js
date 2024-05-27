describe("Política de Cookies", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/cookies-policy");
    });
  
    it("Muestra el título correctamente", () => {
      cy.contains("POLÍTICA DE COOKIES").should("exist");
    });
  
    it("Contiene secciones relevantes", () => {
      cy.contains("Objeto").should("exist");
      cy.contains("¿Qué son las Cookies?").should("exist");
      cy.contains("Tipos, finalidad y funcionamiento de las cookies").should("exist");
      cy.contains("Cookies utilizadas en la web").should("exist");
      cy.contains("Cómo deshabilitar las cookies en los navegadores más utilizados").should("exist");
      cy.contains("Qué ocurre si se deshabilitan las cookies").should("exist");
      cy.contains("Cambios en la política de cookies").should("exist");
      cy.contains("Ejercicio de Derechos en materia de Cookies").should("exist");
    });
  
    it("Contiene enlaces a recursos externos", () => {
      cy.contains("Más información").should("have.attr", "href").and("include", "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage");
      cy.contains("Google Chrome").should("have.attr", "href").and("include", "https://support.google.com/chrome/answer/95647?hl=es");
      cy.contains("Mozilla Firefox").should("have.attr", "href").and("include", "https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-?redirectlocale=en-HYPERLINK");
      cy.contains("Apple Safari").should("have.attr", "href").and("include", "https://support.apple.com/es-es/HT201265");
      cy.contains("Microsoft Explorer").should("have.attr", "href").and("include", "https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d");
    });
  });
  