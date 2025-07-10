import { LokaliseApi } from "@lokalise/node-api";
import { LokaliseDownload, LokaliseUpload } from "lokalise-file-exchange";
import { apiKey, lokaliseProjectId } from "../config.js";

export const lokaliseUploader = new LokaliseUpload(
	{
		apiKey,
		enableCompression: true,
	},
	{
		projectId: lokaliseProjectId,
	},
);

export const lokaliseDownloader = new LokaliseDownload(
	{
		apiKey,
		enableCompression: true,
	},
	{
		projectId: lokaliseProjectId,
	},
);

export const lokaliseApi = new LokaliseApi({ apiKey });
