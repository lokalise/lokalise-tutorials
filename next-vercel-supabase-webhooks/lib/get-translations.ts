// lib/get-translations.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;
function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      '[get-translations] Missing NEXT_PUBLIC_SUPABASE_URL or ANON_KEY env var'
    );
  }

  supabase = createClient(url, key);
  return supabase;
}

export async function getTranslations<T extends Record<string, any>>(
  locale: string,
  namespace = 'default'
): Promise<T> {
  const lang = locale.trim().toLowerCase();
  const ns = namespace.trim().toLowerCase() || 'default';

  const path = `locales/${lang}/${ns}.json`;
  let json: T = {} as T;

  try {
    const { data, error } = await getSupabaseClient()
      .storage
      .from('i18ndemo')
      .download(path);

    if (error) {
      const causeStatus = (error as any).cause?.status;
      const msg = error.message?.toLowerCase() ?? '';
      const isNotFound = causeStatus === 404 || msg.includes('not found');

      if (!isNotFound) {
        console.error(`[get-translations] Error downloading ${path}:`, error);
      }

      return {} as T;
    }

    const text = await data.text();
    try {
      json = JSON.parse(text) as T;
    } catch (e) {
      console.error(`[get-translations] Invalid JSON in ${path}:`, e);
    }
  } catch (e) {
    console.error(`[get-translations] Unexpected error fetching ${path}:`, e);
  }

  return json;
}

