/* eslint-disable unused-imports/no-unused-vars */
import { updateButtonText } from "@/lib/utils";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  InjectedScriptProps,
  navigationStateEnumSchema,
  querySelectorSchema,
} from "@/types/scripts/base";

export async function createLinearOauth2ApplicationPartOne({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const APPLICATION_NAME_INPUT_ID: string = "name";
  const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: APPLICATION_NAME_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillApplicationNameInputRequest);

  const DEVELOPER_NAME_INPUT_ID: string = "developer";
  const fillDeveloperNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: DEVELOPER_NAME_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillDeveloperNameInputRequest);

  const DEVELOPER_URL_INPUT_ID: string = "developerUrl";
  const fillDeveloperUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      id: DEVELOPER_URL_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillDeveloperUrlInputRequest);

  const REDIRECT_URI_INPUT_ID: string = "redirectUris";
  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      id: REDIRECT_URI_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillRedirectUriInputRequest);

  // TODO: temp fix for Linear create button - could not find a way to uniquelyidentify the button
  const CREATE_APPLICATION_BUTTON_TYPE: string = "submit";
  const clickCreateApplicationButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      type: CREATE_APPLICATION_BUTTON_TYPE,
    }),
  });
  await waitUntilActionMessageResolved(clickCreateApplicationButtonRequest);
  updateButtonText(navigationStateEnumSchema.Values.end);

  resetBrowserStorage();
}
