# Movie Trailer Voice – Showreel Site

A Netflix-inspired parody showreel website for Guy Harris's Movie Trailer Voice work. Built with React + Vite.

## Tech Stack
- **React 18** + **Vite 5** (frontend only, no backend)
- **Fonts**: Bebas Neue (display), Inter (body) – loaded via Google Fonts in `index.html`
- **Styling**: Plain CSS modules per component + global utilities in `src/index.css`
- No animation libraries – pure CSS transitions and IntersectionObserver

## Running the App
```
npm run dev    # starts on port 5000
npm run build  # production build
```

## Project Structure
```
/
├── index.html              # HTML entry point with font imports + meta tags
├── vite.config.js          # Vite config (port 5000, host 0.0.0.0)
├── package.json
├── public/
│   ├── mtv-logo.jpg        # "MOVIE TRAILER VOICE" wordmark
│   └── v-logo.jpg          # Red V chevron icon
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Root component – shows ProfileSelect or HomePage
    ├── index.css           # Global CSS (custom properties, utilities, buttons, animations)
    ├── data/
    │   └── videos.js       # ALL video data + thumbnail URL helpers
    └── components/
        ├── ProfileSelect   # "Who's Watching?" intro screen (4 profile tiles)
        ├── Navbar          # Sticky navbar – transparent → solid on scroll, hamburger mobile
        ├── HeroCarousel    # Full-screen rotating hero (4 clips, auto-rotates 6s)
        ├── VideoRow        # Horizontally scrolling clip row with arrow controls
        ├── VideoCard       # Individual clip card with hover effects
        ├── AboutSection    # About Guy Harris + booking CTA
        ├── ContactSection  # "Book This Voice" + email + YouTube links
        └── Footer          # Logo, nav links, copyright
```

## Key Design Decisions
- **Brand colour**: `#e50914` (VoiceoverGuy red) – not Netflix red, branded separately
- **Accent**: Dark near-black backgrounds (`#0a0a0a` / `#141414`)
- **Typography**: Bebas Neue for all headings/display, Inter for body text
- **Hero images**: Custom WebP images in `public/heroes/` — no dependency on YouTube thumbnails for the hero carousel. Each hero clip has a `heroImage` field; the carousel falls back to `hqdefault` YouTube thumbnail if no `heroImage` is set
- **Card thumbnails**: YouTube `hqdefault` quality (always available for any video)
- **Profile → Hero mapping**: Each profile tile highlights a different hero clip (`profileHeroMap` in `videos.js`)
- **No CMS or database** – all content is hardcoded in `src/data/videos.js`

## Editing Content
All video data lives in **`src/data/videos.js`**:
- `heroClips` – the 4 rotating hero items
- `movieTrailerRow` – "Movie Trailer Voice" horizontal row (17 clips)
- `otherSuggestionsRow` – "Other Suggestions" row (11 clips)
- `profileHeroMap` – maps profile name to hero clip index

To add or change clips, edit those arrays. Thumbnail URLs are derived automatically from YouTube video IDs.

## Adding Custom Thumbnails
Replace a `url` field's auto-derived thumbnail by adding a `thumbnail` property to any clip object and updating `getThumbnail` / hero image references to check for it first.

## Navigation Sections
The navbar links scroll to these `id` anchors:
- `#trailers` – Movie Trailer Voice row
- `#other-suggestions` – Other Suggestions row
- `#about` – About Guy Harris section
- `#contact` – Contact / Book This Voice section

## SEO & Google Search Console

### Sitemap
`public/sitemap.xml` lists the single canonical URL for this SPA:
- **Canonical**: `https://www.movietrailervoice.co.uk/`
- Non-routes (`/home.php`, `/home`, `/home/`, `/custom-script/`) are intentionally excluded — they are legacy paths with no content
- `robots.txt` includes `Sitemap: https://www.movietrailervoice.co.uk/sitemap.xml`
- `index.html` declares `<link rel="sitemap" type="application/xml" href="/sitemap.xml" />`

### Google Search Console Submission (manual step)
To prompt Google to re-crawl and clear "Alternate page with proper canonical tag" warnings:
1. Go to [Google Search Console](https://search.google.com/search-console/) → select the `movietrailervoice.co.uk` property
2. Navigate to **Sitemaps** in the left sidebar
3. Enter `sitemap.xml` in the "Add a new sitemap" field and click **Submit**
4. Confirm Google shows "Success" with 0 errors and 1 URL discovered
5. For the flagged legacy URLs, use **URL Inspection** → Request Indexing on each:
   - `https://www.movietrailervoice.co.uk/home.php`
   - `https://www.movietrailervoice.co.uk/home`
   - `https://www.movietrailervoice.co.uk/home/`
   - `https://www.movietrailervoice.co.uk/custom-script/`
6. Coverage warnings typically clear within 1–4 weeks after submission

**Last sitemap update**: 2026-05-11
