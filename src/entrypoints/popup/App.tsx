import { useState } from "react";
import LinearIntegration from "@/components/integrations/linear";
import RedditIntegration from "@/components/integrations/reddit";
import SlackIntegration from "@/components/integrations/slack";
import XIntegration from "@/components/integrations/x";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlatformDetails } from "@/scripts/base";
import {
  defaultIntegrationState,
  integrationEnum,
  IntegrationState,
} from "@/types/integrations";
import { PlatformDetails } from "@/types/platform";
import { Input } from "@/components/ui/input";
import {
  GDocsIntegration,
  GDriveIntegration,
  GmailIntegration,
  GSheetsIntegration,
} from "@/components/integrations/google";
import HubspotIntegration from "@/components/integrations/hubspot";

function App() {
  const [integrationState, setIntegrationState] = useState<IntegrationState>(
    defaultIntegrationState,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const updateIntegrationState = (input: IntegrationState) => {
    setIntegrationState(input);
  };

  const confirmNavigation = async (url: string) => {
    const platformDetails: PlatformDetails = await getPlatformDetails();

    browser.storage.local.set({
      platform: platformDetails.platform,
      javaScriptOriginUri: platformDetails.javaScriptOriginUri,
      javaScriptRedirectUri: platformDetails.javaScriptRedirectUri,
      projectId: platformDetails.projectId,
      integration: platformDetails.integration,
    });

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(async (tabs) => {
        if (tabs[0]) {
          return browser.tabs
            .update(tabs[0].id!, { url: url })
            .then((response) => {
              console.log("Navigate to URL response:", response);
              return browser.tabs.sendMessage(tabs[0].id!, { input: url });
            })
            .catch((error) => {
              console.error("Error navigating to URL:", error);
              throw new Error("Error navigating to URL");
            });
        } else {
          console.error("No active tab found");
          throw new Error("No active tab found");
        }
      })
      .catch((error) => {
        console.error("Error invoking navigateToUrl:", error);
        throw new Error("Error invoking navigateToUrl");
      });
  };

  const integrations = [
    { component: GmailIntegration, value: integrationEnum.Values.gmail },
    { component: GDriveIntegration, value: integrationEnum.Values.gdrive },
    { component: GDocsIntegration, value: integrationEnum.Values.gdocs },
    { component: GSheetsIntegration, value: integrationEnum.Values.gsheets },
    { component: HubspotIntegration, value: integrationEnum.Values.hubspot },
    { component: SlackIntegration, value: integrationEnum.Values.slack },
    { component: LinearIntegration, value: integrationEnum.Values.linear },
    { component: XIntegration, value: integrationEnum.Values.x },
    { component: RedditIntegration, value: integrationEnum.Values.reddit },
  ];

  const filteredIntegrations = integrations.filter((integration) =>
    integration.value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-w-[320px] max-w-[600px] flex-col gap-4 p-2">
      <h1 className="ml-4 py-5 text-left text-lg font-bold">
        Select Integration
      </h1>
      <div className="flex w-full flex-col items-center justify-center">
        <Input
          type="text"
          placeholder="Search integrations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3 max-w-[90%]"
        />
        <ScrollArea className="h-64 w-full overflow-y-auto">
          <div className="mb-3 grid w-full grid-cols-3 gap-3 p-3">
            {filteredIntegrations.length > 0 ? (
              filteredIntegrations.map(
                ({ component: IntegrationComponent, value }) => (
                  <div key={value}>
                    <IntegrationComponent
                      selected={integrationState.integration === value}
                      updateIntegrationState={updateIntegrationState}
                    />
                  </div>
                ),
              )
            ) : (
              <div className="col-span-3 ml-2 text-[15px] text-gray-800">
                No results found.
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex w-full justify-center px-4 pb-3">
          <Button
            className="w-full text-lg"
            disabled={!integrationState.targetUrl}
            onClick={() => {
              if (!integrationState.targetUrl) {
                return;
              }
              confirmNavigation(integrationState.targetUrl);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
