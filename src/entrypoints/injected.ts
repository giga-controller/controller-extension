import { constructClassQuery } from "@/lib/utils";
import {
  createGoogleOauth2ApplicationPartThree,
  createGoogleOauth2ApplicationPartFive,
  createGoogleOauth2ApplicationPartFour,
  createGoogleOauth2ApplicationPartTwo,
  createGoogleOauth2ApplicationPartOne,
} from "@/scripts/injected/integrations/google";
import { createLinearOauth2ApplicationPartOne } from "@/scripts/injected/integrations/linear";
import { createSlackOauth2ApplicationPartOne } from "@/scripts/injected/integrations/slack";
import { createXOauth2ApplicationPartOne } from "@/scripts/injected/integrations/x";
import { createRedditOauth2ApplicationPartOne } from "@/scripts/injected/integrations/reddit";
import { messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  injectButtonRequestSchema,
  querySelectorSchema,
} from "@/types/scripts/base";
import { createHubspotOauth2ApplicationPartOne } from "@/scripts/injected/integrations/hubspot";
import {
  waitUntilActionMessageResolved,
  waitUntilPageLoaded,
  waitUntilRetrieveMessageResolved,
} from "@/scripts/injected/utils";
import { injectButton } from "@/scripts/injected/button";

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
