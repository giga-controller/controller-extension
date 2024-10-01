import z from "zod";
import { backgroundScriptsEnumSchema } from "@/types/background";

export const navigateToUrlRequestSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  url: z.string(),
});

export type NavigateToUrlRequest = z.infer<typeof navigateToUrlRequestSchema>;

export const clickButtonRequestSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  id: z.string().nullable().optional().default(null),
  classQuery: z.string().nullable().optional().default(null),
});

export type ClickButtonRequest = z.infer<typeof clickButtonRequestSchema>;

export const fillInputRequestSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  id: z.string().nullable().optional().default(null),
  classQuery: z.string().nullable().optional().default(null),
  value: z.string(),
});

export type FillInputRequest = z.infer<typeof fillInputRequestSchema>;
