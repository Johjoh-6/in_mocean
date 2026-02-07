export interface OEmbedResponse {
	version: number;
	type: string;
	provider_name: string;
	provider_url: string;
	height: number;
	width: string;
	title: string;
	description: string;
	html: string;
	thumbnail_url?: string;
	author_name?: string;
	author_url?: string;
}

export class SoundCloudOEmbed {
	private baseUrl = "https://soundcloud.com/oembed";

	async getEmbed(
		soundcloudUrl: string,
		options: {
			maxwidth?: number;
			maxheight?: number;
			color?: string;
			auto_play?: boolean;
			show_comments?: boolean;
		} = {},
	): Promise<OEmbedResponse | null> {
		const params = new URLSearchParams({
			format: "json",
			url: soundcloudUrl,
			...Object.fromEntries(
				Object.entries(options).map(([key, value]) => [
					key,
					String(value),
				]),
			),
		});

		try {
			const response = await fetch(`${this.baseUrl}?${params}`);
			if (!response.ok) {
				throw new Error(`oEmbed API error: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error("oEmbed request failed:", error);
			return null;
		}
	}

	async getMultipleEmbeds(urls: string[]): Promise<OEmbedResponse[]> {
		const promises = urls.map((url) => this.getEmbed(url));
		const results = await Promise.all(promises);
		return results.filter(
			(result): result is OEmbedResponse => result !== null,
		);
	}
}
