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

interface GraphAPIError {
	error?: {
		message?: string;
		type?: string;
		code?: number;
		fbtrace_id?: string;
	};
}

export default class InstagramAPI {
	private accessToken: string;
	private igUserId: string;
	private baseUrl = "https://graph.facebook.com/v20.0";

	constructor(accessToken: string, igUserId: string) {
		this.accessToken = accessToken;
		this.igUserId = igUserId;
	}

	private buildUrl(path: string, params: Record<string, string>): string {
		const url = new URL(`${this.baseUrl}${path}`);
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});
		url.searchParams.set("access_token", this.accessToken);
		return url.toString();
	}

	private async request<T>(
		path: string,
		params: Record<string, string>,
	): Promise<T> {
		const response = await fetch(this.buildUrl(path, params));
		const data = (await response.json()) as T & GraphAPIError;

		if (!response.ok || (data as GraphAPIError).error) {
			const apiError = (data as GraphAPIError).error;
			const detail =
				apiError?.message ||
				`${response.status} ${response.statusText}`;
			throw new Error(`Instagram Graph API error: ${detail}`);
		}

		return data as T;
	}

	/**
	 * Get recent posts from Instagram Graph API (Creator/Business account)
	 * Requires:
	 * - Instagram account connected to a Facebook Page
	 * - Valid User Access Token with instagram_basic (and related) permissions
	 * - Instagram User ID (igUserId)
	 */
	async getRecentPosts(limit: number = 6): Promise<InstagramPost[]> {
		type MediaListResponse = { data?: InstagramPost[] };

		const data = await this.request<MediaListResponse>(
			`/${this.igUserId}/media`,
			{
				fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
				limit: String(limit),
			},
		);

		return data.data || [];
	}

	/**
	 * Get posts with engagement metrics
	 * Note: like_count/comments_count availability can depend on permissions/app mode.
	 */
	async getPostsWithMetrics(limit: number = 6): Promise<InstagramPost[]> {
		type MediaListResponse = { data?: InstagramPost[] };

		const data = await this.request<MediaListResponse>(
			`/${this.igUserId}/media`,
			{
				fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
				limit: String(limit),
			},
		);

		return data.data || [];
	}

	/**
	 * Format engagement count for display
	 */
	static formatCount(count: number): string {
		if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
		if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
		return count.toString();
	}

	/**
	 * Truncate caption text
	 */
	static truncateCaption(caption: string, maxLength: number = 100): string {
		if (!caption) return "";
		if (caption.length <= maxLength) return caption;
		return caption.substring(0, maxLength).trim() + "...";
	}
}
