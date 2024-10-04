import { constructClassQuery } from "@/lib/utils";
import { messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";

export const createGoogleOauth2Application = async (
  platformDetails: PlatformDetails,
  waitUntilClickMessageResolved: (request: ClickRequest) => Promise<void>,
  waitUntilFillInputMessageResolved: (
    request: FillInputRequest,
  ) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
  waitUntilPageLoaded: () => Promise<void>,
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;
  window.postMessage(
    {
      type: messageTypeEnumSchema.Values.platformDetails,
      data: platformDetails,
    },
    "*",
  );

  const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickProjectDropdownButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickProjectDropdownButtonRequest);

  const NEW_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "purview-picker-create-project-button mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickNewProjectButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: NEW_PROJECT_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickNewProjectButtonRequest);

  const PROJECT_NAME_INPUT_ID: string = "p6ntest-name-input";
  const clickProjectNameInputRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: PROJECT_NAME_INPUT_ID,
    }),
  });
  await waitUntilClickMessageResolved(clickProjectNameInputRequest);

  const fillProjectNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: PROJECT_NAME_INPUT_ID,
    }),
  });
  await waitUntilFillInputMessageResolved(fillProjectNameInputRequest);

  const EDIT_PROJECT_ID_BUTTON_ID: string = "p6ntest-show-edit-proj-id";
  const editProjectIdButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: EDIT_PROJECT_ID_BUTTON_ID,
    }),
  });
  await waitUntilClickMessageResolved(editProjectIdButtonRequest);

  const PROJECT_ID_INPUT_ID: string = "p6ntest-id-input";
  const fillProjectIdInputRequest = fillInputRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: PROJECT_ID_INPUT_ID,
    }),
    value: projectId,
  });
  await waitUntilFillInputMessageResolved(fillProjectIdInputRequest);

  const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickCreateProjectButtonRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      class: CREATE_PROJECT_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickCreateProjectButtonRequest);

  const OAUTH_CONSENT_SCREEN_LINK: string = `https://console.cloud.google.com/apis/credentials/consent?project=${projectId}`;
  window.location.href = OAUTH_CONSENT_SCREEN_LINK;
  await waitUntilPageLoaded();

  const EXTERNAL_USER_TYPE_INPUT_ID: string = "_0rif_mat-radio-3-input";
  const clickExternalUserTypeInputRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      id: EXTERNAL_USER_TYPE_INPUT_ID,
    }),
  });
  await waitUntilClickMessageResolved(clickExternalUserTypeInputRequest);

  const CREATE_OAUTH_CONSENT_SCREEN_BUTTON_CLASS_QUERY: string =
    constructClassQuery(
      "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
    );
  const clickCreateOauthConsentScreenButtonRequest = clickRequestSchema.parse({
    type: messageTypeEnumSchema.Values.click,
    query: querySelectorSchema.parse({
      class: CREATE_OAUTH_CONSENT_SCREEN_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(
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
  await waitUntilFillInputMessageResolved(fillAppNameInputRequest);

  const USER_SUPPORT_EMAIL_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
    "cfc-select ng-untouched ng-pristine",
  );
  const clickUserSupportEmailDropdownRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: USER_SUPPORT_EMAIL_DROPDOWN_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickUserSupportEmailDropdownRequest);

  const USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-option mdc-list-item",
  );
  const clickUserSupportEmailSelectionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickUserSupportEmailSelectionRequest);

  const USER_SUPPORT_EMAIL_ID: string = "_0rif_cfc-select-0-select-value";
  const retrieveUserSupportEmailSelectionRequest = retrieveRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: USER_SUPPORT_EMAIL_ID,
    }),
  });
  const email: string = await waitUntilRetrieveMessageResolved(
    retrieveUserSupportEmailSelectionRequest,
  );

  const DEVELOPER_CONTACT_EMAIL_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control",
  );
  const fillDeveloperContactEmailInputRequest = fillInputRequestSchema.parse({
    value: email,
    query: querySelectorSchema.parse({
      class: DEVELOPER_CONTACT_EMAIL_CLASS_QUERY,
    }),
  });
  await waitUntilFillInputMessageResolved(
    fillDeveloperContactEmailInputRequest,
  );

  const SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "cfc-stepper-step-button cfc-stepper-step-continue-button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickSaveAndContinueButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickSaveAndContinueButtonRequest);

  // Skip Scopes section
  await waitUntilClickMessageResolved(clickSaveAndContinueButtonRequest);

  const ADD_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "cfc-space-above-minus-3 cfc-space-below-plus-2 mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickAddUsersButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_USERS_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickAddUsersButtonRequest);

  const ADD_USERS_INPUT_ID: string = "_0rif_mat-mdc-chip-list-input-1";
  const fillAddUsersInputRequest = fillInputRequestSchema.parse({
    // value: email,
    value: "aarontanzb@gmail.com",
    query: querySelectorSchema.parse({
      id: ADD_USERS_INPUT_ID,
    }),
  });
  await waitUntilFillInputMessageResolved(fillAddUsersInputRequest);

  const ADD_TESTING_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickAddTestingUsersButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_TESTING_USERS_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickAddTestingUsersButtonRequest);

  const OAUTH_CLIENT_ID_LINK: string = `https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3D${projectId}&project=${projectId}`;
  window.location.href = OAUTH_CLIENT_ID_LINK;
  await waitUntilPageLoaded();

  const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
    "mdc-floating-label mat-mdc-floating-label ng-star-inserted",
  );
  const clickApplicationTypeDropdownRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickApplicationTypeDropdownRequest);

  const WEB_APPLICATION_SELECTION_CLASS_QUERY: string = constructClassQuery(
    "mat-mdc-option mdc-list-item",
  );
  const clickWebApplicationSelectionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: WEB_APPLICATION_SELECTION_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickWebApplicationSelectionRequest);

  const INPUT_CLASS_QUERY: string = constructClassQuery(
    "cm-input mat-mdc-input-element gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored",
  );

  const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
    }),
  });
  await waitUntilFillInputMessageResolved(fillApplicationNameInputRequest);

  const ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY: string =
    constructClassQuery(
      "cfc-form-stack-add-button cfc-button-small mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
    );
  const clickAddJavascriptOriginUriButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickAddJavascriptOriginUriButtonRequest);

  const fillJavascriptOriginUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilFillInputMessageResolved(fillJavascriptOriginUriInputRequest);

  const clickAddRedirectUriButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
      index: 1,
    }),
  });
  await waitUntilClickMessageResolved(clickAddRedirectUriButtonRequest);

  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 2,
    }),
  });
  await waitUntilFillInputMessageResolved(fillRedirectUriInputRequest);

  const CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickCreateOauthClientButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilClickMessageResolved(clickCreateOauthClientButtonRequest);
};
