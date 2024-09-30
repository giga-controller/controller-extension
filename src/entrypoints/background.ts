import { backgroundScriptsEnumSchema } from "@/types/background";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (message.type === backgroundScriptsEnumSchema.Values.navigateToUrl) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            browser.tabs
              .update(tabs[0].id!, { url: message.input })
              .then((response) => {
                return response;
              })
              .catch((error) => {
                console.error("Error navigating to URL:", error);
                throw new Error("Error navigating to URL");
              });
          } else {
            console.error("No active tab found");
            throw new Error("No active tab found");
          }
        })
        .catch((error) => {
          console.error("Error invoking navigateToUrl:", error);
          throw new Error("Error invoking navigateToUrl");
        });
    } else if (message.type === backgroundScriptsEnumSchema.Values.fillInput) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            return browser.tabs
              .sendMessage(tabs[0].id!, message)
              .then((response) => {
                return response;
              })
              .catch((error) => {
                console.error(
                  "Error sending message to content script:",
                  error,
                );
                throw new Error("Error sending message to content script");
              });
          } else {
            console.error("No active tab found");
            throw new Error("No active tab found");
          }
        })
        .catch((error) => {
          console.error("Error invoking fillInput:", error);
          throw new Error("Error invoking fillInput");
        });
    } else if (
      message.type === backgroundScriptsEnumSchema.Values.clickButton
    ) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            return browser.tabs
              .sendMessage(tabs[0].id!, message)
              .then((response) => {
                return response;
              })
              .catch((error) => {
                console.error(
                  "Error sending message to content script:",
                  error,
                );
                throw new Error("Error sending message to content script");
              });
          } else {
            console.error("No active tab found");
            throw new Error("No active tab found");
          }
        })
        .catch((error) => {
          console.error("Error invoking clickButton:", error);
          throw new Error("Error invoking clickButton");
        });
    } else if (
      message.type === backgroundScriptsEnumSchema.Values.getProjectName
    ) {
      // AARON
    }
  });
  //   } else if (message.action === "fillInput") {
  //     browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
  //       if (tabs[0]) {
  //         browser.tabs.sendMessage(tabs[0].id!, {
  //           action: "fillInput",
  //           input: request.input
  //         }).then((response) => {
  //           sendResponse({ success: true, response });
  //         }).catch((error) => {
  //           sendResponse({ error, success: false });
  //         });
  //       } else {
  //         sendResponse({ error: "No active tab found", success: false });
  //       }
  //     }).catch((error) => {
  //       sendResponse({ error, success: false });
  //     });
  //     return true;
  //   }
  //   return true
  // });
});
