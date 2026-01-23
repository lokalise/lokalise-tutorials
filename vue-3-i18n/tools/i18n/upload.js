import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { LokaliseUpload } from "lokalise-file-exchange";

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
	// Initialize LokaliseUpload client
	const lokaliseUploader = new LokaliseUpload(
		{
			apiKey,
			enableCompression: true,
		},
		{
			projectId,
		},
	);

	const uploadFileParams = {
		replace_modified: true, // Replace modified files on Lokalise
	};

	const localesPath = path.resolve("src/i18n/locales");
	const collectFileParams = {
		inputDirs: [localesPath], // Absolute path to the "locales" directory
		extensions: [".json"], // Collect only JSON files
		recursive: false, // Only collect files in the root directory
	};

	const processUploadFileParams = {
		pollStatuses: true, // Wait for file processing to complete on Lokalise
	};

	try {
		const { processes, errors } = await lokaliseUploader.uploadTranslations({
			uploadFileParams,
			collectFileParams,
			processUploadFileParams,
		});

		for (const process of processes) {
			console.log("Created At:", process.created_at);
			console.log("Status:", process.status);
			console.log("Details:", process.details);
			console.log("===");
		}

		if (errors.length > 0) {
			console.error("Errors during upload:");
			for (const error of errors) {
				console.error(error);
			}
		}
	} catch (error) {
		console.error("Unexpected error:", error);
	}
}

main().catch((err) => {
	console.error("Unhandled error:", err);
  process.exit(1);
});