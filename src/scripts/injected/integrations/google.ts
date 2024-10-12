/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from "@/lib/utils";
import { messageTypeEnumSchema } from "@/types/message";
import { integrationEnum } from "@/types/integrations";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  InjectedScriptProps,
  navigationStateEnumSchema,
  querySelectorSchema,
  retrieveRequestSchema,
} from "@/types/scripts/base";

export async function createGoogleOauth2ApplicationPartOne({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const {
    platform,
    javaScriptOriginUri,
    javaScriptRedirectUri,
    projectId,
    integration,
  } = platformDetails;

  const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickProjectDropdownButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickProjectDropdownButtonRequest);

  const NEW_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "purview-picker-create-project-button mdc-button mat-mdc-button mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickNewProjectButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: NEW_PROJECT_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickNewProjectButtonRequest);

  const PROJECT_NAME_INPUT_ID: string = "p6ntest-name-input";
  const clickProjectNameInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: PROJECT_NAME_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(clickProjectNameInputRequest);

  const fillProjectNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: PROJECT_NAME_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillProjectNameInputRequest);

  const EDIT_PROJECT_ID_BUTTON_ID: string = "p6ntest-show-edit-proj-id";
  const editProjectIdButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: EDIT_PROJECT_ID_BUTTON_ID,
    }),
  });
  await waitUntilActionMessageResolved(editProjectIdButtonRequest);

  const PROJECT_ID_INPUT_ID: string = "p6ntest-id-input";
  const fillProjectIdInputRequest = fillInputRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: PROJECT_ID_INPUT_ID,
    }),
    value: projectId,
  });
  await waitUntilActionMessageResolved(fillProjectIdInputRequest);

  const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickCreateProjectButtonRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      class: CREATE_PROJECT_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickCreateProjectButtonRequest);

  let ENABLE_INTEGRATION_API_LINK: string;
  if (integration === integrationEnum.Values.gmail) {
    ENABLE_INTEGRATION_API_LINK = `https://console.cloud.google.com/marketplace/product/google/gmail.googleapis.com?q=search&referrer=search&project=${projectId}`;
  } else if (integration === integrationEnum.Values.gsheets) {
    ENABLE_INTEGRATION_API_LINK = `https://console.cloud.google.com/marketplace/product/google/sheets.googleapis.com?q=search&referrer=search&project=${projectId}`;
  } else if (integration === integrationEnum.Values.gdocs) {
    ENABLE_INTEGRATION_API_LINK = `https://console.cloud.google.com/marketplace/product/google/docs.googleapis.com?q=search&referrer=search&project=${projectId}`;
  } else if (integration === integrationEnum.Values.gdrive) {
    ENABLE_INTEGRATION_API_LINK = `https://console.cloud.google.com/marketplace/product/google/drive.googleapis.com?q=search&referrer=search&project=${projectId}`;
  } else {
    throw new Error("Unsupported integration for google platform");
  }
  window.location.href = ENABLE_INTEGRATION_API_LINK;
  await waitUntilPageLoaded();
}

export async function createGoogleOauth2ApplicationPartTwo({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const {
    platform,
    javaScriptOriginUri,
    javaScriptRedirectUri,
    projectId,
    integration,
  } = platformDetails;
  const ENABLE_INTEGRATION_API_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button cfc-tooltip cfc-tooltip-disable-user-select-on-touch-device ng-star-inserted",
  );
  const clickEnableIntegrationApiButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ENABLE_INTEGRATION_API_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickEnableIntegrationApiButtonRequest);

  const API_TITLE_CLASS_QUERY: string = constructClassQuery(
    "ct-title cfc-font-weight-bold cfc-space-above-minus-6",
  );
  const retrieveApiTitleRequest = retrieveRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: API_TITLE_CLASS_QUERY,
    }),
  });
  const apiTitle: string = await waitUntilRetrieveMessageResolved(
    retrieveApiTitleRequest,
  );
  if (apiTitle) {
    const OAUTH_CONSENT_SCREEN_LINK: string =
      "https://console.cloud.google.com/apis/credentials/consent";
    window.location.href = OAUTH_CONSENT_SCREEN_LINK;
    await waitUntilPageLoaded();
  }
}

export async function createGoogleOauth2ApplicationPartFour({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const EXTERNAL_USER_TYPE_INPUT_ID: string = "_0rif_mat-radio-3-input";
  const clickExternalUserTypeInputRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      id: EXTERNAL_USER_TYPE_INPUT_ID,
    }),
  });

  await waitUntilActionMessageResolved(clickExternalUserTypeInputRequest);

  const CREATE_OAUTH_CONSENT_SCREEN_BUTTON_CLASS_QUERY: string =
    constructClassQuery(
      "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
    );
  const clickCreateOauthConsentScreenButtonRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      class: CREATE_OAUTH_CONSENT_SCREEN_BUTTON_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilActionMessageResolved(
    clickCreateOauthConsentScreenButtonRequest,
  );

  const APP_NAME_INPUT_CLASS_QUERY: string = constructClassQuery(
    "cm-input mat-mdc-input-element ng-pristine gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input",
  );
  const fillAppNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      class: APP_NAME_INPUT_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(fillAppNameInputRequest);

  const USER_SUPPORT_EMAIL_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
    "cfc-select ng-untouched ng-pristine",
  );
  const clickUserSupportEmailDropdownRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: USER_SUPPORT_EMAIL_DROPDOWN_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickUserSupportEmailDropdownRequest);

  const USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-option mdc-list-item",
  );
  const clickUserSupportEmailSelectionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickUserSupportEmailSelectionRequest);

  const USER_SUPPORT_EMAIL_ID: string = "_0rif_cfc-select-0-select-value";
  const retrieveUserSupportEmailSelectionRequest = retrieveRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: USER_SUPPORT_EMAIL_ID,
    }),
  });
  const email: string = await waitUntilRetrieveMessageResolved(
    retrieveUserSupportEmailSelectionRequest,
  );
  if (!email) {
    throw new Error("Failed to retrieve email");
  }

  const DEVELOPER_CONTACT_EMAIL_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control",
  );
  const fillDeveloperContactEmailInputRequest = fillInputRequestSchema.parse({
    value: email,
    query: querySelectorSchema.parse({
      class: DEVELOPER_CONTACT_EMAIL_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(fillDeveloperContactEmailInputRequest);

  const SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "cfc-stepper-step-button cfc-stepper-step-continue-button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickSaveAndContinueButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickSaveAndContinueButtonRequest);

  // Skip Scopes section
  await waitUntilActionMessageResolved(clickSaveAndContinueButtonRequest);

  const ADD_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "cfc-space-above-minus-3 cfc-space-below-plus-2 mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickAddUsersButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_USERS_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickAddUsersButtonRequest);

  const ADD_USERS_INPUT_ID: string = "_0rif_mat-mdc-chip-list-input-1";
  const fillAddUsersInputRequest = fillInputRequestSchema.parse({
    value: email,
    query: querySelectorSchema.parse({
      id: ADD_USERS_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillAddUsersInputRequest);

  const ADD_TESTING_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickAddTestingUsersButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_TESTING_USERS_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickAddTestingUsersButtonRequest);

  const OAUTH_CLIENT_ID_LINK: string = `https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3D${projectId}&project=${projectId}`;
  window.location.href = OAUTH_CLIENT_ID_LINK;
  await waitUntilPageLoaded();
}

export async function createGoogleOauth2ApplicationPartFive({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;

  const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
    "mdc-floating-label mat-mdc-floating-label ng-star-inserted",
  );
  const clickApplicationTypeDropdownRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
    }),
  });

  await waitUntilActionMessageResolved(clickApplicationTypeDropdownRequest);

  const WEB_APPLICATION_SELECTION_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-option mdc-list-item",
  );
  const clickWebApplicationSelectionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: WEB_APPLICATION_SELECTION_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickWebApplicationSelectionRequest);

  const INPUT_CLASS_QUERY: string = constructClassQuery(
    "cm-input mat-mdc-input-element gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored",
  );

  const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(fillApplicationNameInputRequest);

  const ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY: string =
    constructClassQuery(
      "cfc-form-stack-add-button cfc-button-small mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
    );
  const clickAddJavascriptOriginUriButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(
    clickAddJavascriptOriginUriButtonRequest,
  );

  const fillJavascriptOriginUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilActionMessageResolved(fillJavascriptOriginUriInputRequest);

  const clickAddRedirectUriButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilActionMessageResolved(clickAddRedirectUriButtonRequest);

  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilActionMessageResolved(fillRedirectUriInputRequest);

  const CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickCreateOauthClientButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilActionMessageResolved(clickCreateOauthClientButtonRequest);
  updateButtonText(navigationStateEnumSchema.Values.end);
}
