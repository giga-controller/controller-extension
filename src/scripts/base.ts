import {
  ClickButtonRequest,
  FillInputRequest,
  NavigateToUrlRequest,
} from "@/types/scripts/base";

// AARON export async function getProjectName(): Promise<string> {

export async function navigateToUrl({
  messageType,
  url,
}: NavigateToUrlRequest): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: messageType, input: url });
    return true;
  } catch (err: any) {
    console.error("Error navigating to URL:", err);
    return false;
  }
}

export async function click({
  messageType,
  id,
  classQuery,
}: ClickButtonRequest): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({
      type: messageType,
      input: { id, classQuery },
    });
    return true;
  } catch (err: any) {
    console.error("Error clicking button:", err);
    return false;
  }
}

export async function fillInput({
  messageType,
  id,
  classQuery,
  value,
}: FillInputRequest): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({
      type: messageType,
      input: { id, classQuery,value },
    });
    return true;
  } catch (err: any) {
    console.error("Error navigating to URL:", err);
    return false;
  }
}
