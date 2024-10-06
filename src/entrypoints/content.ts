import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { QuerySelector } from "@/types/scripts/base";
import { PlatformDetails } from "@/types/platform";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  async main() {
    if ((window as any).__contentScriptInjected) return;
    (window as any).__contentScriptInjected = true;

    browser.storage.local
      .get([
        "platform",
        "javaScriptOriginUri",
        "javaScriptRedirectUri",
        "projectId",
        "integration",
      ])
      .then(async (data) => {
        // IMPORTANT: Uncomment this line while testing parts of the integration flow so that the id is always updated for testing. BUT this line should never be commented out in production
        // platformDetails.projectId = getProjectId(platformDetails.platform);

        // Inject main script
        await injectCustomScript("/injected.js", { keepInDom: true });
        setTimeout(() => {
          window.postMessage(
            {
              type: messageTypeEnumSchema.Values.platformDetails,
              data: data,
            },
            "*",
          );
        }, 1500);
      });

    window.addEventListener("message", async (event) => {
      if (event.source !== window) return;
      if (!event.data.type) return;

      const type: MessageTypeEnum = event.data.type;
      const query: QuerySelector = event.data.query;
      const platformDetails: PlatformDetails = event.data.data;

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
            element = all_matching_elements[
              Math.min(query.index || 0, all_matching_elements.length - 1)
            ] as HTMLElement;
          } else if (query.ariaLabel) {
            element = document.querySelector(
              `[aria-label="${query.ariaLabel}"]`,
            ) as HTMLElement;
          } else if (query.dataTestId) {
            element = document.querySelector(
              `[data-testid="${query.dataTestId}"]`,
            ) as HTMLElement;
          }

          if (element) {
            element.click();
            console.log("Element successfully clicked");
            window.postMessage(
              { type: messageTypeEnumSchema.Values.clickResponse },
              "*",
            );
          }
        } catch (error) {
          console.error(`Error clicking: ${(error as Error).message}`);
          throw new Error(`Error clicking: ${(error as Error).message}`);
        }
      } else if (type === messageTypeEnumSchema.Values.fillInput) {
        console.log("Fill input event received:", query);

        const value: string = event.data.value;
        if (!value) {
          console.error("Value to fill cannot be empty/null/undefined");
          return;
        }

        try {
          let element;
          if (query.id) {
            element = document.getElementById(query.id);
          } else if (query.class) {
            const all_matching_elements = document.querySelectorAll(
              query.class,
            );
            console.log(`${all_matching_elements.length} elements found`);
            element = all_matching_elements[
              Math.min(query.index || 0, all_matching_elements.length - 1)
            ] as HTMLElement;
            console.log("Element successfully retrieved:", element);
          } else if (query.ariaLabel) {
            element = document.querySelector(
              `[aria-label="${query.ariaLabel}"]`,
            );
          } else if (query.value) {
            element = document.querySelector(`[value="${query.value}"]`);
          } else if (query.ariaLabelledby) {
            element = document.querySelector(
              `[aria-labelledby="${query.ariaLabelledby}"]`,
            );
          } else if (query.dataTestId) {
            element = document.querySelector(
              `[data-testid="${query.dataTestId}"]`,
            );
          }

          if (
            element &&
            (element instanceof HTMLInputElement ||
              element instanceof HTMLTextAreaElement)
          ) {
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
            window.postMessage(
              { type: messageTypeEnumSchema.Values.fillInputResponse },
              "*",
            );
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
            const all_matching_elements = document.querySelectorAll(
              query.class,
            );
            console.log(`${all_matching_elements.length} elements found`);
            element = all_matching_elements[
              Math.min(query.index || 0, all_matching_elements.length - 1)
            ] as HTMLElement;
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
              {
                type: messageTypeEnumSchema.Values.retrieveResponse,
                value: value,
              },
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
      } else if (type === messageTypeEnumSchema.Values.platformDetails) {
        console.log("Platform details received:", platformDetails);
        window.postMessage(
          {
            type: messageTypeEnumSchema.Values.platformDetailsResponse,
            data: platformDetails,
          },
          "*",
        );
      }
    });
  },
});
