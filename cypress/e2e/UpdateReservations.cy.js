describe("UpdateReservations Page", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173/");
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get('[href="/dashboard?tab=reservations"] > .p-4').click();
    cy.wait(2000);
    cy.get(":nth-child(1) > .flex > .text-teal-500 > svg > path").click();
  });

  it("debería mostrar 'Cargando...' mientras espera los datos de la reserva", function () {
    cy.contains("Cargando...").should("be.visible");
  });

  it("debería cargar el formulario de actualización de reservas", function () {
    cy.get(".max-w-4xl").should("exist");
    cy.get("form").should("exist");
  });

  it("debería mostrar un mensaje de error para menos de 1 comensal", function () {
    cy.get('input[name="people"]').clear().type("0");
    cy.get('button[type="submit"]').click();
    cy.contains("El número mínimo de comensales es 1").should("be.visible");
  });

  it("debería mostrar un mensaje de error para más de 10 comensales", function () {
    cy.get('input[name="people"]').clear().type("11");
    cy.get('button[type="submit"]').click();
    cy.contains("El número máximo de comensales es 10").should("be.visible");
  });

  it("debería enviar el formulario y mostrar el modal de confirmación", function () {
    cy.get('input[name="name"]').clear().type("Nuevo nombre");
    cy.get('input[name="people"]').clear().type("5");
    cy.get('input[name="date"]').clear().type("2024-06-01");
    cy.get('input[name="hour"]').clear().type("13:00");
    cy.get('input[name="phoneNumber"]').clear().type("1234567890");

    cy.intercept("PUT", "/api/reserve/update-reservations/some-id", {
      statusCode: 200,
      body: {},
    }).as("updateReservation");

    cy.get('button[type="submit"]').click();
    cy.contains("Reserva actualizada correctamente").should("be.visible");
  });
});
