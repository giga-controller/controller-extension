import GoogleIntegration from "@/components/integrations/google";
import LinearIntegration from "@/components/integrations/linear";
import SlackIntegration from "@/components/integrations/slack";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlatformDetails } from "@/scripts/base";
import {
  defaultIntegrationState,
  integrationEnum,
  IntegrationState,
} from "@/types/integrations";
import { PlatformDetails } from "@/types/platform";

function App() {
  const [integrationState, setIntegrationState] = useState<IntegrationState>(
    defaultIntegrationState,
  );

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

  return (
    <ScrollArea className="min-w-[400px] max-w-[600px] flex flex-col gap-4">
      <h1 className="text-center font-bold text-2xl py-5">
        Select Integration
      </h1>
      <div className="flex items-center justify-center flex-col w-full">
        <div className="p-5 space-y-2 mb-3">
          <GoogleIntegration
            selected={
              integrationState.integration === integrationEnum.Values.google
            }
            updateIntegrationState={updateIntegrationState}
          />
          <SlackIntegration
            selected={
              integrationState.integration === integrationEnum.Values.slack
            }
            updateIntegrationState={updateIntegrationState}
          />
          <LinearIntegration
            selected={
              integrationState.integration === integrationEnum.Values.linear
            }
            updateIntegrationState={updateIntegrationState}
          />
        </div>
        <div className="flex justify-center min-w-[50%] pb-3">
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
    </ScrollArea>
  );
}

export default App;
