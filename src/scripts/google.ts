import { constructClassQuery, getProjectId } from "@/lib/utils";
import { click, fillInput, navigateToUrl, retrieve } from "@/scripts/base";
import { backgroundScriptsEnumSchema } from "@/types/background";
import {
  clickButtonRequestSchema,
  fillInputRequestSchema,
  navigateToUrlRequestSchema,
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
  redirectUri
}: GoogleFlowProps) {
  const projectId: string = getProjectId(projectName);

  const navigateToGoogleConsoleRequest = navigateToUrlRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.navigateToUrl,
    url: url,
  });
  await navigateToUrl(navigateToGoogleConsoleRequest);

  // const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
  // );
  
  // const clickProjectDropdownButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   classQuery: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
  // });
  // await click(clickProjectDropdownButtonRequest);

  // const NEW_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  // );
  // const clickNewProjectButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: NEW_PROJECT_BUTTON_CLASS_QUERY,
  // });
  // await click(clickNewProjectButtonRequest);

  // const PROJECT_NAME_INPUT_ID: string = "p6ntest-name-input";
  // const fillProjectNameInputRequest = fillInputRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.fillInput,
  //   id: PROJECT_NAME_INPUT_ID,
  //   classQuery: null,
  //   value: projectName,
  // });
  // await fillInput(fillProjectNameInputRequest);


  // const EDIT_PROJECT_ID_BUTTON_ID: string = "p6ntest-show-edit-proj-id";
  // const editProjectIdButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: EDIT_PROJECT_ID_BUTTON_ID,
  //   classQuery: null,
  // });
  // await click(editProjectIdButtonRequest);

  // const PROJECT_ID_INPUT_ID: string = "p6ntest-id-input";
  // const fillProjectIdInputRequest = fillInputRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.fillInput,
  //   id: PROJECT_ID_INPUT_ID,
  //   classQuery: null,
  //   value: projectId,
  // });
  // await fillInput(fillProjectIdInputRequest);

  // const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
  //   "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  // );
  // const clickCreateProjectButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: CREATE_PROJECT_BUTTON_CLASS_QUERY,
  // });
  // await click(clickCreateProjectButtonRequest);

  // const OAUTH_CONSENT_SCREEN_LINK: string = `https://console.cloud.google.com/apis/credentials/consent/edit;newAppInternalUser=false?project=${projectId}`
  // const navigateToOauthConsentScreenRequest = navigateToUrlRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.navigateToUrl,
  //   url: OAUTH_CONSENT_SCREEN_LINK,
  // });
  // await navigateToUrl(navigateToOauthConsentScreenRequest);

  // const APP_NAME_INPUT_CLASS_QUERY: string = constructClassQuery("cm-input mat-mdc-input-element ng-pristine gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input");
  // const fillAppNameInputRequest = fillInputRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.fillInput,
  //   id: null,
  //   classQuery: APP_NAME_INPUT_CLASS_QUERY,
  //   value: projectName,
  // });
  // await fillInput(fillAppNameInputRequest);

  // const USER_SUPPORT_EMAIL_DROPDOWN_ID: string = "_0rif_mat-mdc-form-field-label-2"
  // const clickUserSupportEmailDropdownRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: USER_SUPPORT_EMAIL_DROPDOWN_ID,
  //   classQuery: null,
  // });
  // await click(clickUserSupportEmailDropdownRequest);

  // const USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY: string = constructClassQuery("mat-mdc-option mdc-list-item ng-star-inserted")
  // const clickUserSupportEmailSelectionRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY,
  // });
  // await click(clickUserSupportEmailSelectionRequest);

  // const USER_SUPPORT_EMAIL_ID: string = "_0rif_cfc-select-0-select-value"
  // const retrieveUserSupportEmailSelectionRequest = retrieveRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.retrieve,
  //   id: USER_SUPPORT_EMAIL_ID,
  //   classQuery: null,
  // })
  // const email: string = await retrieve(retrieveUserSupportEmailSelectionRequest);

  // const DEVELOPER_CONTACT_EMAIL_CLASS_QUERY: string = constructClassQuery("mat-mdc-chip-input mat-mdc-input-element mdc-text-field__input mat-input-element mat-mdc-form-field-input-control")
  // const fillDeveloperContactEmailInputRequest = fillInputRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.fillInput,
  //   id: null,
  //   classQuery: DEVELOPER_CONTACT_EMAIL_CLASS_QUERY,
  //   value: email,
  // });
  // await fillInput(fillDeveloperContactEmailInputRequest);

  // const SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY: string = constructClassQuery("cfc-stepper-step-button cfc-stepper-step-continue-button mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted")
  // const clickSaveAndContinueButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: SAVE_AND_CONTINUE_BUTTON_CLASS_QUERY,
  // });
  // await click(clickSaveAndContinueButtonRequest);

  // // Skip Scopes section
  // await click(clickSaveAndContinueButtonRequest);

  // const ADD_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery("cfc-space-above-minus-3 cfc-space-below-plus-2 mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted")
  // const clickAddUsersButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: ADD_USERS_BUTTON_CLASS_QUERY
  // });
  // await click(clickAddUsersButtonRequest);

  // const ADD_USERS_INPUT_ID: string = "_0rif_mat-mdc-chip-list-input-1"
  // const fillAddUsersInputRequest = fillInputRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.fillInput,
  //   // value: "aarontanzb@gmail.com",
  //   value: email,
  //   id: ADD_USERS_INPUT_ID,
  //   classQuery: null,
  //   ariaLabel: null,
  //   index: 0
  // });
  // await fillInput(fillAddUsersInputRequest);

  // const ADD_TESTING_USERS_BUTTON_CLASS_QUERY: string = constructClassQuery("mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button")
  // const clickAddTestingUsersButtonRequest = clickButtonRequestSchema.parse({
  //   messageType: backgroundScriptsEnumSchema.Values.clickButton,
  //   id: null,
  //   classQuery: ADD_TESTING_USERS_BUTTON_CLASS_QUERY
  // });
  // await click(clickAddTestingUsersButtonRequest);

  // await click(clickSaveAndContinueButtonRequest);

  const OAUTH_CLIENT_ID_LINK: string = `https://console.cloud.google.com/apis/credentials/oauthclient?previousPage=%2Fapis%2Fcredentials%3Fproject%3D${projectId}&project=${projectId}`
  const navigateToOauthClientIdRequest = navigateToUrlRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.navigateToUrl,
    url: OAUTH_CLIENT_ID_LINK,
  });
  await navigateToUrl(navigateToOauthClientIdRequest);

  const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery("mdc-floating-label mat-mdc-floating-label ng-star-inserted")
  const clickApplicationTypeDropdownRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
  });
  await click(clickApplicationTypeDropdownRequest);

  const WEB_APPLICATION_SELECTION_CLASS_QUERY: string = constructClassQuery("mat-mdc-option mdc-list-item")
  const clickWebApplicationSelectionRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: WEB_APPLICATION_SELECTION_CLASS_QUERY,
  });
  await click(clickWebApplicationSelectionRequest);

  const INPUT_CLASS_QUERY: string = constructClassQuery("cm-input mat-mdc-input-element gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored")
  
  const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    id: null,
    classQuery: INPUT_CLASS_QUERY,
    index: 0,
    value: projectName,
  });
  await fillInput(fillApplicationNameInputRequest);

  const ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY: string = constructClassQuery("cfc-form-stack-add-button cfc-button-small mdc-button mdc-button--raised mat-mdc-raised-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted")
  const clickAddJavascriptOriginUriButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
    index: 0,
  });
  await click(clickAddJavascriptOriginUriButtonRequest);

  const fillJavascriptOriginUriInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    value: originUri,
    id: null,
    classQuery: INPUT_CLASS_QUERY,
    ariaLabel: null,
    index: 1,
  });
  await fillInput(fillJavascriptOriginUriInputRequest);

  const clickAddRedirectUriButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: ADD_JAVASCRIPT_ORIGIN_URI_BUTTON_CLASS_QUERY,
    index: 1,
  });
  await click(clickAddRedirectUriButtonRequest);

  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    value: redirectUri,
    id: null,
    classQuery: INPUT_CLASS_QUERY,
    ariaLabel: null,
    index: 2,
  });
  await fillInput(fillRedirectUriInputRequest);

  const CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY: string = constructClassQuery("mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button")
  const clickCreateOauthClientButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: CREATE_OAUTH_CLIENT_BUTTON_CLASS_QUERY,
  });
  await click(clickCreateOauthClientButtonRequest);

}