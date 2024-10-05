import z from 'zod'
import { IconType } from 'react-icons/lib'

import {
  SiGoogle,
  SiGoogledocs,
  SiLinear,
  SiSlack,
} from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'

export const integrationEnum = z.enum(['google', 'slack', 'linear', 'x'])
export type Integration = z.infer<typeof integrationEnum>

export const integrationStateSchema = z.object({
  targetUrl: z.string().nullable(),
  integration: integrationEnum.nullable(),
})

export const defaultIntegrationState = {
  targetUrl: null,
  integration: null,
}

export type IntegrationState = z.infer<typeof integrationStateSchema>

export const integrationIconMappingSchema = z.record(
  integrationEnum,
  z.custom<IconType>(),
)
type IntegrationIconMapping = z.infer<typeof integrationIconMappingSchema>

export const integrationIconMapping: IntegrationIconMapping = {
  google: SiGoogle,
  linear: SiLinear,
  slack: SiSlack,
  x: FaXTwitter,
}
