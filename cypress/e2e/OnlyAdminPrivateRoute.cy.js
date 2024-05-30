describe("OnlyAdminPrivateRoute Component", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5174");
  });

  it("Redirects to '/' if the user is not an administrator", () => {
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

  it("Allows access if the user is an administrator", () => {
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
