import { backgroundScriptsEnumSchema } from '@/types/background'

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_end', // Run the content script after the page has finished loading
  main() {
    browser.runtime.onMessage.addListener((request) => {
      if (request.action === backgroundScriptsEnumSchema.Values.fillInput) {
        try {
          const { xpath, value } = request.input

          // Find the element using XPath
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          ).singleNodeValue as HTMLInputElement | null

          if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
            // Fill the input with the provided value
            element.value = value

            // Trigger input event to simulate user input
            const inputEvent = new Event('input', { bubbles: true })
            element.dispatchEvent(inputEvent)

            // Trigger change event
            const changeEvent = new Event('change', { bubbles: true })
            element.dispatchEvent(changeEvent)

            return Promise.resolve(true)
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
      }
    })
  },
})
