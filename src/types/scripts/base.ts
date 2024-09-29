import z from 'zod'
import { backgroundScriptsEnumSchema } from "@/types/background";


export const navigateToUrlSchema = z.object({
    messageType: backgroundScriptsEnumSchema,
    url: z.string(),
})

export const clickButtonSchema = z.object({
    messageType: backgroundScriptsEnumSchema,
    classQuery: z.string(),
})

export const fillInputSchema = z.object({
    messageType: backgroundScriptsEnumSchema,
    classQuery: z.string(),
    value: z.string(),
})