import BaseIntegration from "@/components/integrations/base";
import { capitaliseFirstLetter } from "@/lib/utils";
import { integrationEnum } from "@/types/integrations";

export default function SlackIntegration() {
  return (
    <BaseIntegration
      name={capitaliseFirstLetter(integrationEnum.Values.slack)}
    />
  );
}
