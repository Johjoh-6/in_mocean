export interface InstagramPost {
	id: string;
	caption: string;
	media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
	media_url: string;
	thumbnail_url?: string;
	permalink: string;
	timestamp: string;
	like_count?: number;
	comments_count?: number;
}

export default class InstagramAPI {
	private accessToken: string;
	private baseUrl = "https://graph.instagram.com";

	constructor(accessToken: string) {
		this.accessToken = accessToken;
	}

	/**
	 * Get recent posts from Instagram Basic Display API
	 * Note: This requires a long-lived access token from Instagram Basic Display API
	 */
	async getRecentPosts(limit: number = 6): Promise<InstagramPost[]> {
		try {
			const response = await fetch(
				`${this.baseUrl}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${limit}&access_token=${this.accessToken}`,
			);

			if (!response.ok) {
				throw new Error(
					`Instagram API error: ${response.status} ${response.statusText}`,
				);
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(`Instagram API error: ${data.error.message}`);
			}

			return data.data || [];
		} catch (error) {
			console.error("Error fetching Instagram posts:", error);
			throw error;
		}
	}

	/**
	 * Get posts with engagement metrics (requires Instagram Graph API - business accounts)
	 */
	async getPostsWithMetrics(limit: number = 6): Promise<InstagramPost[]> {
		try {
			const response = await fetch(
				`${this.baseUrl}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${this.accessToken}`,
			);

			if (!response.ok) {
				throw new Error(
					`Instagram API error: ${response.status} ${response.statusText}`,
				);
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(`Instagram API error: ${data.error.message}`);
			}

			return data.data || [];
		} catch (error) {
			console.error(
				"Error fetching Instagram posts with metrics:",
				error,
			);
			throw error;
		}
	}

	/**
	 * Format engagement count for display
	 */
	static formatCount(count: number): string {
		if (count >= 1000000) {
			return `${(count / 1000000).toFixed(1)}M`;
		} else if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}K`;
		}
		return count.toString();
	}

	/**
	 * Truncate caption text
	 */
	static truncateCaption(caption: string, maxLength: number = 100): string {
		if (!caption) return "";

		if (caption.length <= maxLength) {
			return caption;
		}

		return caption.substring(0, maxLength).trim() + "...";
	}
}
