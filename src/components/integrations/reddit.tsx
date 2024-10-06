import BaseIntegration from "@/components/integrations/base";
import { integrationEnum, IntegrationState } from "@/types/integrations";

interface RedditIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const REDDIT_TARGET_URL = "https://www.reddit.com/prefs/apps";

export default function RedditIntegration({
  selected,
  updateIntegrationState,
}: RedditIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integrationEnum.Values.reddit}
      url={REDDIT_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
