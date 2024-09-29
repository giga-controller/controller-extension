import BaseIntegration from "@/components/integrations/base";
import { capitaliseFirstLetter } from "@/lib/utils";
import { integrationEnum } from "@/types/integrations";

export default function GoogleIntegration() {
  return (
    <BaseIntegration
      name={capitaliseFirstLetter(integrationEnum.Values.google)}
      url="https://console.cloud.google.com"
    />
  );
}
