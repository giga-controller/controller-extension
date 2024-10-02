import z from 'zod'
import { messageTypeEnumSchema } from '@/types/background'

export const navigateToUrlRequestSchema = z.object({
  type: messageTypeEnumSchema,
  url: z.string(),
})

export type NavigateToUrlRequest = z.infer<typeof navigateToUrlRequestSchema>

export const querySelectorSchema = z.object({
  id: z.string().nullable().optional().default(null),
  class: z.string().nullable().optional().default(null),
  ariaLabel: z.string().nullable().optional().default(null),
  index: z.number().nullable().optional().default(0),
})

export type QuerySelector = z.infer<typeof querySelectorSchema>

export const clickRequestSchema = z.object({
  type: messageTypeEnumSchema,
  query: querySelectorSchema,
})

export type ClickRequest = z.infer<typeof clickRequestSchema>

export const fillInputRequestSchema = z.object({
  type: messageTypeEnumSchema,
  value: z.string(),
  query: querySelectorSchema,
})

export type FillInputRequest = z.infer<typeof fillInputRequestSchema>

export const retrieveRequestSchema = z.object({
  type: messageTypeEnumSchema,
  query: querySelectorSchema,
})

export type RetrieveRequest = z.infer<typeof retrieveRequestSchema>
