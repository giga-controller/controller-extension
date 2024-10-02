import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    default_locale: "en",
    description: "Automates the creation of OAuth2.0 applications",
    name: "Controller",
    permissions: ["tabs", "activeTab"],
    background: {
      service_worker: "background.js",
      persistent: true
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["/content-scripts/content.js"],
      }
    ],
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ["*://*/*"],
      },
    ],
    host_permissions: ["https://console.cloud.google.com/*", "http://localhost:3000/*"],
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  srcDir: "src",
});
