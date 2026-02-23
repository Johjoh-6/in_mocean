<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	interface NavLink {
		href: string;
		label: string;
	}

	interface Props {
		links: NavLink[];
	}

	const { links }: Props = $props();

	let isOpen = $state(false);
	let toggleButton: HTMLElement;
	let backdropEl: HTMLElement;
	let panelEl: HTMLElement;
	let movedToBody = false;

	function open() {
		isOpen = true;
		document.body.style.overflow = "hidden";

		setTimeout(() => {
			const firstLink = panelEl?.querySelector<HTMLElement>("a");
			firstLink?.focus();
		}, 100);
	}

	function close() {
		isOpen = false;
		document.body.style.overflow = "";
		toggleButton?.focus();
	}

	function toggle() {
		isOpen ? close() : open();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && isOpen) {
			close();
		}
	}

	function handlePanelKeydown(e: KeyboardEvent) {
		if (e.key !== "Tab" || !panelEl) return;

		const focusable = panelEl.querySelectorAll<HTMLElement>(
			'a[href], button, [tabindex]:not([tabindex="-1"])',
		);
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			toggleButton?.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			toggleButton?.focus();
		}
	}

	function handleToggleKeydown(e: KeyboardEvent) {
		if (!isOpen || e.key !== "Tab") return;

		if (e.shiftKey) {
			e.preventDefault();
			const focusable = panelEl?.querySelectorAll<HTMLElement>(
				'a[href], button, [tabindex]:not([tabindex="-1"])',
			);
			if (focusable && focusable.length > 0) {
				focusable[focusable.length - 1].focus();
			}
		} else {
			e.preventDefault();
			const firstFocusable =
				panelEl?.querySelector<HTMLElement>("a[href], button");
			firstFocusable?.focus();
		}
	}

	onMount(() => {
		document.addEventListener("keydown", handleKeydown);

		// Teleport backdrop and panel to document.body
		// so they escape the header's stacking context (backdrop-blur creates one)
		if (backdropEl && panelEl) {
			document.body.appendChild(backdropEl);
			document.body.appendChild(panelEl);
			movedToBody = true;
		}
	});

	onDestroy(() => {
		document.removeEventListener("keydown", handleKeydown);
		document.body.style.overflow = "";

		// Clean up teleported elements
		if (movedToBody) {
			backdropEl?.remove();
			panelEl?.remove();
		}
	});
</script>

<!-- Hamburger toggle button (stays in header) -->
<button
	bind:this={toggleButton}
	type="button"
	class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-colors"
	aria-expanded={isOpen}
	aria-controls="mobile-menu"
	aria-label={isOpen ? "Close menu" : "Open menu"}
	onclick={toggle}
	onkeydown={handleToggleKeydown}
>
	<span class="flex flex-col gap-1.5" aria-hidden="true">
		<span
			class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center {isOpen
				? 'rotate-45 translate-y-[4px]'
				: ''}"
		></span>
		<span
			class="block w-6 h-0.5 bg-current transition-all duration-300 {isOpen
				? 'opacity-0 scale-x-0'
				: ''}"
		></span>
		<span
			class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center {isOpen
				? '-rotate-45 -translate-y-[4px]'
				: ''}"
		></span>
	</span>
</button>

<!-- Backdrop (teleported to body) -->
<div
	bind:this={backdropEl}
	class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] md:hidden transition-opacity duration-300 {isOpen
		? 'opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
	aria-hidden="true"
	onclick={close}
	role="presentation"
></div>

<!-- Mobile menu panel (teleported to body) -->
<div
	bind:this={panelEl}
	id="mobile-menu"
	class="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-slate-950/95 backdrop-blur-lg z-[999] transform transition-transform duration-300 ease-in-out md:hidden {isOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
	role="dialog"
	tabindex="-1"
	aria-modal="true"
	aria-label="Mobile navigation"
	inert={!isOpen ? true : undefined}
	onkeydown={handlePanelKeydown}
>
	<!-- Close button inside panel -->
	<div class="flex justify-end p-4">
		<button
			type="button"
			class="w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-colors"
			aria-label="Close menu"
			onclick={close}
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="2"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>

	<div class="flex flex-col h-full pb-8 px-6">
		<nav class="flex flex-col gap-2" aria-label="Mobile navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-lg text-gray-300 hover:text-orange-400 focus:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
					onclick={close}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</div>
