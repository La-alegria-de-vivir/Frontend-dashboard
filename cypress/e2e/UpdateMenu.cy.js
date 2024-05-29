describe("UpdateMenu Page", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5173/");
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get('[href="/dashboard?tab=menu"] > .p-4').click();
    cy.wait(2000);
    cy.get("tbody tr:first-child .text-teal-500").click();
    cy.wait(2000);
  });

  it("debería mostrar el formulario de actualización de menú", function () {
    cy.get(".max-w-3xl").should("exist");
    cy.get("form").should("exist");
  });

  it("debería permitir seleccionar una imagen para subir", function () {
    cy.get(".items-center > div.flex > .relative > .block").click();
    cy.get("brainstorm").click();
    cy.contains("Abrir").click();
    cy.get('button[type="button"]').click();
    cy.get(".w-16.h-16").should("contain.text", "300%");
  });

  it("debería mostrar un mensaje de error si la imagen no se selecciona", function () {
    cy.get('button[type="button"]').click();
    cy.contains("Please select an image").should("be.visible");
  });

  /*  it("debería permitir editar el nombre y precio del menú", function () {
    cy.get("#title").clear().type("Nuevo Nombre");
    cy.get("#price").clear().type("15");
    // Aquí puedes verificar que los valores ingresados se muestren correctamente en el formulario
  }); */
});
