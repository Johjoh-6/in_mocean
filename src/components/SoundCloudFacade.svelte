<script lang="ts">
	interface SoundCloudFacade {
		textPlay: string;
		iframeSrc: string;
		iframeHeight?: number;
		title?: string;
		thumbnailUrl?: string;
	}

	const {
		textPlay,
		iframeSrc,
		iframeHeight = 166,
		title = "SoundCloud Track",
		thumbnailUrl = "",
	}: SoundCloudFacade = $props();

	let loaded = $state(false);

	// Detect generic SoundCloud placeholder or empty/broken thumbnail URLs
	const isValidThumbnail = $derived(
		thumbnailUrl &&
			!thumbnailUrl.includes("fb_placeholder") &&
			!thumbnailUrl.includes("default_avatar") &&
			!thumbnailUrl.endsWith("placeholder.png"),
	);

	const loadPlayer = () => {
		loaded = true;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			loadPlayer();
		}
	};
</script>

{#if loaded}
	<iframe
		src={iframeSrc}
		width="100%"
		height={iframeHeight}
		frameborder="0"
		allow="autoplay"
		loading="lazy"
		title={`SoundCloud player: ${title}`}
		style="border-radius: 8px;"
	></iframe>
{:else}
	<div
		class="group relative cursor-pointer rounded-lg overflow-hidden"
		role="button"
		tabindex="0"
		aria-label={`Play ${title}`}
		onclick={loadPlayer}
		onkeydown={handleKeydown}
	>
		<div
			class="relative flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg border border-border-muted bg-surface-card-solid/80 hover:border-brand-orange-500/50 transition-all duration-300"
			style={`min-height: ${iframeHeight}px;`}
		>
			<!-- Thumbnail or music icon fallback -->
			<div
				class="shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden"
			>
				{#if isValidThumbnail}
					<img
						src={thumbnailUrl}
						alt={title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				{:else}
					<!-- Music icon fallback when no valid thumbnail -->
					<div
						class="w-full h-full flex items-center justify-center bg-brand-orange-500/10 border border-brand-orange-500/20 rounded-md"
					>
						<svg
							class="w-7 h-7 sm:w-9 sm:h-9 text-brand-orange-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							/>
						</svg>
					</div>
				{/if}
			</div>

			<div class="flex-1 flex items-center gap-3 sm:gap-4 min-w-0">
				<div class="flex-1 min-w-0">
					<p
						class="text-text-primary font-medium truncate text-sm sm:text-base"
					>
						{title}
					</p>
					<p class="text-text-muted text-xs sm:text-sm mt-1">
						{textPlay ?? "Click to load player"}
					</p>
				</div>

				<div
					class="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-orange-500 group-hover:bg-brand-orange-400 flex items-center justify-center transition-all duration-300 shadow-lg shadow-brand-orange-500/30 group-hover:scale-110"
				>
					<svg
						class="w-5 h-5 sm:w-6 sm:h-6 text-text-primary"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path d="M8 5v14l11-7z" />
					</svg>
				</div>
			</div>
		</div>
	</div>
{/if}
