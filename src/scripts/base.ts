import {
  NavigateToUrlRequest,
} from "@/types/scripts/base";

// AARON export async function getProjectName(): Promise<string> {

export async function navigateToUrl({
  type,
  url,
}: NavigateToUrlRequest) {
  try {
    await browser.runtime.sendMessage({ type: type, input: url });
  } catch (err: any) {
    console.error("Error navigating to URL:", err);
  }
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}
