import z from "zod";

export const backgroundScriptsEnumSchema = z.enum([
  "navigateToUrl",
  "fillInput",
  "clickButton",
  "retrieve",
  "getProjectName",
]);

export type BackgroundScriptsEnum = z.infer<typeof backgroundScriptsEnumSchema>;
