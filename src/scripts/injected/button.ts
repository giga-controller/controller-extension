import {
  InjectButtonRequest,
  navigationStateEnumSchema,
} from "@/types/scripts/base";
import { logoBase64 } from "@/constants/logoBase64";
import { updateButtonText } from "@/lib/utils";

const createButton = (autoClick: boolean, onClick: () => Promise<void>) => {
  // This function creates a button and injects it into the client's DOM
  const container = document.createElement("div");
  container.id = "auth-maven-container";
  container.style.position = "fixed";
  container.style.top = "50px";
  container.style.right = "10px";
  container.style.zIndex = "10000";
  container.style.width = "200px";
  container.style.height = "50px";
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.padding = "5px";
  container.style.backgroundColor = "#4CAF50";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";

  const button = document.createElement("button");
  button.id = "auth-maven-button";
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.cursor = "pointer";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.transition = "background-color 0.3s, transform 0.1s";
  button.style.animation = "pulsate 1.5s infinite";

  const styleElement = document.createElement("style");
  styleElement.textContent = `
      @keyframes pulsate {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
  document.head.appendChild(styleElement);

  const img = document.createElement("img");
  img.src = `${logoBase64}`;
  img.alt = "Button icon";
  img.style.width = "24px";
  img.style.height = "24px";
  img.style.marginRight = "10px";

  container.appendChild(img);
  container.appendChild(button);

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#45a049";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#4CAF50";
  });

  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.95)";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1)";
  });

  button.addEventListener("click", async () => {
    await onClick();
  });

  document.body.appendChild(container);
  updateButtonText(navigationStateEnumSchema.Values.start);
  if (autoClick) {
    button.click();
  }
};

export async function injectButton({
  autoClick,
  baseUrl,
  querySelector,
  injectedScript,
}: InjectButtonRequest) {
  await new Promise<void>((resolve) => {
    if (!window.location.href.includes(baseUrl)) {
      resolve();
    }

    const interval = setInterval(() => {
      let element: Element | null = null;
      if (querySelector.id) {
        element = document.getElementById(querySelector.id);
      } else if (querySelector.class) {
        console.log("querySelector.class", querySelector.class);
        element = document.querySelectorAll(querySelector.class)[
          querySelector.index || 0
        ];
      } else if (querySelector.ariaLabel) {
        element = document.querySelector(
          `[aria-label="${querySelector.ariaLabel}"]`,
        );
      } else if (querySelector.dataTestId) {
        element = document.querySelector(
          `[data-testid="${querySelector.dataTestId}"]`,
        );
      }

      if (element) {
        clearInterval(interval);
        createButton(autoClick, async () => {
          await injectedScript();
        });
        resolve();
      } else {
        if (document.readyState === "complete") {
          location.reload();
        }
      }
    }, 5000);
  });
}
