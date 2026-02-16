import type { GetStaticPaths } from "astro";

// Import all translations
import { translations as en } from "../translations/en";
import { translations as es } from "../translations/es";
import { translations as fr } from "../translations/fr";
import { translations as pt } from "../translations/pt";

const translations = {
	en,
	es,
	fr,
	pt,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function getTranslations(locale: Locale) {
	return translations[locale] || translations.en;
}

export function t(locale: Locale, key: string) {
	const keys = key.split(".");
	let value: any = getTranslations(locale);

	for (const k of keys) {
		value = value?.[k];
	}

	return value || key;
}
