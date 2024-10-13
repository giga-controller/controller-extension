import { updateButtonText } from "@/lib/utils";
import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import {
  BaseRequest,
  clickRequestSchema,
  fillInputRequestSchema,
  navigationStateEnumSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";

export async function waitUntilActionMessageResolved(
  request: BaseRequest,
): Promise<void> {
  let requestInstance: BaseRequest;
  let responseMessageType: MessageTypeEnum;

  if (request.type === messageTypeEnumSchema.Values.click) {
    if (clickRequestSchema.safeParse(request).success) {
      console.log("Waiting for Click Message to be resolved");
      requestInstance = clickRequestSchema.parse(request);
      responseMessageType = messageTypeEnumSchema.Values.clickResponse;
      updateButtonText(navigationStateEnumSchema.Values.click);
    } else {
      throw new Error("Invalid request type for click");
    }
  } else if (request.type === messageTypeEnumSchema.Values.fillInput) {
    if (fillInputRequestSchema.safeParse(request).success) {
      requestInstance = fillInputRequestSchema.parse(request);
      responseMessageType = messageTypeEnumSchema.Values.fillInputResponse;
      updateButtonText(navigationStateEnumSchema.Values.fill);
    } else {
      throw new Error("Invalid request type for fillInput");
    }
  }

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, "*");
    }, 1000);

    const listener = (event: any) => {
      if (event.source !== window) return;
      if (event.data.type === responseMessageType) {
        clearInterval(interval);
        window.removeEventListener("message", listener);
        console.log("Message received:", event.data);
        resolve(event.data.value);
      }
    };
    window.addEventListener("message", listener);
  });
}

export async function waitUntilRetrieveMessageResolved(
  request: RetrieveRequest,
): Promise<string> {
  console.log("Waiting for Retrieve Message to be resolved");
  let requestInstance: RetrieveRequest;
  let responseMessageType: MessageTypeEnum;

  if (retrieveRequestSchema.safeParse(request).success) {
    requestInstance = retrieveRequestSchema.parse(request);
    responseMessageType = messageTypeEnumSchema.Values.retrieveResponse;
    updateButtonText(navigationStateEnumSchema.Values.retrieve);
  } else {
    throw new Error("Invalid request type");
  }

  return new Promise<string>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, "*");
    }, 1000);

    const listener = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data.type === responseMessageType) {
        clearInterval(interval);
        window.removeEventListener("message", listener);
        resolve(event.data.value);
      }
    };
    window.addEventListener("message", listener);
  });
}

export async function waitUntilPageLoaded() {
  updateButtonText(navigationStateEnumSchema.Values.wait);
  await new Promise((resolve) => {
    window.addEventListener("load", resolve);
  });
}

export async function resetBrowserStorage() {
  window.postMessage({ type: messageTypeEnumSchema.Values.resetBrowserStorage }, "*");

}
