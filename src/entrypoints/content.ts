import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { QuerySelector } from "@/types/scripts/base";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main() {
    if ((window as any).__contentScriptInjected) return;
    (window as any).__contentScriptInjected = true;

    browser.storage.local.get(
      [
        "platform",
        "javaScriptOriginUri",
        "javaScriptRedirectUri",
        "projectId"
      ]).then(async (data) => {

        // Inject main script
        await injectCustomScript("/injected.js", { keepInDom: true });

        setTimeout(() => {
          window.postMessage({
            type: messageTypeEnumSchema.Values.platformDetails,
            data: data
          }, '*');
        }, 1500);
    });

    window.addEventListener("message", async (event) => {
      if (event.source !== window) return;
      if (!event.data.type) return;

      const type: MessageTypeEnum = event.data.type;
      const query: QuerySelector = event.data.query;

      if (type === messageTypeEnumSchema.Values.click) {
        console.log("Click event received:", query);

        try {
          let element;
          if (query.id) {
            element = document.getElementById(query.id) as HTMLElement;
          } else if (query.class) {
            const all_matching_elements = document.querySelectorAll(
              query.class,
            );
            console.log(`${all_matching_elements.length} elements found`);
            element = all_matching_elements[query.index || 0] as HTMLElement;
          } else if (query.ariaLabel) {
            element = document.querySelector(
              `[aria-label="${query.ariaLabel}"]`,
            ) as HTMLElement;
          }

          if (element) {
            element.click();
            console.log("Element successfully clicked");
          }
        } catch (error) {
          console.error(`Error clicking: ${(error as Error).message}`);
          throw new Error(`Error clicking: ${(error as Error).message}`);
        }
      } else if (type === messageTypeEnumSchema.Values.fillInput) {
        console.log("Fill input event received:", query);

        const value: string = event.data.value;
        console.log("Value to fill:", value);

        try {
          let element;
          if (query.id) {
            element = document.getElementById(query.id);
          } else if (query.class) {
            const all_matching_elements = document.querySelectorAll(
              query.class,
            );
            console.log(`${all_matching_elements.length} elements found`);
            element = all_matching_elements[query.index || 0];
          } else if (query.ariaLabel) {
            element = document.querySelector(
              `[aria-label="${query.ariaLabel}"]`,
            );
          }

          if (element && element instanceof HTMLInputElement) {
            element.value = value;
            const inputEvent = new Event("input", { bubbles: true });
            element.dispatchEvent(inputEvent);
            const changeEvent = new Event("change", { bubbles: true });
            element.dispatchEvent(changeEvent);

            // Necessary for quite a few inputs
            const enterEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              code: "Enter",
              keyCode: 13,
              which: 13,
            });
            element.dispatchEvent(enterEvent);
            console.log("Input successfully filled");
          } else {
            console.error("No matching input field found");
            throw new Error("No matching input field found");
          }
        } catch (error) {
          console.error(`Error filling input: ${(error as Error).message}`);
          throw new Error(`Error filling input: ${(error as Error).message}`);
        }
      } else if (type === messageTypeEnumSchema.Values.retrieve) {
        console.log("Retrieve event received:", query);

        try {
          let element;
          if (query.id) {
            element = document.getElementById(query.id) as HTMLElement;
          } else if (query.class) {
            element = document.querySelectorAll(query.class)[0] as HTMLElement;
          } else if (query.ariaLabel) {
            element = document.querySelector(
              `[aria-label="${query.ariaLabel}"]`,
            ) as HTMLElement;
          }

          if (element) {
            const value =
              element.textContent || (element as HTMLInputElement).value;
            console.log("Value successfully retrieved:", value);
            window.postMessage(
              { type: messageTypeEnumSchema.Values.retrieveResponse, value },
              "*",
            );
          } else {
            console.error("Failed to retrieve value");
          }
        } catch (error) {
          console.error(`Error retrieving value: ${(error as Error).message}`);
          throw new Error(
            `Error retrieving value: ${(error as Error).message}`,
          );
        }
      }
    });
  },
});
