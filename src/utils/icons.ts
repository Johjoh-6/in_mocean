import {
	Music2,
	Radio,
	Waves,
	Headphones,
	Mail,
	ExternalLink,
	MessageCircle,
	Heart,
	Play,
	Eye,
	MapPin,
	Clock,
	ArrowRight,
	type AstroComponent,
} from "@lucide/astro";

import InstagramIcon from "../icons/InstagramIcon.astro";
import YouTubeIcon from "../icons/YouTubeIcon.astro";

// Map icon names to actual icon components
export const iconMap: Record<string, AstroComponent> = {
	instagram: InstagramIcon,
	"music-2": Music2,
	youtube: YouTubeIcon,
	mail: Mail,
	"external-link": ExternalLink,
	headphones: Headphones,
	radio: Radio,
	waves: Waves,
	heart: Heart,
	"message-circle": MessageCircle,
	play: Play,
	eye: Eye,
	mapPin: MapPin,
	clock: Clock,
	"arrow-right": ArrowRight,
};

export function getIcon(iconName: string): AstroComponent {
	return iconMap[iconName] || ExternalLink;
}
