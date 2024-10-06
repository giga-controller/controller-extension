import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface SalesforceIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const SALESFORCE_TARGET_URL = "https://www.salesforce.com";

export default function SalesforceIntegration({
  selected,
  updateIntegrationState,
}: SalesforceIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.salesforce}
      url={SALESFORCE_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
