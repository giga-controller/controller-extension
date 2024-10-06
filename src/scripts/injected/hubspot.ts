/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from "@/lib/utils";
import { PlatformDetails } from "@/types/platform";
import {
  BaseRequest,
  clickRequestSchema,
  fillInputRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
} from "@/types/scripts/base";

export const createHubspotOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
    const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId } = platformDetails;

    const AUTH_TAB_CLASS_QUERY: string = constructClassQuery("private-link uiLinkWithoutUnderline UITab__StyledLink-sc-14gzkc-2 glAWjO private-tab private-link--unstyled");
    const clickAuthTabRequest = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: AUTH_TAB_CLASS_QUERY,
      }),
    });
    await waitUntilMessageResolved(clickAuthTabRequest);
    updateButtonText("Navigating...");

    const REDIRECT_URI_ID: string = "UIFormControl-26";
    const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
      value: javaScriptRedirectUri,
      query: querySelectorSchema.parse({
        id: REDIRECT_URI_ID,
      }),
    });
    await waitUntilMessageResolved(fillRedirectUriInputRequest);

    const CREATE_BUTTON_CLASS_QUERY: string = constructClassQuery("uiButton private-button private-button--tertiary private-button--default private-button--non-link");
    const clickAddNewScopeButtonRequest = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: CREATE_BUTTON_CLASS_QUERY,
      }),
    });
    await waitUntilMessageResolved(clickAddNewScopeButtonRequest);

    const CHECK_BOX_CLASS_QUERY: string = constructClassQuery("ToggleInputWrapper__CheckboxLabel-lh3p2c-1 ijEpno");
    const clickFormsScopeCheckBoxRequestIndex0 = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: CHECK_BOX_CLASS_QUERY,
      }),
    });

    const SEARCH_INPUT_CLASS_QUERY: string = constructClassQuery("form-control private-form__control private-search-control__input");
    const fillSearchInputRequestOne = fillInputRequestSchema.parse({
      value: "forms",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestOne);
    const clickFormsScopeCheckBoxRequestIndex1 = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: CHECK_BOX_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex1);


    const fillSearchInputRequestTwo = fillInputRequestSchema.parse({
      value: "tickets",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestTwo);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);


    const fillSearchInputRequestThree = fillInputRequestSchema.parse({
      value: "crm.objects.companies.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestThree);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestFour = fillInputRequestSchema.parse({
      value: "crm.objects.companies.write",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestFour);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestFive = fillInputRequestSchema.parse({
      value: "crm.schemas.companies.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestFive);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestSix = fillInputRequestSchema.parse({
      value: "crm.schemas.contacts.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestSix);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestSeven = fillInputRequestSchema.parse({
      value: "crm.objects.contacts.write",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestSeven);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);


    const fillSearchInputRequestEight = fillInputRequestSchema.parse({
      value: "crm.objects.deals.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestEight);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestNine = fillInputRequestSchema.parse({
      value: "crm.objects.deals.write",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestNine);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestEleven = fillInputRequestSchema.parse({
      value: "crm.schemas.deals.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestEleven);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const fillSearchInputRequestTwelve = fillInputRequestSchema.parse({
      value: "crm.objects.owners.read",
      query: querySelectorSchema.parse({
        class: SEARCH_INPUT_CLASS_QUERY,
        index: 1
      }),
    });
    await waitUntilMessageResolved(fillSearchInputRequestTwelve);
    await waitUntilMessageResolved(clickFormsScopeCheckBoxRequestIndex0);

    const UPDATE_BUTTON_CLASS_QUERY: string = constructClassQuery("uiButton private-button private-button--primary private-button--default private-button--non-link");
    const clickUpdateButtonRequest = clickRequestSchema.parse({
      query: querySelectorSchema.parse({
        class: UPDATE_BUTTON_CLASS_QUERY,
      }),
    });
    await waitUntilMessageResolved(clickUpdateButtonRequest);

    await waitUntilMessageResolved(clickAuthTabRequest);
    updateButtonText("OAuth Application Created!");
}
