import { defineCollection, z } from "astro:content";

// 
// SCHEMA FOR content
// 

const stats = defineCollection({
	type: "data",
	schema: z.object({
		iconName: z.string().min(1, "iconName is required"),
		value: z.string().min(1, "value is required"),
		label: z.string().min(1, "label is required"),
	}),
});

const tracks = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string().min(1, "title is required"),
		url: z.string().url("url must be a valid URL"),
	}),
});

const events = defineCollection({
	type: "data",
	schema: z.object({
		date: z.string().min(1, "date is required"),
		title: z.string().min(1, "title is required"),
		location: z.string().min(1, "location is required"),
		image: z.string().url("image must be a valid URL"),
		color: z.string().min(1, "color is required"),
	}),
});

const instagram = defineCollection({
	type: "data",
	schema: z.object({
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
