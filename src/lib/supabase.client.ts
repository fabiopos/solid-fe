import { createBrowserClient } from "@supabase/ssr";

export function createSupaBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const client = createBrowserClient(url, key);
  return client;
}
