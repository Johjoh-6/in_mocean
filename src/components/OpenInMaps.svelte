<script lang="ts">
	import isApplePlatform from "../utils/isApplePlatform";

	interface MapsUrls {
		google: string;
		apple: string;
		query: string;
	}

	interface Props {
		mapsUrls: MapsUrls;
		label: string;
		locationText: string;
	}

	const { mapsUrls, label, locationText }: Props = $props();

	function openMaps(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		const url = isApplePlatform() ? mapsUrls.apple : mapsUrls.google;
		window.open(url, "_blank", "noopener,noreferrer");
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			const url = isApplePlatform() ? mapsUrls.apple : mapsUrls.google;
			window.open(url, "_blank", "noopener,noreferrer");
		}
	}
</script>

<button
	type="button"
	class="inline-flex items-center gap-2 text-text-muted text-sm transition-colors rounded-md -ml-1 px-1 py-0.5 hover:text-brand-pink-400 focus:text-brand-pink-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-400/50 cursor-pointer"
	aria-label="{locationText} — {label}"
	onclick={openMaps}
	onkeydown={handleKeydown}
>
	<!-- MapPin icon -->
	<svg
		class="w-4 h-4 shrink-0"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		stroke-width="2"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
		/>
	</svg>
	<span class="underline decoration-dotted underline-offset-2">
		{locationText}
	</span>
	<!-- Navigation icon — shows on hover -->
	<svg
		class="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		stroke-width="2"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 11l19-9-9 19-2-8-8-2z"
		/>
	</svg>
</button>
