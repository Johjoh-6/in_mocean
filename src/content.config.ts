import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

//
// SCHEMAS
//

const tracksSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, "title is required"),
	url: z.string().url("url must be a valid URL"),
});

const eventsSchema = (image: Function) =>
	z.object({
		date: z.string().min(1, "date is required"),
		title: z.string().min(1, "title is required"),
		city: z.string().min(1, "city is required"),
		country: z.string().min(1, "country is required"),
		location: z.string().min(1, "location is required"),
		url: z.string().url("url must be a valid URL"),
		image: z.union([image(), z.string().url("image must be a valid URL")]),
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

export type Track = z.infer<typeof tracksSchema>;
export type Event = z.infer<ReturnType<typeof eventsSchema>>;
export type PostIG = z.infer<typeof instagramSchema>;

//
// COLLECTIONS
//

const tracks = defineCollection({
	loader: file("src/content/tracks.json"),
	schema: tracksSchema,
});

const events = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/events" }),
	schema: ({ image }) => eventsSchema(image),
});

const instagram = defineCollection({
	loader: file("src/content/instagram.json"),
	schema: instagramSchema,
});

export const collections = {
	tracks,
	events,
	instagram,
};
