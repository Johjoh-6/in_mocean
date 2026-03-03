import type { Locale } from "../translations";

/**
 * i18n utility — single source of truth for locale configuration,
 * labels, flag emojis, and URL helpers.
 */

export interface LocaleConfig {
	code: Locale;
	label: string;
	flag: string;
}

/** All supported locales in display order */
export const locales: LocaleConfig[] = [
	{ code: "en", label: "English", flag: "🇬🇧" },
	{ code: "es", label: "Español", flag: "🇪🇸" },
	{ code: "fr", label: "Français", flag: "🇫🇷" },
	{ code: "pt", label: "Português", flag: "🇧🇷" },
];

/** The default locale (no URL prefix) */
export const defaultLocale: Locale = "en";

/** Just the locale codes as a string array (useful for redirect scripts, etc.) */
export const supportedCodes: Locale[] = locales.map((l) => l.code);

/** Non-default locale codes (the ones that get a URL prefix) */
export const prefixedCodes: Locale[] = supportedCodes.filter(
	(c) => c !== defaultLocale,
);

/**
 * Get the LocaleConfig for a given locale code.
 * Falls back to the default locale if not found.
 */
export function getLocaleConfig(code: Locale): LocaleConfig {
	return locales.find((l) => l.code === code) ?? locales[0];
}

/**
 * Build the base path prefix for a given locale.
 * Default locale returns "" (no prefix), others return "/es", "/fr", etc.
 */
export function getBasePath(locale: Locale): string {
	return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Convert a path from one locale to another.
 * e.g. localizePathname("/es/events", "fr") → "/fr/events"
 *      localizePathname("/events", "es")    → "/es/events"
 *      localizePathname("/fr/events", "en") → "/events"
 */
export function localizePathname(
	currentPathname: string,
	targetLocale: Locale,
): string {
	// Strip trailing slash for consistency, but keep "/" as "/"
	const cleaned = currentPathname.replace(/\/$/, "") || "/";

	// Remove existing locale prefix if present
	let stripped = cleaned;
	for (const code of prefixedCodes) {
		const prefix = `/${code}`;
		if (stripped === prefix) {
			stripped = "/";
			break;
		}
		if (stripped.startsWith(`${prefix}/`)) {
			stripped = stripped.slice(prefix.length);
			break;
		}
	}

	// Build new path with target locale prefix
	const basePath = getBasePath(targetLocale);
	if (stripped === "/") {
		return basePath ? `${basePath}/` : "/";
	}
	return `${basePath}${stripped}`;
}

/**
 * Detect the locale from a pathname.
 * e.g. "/es/events" → "es", "/events" → "en", "/fr" → "fr"
 */
export function getLocaleFromPathname(pathname: string): Locale {
	const cleaned = pathname.replace(/\/$/, "") || "/";
	for (const code of prefixedCodes) {
		if (cleaned === `/${code}` || cleaned.startsWith(`/${code}/`)) {
			return code;
		}
	}
	return defaultLocale;
}
