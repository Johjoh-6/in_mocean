// ============================================
// IN_MOCEAN - MAIN DATA CONFIGURATION
// ============================================
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
