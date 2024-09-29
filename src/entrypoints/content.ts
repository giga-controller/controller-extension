import { backgroundScriptsEnum } from "@/types/background";

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_end', // Run the content script after the page has finished loading
    main() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "fillInput") {
          try {
            const { xpath, value } = request.input;
            
            // Find the element using XPath
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue as HTMLInputElement | null;
  
            if (element && (element.tagName === "INPUT" || element.tagName === "TEXTAREA")) {
              // Fill the input with the provided value
              element.value = value;
              
              // Trigger input event to simulate user input
              const inputEvent = new Event('input', { bubbles: true });
              element.dispatchEvent(inputEvent);
              
              // Trigger change event
              const changeEvent = new Event('change', { bubbles: true });
              element.dispatchEvent(changeEvent);
              
              sendResponse({ success: true, message: "Input filled successfully" });
            } else {
              sendResponse({ success: false, message: "No matching input field found" });
            }
          } catch (error) {
            sendResponse({ success: false, message: `Error filling input: ${(error as Error).message}` });
          }
        }
        
        return true;
      });
    },
  });