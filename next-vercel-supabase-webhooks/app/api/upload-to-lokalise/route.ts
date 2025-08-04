// app/api/upload-to-lokalise/route.ts
import { NextResponse } from 'next/server';
import { LokaliseUpload } from 'lokalise-file-exchange';
import path from 'node:path';
import type {
  CollectFileParams,
  PartialUploadFileParams,
  ProcessUploadFileParams,
} from 'lokalise-file-exchange';

export async function POST() {
  const apiKey = process.env.LOKALISE_API_KEY!;
  const projectId = process.env.LOKALISE_PROJECT_ID!;
  const baseTag = 'api';

  // 1) instantiate
  const uploader = new LokaliseUpload(
    { apiKey, enableCompression: true },
    { projectId }
  );

  // 2) tag by date
  const tag = `${baseTag}-${new Date().toISOString().slice(0, 10)}`;

  // 3) params
  const uploadFileParams: PartialUploadFileParams = {
    replace_modified: true,
    tags: [tag],
  };
  const collectFileParams: CollectFileParams = {
    // ABSOLUTE path into your bundle
    inputDirs: [path.resolve(process.cwd(), 'app', 'locales', 'en')],
    extensions: ['.json'],
    recursive: true,
  };
  const processUploadFileParams: ProcessUploadFileParams = {
    pollStatuses: true,
    // extract “en” from /.../locales/en/ui.json
    languageInferer: (filePath) => path.basename(path.dirname(filePath)),
    // strip off everything up to “app/locales/” and use forward‐slashes
    filenameInferer: (filePath) => {
      // 1) get “app/locales/en/ui.json”
      const rel = path.relative(process.cwd(), filePath);
      // 2) strip just “app/”
      const withoutApp = rel.replace(/^app[\\/]/, '');
      // 3) normalize Windows backslashes → forward slashes
      return withoutApp.replace(/\\/g, '/');
      // result: "locales/en/ui.json"
    },
  };

  // 4) run
  const { processes, errors } = await uploader.uploadTranslations({
    uploadFileParams,
    collectFileParams,
    processUploadFileParams,
  });

  return NextResponse.json({ tag, processes, errors });
}
