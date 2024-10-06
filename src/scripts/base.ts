import { getProjectId } from "@/lib/utils";
import {
  PlatformDetails,
  platformDetailsMapping,
  PlatformEnum,
  platformEnum,
} from "@/types/platform";
import { Integration, integrationEnum } from "@/types/integrations";

// TODO: Better regex matching
const NANGO_BASE_URL = "https://app.nango.dev/dev/integrations";
const N8N_BASE_URL = "https://www.google.com"; // Test
const GUMLOOP_BASE_URL = "https://www.amazon.com"; // Test

const GDRIVE_INTEGRATION_PATH_POSSIBILITIES = ["google-drive"];
const GDOCS_INTEGRATION_PATH_POSSIBILITIES = ["google-docs"];
const GSHEETS_INTEGRATION_PATH_POSSIBILITIES = ["google-sheets"];
const GMAIL_INTEGRATION_PATH_POSSIBILITIES = ["gmail", "google-mail"];
const SLACK_INTEGRATION_PATH_POSSIBILITIES = ["slack"];
const LINEAR_INTEGRATION_PATH_POSSIBILITIES = ["linear"];
const X_INTEGRATION_PATH_POSSIBILITIES = ["x", "twitter"];
const REDDIT_INTEGRATION_PATH_POSSIBILITIES = ["reddit"];

export async function getPlatformDetails(): Promise<PlatformDetails> {
  const currentUrl = await getCurrentTabUrl();
  const platform: PlatformEnum = getPlatform(currentUrl);

  const platformDetails: PlatformDetails | undefined =
    platformDetailsMapping[platform];
  if (!platformDetails) {
    throw new Error("Platform details not found");
  }
  platformDetails.projectId = getProjectId(platformDetails.platform);
  platformDetails.integration = getIntegration(currentUrl);

  return platformDetails;
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}

function getPlatform(url: string): PlatformEnum {
  if (url.startsWith(NANGO_BASE_URL)) {
    return platformEnum.Values.nango;
  } else if (url.startsWith(N8N_BASE_URL)) {
    return platformEnum.Values.n8nio;
  } else if (url.startsWith(GUMLOOP_BASE_URL)) {
    return platformEnum.Values.gumloop;
  } else {
    throw new Error("Unsupported platform");
  }
}

function getIntegration(url: string): Integration {
  if (
    GDRIVE_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.gdrive;
  } else if (
    GDOCS_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.gdocs;
  } else if (
    GSHEETS_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.gsheets;
  } else if (
    GMAIL_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.gmail;
  } else if (
    SLACK_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.slack;
  } else if (
    LINEAR_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.linear;
  } else if (
    X_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.x;
  } else if (
    REDDIT_INTEGRATION_PATH_POSSIBILITIES.some((path) => url.includes(path))
  ) {
    return integrationEnum.Values.reddit;
  } else {
    // DEVELOPMENT
    // return integrationEnum.Values.hubspot;

    // PRODUCTION
    throw new Error("Unsupported integration");
  }
}
