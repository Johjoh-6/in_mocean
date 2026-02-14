export interface YouTubeVideo {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	publishedAt: string;
	duration: string;
	views: string;
	likes?: string;
	channelTitle: string;
}

export interface YouTubeStats {
	viewCount: string;
	likeCount: string;
	commentCount: string;
}

class YouTubeAPI {
	private apiKey: string;
	private baseUrl = "https://www.googleapis.com/youtube/v3";

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	private async makeRequest(
		endpoint: string,
		params: Record<string, string>,
	): Promise<any> {
		const url = new URL(`${this.baseUrl}${endpoint}`);
		url.searchParams.append("key", this.apiKey);

		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});

		try {
			const response = await fetch(url.toString());
			if (!response.ok) {
				throw new Error(`YouTube API error: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error("YouTube API request failed:", error);
			throw error;
		}
	}

	async getChannelVideos(
		channelId: string,
		maxResults: number = 10,
	): Promise<YouTubeVideo[]> {
		try {
			// Get latest videos from channel
			const searchResponse = await this.makeRequest("/search", {
				channelId,
				part: "snippet",
				order: "date",
				type: "video",
				maxResults: maxResults.toString(),
			});

			const videoIds = searchResponse.items
				?.map((item: any) => item.id.videoId)
				.filter(Boolean)
				.join(",");

			if (!videoIds) return [];

			// Get video details including duration and statistics
			const videoResponse = await this.makeRequest("/videos", {
				id: videoIds,
				part: "snippet,contentDetails,statistics",
			});

			return videoResponse.items.map((video: any) => ({
				id: video.id,
				title: video.snippet.title,
				description: video.snippet.description,
				thumbnail:
					video.snippet.thumbnails.maxres?.url ||
					video.snippet.thumbnails.high?.url ||
					video.snippet.thumbnails.medium.url,
				publishedAt: video.snippet.publishedAt,
				duration: this.formatDuration(video.contentDetails.duration),
				views: this.formatNumber(
					parseInt(video.statistics.viewCount || "0"),
				),
				likes: this.formatNumber(
					parseInt(video.statistics.likeCount || "0"),
				),
				channelTitle: video.snippet.channelTitle,
			}));
		} catch (error) {
			console.error("Failed to fetch YouTube videos:", error);
			return [];
		}
	}

	private formatDuration(duration: string): string {
		// Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
		const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
		if (!match) return "0:00";

		const hours = parseInt(match[1] || "0");
		const minutes = parseInt(match[2] || "0");
		const seconds = parseInt(match[3] || "0");

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
		}
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}

	private formatNumber(num: number): string {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	}
}

export default YouTubeAPI;
