import { parseDate } from "./date";

/**
 * Calendar utility — generates links/URIs for adding events
 * to Google Calendar, Apple Calendar (.ics), and Outlook Web.
 * Also generates platform-aware map URLs (Google Maps + Apple Maps).
 */

/**
 * Format a Date to the "YYYYMMDDTHHmmss" format used by calendar URLs.
 */
function formatCalendarDate(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, "0");
	return (
		`${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
		`T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
	);
}

/**
 * Format a Date to the ISO "YYYY-MM-DDTHH:mm:ss" format used by Outlook Web.
 */
function formatOutlookDate(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, "0");
	return (
		`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
		`T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
	);
}

export interface CalendarEventInput {
	title: string;
	dateStart: string; // DD/MM/YYYY HH:mm:ss
	dateEnd: string; // DD/MM/YYYY HH:mm:ss
	location: string;
	city: string;
	country: string;
	description?: string;
	url?: string | null;
}

export interface CalendarLinks {
	google: string;
	ics: string;
	outlook: string;
}

export interface MapsUrls {
	google: string;
	apple: string;
	query: string;
}

/**
 * Build a full location string from event fields.
 */
function buildLocation(event: CalendarEventInput): string {
	return `${event.location}, ${event.city}, ${event.country}`;
}

/**
 * Build a description string including the event URL if available.
 */
function buildDescription(event: CalendarEventInput): string {
	const parts: string[] = [];

	if (event.description) {
		parts.push(event.description);
	}

	parts.push(`🎧 ${event.title}`);
	parts.push(`📍 ${buildLocation(event)}`);

	if (event.url) {
		parts.push(`🔗 ${event.url}`);
	}

	return parts.join("\n");
}

/**
 * Generate a Google Calendar "add event" URL.
 *
 * @see https://github.com/nickhudkins/gCalURL
 */
export function getGoogleCalendarUrl(event: CalendarEventInput): string {
	const start = parseDate(event.dateStart);
	const end = parseDate(event.dateEnd);

	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: event.title,
		dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
		location: buildLocation(event),
		details: buildDescription(event),
	});

	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate an Outlook Web "add event" URL.
 *
 * @see https://learn.microsoft.com/en-us/outlook/actionable-messages/
 */
export function getOutlookCalendarUrl(event: CalendarEventInput): string {
	const start = parseDate(event.dateStart);
	const end = parseDate(event.dateEnd);

	const params = new URLSearchParams({
		path: "/calendar/action/compose",
		rru: "addevent",
		subject: event.title,
		startdt: formatOutlookDate(start),
		enddt: formatOutlookDate(end),
		location: buildLocation(event),
		body: buildDescription(event),
	});

	return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

/**
 * Escape special characters for iCalendar text fields.
 * Per RFC 5545: backslash, semicolon, comma, and newlines must be escaped.
 */
function escapeIcsText(text: string): string {
	return text
		.replace(/\\/g, "\\\\")
		.replace(/;/g, "\\;")
		.replace(/,/g, "\\,")
		.replace(/\n/g, "\\n");
}

/**
 * Generate the raw content of an .ics (iCalendar) file.
 * This can be used to create a data URI or a downloadable file.
 */
export function generateIcsContent(event: CalendarEventInput): string {
	const start = parseDate(event.dateStart);
	const end = parseDate(event.dateEnd);
	const now = new Date();
	const uid = `${formatCalendarDate(start)}-${event.title.replace(/\s+/g, "-").toLowerCase()}@inmocean`;

	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//in_mOcean//Events//EN",
		"CALSCALE:GREGORIAN",
		"METHOD:PUBLISH",
		"BEGIN:VEVENT",
		`DTSTART:${formatCalendarDate(start)}`,
		`DTEND:${formatCalendarDate(end)}`,
		`DTSTAMP:${formatCalendarDate(now)}`,
		`UID:${uid}`,
		`SUMMARY:${escapeIcsText(event.title)}`,
		`DESCRIPTION:${escapeIcsText(buildDescription(event))}`,
		`LOCATION:${escapeIcsText(buildLocation(event))}`,
		...(event.url ? [`URL:${event.url}`] : []),
		"STATUS:CONFIRMED",
		"TRANSP:OPAQUE",
		"END:VEVENT",
		"END:VCALENDAR",
	];

	return lines.join("\r\n");
}

/**
 * Generate a data URI for an .ics file that can be used in an <a> tag's href.
 * This triggers a download / "Add to Calendar" on iOS, macOS, Android, etc.
 */
export function getIcsDataUri(event: CalendarEventInput): string {
	const content = generateIcsContent(event);
	const encoded = encodeURIComponent(content);
	return `data:text/calendar;charset=utf-8,${encoded}`;
}

/**
 * Build Google Maps and Apple Maps search URLs from event location fields.
 * The client component picks the right one based on the user's platform.
 */
export function getMapsUrls(event: CalendarEventInput): MapsUrls {
	const query = buildLocation(event);
	const encoded = encodeURIComponent(query);
	return {
		google: `https://www.google.com/maps/search/?api=1&query=${encoded}`,
		apple: `https://maps.apple.com/?q=${encoded}`,
		query,
	};
}

/**
 * Generate all calendar links for an event.
 */
export function getCalendarLinks(event: CalendarEventInput): CalendarLinks {
	return {
		google: getGoogleCalendarUrl(event),
		ics: getIcsDataUri(event),
		outlook: getOutlookCalendarUrl(event),
	};
}
