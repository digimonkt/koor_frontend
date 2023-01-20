import React from "react";
import { Registration } from "../index";
describe("<Registration />", () => {
  it("renders", () => {
    cy.mountApplication(<Registration />);
  });
});
