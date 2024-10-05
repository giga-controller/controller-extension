/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery } from "@/lib/utils";
import { messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  BaseRequest,
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";

export const createXOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY = constructClassQuery(
    "index__navItemButton--352Fy",
  );
  const clickProjectAndAppDropdownRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilMessageResolved(clickProjectAndAppDropdownRequest);

  const PROJECT_BUTTON_CLASS_QUERY = constructClassQuery(
    "index__navItemButton--17Psw",
  );
  const clickProjectButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: PROJECT_BUTTON_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilMessageResolved(clickProjectButtonRequest);

  const SET_UP_USER_AUTH_BUTTON_CLASS_QUERY = constructClassQuery(
    "Button Button--primary index__setUpButton--1Icpv",
  );
  const clickSetUpUserAuthButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SET_UP_USER_AUTH_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickSetUpUserAuthButtonRequest);

  const APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY =
    constructClassQuery("RadioButton-input");
  const clickAppPermissionsRadioInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilMessageResolved(clickAppPermissionsRadioInputRequest);

  const clickAppTypeRadioInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY,
      index: 4,
    }),
  });
  await waitUntilMessageResolved(clickAppTypeRadioInputRequest);

  const REDIRECT_URI_INPUT_CLASS_QUERY = constructClassQuery(
    "index__callbackUrlInput--1N_ld FormInput",
  );
  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: REDIRECT_URI_INPUT_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(fillRedirectUriInputRequest);

  const WEBSITE_URL_INPUT_DATA_TEST_ID = "website-url-input";
  const fillWebsiteUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      dataTestId: WEBSITE_URL_INPUT_DATA_TEST_ID,
    }),
  });
  await waitUntilMessageResolved(fillWebsiteUrlInputRequest);

  const SAVE_BUTTON_DATA_TEST_ID = "save-auth-setting-button";
  const clickSaveButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      dataTestId: SAVE_BUTTON_DATA_TEST_ID,
    }),
  });
  await waitUntilMessageResolved(clickSaveButtonRequest);

  const CONFIRM_CHANGE_PERMISSION_BUTTON_DATA_TEST_ID = "action-button";
  const clickConfirmChangePermissionButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      dataTestId: CONFIRM_CHANGE_PERMISSION_BUTTON_DATA_TEST_ID,
    }),
  });
  await waitUntilMessageResolved(clickConfirmChangePermissionButtonRequest);
};
