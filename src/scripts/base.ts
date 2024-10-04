import {
  PlatformDetails,
  platformDetailsMapping,
  PlatformEnum,
  platformEnum,
} from "@/types/platform";

// TODO: Better regex matching
const NANGO_BASE_URL = "https://app.nango.dev/dev/integrations";
const N8N_BASE_URL = "https://www.google.com"; // Test
const GUMLOOP_BASE_URL = "https://www.amazon.com"; // Test

export async function getPlatformDetails(): Promise<PlatformDetails> {
  const currentUrl = await getCurrentTabUrl();
  let platform: PlatformEnum;
  if (currentUrl.startsWith(NANGO_BASE_URL)) {
    platform = platformEnum.Values.nango;
  } else if (currentUrl.startsWith(N8N_BASE_URL)) {
    platform = platformEnum.Values.n8nio;
  } else if (currentUrl.startsWith(GUMLOOP_BASE_URL)) {
    platform = platformEnum.Values.gumloop;
  } else {
    throw new Error("Unsupported platform");
  }

  const platformDetails: PlatformDetails | undefined =
    platformDetailsMapping[platform];
  if (!platformDetails) {
    throw new Error("Platform details not found");
  }

  return platformDetails;
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}
