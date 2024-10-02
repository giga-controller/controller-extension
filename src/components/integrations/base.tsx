import { Button } from "@/components/ui/button";
import googleFlow from "@/scripts/google";

interface BaseIntegrationProps {
  name: string;
  url: string;
}
export default function BaseIntegration({ name, url }: BaseIntegrationProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const HARDCODED_PROJECT_NAME = "UseController";
  const HARDCODED_ORIGIN_URI = "http://localhost:3000";
  const HARDCODED_REDIRECT_URI = "http://localhost:3000/callback";

  const toggleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  const confirmCreation = () => {
    // AARON getProjectName();
    googleFlow({
      url: url,
      projectName: HARDCODED_PROJECT_NAME,
      originUri: HARDCODED_ORIGIN_URI,
      redirectUri: HARDCODED_REDIRECT_URI,
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
