import z from "zod";

export const integrationEnum = z.enum([
  "google",
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
