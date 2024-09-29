import { Button } from "@/components/ui/button";

interface BaseIntegrationProps {
  name: string;
  url: string;
}
export default function BaseIntegration({ name, url }: BaseIntegrationProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const confirmCreation = () => {
    // Send a message to the background script to open a new tab
    chrome.runtime.sendMessage({ action: "navigateToUrl", url }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
      } else {
        console.log('Response:', response);
      }
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
          onClick={() => {
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
