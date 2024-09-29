import z from 'zod'
import { backgroundScriptsEnumSchema } from "@/types/background";


export const navigateToUrlSchema = z.object({
    messageType: backgroundScriptsEnumSchema,
    url: z.string(),
})