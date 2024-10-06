import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface SlackIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const SLACK_TARGET_URL = "https://api.slack.com/apps";

export default function SlackIntegration({
  selected,
  updateIntegrationState,
}: SlackIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.slack}
      url={SLACK_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
