import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm"],
	dts: false,
	splitting: false,
	sourcemap: true,
	clean: true,
	minify: true,
});
