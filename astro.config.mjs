// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [svelte()],

	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		locales: [
			"es",
			"en",
			"fr",
			{
				path: "pt",
				codes: ["pt", "pt-br"],
			},
		],
		defaultLocale: "en",
		// routing: {
		// 	prefixDefaultLocale: true,
		// },
	},
});
