import { useState } from 'react'
import GoogleIntegration from '@/components/integrations/google'
import LinearIntegration from '@/components/integrations/linear'
import RedditIntegration from '@/components/integrations/reddit'
import SlackIntegration from '@/components/integrations/slack'
import XIntegration from '@/components/integrations/x'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getPlatformDetails } from '@/scripts/base'
import {
  defaultIntegrationState,
  integrationEnum,
  IntegrationState,
} from '@/types/integrations'
import { PlatformDetails } from '@/types/platform'

function App() {
  const [integrationState, setIntegrationState] = useState<IntegrationState>(
    defaultIntegrationState,
  )

  const updateIntegrationState = (input: IntegrationState) => {
    setIntegrationState(input)
  }

  const confirmNavigation = async (url: string) => {
    const platformDetails: PlatformDetails = await getPlatformDetails()

    browser.storage.local.set({
      platform: platformDetails.platform,
      javaScriptOriginUri: platformDetails.javaScriptOriginUri,
      javaScriptRedirectUri: platformDetails.javaScriptRedirectUri,
      projectId: platformDetails.projectId,
    })

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(async (tabs) => {
        if (tabs[0]) {
          return browser.tabs
            .update(tabs[0].id!, { url: url })
            .then((response) => {
              console.log('Navigate to URL response:', response)
              return browser.tabs.sendMessage(tabs[0].id!, { input: url })
            })
            .catch((error) => {
              console.error('Error navigating to URL:', error)
              throw new Error('Error navigating to URL')
            })
        }
        else {
          console.error('No active tab found')
          throw new Error('No active tab found')
        }
      })
      .catch((error) => {
        console.error('Error invoking navigateToUrl:', error)
        throw new Error('Error invoking navigateToUrl')
      })
  }

  return (
    <ScrollArea className="flex min-w-[320px] max-w-[600px] flex-col gap-4 p-2">
      <h1 className="ml-4 py-5 text-left text-lg font-bold">
        Select Integration
      </h1>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-3 grid grid-cols-3 gap-2 p-3 ">
          <GoogleIntegration
            selected={
              integrationState.integration === integrationEnum.Values.google
            }
            updateIntegrationState={updateIntegrationState}
          />
          <SlackIntegration
            selected={
              integrationState.integration === integrationEnum.Values.slack
            }
            updateIntegrationState={updateIntegrationState}
          />
          <LinearIntegration
            selected={
              integrationState.integration === integrationEnum.Values.linear
            }
            updateIntegrationState={updateIntegrationState}
          />
          <XIntegration
            selected={integrationState.integration === integrationEnum.Values.x}
            updateIntegrationState={updateIntegrationState}
          />
          <RedditIntegration
            selected={
              integrationState.integration === integrationEnum.Values.reddit
            }
            updateIntegrationState={updateIntegrationState}
          />
        </div>
        <div className="flex w-full  justify-center px-4 pb-3">
          <Button
            className="w-full text-lg "
            disabled={!integrationState.targetUrl}
            onClick={() => {
              if (!integrationState.targetUrl) {
                return
              }
              confirmNavigation(integrationState.targetUrl)
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

export default App
