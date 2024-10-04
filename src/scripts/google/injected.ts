import { constructClassQuery } from "@/lib/utils";
import { MessageTypeEnum, messageTypeEnumSchema } from "@/types/message";
import { PlatformDetails } from "@/types/platform";
import {
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  navigateToUrlRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from "@/types/scripts/base";

export const createGoogleOauth2Application = async (
  platformDetails: PlatformDetails,
  waitUntilClickMessageResolved: (request: ClickRequest) => Promise<void>,
  waitUntilFillInputMessageResolved: (request: FillInputRequest) => Promise<void>
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;
  window.postMessage({ type: messageTypeEnumSchema.Values.platformDetails, data: platformDetails }, "*");

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


  // const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  // );
  // const clickCreateProjectButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: CREATE_PROJECT_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickCreateProjectButtonRequest, "*");
  // // await new Promise((resolve) => setTimeout(resolve, 2000));
  // await new Promise<void>((resolve) => {
  //   const listener = (event: MessageEvent) => {
  //     if (event.source !== window) return;
  //     if (event.data.type === messageTypeEnumSchema.Values.clickResponse) {
  //       window.removeEventListener('message', listener);
  //       resolve();
  //     }
  //   };
  //   window.addEventListener('message', listener);
  // });

  // const OAUTH_CONSENT_SCREEN_LINK: string = `https://console.cloud.google.com/apis/credentials/consent/edit;newAppInternalUser=false?project=${projectId}`;
  // window.location.href = OAUTH_CONSENT_SCREEN_LINK;
  // await new Promise((resolve) => {
  //   window.addEventListener('load', resolve);
  // });

  // const APP_NAME_INPUT_CLASS_QUERY: string = constructClassQuery(
  //   "cm-input mat-mdc-input-element ng-pristine gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input",
  // );
  // const fillAppNameInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: platform,
  //   query: querySelectorSchema.parse({
  //     class: APP_NAME_INPUT_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(fillAppNameInputRequest, "*")
  // await new Promise<void>((resolve) => {
  //   const listener = (event: MessageEvent) => {
  //     if (event.source !== window) return;
  //     if (event.data.type === messageTypeEnumSchema.Values.clickResponse) {
  //       window.removeEventListener('message', listener);
  //       resolve();
  //     }
  //   };
  //   window.addEventListener('message', listener);
  // });
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const USER_SUPPORT_EMAIL_DROPDOWN_ID: string =
  //   "_0rif_mat-mdc-form-field-label-2";
  // const clickUserSupportEmailDropdownRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     id: USER_SUPPORT_EMAIL_DROPDOWN_ID,
  //   }),
  // });
  // window.postMessage(clickUserSupportEmailDropdownRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY: string = constructClassQuery(
  //   "mat-mdc-option mdc-list-item ng-star-inserted",
  // );
  // const clickUserSupportEmailSelectionRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickUserSupportEmailSelectionRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const USER_SUPPORT_EMAIL_ID: string = "_0rif_cfc-select-0-select-value";
  // const retrieveUserSupportEmailSelectionRequest = retrieveRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.retrieve,
  //   query: querySelectorSchema.parse({
  //     id: USER_SUPPORT_EMAIL_ID,
  //   }),
  // });
  // window.postMessage(retrieveUserSupportEmailSelectionRequest, "*");

  // let email: string = "";
  // window.addEventListener("message", (event) => {
  //   if (event.source !== window) return;
  //   if (event.data.type === messageTypeEnumSchema.Values.retrieveResponse) {
  //     email = event.data.value;
  //   }
  // });
  // await new Promise<void>((resolve) => {
  //   const interval = setInterval(() => {
  //     if (email.length > 0) {
  //       clearInterval(interval);
  //       resolve();
  //     }
  //   }, 1000);
  // });

  // const DEVELOPER_CONTACT_EMAIL_CLASS_QUERY: string = constructClassQuery(
  //   "mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control",
  // );
  // const fillDeveloperContactEmailInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: email,
  //   query: querySelectorSchema.parse({
  //     class: DEVELOPER_CONTACT_EMAIL_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(fillDeveloperContactEmailInputRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "cfc-stepper-step-button cfc-stepper-step-continue-button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  // );
  // const clickSaveAndContinueButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickSaveAndContinueButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // // Skip Scopes section
  // window.postMessage(clickSaveAndContinueButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const ADD_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "cfc-space-above-minus-3 cfc-space-below-plus-2 mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  // );
  // const clickAddUsersButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: ADD_USERS_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickAddUsersButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const ADD_USERS_INPUT_ID: string = "_0rif_mat-mdc-chip-list-input-1";
  // const fillAddUsersInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: email,
  //   query: querySelectorSchema.parse({
  //     id: ADD_USERS_INPUT_ID,
  //   }),
  // });
  // window.postMessage(fillAddUsersInputRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const ADD_TESTING_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  // );
  // const clickAddTestingUsersButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: ADD_TESTING_USERS_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickAddTestingUsersButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // window.postMessage(clickSaveAndContinueButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const OAUTH_CLIENT_ID_LINK: string = `https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3D${projectId}&project=${projectId}`;
  // window.location.href = OAUTH_CLIENT_ID_LINK;

  // // await new Promise((resolve) => setTimeout(resolve, 2000));
  // await new Promise((resolve) => {
  //   window.addEventListener('load', resolve);
  // });

  // const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
  //   "mdc-floating-label mat-mdc-floating-label ng-star-inserted",
  // );
  // const clickApplicationTypeDropdownRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickApplicationTypeDropdownRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const WEB_APPLICATION_SELECTION_CLASS_QUERY: string = constructClassQuery(
  //   "mat-mdc-option mdc-list-item",
  // );
  // const clickWebApplicationSelectionRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: WEB_APPLICATION_SELECTION_CLASS_QUERY,
  //   }),
  // });

  // window.postMessage(clickWebApplicationSelectionRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const INPUT_CLASS_QUERY: string = constructClassQuery(
  //   "cm-input mat-mdc-input-element gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored",
  // );

  // const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: platform,
  //   query: querySelectorSchema.parse({
  //     class: INPUT_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(fillApplicationNameInputRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY: string =
  //   constructClassQuery(
  //     "cfc-form-stack-add-button cfc-button-small mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  //   );
  // const clickAddJavascriptOriginUriButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickAddJavascriptOriginUriButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const fillJavascriptOriginUriInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: javaScriptOriginUri,
  //   query: querySelectorSchema.parse({
  //     class: INPUT_CLASS_QUERY,
  //     index: 1,
  //   }),
  // });
  // window.postMessage(fillJavascriptOriginUriInputRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const clickAddRedirectUriButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
  //     index: 1,
  //   }),
  // });
  // window.postMessage(clickAddRedirectUriButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.fillInput,
  //   value: javaScriptRedirectUri,
  //   query: querySelectorSchema.parse({
  //     class: INPUT_CLASS_QUERY,
  //     index: 2,
  //   }),
  // });
  // window.postMessage(fillRedirectUriInputRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // const CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  // );
  // const clickCreateOauthClientButtonRequest = clickRequestSchema.parse({
  //   type: messageTypeEnumSchema.Values.click,
  //   query: querySelectorSchema.parse({
  //     class: CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY,
  //   }),
  // });
  // window.postMessage(clickCreateOauthClientButtonRequest, "*");

  // await new Promise((resolve) => setTimeout(resolve, 2000));
};
