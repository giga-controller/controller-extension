// AARON export async function getProjectName(): Promise<string> {

async function getCurrentTabUrl(): Promise<string> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0]?.url || "";
}
