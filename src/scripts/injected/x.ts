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
    const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } = platformDetails;

    const PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY = constructClassQuery("index__navItemButton--352Fy");
    const clickProjectAndAppDropdownRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY,
            index: 1,
        }),
    });
    await waitUntilMessageResolved(clickProjectAndAppDropdownRequest);

    const PROJECT_BUTTON_CLASS_QUERY = constructClassQuery("index__navItemButton--17Psw");
    const clickProjectButtonRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: PROJECT_BUTTON_CLASS_QUERY,
            index: 2,
        }),
    });
    await waitUntilMessageResolved(clickProjectButtonRequest);

    const SET_UP_USER_AUTH_BUTTON_CLASS_QUERY = constructClassQuery("Button Button--primary index__setUpButton--1Icpv");
    const clickSetUpUserAuthButtonRequest = clickRequestSchema.parse({
        query: querySelectorSchema.parse({
            class: SET_UP_USER_AUTH_BUTTON_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(clickSetUpUserAuthButtonRequest);

    const APP_PERMISSIONS_RADIO_INPUT_CLASS_QUERY = constructClassQuery("RadioButton-input");
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

    const REDIRECT_URI_INPUT_CLASS_QUERY = constructClassQuery("index__callbackUrlInput--1N_ld FormInput");
    const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
        value: javaScriptRedirectUri,
        query: querySelectorSchema.parse({
            class: REDIRECT_URI_INPUT_CLASS_QUERY,
        }),
    });
    await waitUntilMessageResolved(fillRedirectUriInputRequest);

//   const START_CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
//     "btn btn_large create_new_app_button",
//   );
//   const clickStartCreateAppButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: START_CREATE_APP_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickStartCreateAppButtonRequest);

//   const FROM_SCRATCH_BUTTON_CLASS_QUERY = constructClassQuery(
//     "c-button-unstyled p-new_app_modal__initial_button p-new_app_modal__initial_button--bordered",
//   );
//   const clickFromScratchButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: FROM_SCRATCH_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickFromScratchButtonRequest);

//   const APP_NAME_INPUT_ID = "app_name";
//   const fillAppNameInputRequest = fillInputRequestSchema.parse({
//     value: platform,
//     query: querySelectorSchema.parse({
//       id: APP_NAME_INPUT_ID,
//     }),
//   });
//   await waitUntilMessageResolved(fillAppNameInputRequest);

//   const SELECT_WORKPLACE_LISTBOX_CLASS_QUERY = constructClassQuery(
//     "c-select_button c-select_button--medium",
//   );
//   const clickSelectWorkplaceListboxRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: SELECT_WORKPLACE_LISTBOX_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickSelectWorkplaceListboxRequest);

//   const WORKPLACE_OPTION_CLASS_QUERY = constructClassQuery(
//     "c-select_options_list__option_label",
//   );
//   const clickWorkplaceOptionRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: WORKPLACE_OPTION_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickWorkplaceOptionRequest);

//   const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
//     "c-button c-button--primary c-button--medium",
//   );
//   const clickCreateAppButtonRequest = clickRequestSchema.parse({
//     query: querySelectorSchema.parse({
//       class: CREATE_APP_BUTTON_CLASS_QUERY,
//     }),
//   });
//   await waitUntilMessageResolved(clickCreateAppButtonRequest);
};
