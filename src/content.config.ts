import { file, glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import YouTubeAPI from "./api/youtube-api";

//
// SCHEMAS
//

const tracksSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, "title is required"),
	url: z.url("url must be a valid URL"),
});

const eventsSchema = (image: Function) =>
	z.object({
		dateStart: z.string().min(1, "date start is required"),
		dateEnd: z.string().min(1, "date end is required"),
		title: z.string().min(1, "title is required"),
		city: z.string().min(1, "city is required"),
		country: z.string().min(1, "country is required"),
		location: z.string().min(1, "location is required"),
		url: z.url("url must be a valid URL").nullable().optional(),
		image: z.union([image(), z.url("image must be a valid URL")]),
	});

const youtubeVideoSchema = z.object({
	title: z.string(),
	description: z.string(),
	thumbnail: z.url(),
	publishedAt: z.string(),
	duration: z.string(),
	views: z.string(),
	likes: z.string().optional(),
	channelTitle: z.string(),
});

const instagramSchema = (image: Function) =>
	z.object({
		alt: z.string().min(1, "alt is required"),
		href: z.url("href must be a valid URL").optional(),
		image: z.union([image(), z.url("image must be a valid URL")]),
	});

//
// TYPES
//

export type Track = z.infer<typeof tracksSchema>;
export type Event = z.infer<ReturnType<typeof eventsSchema>>;
export type YouTubeVideo = z.infer<typeof youtubeVideoSchema>;
export type PostIG = z.infer<ReturnType<typeof instagramSchema>>;

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
	loader: glob({ pattern: "**/*.md", base: "src/content/instagram" }),
	schema: ({ image }) => instagramSchema(image),
});

const youtube = defineCollection({
	loader: {
		name: "youtube-loader",
		load: async ({ store, logger }) => {
			const apiKey = import.meta.env.YOUTUBE_API_KEY;
			const channelId = import.meta.env.YOUTUBE_CHANNEL_ID;

			if (!apiKey || !channelId) {
				logger.warn(
					"YouTube API not configured. Set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID env vars.",
				);
				return;
			}

			try {
				const youtubeAPI = new YouTubeAPI(apiKey);
				const videos = await youtubeAPI.getChannelVideos(channelId, 4);

				store.clear();

				for (const video of videos) {
					store.set({
						id: video.id,
						data: {
							title: video.title,
							description: video.description,
							thumbnail: video.thumbnail,
							publishedAt: video.publishedAt,
							duration: video.duration,
							views: video.views,
							likes: video.likes,
							channelTitle: video.channelTitle,
						},
					});
				}

				logger.info(`Loaded ${videos.length} YouTube videos.`);
			} catch (e) {
				logger.error(`Failed to fetch YouTube videos: ${e}`);
			}
		},
	},
	schema: youtubeVideoSchema,
});

export const collections = {
	tracks,
	events,
	instagram,
	youtube,
};
