import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { LokaliseDownload } from "lokalise-file-exchange";

const envFile = '.env.local';

if (existsSync(envFile)) {
  loadEnvFile(envFile);
}

// Load Lokalise API token and project ID from environment variables
const apiKey = process.env.LOKALISE_API_TOKEN;
const projectId = process.env.LOKALISE_PROJECT_ID;

if (!apiKey || !projectId) {
  console.error("Missing LOKALISE_API_TOKEN or LOKALISE_PROJECT_ID in .env.local");
  process.exit(1);
}

async function main() {
  const lokaliseDownloader = new LokaliseDownload(
    {
      apiKey,
      enableCompression: true,
    },
    {
      projectId,
    },
  );

  const downloadFileParams = {
    format: "json", // Format of downloaded translations
    original_filenames: true, // Keep original filenames from Lokalise
    indentation: "2sp", // Indentation style
    placeholder_format: "icu", // Preserve original placeholder format
    directory_prefix: "", // Directory structure prefix (optional)
  };

  const extractParams = {
    outputDir: "./", // Target directory for extracted files
  };

  console.log("Starting the download...");

  await lokaliseDownloader.downloadTranslations({
    downloadFileParams,
    extractParams,
  });
  
  console.log("Download completed successfully!");
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});