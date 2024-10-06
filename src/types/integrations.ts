import z from "zod";
import { IconType } from "react-icons/lib";

import {
  SiLinear,
  SiReddit,
  SiSlack,
  SiGmail,
  SiGoogledocs,
  SiGooglesheets,
  SiGoogledrive,
  SiHubspot,
  SiSalesforce,
} from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

export const integrationEnum = z.enum([
  "gmail",
  "gdrive",
  "gdocs",
  "gsheets",
  "hubspot",
  "salesforce",
  "slack",
  "linear",
  "x",
  "reddit",
]);
export type Integration = z.infer<typeof integrationEnum>;

export const integrationStateSchema = z.object({
  targetUrl: z.string().nullable(),
  integration: integrationEnum.nullable(),
});

export const defaultIntegrationState = {
  targetUrl: null,
  integration: null,
};

export type IntegrationState = z.infer<typeof integrationStateSchema>;

export const integrationIconMappingSchema = z.record(
  integrationEnum,
  z.custom<IconType>(),
);
type IntegrationIconMapping = z.infer<typeof integrationIconMappingSchema>;

export const integrationIconMapping: IntegrationIconMapping = {
  gmail: SiGmail,
  gdrive: SiGoogledrive,
  gdocs: SiGoogledocs,
  gsheets: SiGooglesheets,
  hubspot: SiHubspot,
  linear: SiLinear,
  salesforce: SiSalesforce,
  slack: SiSlack,
  reddit: SiReddit,
  x: FaXTwitter,
};
