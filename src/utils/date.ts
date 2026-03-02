/**
 * Parses a date string in DD/MM/YYYY HH:mm:ss format into a Date object.
 *
 * JavaScript's `new Date()` interprets slashed dates as MM/DD/YYYY (US format),
 * which silently produces wrong results for DD/MM/YYYY strings.
 * This utility handles the project's date format correctly.
 *
 * @param dateString - A date string in "DD/MM/YYYY HH:mm:ss" format
 * @returns A valid Date object
 */
export function parseDate(dateString: string): Date {
	const [datePart, timePart] = dateString.trim().split(" ");
	const [day, month, year] = datePart.split("/").map(Number);
	const [hours, minutes, seconds] = (timePart ?? "00:00:00")
		.split(":")
		.map(Number);

	return new Date(year, month - 1, day, hours, minutes, seconds);
}
