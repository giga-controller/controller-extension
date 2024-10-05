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
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } =
    platformDetails;
  const START_CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
    "btn btn_large create_new_app_button",
  );
  const clickStartCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: START_CREATE_APP_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickStartCreateAppButtonRequest);

  const FROM_SCRATCH_BUTTON_CLASS_QUERY = constructClassQuery(
    "c-button-unstyled p-new_app_modal__initial_button p-new_app_modal__initial_button--bordered",
  );
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

  const SELECT_WORKPLACE_LISTBOX_CLASS_QUERY = constructClassQuery(
    "c-select_button c-select_button--medium",
  );
  const clickSelectWorkplaceListboxRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: SELECT_WORKPLACE_LISTBOX_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickSelectWorkplaceListboxRequest);

  const WORKPLACE_OPTION_CLASS_QUERY = constructClassQuery(
    "c-select_options_list__option_label",
  );
  const clickWorkplaceOptionRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: WORKPLACE_OPTION_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickWorkplaceOptionRequest);

  const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
    "c-button c-button--primary c-button--medium",
  );
  const clickCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      class: CREATE_APP_BUTTON_CLASS_QUERY,
    }),
  });
  await waitUntilMessageResolved(clickCreateAppButtonRequest);
};
