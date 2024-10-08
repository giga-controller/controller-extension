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
import { PlatformDetails, platformEnum } from "@/types/platform";
import { Input } from "@/components/ui/input";
import {
  GDocsIntegration,
  GDriveIntegration,
  GmailIntegration,
  GSheetsIntegration,
} from "@/components/integrations/google";
import HubspotIntegration from "@/components/integrations/hubspot";
import SalesforceIntegration from "@/components/integrations/salesforce";
import {
  getIntegrationIdByName,
  getPlatformIdByName,
  insertWorkflow,
  Workflow,
} from "@/database/supabase";
import usePlatforms from "@/lib/hooks/use-platforms";

function App() {
  const [integrationState, setIntegrationState] = useState<IntegrationState>(
    defaultIntegrationState,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isInWhitelistedPage, setIsInWhitelistedPage] = useState(true);
  const { whitelistedUrls: whitelistedUrls } = usePlatforms();

  const updateIntegrationState = (input: IntegrationState) => {
    setIntegrationState(input);
  };

  const navigate = async (url: string, platformDetails: PlatformDetails) => {
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

  const confirmNavigation = async () => {
    if (!integrationState.targetUrl || !integrationState.integration) {
      return;
    }
    const platformDetails: PlatformDetails = await getPlatformDetails();
    const [integrationId, platformId] = await Promise.all([
      getIntegrationIdByName(
        integrationEnum.Values[integrationState.integration],
      ),
      getPlatformIdByName(platformEnum.Values[platformDetails.platform]),
    ]);
    const workflowEntry: Workflow = {
      integration_id: integrationId,
      platform_id: platformId,
      is_successful: false,
    };
    insertWorkflow(workflowEntry);
    if (
      //This supports only the exact whitelisted urls.
      whitelistedUrls.includes(platformDetails.javaScriptOriginUri)

      // Uncomment this to support partial whitelisted urls.
      // whitelistedUrls.some(url => platformDetails?.javaScriptOriginUri?.includes(url))
    ) {
      setIsInWhitelistedPage(true);
      await navigate(integrationState.targetUrl, platformDetails);
    } else {
      setIsInWhitelistedPage(false);
      console.error("JavaScript Origin URI is not whitelisted");
    }
  };

  const integrations = [
    {
      component: GmailIntegration,
      values: [integrationEnum.Values.gmail, "google"],
    },
    {
      component: GDriveIntegration,
      values: [integrationEnum.Values.gdrive, "google"],
    },
    {
      component: GDocsIntegration,
      values: [integrationEnum.Values.gdocs, "google"],
    },
    {
      component: GSheetsIntegration,
      values: [integrationEnum.Values.gsheets, "google"],
    },
    { component: HubspotIntegration, values: [integrationEnum.Values.hubspot] },
    { component: SlackIntegration, values: [integrationEnum.Values.slack] },
    { component: LinearIntegration, values: [integrationEnum.Values.linear] },
    { component: XIntegration, values: [integrationEnum.Values.x, "twitter"] },
    { component: RedditIntegration, values: [integrationEnum.Values.reddit] },
    {
      component: SalesforceIntegration,
      values: [integrationEnum.Values.salesforce],
    },
  ];

  const filteredIntegrations = integrations
    .filter((integration) =>
      integration.values?.some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
    .sort((a, b) => a.values[0].localeCompare(b.values[0]));
  console.log(filteredIntegrations);

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
                ({ component: IntegrationComponent, values }) => (
                  <div key={values[0]}>
                    <IntegrationComponent
                      selected={integrationState.integration === values[0]}
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
            onClick={confirmNavigation}
          >
            Confirm
          </Button>
        </div>
        {!isInWhitelistedPage && (
          <p className="text-xs text-red-500 italic py-2 px-1 text-center">
            The current page is not supported. Please navigate to a valid
            provider page to use this integration.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
