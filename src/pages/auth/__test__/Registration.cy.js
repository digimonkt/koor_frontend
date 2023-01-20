import React from "react";
import { setUserRole } from "../../../redux/slice/user";
import { store } from "../../../redux/store";
import { USER_ROLES } from "../../../utils/enum";
import { Registration } from "../index";
const jobSeeker = `[data-cy=role-${USER_ROLES.jobSeeker}]`;
const employer = `[data-cy=role-${USER_ROLES.employer}]`;
const vendor = `[data-cy=role-${USER_ROLES.vendor}]`;
describe("<Registration />", () => {
  beforeEach(() => {
    cy.mountApplication(<Registration />);
  });
  it("Checking Texts", () => {
    cy.get("[data-cy=title]").should("have.text", "Register");
    cy.get("[data-cy=subTitle]").should(
      "have.text",
      "I want to register as..."
    );
  });
  it("List all the role Registration Options", () => {
    cy.get("[data-cy=authOptions]").children().should("have.length", 3);
    cy.get(jobSeeker);
    cy.get(employer);
    cy.get(vendor);
  });
  it("Job Seeker registration", () => {
    const role = USER_ROLES.jobSeeker;
    store.dispatch(setUserRole(role));
  });
  // it("Employer registration", () => {
  //   const role = USER_ROLES.employer;
  //   store.dispatch(setUserRole(role));
  // });
  // it("Vendor registration", () => {
  //   const role = USER_ROLES.vendor;
  //   store.dispatch(setUserRole(role));
  // });
});
