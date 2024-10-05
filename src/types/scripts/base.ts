import z from "zod";
import { messageTypeEnumSchema } from "@/types/message";

export const querySelectorSchema = z.object({
  id: z.string().nullable().optional().default(null),
  class: z.string().nullable().optional().default(null),
  ariaLabel: z.string().nullable().optional().default(null),
  value: z.string().nullable().optional().default(null),
  ariaLabelledby: z.string().nullable().optional().default(null),
  dataTestId: z.string().nullable().optional().default(null),
  index: z.number().nullable().optional().default(0),
});

export type QuerySelector = z.infer<typeof querySelectorSchema>;

export const baseRequestSchema = z.object({
  type: messageTypeEnumSchema,
});

export type BaseRequest = z.infer<typeof baseRequestSchema>;

export const navigateToUrlRequestSchema = baseRequestSchema.extend({
  type: messageTypeEnumSchema.default(
    messageTypeEnumSchema.Values.navigateToUrl,
  ),
  url: z.string(),
});

export type NavigateToUrlRequest = z.infer<typeof navigateToUrlRequestSchema>;

export const clickRequestSchema = baseRequestSchema.extend({
  type: messageTypeEnumSchema.default(messageTypeEnumSchema.Values.click),
  query: querySelectorSchema,
});

export type ClickRequest = z.infer<typeof clickRequestSchema>;

export const fillInputRequestSchema = baseRequestSchema.extend({
  type: messageTypeEnumSchema.default(messageTypeEnumSchema.Values.fillInput),
  value: z.string(),
  query: querySelectorSchema,
});

export type FillInputRequest = z.infer<typeof fillInputRequestSchema>;

export const retrieveRequestSchema = baseRequestSchema.extend({
  type: messageTypeEnumSchema.default(messageTypeEnumSchema.Values.retrieve),
  query: querySelectorSchema,
});

export type RetrieveRequest = z.infer<typeof retrieveRequestSchema>;

export const injectButtonRequestSchema = z.object({
  autoClick: z.boolean(),
  baseUrl: z.string(),
  querySelector: querySelectorSchema,
  injectedScript: z.function(),
  isStartStep: z.boolean().optional().default(false),
});

export type InjectButtonRequest = z.infer<typeof injectButtonRequestSchema>;
