// ============================================
// IN_MOCEAN - MAIN DATA CONFIGURATION
// ============================================

// Stats
export const stats = [
	{ iconName: "music-2", value: "500+", label: "about.stats.shows" },
	{ iconName: "headphone", value: "10k+", label: "about.stats.followers" },
	{ iconName: "radio", value: "50+", label: "about.stats.cities" },
	{ iconName: "waves", value: "1M+", label: "about.stats.plays" },
];

export function getSocialLinkByName(name: string) {
	return socialLinks.find(
		(link) =>
			link.label.toLowerCase() === name.toLowerCase() ||
			link.iconName === name,
	);
}
// Social Media Links (using icon names instead of components)
export const socialLinks = [
	{
		iconName: "instagram",
		label: "Instagram",
		handle: "@in_m’Ocean",
		href: "https://instagram.com/in_m’Ocean",
		color: "from-purple-500 to-pink-500",
	},
	{
		iconName: "soundcloud",
		label: "SoundCloud",
		handle: "soundcloud.com/in_m’Ocean",
		href: "https://soundcloud.com/in_mocean",
		color: "from-orange-500 to-orange-600",
	},
	{
		iconName: "youtube",
		label: "YouTube",
		handle: "@in_m’Ocean",
		href: "https://youtube.com/@in_m’Ocean",
		color: "from-red-500 to-red-600",
	},
	{
		iconName: "mail",
		label: "Email",
		handle: "contato@in_m’Ocean.com",
		href: "mailto:contato@in_m’Ocean.com",
		color: "from-blue-500 to-blue-600",
	},
];

// Music Tracks
export const musicTracks = [
	{
		title: "Power Summer Bass",
		url: "https://soundcloud.com/in_mocean/powersummerbass",
	},
	{
		title: "Shimmer Session",
		url: "https://soundcloud.com/in_mocean/shimmer-session",
	},
	{
		title: "Mystic Sunset",
		url: "https://soundcloud.com/in_mocean/mystic-sunset",
	},
];

// Events
export const events = [
	{
		date: "03/15/2026 17:00:00",
		title: "in_m’Ocean Beach Festival",
		location: "Praia Mole, Florianópolis",
		image: "https://images.unsplash.com/photo-1610816931633-564daed99c91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHBhcnR5JTIwc3Vuc2V0fGVufDF8fHx8MTc2OTk0OTQ4MXww&ixlib=rb-4.1.0&q=80&w=1080",
		color: "from-orange-500 to-pink-500",
	},
	{
		date: "03/22/2026 20:00:00",
		title: "Ocean Vibes Night",
		location: "Blue Beach Club, São Paulo",
		image: "https://images.unsplash.com/photo-1658058777605-085da119d699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBvY2VhbiUyMERKfGVufDF8fHx8MTc3MDA0MDczOHww&ixlib=rb-4.1.0&q=80&w=1080",
		color: "from-blue-500 to-purple-500",
	},
	{
		date: "05/04/2026 17:30:00",
		title: "Golden Hour Sessions",
		location: "Jurerê Beach, Florianópolis",
		image: "https://images.unsplash.com/photo-1720301024349-89a536d8f540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzcwMDQwNzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
		color: "from-yellow-500 to-orange-500",
	},
];
