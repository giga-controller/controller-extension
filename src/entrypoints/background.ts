export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "navigateToUrl") {
      // Get the current active tab
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log("tabs", tabs);
        if (tabs[0]) {
          console.log("tabs[0].id", tabs[0].id);
          // Update the URL of the current tab
          chrome.tabs.update(tabs[0].id!, {url: request.url}, (tab) => {
            if (chrome.runtime.lastError) {
              sendResponse({ error: chrome.runtime.lastError, success: false });
            } else {
              sendResponse({ success: true, tabId: tab?.id });
            }
          });
        } else {
          sendResponse({ error: "No active tab found", success: false });
        }
      });
      return true; // Indicates we will send a response asynchronously
    }
  });
});