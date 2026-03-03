<script lang="ts">
	interface LocaleOption {
		code: string;
		label: string;
		flag: string;
		href: string;
	}

	interface Props {
		currentLocale: string;
		localeOptions: LocaleOption[];
	}

	const { currentLocale, localeOptions }: Props = $props();

	let isOpen = $state(false);
	let dropdownEl: HTMLDivElement | undefined = $state();

	const currentOption = $derived(
		localeOptions.find((l) => l.code === currentLocale) ?? localeOptions[0],
	);

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleSelect(locale: string) {
		try {
			localStorage.setItem("locale", locale);
		} catch {
			// localStorage unavailable — ignore
		}
		close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			close();
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
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

<div bind:this={dropdownEl} class="relative">
	<button
		type="button"
		class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-text-secondary hover:text-brand-orange-400 focus:text-brand-orange-400 focus:outline-none focus:ring-2 focus:ring-brand-orange-400/50 transition-colors bg-white/5 hover:bg-white/10"
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label="Select language"
		onclick={toggle}
	>
		<span class="text-base leading-none" aria-hidden="true"
			>{currentOption.flag}</span
		>
		<span class="uppercase font-medium tracking-wide"
			>{currentOption.code}</span
		>
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
			class="absolute right-0 top-full mt-2 min-w-40 rounded-lg border border-border-muted bg-surface-card-solid/95 backdrop-blur-lg shadow-xl shadow-black/30 overflow-hidden z-50"
			role="listbox"
			aria-label="Available languages"
		>
			{#each localeOptions as option (option.code)}
				<a
					href={option.href}
					role="option"
					aria-selected={option.code === currentLocale}
					class="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors {option.code ===
					currentLocale
						? 'text-brand-orange-400 bg-white/10'
						: 'text-text-secondary hover:text-brand-orange-400 hover:bg-white/5'}"
					onclick={() => handleSelect(option.code)}
				>
					<span class="text-base leading-none" aria-hidden="true"
						>{option.flag}</span
					>
					<span class="flex-1">{option.label}</span>
					{#if option.code === currentLocale}
						<svg
							class="w-4 h-4 text-brand-orange-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>
