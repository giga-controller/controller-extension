import { BackgroundScriptsEnum } from '@/types/background'
import { FillInputRequest } from '@/types/scripts/base'

interface NavigateToUrlProps {
  messageType: BackgroundScriptsEnum
  url: string
}

// AARON export async function getProjectName(): Promise<string> {

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
  classQuery: string
}

export async function clickButton({ messageType, classQuery }: ClickButtonProps): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: messageType, input: classQuery })
    return true
  }
  catch (err: any) {
    console.error('Error clicking button:', err)
    return false
  }
}

export async function fillInput({ messageType, id, value }: FillInputRequest): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: messageType, input: { id, value } })
    return true
  }
  catch (err: any) {
    console.error('Error navigating to URL:', err)
    return false
  }
}
