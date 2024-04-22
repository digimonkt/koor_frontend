const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  viewportWidth: 1921,
  viewportHeight: 1081,

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3001",
  },
});
