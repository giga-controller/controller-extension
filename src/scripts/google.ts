import { backgroundScriptsEnum } from "@/types/background";

interface GoogleFlowProps {
  url: string
}

export default async function googleFlow({ url }: GoogleFlowProps) {
  const response = await navigateToUrl(url);
  if (!response) {
    console.error('Error navigating to URL');
  }
  
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const fillResponse = await fillInput('//*[@id="identifierId"]', 'Hello, world!');
  if (!fillResponse) {
    console.error('Error filling input');
  }
}

async function navigateToUrl(url: string): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: backgroundScriptsEnum.Values.navigateToUrl, input: url });
    return true;
  } catch (err: any) {
    console.error('Error navigating to URL:', err);
    return false;
  }

}

async function fillInput(xpath: string, value: string): Promise<boolean> {
  try {
    await browser.runtime.sendMessage({ type: backgroundScriptsEnum.Values.fillInput, input: { xpath, value } });
    return true;
  } catch (err: any) {
    console.error('Error navigating to URL:', err);
    return false;
  }
}