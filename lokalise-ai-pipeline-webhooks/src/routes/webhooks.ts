import type {
	DownloadFileParams,
	WebhookProjectTaskClosed,
} from "@lokalise/node-api";
import type { FastifyInstance } from "fastify";
import type { ExtractParams } from "lokalise-file-exchange";
import { lokaliseProjectId, lokaliseWebhooksSecret } from "../config.js";
import { lokaliseApi, lokaliseDownloader } from "../lokalise/api.js";

export default async function webhooksRoutes(app: FastifyInstance) {
	app.post("/notifications", async (req, reply) => {
		const payload = req.body;
		const headers = req.headers;

		console.log(payload);
		console.log(headers);

		if (headers["x-secret"] !== lokaliseWebhooksSecret) {
			return reply.status(403).send({ error: "Forbidden" });
		}

		if (Array.isArray(payload)) {
			if (payload[0] === "ping") {
				return reply.status(200).send({ status: "success" });
			}
			return reply.status(400).send({ error: "Invalid ping payload" });
		}

		if (typeof payload === "object" && payload !== null) {
			const webhookPayload = payload as WebhookProjectTaskClosed;

			if (
				webhookPayload.event === "project.task.closed" &&
				webhookPayload.project.id === lokaliseProjectId
			) {
				console.log(
					`Task ${webhookPayload.task.title} (ID ${webhookPayload.task.id}) has been closed in project ${webhookPayload.project.name}`,
				);

				const downloadLangs = await getTaskTargetLanguages(
					webhookPayload.task.id,
				);

				await downloadFromLokalise(downloadLangs);

				return reply.send({ status: "task processed" });
			}
		}

		return reply.status(400).send({ error: "Invalid payload" });
	});
}

async function getTaskTargetLanguages(taskId: number): Promise<string[]> {
	const task = await lokaliseApi
		.tasks()
		.get(taskId, { project_id: lokaliseProjectId });

	return task.languages.map((lang) => lang.language_iso);
}

async function downloadFromLokalise(downloadLangs: string[]) {
	const downloadFileParams: DownloadFileParams = {
		format: "json", // Format of downloaded translations
		original_filenames: true, // Keep original filenames from Lokalise
		indentation: "2sp", // Indentation style
		directory_prefix: "", // Directory structure prefix (optional)
		filter_data: ["translated"],
		filter_langs: downloadLangs,
		// filter_langs: targetLanguages.map((lang) => lang.language_iso),
	};

	const extractParams: ExtractParams = {
		outputDir: "./", // Target directory for extracted files
	};

	try {
		// Download and extract translations
		console.log("Starting the download...");
		console.log(`Language IDs: ${downloadLangs}`);

		await lokaliseDownloader.downloadTranslations({
			downloadFileParams,
			extractParams,
		});
		console.log("Download completed successfully!");
	} catch (error) {
		// Handle any errors
		console.error("An error occurred during the download:", error);
		throw error;
	}
}
