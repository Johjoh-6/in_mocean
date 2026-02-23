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
			class="relative flex items-center gap-4 p-6 rounded-lg border border-slate-700/50 bg-slate-800/80 hover:border-orange-500/50 transition-all duration-300"
			style={`min-height: ${iframeHeight}px;`}
		>
			{#if thumbnailUrl}
				<div class="shrink-0 w-20 h-20 rounded-md overflow-hidden">
					<img
						src={thumbnailUrl}
						alt={title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}

			<div class="flex-1 flex items-center gap-4 min-w-0">
				<div class="flex-1 min-w-0">
					<p class="text-white font-medium truncate">{title}</p>
					<p class="text-gray-400 text-sm mt-1">
						{textPlay ?? "Click to load player"}
					</p>
				</div>

				<div
					class="shrink-0 w-14 h-14 rounded-full bg-orange-500 group-hover:bg-orange-400 flex items-center justify-center transition-all duration-300 shadow-lg shadow-orange-500/30 group-hover:scale-110"
				>
					<svg
						class="w-6 h-6 text-white"
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
