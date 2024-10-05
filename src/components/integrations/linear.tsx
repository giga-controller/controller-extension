import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface LinearIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export default function LinearIntegration({
  selected,
  updateIntegrationState,
}: LinearIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.linear}
      url="https://console.cloud.google.com"
      updateIntegrationState={updateIntegrationState}
    />
  );
}
