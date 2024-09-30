import z from 'zod'
import { backgroundScriptsEnumSchema } from '@/types/background'

export const navigateToUrlSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  url: z.string(),
})

export const clickButtonSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  classQuery: z.string(),
})

export const fillInputRequestSchema = z.object({
  messageType: backgroundScriptsEnumSchema,
  id: z.string(),
  value: z.string(),
})

export type FillInputRequest = z.infer<typeof fillInputRequestSchema>
