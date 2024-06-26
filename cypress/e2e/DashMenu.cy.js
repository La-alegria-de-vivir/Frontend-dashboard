describe("DashMenu", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5174/");
    cy.get("#email").type("amanda@correo.com");
    cy.get("#password").type("correo1");
    cy.get("form").submit();

    cy.wait(2000);
    cy.get('[href="/dashboard?tab=menu"] > .p-4').click();
    cy.wait(2000);
  });

  it("should show at least 5 menu items", () => {
    cy.get(".table-auto").should("exist");
    cy.get("tbody tr").should("have.length", 5);
  });

  it('should show more menu items when when clicking "Show More"', () => {
    cy.get("button.w-full.text-teal-500.self-center.text-sm.py-7").click();
    cy.get("tbody tr").should("have.length.greaterThan", 5);
  });

  it("should open a modal when trying to delete a menu item", () => {
    cy.get("tbody tr:first-child .text-red-500").click();
    cy.get("#modal-title").should("be.visible");
  });

  it("should not remove the menu item when the clicking cancel button", () => {
    cy.get("tbody tr:first-child .text-red-500").click();
    cy.get(".bg-gray-50 > .mt-3");
    cy.get(
      ".mt-3.w-full.inline-flex.justify-center.rounded-md.border.border-gray-300.shadow-sm.px-4.py-2.bg-white.text-base.font-medium.text-gray-700"
    ).click();
    cy.get("#modal-title").should("not.exist");
    cy.get("tbody tr:first-child").should("exist");
  });
});
