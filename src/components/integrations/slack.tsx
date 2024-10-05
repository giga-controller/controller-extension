import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface SlackIntegrationProps {
  selected: boolean;
  updateIntegrationState: (url: IntegrationState) => void;
}

export default function SlackIntegration({
  selected,
  updateIntegrationState,
}: SlackIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.slack}
      url="https://console.cloud.google.com"
      updateIntegrationState={updateIntegrationState}
    />
  );
}
