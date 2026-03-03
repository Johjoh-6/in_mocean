/**
 * Detect if the user is on an Apple platform (iOS, iPadOS, macOS).
 * On Apple devices we open Apple Maps; everywhere else we open Google Maps.
 */
export default function isApplePlatform(): boolean {
	if (typeof navigator === "undefined") return false;

	const ua = navigator.userAgent || "";
	// Check for iOS / iPadOS / macOS
	if (/iPhone|iPad|iPod|Macintosh/i.test(ua)) {
		// iPadOS reports as Macintosh but has touch support
		if (/Macintosh/i.test(ua) && !navigator.maxTouchPoints) {
			// Actual macOS desktop — still use Apple Maps
			return true;
		}
		return true;
	}
	// navigator.platform fallback for older browsers
	if (
		typeof navigator.platform === "string" &&
		/Mac|iPhone|iPad|iPod/i.test(navigator.platform)
	) {
		return true;
	}
	return false;
}
