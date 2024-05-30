describe("DashMenu Component", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:5174/");
    cy.get("#email").type("rox@gmail.com");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.wait(2000);
    cy.get('[href="/dashboard?tab=users"] > .p-4').click();
    cy.wait(2000);
  });

  it("should show at least 9 users", () => {
    cy.get(".table-auto").should("exist");
    cy.get("tbody tr").should("have.length", 9);
  });

  it('should show more users when when clicking "Show More"', () => {
    cy.get("button.w-full.text-teal-500.self-center.text-sm.py-7").click();
    cy.get("tbody tr").should("have.length.greaterThan", 9);
  });

  it("should open a modal when trying to delete a user", () => {
    cy.get("tbody > tr > td:last-child > span").contains("Borrar").click();
    cy.get("#modal-title").should("be.visible");
  });

  it("should not remove user when the clicking cancel button", () => {
    cy.get("tbody > tr > td:last-child > span").contains("Borrar").click();
    cy.get(".bg-gray-50 > .mt-3");
    cy.get(
      ".mt-3.w-full.inline-flex.justify-center.rounded-md.border.border-gray-300.shadow-sm.px-4.py-2.bg-white.text-base.font-medium.text-gray-700"
    ).click();
    cy.get("#modal-title").should("not.exist");
    cy.get("tbody tr:first-child").contains("example4").should("exist");
  });
});
