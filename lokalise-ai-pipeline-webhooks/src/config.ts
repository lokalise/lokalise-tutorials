import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import type { TaskLanguage } from "@lokalise/node-api";

if (existsSync(".env")) {
	loadEnvFile();
}

export const apiKey = process.env.LOKALISE_API_TOKEN as string;

export const lokaliseProjectId = process.env.LOKALISE_PROJECT_ID as string;

export const lokaliseWebhooksSecret = process.env
	.LOKALISE_WEBHOOKS_SECRET as string;

export const targetLanguages: TaskLanguage[] = [{ language_iso: "fr" }];

export const port = Number(process.env.PORT) || 3000;
