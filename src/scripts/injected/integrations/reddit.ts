/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from "@/lib/utils";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  InjectedScriptProps,
  navigationStateEnumSchema,
  querySelectorSchema,
} from "@/types/scripts/base";

export async function createRedditOauth2ApplicationPartOne({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const CREATE_APP_BUTTON_ID = "create-app-button";
  const clickCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: CREATE_APP_BUTTON_ID,
    }),
  });
  await waitUntilActionMessageResolved(clickCreateAppButtonRequest);

  const INPUT_CLASS_QUERY = constructClassQuery("text");
  const fillNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 0,
    }),
  });
  await waitUntilActionMessageResolved(fillNameInputRequest);

  const fillAboutUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilActionMessageResolved(fillAboutUrlInputRequest);

  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilActionMessageResolved(fillRedirectUriInputRequest);
  updateButtonText(navigationStateEnumSchema.Values.end);
}
