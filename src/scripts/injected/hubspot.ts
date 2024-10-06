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

export const createHubspotOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
    const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } = platformDetails;

    const CREATE_APPLICATION_BUTTON_CLASS_QUERY: string = constructClassQuery("uiButton private-button private-button--primary private-button--default private-button--non-link");   
    const clickFirstCreateAppButtonRequest = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: CREATE_APPLICATION_BUTTON_CLASS_QUERY,
      }),
    });
    await waitUntilMessageResolved(clickFirstCreateAppButtonRequest);
}

export const createHubspotOauth2ApplicationPartTwo = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } = platformDetails;

  const CREATE_APPLICATION_BUTTON_CLASS_QUERY: string = constructClassQuery("uiButton private-button private-button--primary private-button--default private-button--non-link");  
  const clickSecondCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_APPLICATION_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickSecondCreateAppButtonRequest);

  const AUTH_TAB_CLASS_QUERY: string = constructClassQuery("private-link uiLinkWithoutUnderline UITab__StyledLink-sc-14gzkc-2 glAWjO private-tab private-link--unstyled");
  const clickAuthTabRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: AUTH_TAB_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickAuthTabRequest);

  const REDIRECT_URI_DATA_TEST_ID: string = "redirect-url-input-text-field";
  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      dataTestId: REDIRECT_URI_DATA_TEST_ID,
    }),
  });
  await waitUntilMessageResolved(fillRedirectUriInputRequest);

  const APPLICATION_DETAILS_CREATE_BUTTON_DATA_TEST_ID: string = "application-details-create-button";
  const clickApplicationDetailsCreateButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      dataTestId: APPLICATION_DETAILS_CREATE_BUTTON_DATA_TEST_ID,
    }),
  });
  await waitUntilMessageResolved(clickApplicationDetailsCreateButtonRequest);

  await waitUntilMessageResolved(clickAuthTabRequest);

}