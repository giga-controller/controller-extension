import { constructClassQuery, updateButtonText } from "@/lib/utils";
import {
  createGoogleOauth2ApplicationPartThree,
  createGoogleOauth2ApplicationPartFive,
  createGoogleOauth2ApplicationPartFour,
  createGoogleOauth2ApplicationPartTwo,
  createGoogleOauth2ApplicationPartOne,
} from "@/scripts/injected/google";
import { createLinearOauth2ApplicationPartOne } from "@/scripts/injected/linear";
import { createSlackOauth2ApplicationPartOne } from "@/scripts/injected/slack";
import { createXOauth2ApplicationPartOne } from "@/scripts/injected/x";
import { createRedditOauth2ApplicationPartOne } from "@/scripts/injected/reddit";
import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  BaseRequest,
  clickRequestSchema,
  fillInputRequestSchema,
  InjectButtonRequest,
  injectButtonRequestSchema,
  navigationStateEnumSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";
import { createHubspotOauth2ApplicationPartOne } from "@/scripts/injected/hubspot";
import { logoBase64 } from "@/constants/logoBase64";

const GOOGLE_CLOUD_BASE_URL = "https://console.cloud.google.com";
const GOOGLE_CLOUD_START_PAGE_BASE_URL: string =
  "https://console.cloud.google.com/welcome";
const GOOGLE_CLOUD_MARKETPLACE_BASE_URL =
  "https://console.cloud.google.com/marketplace/product/google";
const GOOGLE_CLOUD_API_BASE_URL: string = `https://console.cloud.google.com/apis/api`;
const GOOGLE_CLOUD_OAUTH_CONSENT_BASE_URL =
  "https://console.cloud.google.com/apis/credentials/consent";
const GOOGLE_CLOUD_OAUTH_CLIENT_BASE_URL: string = `https://console.cloud.google.com/apis/credentials/oauthclient`;
const LINEAR_BASE_URL = "https://linear.app";
const SLACK_HOME_PAGE_URL = "https://app.slack.com/client";
const SLACK_BASE_URL = "https://api.slack.com/apps";
const X_HOME_PAGE_URL = "https://x.com/home";
const X_DEVELOPER_PAGE_URL = "https://developer.x.com/en/portal/dashboard";
const REDDIT_TARGET_URL = "https://www.reddit.com/prefs/apps";
const HUBSPOT_TARGET_BASE_URL = "https://app.hubspot.com/developer";

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

// We probably do not want to unify this helper functions into one because the messages' schema overlap with one another and safeParse might lead to the wrong condition. Additionally, these scripts need to be passed into the function, and cannot be imported
async function waitUntilActionMessageResolved(
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
    console.log("Waiting for Fill Input Message to be resolved");
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
      } else if (event.data.type === messageTypeEnumSchema.Values.error) {
        location.reload();
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
      } else if (event.data.type === messageTypeEnumSchema.Values.error) {
        location.reload();
      }
    };
    window.addEventListener("message", listener);
  });
}

async function waitUntilPageLoaded() {
  updateButtonText(navigationStateEnumSchema.Values.wait);
  await new Promise((resolve) => {
    window.addEventListener("load", resolve);
  });
}

async function injectButton({
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
    }, 3000);
  });
}

export default defineUnlistedScript(() => {
  let platformDetails: PlatformDetails | null = null;

  const initializeButton = async () => {
    if (!platformDetails) {
      return;
    }

    if (window.location.href.includes(GOOGLE_CLOUD_START_PAGE_BASE_URL)) {
      const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
        "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
      );
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: GOOGLE_CLOUD_START_PAGE_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createGoogleOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartOneButtonRequest);
    } else if (
      window.location.href.includes(GOOGLE_CLOUD_MARKETPLACE_BASE_URL)
    ) {
      const ENABLE_INTEGRATION_API_CLASS_QUERY: string = constructClassQuery(
        "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button cfc-tooltip cfc-tooltip-disable-user-select-on-touch-device ng-star-inserted",
      );
      const injectPartTwoButtonRequest = injectButtonRequestSchema.parse({
        autoClick: true,
        baseUrl: GOOGLE_CLOUD_MARKETPLACE_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: ENABLE_INTEGRATION_API_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createGoogleOauth2ApplicationPartTwo(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartTwoButtonRequest);
    } else if (
      window.location.href.includes(GOOGLE_CLOUD_OAUTH_CONSENT_BASE_URL)
    ) {
      const EXTERNAL_USER_TYPE_INPUT_ID: string = "_0rif_mat-radio-3-input";
      const injectPartFourButtonRequest = injectButtonRequestSchema.parse({
        autoClick: true,
        baseUrl: GOOGLE_CLOUD_OAUTH_CONSENT_BASE_URL,
        querySelector: querySelectorSchema.parse({
          id: EXTERNAL_USER_TYPE_INPUT_ID,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createGoogleOauth2ApplicationPartFour(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartFourButtonRequest);
    } else if (
      window.location.href.includes(GOOGLE_CLOUD_OAUTH_CLIENT_BASE_URL)
    ) {
      const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
        "mdc-floating-label mat-mdc-floating-label ng-star-inserted",
      );
      const injectPartFiveButtonRequest = injectButtonRequestSchema.parse({
        autoClick: true,
        baseUrl: GOOGLE_CLOUD_OAUTH_CLIENT_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createGoogleOauth2ApplicationPartFive(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartFiveButtonRequest);
    } else if (
      window.location.href.includes(LINEAR_BASE_URL) &&
      !window.location.href.includes("/new")
    ) {
      const workspaceName =
        window.location.href.match(/https:\/\/linear\.app\/([^/]+)/)?.[1] || "";
      console.log("workspaceName", workspaceName);

      const LINEAR_OAUTH_SETTINGS_URL = `${LINEAR_BASE_URL}/${workspaceName}/settings/api/applications/new`;

      window.location.href = LINEAR_OAUTH_SETTINGS_URL;
    } else if (
      window.location.href.includes(LINEAR_BASE_URL) &&
      window.location.href.includes("/new")
    ) {
      const APPLICATION_NAME_INPUT_ID: string = "name";
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: LINEAR_BASE_URL,
        querySelector: querySelectorSchema.parse({
          id: APPLICATION_NAME_INPUT_ID,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createLinearOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });

      console.log("injectPartOneButtonRequest", injectPartOneButtonRequest);
      await injectButton(injectPartOneButtonRequest);
    } else if (window.location.href.includes(SLACK_HOME_PAGE_URL)) {
      // Slack's redirection after logging in is wonky (it redirects to home page instead of developer portal)
      window.location.href = SLACK_BASE_URL;
    } else if (window.location.href === SLACK_BASE_URL) {
      const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
        "create_new_app_button",
      );
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: SLACK_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: CREATE_APP_BUTTON_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createSlackOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartOneButtonRequest);
    } else if (window.location.href === X_HOME_PAGE_URL) {
      // X's redirection after logging in is wonky (it redirects to home page instead of developer portal)
      window.location.href = X_DEVELOPER_PAGE_URL;
    } else if (window.location.href === X_DEVELOPER_PAGE_URL) {
      const PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY = constructClassQuery(
        "index__navItemButton--352Fy",
      );
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: X_DEVELOPER_PAGE_URL,
        querySelector: querySelectorSchema.parse({
          class: PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createXOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartOneButtonRequest);
    } else if (window.location.href === REDDIT_TARGET_URL) {
      const CREATE_APP_BUTTON_ID = "create-app-button";
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: REDDIT_TARGET_URL,
        querySelector: querySelectorSchema.parse({
          id: CREATE_APP_BUTTON_ID,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createRedditOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartOneButtonRequest);
    } else if (
      window.location.href.includes(HUBSPOT_TARGET_BASE_URL) &&
      window.location.href.includes("/home")
    ) {
      const projectName: string =
        window.location.href.match(/developer\/(\d+)/)?.[1] || "";
      window.location.href = `${HUBSPOT_TARGET_BASE_URL}/${projectName}/application/draft`;
    } else if (
      window.location.href.includes(HUBSPOT_TARGET_BASE_URL) &&
      !window.location.href.includes("/home")
    ) {
      const AUTH_TAB_CLASS_QUERY: string = constructClassQuery(
        "private-link uiLinkWithoutUnderline UITab__StyledLink-sc-14gzkc-2 glAWjO private-tab private-link--unstyled",
      );
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: HUBSPOT_TARGET_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: AUTH_TAB_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails) return;
          await createHubspotOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          );
        },
      });
      await injectButton(injectPartOneButtonRequest);
    }
  };

  window.addEventListener("message", async (event) => {
    if (event.source !== window) return;
    if (event.data.type === messageTypeEnumSchema.Values.platformDetails) {
      platformDetails = event.data.data;
      await initializeButton();
    }
  });
});
