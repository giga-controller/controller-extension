import z from 'zod'

export const messageTypeEnumSchema = z.enum([
  'navigateToUrl',
  'fillInput',
  'click',
  'retrieve',
  'retrieveResponse',
  'getProjectName',
])

export type MessageTypeEnum = z.infer<typeof messageTypeEnumSchema>
