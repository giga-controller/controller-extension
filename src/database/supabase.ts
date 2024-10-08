import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from "@/database/database.types";
import { Integration } from "@/types/integrations";
import { Platform } from "@/types/platform";

export const supabase = createClient<Database>(
  "https://okdgfqquxjzrrzkfupmj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZGdmcXF1eGp6cnJ6a2Z1cG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNjEwNTYsImV4cCI6MjA0MzkzNzA1Nn0.Gop5rcktrcscs1Op-gk3iK0xXN8z2pO8ORCW7hTRa9w",
);

export type _Workflow = Tables<"workflow">;
export type Workflow = Omit<_Workflow, "id" | "created_at" | "updated_at">;

export async function getIntegrationIdByName(
  integration: Integration,
): Promise<number> {
  const { data, error } = await supabase
    .from("integration")
    .select("id")
    .filter("name", "eq", integration);

  if (error) {
    throw new Error(`Error fetching integration id: ${error.message}`);
  }
  if (data.length > 1) {
    throw new Error(`Duplicate integration found for ${integration}`);
  }
  if (data.length === 0) {
    throw new Error(`No integration found for ${integration}`);
  }
  return data[0].id;
}

export async function getPlatformIdByName(platform: Platform): Promise<number> {
  const { data, error } = await supabase
    .from("platform")
    .select("id")
    .filter("name", "eq", platform);

  if (error) {
    throw new Error(`Error fetching platform id: ${error.message}`);
  }
  if (data.length > 1) {
    throw new Error(`Duplicate platform found for ${platform}`);
  }
  if (data.length === 0) {
    throw new Error(`No platform found for ${platform}`);
  }
  return data[0].id;
}

export async function getAllWhitelistedUrls(): Promise<string[]> {
  const { data, error } = await supabase
    .from("platform")
    .select("whitelisted_urls")
    .not("whitelisted_urls", "is", null);
  if (error) {
    throw new Error(`Error fetching whitelisted urls: ${error.message}`);
  }
  return data?.flatMap((item) => item.whitelisted_urls) || [];
}

export async function insertWorkflow(workflow: Workflow): Promise<void> {
  const { data, error } = await supabase.from("workflow").insert(workflow);
  if (error) {
    throw new Error(`Error inserting workflow: ${error.message}`);
  }
  console.log("Inserted workflow:", data);
}
