import { integrationEnum } from "@/types/integrations";
import z from "zod";

export const platformEnum = z.enum(["nango", "gumloop", "n8nio"]); // at least 5 characters long
export type PlatformEnum = z.infer<typeof platformEnum>;

export const platformDetailsSchema = z.object({
  platform: platformEnum,
  integration: integrationEnum.nullable(),
  javaScriptOriginUri: z.string(),
  javaScriptRedirectUri: z.string(),
  projectId: z.string().nullable(),
});
export type PlatformDetails = z.infer<typeof platformDetailsSchema>;

const _platformDetailsMappingSchema = z.record(
  platformEnum,
  platformDetailsSchema,
);
type PlatformDetailsMapping = z.infer<typeof _platformDetailsMappingSchema>;

export const platformDetailsMapping: PlatformDetailsMapping = {
  nango: {
    platform: platformEnum.Values.nango,
    integration: null,
    javaScriptOriginUri: "https://app.nango.dev",
    javaScriptRedirectUri: "https://api.nango.dev/oauth/callback",
    projectId: null,
  },
  gumloop: {
    platform: platformEnum.Values.gumloop,
    integration: null,
    javaScriptOriginUri: "https://app.gumloop.com",
    javaScriptRedirectUri: "https://api.gumloop.com/oauth/callback",
    projectId: null,
  },
  n8nio: {
    platform: platformEnum.Values.n8nio,
    integration: null,
    javaScriptOriginUri: "https://app.n8n.io",
    javaScriptRedirectUri: "https://api.n8n.io/oauth/callback",
    projectId: null,
  },
};
