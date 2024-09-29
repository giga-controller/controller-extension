import z from 'zod'

export const backgroundScriptsEnumSchema = z.enum(['navigateToUrl', 'fillInput'])

export type BackgroundScriptsEnum = z.infer<typeof backgroundScriptsEnumSchema>
