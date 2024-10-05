import BaseIntegration from "@/components/integrations/base";
import {
  Integration,
  integrationEnum,
  IntegrationState,
} from "@/types/integrations";

interface GoogleBaseIntegrationProps {
  selected: boolean;
  integration: Integration;
  updateIntegrationState: (input: IntegrationState) => void;
}

export const GOOGLE_CLOUD_TARGET_URL = "https://console.cloud.google.com";

function GoogleBaseIntegration({
  selected,
  integration,
  updateIntegrationState,
}: GoogleBaseIntegrationProps) {
  return (
    <BaseIntegration
      selected={selected}
      integration={integration}
      url={GOOGLE_CLOUD_TARGET_URL}
      updateIntegrationState={updateIntegrationState}
    />
  );
}

interface GoogleIntegrationProps {
  selected: boolean;
  updateIntegrationState: (input: IntegrationState) => void;
}

export function GmailIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <GoogleBaseIntegration
      selected={selected}
      integration={integrationEnum.Values.gmail}
      updateIntegrationState={updateIntegrationState}
    />
  );
}

export function GDriveIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <GoogleBaseIntegration
      selected={selected}
      integration={integrationEnum.Values.gdrive}
      updateIntegrationState={updateIntegrationState}
    />
  );
}

export function GDocsIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <GoogleBaseIntegration
      selected={selected}
      integration={integrationEnum.Values.gdocs}
      updateIntegrationState={updateIntegrationState}
    />
  );
}

export function GSheetsIntegration({
  selected,
  updateIntegrationState,
}: GoogleIntegrationProps) {
  return (
    <GoogleBaseIntegration
      selected={selected}
      integration={integrationEnum.Values.gsheets}
      updateIntegrationState={updateIntegrationState}
    />
  );
}
