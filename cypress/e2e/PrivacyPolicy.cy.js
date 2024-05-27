describe("PrivacyPolicy Component", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/privacy-policy");
    });
  
    it("Should display the title 'POLÍTICA DE PRIVACIDAD'", () => {
      cy.get("h1").should("contain", "POLÍTICA DE PRIVACIDAD");
    });
  
    it("Should display the sections correctly", () => {
      cy.get("section").should("have.length", 9);
      cy.get("section h2").should("have.length", 8);
      cy.get("section h3").should("have.length", 2);
    });
  
  
    it("Should display the contact information correctly", () => {
      cy.get("p").contains("Avenida Isabel La Católica, 5. 28320, Pinto (Madrid), España.").should("exist");
      cy.get("p").contains("+34 910112248").should("exist");
      cy.get("p").contains("reservas@alegriadevivir.com").should("exist");
    });
    it("Should display the 'TRATAMIENTO DE DATOS PERSONALES' section", () => {
        cy.get("section h2").eq(0).should("contain", "TRATAMIENTO DE DATOS PERSONALES");
      });
    
      it("Should display the 'Información básica sobre protección de datos de carácter personal' section", () => {
        cy.get("section h2").eq(1).should("contain", "Información básica sobre protección de datos de carácter personal");
      });
    
      it("Should display the 'Responsable' information correctly", () => {
        cy.get("p").contains("Alegría De Vivir Cb").should("exist");
        cy.get("p").contains("E56589815").should("exist");
      });
    
      it("Should display the 'Finalidades' information correctly", () => {
        cy.get("p").contains("La atención de solicitudes realizadas por los usuarios sobre reservas.").should("exist");
        cy.get("p").contains("La inclusión en la agenda de contactos.").should("exist");
        cy.get("p").contains("La prestación de servicios y la gestión de la relación comercial.").should("exist");
      });
    
      it("Should display the 'Legitimación' information correctly", () => {
        cy.get("p").contains("Consentimiento del interesado.").should("exist");
        cy.get("ul li").should("have.length", 31);
      });
    
      it("Should display the 'Cesiones' information correctly", () => {
        cy.get("p").contains("Se podrán realizar cesiones de datos para fines estadísticos.").should("exist");
      });
    
      it("Should display the 'Derechos' information correctly", () => {
        cy.get("p").contains("Acceder, rectificar y suprimir los datos").should("exist");
        cy.get("p").contains("solicitar la portabilidad de los mismos").should("exist");
        cy.get("p").contains("oponerse al tratamiento y solicitar la limitación de éste").should("exist");
      });
    
      it("Should display the 'Cómo se pueden ejercer los derechos' information correctly", () => {
        cy.get("p").contains("Mediante un escrito dirigido a:").should("exist");
        cy.get("p").contains("Mediante correo electrónico dirigido a:").should("exist");
      });
    
      it("Should display the 'Qué vías de reclamación existen' information correctly", () => {
        cy.get("p").contains("Si considera que sus derechos no se han atendido debidamente").should("exist");
        cy.get("ul li").eq(16).should("contain", "901 100 099 / 912 663 517");
        cy.get("ul li").eq(17).should("contain", "C/ Jorge Juan, 6 28001-Madrid");
        cy.get("ul li").eq(18).should("contain", "https://sedeagpd.gob.es/sede-electronica-web/");
        cy.get("ul li").eq(19).should("contain", "www.agpd.es");
      });
    
      it("Should display the 'Categorías de datos' information correctly", () => {
        cy.get("section h2").eq(7).should("contain", "¿QUÉ CATEGORÍAS DE DATOS PUEDE TRATAR EL RESTAURANTE?");
        cy.get("ul li").eq(20).should("contain", "Datos de carácter identificativo");
        cy.get("ul li").eq(21).should("contain", "Datos relativos a las preferencias y satisfacción");
        cy.get("ul li").eq(22).should("contain", "Datos relativos a la salud");
      });
    });