import { constructClassQuery, getProjectId } from "@/lib/utils";
import { click, fillInput, navigateToUrl } from "@/scripts/base";
import { backgroundScriptsEnumSchema } from "@/types/background";
import {
  clickButtonRequestSchema,
  fillInputRequestSchema,
  navigateToUrlRequestSchema,
} from "@/types/scripts/base";

interface GoogleFlowProps {
  url: string;
  projectName: string;
}

export default async function googleFlow({
  url,
  projectName,
}: GoogleFlowProps) {
  const projectId: string = getProjectId(projectName);

  const navigateToGoogleConsoleRequest = navigateToUrlRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.navigateToUrl,
    url: url,
  });
  const navigateToGoogleConsoleResponse = await navigateToUrl(navigateToGoogleConsoleRequest);

  if (!navigateToGoogleConsoleResponse) {
    console.error("Error navigating to URL");
  }

  while (true) {
    const currentUrl = await getCurrentTabUrl();
    if (currentUrl.startsWith(url)) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Check every second
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "ng-tns-c2348414657-2 mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickProjectDropdownButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    classQuery: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
  });
  const clickProjectDropdownButtonResponse = await click(
    clickProjectDropdownButtonRequest,
  );
  if (!clickProjectDropdownButtonResponse) {
    console.error("Error clicking project dropdown button");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const NEW_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
  );
  const clickNewProjectButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: NEW_PROJECT_BUTTON_CLASS_QUERY,
  });
  const clickNewProjectButtonResponse = await click(
    clickNewProjectButtonRequest,
  );
  if (!clickNewProjectButtonResponse) {
    console.error("Error clicking new project button");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const PROJECT_NAME_INPUT_ID: string = "p6ntest-name-input";
  const fillProjectNameInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    id: PROJECT_NAME_INPUT_ID,
    classQuery: null,
    value: projectName,
  });
  const fillProjectNameInputResponse = await fillInput(
    fillProjectNameInputRequest,
  );
  if (!fillProjectNameInputResponse) {
    console.error("Error filling project name input");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const EDIT_PROJECT_ID_BUTTON_ID: string = "p6ntest-show-edit-proj-id";
  const editProjectIdButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: EDIT_PROJECT_ID_BUTTON_ID,
    classQuery: null,
  });
  const editProjectIdButtonResponse = await click(editProjectIdButtonRequest);
  if (!editProjectIdButtonResponse) {
    console.error("Error clicking edit project id button");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const PROJECT_ID_INPUT_ID: string = "p6ntest-id-input";
  const fillProjectIdInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    id: PROJECT_ID_INPUT_ID,
    classQuery: null,
    value: projectId,
  });
  const fillProjectIdInputResponse = await fillInput(fillProjectIdInputRequest);
  if (!fillProjectIdInputResponse) {
    console.error("Error filling project id input");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
    "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
  );
  const clickCreateProjectButtonRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: CREATE_PROJECT_BUTTON_CLASS_QUERY,
  });
  const clickCreateProjectButtonResponse = await click(
    clickCreateProjectButtonRequest,
  );
  if (!clickCreateProjectButtonResponse) {
    console.error("Error clicking create project button");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const OAUTH_CONSENT_SCREEN_BASE_LINK: string = `https://console.cloud.google.com/apis/credentials/consent/edit;newAppInternalUser=false?project=${projectId}`
  const navigateToOauthConsentScreenRequest = navigateToUrlRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.navigateToUrl,
    url: OAUTH_CONSENT_SCREEN_BASE_LINK,
  });
  const navigateToOauthConsentScreenResponse = await navigateToUrl(navigateToOauthConsentScreenRequest);

  if (!navigateToOauthConsentScreenResponse) {
    console.error("Error navigating to URL");
  }

  const APP_NAME_INPUT_CLASS_QUERY: string = constructClassQuery("cm-input mat-mdc-input-element ng-tns-c3713537167-8 ng-pristine gmat-mdc-input mat-mdc-form-field-input-control mdc-text-field__input");
  const fillAppNameInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    id: null,
    classQuery: APP_NAME_INPUT_CLASS_QUERY,
    value: projectName,
  });
  const fillAppNameInputResponse = await fillInput(fillAppNameInputRequest);
  if (!fillAppNameInputResponse) {
    console.error("Error filling app name input");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const USER_SUPPORT_EMAIL_DROPDOWN_ID: string = "_0rif_mat-mdc-form-field-label-2"
  const clickUserSupportEmailDropdownRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: USER_SUPPORT_EMAIL_DROPDOWN_ID,
    classQuery: null,
  });
  const clickUserSupportEmailDropdownResponse = await click(clickUserSupportEmailDropdownRequest);
  if (!clickUserSupportEmailDropdownResponse) {
    console.error("Error clicking user support email dropdown");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY: string = constructClassQuery("mat-mdc-option mdc-list-item ng-star-inserted")
  const clickUserSupportEmailSelectionRequest = clickButtonRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.clickButton,
    id: null,
    classQuery: USER_SUPPORT_EMAIL_SELECTION_CLASS_QUERY,
  });
  const clickUserSupportEmailSelectionResponse = await click(clickUserSupportEmailSelectionRequest);
  if (!clickUserSupportEmailSelectionResponse) {
    console.error("Error clicking user support email selection");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const DEVELOPER_CONTACT_EMAIL_INPUT_ID: string = "_0rif_mat-mdc-form-field-label-4"
  const fillDeveloperContactEmailInputRequest = fillInputRequestSchema.parse({
    messageType: backgroundScriptsEnumSchema.Values.fillInput,
    id: DEVELOPER_CONTACT_EMAIL_INPUT_ID,
    classQuery: null,
    value: "TEST",
  });
  const fillDeveloperContactEmailInputResponse = await fillInput(fillDeveloperContactEmailInputRequest);
  if (!fillDeveloperContactEmailInputResponse) {
    console.error("Error filling developer contact email input");
  }
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}
