describe("OnlyAdminPrivateRoute Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // TODO: meter credenciales en .env
  it("Redirecciona a / si el usuario no es administrador", () => {
    cy.get("#email").type("noadmin@test.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get(
      "ul.hidden.md\\:flex.px-4.mx-auto.font-semibold.font-heading.space-x-12"
    )
      .contains("Reservas")
      .click();

    cy.location("pathname").should("eq", "/");
  });

  // TODO: meter credenciales en .env
  it("Permite el acceso si el usuario es administrador", () => {
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get(
      "ul.hidden.md\\:flex.px-4.mx-auto.font-semibold.font-heading.space-x-12"
    )
      .contains("Reservas")
      .click();

    cy.get(".table-auto").should("exist");
    cy.get(".overflow-y-auto > .justify-between").should("exist");
    cy.get(".text-blue-600").contains("Descargar informe").should("exist");
  });
});
