import { backgroundScriptsEnumSchema } from '@/types/background'

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_end', // Run the content script after the page has finished loading
  main() {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === backgroundScriptsEnumSchema.Values.fillInput) {
        try {
          const { id, value } = message.input

          const element = document.getElementById(id)        

          if (element && element instanceof HTMLInputElement) {
            element.value = value
            const inputEvent = new Event('input', { bubbles: true })
            element.dispatchEvent(inputEvent)
            const changeEvent = new Event('change', { bubbles: true })
            element.dispatchEvent(changeEvent)

            sendResponse({ success: true })
          }
          else {
            console.error('No matching input field found')
            throw new Error('No matching input field found')
          }
        }
        catch (error) {
          console.error(`Error filling input: ${(error as Error).message}`)
          throw new Error(`Error filling input: ${(error as Error).message}`)
        }
      } else if (message.type === backgroundScriptsEnumSchema.Values.clickButton) {
        try {
          const element = document.querySelectorAll(message.input)[0] as HTMLElement

          if (element) {
            element.click()
          }

          sendResponse({ success: true })
        }
        catch (error) {
          console.error(`Error clicking button: ${(error as Error).message}`)
          throw new Error(`Error clicking button: ${(error as Error).message}`)
        }   
      }
      return true
    });
  },
})
