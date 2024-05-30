describe("UpdateMenu Page", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5174/");
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get('[href="/dashboard?tab=menu"] > .p-4').click();
    cy.wait(2000);
    cy.get("tbody tr:first-child .text-teal-500").click();
    cy.wait(2000);
  });

  it("should display the menu update form", function () {
    cy.get(".max-w-3xl").should("exist");
    cy.get("form").should("exist");
  });

  it("should display an error message if the image is not selected", function () {
    cy.get('button[type="button"]').click();
    cy.contains("Please select an image").should("be.visible");
  });

  it("should allow editing the name and price of the menu", function () {
    cy.get("#title").clear().type("Nuevo Nombre");
    cy.get("#price").clear().type("15");
    cy.get("form").submit();
    cy.get(".min-w-full > .bg-white > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Nuevo Nombre"
    );
    cy.get(".bg-white > :nth-child(1) > :nth-child(3)").should("contain", "15");
    //this reset the fields
    cy.get("tbody tr:first-child .text-teal-500").click();
    cy.wait(2000);
    cy.get("#title").clear().type("TORTILLITA DE CAMARÓN DE LA BAHIA DE CADIZ");
    cy.get("#price").clear().type("27.6");
    cy.get("form").submit();
  });
});
