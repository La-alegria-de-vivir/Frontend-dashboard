describe("Navbar Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display the logo", () => {
    cy.get('nav div a img[alt="Logo Alegria de Vivir"]').should("be.visible"); // Corregido el selector del logo
  });

  it("should toggle the menu on mobile view", () => {
    cy.viewport("iphone-6");

    cy.get("nav ul.md\\:hidden").should("have.class", "hidden"); // Corregido el selector del menú móvil

    cy.get("nav button").click();

    cy.get("nav ul.md\\:hidden").should("not.have.class", "hidden"); // Corregido la expectativa del menú abierto

    cy.get("nav button").click();

    cy.get("nav ul.md\\:hidden").should("have.class", "hidden");
  });

  it("should navigate to Inicio when logged out", () => {
    cy.get(
      "ul.hidden.md\\:flex.px-4.mx-auto.font-semibold.font-heading.space-x-12"
    )
      .contains("Inicio")
      .click();
    cy.url().should("include", "/");
  });

  it("should navigate to correct routes on desktop view", () => {
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");

    cy.get("form").submit();

    const routes = [
      { text: "Inicio", route: "/dashboard?tab=profile" },
      { text: "Reservas", route: "/reservations" },
      { text: "Menú", route: "/create-menu" },
    ];

    routes.forEach(({ text, route }) => {
      cy.get(
        "ul.hidden.md\\:flex.px-4.mx-auto.font-semibold.font-heading.space-x-12"
      )
        .contains(text)
        .click();

      cy.url().should("include", route);
    });
  });

  it("should navigate to correct routes on mobile view", () => {
    cy.viewport(375, 812);

    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.get(".container > .justify-between").find("button").click();

    const routes = [
      { text: "Inicio", route: "/dashboard?tab=profile" },
      { text: "Reservas", route: "/reservations" },
      { text: "Menú", route: "/create-menu" },
    ];

    routes.forEach(({ text, route }) => {
      cy.contains(text).click();

      cy.url().should("include", route);
    });
  });
});
