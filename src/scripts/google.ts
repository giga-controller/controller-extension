import { clickButton, fillInput, navigateToUrl } from '@/scripts/base'
import { backgroundScriptsEnumSchema } from '@/types/background'
import { clickButtonSchema, fillInputSchema, navigateToUrlSchema } from '@/types/scripts/base'

interface GoogleFlowProps {
  url: string
  projectName: string
}

export default async function googleFlow({ url, projectName }: GoogleFlowProps) {
  const navigateToUrlRequest = navigateToUrlSchema.parse({ 
    messageType: backgroundScriptsEnumSchema.Values.navigateToUrl, url: url 
  })
  const navigateToUrlResponse = await navigateToUrl(navigateToUrlRequest)

  if (!navigateToUrlResponse) {
    console.error('Error navigating to URL')
  }

  while (true) {
    const currentUrl = await getCurrentTabUrl()
    if (currentUrl.startsWith(url)) {
      break
    }
    await new Promise(resolve => setTimeout(resolve, 1000)) // Check every second
  }

  await new Promise(resolve => setTimeout(resolve, 2000))

  const PROJECT_DROPDOWN_BUTTON_CLASS_QUERY: string = ".ng-tns-c2348414657-2.mdc-button.mat-mdc-button.cfc-switcher-button.gm2-switcher-button.mat-unthemed.mat-mdc-button-base.gmat-mdc-button.cm-button"
  const clickProjectDropdownButtonRequest = clickButtonSchema.parse({ messageType: backgroundScriptsEnumSchema.Values.clickButton, classQuery: PROJECT_DROPDOWN_BUTTON_CLASS_QUERY })
  const clickProjectDropdownButtonResponse = await clickButton(clickProjectDropdownButtonRequest)
  if (!clickProjectDropdownButtonResponse) {
    console.error('Error clicking project dropdown button')
  }

  await new Promise(resolve => setTimeout(resolve, 2000))

  const NEW_PROJECT_BUTTON_CLASS_QUERY: string = ".purview-picker-create-project-button.mdc-button.mat-mdc-button.mat-unthemed.mat-mdc-button-base.gmat-mdc-button.cm-button.ng-star-inserted"
  const clickNewProjectButtonRequest = clickButtonSchema.parse({ messageType: backgroundScriptsEnumSchema.Values.clickButton, classQuery: NEW_PROJECT_BUTTON_CLASS_QUERY })
  const clickNewProjectButtonResponse = await clickButton(clickNewProjectButtonRequest)
  if (!clickNewProjectButtonResponse) {
    console.error('Error clicking new project button')
  }

  await new Promise(resolve => setTimeout(resolve, 2000))

  const PROJECT_NAME_INPUT_CLASS_QUERY: string = ".cm-input.mat-mdc-input-element.ng-tns-c556826017-2.ng-pristine.ng-valid.gmat-mdc-input.mat-mdc-form-field-input-control.mdc-text-field__input.cdk-text-field-autofill-monitored.ng-touched"
  const fillProjectNameInputRequest = fillInputSchema.parse({ messageType: backgroundScriptsEnumSchema.Values.fillInput, classQuery: PROJECT_NAME_INPUT_CLASS_QUERY, value: projectName })
  const fillProjectNameInputResponse = await fillInput(fillProjectNameInputRequest)
  if (!fillProjectNameInputResponse) {
    console.error('Error filling project name input')
  }

}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.url || ''
}


