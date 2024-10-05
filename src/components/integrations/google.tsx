import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface GoogleIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const GOOGLE_CLOUD_TARGET_URL = "https://console.cloud.google.com";

export default function GoogleIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.google}
      url={GOOGLE_CLOUD_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
