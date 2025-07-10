import path from "node:path";
import type { TaskLanguage } from "@lokalise/node-api";
import type { FastifyInstance } from "fastify";
import type {
	CollectFileParams,
	PartialUploadFileParams,
	ProcessUploadFileParams,
} from "lokalise-file-exchange";
import {
	targetLanguages as defaultTargetLanguages,
	lokaliseProjectId,
} from "../config.js";
import { lokaliseApi, lokaliseUploader } from "../lokalise/api.js";

const baseTag = "ai-task";

export default async function rootRoutes(app: FastifyInstance) {
	app.get("/", async () => {
		return { msg: "Hello from Lokalise AI demo!" };
	});

	app.post("/lokalise-upload", async (req, reply) => {
		const tag = `${baseTag}-${new Date().toISOString().split("T")[0]}`;

		await uploadToLokalise(tag);

		const keyIds = await prepareKeyIds(tag);

		let languages = defaultTargetLanguages;

		if (
			Array.isArray(req.body) &&
			req.body.every((item) => typeof item.language_iso === "string")
		) {
			languages = req.body;
			console.log("Using languages from request:", languages);
		} else {
			console.log(
				"No valid languages in request. Falling back to default:",
				defaultTargetLanguages,
			);
		}

		await createLokaliseTask(keyIds, languages);

		return reply.status(201).send({ msg: "Translation files uploaded" });
	});
}

async function prepareKeyIds(tag: string): Promise<number[]> {
	const paginationLimit = 500;
	const allKeyIds = new Set<number>();
	let cursor: string | undefined = "";
	let hasNext = true;

	while (hasNext) {
		const keys = await lokaliseApi.keys().list({
			project_id: lokaliseProjectId,
			filter_tags: tag,
			limit: paginationLimit,
			pagination: "cursor",
			cursor,
		});

		for (const { key_id } of keys.items) {
			allKeyIds.add(key_id);
		}

		hasNext = keys.hasNextCursor();
		cursor = hasNext ? (keys.nextCursor as string) : undefined;
	}

	return Array.from(allKeyIds);
}

async function createLokaliseTask(
	keyIds: number[] | string[],
	targetLanguages: TaskLanguage[],
) {
	if (keyIds.length === 0) {
		console.warn(
			"No keys found with the specified tag. Skipping task creation.",
		);
		return;
	}

	await lokaliseApi.tasks().create(
		{
			title: "English <> French (AI)",
			description: "Use informal, casual tone",
			task_type: "automatic_translation",
			keys: keyIds,
			languages: targetLanguages,
			apply_ai_tm100_matches: true,
			save_ai_translation_to_tm: true,
		},
		{ project_id: lokaliseProjectId },
	);
}

async function uploadToLokalise(tag: string) {
	const uploadFileParams: PartialUploadFileParams = {
		replace_modified: true,
		tags: [tag],
	};

	const collectFileParams: CollectFileParams = {
		inputDirs: ["./locales/en"], // Directories to collect files from
		extensions: [".json"], // Collect JSON and XML files
		recursive: true, // Collect files in all nested folders
	};

	const processUploadFileParams: ProcessUploadFileParams = {
		pollStatuses: true, // Wait for file processing to complete on Lokalise
		languageInferer: (filePath) => {
			// Custom logic to infer language ISO from directory structure
			try {
				const parentDir = path.dirname(filePath);
				const baseName = path.basename(parentDir);
				return baseName !== "locales" ? baseName : "";
			} catch (_error) {
				return "";
			}
		},
	};

	try {
		// Upload translations to Lokalise
		const { processes, errors } = await lokaliseUploader.uploadTranslations({
			uploadFileParams,
			collectFileParams,
			processUploadFileParams,
		});

		// Log process details
		for (const process of processes) {
			console.log("Created At:", process.created_at);
			console.log("Status:", process.status);
			console.log("Details:", process.details);
			console.log("===");
		}

		// Handle and log any errors
		if (errors.length > 0) {
			console.error("Errors during upload:");
			for (const error of errors) {
				console.error(error);
			}
		}
	} catch (error) {
		// Handle unexpected errors
		console.error("Unexpected error:", error);
		throw error;
	}
}
