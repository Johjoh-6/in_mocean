import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// SCHEMA FOR content
//

const stats = defineCollection({
	loader: file("src/content/stats.json"),
	schema: z.object({
		id: z.string().min(1),
		iconName: z.string().min(1, "iconName is required"),
		value: z.string().min(1, "value is required"),
		label: z.string().min(1, "label is required"),
	}),
});

const tracks = defineCollection({
	loader: file("src/content/tracks.json"),
	schema: z.object({
		id: z.string().min(1),
		title: z.string().min(1, "title is required"),
		url: z.string().url("url must be a valid URL"),
	}),
});

const events = defineCollection({
	loader: file("src/content/events.json"),
	schema: z.object({
		id: z.string().min(1),
		date: z.string().min(1, "date is required"),
		title: z.string().min(1, "title is required"),
		location: z.string().min(1, "location is required"),
		url: z.string().url("url must be a valid URL"),
		image: z.string().url("image must be a valid URL"),
		color: z.string().min(1, "color is required"),
	}),
});

const instagram = defineCollection({
	loader: file("src/content/instagram.json"),
	schema: z.object({
		id: z.string().min(1),
		image: z.string().url("image must be a valid URL"),
		alt: z.string().min(1, "alt is required"),
		caption: z.string().optional(),
		href: z.string().url("href must be a valid URL").optional(),
		date: z.string().optional(),
	}),
});

export const collections = {
	stats,
	tracks,
	events,
	instagram,
};
