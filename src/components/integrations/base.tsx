import { Button } from "@/components/ui/button";
import { getPlatformDetails } from "@/scripts/base";
import { PlatformDetails } from "@/types/platform";

interface BaseIntegrationProps {
  name: string;
  url: string;
}

export default function BaseIntegration({ name, url }: BaseIntegrationProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const confirmCreation = async () => {
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
    <div className="flex flex-row space-x-2 items-center justify-center">
      <Button className="w-full" onClick={() => toggleIsClicked()}>
        {name}
      </Button>
      <div
        className={`flex space-x-2 flex-row ${isClicked ? "visible" : "invisible"}`}
      >
        <Button
          className="bg-green-500"
          onClick={async () => {
            setIsClicked(false);
            confirmCreation();
          }}
        >
          ✓
        </Button>
        <Button className="bg-red-500" onClick={() => setIsClicked(false)}>
          ✗
        </Button>
      </div>
    </div>
  );
}
