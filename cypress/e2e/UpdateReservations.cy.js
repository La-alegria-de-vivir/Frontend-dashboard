describe("UpdateReservations Page", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5174/");
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.wait(2000);

    cy.get('[href="/dashboard?tab=reservations"] > .p-4').click();
    cy.wait(2000);
    cy.get(":nth-child(1) > .flex > .text-teal-500 > svg > path").click();
  });

  it("should display 'Cargando...' while waiting for reservation data", function () {
  });

  it("should load the update reservation form", function () {
    cy.get(".max-w-4xl").should("exist");
    cy.get("form").should("exist");
  });

  it("should display an error message for less than 1 guest", function () {
    cy.get('input[name="people"]').clear().type("0");
    cy.get('button[type="submit"]').click();
    cy.contains("El número mínimo de comensales es 1").should("be.visible");
  });

  it("should display an error message for more than 10 guests", function () {
    cy.get('input[name="people"]').clear().type("11");
    cy.get('button[type="submit"]').click();
    cy.contains("El número máximo de comensales es 10").should("be.visible");
  });

  it("should send the form and display the confirmation modal", function () {
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
  });
});
