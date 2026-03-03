<script lang="ts">
	import isApplePlatform from "../utils/isApplePlatform";

	interface CalendarLinks {
		google: string;
		ics: string;
		outlook: string;
	}

	interface Props {
		links: CalendarLinks;
		labelAdd: string;
		labelGoogle: string;
		labelApple: string;
		labelOutlook: string;
	}

	const { links, labelAdd, labelGoogle, labelApple, labelOutlook }: Props =
		$props();

	const apple = $derived(isApplePlatform());

	let isOpen = $state(false);
	let dropdownEl: HTMLDivElement | undefined = $state();

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
			close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			close();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener("click", handleClickOutside, true);
			document.addEventListener("keydown", handleKeydown);
		}
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
			document.removeEventListener("keydown", handleKeydown);
		};
	});
</script>

{#if apple}
	<!-- Apple platform: single direct .ics download link (opens native Calendar app) -->
	<a
		href={links.ics}
		download="event.ics"
		class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border-muted bg-surface-card-solid/80 text-text-secondary hover:text-brand-orange-400 hover:border-brand-orange-500/50 focus:outline-none focus:ring-2 focus:ring-brand-orange-400/50 transition-all duration-200"
		aria-label={labelAdd}
	>
		<!-- CalendarPlus icon -->
		<svg
			class="w-4 h-4"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			stroke-width="2"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm4 12h2m0 0h2m-2 0v-2m0 2v2"
			/>
		</svg>
		<span class="hidden sm:inline">{labelAdd}</span>
	</a>
{:else}
	<!-- Non-Apple: dropdown with Google Calendar & Outlook -->
	<div bind:this={dropdownEl} class="relative inline-block">
		<button
			type="button"
			class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border-muted bg-surface-card-solid/80 text-text-secondary hover:text-brand-orange-400 hover:border-brand-orange-500/50 focus:outline-none focus:ring-2 focus:ring-brand-orange-400/50 transition-all duration-200"
			aria-expanded={isOpen}
			aria-haspopup="menu"
			aria-label={labelAdd}
			onclick={toggle}
		>
			<!-- CalendarPlus icon -->
			<svg
				class="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm4 12h2m0 0h2m-2 0v-2m0 2v2"
				/>
			</svg>
			<span class="hidden sm:inline">{labelAdd}</span>
			<svg
				class="w-3.5 h-3.5 transition-transform duration-200 {isOpen
					? 'rotate-180'
					: ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</button>

		{#if isOpen}
			<div
				class="absolute left-0 bottom-full mb-2 min-w-48 rounded-lg border border-border-muted bg-surface-card-solid/95 backdrop-blur-lg shadow-xl shadow-black/30 overflow-hidden z-50"
				role="menu"
				aria-label={labelAdd}
			>
				<!-- Google Calendar -->
				<a
					href={links.google}
					target="_blank"
					rel="noopener noreferrer"
					role="menuitem"
					class="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-brand-orange-400 hover:bg-white/5 transition-colors"
					onclick={close}
				>
					<svg
						class="w-5 h-5 shrink-0"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24v-5.684h12.632V24H5.684zM18.316 5.684V0H5.684v5.684h12.632zM5.684 18.316H0V5.684h5.684v12.632zM7.5 14.25V9.75h1.25v4.5H7.5zm2.5 0V9.75h1.25v1.625H13v1.25h-1.75V14.25H10zm4 0V9.75h1.25v4.5H14z"
						/>
					</svg>
					<span>{labelGoogle}</span>
				</a>

				<!-- Outlook -->
				<a
					href={links.outlook}
					target="_blank"
					rel="noopener noreferrer"
					role="menuitem"
					class="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-brand-orange-400 hover:bg-white/5 transition-colors"
					onclick={close}
				>
					<svg
						class="w-5 h-5 shrink-0"
						fill="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							d="M24 7.387v10.478c0 .23-.08.424-.238.576a.806.806 0 01-.587.234h-8.55v-12.7h8.55c.228 0 .422.08.586.235.159.156.239.35.239.576v.601zM13.7 20.475L0 18.135V5.865l13.7-2.34v16.95zm-3.233-6.463c.53-.014.992-.166 1.384-.457.393-.29.682-.68.867-1.168.185-.487.278-1.033.278-1.638 0-.584-.1-1.114-.302-1.59a2.602 2.602 0 00-.89-1.135c-.394-.292-.87-.44-1.43-.444-.54.007-.998.161-1.378.463a2.673 2.673 0 00-.845 1.16c-.185.484-.275 1.017-.273 1.598.005.573.104 1.1.296 1.578.193.48.48.86.862 1.14.381.281.848.425 1.4.433l.03.06zm.086-1.26c-.354-.007-.628-.213-.823-.62-.195-.405-.292-.943-.29-1.613-.003-.639.088-1.163.273-1.571.185-.408.456-.618.812-.63.374.014.66.224.858.632.198.407.299.941.304 1.6 0 .664-.098 1.193-.293 1.589-.196.395-.474.597-.84.612z"
						/>
					</svg>
					<span>{labelOutlook}</span>
				</a>
			</div>
		{/if}
	</div>
{/if}
