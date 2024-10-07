import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database/database.types'
import { Integration } from '@/types/integrations'
import { Platform } from '@/types/platform'

export const supabase = createClient<Database>(
  'https://okdgfqquxjzrrzkfupmj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZGdmcXF1eGp6cnJ6a2Z1cG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyNTk0MjcsImV4cCI6MjA0MzgzNTQyN30.5h93YXKjpJoWF9f3SIJvzWEtE4FgsddynbJKCdVnIds',
)

export async function getIntegrationIdByName(integration: Integration): Promise<number> {
    const { data, error } = await supabase
        .from('integration')
        .select('id')
        .filter('name', 'eq', integration)

    if (error) {
        throw new Error(`Error fetching integration id: ${error.message}`) 
    }
    if (data.length >= 1) {
        throw new Error(`Duplicate integration found for ${integration}`)
    }
    if (data.length === 0) {
        throw new Error(`No integration found for ${integration}`)
    }
    return data[0].id
}

export async function getPlatformIdByName(platform: Platform): Promise<number> {
    const { data, error } = await supabase
        .from('platform')
        .select('id')
        .filter('name', 'eq', platform)

    if (error) {
        throw new Error(`Error fetching platform id: ${error.message}`) 
    }
    if (data.length >= 1) {
        throw new Error(`Duplicate platform found for ${platform}`)
    }
    if (data.length === 0) {
        throw new Error(`No platform found for ${platform}`)
    }
    return data[0].id
}