import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface LinearIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const LINEAR_TARGET_URL = "https://linear.app/linear-controller/settings/api/applications/new";


export default function LinearIntegration({
  selected,
  updateIntegrationState,
}: LinearIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.linear}
      url={LINEAR_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
