import { messageTypeEnumSchema } from "@/types/background";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => {
    if (message.type === messageTypeEnumSchema.Values.navigateToUrl) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            return browser.tabs
              .update(tabs[0].id!, { url: message.input })
              .then((response) => {
                console.log("Navigate to URL response:", response);
                return browser.tabs.sendMessage(tabs[0].id!, message);
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
    } else if (message.type === messageTypeEnumSchema.Values.fillInput) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            return browser.tabs
              .sendMessage(tabs[0].id!, message)
              .then((response) => {
                console.log("Fill input response:", response);
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
    } else if (message.type === messageTypeEnumSchema.Values.retrieve) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          if (tabs[0]) {
            return browser.tabs
              .sendMessage(tabs[0].id!, message)
              .then((response) => {
                console.log("Retrieve response:", response);
                return response.value;
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
          console.error("Error invoking retrieve:", error);
          throw new Error("Error invoking retrieve");
        });
    } else if (
      message.type === messageTypeEnumSchema.Values.clickButton
    ) {
      return browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          console.log("Click request:", message);
          if (tabs[0]) {
            return browser.tabs
              .sendMessage(tabs[0].id!, message)
              .then((response) => {
                console.log("Click response:", response);
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
      message.type === messageTypeEnumSchema.Values.getProjectName
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
