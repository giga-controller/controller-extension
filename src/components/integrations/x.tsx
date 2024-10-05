import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface XIntegrationProps {
  selected: boolean;
  updateIntegrationState: (url: IntegrationState) => void;
}

export const X_TARGET_URL = "https://developer.x.com/en/portal/dashboard";

export default function XIntegration({
  selected,
  updateIntegrationState,
}: XIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.x}
      url={X_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
