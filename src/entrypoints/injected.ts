import { constructClassQuery, updateButtonText } from '@/lib/utils'
import {
  createGoogleOauth2ApplicationPartOne,
  createGoogleOauth2ApplicationPartThree,
  createGoogleOauth2ApplicationPartTwo,
} from '@/scripts/injected/google'
import { createLinearOauth2ApplicationPartOne } from '@/scripts/injected/linear'
import { createSlackOauth2ApplicationPartOne } from '@/scripts/injected/slack'
import { createXOauth2ApplicationPartOne } from '@/scripts/injected/x'
import { MessageTypeEnum, messageTypeEnumSchema } from '@/types/message'
import { PlatformDetails } from '@/types/platform'
import {
  BaseRequest,
  ClickRequest,
  clickRequestSchema,
  FillInputRequest,
  fillInputRequestSchema,
  InjectButtonRequest,
  injectButtonRequestSchema,
  querySelectorSchema,
  RetrieveRequest,
  retrieveRequestSchema,
} from '@/types/scripts/base'

const GOOGLE_CLOUD_BASE_URL = 'https://console.cloud.google.com'
const LINEAR_BASE_URL = 'https://linear.app'
const SLACK_BASE_URL = 'https://api.slack.com/apps'
const X_HOME_PAGE_URL = 'https://x.com/home'
const X_DEVELOPER_PAGE_URL = 'https://developer.x.com/en/portal/dashboard'

const createButton = (autoClick: boolean, onClick: () => Promise<void>, buttonText: string) => {
  // This function creates a button and injects it into the client's DOM

  const button = document.createElement('button')
  button.id = 'auth-maven-button'
  button.style.position = 'fixed'
  button.style.top = '10px'
  button.style.right = '10px'
  button.style.zIndex = '10000'
  button.style.width = '200px'
  button.style.height = '50px'
  button.style.backgroundColor = '#4CAF50'
  button.style.color = 'white'
  button.style.border = 'none'
  button.style.borderRadius = '10px'
  button.style.cursor = 'pointer'
  button.style.display = 'flex'
  button.style.justifyContent = 'center'
  button.style.alignItems = 'center'
  button.style.transition = 'background-color 0.3s, transform 0.1s'

  const img = document.createElement('img')
  img.src = 'https://pngimg.com/d/google_PNG19635.png'
  img.alt = 'Button icon'
  img.style.width = '24px'
  img.style.height = '24px'
  img.style.marginRight = '10px'

  const span = document.createElement('span')
  span.textContent = buttonText

  button.appendChild(img)
  button.appendChild(span)

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = '#45a049'
  })

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = '#4CAF50'
  })

  button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.95)'
  })

  button.addEventListener('mouseup', () => {
    button.style.transform = 'scale(1)'
  })

  button.addEventListener('click', async () => {
    await onClick()
  })

  document.body.appendChild(button)
  if (autoClick) {
    button.click()
  }
}

// We probably do not want to unify this helper functions into one because the messages' schema overlap with one another and safeParse might lead to the wrong condition. Additionally, these scripts need to be passed into the function, and cannot be imported
async function waitUntilActionMessageResolved(
  request: BaseRequest,
): Promise<void> {
  let requestInstance: BaseRequest
  let responseMessageType: MessageTypeEnum

  if (request.type === messageTypeEnumSchema.Values.click) {
    if (clickRequestSchema.safeParse(request).success) {
      console.log('Waiting for Click Message to be resolved')
      requestInstance = clickRequestSchema.parse(request)
      responseMessageType = messageTypeEnumSchema.Values.clickResponse
    }
    else {
      throw new Error('Invalid request type for click')
    }
  }
  else if (request.type === messageTypeEnumSchema.Values.fillInput) {
    console.log('Waiting for Fill Input Message to be resolved')
    if (fillInputRequestSchema.safeParse(request).success) {
      requestInstance = fillInputRequestSchema.parse(request)
      responseMessageType = messageTypeEnumSchema.Values.fillInputResponse
    }
    else {
      throw new Error('Invalid request type for fillInput')
    }
  }

  await new Promise<void | string>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, '*')
    }, 1000)

    const listener = (event: any) => {
      if (event.source !== window)
        return
      if (event.data.type === responseMessageType) {
        clearInterval(interval)
        window.removeEventListener('message', listener)
        console.log('Message received:', event.data)
        resolve(event.data.value)
      }
    }
    window.addEventListener('message', listener)
  })
}

async function waitUntilRetrieveMessageResolved(
  request: RetrieveRequest,
): Promise<string> {
  console.log('Waiting for Retrieve Message to be resolved')
  let requestInstance: RetrieveRequest
  let responseMessageType: MessageTypeEnum

  if (retrieveRequestSchema.safeParse(request).success) {
    requestInstance = retrieveRequestSchema.parse(request)
    responseMessageType = messageTypeEnumSchema.Values.retrieveResponse
  }
  else {
    throw new Error('Invalid request type')
  }

  return new Promise<string>((resolve) => {
    const interval = setInterval(() => {
      window.postMessage(requestInstance, '*')
    }, 1000)

    const listener = (event: MessageEvent) => {
      if (event.source !== window)
        return
      if (event.data.type === responseMessageType) {
        clearInterval(interval)
        window.removeEventListener('message', listener)
        resolve(event.data.value)
      }
    }
    window.addEventListener('message', listener)
  })
}

async function waitUntilPageLoaded() {
  await new Promise((resolve) => {
    window.addEventListener('load', resolve)
  })
}

async function injectButton({
  autoClick,
  baseUrl,
  isStartStep,
  querySelector,
  injectedScript,
}: InjectButtonRequest) {
  await new Promise<void>((resolve) => {
    if (!window.location.href.includes(baseUrl)) {
      resolve()
      return
    }

    const interval = setInterval(() => {
      let elementFound = false

      if (querySelector.id) {
        const element = document.getElementById(querySelector.id)
        if (element) {
          elementFound = true
        }
      }
      else if (querySelector.class) {
        const element = document.querySelectorAll(querySelector.class)[
          querySelector.index || 0
        ]
        if (element) {
          elementFound = true
        }
      }
      else if (querySelector.ariaLabel) {
        const element = document.querySelector(
          `[aria-label="${querySelector.ariaLabel}"]`,
        )
        if (element) {
          elementFound = true
        }
      }

      if (elementFound) {
        clearInterval(interval)
        createButton(autoClick, async () => {
          await injectedScript()
        }, isStartStep ? 'Start Auth Maven' : 'Navigating...')
        resolve()
      }
      else {
        location.reload()
        updateButtonText('Navigating...')
      }
    }, 3000)
  })
}

export default defineUnlistedScript(() => {
  let platformDetails: PlatformDetails | null = null

  const initializeButton = async () => {
    if (
      window.location.href.includes(GOOGLE_CLOUD_BASE_URL)
      && platformDetails
    ) {
      const GOOGLE_CLOUD_START_PAGE_BASE_URL: string
        = 'https://console.cloud.google.com/welcome'
      const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = constructClassQuery(
        'mdc-button mat-mdc-button cfc-switcher-button gm2-switcher-button mat-unthemed mat-mdc-button-base gmat-mdc-button cm-button',
      )
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        isStartStep: true,
        autoClick: false,
        baseUrl: GOOGLE_CLOUD_START_PAGE_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createGoogleOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartOneButtonRequest)

      const OAUTH_CONSENT_SCREEN_BASE_URL: string
        = 'https://console.cloud.google.com/apis/credentials/consent'
      const EXTERNAL_USER_TYPE_INPUT_ID: string = '_0rif_mat-radio-3-input'
      const injectPartTwoButtonRequest = injectButtonRequestSchema.parse({
        autoClick: true,
        baseUrl: OAUTH_CONSENT_SCREEN_BASE_URL,
        querySelector: querySelectorSchema.parse({
          id: EXTERNAL_USER_TYPE_INPUT_ID,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createGoogleOauth2ApplicationPartTwo(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartTwoButtonRequest)

      const OAUTH_CLIENT_ID_BASE_URL: string = `https://console.cloud.google.com/apis/credentials/oauthclient`
      const APPLICATION_TYPE_DROPDOWN_CLASS_QUERY: string = constructClassQuery(
        'mdc-floating-label mat-mdc-floating-label ng-star-inserted',
      )
      const injectPartThreeButtonRequest = injectButtonRequestSchema.parse({
        autoClick: true,
        baseUrl: OAUTH_CLIENT_ID_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: APPLICATION_TYPE_DROPDOWN_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createGoogleOauth2ApplicationPartThree(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartThreeButtonRequest)
    }
    else if (
      window.location.href.includes(LINEAR_BASE_URL)
      && platformDetails
    ) {
      const APPLICATION_NAME_INPUT_ID: string = 'name'
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: LINEAR_BASE_URL,
        querySelector: querySelectorSchema.parse({
          id: APPLICATION_NAME_INPUT_ID,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createLinearOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartOneButtonRequest)
    }
    else if (window.location.href === SLACK_BASE_URL && platformDetails) {
      const CREATE_APP_BUTTON_CLASS_QUERY = constructClassQuery(
        'create_new_app_button',
      )
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: SLACK_BASE_URL,
        querySelector: querySelectorSchema.parse({
          class: CREATE_APP_BUTTON_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createSlackOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartOneButtonRequest)
    }
    else if (window.location.href === X_HOME_PAGE_URL && platformDetails) {
      // X's redirection after logging in is wonky (it redirects to home page instead of developer portal)
      window.location.href = X_DEVELOPER_PAGE_URL
    }
    else if (
      window.location.href === X_DEVELOPER_PAGE_URL
      && platformDetails
    ) {
      const PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY = constructClassQuery(
        'index__navItemButton--352Fy',
      )
      const injectPartOneButtonRequest = injectButtonRequestSchema.parse({
        autoClick: false,
        baseUrl: X_DEVELOPER_PAGE_URL,
        querySelector: querySelectorSchema.parse({
          class: PROJECT_AND_APPS_DROPDOWN_CLASS_QUERY,
        }),
        injectedScript: async () => {
          if (!platformDetails)
            return
          await createXOauth2ApplicationPartOne(
            platformDetails,
            waitUntilPageLoaded,
            waitUntilActionMessageResolved,
            waitUntilRetrieveMessageResolved,
          )
        },
      })
      await injectButton(injectPartOneButtonRequest)
    }
  }

  window.addEventListener('message', async (event) => {
    if (event.source !== window)
      return
    if (event.data.type === messageTypeEnumSchema.Values.platformDetails) {
      platformDetails = event.data.data
      await initializeButton()
    }
  })
})
