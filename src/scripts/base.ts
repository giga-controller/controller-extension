import { BackgroundScriptsEnum } from '@/types/background'

interface NavigateToUrlProps {
  messageType: BackgroundScriptsEnum
  url: string
}

export async function navigateToUrl({ messageType, url }: NavigateToUrlProps): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: messageType, input: url })
    return true
  }
  catch (err: any) {
    console.error('Error navigating to URL:', err)
    return false
  }
}

interface ClickButtonProps {
    messageType: BackgroundScriptsEnum
    xpath: string
}

export async function clickButton({ messageType, xpath }: ClickButtonProps): Promise<boolean> {
    try {
        await browser.runtime.sendMessage({ type: messageType, input: xpath })
        return true
    } catch (err: any) {
        console.error('Error clicking button:', err)
        return false
    }
}