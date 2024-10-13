import z from "zod";

export const messageTypeEnumSchema = z.enum([
  "navigateToUrl",
  "fillInput",
  "fillInputResponse",
  "click",
  "clickResponse",
  "retrieve",
  "retrieveResponse",
  "getProjectName",
  "platformDetails",
  "platformDetailsResponse",
  "error",
  "resetBrowserStorage",
]);

export type MessageTypeEnum = z.infer<typeof messageTypeEnumSchema>;
