/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery } from "@/lib/utils";
import { PlatformDetails } from "@/types/platform";
import {
  BaseRequest,
  clickRequestSchema,
  fillInputRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
} from "@/types/scripts/base";

export const createLinearOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const APPLICATION_NAME_INPUT_ID: string = "name";
  const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: APPLICATION_NAME_INPUT_ID,
    }),
  });
  await waitUntilMessageResolved(fillApplicationNameInputRequest);

  const DEVELOPER_NAME_INPUT_ID: string = "developer";
  const fillDeveloperNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: DEVELOPER_NAME_INPUT_ID,
    }),
  });
  await waitUntilMessageResolved(fillDeveloperNameInputRequest);

  const DEVELOPER_URL_INPUT_ID: string = "developerUrl";
  const fillDeveloperUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      id: DEVELOPER_URL_INPUT_ID,
    }),
  });
  await waitUntilMessageResolved(fillDeveloperUrlInputRequest);

  const REDIRECT_URI_INPUT_ID: string = "redirectUris";
  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      id: REDIRECT_URI_INPUT_ID,
    }),
  });
  await waitUntilMessageResolved(fillRedirectUriInputRequest);

  const CREATE_APPLICATION_BUTTON_CLASS_QUERY: string =
    constructClassQuery("sc-blmEgr gIiobM");
  const clickCreateApplicationButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_APPLICATION_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickCreateApplicationButtonRequest);
};
