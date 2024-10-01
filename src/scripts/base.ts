import {
  ClickButtonRequest,
  FillInputRequest,
  NavigateToUrlRequest,
  RetrieveRequest,
} from "@/types/scripts/base";

// AARON export async function getProjectName(): Promise<string> {

export async function navigateToUrl({
  messageType,
  url,
}: NavigateToUrlRequest) {
  try {
    await browser.runtime.sendMessage({ type: messageType, input: url });
  
    while (true) {
      const currentUrl = await getCurrentTabUrl();
      if (currentUrl.startsWith(url)) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
    }
  
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (err: any) {
    console.error("Error navigating to URL:", err);
  }
}

export async function click({
  messageType,
  id,
  classQuery,
  index
}: ClickButtonRequest) {
  try {
    await browser.runtime.sendMessage({
      type: messageType,
      input: { id, classQuery, index },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (err: any) {
    console.error("Error clicking button:", err);
  }
}

export async function fillInput({
  messageType,
  value,
  id,
  classQuery,
  ariaLabel,
  index,
}: FillInputRequest) {
  try {
    await browser.runtime.sendMessage({
      type: messageType,
      input: { value, id, classQuery, ariaLabel, index },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (err: any) {
    console.error("Error navigating to URL:", err);
  }
}

export async function retrieve({
  messageType,
  id,
  classQuery,
}: RetrieveRequest): Promise<string> {
  try {
    const text: string = await browser.runtime.sendMessage({
      type: messageType,
      input: { id, classQuery },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return text;
  } catch (err: any) {
    console.error("Error retrieving:", err);
    return "";
  }
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}