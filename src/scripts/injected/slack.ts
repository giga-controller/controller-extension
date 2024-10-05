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

export const createSlackOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
    const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } = platformDetails;
    const START_CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery("btn btn_large create_new_app_button");
    const clickStartCreateAppButtonRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: START_CREATE_APP_BUTTON_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickStartCreateAppButtonRequest);

    const FROM_SCRATCH_BUTTON_CLASS_QUERY = constructClassQuery("c-button-unstyled p-new_app_modal__initial_button p-new_app_modal__initial_button--bordered");
    const clickFromScratchButtonRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: FROM_SCRATCH_BUTTON_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickFromScratchButtonRequest);

    const APP_NAME_INPUT_ID = "app_name";
    const fillAppNameInputRequest = fillInputRequestSchema.parse({
        value: platform,
        query: querySelectorSchema.parse({
            id: APP_NAME_INPUT_ID,
        }),
    });
    await waitUntilMessageResolved(fillAppNameInputRequest);

    const SELECT_WORKPLACE_LISTBOX_CLASS_QUERY = constructClassQuery("c-select_button c-select_button--medium")
    const clickSelectWorkplaceListboxRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: SELECT_WORKPLACE_LISTBOX_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickSelectWorkplaceListboxRequest);

    const WORKPLACE_OPTION_CLASS_QUERY = constructClassQuery("c-select_options_list__option_label")
    const clickWorkplaceOptionRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: WORKPLACE_OPTION_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickWorkplaceOptionRequest);

    const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery("c-button c-button--primary c-button--medium")
    const clickCreateAppButtonRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: CREATE_APP_BUTTON_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickCreateAppButtonRequest);

    // const SELECT_WORKPLACE_INPUT_ID = "select_workplace_input";
    // const fillSelectWorkplaceInputRequest = fillInputRequestSchema.parse({
    //     value: platform,
    //     query: querySelectorSchema.parse({
    //         id: SELECT_WORKPLACE_INPUT_ID,
    //     }),
    // });

    // const APPLICATION_NAME_INPUT_ID: string = "name";
    // const fillApplicationNameInputRequest = fillInputRequestSchema.parse({
    //     value: platform,
    //     query: querySelectorSchema.parse({
    //         id: APPLICATION_NAME_INPUT_ID,
    //     }),
    // });

//   const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
//     "mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button",
//   );
//   const clickProjectDropdownButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickProjectDropdownButtonRequest);

//   const NEW_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
//     "purview-picker-create-project-button mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button ng-star-inserted",
//   );
//   const clickNewProjectButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: NEW_PROJECT_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickNewProjectButtonRequest);

//   const PROJECT_NAME_INPUT_ID: string = "p6ntest-name-input";
//   const clickProjectNameInputRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       id: PROJECT_NAME_INPUT_ID,
//     }),
//   });
//   await waitUntilMessageResolved(clickProjectNameInputRequest);

//   const fillProjectNameInputRequest = fillInputRequestSchema.parse({
//     value: platform,
//     query: querySelectorSchema.parse({
//       id: PROJECT_NAME_INPUT_ID,
//     }),
//   });
//   await waitUntilMessageResolved(fillProjectNameInputRequest);

//   const EDIT_PROJECT_ID_BUTTON_ID: string = "p6ntest-show-edit-proj-id";
//   const editProjectIdButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       id: EDIT_PROJECT_ID_BUTTON_ID,
//     }),
//   });
//   await waitUntilMessageResolved(editProjectIdButtonRequest);

//   const PROJECT_ID_INPUT_ID: string = "p6ntest-id-input";
//   const fillProjectIdInputRequest = fillInputRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       id: PROJECT_ID_INPUT_ID,
//     }),
//     value: projectId,
//   });
//   await waitUntilMessageResolved(fillProjectIdInputRequest);

//   const CREATE_PROJECT_BUTTON_CLASS_QUERY: string = constructClassQuery(
//     "projtest-create-form-submit mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base gmat-mdc-button cm-button",
//   );
//   const clickCreateProjectButtonRequest = clickRequestSchema.parse({
//     type: messageTypeEnumSchema.Values.click,
//     query: querySelectorSchema.parse({
//       class: CREATE_PROJECT_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickCreateProjectButtonRequest);

//   const OAUTH_CONSENT_SCREEN_LINK: string = `https://console.cloud.google.com/apis/credentials/consent?project=${projectId}`;
//   window.location.href = OAUTH_CONSENT_SCREEN_LINK;
//   await waitUntilPageLoaded();
};