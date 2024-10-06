import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface HubspotIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const HUBSPOT_TARGET_URL = "https://app.hubspot.com/developer";

export default function HubspotIntegration({
  selected,
  updateIntegrationState,
}: HubspotIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.hubspot}
      url={HUBSPOT_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
