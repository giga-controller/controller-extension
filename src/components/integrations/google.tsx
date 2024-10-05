import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface GoogleIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export default function GoogleIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.google}
      url="https://console.cloud.google.com"
      updateIntegrationState={updateIntegrationState}
    />
  );
}
