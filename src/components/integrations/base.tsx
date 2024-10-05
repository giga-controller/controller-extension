import { Button } from "@/components/ui/button";
import { capitaliseFirstLetter } from "@/lib/utils";
import { Integration, IntegrationState } from "@/types/integrations";

interface BaseIntegrationProps {
  selected: boolean;
  integration: Integration;
  url: string;
  updateIntegrationState: (input: IntegrationState) => void;
}

export default function BaseIntegration({
  selected,
  integration,
  url,
  updateIntegrationState,
}: BaseIntegrationProps) {
  return (
    <div className="flex flex-row space-x-2 items-center justify-center">
      <Button
        className={`w-full ${selected ? "bg-green-500 hover:bg-green-500" : ""}`}
        onClick={() =>
          updateIntegrationState({
            integration: integration,
            targetUrl: url,
          })
        }
      >
        {capitaliseFirstLetter(integration)}
      </Button>
    </div>
  );
}
