import z from "zod";

export const platformEnum = z.enum(["nango", "gumloop", "n8n"]);
export type PlatformEnum = z.infer<typeof platformEnum>;

export const platformDetailsSchema = z.object({
    platform: platformEnum,
    javaScriptOriginUri: z.string(),
    javaScriptRedirectUri: z.string(),
})
export type PlatformDetails = z.infer<typeof platformDetailsSchema>;

const _platformDetailsMappingSchema = z.record(
    platformEnum,
    platformDetailsSchema,
);
type PlatformDetailsMapping= z.infer<typeof _platformDetailsMappingSchema>;
  
export const platformDetailsMapping: PlatformDetailsMapping = {
    nango: {
        platform: platformEnum.Values.nango,
        javaScriptOriginUri: "https://app.nango.dev",
        javaScriptRedirectUri: "https://api.nango.dev/oauth/callback",
    },
    gumloop: {
        platform: platformEnum.Values.gumloop,
        javaScriptOriginUri: "https://app.gumloop.com",
        javaScriptRedirectUri: "https://api.gumloop.com/oauth/callback",
    },
    n8n: {
        platform: platformEnum.Values.n8n,
        javaScriptOriginUri: "https://app.n8n.io",
        javaScriptRedirectUri: "https://api.n8n.io/oauth/callback",
    },
};




