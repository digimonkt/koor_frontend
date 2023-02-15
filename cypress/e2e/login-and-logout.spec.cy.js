import { USER_ROLES } from "../../src/utils/enum";

describe("login and logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getByTestId("login-nav").click();
  });
  it("Checking Texts", () => {
    cy.get("[data-cy=title]").should("have.text", "Login");
  });
  it("List all the role Registration Options", () => {
    cy.get("[data-cy=authOptions]").children().should("have.length", 3);
    cy.getByTestId(`role-${USER_ROLES.jobSeeker}`);
    cy.getByTestId(`role-${USER_ROLES.employer}`);
    cy.getByTestId(`role-${USER_ROLES.vendor}`);
  });
  it("Login Logout as Job Seeker", () => {
    cy.getByTestId(`role-${USER_ROLES.jobSeeker}`).click();
    cy.getByTestId("login-email").get("[type='email']").type("test@test.com");
    cy.getByTestId("login-password").type("HelloWorld");
    cy.getByTestId("login-button").click();
    cy.url().should("include", `${USER_ROLES.jobSeeker}/my-profile`);
    cy.getByTestId("logout-button-nav").click();
    cy.url().should("include", "/login");
  });
  it("Login Logout as Employer", () => {
    cy.getByTestId(`role-${USER_ROLES.employer}`).click();
    cy.getByTestId("login-email").get("[type='email']").type("employer@gmail.com");
    cy.getByTestId("login-password").type("123456789");
    cy.getByTestId("login-button").click();
    cy.url().should("include", "/employer/dashboard");
    cy.getByTestId("logout-button-nav").click();
  });
  // pending vendor
});
