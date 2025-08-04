import { NextRequest, NextResponse } from 'next/server';
import { LokaliseDownload } from 'lokalise-file-exchange';
import type { WebhookProjectTaskClosed } from '@lokalise/node-api';
import { revalidatePath } from 'next/cache';
import { LokaliseApi } from '@lokalise/node-api';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

//
// ——————————————————————————————————————————————————————————
//   1) ENV VAR VALIDATION
// ——————————————————————————————————————————————————————————
//
const {
  LOKALISE_PROJECT_ID,
  LOKALISE_WEBHOOK_SECRET,
  LOKALISE_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
} = process.env;

if (!LOKALISE_PROJECT_ID) {
  throw new Error('Missing env var LOKALISE_PROJECT_ID');
}
if (!LOKALISE_WEBHOOK_SECRET) {
  throw new Error('Missing env var LOKALISE_WEBHOOK_SECRET');
}
if (!LOKALISE_API_KEY) {
  throw new Error('Missing env var LOKALISE_API_KEY');
}
if (!NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env var NEXT_PUBLIC_SUPABASE_URL');
}
if (!SUPABASE_SERVICE_KEY) {
  throw new Error('Missing env var SUPABASE_SERVICE_KEY');
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);

const BUCKET = 'i18ndemo';

//
// ——————————————————————————————————————————————————————————
//   2) WEBHOOK HANDLER
// ——————————————————————————————————————————————————————————
//
export async function POST(req: NextRequest) {
  // 2.1 — Secret check
  const receivedSecret = req.headers.get('x-secret');
  if (receivedSecret !== LOKALISE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2.2 — Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 2.3 — Ping
  if (Array.isArray(body) && body[0] === 'ping') {
    return NextResponse.json({ status: 'success' });
  }

  // 2.4 — project.task.closed
  if (
    typeof body === 'object' &&
    body !== null &&
    (body as any).event === 'project.task.closed' &&
    (body as any).project?.id === LOKALISE_PROJECT_ID
  ) {
    const payload = body as WebhookProjectTaskClosed;
    console.log(
      `🟢 Task "${payload.task.title}" (${payload.task.id}) closed in "${payload.project.name}"`
    );

    try {
      // a) find target langs
      const langs = await getTaskTargetLanguages(payload.task.id);

      // b) clear any old files
      await clearTmpDir('/tmp/locales');

      // c) download fresh JSONs
      await downloadFromLokalise(langs);

      // d) upload them to Supabase
      await uploadFromTmpToSupabase();

      for (const lang of langs) {
        // invalidate the /[lang] page
        revalidatePath(`/${lang}`);
      }

      return NextResponse.json({ status: 'task processed' });
    } catch (err) {
      console.error('❌ Error processing task:', err);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  // 2.5 — fallback
  return NextResponse.json({ error: 'Unhandled payload' }, { status: 400 });
}

//
// ——————————————————————————————————————————————————————————
//   3) HELPERS
// ——————————————————————————————————————————————————————————
//

/** Calls Lokalise API to fetch the list of target languages for that task */
async function getTaskTargetLanguages(taskId: number): Promise<string[]> {
  const api = new LokaliseApi({ apiKey: LOKALISE_API_KEY! });
  const task = await api.tasks().get(taskId, {
    project_id: LOKALISE_PROJECT_ID!,
  });
  return task.languages.map((l) => l.language_iso);
}

/** Recursively deletes & recreates the temp locales folder */
async function clearTmpDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

/** Downloads JSON files for each lang under /tmp/locales */
async function downloadFromLokalise(downloadLangs: string[]) {
  const downloader = new LokaliseDownload(
    { apiKey: LOKALISE_API_KEY!, enableCompression: true },
    { projectId: LOKALISE_PROJECT_ID! }
  );

  console.log('📥 Downloading from Lokalise…', downloadLangs);
  await downloader.downloadTranslations({
    downloadFileParams: {
      format: 'json',
      original_filenames: true,
      indentation: '2sp',
      directory_prefix: '',
      filter_data: ['translated'],
      filter_langs: downloadLangs,
      placeholder_format: 'icu',
    },
    extractParams: { outputDir: '/tmp' },
  });

  console.log('✅ Download complete. Listing /tmp:');
  await logDirRecursive('/tmp');
}

/** Recursively logs a directory tree to the console */
async function logDirRecursive(dir: string, indent = ''): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const symbol = entry.isDirectory() ? '📁' : '📄';
    console.log(`${indent}${symbol} ${entry.name}`);
    if (entry.isDirectory()) {
      await logDirRecursive(path.join(dir, entry.name), indent + '  ');
    }
  }
}

/** Walks a directory tree and returns all file paths */
async function walkDir(dir: string): Promise<string[]> {
  const results: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkDir(full)));
    } else {
      results.push(full);
    }
  }
  return results;
}

/** Uploads all files under /tmp/locales to Supabase, preserving folder structure */
async function uploadFromTmpToSupabase() {
  const files = await walkDir('/tmp/locales');

  for (const filePath of files) {
    const key = path
      .relative('/tmp', filePath)
      .replace(/\\/g, '/'); // e.g. "locales/fr/ui.json"
    const content = await fs.readFile(filePath);

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, content, {
        contentType: 'application/json',
        cacheControl: 'public, max-age=3600',
        upsert: true,
      });

    if (error) {
      console.error(`❌ Failed to upload ${key}:`, error.message);
    } else {
      console.log(`✅ Uploaded ${key}`);
    }
  }
}
