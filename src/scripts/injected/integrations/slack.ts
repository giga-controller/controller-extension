/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from "@/lib/utils";
import {
  clickRequestSchema,
  fillInputRequestSchema,
  InjectedScriptProps,
  navigationStateEnumSchema,
  querySelectorSchema,
} from "@/types/scripts/base";

export async function createSlackOauth2ApplicationPartOne({
  platformDetails,
  waitUntilPageLoaded,
  waitUntilActionMessageResolved,
  waitUntilRetrieveMessageResolved,
  resetBrowserStorage,
}: InjectedScriptProps) {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;
  const START_CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
    "create_new_app_button",
  );
  const clickStartCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: START_CREATE_APP_BUTTON_CLASS_QUERY,
    }),
  });

  await waitUntilActionMessageResolved(clickStartCreateAppButtonRequest);

  const FROM_SCRATCH_BUTTON_CLASS_QUERY = constructClassQuery(
    "c-button-unstyled p-new_app_modal__initial_button p-new_app_modal__initial_button--bordered",
  );
  const clickFromScratchButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: FROM_SCRATCH_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickFromScratchButtonRequest);

  const APP_NAME_INPUT_ID = "app_name";
  const fillAppNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      id: APP_NAME_INPUT_ID,
    }),
  });
  await waitUntilActionMessageResolved(fillAppNameInputRequest);

  const SELECT_WORKPLACE_LISTBOX_CLASS_QUERY = constructClassQuery(
    "c-select_button c-select_button--medium",
  );
  const clickSelectWorkplaceListboxRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SELECT_WORKPLACE_LISTBOX_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickSelectWorkplaceListboxRequest);

  const WORKPLACE_OPTION_CLASS_QUERY = constructClassQuery(
    "c-select_options_list__option_label",
  );
  const clickWorkplaceOptionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: WORKPLACE_OPTION_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickWorkplaceOptionRequest);

  const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
    "c-button c-button--primary c-button--medium",
  );
  const clickCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_APP_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilActionMessageResolved(clickCreateAppButtonRequest);
  updateButtonText(navigationStateEnumSchema.Values.end);

  resetBrowserStorage();
}
