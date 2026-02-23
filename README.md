# In_m'ocean
Website for In_m'ocean DJ. Hosted in vercel, made with Astro and Svelte.
The content management is Github, it's simple and easy to use. 

> This should be changed in the future. Go to see [Future](##future)

## 🚀 Project Structure


```
/
├── public/
│   └── favicon.svg // Icon for the website svg and ico 
├── src
│   ├── assets
│   │   ├── logo.svg
│   │   └── background.jpeg
│   ├── content
│   │   ├── tracks.json // Where the tracks from soudcloud are stored
│   │   ├── events
│   │   │   ├── images // where the images are stored for the events
│   │   │   ├── event1.md
│   │   │   └── event2.md
│   │   └── instagram
│   │       ├── images // where the images are stored for the instagram posts
│   │       ├── ig1.md
│   │       └── ig2.md
│   ├── icons // Where the personal icons are stored. Without use lucide astro
│   ├── translations // Where the translations are stored.
│   │   ├── en.ts 
│   │   ├── fr.ts 
│   │   ├── es.ts 
│   │   ├── pt.ts 
│   │   └── index.ts // Config for translations logic
│   ├── components
│   │   └── // Where the components are stored
│   ├── layouts
│   │   └── Layout.astro // Where the layouts are stored only one is enought for this project
│   └── pages
│       ├── 500.astro
│       ├── 404.astro
│       └── [...locale].astro // Handle different locales for internationalization
│           ├── index.astro // Default page for the locale
│       	└── events.astro // Events with the list of the futur events
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Content
For the content management all the documents are stored in the `content` directory. The content is written in Markdown and is organized into different sections such as `events`, `instagram`, `tracks.json`etc. Each section has its own directory and contains the corresponding Markdown files.
Some contain a folder `images` for handling images and assets.
Read [Content](https://github.com/max-nunes/astro-portfolio/blob/main/content/README.md)

## Translations
For translations all the documents are stored in the `translations` directory. Update he corresponding `ts` files.
Language supported:
- English
- Portuguese
- Spanish
- French

## Future
- Add a blog section with posts and categories
- Add an admin panel for managing content
- Use S3 for static assets
