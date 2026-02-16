import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// SCHEMAS
//

const statsSchema = z.object({
	id: z.string().min(1),
	iconName: z.string().min(1, "iconName is required"),
	value: z.string().min(1, "value is required"),
	label: z.string().min(1, "label is required"),
});

const tracksSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, "title is required"),
	url: z.string().url("url must be a valid URL"),
});

const eventsSchema = z.object({
	id: z.string().min(1),
	date: z.string().min(1, "date is required"),
	title: z.string().min(1, "title is required"),
	location: z.string().min(1, "location is required"),
	url: z.string().url("url must be a valid URL"),
	image: z.string().url("image must be a valid URL"),
	color: z.string().min(1, "color is required"),
});

const instagramSchema = z.object({
	id: z.string().min(1),
	image: z.string().url("image must be a valid URL"),
	alt: z.string().min(1, "alt is required"),
	caption: z.string().optional(),
	href: z.string().url("href must be a valid URL").optional(),
	date: z.string().optional(),
});

//
// TYPES
//

export type Stat = z.infer<typeof statsSchema>;
export type Track = z.infer<typeof tracksSchema>;
export type Event = z.infer<typeof eventsSchema>;
export type PostIG = z.infer<typeof instagramSchema>;

//
// COLLECTIONS
//

const stats = defineCollection({
	loader: file("src/content/stats.json"),
	schema: statsSchema,
});

const tracks = defineCollection({
	loader: file("src/content/tracks.json"),
	schema: tracksSchema,
});

const events = defineCollection({
	loader: file("src/content/events.json"),
	schema: eventsSchema,
});

const instagram = defineCollection({
	loader: file("src/content/instagram.json"),
	schema: instagramSchema,
});

export const collections = {
	stats,
	tracks,
	events,
	instagram,
};
