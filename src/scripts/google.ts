import { constructClassQuery, getProjectId } from "@/lib/utils";
import { click, fillInput, navigateToUrl, retrieve } from "@/scripts/base";
import { messageTypeEnumSchema } from "@/types/background";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  navigateToUrlRequestSchema,
  querySelectorSchema,
  retrieveRequestSchema,
} from "@/types/scripts/base";

interface GoogleFlowProps {
  url: string;
  projectName: string;
  originUri: string;
  redirectUri: string;
}

export default async function googleFlow({
  url,
  projectName,
  originUri,
  redirectUri,
}: GoogleFlowProps) {
  const projectId: string = getProjectId(projectName);

  localStorage.setItem("AuthMavenProjectName", projectName);
  localStorage.setItem("AuthMavenOriginUri", originUri);
  localStorage.setItem("AuthMavenRedirectUri", redirectUri);
  localStorage.setItem("AuthMavenProjectId", projectId);

  const navigateToGoogleConsoleRequest = navigateToUrlRequestSchema.parse({
    type: messageTypeEnumSchema.Values.navigateToUrl,
    url: url,
  });
  await navigateToUrl(navigateToGoogleConsoleRequest);
}
