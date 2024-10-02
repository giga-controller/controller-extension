import { backgroundScriptsEnumSchema } from "@/types/background";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: 'ui',
  runAt: "document_end",
  async main() {   
    await injectCustomScript("/injected.js", { keepInDom: true });

    window.addEventListener("message", async (event) => {
        if (event.source !== window) return;
        if (!event.data.type) return;
    
        if (event.data.type === backgroundScriptsEnumSchema.Values.clickButton) { 
            console.log("Click button event received");
            const { id, classQuery, index } = event.data.input;
            await browser.runtime.sendMessage({
                type: backgroundScriptsEnumSchema.Values.clickButton,
                input: event.data.input
            });
        }
    });

    browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.type === backgroundScriptsEnumSchema.Values.fillInput) {
        try {
          const { value, id, classQuery, ariaLabel, index} = message.input;
          let element;
          if (id) {
            element = document.getElementById(id);
          } else if (classQuery) {
            const all_matching_elements = document.querySelectorAll(classQuery);
            console.log(`${all_matching_elements.length} elements found`)
            element = all_matching_elements[index];
          } else if (ariaLabel) {
            element = document.querySelector(`[aria-label="${ariaLabel}"]`);
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
            sendResponse({ success: true });
          } else {
            console.error("No matching input field found");
            sendResponse({ success: false });
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
            const all_matching_elements = document.querySelectorAll(classQuery);
            console.log(`${all_matching_elements.length} elements found`)
            element = all_matching_elements[index] as HTMLElement;
          }

          if (element) {
            element.click();
            console.log("Element successfully clicked");
            sendResponse({ success: true });
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
              console.log("Value successfully retrieved");
              sendResponse({ success: true, value: element.textContent });
            } else {
              console.log("Failed to retrieve value");
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
