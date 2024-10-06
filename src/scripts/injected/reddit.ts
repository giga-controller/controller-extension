/* eslint-disable unused-imports/no-unused-vars */
import { constructClassQuery, updateButtonText } from '@/lib/utils'
import { messageTypeEnumSchema } from '@/types/message'
import { PlatformDetails } from '@/types/platform'
import {
  BaseRequest,
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  navigationStateEnumSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from '@/types/scripts/base'

export const createRedditOauth2ApplicationPartOne = async (
  platformDetails: PlatformDetails,
  waitUntilPageLoaded: () => Promise<void>,
  waitUntilMessageResolved: (request: BaseRequest) => Promise<void>,
  waitUntilRetrieveMessageResolved: (
    request: RetrieveRequest,
  ) => Promise<string>,
) => {
  const { platform, javaScriptOriginUri, javaScriptRedirectUri, projectId }
    = platformDetails

  const CREATE_APP_BUTTON_ID = 'create-app-button'
  const clickCreateAppButtonRequest = clickRequestSchema.parse({
    query: querySelectorSchema.parse({
      id: CREATE_APP_BUTTON_ID,
    }),
  })
  await waitUntilMessageResolved(clickCreateAppButtonRequest)

  const INPUT_CLASS_QUERY = constructClassQuery('text')
  const fillNameInputRequest = fillInputRequestSchema.parse({
    value: platform,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 0,
    }),
  })
  await waitUntilMessageResolved(fillNameInputRequest)

  const fillAboutUrlInputRequest = fillInputRequestSchema.parse({
    value: javaScriptOriginUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 1,
    }),
  })
  await waitUntilMessageResolved(fillAboutUrlInputRequest)

  const fillRedirectUriInputRequest = fillInputRequestSchema.parse({
    value: javaScriptRedirectUri,
    query: querySelectorSchema.parse({
      class: INPUT_CLASS_QUERY,
      index: 2,
    }),
  })
  await waitUntilMessageResolved(fillRedirectUriInputRequest)
  updateButtonText(navigationStateEnumSchema.Values.end)
}
