// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/react18";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../src/redux/store";
import { Provider } from "react-redux";
import "../../src/index.css";
import "../../src/assets/css/banhnschrift.css";
import "../../src/assets/css/spacing.css";
import "../../src/assets/css/style.css";

Cypress.Commands.add("mount", mount);

Cypress.Commands.add("mountApplication", (component, options = {}) => {
  return mount(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>,
    options
  );
});

// Example use:
// cy.mount(<MyComponent />)
