import { navigateToUrl } from '@/scripts/base'
import { backgroundScriptsEnumSchema } from '@/types/background'
import { navigateToUrlSchema } from '@/types/scripts/base'

interface GoogleFlowProps {
  url: string
}

//*[@id="panelgoog_2070199262"]/div[1]/pcc-platform-bar/cfc-platform-bar/div/div[1]/pcc-platform-bar-purview-switcher/pcc-purview-switcher/cfc-switcher-button/button

export default async function googleFlow({ url }: GoogleFlowProps) {
  const navigateToUrlRequest = navigateToUrlSchema.parse({ messageType: backgroundScriptsEnumSchema.Values.navigateToUrl, url })
  const response = await navigateToUrl(navigateToUrlRequest)

  if (!response) {
    console.error('Error navigating to URL')
  }

  while (true) {
    const currentUrl = await getCurrentTabUrl()
    if (currentUrl.startsWith(url)) {
      break
    }
    await new Promise(resolve => setTimeout(resolve, 1000)) // Check every second
  }

  console.log('ERROR ARRIVES HERE')
}

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.url || ''
}

// const fillResponse = await fillInput('//*[@id="identifierId"]', 'good');
// if (!fillResponse) {
//   console.error('Error filling input');
// }

// async function fillInput(xpath: string, value: string): Promise<boolean> {
//   try {
//     await browser.runtime.sendMessage({ type: backgroundScriptsEnum.Values.fillInput, input: { xpath, value } });
//     return true;
//   } catch (err: any) {
//     console.error('Error navigating to URL:', err);
//     return false;
//   }
// }
