
describe("Footer Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Should display the title", () => {
    cy.get("h2").contains("HORARIOS");
  });
});
describe("Footer Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Should display the correct links in the footer", () => {
    cy.get("footer a").should("have.length", 5);
    cy.get("footer a").eq(0).should("have.attr", "href", "https://maps.app.goo.gl/TrdWgmpdWXvLi7dq7");
    cy.get("footer a").eq(1).should("have.attr", "href", "#");
    cy.get("footer a").eq(2).should("have.attr", "href", "/legal-warning");
    cy.get("footer a").eq(3).should("have.attr", "href", "/privacy-policy");
  });

  it("Should display the correct opening hours", () => {
    cy.get("footer p").eq(0).should("contain", "De Miércoles a Sábado");
    cy.get("footer p").eq(0).should("contain", "12:30 - 17:00");
    cy.get("footer p").eq(0).should("contain", "20:00 - 23:30");
    cy.get("footer p").eq(1).should("contain", "Domingo");
    cy.get("footer p").eq(1).should("contain", "12:30 - 17:00");
    cy.get("footer p").eq(2).should("contain", "Lunes y Martes");
    cy.get("footer p").eq(2).should("contain", "Cerrado");
  });

  it("Should display the correct contact information", () => {
    cy.get("footer a").eq(1).should("contain", "Teléfono: 652196890-636965465");
  });

  it("Should display the correct policy links", () => {
    cy.get("footer a").eq(2).should("contain", "Aviso Legal");
    cy.get("footer a").eq(3).should("contain", "Política de privacidad");
    cy.get("footer a").eq(4).should("contain", "Política de cookies");
  });
});