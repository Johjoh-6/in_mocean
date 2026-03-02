# Content Collections

This project uses [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage events and instagram posts.

## Directory Structure

```
src/content/
├── events/           # Event markdown files
│   ├── event-001.md
│   ├── event-002.md
│   └── images/       # Local images for events (optional)
│       └── beach-party.jpg
├── instagram/        # Instagram post markdown files
│   ├── ig-001.md
│   ├── ig-002.md
│   └── images/       # Local images for instagram (optional)
│       └── dj-set.jpg
├── tracks.json       # SoundCloud tracks
└── README.md         # This file
```

---

## Events

Each event is a `.md` file in `src/content/events/`.

### Fields

| Field      | Type     | Required | Description                          |
| ---------- | -------- | -------- | ------------------------------------ |
| `dateStart`     | `string` | ✅       | Date and time (format: `MM/DD/YYYY HH:mm:ss`) |
| `dateEnd`     | `string` | ✅       | Date and time (format: `MM/DD/YYYY HH:mm:ss`) |
| `title`    | `string` | ✅       | Event name                           |
| `city`     | `string` | ✅       | City where the event takes place     |
| `country`  | `string` | ✅       | Country                              |
| `location` | `string` | ✅       | Venue or specific location name      |
| `url`      | `string` | Optional | Link to the event page (must be a valid URL) |
| `image`    | `string` or local path | ✅ | Event image (see [Images](#images) below) |

### Example with a remote image

```md
<!-- src/content/events/event-001.md -->
---
dateStart: "03/15/2026 17:00:00"
dateEnd: "03/15/2026 21:00:00"
title: "in_m'Ocean Beach Festival"
city: "Florianópolis"
country: "Brazil"
location: "Praia Mole"
url: "https://www.example.com/event-001"
image: "https://images.unsplash.com/photo-1610816931633-564daed99c91?w=1080"
---
```

### Example with a local image

```md
<!-- src/content/events/event-002.md -->
---
dateStart: "03/22/2026 20:00:00"
dateEnd: "03/22/2026 23:00:00"
title: "Ocean Vibes Night"
city: "São Paulo"
country: "Brazil"
location: "Blue Beach Club"
url: "https://www.example.com/event-002"
image: ./images/ocean-vibes.jpg
---
```

> **Note:** Local image paths are relative to the markdown file. No quotes needed around the path.

---

## Instagram Posts

Each post is a `.md` file in `src/content/instagram/`.

### Fields

| Field   | Type     | Required | Description                          |
| ------- | -------- | -------- | ------------------------------------ |
| `alt`   | `string` | ✅       | Accessible description of the image  |
| `href`  | `string` | Optional | Link to the Instagram post (must be a valid URL) |
| `image` | `string` or local path | ✅ | Post image (see [Images](#images) below) |

> **Note:** If `href` is not provided, the post will link to the Instagram account.

### Example with a remote image

```md
<!-- src/content/instagram/ig-001.md -->
---
alt: "DJ set on stage with crowd lights"
href: "https://instagram.com/p/abc123"
image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200"
---
```

### Example with a local image

```md
<!-- src/content/instagram/ig-002.md -->
---
alt: "Turntables and mixer close-up during performance"
href: "https://instagram.com/p/def456"
image: ./images/turntables.jpg
---
```

---

## Images

Both events and instagram posts support **two types of images**:

### 1. Remote images (external URL)

Use a full URL string wrapped in quotes:

```yaml
image: "https://images.unsplash.com/photo-abc123?w=1080"
```

- Served directly from the remote server
- No build-time optimization
- Good for images hosted on a CDN (Unsplash, Cloudinary, etc.)

### 2. Local images (recommended)

Use a relative path from the markdown file, **without quotes**:

```yaml
image: ./images/my-photo.jpg
```

- Processed by Astro's image pipeline at build time
- Automatically converted to **WebP** for smaller file sizes
- Generates **responsive sizes** for different screen widths
- Produces optimized `width`/`height` attributes (prevents layout shift)

#### Where to put local images

Place them in an `images/` subdirectory next to your markdown files:

```
src/content/events/
├── event-001.md
├── event-002.md
└── images/
    ├── beach-party.jpg
    └── ocean-vibes.jpg
```

You can also reference images from the shared assets folder using a relative path:

```yaml
image: ../../assets/my-photo.jpg
```

#### Supported formats

Astro can optimize: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`, `.avif`

#### Recommended image sizes

| Context        | Recommended width | Notes                        |
| -------------- | ----------------- | ---------------------------- |
| Event card     | **800px**         | Displayed at ~192px on desktop, larger on mobile |
| Instagram card | **600px**         | Displayed in a 2–3 column grid |

---

## SoundCloud Tracks

Tracks are stored in `src/content/tracks.json` as a JSON array.

### Fields

| Field   | Type     | Required | Description                    |
| ------- | -------- | -------- | ------------------------------ |
| `id`    | `string` | ✅       | Unique identifier              |
| `title` | `string` | ✅       | Track title                    |
| `url`   | `string` | ✅       | SoundCloud track URL           |

### Example

```json
[
  {
    "id": "track-001",
    "title": "Power Summer Bass",
    "url": "https://soundcloud.com/in_mocean/powersummerbass"
  },
  {
    "id": "track-002",
    "title": "Shimmer Session",
    "url": "https://soundcloud.com/in_mocean/shimmer-session"
  }
]
```
