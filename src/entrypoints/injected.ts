import { createGoogleOauth2Application } from "@/scripts/google/injected";
import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { QuerySelector } from "@/types/scripts/base";

const GOOGLE_CLOUD_BASE_URL = "https://console.cloud.google.com";
// const GOOGLE_CLOUD_BASE_URL = "https://www.google.com"

export default defineUnlistedScript(() => {
  window.addEventListener("message", async (event) => {
    if (event.source !== window) return;
    if (!event.data.type) return;

    const type: MessageTypeEnum = event.data.type;
    const query: QuerySelector = event.data.query;

    if (type === messageTypeEnumSchema.Values.click) {
      console.log("Click event received:", query);
    }
  });

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

  if (window.location.href.includes(GOOGLE_CLOUD_BASE_URL)) {
    createButton(createGoogleOauth2Application);
  }
});
