import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (supabase) return supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  supabase = createClient(url, key);
  return supabase;
}

export async function saveLead(data: {
  linkedin_url: string;
  company_name?: string;
  answers: Record<string, string>;
  recommended_stack: string;
  total_monthly_cost: number;
}) {
  const client = getClient();
  if (!client) {
    console.warn("Supabase not configured — skipping lead save");
    return;
  }
  const { error } = await client.from("leads").insert([data]);
  if (error) {
    console.error("Error saving lead:", error);
    throw error;
  }
}
