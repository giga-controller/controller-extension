import z from 'zod'
import { backgroundScriptsEnumSchema } from '@/types/background'

export const navigateToUrlRequestSchema = z.object({
  type: backgroundScriptsEnumSchema,
  url: z.string(),
})

export type NavigateToUrlRequest = z.infer<typeof navigateToUrlRequestSchema>

export const querySelectorSchema = z.object({
  id: z.string().nullable().optional().default(null),
  classQuery: z.string().nullable().optional().default(null),
  ariaLabel: z.string().nullable().optional().default(null),
  index: z.number().nullable().optional().default(0),
})

export const clickButtonRequestSchema = z.object({
  type: backgroundScriptsEnumSchema,
  input: querySelectorSchema,
})

export type ClickButtonRequest = z.infer<typeof clickButtonRequestSchema>

export const fillInputRequestSchema = z.object({
  type: backgroundScriptsEnumSchema,
  value: z.string(),
  id: z.string().nullable().optional().default(null),
  classQuery: z.string().nullable().optional().default(null),
  ariaLabel: z.string().nullable().optional().default(null),
  index: z.number().nullable().optional().default(0),
})

export type FillInputRequest = z.infer<typeof fillInputRequestSchema>

export const retrieveRequestSchema = z.object({
  type: backgroundScriptsEnumSchema,
  id: z.string().nullable().optional().default(null),
  classQuery: z.string().nullable().optional().default(null),
})

export type RetrieveRequest = z.infer<typeof retrieveRequestSchema>
