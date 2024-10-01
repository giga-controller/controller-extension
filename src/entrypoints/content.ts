import { backgroundScriptsEnumSchema } from "@/types/background";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: 'ui',
  runAt: "document_end", // Run the content script after the page has finished loading
  main() {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === backgroundScriptsEnumSchema.Values.fillInput) {
        try {
          const { value, id, classQuery, ariaLabel, index} = message.input;
          let element;
          if (id) {
            element = document.getElementById(id);
          } else if (classQuery) {
            sendResponse({ length: document.querySelectorAll(classQuery).length });
            element = document.querySelectorAll(classQuery)[index];
          } else if (ariaLabel) {
            element = document.querySelectorAll(`[aria-label="${ariaLabel}"]`);
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

            sendResponse({ success: true });
          } else {
            console.error("No matching input field found");
            throw new Error("No matching input field found");
          }
        } catch (error) {
          console.error(`Error filling input: ${(error as Error).message}`);
          throw new Error(`Error filling input: ${(error as Error).message}`);
        }
      } else if (
        message.type === backgroundScriptsEnumSchema.Values.clickButton
      ) {
        const { id, classQuery, index } = message.input;

        try {
          let element;
          if (id) {
            element = document.getElementById(id) as HTMLElement;
          } else if (classQuery) {
            element = document.querySelectorAll(classQuery)[index] as HTMLElement;
          }

          if (element) {
            element.click();
            sendResponse({ success: true, class: element.className });
          }
        } catch (error) {
          console.error(`Error clicking button: ${(error as Error).message}`);
          throw new Error(`Error clicking button: ${(error as Error).message}`);
        }
      } else if (message.type === backgroundScriptsEnumSchema.Values.retrieve) {
          const { id, classQuery } = message.input;

          try {
            let element;
            if (id) {
              element = document.getElementById(id) as HTMLElement;
            } else if (classQuery) {
              element = document.querySelectorAll(classQuery)[0] as HTMLElement;
            }

            if (element) {
              sendResponse({ success: true, value: element.textContent });
            } else {
              sendResponse({ success: false, value: "" });
            }
          } catch (error) {
            console.error(`Error retrieving value: ${(error as Error).message}`);
            throw new Error(`Error retrieving value: ${(error as Error).message}`);
          }
        }
      return true;
    });
  },
});
