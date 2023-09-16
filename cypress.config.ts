import { defineConfig } from "cypress";

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // modify config values
      config.defaultCommandTimeout = 10000;
      config.baseUrl = "http://localhost:3000";
      config.env.backendBaseUrl = "https://demo.dev.datopian.com";

      // modify env var value
      config.env.ENVIRONMENT = "dev";

      // IMPORTANT return the updated config object
      return config;
    },
  },
});
