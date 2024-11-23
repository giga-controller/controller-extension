import { getProjectId } from "@/lib/utils";
import {
  PlatformDetails,
  platformDetailsMapping,
  Platform,
} from "@/types/platform";
import { Integration } from "@/types/integrations";

type getPlatformDetailsProps = {
  integration: Integration;
  whitelistedUrls: Record<Platform, string[]>;
};
export async function getPlatformDetails({
  integration,
  whitelistedUrls,
}: getPlatformDetailsProps): Promise<PlatformDetails> {
  const currentUrl = await getCurrentTabUrl();
  const platform: Platform | undefined = Object.entries(whitelistedUrls).find(
    ([_, urlList]) => urlList.some((url) => currentUrl.includes(url)),
  )?.[0] as Platform | undefined;

  if (!platform) {
    throw new Error("No matching platform key found");
  }

  const platformDetails: PlatformDetails | undefined =
    platformDetailsMapping[platform];
  if (!platformDetails) {
    throw new Error("Platform details not found");
  }
  platformDetails.projectId = getProjectId(platformDetails.platform);
  platformDetails.integration = integration;

  return platformDetails;
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}
