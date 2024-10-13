/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from "@/lib/utils";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  InjectedScriptProps,
  navigationStateEnumSchema,
  querySelectorSchema,
} from "@/types/scripts/base";

export async function createXOauth2ApplicationPartOne({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
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

  await waitUntilActionMessageResolved(clickProjectAndAppDropdownRequest);

  const PROJECT_BUTTON_CLASS_QUERY = constructClassQuery(
    "index__navItemButton--17Psw",
  );
  const clickProjectButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: PROJECT_BUTTON_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilActionMessageResolved(clickProjectButtonRequest);

  const SET_UP_USER_AUTH_BUTTON_CLASS_QUERY = constructClassQuery(
    "Button Button--primary index__setUpButton--1Icpv",
  );
  const clickSetUpUserAuthButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SET_UP_USER_AUTH_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickSetUpUserAuthButtonRequest);

  const APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY =
    constructClassQuery("RadioButton-input");
  const clickAppPermissionsRadioInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilActionMessageResolved(clickAppPermissionsRadioInputRequest);

  const clickAppTypeRadioInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY,
      index: 4,
    }),
  });
  await waitUntilActionMessageResolved(clickAppTypeRadioInputRequest);

  const REDIRECT_URI_INPUT_CLASS_QUERY = constructClassQuery(
    "index__callbackUrlInput--1N_ld FormInput",
  );
  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: REDIRECT_URI_INPUT_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(fillRedirectUriInputRequest);

  const WEBSITE_URL_INPUT_DATA_TEST_ID = "website-url-input";
  const fillWebsiteUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      dataTestId: WEBSITE_URL_INPUT_DATA_TEST_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillWebsiteUrlInputRequest);

  const SAVE_BUTTON_DATA_TEST_ID = "save-auth-setting-button";
  const clickSaveButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      dataTestId: SAVE_BUTTON_DATA_TEST_ID,
    }),
  });
  await waitUntilActionMessageResolved(clickSaveButtonRequest);

  const CONFIRM_CHANGE_PERMISSION_BUTTON_DATA_TEST_ID = "action-button";
  const clickConfirmChangePermissionButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      dataTestId: CONFIRM_CHANGE_PERMISSION_BUTTON_DATA_TEST_ID,
    }),
  });
  await waitUntilActionMessageResolved(
    clickConfirmChangePermissionButtonRequest,
  );
  updateButtonText(navigationStateEnumSchema.Values.end);

  resetBrowserStorage();
}
