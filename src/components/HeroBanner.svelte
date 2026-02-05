<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";

	import HeroBannerImage from "../assets/unplash-hero.jpeg";

	let heroContainer: HTMLElement;
	let backgroundImage: HTMLElement;
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let overlay: HTMLElement;
	let ctx: gsap.Context;

	onMount(() => {
		console.log("HeroBanner mounted with client:load!");

		gsap.registerPlugin(ScrollTrigger);

		ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: heroContainer,
					start: "top top",
					end: "bottom top",
					scrub: 1.5,
					pin: true,
					// markers: true, // for debugging
					// onUpdate: (self) => console.log("Progress:", self.progress), // for debugging
					onLeave: () => {
						// This fires when we scroll past the trigger area
						// console.info("ScrollTrigger left - showing header");
						const header = document.getElementById("header");
						if (header) {
							gsap.to(header, {
								opacity: 1,
								duration: 0.8,
								ease: "power2.out",
							});
						}
					},
					onEnterBack: () => {
						// This fires when we scroll back into the trigger area
						// console.info(
						// 	"ScrollTrigger entered back - hiding header",
						// );
						const header = document.getElementById("header");
						if (header) {
							gsap.to(header, {
								opacity: 0,
								duration: 0.4,
								ease: "power2.out",
							});
						}
					},
				},
				// onComplete: () => {
				// 	console.info("Timeline animation completed");
				// },// for debugging
			});

			// Image zoom and rotate
			tl.to(
				backgroundImage,
				{
					scale: 1.3,
					rotation: 3,
					transformOrigin: "center center",
					ease: "power2.inOut",
				},
				0,
			)

				// Overlay intensify
				.to(
					overlay,
					{
						opacity: 0.9,
						ease: "power2.out",
					},
					0,
				)

				// Title disappear
				.to(
					heroTitle,
					{
						y: -window.innerHeight * 0.4,
						scale: 0.2,
						opacity: 0,
						rotationX: 30,
						transformPerspective: 1000,
						ease: "power3.out",
					},
					0,
				)

				// Subtitle fade
				.to(
					heroSubtitle,
					{
						opacity: 0,
						y: -30,
						scale: 0.9,
						ease: "power2.out",
					},
					0.1,
				);
		}, heroContainer);

		// Refresh ScrollTrigger after mount
		ScrollTrigger.refresh();
	});
	onDestroy(() => {
		if (ctx) {
			ctx.revert(); // cleanup up GSAP context
		}
	});
</script>

<section bind:this={heroContainer} class="relative h-screen">
	<div class="sticky top-0 h-screen overflow-hidden">
		<div
			bind:this={backgroundImage}
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image: url({HeroBannerImage.src})"
		></div>

		<div
			bind:this={overlay}
			class="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60 opacity-40"
		></div>

		<div
			class="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
		>
			<h1
				bind:this={heroTitle}
				class="text-7xl md:text-9xl font-black mb-6 text-center"
			>
				DJ SUNSET
			</h1>
			<p
				bind:this={heroSubtitle}
				class="text-2xl md:text-3xl text-center text-white/80 max-w-2xl px-4"
			>
				Where Ocean Meets Sound
			</p>
		</div>
	</div>
</section>
