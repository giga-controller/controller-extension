import { createGoogleOauth2Application } from "@/scripts/google/injected";
import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  QuerySelector,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";

const GOOGLE_CLOUD_BASE_URL = "https://console.cloud.google.com";
// const GOOGLE_CLOUD_BASE_URL = "https://www.google.com"

// We probably do not want to unify this helper functions into one because the messages' schema overlap with one another and safeParse might lead to the wrong condition. Additionally, these scripts need to be passed into the function, and cannot be imported
async function waitUntilClickMessageResolved(request: ClickRequest) {
  console.log("Waiting for Click Message to be resolved");
  let requestInstance: ClickRequest;
  let responseMessageType: MessageTypeEnum;

  if (clickRequestSchema.safeParse(request).success) {
    requestInstance = clickRequestSchema.parse(request);
    responseMessageType = messageTypeEnumSchema.Values.clickResponse;
  } else {
    throw new Error("Invalid request type");
  }

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, "*");
    }, 1000);

    const listener = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data.type === responseMessageType) {
        clearInterval(interval);
        window.removeEventListener("message", listener);
        resolve();
      }
    };
    window.addEventListener("message", listener);
  });
}

async function waitUntilFillInputMessageResolved(request: ClickRequest) {
  console.log("Waiting for Fill Input Message to be resolved");
  let requestInstance: FillInputRequest;
  let responseMessageType: MessageTypeEnum;

  if (fillInputRequestSchema.safeParse(request).success) {
    requestInstance = fillInputRequestSchema.parse(request);
    responseMessageType = messageTypeEnumSchema.Values.fillInputResponse;
  } else {
    throw new Error("Invalid request type");
  }

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, "*");
    }, 1000);

    const listener = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data.type === responseMessageType) {
        clearInterval(interval);
        window.removeEventListener("message", listener);
        resolve();
      }
    };
    window.addEventListener("message", listener);
  });
}

async function waitUntilRetrieveMessageResolved(
  request: RetrieveRequest,
): Promise<string> {
  console.log("Waiting for Retrieve Message to be resolved");
  let requestInstance: RetrieveRequest;
  let responseMessageType: MessageTypeEnum;

  if (retrieveRequestSchema.safeParse(request).success) {
    requestInstance = retrieveRequestSchema.parse(request);
    responseMessageType = messageTypeEnumSchema.Values.retrieveResponse;
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

async function waitUntilPageLoaded() {
  await new Promise((resolve) => {
    window.addEventListener("load", resolve);
  });
}

export default defineUnlistedScript(() => {
  const createButton = (onClick: () => Promise<void>) => {
    const button = document.createElement("button");
    button.textContent = "Start Auth Maven";
    button.style.position = "fixed";
    button.style.width = "200px";
    button.style.height = "50px";
    button.style.top = "10px";
    button.style.right = "10px";
    button.style.zIndex = "10000";
    button.style.backgroundColor = "#4CAF50";
    button.addEventListener("click", async () => {
      await onClick();
    });

    // TODO: Add an image to the button

    document.body.appendChild(button);
  };

  let platformDetails: PlatformDetails | null = null;

  const initializeButton = () => {
    if (
      window.location.href.includes(GOOGLE_CLOUD_BASE_URL) &&
      platformDetails
    ) {
      createButton(async () => {
        if (!platformDetails) return;
        await createGoogleOauth2Application(
          platformDetails,
          waitUntilClickMessageResolved,
          waitUntilFillInputMessageResolved,
          waitUntilRetrieveMessageResolved,
          waitUntilPageLoaded,
        );
      });
    }
  };

  // Listen for the data message
  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type === messageTypeEnumSchema.Values.platformDetails) {
      platformDetails = event.data.data;
      initializeButton();
    }
  });

  // In case the script loads after the message has been sent
  // if (platformDetails) {
  //   initializeButton();
  // }
});
